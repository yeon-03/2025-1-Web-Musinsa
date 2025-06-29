const header = document.createElement('div')
header.className = 'h_container'
header.innerHTML = `
      <div id="h_1">
        <button style="margin:8px;">
          <svg role="button" tabindex="0" width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M4 8.7H8V7.3H4V8.7ZM4 15.2H8V13.8H4V15.2ZM4 21.7H8V20.3H4V21.7ZM10 8.7H24V7.3H10V8.7ZM10 15.2H24V13.8H10V15.2ZM10 21.7H24V20.3H10V21.7Z" fill="currentColor" fill-opacity="0.8"></path>
          </svg>
        </button>
        <a href="main.html" id="first_line"><p>MUSINSA</p></a>
        <a href="rank.html?type=뷰티"><p>BEAUTY</p></a>
        <a href="rank.html?type=스포츠/레저"><p>PLAYER</p></a>
        <a href="rank.html?type=아울렛"><p>OUTLET</p></a>
        <a href="rank.html?type=부티크"><p>BOUTIQUE</p></a>
        <a href="rank.html?type=신발"><p>SHOES</p></a>
        <a id="end_line" href="rank.html?type=키즈"><p>KIDS</p></a>
        <a href="javascript:void(0)"><p><svg style="margin: 0 4px 0 0" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19.5 9.8902C19.5 7.9671 19.1534 6.07117 18.5079 4.2568H17.5225C18.1953 6.05758 18.5486 7.94671 18.5486 9.8902C18.5486 11.8337 18.1681 13.9063 17.4342 15.7886H18.4195C19.1263 13.8927 19.5 11.9084 19.5 9.8902Z" fill="currentColor"></path>
                        <path d="M12.7521 13.8587C12.2153 14.1781 11.3523 14.3344 10.1631 14.3344C8.97389 14.3344 8.15164 14.2053 7.57403 13.9471C6.99642 13.6752 6.60908 13.1724 6.42561 12.4249H5.1073C5.26359 13.4782 5.74607 14.2325 6.54113 14.681C7.33619 15.1227 8.54578 15.3401 10.1563 15.3401C11.7668 15.3401 12.9628 15.1023 13.6967 14.6198C14.4442 14.1305 14.818 13.3763 14.818 12.3637C14.818 11.1949 14.383 10.4474 13.52 10.1212C12.6638 9.79506 11.7192 9.5844 10.6931 9.49606C9.66702 9.39413 8.72246 9.26502 7.85265 9.10873C6.99642 8.95243 6.56831 8.44957 6.56831 7.61373C6.56831 6.9138 6.86051 6.42453 7.45172 6.13233C8.04292 5.84013 8.87876 5.69742 9.96602 5.69742C10.9242 5.69742 11.6989 5.82654 12.2969 6.08476C12.8948 6.34299 13.2414 6.82546 13.3433 7.5186H14.6413C14.5325 6.51967 14.0908 5.80615 13.3094 5.36445C12.5347 4.91595 11.4134 4.6917 9.95923 4.6917C8.50501 4.6917 7.3226 4.92954 6.50715 5.41202C5.6985 5.8877 5.29757 6.6284 5.29757 7.62732C5.29757 8.76216 5.72568 9.48927 6.5819 9.79506C7.45172 10.1009 8.39628 10.3115 9.42239 10.4067C10.4485 10.495 11.3931 10.6377 12.2493 10.828C13.1191 11.0046 13.5472 11.5347 13.5472 12.4113C13.5472 13.0569 13.2754 13.5393 12.7386 13.8587H12.7521Z" fill="currentColor"></path>
                        <path d="M2.47747 4.25H1.49213C0.846567 6.07117 0.5 7.9671 0.5 9.8834C0.5 11.7997 0.873748 13.8791 1.58047 15.7818H2.56581C1.8319 13.9063 1.45136 11.922 1.45136 9.8834C1.45136 7.84478 1.80472 6.05079 2.47747 4.25Z" fill="currentColor"></path>
                    </svg>SNAP</p></a>
      </div>
      <div id="h_2">
        <a href="javascript:void(0)" id="end_line"><p>오프라인 스토어</p></a>
        <a href='javascript:window.name = "search"; window.location.href = "main.html"'><p>검색</p></a>
        <a href="javascript:void(0)"><p>좋아요</p></a>
        <a href="mypage.html"><p>마이</p></a>
        <a href="cart.html"><p>장바구니 <span class="badge"></span></p></a>
      </div>
    `
