(function () {
  const platformLinks = new Map([
    ['北京经开区政策兑现综合服务平台', 'https://zcdx.kfqgw.beijing.gov.cn/#/home'],
    ['北京小微企业金融综合服务平台', 'https://www.smeservice.com/'],
    ['北京市信用政务服务平台', 'https://creditbj.jxj.beijing.gov.cn/'],
    ['北京市科技计划综合管理平台', 'https://mis.kw.beijing.gov.cn/'],
    ['科学技术部政务服务平台', 'https://fuwu.most.gov.cn/'],
    ['国家科技管理信息系统公共服务平台', 'https://service.most.gov.cn/']
  ])

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

  const policyNote = document.querySelector('#policy-root')?.closest('section')?.querySelector('.sec-head > p')
  if (policyNote) {
    policyNote.classList.add('report-export-only')
    const interactiveNote = document.createElement('p')
    interactiveNote.className = 'report-interactive-only'
    interactiveNote.textContent = '按国家/部委级、北京市、北京经开区分组展示；点击“查看原文”可在新页面打开政策原文。'
    policyNote.insertAdjacentElement('afterend', interactiveNote)
  }

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
