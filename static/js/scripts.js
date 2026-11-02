const sectionNames = ['about', 'research', 'publications', 'awards', 'contact']
const languageCache = new Map()
const iconMap = { github: 'bi-github', scholar: 'bi-book', email: 'bi-envelope', website: 'bi-link-45deg' }
let languageRequest = 0
let scrollSpy

function setText(id, value) {
    const element = document.getElementById(id)
    if (element && value !== undefined) element.textContent = value
}

function initialLanguage() {
    try {
        const saved = localStorage.getItem('homepage-language')
        if (saved === 'zh' || saved === 'en') return saved
    } catch (_) { /* The website also works when browser storage is unavailable. */ }
    return navigator.language.toLowerCase().startsWith('zh') ? 'zh' : 'en'
}

async function fetchText(path) {
    const response = await fetch(path, { cache: 'no-cache' })
    if (!response.ok) throw new Error('Unable to load ' + path + ': ' + response.status)
    return response.text()
}

function loadLanguage(language) {
    if (!languageCache.has(language)) {
        const directory = language === 'en' ? 'contents/' : 'contents/zh/'
        const request = Promise.all([
            fetchText(directory + 'config.yml').then(text => jsyaml.load(text)),
            ...sectionNames.map(name => fetchText(directory + name + '.md'))
        ]).catch(error => {
            languageCache.delete(language)
            throw error
        })
        languageCache.set(language, request)
    }
    return languageCache.get(language)
}

function renderHeroLinks(links = []) {
    const container = document.getElementById('hero-links')
    container.replaceChildren(...links.map(link => {
        const anchor = document.createElement('a')
        anchor.className = 'profile-social-link'
        anchor.href = link.href
        anchor.title = link.label
        anchor.setAttribute('aria-label', link.label)
        if (!link.href.startsWith('mailto:')) {
            anchor.target = '_blank'
            anchor.rel = 'noopener noreferrer'
        }
        const icon = document.createElement('i')
        icon.className = 'bi ' + (iconMap[link.icon] || iconMap.website)
        icon.setAttribute('aria-hidden', 'true')
        const label = document.createElement('span')
        label.textContent = link.label
        anchor.append(icon, label)
        return anchor
    }))
}

function setupPublicationFigures() {
    const dialog = document.getElementById('figure-dialog')
    const image = document.getElementById('figure-dialog-image')
    document.getElementById('publications-md').addEventListener('click', event => {
        const figure = event.target.closest('.publication-figure')
        if (!figure || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return
        event.preventDefault()
        image.src = figure.href
        image.alt = figure.querySelector('img').alt
        setText('figure-dialog-title', figure.dataset.figureTitle)
        document.getElementById('figure-original').href = figure.href
        dialog.showModal()
        document.documentElement.classList.add('figure-open')
    })
    document.getElementById('figure-close').addEventListener('click', () => dialog.close())
    dialog.addEventListener('click', event => {
        const bounds = dialog.getBoundingClientRect()
        if (event.target === dialog && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)) dialog.close()
    })
    dialog.addEventListener('close', () => document.documentElement.classList.remove('figure-open'))
}

// Preserve formula support without downloading MathJax on pages that have no formulas.
function typesetMath(markdown) {
    if (!/\$|\\\(|\\\[|\\begin\{/.test(markdown)) return
    if (!window.MathJax) {
        window.MathJax = { tex: { inlineMath: [['$', '$'], ['\\(', '\\)']] } }
        const script = document.createElement('script')
        script.src = 'static/js/tex-svg.js'
        script.onload = () => window.MathJax.startup.promise.then(() => window.MathJax.typesetPromise())
        document.head.append(script)
    } else if (window.MathJax.typesetPromise) {
        window.MathJax.typesetPromise()
    }
}

async function setLanguage(language) {
    const request = ++languageRequest
    const status = document.getElementById('content-status')
    document.getElementById('main-content').setAttribute('aria-busy', 'true')
    try {
        const [config, ...markdown] = await loadLanguage(language)
        if (request !== languageRequest) return

        Object.entries(config).forEach(([key, value]) => {
            if (typeof value === 'string' || typeof value === 'number') setText(key, value)
        })
        document.querySelectorAll('[data-i18n]').forEach(element => {
            element.textContent = config.ui[element.dataset.i18n]
        })
        document.querySelectorAll('[data-i18n-label]').forEach(element => {
            element.setAttribute('aria-label', config.ui[element.dataset.i18nLabel])
            element.title = config.ui[element.dataset.i18nLabel]
        })
        sectionNames.forEach((name, index) => {
            document.getElementById(name + '-md').innerHTML = marked.parse(markdown[index])
        })
        document.querySelectorAll('.main-body i.bi').forEach(icon => icon.setAttribute('aria-hidden', 'true'))
        document.querySelectorAll('a[target="_blank"]').forEach(anchor => {
            anchor.rel = 'noopener noreferrer'
        })

        document.documentElement.lang = language === 'zh' ? 'zh-CN' : 'en'
        document.title = config.title
        document.querySelector('meta[name="description"]').content = config.description
        document.getElementById('hero-photo').alt = config['photo-alt']
        document.getElementById('hero-chinese-name').lang = language === 'zh' ? 'en' : 'zh-CN'
        document.getElementById('mainNav').setAttribute('aria-label', config.ui['navigation-label'])
        document.querySelector('.navbar-toggler').setAttribute('aria-label', config.ui['menu-label'])
        document.querySelectorAll('[data-language]').forEach(button => {
            button.setAttribute('aria-pressed', String(button.dataset.language === language))
        })
        document.getElementById('cv-nav-item').hidden = !config.cv_url
        if (config.cv_url) document.getElementById('cv-link').href = config.cv_url
        renderHeroLinks(config.profile_links)
        typesetMath(markdown.join('\n'))
        if (scrollSpy) scrollSpy.refresh()
        status.textContent = ''
        try { localStorage.setItem('homepage-language', language) } catch (_) { /* Optional preference. */ }
    } catch (error) {
        if (request !== languageRequest) return
        status.textContent = language === 'zh'
            ? '内容加载失败，请刷新页面后重试。'
            : 'Content could not be loaded. Please refresh the page to try again.'
        console.error(error)
    } finally {
        if (request === languageRequest) document.getElementById('main-content').removeAttribute('aria-busy')
    }
}

window.addEventListener('DOMContentLoaded', () => {
    marked.use({ mangle: false, headerIds: false })
    setupPublicationFigures()
    const mainNav = document.getElementById('mainNav')
    const updateNavbar = () => mainNav.classList.toggle('nav-scrolled', window.scrollY > 18)
    updateNavbar()
    window.addEventListener('scroll', updateNavbar, { passive: true })

    const menu = document.getElementById('navbarResponsive')
    const closeMenu = () => bootstrap.Collapse.getOrCreateInstance(menu, { toggle: false }).hide()
    document.querySelectorAll('#navbarResponsive .nav-link').forEach(anchor => {
        anchor.addEventListener('click', () => {
            // A quick tap can arrive before Bootstrap's opening animation finishes.
            if (menu.classList.contains('collapsing') && document.querySelector('.navbar-toggler').getAttribute('aria-expanded') === 'true') {
                menu.addEventListener('shown.bs.collapse', closeMenu, { once: true })
            } else {
                closeMenu()
            }
        })
    })
    scrollSpy = new bootstrap.ScrollSpy(document.body, { target: '#mainNav', offset: 100 })
    document.querySelectorAll('[data-language]').forEach(button => {
        button.addEventListener('click', () => setLanguage(button.dataset.language))
    })

    setLanguage(initialLanguage())
})
