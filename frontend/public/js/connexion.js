///////////////////////////////////////////////////////////
// Connexion.js: //////////////////////////////////////////
///////////////////////////////////////////////////////////


const url = 'http://localhost:3000/api/users/login'

 // Création de l'objet;
let userConnect = {
  email: document.getElementById('inputEmail').value,
  password: document.getElementById('inputPassword').value
}

console.log('DETAILS USERCONNECT:')
console.log(userConnect)
console.log(userConnect.password)

var myInit = {
  method: "POST",
  headers: new Headers({
    "Content-Type": "application/json;charset=UTF-8"
  }),
  body: JSON.stringify(userConnect),
  mode: 'cors',
  cache: 'default'
};

console.log('DETAIL DE L\'URL AVANT L\'ENVOIE AU FETCH:')
console.log(url)

// Fetch à laquelle on donne en paramétres l'url et options:
fetch(url, myInit)
  .then(response => response.json())
  // Quand la promesse est tenue, elle est parsée au format Json
  .then(json_object => {
      // Quand la promesse est tenue, crée une variable qui contient l'objet:
      let getUser = json_object
      console.log(getUser)
      // Va à la page:-
      //window.location = "../html/postWall.html"
  })






/*
// 1) ////////////////////////////////////////////////////////
// XMLHttpRequest se connecte et récupére les données:

// Déclaration de la variable contenant l'url:
const url = "http://localhost:3000/api/users/login";

// Création de la fonction qui se connecte:


  // Creer un nouvel objet Ajax de type XMLHttpRequest:
  let xhr = new XMLHttpRequest()


    // Détecte l'état de la requête:
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {

      // Envoie terminé, contenu récupéré et convertit en Json:
      var result = JSON.parse(this.responseText)
      //console.log(result)
      // Réponse: retourne le tableau avec les produits

      // envoie le result à la fonction display:
      //displayAll(result)

    } else if (this.readyState == XMLHttpRequest.DONE && this.status == 500) {
      // Si erreur 500 affiche dans console:
      console.log("Erreur 500")
    }


  // Ouvre la connexion en précisant la méthode:
  xhr.open("POST", url, true)

  // Envoie la requête:
  xhr.send()

console.log(result)
*/







