//
// hide topnav on scroll
//
window.addEventListener("load", function() {
  let topNav = document.querySelector("body header .hs.no-scrollbar ul.md-tabs__list");
  let sidebarPrimary = document.querySelector("body .md-sidebar.md-sidebar--primary");
  let sidebarSecondary = document.querySelector("body .md-sidebar.md-sidebar--secondary");
  let siteTopic = document.querySelector("body header .md-header-nav__title");
  if (window.pageYOffset > 0) {
    topNav.style.display = "none";
    sidebarPrimary.setAttribute("data-md-state", "lock");
    sidebarSecondary.setAttribute("data-md-state", "lock");
    siteTopic.setAttribute("data-md-state", "active");
  }
  let prevScrollpos = window.pageYOffset;
  // let prevPageHeight = document.getBoundingClientRect().height
  window.onscroll = function() {
    let currentScrollPos = window.pageYOffset;
    if (currentScrollPos <= 0) {
      topNav.style.display = "block";
      sidebarPrimary.setAttribute("data-md-state", "");
      sidebarSecondary.setAttribute("data-md-state", "");
      siteTopic.setAttribute("data-md-state", "");
    } else if (currentScrollPos < 100) {
      siteTopic.setAttribute("data-md-state", "active");
    } else {
      topNav.style.display = "none";
      sidebarPrimary.setAttribute("data-md-state", "lock");
      sidebarSecondary.setAttribute("data-md-state", "lock");
    }
    prevScrollpos = currentScrollPos;
  }
});

//
// sidebar menu
//
window.addEventListener("load", function() {
  let menuItemNested = document.querySelectorAll(".md-nav__item--nested")
  menuItemNested && menuItemNested.forEach(e => {
    e.addEventListener('click', ()=> {
      e.classList.toggle("md-nav__item--nested-open")
      e.classList.add("md-nav__item--nested-open-active")
      menuItemNested.forEach(el => { el !== e && el.classList.remove("md-nav__item--nested-open-active") })
    })
  });
})

//
// focus active menu item
//
window.addEventListener("DOMContentLoaded", function() {
  let c = document.querySelector("body .md-content .md-typeset")
  let menuItemActive = document.querySelector(`.md-nav__link[href="${window.location.pathname}"]`)
  menuItemActive?.focus()?.blur()
  c?.focus()?.blur()
})

function updateActiveMenuItem(entries, menuEntries) {
  // console.log('pageoffset ' + window.pageYOffset)
  entries.forEach((e,i) => {
    let eTop = e.parentNode.getBoundingClientRect().top
    // bottom page
    if ((window.innerHeight + window.pageYOffset) >= document.body.scrollHeight) {
      let lastItem = menuEntries[menuEntries.length - 1]
      lastItem.classList.add("md-nav__link-active")
      lastItem.classList.add("md-nav__link-passed")
      menuEntries.forEach((end,ind) => {
        if (i > ind) {
          menuEntries[ind].classList.remove("md-nav__link-active")
          menuEntries[ind].classList.add("md-nav__link-passed")  
        }
      })
      return
    }

    if (eTop > -10 && eTop < 100) {
      menuEntries[i].classList.add("md-nav__link-active")
      menuEntries[i].classList.add("md-nav__link-passed")
      menuEntries.forEach((end,ind) => {
        if (i > ind) {
          menuEntries[ind].classList.remove("md-nav__link-active")
          menuEntries[ind].classList.add("md-nav__link-passed")  
        } else if (i < ind) {
          menuEntries[ind].classList.remove("md-nav__link-active")
          menuEntries[ind].classList.remove("md-nav__link-passed")         
        }
      })
      return
    } else if (eTop > 100 && eTop < 130) {
      menuEntries[i].classList.remove("md-nav__link-active")
      menuEntries[i].classList.remove("md-nav__link-passed")
      if (i !== 0) { menuEntries[i - 1].classList.add("md-nav__link-active") }
      return
    }
  })
}

window.addEventListener("DOMContentLoaded", function() {
  let entries = document.querySelectorAll("h2, h3, h4")
  let menuEntries = document.querySelectorAll(".md-sidebar--secondary li a")
  updateActiveMenuItem(entries, menuEntries)
  // let prevScrollpos = window.pageYOffset
  document.addEventListener('scroll', () => {
    updateActiveMenuItem(entries, menuEntries)
  })
})


let jsonData = {};
let searchResults = [];