document.body.prepend(header)
const modalHTML = document.createElement("div")
modalHTML.id = "Modal"
modalHTML.className = "modal-overlay"
modalHTML.innerHTML = `
    <div class="modal-container" role="menu">
        <nav class="header1">
            <button class="h_tab selected" onclick="toggle(1, this)">카테고리</button>
            <button class="h_tab" onclick="toggle(1, this)">서비스</button>
        </nav>
        <nav class="header2">
            <button class="h_tab selected" onclick="toggle(2, this)">전체</button>
            <button class="h_tab" onclick="toggle(2, this)">남성</button>
            <button class="h_tab" onclick="toggle(2, this)">여성</button>
        </nav>
        <div class="main-list">
            <nav class="sidebar"></nav>
            <nav id="category" class="category-list" aria-label="카테고리 목록"></nav>
        </div>
    </div>
    `
document.body.prepend(modalHTML)

let imgi = 0, categoryList
const frame = document.querySelector('.main-list').cloneNode(true)
const subfn = (sup, sub, ul, type) => {
    const li = document.createElement("li")
        , a = document.createElement("a")
        , img = document.createElement("img")
    a.href = `rank.html?type=${sup},${sub},${type}`
    img.src = categoryImgs[document.querySelector(`nav.header2 .h_tab.selected`).textContent][imgi]
    a.appendChild(img)
    a.appendChild(document.createTextNode(sub))
    li.appendChild(a)
    ul.appendChild(li)
    imgi++
}

const linefn = _ => {
    const header4 = document.createElement("div")
        , text = document.createElement("div")
        , line = document.createElement("div")
    line.className = "divider"
    categoryList.appendChild(line)
    header4.className = "header3"
    header4.setAttribute("role", "heading")
    text.textContent = _
    header4.appendChild(text)
    categoryList.appendChild(header4)
}

const toggle = (_, el) => {
    _ = document.querySelector(`nav.header${_} .h_tab.selected`)
    _.classList.remove('selected')
    el.classList.add('selected')
    load(el.textContent)
}

const observer = new IntersectionObserver(entries => {
    let topMostSection = null;
    let minTop = Infinity;

    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const topRelativeToModal = entry.boundingClientRect.top - entry.rootBounds.top;
            if (topRelativeToModal < minTop) {
                minTop = topRelativeToModal;
                topMostSection = entry.target;
            }
        }
    });

    if (topMostSection) {
        const id = topMostSection.getAttribute("id");
        document.querySelector('.menu-item.selected')?.classList.remove('selected');
        document.querySelector(`.menu-item[data-target="${id}"]`)?.classList.add('selected');
    }
}, {
    root: document.querySelector(".modal-container"),
    threshold: [0]
});

const modal = document.getElementById('Modal')
    , hamberger = document.querySelector('svg[role="button"]')
modal.on = _ => modal.style.display = _ ? 'block' : 'none'

window.addEventListener('click', event => { if (event.target === modal) modal.on(0) })
window.addEventListener('keydown', event => { if (event.key === "Escape") modal.on(0) })

hamberger.addEventListener("click", _ => modal.on(1))
hamberger.addEventListener("keydown", _ => {
    if (_.key === 'Enter' || _.keyCode === 13) modal.on(1)
})