/*

// 1) ////////////////////////////////////////////////////////
// XMLHttpRequest se connecte et récupére les données:

// Déclaration de la variable contenant l'url:
const url = "http://localhost:3000/api/teddies";

// Création de la fonction qui se connecte:
async function connect(url) {

  // Creer un nouvel objet Ajax de type XMLHttpRequest:
  let xhr = new XMLHttpRequest()

  xhr.onreadystatechange = function () {
    // Détecte l'état de la requête:
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {

      // Envoie terminé, contenu récupéré et convertit en Json:
      var result = JSON.parse(this.responseText)
      //console.log(result)
      // Réponse: retourne le tableau avec les produits

      // envoie le result à la fonction display:
      displayAll(result)

    } else if (this.readyState == XMLHttpRequest.DONE && this.status == 500) {
      // Si erreur 500 affiche dans console:
      console.log("Erreur 500")
    }
  }

  // Ouvre la connexion en précisant la méthode:
  xhr.open("GET", url, true)

  // Envoie la requête:
  xhr.send()
}
connect(url)


// 2) ////////////////////////////////////////////////////////
// Fonction qui affiche les produit:
function displayAll(result) {

  //Selectionne l'id parent:
  let main = document.querySelector('main')

  //////////////////////////////////////////////////////////
  // Création des éléments de base enfants:

  // Container:
  let divContainer = createTag('div')
  addClass(divContainer, 'container')

  // Row:
  let divRow = createTag('div')
  addClass(divRow, 'row')

  // Col-12
  let divCol = createTag('div')
  addClass(divCol, 'col-12')

  // Box:
  let box = createTag('div')
  addClass(box, 'box')

  // BoxCarte:
  let boxCarte = createTag('div')
  addClass(boxCarte, 'box__carte')

  //////////////////////////////////////////////////////////
  // Boucle qui parcours result:
  for (var i = 0; i < result.length; i++) {

    //////////////////////////////////////////////////////////
    // Création des éléments enfants à chaque tour du tableau:

    // Carte:
    let divCarte = createTag('div')
    addClass(divCarte, 'carte')

    // CarteTurned:
    let divCarteTurned = createTag('div')
    addClass(divCarteTurned, 'carte__turned')

    // Front:
    let divCarteFront = createTag('label')
    addClass(divCarteFront, 'carte__front')

    //////////////////////////////////////////////////////////
    // Intérieur du Front:

    // Image:
    let divCardPicture = createTag('img')
    addClass(divCardPicture, 'carte--picture')
    divCardPicture.src = result[i].imageUrl
    divCardPicture.alt = 'Image de nounours de la gamme Orinoco'

    // Overlay:
    let divCarteOverlay = createTag('div')
    addClass(divCarteOverlay, 'carte--overlay')

    // Titre du Front:
    let divCarteTitle = createTag('h3')
    addClass(divCarteTitle, 'carte--title')

    // Back:
    let divCarteBack = createTag('label')
    addClass(divCarteBack, 'carte__back')
    addClass(divCarteBack, 'text-center')
    addClass(divCarteBack, 'bg-gradient')

    //////////////////////////////////////////////////////////
    // Intérieur du Back:

    // Header:
    let divCarteHeader = createTag('div')
    addClass(divCarteHeader, 'card-header')
    addClass(divCarteHeader, 'card-header--modify')

    // Body:
    let divCarteBody = createTag('div')
    addClass(divCarteBody, 'card-body')

    //////////////////////////////////////////////////////////
    // Intérieur de Card-body:

    // Description:
    let pCarteDescription = createTag('p')
    addClass(pCarteDescription, 'card-text')
    addClass(pCarteDescription, 'text-black-50')

    // Price:
    let price = createTag('p')
    addClass(price, 'card-text')

    // Intérieur de Price:
    let strongPrice = createTag('strong')
    addClass(strongPrice, 'text-light')
    addClass(strongPrice, 'font-weight-normal')

    // Carte Footer
    let carteFooter = createTag('div')
    addClass(carteFooter, 'card-footer')

    //////////////////////////////////////////////////////////
    // Intérieur de CardFooter:

    // Button:
    let button = createTag('a')
    addClass(button, 'btn')
    addClass(button, 'rounded-pill')
    addClass(button, 'btn-dark')
    button.textContent = "En savoir plus"

    //////////////////////////////////////////////////////////
    //Récupére l'id pour le mettre dans le href:
    let id = result[i]._id
    //console.log(id)
    // Réponse: retourne les id des produits

    // Ajoute l'id dans l'url des produit sélectionnés:
    button.setAttribute("href", "product.html?id=" + id)

    //////////////////////////////////////////////////////////
    // Affiche les données:
    divCardPicture.innerHTML = result[i].imageurl
    divCarteTitle.innerHTML = result[i].name
    pCarteDescription.innerHTML = result[i].description
    price.innerHTML = result[i].price /100 + "€"

    //////////////////////////////////////////////////////////
    // Ajout des élément dans le index.html:

    // Ajout des élément de base:
    main.appendChild(divContainer)
    divContainer.appendChild(divRow)
    divRow.appendChild(divCol)

    divCol.appendChild(box)
    box.appendChild(boxCarte)
    boxCarte.appendChild(divCarte)
    divCarte.appendChild(divCarteTurned)

    // Ajoute le Front de la carte:
    divCarteTurned.appendChild(divCarteFront)
    divCarteFront.appendChild(divCardPicture)
    divCarteFront.appendChild(divCarteOverlay)
    divCarteOverlay.appendChild(divCarteTitle)

    // Ajoue le Back de la carte:
    divCarteTurned.appendChild(divCarteBack)
    divCarteBack.appendChild(divCarteHeader)
    divCarteBack.appendChild(divCarteBody)
    divCarteBody.appendChild(pCarteDescription)
    divCarteBody.appendChild(price)
    divCarteBody.appendChild(carteFooter)
    carteFooter.appendChild(button)

  }
}*/
