(function () {
  const platforms = [
    ['北京经开区政策兑现综合服务平台', 'https://zcdx.kfqgw.beijing.gov.cn/#/home'],
    ['北京市政策服务平台（京策）', 'https://www.beijing.gov.cn/zhengce/'],
    ['国家政务服务平台', 'https://gjzwfw.www.gov.cn/index.html']
  ]
  const platformLinks = new Map(platforms)

  const platformRoot = document.querySelector('.hero-platforms')
  if (platformRoot) {
    platformRoot.replaceChildren(...platforms.map(([name, href]) => {
      const card = document.createElement('div')
      card.className = 'hero-platform'
      const qr = document.createElement('div')
      qr.className = 'hero-platform-qr'
      qr.dataset.url = href
      const label = document.createElement('span')
      label.textContent = name
      card.append(qr, label)
      if (typeof QRCode === 'function') {
        new QRCode(qr, {
          text: href,
          width: 52,
          height: 52,
          colorDark: '#0c3156',
          colorLight: '#fff',
          correctLevel: QRCode.CorrectLevel.M
        })
      }
      return card
    }))
  }

  function safeUrl(value) {
    const raw = String(value || '').trim()
    if (!/^https?:\/\//i.test(raw)) return ''
    /* 两条旧数据把来源说明写进了 URL，链接时回退到国务院政策文件库。 */
    if (raw.includes('（') || raw.includes('）')) return 'https://www.gov.cn/zhengce/zhengcewenjianku/'
    return raw
  }

  function makeLink(href, label) {
    const link = document.createElement('a')
    link.className = 'report-interactive-link'
    link.href = href
    link.target = '_blank'
    link.rel = 'noopener noreferrer'
    link.setAttribute('aria-label', `${label}（新页面打开）`)
    link.innerHTML = `<span>${label}</span><i class="external-arrow" aria-hidden="true">↗</i>`
    return link
  }

  function makeLabel(label) {
    const element = document.createElement('span')
    element.className = 'report-interactive-link'
    element.innerHTML = `<span>${label}</span><i class="external-arrow" aria-hidden="true">↗</i>`
    return element
  }

  document.querySelectorAll('.hero-platform').forEach(card => {
    const name = card.querySelector('span')?.textContent.trim()
    const href = platformLinks.get(name)
    if (name && href) card.appendChild(makeLink(href, name))
  })

  document.querySelectorAll('.policy-qr[data-url]').forEach(qr => {
    const href = safeUrl(qr.dataset.url)
    if (!href || !qr.parentElement) return
    qr.parentElement.classList.add('report-link-cell')
    qr.insertAdjacentElement('afterend', makeLink(href, '查看原文'))
  })

  document.querySelectorAll('.logic-policy .sec-head > p').forEach(policyNote => {
    policyNote.classList.add('report-export-only')
    const interactiveNote = document.createElement('p')
    interactiveNote.className = 'report-interactive-only'
    interactiveNote.textContent = '按国家/部委级、北京市、北京经开区分组展示；点击“查看原文”可在新页面打开政策原文。'
    policyNote.insertAdjacentElement('afterend', interactiveNote)
  })

  document.querySelectorAll('.new-qr-row > a').forEach(link => {
    const href = safeUrl(link.getAttribute('href') || link.querySelector('[data-url]')?.dataset.url)
    const label = link.querySelector('b')?.textContent.trim()
    if (!href || !label) return
    link.href = href
    link.target = '_blank'
    link.rel = 'noopener noreferrer'
    link.setAttribute('aria-label', `${label}（新页面打开）`)
    link.appendChild(makeLabel(label))
  })

  document.documentElement.dataset.interactiveLinksReady = '1'
})()
