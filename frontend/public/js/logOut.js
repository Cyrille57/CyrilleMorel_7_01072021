///////////////////////////////////////////////////////////
// LogOut.js: /////////////////////////////////////////////
///////////////////////////////////////////////////////////


///////////////////////////////////////////////////////////
// LogGout:

function displayNavBar() {

  //Selectionne l'id parent:
   // header:
  let header = document.getElementById('header')
  console.log(header)

  // frame de la navbar:
  let frameNavBar = createTag('nav')
  addClass(frameNavBar, ['navbar', 'postWall-navbar'])

  // container de la navbar:
  let containerNavBar = createTag('div')
  addClass(containerNavBar, ['container', 'postWall-container'])

  // Injecte dans le html:
  header.appendChild(frameNavBar)
  frameNavBar.appendChild(containerNavBar)

  // frame logo:
  let frameLogo = createTag('div')
  addClass(frameLogo, ['postWall-frame-logo'])

  // lien du lmogo:
  let linkLogo = createTag('a')
  //addClass(linkLogo, [''])
  linkLogo.setAttribute('href', '../html/postWall.html')

  // image du logo:
  let logo = createTag('img')
  addClass(logo, ['postWall-logo-site'])
  logo.setAttribute('src', '../images/Logo Groupomania/icon-left-font-monochrome-black.png')
  logo.setAttribute('width', '35')
  logo.setAttribute('height', '35')
  logo.setAttribute('alt', 'Logo de Groupomania')

  // Injecte dans le html:
  containerNavBar.appendChild(frameLogo)
  frameLogo.appendChild(linkLogo)
  linkLogo.appendChild(logo)

  // frame ul:
  let frameUl = createTag('div')
  addClass(frameUl, ['postWall-frameUlNav'])

  // ul
  let ulNav = createTag('ul')
  addClass(ulNav, ['postWall-frameUlNav__ul'])

  // Injecte dans le html:
  containerNavBar.appendChild(frameUl)
  frameUl.appendChild(ulNav)

  // li vue profil:
  let liViewProfil = createTag('li')
  addClass(liViewProfil, ['postWall-linkProfil'])

  // lien de viewProfil:
  let linkViewProfil = createTag('a')
  linkViewProfil.setAttribute("href", "../html/vueProfil.html?id=" + idUserConnect)

  // icone vue profil:
  let iconeViewProfil = createTag('i')
  addClass(iconeViewProfil, ['fas', 'fa-user-circle', 'fa', 'postWall-linkProfil__icon'])

  // Injecte dans le html:
  ulNav.appendChild(liViewProfil)
  liViewProfil.appendChild(linkViewProfil)
  linkViewProfil.appendChild(iconeViewProfil)

  // li logout:
  let liLogOut = createTag('li')
  addClass(liLogOut, ['postWall-linkDeconnect'])

  // lien de logout:
  let linkLogout = createTag('a')
  //linkLogout.setAttribute('href', '../../index.html')
  linkLogout.setAttribute('id', 'logOut')

  // icone logOut:
  let iconeLogOut = createTag('i')
  addClass(iconeLogOut, ['fas', 'fa-sign-out-alt', 'fa', 'postWall-linkDeconnect__icon'])

  // Injecte dans le html:
  ulNav.appendChild(liLogOut)
  liLogOut.appendChild(linkLogout)
  linkLogout.appendChild(iconeLogOut)

  //---------------------------------------------------------
  // LogOut:

  // Sélectionne l'icone:
  let getLinkLogout = document.getElementById('logOut')
  console.log(getLinkLogout)

  // Ecoute le lien:
  getLinkLogout.addEventListener('click', (event) => {

    localStorage.removeItem('infoUserToken')
    localStorage.removeItem('infoUserId')
    location.href =  '../../index.html'
  })

}
displayNavBar()
