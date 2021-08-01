///////////////////////////////////////////////////////////
// Inscription.js /////////////////////////////////////////
///////////////////////////////////////////////////////////


const url = 'http://localhost:3000/api/users/signup'


async function connect(url) {

  // Creer un nouvel objet Ajax de type XMLHttpRequest:
  let xhr = new XMLHttpRequest()

  xhr.onreadystatechange = function () {
    // Détecte l'état de la requête:
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {

      // Envoie terminé, contenu récupéré et convertit en Json:
      var result = JSON.parse(this.responseText)
      console.log(result)
      //console.log(result)
      // Réponse: retourne le tableau avec les produits

      // envoie le result à la fonction display:
      //displayAll(result)

    } else if (this.readyState == XMLHttpRequest.DONE && this.status == 500) {
      // Si erreur 500 affiche dans console:
      console.log("Erreur 500")
    }
  }

  // Ouvre la connexion en précisant la méthode:
  xhr.open("POST", url, true)

  // Envoie la requête:
  xhr.send()
}
connect(url)




/*
const sendSignIn = (() =>{
  // Sélection du bouton "valider la commande":
  let btnValidateOrder = document.getElementById('buttonConfirmationSignIn')

  btnValidateOrder.addEventListener("click", (event) => {

    event.preventDefault()

     // Création de l'objet;
    let userRegister = {
    username: document.getElementById('inputPseudo').value,
    email: document.getElementById('inputEmail').value,
    password: document.getElementById('inputPassword').value
    }
    console.log(userRegister)

    const url = 'http://localhost:3000/api/users/signup'

    // Objet contenant les options en second paramétre de fetch:
    var myInit = {
      method:     'POST',
      headers:
                  new Headers({
                  'Accept': 'application/json',
                  'Content-Type': 'application/json;charset=UTF-8'
                  }),
      body:       JSON.stringify(userRegister),
      mode:       'cors',
      credentials: "same-origin",
      cache:      'default'
    };

    // Fetch à laquelle on donne en paramétres l'url et options:
    fetch(url, myInit)
    .then((response) => {
      response.json()
      console.log(response)
    })
    .then(json_object => {
      // Quand la promesse est tenue, crée une variable qui contient l'objet:
      let userSignIn = json_object
      console.log(userSignIn)

      // Va à la page:-
      //window.location = "confirmation.html"
    })

  })

})

*/






