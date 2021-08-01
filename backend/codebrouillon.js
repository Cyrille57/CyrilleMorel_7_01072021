/*
// Tableau pour la partie administration:
<table class='table table-bordered table-sm'>

<thead>
  <tr class="table-primary text-center align-middle ">
    <th scope='col' class="col-sm-3">#</th>
    <th scope='col' class="col-sm-3">Pseudo</th>
    <th scope='col' class="col-sm-3">Email</th>
    <th scope='col' class=" col-sm-3">Action</th>
  </tr>
</thead>

<tbody>
  <tr class="text-center align-middle">

    <th scope='row'>1</th>
    <td >Mark</td>
    <td>Otto</td>

    <td class="d-flex justify-content-center">
      <a href='http://' type='button' class='btn btn-light btn-small'>
        <i class='bi bi-eye'></i>
          Vue
      </a>
      <a href='http://' type='button' class='btn btn-light btn-small mx-3'>
        <i class='bi bi-pencil'></i>
          Éditer
      </a>
      <a href='http://' type='button' class='btn btn-light btn-small'>
        <i class='bi bi-person-x'></i>
          Supprimer
      </a>
    </td>

  </tr>
</tbody>

</table>


// Navbar header:
<header>
  <nav class='navbar navbar-expand-lg navbar-light bg-light'>
    <div class='container-fluid'>
      <a class='navbar-brand' href='#'>Groupomania</a>
      <button
        class='navbar-toggler'
        type='button'
        data-bs-toggle='collapse'
        data-bs-target='#navbarSupportedContent'
        aria-controls='navbarSupportedContent'
        aria-expanded='false'
        aria-label='Toggle navigation'
      >
        <span class='navbar-toggler-icon'></span>
      </button>
      <div class='collapse navbar-collapse' id='navbarSupportedContent'>
        <ul class='navbar-nav me-auto mb-2 mb-lg-0'>
          <li class='nav-item'>
            <a class='nav-link active' aria-current='page' href='#'>Home</a>
          </li>


        </ul>
        <form class='d-flex'>
          <input
            class='form-control me-2'
            type='search'
            placeholder='Search'
            aria-label='Search'
          />
          <button class='btn btn-outline-success' type='submit'>Search</button>
        </form>
      </div>
    </div>
  </nav>
</header>
*/

// page connexion mtml :
/*
  <div class="container d-flex justify-content-center mt-5">
    <img src="./Public/Images/Logo Groupomania/icon-left-font-monochrome-white.svg" width="250" alt="" srcset="">
  </div>

  <div class="wrapper">
    <div class="card">
      <!-- Formulaire: -->
      <form action="./connect.html"
      method="post"
      class="d-flex flex-column">

        <!-- Titre de la card: -->
        <div class="h3 text-center text-white">
          Connexion
        </div>
        <!-- margin des 2 input: -->
        <div class="d-flex align-items-center input-field my-3 mb-4">
          <!-- Hauteur input email:-->
          <span class="far fa-user p-2"></span>

          <!-- Input email: -->
          <input
          class="form-control"
          name="email"
          type="email"
          required
          placeholder="Email">
        </div>
        <!-- Password: -->
        <div class="d-flex align-items-center input-field mb-4">
          <!-- Margin du placeholder: -->
          <span class="fas fa-lock p-2"></span>

          <!-- Input password: -->
          <input
          id="pwd"
          class="form-control"
          name="password"
          type="password"
          required
          placeholder="Mot de passe"
          minlength="8">

          <span class="btn" onclick="showPassword()">
            <span class="fas fa-eye-slash"></span>
          </span>
        </div>



        <div class="my-4 d-flex justify-content-center">
          <input type="submit" value="Connexion" class="btn btn-primary ">
        </div>

      </form>

      <div class="position-relative border-bottom my-3 line">
      </div>

      <div class="mb-3 mt-3 d-flex flex-column align-items-center  ess">
        <span class="text-light-white">Don't have an account?</span></br>
        <a href="#"> Sign Up</a>
      </div>

    </div>
  </div>

  <script src="./Public/js/function.js"></script>
  <script src="./Public/js/index.js"></script>

*/

// page connexion scss
/*
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Raleway', sans-serif
}

body {
    background: rgb(33,82,171);
    background: linear-gradient(124deg, rgba(33,82,171,1) 0%, rgba(209,81,90,1) 95%, rgba(166,32,32,1) 100%);
    //background: linear-gradient(135deg, #00c3ff, #eeef1c);
    //background: linear-gradient(135deg, #fc00ff, #00dbde);
    background-image: linear-gradient(124deg, rgba(33,82,171,1) 0%, rgba(209,81,90,1) 95%, rgba(166,32,32,1) 100%);
    background-image: linear-gradient(124deg, rgba(33,82,171,1) 0%, rgba(209,81,90,1) 95%, rgba(166,32,32,1) 100%);
    min-height: 100vh
}

.wrapper {
    max-width: 500px;
    margin: 100px auto
}

.wrapper .card {
    max-width: 400px;
    min-height: 450px;
    margin: 30px;
    background: rgba(255, 255, 255, 0.1);
    overflow: hidden;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.5);
    border-radius: 15px;
    cursor: pointer;
    padding: 0.8rem
}

.wrapper .card a {
    text-decoration: none;
    color: #eee
}

.wrapper .card a:hover {
    color: #fff
}

.wrapper .card .input-field {
    border: 1px solid #ddd;
    border-radius: 5px;
    color: #eee;
    padding: 0.3rem
}

.wrapper .card .input-field input {
    background-color: inherit
}

.wrapper .card .input-field input.form-control,
.wrapper .card .input-field input.form-control:focus {
    border: none;
    outline: none;
    box-shadow: none;
    color: #eee
}

.wrapper .card .input-field span.btn {
    color: #eee;
    padding: 0rem;
    padding-right: 0.5rem
}

.wrapper .card .input-field span.btn:hover {
    color: #fff
}

.wrapper .card .input-field span.btn:focus {
    border: none;
    outline: none;
    box-shadow: none
}

.wrapper .card .input-field input::placeholder {
    color: #eee
}

.wrapper .card .option {
    display: block;
    position: relative;
    padding-left: 25px;
    cursor: pointer;
    user-select: none
}

.wrapper .card .option span.text-light-white:hover {
    color: #fff
}

.wrapper .card .option input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0
}


.wrapper .card .option input:checked~.checkmark:after {
    display: block
}


.wrapper .card .btn.btn-primary {
    border-radius: 20px;
    width: 150px;
    background-color: #fff;
    color: #333;
    border: none
}

.wrapper .card .btn.btn-primary:hover {
    color: #fff;
    background: #333
}

.wrapper .card .btn.btn-primary:focus {
    border: none;
    box-shadow: none
}

.wrapper .card .text-light-white {
    color: #ddd
}


.ess{
    height: 50px;
}

@media(max-width: 370px) {
    .wrapper .card .line:after {
        left: 27%
    }
}

@media(max-width: 350px) {
    .wrapper {
        margin: 10px auto
    }

    .wrapper .card {
        margin: 10px
    }
}
*/

// functions js:
/*

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

function showPassword() {
  var password = document.getElementById('pwd');
  if (password.type === 'password') {
  password.type = "text";
  }
  else {
  password.type = "password";
  }
  }
*/
