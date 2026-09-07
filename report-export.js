(function (global) {
  const REPORT_WIDTH = 1440

  const nextFrame = () => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)))
  const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

  function reportDocument(frame) {
    try { return frame.contentDocument || frame.contentWindow.document } catch (_) { return null }
  }

  async function waitForReport(frame) {
    if (!frame.contentDocument || frame.contentDocument.readyState !== 'complete') {
      await new Promise((resolve, reject) => {
        const timer = setTimeout(() => reject(new Error('HTML 报告加载超时')), 20000)
        frame.addEventListener('load', () => { clearTimeout(timer); resolve() }, { once: true })
      })
    }
    const doc = reportDocument(frame)
    if (!doc) throw new Error('无法读取 HTML 报告')
    if (doc.fonts && doc.fonts.ready) await doc.fonts.ready
    const images = Array.from(doc.images)
    await Promise.all(images.map(image => image.complete ? Promise.resolve() : new Promise(resolve => {
      image.addEventListener('load', resolve, { once: true })
      image.addEventListener('error', resolve, { once: true })
    })))
    for (let i = 0; i < 40 && doc.documentElement.dataset.qrReady !== '1'; i += 1) await delay(50)
    for (let i = 0; i < 40 && doc.documentElement.dataset.interactiveLinksReady !== '1'; i += 1) await delay(50)
    await nextFrame()
    return doc
  }

  async function fit(frame, wrap) {
    const doc = await waitForReport(frame)
    const poster = doc.querySelector('.poster') || doc.body
    const height = Math.max(poster.scrollHeight, poster.offsetHeight, doc.documentElement.scrollHeight)
    const width = Math.max(poster.scrollWidth, poster.offsetWidth, REPORT_WIDTH)
    frame.style.width = `${width}px`
    frame.style.height = `${height}px`
    const scale = wrap.clientWidth ? wrap.clientWidth / width : 1
    frame.style.transform = `scale(${scale})`
    wrap.style.height = `${Math.ceil(height * scale)}px`
    wrap.style.minHeight = '0'
    frame.classList.add('is-ready')
    return { doc, poster, width, height }
  }

  function downloadBlob(blob, filename) {
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = filename
    link.rel = 'noopener'
    document.body.appendChild(link)
    link.click()
    link.remove()
    setTimeout(() => URL.revokeObjectURL(url), 30000)
  }

  function canvasBlob(canvas, type, quality) {
    return new Promise((resolve, reject) => canvas.toBlob(blob => blob ? resolve(blob) : reject(new Error('图片生成失败')), type, quality))
  }

  async function renderHtmlCanvas(frame, wrap, onProgress, title) {
    if (typeof global.html2canvas !== 'function') throw new Error('图片转换组件未加载')
    const doc = await waitForReport(frame)
    doc.documentElement.classList.add('is-exporting')
    try {
      await nextFrame()
      const { poster, width, height } = await fit(frame, wrap)
      onProgress(title, '正在渲染 HTML 报告，请稍候…')
    const maxCanvasArea = 35000000
    const maxCanvasHeight = 32700
    const scale = Math.min(0.72, maxCanvasHeight / height, Math.sqrt(maxCanvasArea / (width * height)))
      const pages = Array.from(poster.querySelectorAll(':scope > .logic-page')).map(page => ({
        left: page.offsetLeft,
        top: page.offsetTop,
        width: page.offsetWidth,
        height: page.offsetHeight
      }))
      const canvas = await global.html2canvas(poster, {
        backgroundColor: '#ffffff',
        scale,
        useCORS: true,
        logging: false,
        imageTimeout: 0,
        width,
        height,
        windowWidth: width,
        windowHeight: height,
        scrollX: 0,
        scrollY: 0
      })
      return { canvas, pages, scale, width, height }
    } finally {
      doc.documentElement.classList.remove('is-exporting')
      await fit(frame, wrap)
    }
  }

  async function exportImage(frame, wrap, filename, onProgress) {
    const { canvas } = await renderHtmlCanvas(frame, wrap, onProgress, '正在生成长图')
    onProgress('长图已生成', '正在准备下载…')
    const blob = await canvasBlob(canvas, 'image/png')
    downloadBlob(blob, filename)
  }

  async function exportPdf(frame, wrap, filename, onProgress) {
    if (typeof global.html2canvas !== 'function' || !global.jspdf || !global.jspdf.jsPDF) throw new Error('PDF 转换组件未加载')
    const doc = await waitForReport(frame)
    doc.documentElement.classList.add('is-exporting')
    try {
      await nextFrame()
      const { poster } = await fit(frame, wrap)
      const pageElements = Array.from(poster.querySelectorAll(':scope > .logic-page'))
      if (!pageElements.length) pageElements.push(poster)
      const firstWidth = pageElements[0].offsetWidth
      const firstHeight = pageElements[0].offsetHeight
      const firstHeightMm = 210 * firstHeight / firstWidth
      const pdf = new global.jspdf.jsPDF({ orientation: firstHeightMm >= 210 ? 'portrait' : 'landscape', unit: 'mm', format: [210, firstHeightMm], compress: true })
      const pdfScale = 1.2
      for (let page = 0; page < pageElements.length; page += 1) {
        const pageElement = pageElements[page]
        const sourceWidth = pageElement.offsetWidth
        const sourceHeight = pageElement.offsetHeight
        onProgress('正在转换为 PDF', `正在生成第 ${page + 1} / ${pageElements.length} 页，请勿关闭页面`)
        const pageCanvas = await global.html2canvas(pageElement, {
          backgroundColor: '#ffffff',
          scale: pdfScale,
          useCORS: true,
          logging: false,
          imageTimeout: 0,
          width: sourceWidth,
          height: sourceHeight,
          windowWidth: sourceWidth,
          windowHeight: sourceHeight,
          scrollX: 0,
          scrollY: 0
        })
        const pageHeightMm = 210 * sourceHeight / sourceWidth
        if (page > 0) pdf.addPage([210, pageHeightMm], pageHeightMm >= 210 ? 'portrait' : 'landscape')
        pdf.addImage(pageCanvas.toDataURL('image/jpeg', 0.9), 'JPEG', 0, 0, 210, pageHeightMm, undefined, 'FAST')
        pageCanvas.width = 1
        pageCanvas.height = 1
        await delay(20)
      }
      onProgress('PDF 已生成', '正在准备下载…')
      pdf.save(filename)
    } finally {
      doc.documentElement.classList.remove('is-exporting')
      await fit(frame, wrap)
    }
  }

  global.PolicyReportExporter = { fit, exportImage, exportPdf }
})(window)