const sidebar_load = (n, type) => {
    const sidebar = document.querySelector('.sidebar');
    Object.keys(n ? service : categories[type]).forEach((text, idx) => {
        const button = document.createElement('button');
        button.className = 'menu-item';
        button.textContent = text;
        button.dataset.target = text;

        if (idx === 0) {
            button.classList.add('selected');
            button.setAttribute('aria-current', 'true');
        }

        button.addEventListener('click', _ => {
            document.getElementById(text).scrollIntoView({ block: 'start' })
            if (Array.from(button.classList).includes("selected")) return
            _ = document.querySelector('.menu-item.selected')
            _.classList.remove('selected')
            _.removeAttribute('aria-current')
            button.classList.add('selected')
            button.setAttribute('aria-current', 'true')
        });

        sidebar.appendChild(button);
    });
}

const categoryList_load = type => {
    imgi = 0;
    for (let [sup, sub] of Object.entries(categories[type])) {
        const div = document.createElement("div")
            , left = document.createElement("div")
            , link = document.createElement("a")
        div.className = "header3"
        div.id = sup
        div.setAttribute("role", "heading")
        left.textContent = sup
        link.href = `rank.html?type=${sup}`
        link.textContent = "전체보기"
        if (sideIcon[sup]) {
            const icon = document.createElement("img")
            icon.src = sideIcon[sup]
            left.appendChild(icon)
            link.textContent = "스토어 가기"
        }
        div.appendChild(left)
        div.appendChild(link)
        categoryList.appendChild(div)
        observer.observe(div)
        let sub2 = []
        if (divider[sup]) {
            const _ = sub.indexOf("신상", 1)
            sub2 = sub.slice(_)
            sub = sub.slice(0, _)
            linefn("품목별")
        }
        let ul = document.createElement("ul")
        sub.forEach(e => subfn(sup, e, ul, type))
        categoryList.appendChild(ul)
        ul = document.createElement("ul")
        sub2.forEach(e => {
            if (e == "신상") linefn(divider[sup])
            subfn(sup, e, ul, type)
        })
        if (sub2.length) categoryList.appendChild(ul)
    }
}

const service_load = _ => {
    for (let [sup, sub] of Object.entries(service)) {
        const div = document.createElement("div")
            , left = document.createElement("div")
        div.className = "header3"
        div.id = sup
        div.setAttribute("role", "heading")
        left.textContent = sup
        div.appendChild(left)
        categoryList.appendChild(div)
        observer.observe(div)
        const ul = document.createElement("ul")
        sub.forEach(e => {
            const li = document.createElement("li")
                , a = document.createElement("a")
                , svg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
            a.href = e[1]
            a.textContent = e[0]
            a.appendChild(svg)
            li.appendChild(a)
            ul.appendChild(li)
            svg.outerHTML = `<svg width="12px" height="12px" viewBox="0 0 20 20" fill="none" class="_menu__service-sub-item-icon_hefo9_226" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.5 16L13.2879 10.2121C13.405 10.095 13.405 9.90503 13.2879 9.78787L7.5 4" stroke="#909090" vector-effect="non-scaling-stroke"/>
            </svg>`
        })
        categoryList.appendChild(ul)
    }
}

const load = _ => {
    const type = document.querySelector(`nav.header2 .h_tab.selected`).textContent
    document.querySelector('.main-list').replaceWith(frame.cloneNode(true))
    categoryList = document.getElementsByClassName("category-list")[0]
    categoryList.id = _ == "서비스" ? "service" : "category"
    _ = "서비스" == _
    sidebar_load(_, type)
    if (_) {
        document.querySelector('.header2').style.display = 'none'
        service_load()
    }
    else {
        document.querySelector('.header2').style.display = ''
        categoryList_load(type)
    }
}

load("카테고리")

const bucket = JSON.parse(localStorage.getItem('cart'))?.length || 0
if (bucket > 0) {
    document.getElementsByClassName("badge")[0].textContent = bucket
    document.getElementsByClassName("badge")[0].style.display = ''
}
else document.getElementsByClassName("badge")[0].style.display = 'none'

document.querySelectorAll('button').forEach(btn => {
    btn.setAttribute('type', 'button')
});