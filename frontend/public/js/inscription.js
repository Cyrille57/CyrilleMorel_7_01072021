///////////////////////////////////////////////////////////
// Inscription.js /////////////////////////////////////////
///////////////////////////////////////////////////////////



  // Sélection du bouton submit:
  let btnValidateOrder = document.getElementById('buttonConfirmationSignIn')

  btnValidateOrder.addEventListener("click", (event) => {

    //event.preventDefault()

     // Création de l'objet;
    let userRegister = {
      username:   document.getElementById('inputPseudo').value,
      email:      document.getElementById('inputEmail').value,
      password:   document.getElementById('inputPassword').value
    }
    console.log(userRegister)

    const url = 'http://localhost:3000/api/users/signup'

    async function connect(url) {

      let xhr = new XMLHttpRequest()

      xhr.onreadystatechange = function () {
        if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
          var result = JSON.parse(this.responseText)
          console.log(result)
          window.location = 'profil.html'

          //displayAll(result)
        } else if (this.readyState == XMLHttpRequest.DONE && this.status == 500) {
          console.log('Erreur 500')
        }
      }

      xhr.open('POST', url, true)
      xhr.send()
    }

     connect(url)

      // Va à la page:-
      //window.location = "confirmation.html"
  })




/*
const url = 'http://localhost:3000/api/users/signup'

async function connect(url) {

  let xhr = new XMLHttpRequest()

  xhr.onreadystatechange = function () {
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
      var result = JSON.parse(this.responseText)
      console.log(result)
      window.location = 'profil.html'

      //displayAll(result)
    } else if (this.readyState == XMLHttpRequest.DONE && this.status == 500) {
      console.log('Erreur 500')
    }
  }

  xhr.open('POST', url, true)
  xhr.send()
}

connect(url)
*/
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






