const content_dir = 'contents/'
const config_file = 'config.yml'
const section_names = ['about', 'research', 'publications', 'awards']

const iconMap = {
    github: 'bi-github',
    scholar: 'bi-mortarboard',
    email: 'bi-envelope',
    cv: 'bi-file-earmark-text',
    website: 'bi-link-45deg'
}

function setHtml(id, value) {
    const element = document.getElementById(id)
    if (element && value !== undefined && value !== null) {
        element.innerHTML = value
    }
}

function setHref(id, value) {
    const element = document.getElementById(id)
    if (element && value) {
        element.setAttribute('href', value)
    }
}

function renderKeywords(keywords = []) {
    const container = document.getElementById('hero-keywords')
    if (!container) return

    container.innerHTML = keywords.map((keyword, index) => {
        const colors = ['#0f8ea8', '#6854d9', '#2d8f69', '#c88721']
        const color = keyword.color || colors[index % colors.length]
        return `<span class="keyword" style="--keyword-color: ${color}">${keyword.label || keyword}</span>`
    }).join('')
}

function renderHeroLinks(links = []) {
    const container = document.getElementById('hero-links')
    if (!container) return

    container.innerHTML = links.map(link => {
        const icon = iconMap[link.icon] || iconMap.website
        const target = link.href && link.href.startsWith('mailto:') ? '' : ' target="_blank"'
        return `<a class="hero-link" href="${link.href}"${target}><i class="bi ${icon}"></i>${link.label}</a>`
    }).join('')
}

function renderHighlights(highlights = []) {
    const container = document.getElementById('research-highlights')
    if (!container) return

    const colors = ['#0f8ea8', '#6854d9', '#2d8f69']
    container.innerHTML = highlights.map((item, index) => {
        const color = item.color || colors[index % colors.length]
        return `
            <article class="highlight-card reveal-item" style="--accent: ${color}">
                <h3>${item.title}</h3>
                <p>${item.text}</p>
            </article>
        `
    }).join('')
}

function prepareRevealItems(root = document) {
    root.querySelectorAll('.content-panel > h3, .content-panel > h4, .content-panel > p, .content-panel > ul, .info-card, .research-card, .publication-item')
        .forEach(item => item.classList.add('reveal-item'))
}

function setupRevealObserver() {
    const items = document.querySelectorAll('.reveal-section, .reveal-item')
    if (!items.length) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
        items.forEach(item => item.classList.add('is-visible'))
        return
    }

    const observer = new IntersectionObserver((entries, instance) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible')
                instance.unobserve(entry.target)
            }
        })
    }, {
        rootMargin: '0px 0px -8% 0px',
        threshold: 0.12
    })

    items.forEach(item => observer.observe(item))
}

function setupNavbarState() {
    const mainNav = document.body.querySelector('#mainNav')
    if (!mainNav) return

    const update = () => {
        mainNav.classList.toggle('nav-scrolled', window.scrollY > 18)
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
}

function setupOptionalCvLink() {
    const cvLink = document.getElementById('cv-link')
    const cvNavItem = document.getElementById('cv-nav-item')
    if (!cvLink || !cvNavItem) return

    fetch(cvLink.getAttribute('href'), { method: 'HEAD' })
        .then(response => {
            if (!response.ok) {
                cvNavItem.remove()
            }
        })
        .catch(() => cvNavItem.remove())
}

window.addEventListener('DOMContentLoaded', event => {
    const mainNav = document.body.querySelector('#mainNav')
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            offset: 82,
        })
    }

    const navbarToggler = document.body.querySelector('.navbar-toggler')
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    )
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (navbarToggler && window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click()
            }
        })
    })

    setupNavbarState()
    setupOptionalCvLink()

    fetch(content_dir + config_file)
        .then(response => response.text())
        .then(text => {
            const yml = jsyaml.load(text)

            Object.keys(yml).forEach(key => {
                if (typeof yml[key] === 'string' || typeof yml[key] === 'number') {
                    setHtml(key, yml[key])
                }
            })

            setHref('github-link', yml.github_url)
            setHref('scholar-link', yml.scholar_url)
            setHref('email-link', yml.email_href)
            renderKeywords(yml.hero_keywords)
            renderHeroLinks(yml.profile_links)
            renderHighlights(yml.research_highlights)
            setupRevealObserver()
        })
        .catch(error => console.log(error))

    marked.use({ mangle: false, headerIds: false })
    const markdownFetches = section_names.map(name => {
        return fetch(content_dir + name + '.md')
            .then(response => response.text())
            .then(markdown => {
                const html = marked.parse(markdown)
                document.getElementById(name + '-md').innerHTML = html
            })
            .catch(error => console.log(error))
    })

    Promise.all(markdownFetches).then(() => {
        prepareRevealItems()
        setupRevealObserver()
        if (window.MathJax && MathJax.typesetPromise) {
            MathJax.typesetPromise()
        } else if (window.MathJax && MathJax.typeset) {
            MathJax.typeset()
        }
    })
})
