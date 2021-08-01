///////////////////////////////////////////////////////////
//////////////////// Fonction de base: ////////////////////
///////////////////////////////////////////////////////////


//////////////////////////////////////////////////////////
// Fonction qui crées les balises:
function createTag(tag) {
  return document.createElement(tag)
}

//////////////////////////////////////////////////////////
// Fonction qui ajoute des classes aux balises:
function addClass(name, classe) {
  return name.classList.add(classe)
}

//////////////////////////////////////////////////////////
// affiche le mot de passe:
/*
function showPassword() {

  const password = document.getElementById('inputPassword');

  if (password.type === 'password') {
    console.log('INFOS SHOWPASSWORD IF')
    console.log(password.type)
    password.type = "text";
  }
  else {
    console.log('INFOS SHOWPASSWORD ELSE')
    console.log(password.type)
  password.type = "password";
  }

}
*/

}
