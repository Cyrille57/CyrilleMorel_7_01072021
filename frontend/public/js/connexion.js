///////////////////////////////////////////////////////////
// Connexion.js: //////////////////////////////////////////
///////////////////////////////////////////////////////////


const url = 'http://localhost:3000/api/users/login'

const loginForm = document.getElementById('loginForm')

loginForm.addEventListener('submit', function(event) {

  event.preventDefault()
  //console.log('Connexion.js log de event:')
  //console.log(event)

  let formData = {
    email:    document.getElementById('inputEmail').value,
    password: document.getElementById('inputPassword').value
  }
  //console.log('connexion.js log de formData:')
  //console.log(formData)

  var myInit = {
    method:   "post",
    headers:  new Headers({
              "Content-Type": "application/json;charset=UTF-8"
    }),
    body:     JSON.stringify(formData),
    mode:     'cors',
    cache:    'default'
  };
  //console.log('Connexion.js log de myInit:')
  //console.log(myInit)

  fetch(url, myInit)
  .then(response => response.json())
  .then(json_object => {

    let getUser = json_object
    //console.log(getUser)

    window.location = "/frontend/public/html/postWall.html"
})
  .catch((error) => {
    console.log(error)
  })

})