// search
window.addEventListener("DOMContentLoaded", function() {
  let searchInput = document.querySelector("form.md-search__form input.md-search__input")
  let searchResultOutputList = document.querySelector(".md-search__output ol.md-search-result__list")
  let searchInputReset = document.querySelector("form.md-search__form .md-icon.md-search__icon[type='reset']")
  let searchCheckbox = document.querySelector("[data-md-toggle='search']")
  let searchIconMobile = document.querySelector(".md-icon.md-icon--search.md-header-nav__button")
  let searchMeta = document.querySelector(".md-search-result__meta")
  let searchMetaContent = searchMeta.textContent
  let resultCount = 0

  searchInputReset.addEventListener('click', () => {
    searchResultOutputList.innerHTML = '';
    resultCount = 0
    searchMeta.textContent = searchMetaContent
    if (searchInput.value == '') { searchCheckbox.checked = false }
  })

  searchIconMobile.addEventListener('click', () => {
    setTimeout(function(){
      searchInput.focus()
    }, 100);
  })
  
  searchInput.addEventListener('focus', () => {
    searchCheckbox.checked = true;
    if (searchInput?.value?.length === 0) {
       searchResultOutputList.innerHTML = '';
       resultCount = 0
       searchMeta.textContent = searchMetaContent
    }
    if (Object.keys(jsonData).length === 0) {
      fetch('/search/search_index.json').then(
        function(u){ return u.json();}
      ).then(
        function(json){
          jsonData = json;
        }
      )
    }
  })


  searchInput.addEventListener('keyup', () => {
    const searched = searchInput.value.toLowerCase()
    searchResultOutputList.innerHTML = '';
    resultCount = 0;
    if (searched.length < 3) { 
      searchMeta.textContent = searchMetaContent 
      return 
    }
    else { 
      searchMeta.textContent = "No matching documents";
      (Object.keys(jsonData).length !== 0) && jsonData.docs.forEach((e,i) => {

        let matchTitle = false
        let matchContent = false
        let linesToPrint = []
        let titleMarked
        let regexp = new RegExp(searched, "ig")

        if (e.title.toLowerCase().includes(searched)) {
          matchTitle = true
          let matches = e.title.match(regexp);
          titleMarked = e.title.replaceAll(matches[0], `<mark>${matches[0]}</mark>`)
        }

        if (e.content.toLowerCase().includes(searched)) {
          matchContent = true
          let contentLines = (e.content).split("\n")
          
          contentLines.forEach((line,lineId) => {
            if (line.toLowerCase().includes(searched)) {
              let lineContent = JSON.parse(JSON.stringify(line))
              let lineMatches = lineContent.match(regexp);
              lineMarked = lineContent.replaceAll(lineMatches[0], `<mark>${lineMatches[0]}</mark>`)
              linesToPrint.push(lineMarked)
            }
          })
        }

        if (!(!matchTitle && !matchContent)) {
          resultCount++
          searchMeta.textContent = `${resultCount} matching document${resultCount > 1 && 's' || ''}`

          let result = document.createElement('li')
          result.className = "md-search-result__item"
          
          let anchor = document.createElement('a')
          anchor.className = "md-search-result__link"
          anchor.href = e.location
          
          let article = document.createElement('article')
          article.className = "md-search-result__article md-search-result__article--document"

          let h1 = document.createElement('h1')
          h1.className = "md-search-result__title"
          h1.innerHTML = titleMarked ?? e.title
          
          article.appendChild(h1)

          if (matchContent) {
            linesToPrint.forEach(lineP => {
              let paragraph = document.createElement('p')
              paragraph.className = "md-search-result__teaser"
              paragraph.innerHTML = lineP
              article.appendChild(paragraph)
            })
          }

          anchor.appendChild(article)
          result.appendChild(anchor)

          if (matchTitle) {
            let firstChild = document.querySelector(".md-search__output ol.md-search-result__list .md-search-result__item:first-child");
            let children = document.querySelectorAll(".md-search__output ol.md-search-result__list .md-search-result__item h1");
            let inserted = false
            children.forEach((c,ichi) => {
              if (!inserted && c.textContent.match(regexp)) {
                if (!children[ichi + 1].textContent.match(regexp)) {
                  c.parentNode.parentNode.parentNode.after(result)
                  inserted = true
                }
              } 
            })
            !inserted && searchResultOutputList.insertBefore(result, firstChild)
          } else {
            searchResultOutputList.appendChild(result)
          }
        }

      })
    }

  })

})