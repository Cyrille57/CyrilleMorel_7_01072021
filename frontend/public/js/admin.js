///////////////////////////////////////////////////////////
// admin.js: ///////////////////////////////////////////
///////////////////////////////////////////////////////////


///////////////////////////////////////////////////////////
// Connexion et récupération: valide


//---------------------------------------------------------
// Users:


// Url pour recupérer les users:
const urlUser = 'http://localhost:3000/api/users'

async function connectUser(urlUser) {

    let xhr = new XMLHttpRequest()

    xhr.onreadystatechange = function () {
        if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {


            var getUser = JSON.parse(this.responseText)
            //console.log(getUser)

            displayAll(getUser)

        } else if (this.readyState == XMLHttpRequest.DONE && this.status == 500) {

            console.log("Erreur 500")
        }
    }
    xhr.open("GET", urlUser, true)
    xhr.send()
}
connectUser(urlUser)

///////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////
// Affiche les users

function displayAll(getUser) {
    //console.log(getUser)
    //Selectionne l'id parent:
    let main = document.querySelector('main')
    console.log(main)

    //---------------------------------------------------------
    // Création des éléments de base enfants:

    // Container:
    let divContainer = createTag('div')
    addClass(divContainer, ['container'])

    // Row:
    let divRow = createTag('div')
    addClass(divRow, ['row'])

    // Col-12
    let divCol = createTag('div')
    addClass(divCol, ['col-12'])
    divCol.setAttribute('id', 'divCol')

    //---------------------------------------------------------
    // Création du tableau:

    // Tableau
    let table = createTag('table')
    addClass(table, ['table', 'table-dark', 'table-hover', 'table-bordered', 'mt-5'])

    //---------------------------------------------------------
    // Entête du tableau:
    let tHead = createTag('thead')

    // Ligne de l'entete;
    let trHead = createTag('tr')
    addClass(trHead, ['table', 'table-light', 'text-center', 'align-middle'])

    //---------------------------------------------------------
    // Colonne:

    // Colonne de l'entete:
    let thHead1 = createTag('th')
    addClass(thHead1, ['col-sm-1'])
    thHead1.setAttribute('scope', 'col')
    thHead1.innerHTML = '#'

    let thHead2 = createTag('th')
    addClass(thHead2, ['col-sm-3'])
    thHead2.setAttribute('scope', 'col')
    thHead2.innerHTML = 'Pseudo'

    let thHead3 = createTag('th')
    addClass(thHead3, ['col-sm-3'])
    thHead3.setAttribute('scope', 'col')
    thHead3.innerHTML = 'Email'

    let thHead4 = createTag('th')
    addClass(thHead4, ['col-sm-6'])
    thHead4.setAttribute('scope', 'col')
    thHead4.innerHTML = 'Action'

    //---------------------------------------------------------
    // Corps du tableau:
    let tBody = createTag('tbody')

    //---------------------------------------------------------
    // Injecte dans le html:

    // Eléments de base enfants:
    main.appendChild(divContainer)
    divContainer.appendChild(divRow)
    divRow.appendChild(divCol)

    // Ajout du Tableau:
    divCol.appendChild(table)
    table.appendChild(tHead)

    // Ligne entete:
    tHead.appendChild(trHead)

    // Colonne entete:
    trHead.appendChild(thHead1)
    trHead.appendChild(thHead2)
    trHead.appendChild(thHead3)
    trHead.appendChild(thHead4)

    // Corps du tableau:
    table.appendChild(tBody)

    //---------------------------------------------------------
    // Boucle pour creer les lignes en foncion des users:

    for (var i = 0; i < getUser.length; i++) {

        //---------------------------------------------------------
        // Création des lignes du tableau:

        // Corp du tableau:
        let trBody = createTag('tr')
        addClass(trBody, ['text-center', 'table-striped', 'align-middle', 'text-white'])
        trBody.setAttribute("id", "trRowUser_" + getUser[i].id)
        console.log(trBody)

        // Entete de la ligne:
        let thRow = createTag('th')
        thRow.setAttribute('scope', 'row')
        thRow.innerHTML = getUser[i].id

        //---------------------------------------------------------
        // Colonne:

        // Colonne pseudo:
        let tdBodyUsername = createTag('td')
        tdBodyUsername.setAttribute("id", "trRowUserName_" + getUser[i].id)
        tdBodyUsername.innerHTML = getUser[i].username

        // Colonne email:
        let tdBodyMail = createTag('td')
        tdBodyMail.innerHTML = getUser[i].email

        //Colonne Action:
        let tBodyAction = createTag('td')
        addClass(tBodyAction, ['d-flex', 'justify-content-center'])

        //---------------------------------------------------------
        // Bouton:

        // Vue:
        let actionVue = createTag('a')
        addClass(actionVue, ['btn', 'btn-light', 'btn-small'])
        actionVue.setAttribute('href', '../html/vueProfil.html')
        actionVue.setAttribute('type', 'button')
        actionVue.setAttribute("data-actionvue", getUser[i].id)
        actionVue.innerHTML = 'Vue'

        // Icone de vue:
        let logoVue = createTag('i')
        addClass(logoVue, ['bi', 'bi-eye'])
        logoVue.setAttribute("data-actionvue", getUser[i].id)

        // Edit:
        let actionEdit = createTag('a')
        addClass(actionEdit, ['btn', 'btn-light', 'btn-small', 'mx-3'])
        actionEdit.setAttribute('href', '#')
        actionEdit.setAttribute('type', 'button')
        actionEdit.setAttribute("data-actionedit", getUser[i].id)
        actionEdit.innerHTML = 'Edit'

        // Icone de edit:
        let logoEdit = createTag('i')
        addClass(logoEdit, ['bi', 'bi-pencil-square'])
        logoEdit.setAttribute("data-actionedit", getUser[i].id)

        // Delete:
        let actionDelete = createTag('a')
        addClass(actionDelete, ['btn', 'btn-light', 'btn-small'])
        actionDelete.setAttribute('href', '#')
        actionDelete.setAttribute('type', 'button')
        actionDelete.setAttribute("data-actiondelete", getUser[i].id)
        actionDelete.innerHTML = 'Delete'

        // Icone de delete:
        let logoDelete = createTag('i')
        addClass(logoDelete, ['bi', 'bi-x-square'])
        logoDelete.setAttribute("data-actiondelete", getUser[i].id)

        //---------------------------------------------------------
        // Injecte dans le html:

        // Ajout corp du tableau:
        tBody.appendChild(trBody)

        // Entete de la ligne:
        trBody.appendChild(thRow)

        //---------------------------------------------------------
        // Colonne:
        trBody.appendChild(tdBodyUsername)
        trBody.appendChild(tdBodyMail)
        trBody.appendChild(tBodyAction)

        //---------------------------------------------------------
        // Bouton:

        //vue:
        tBodyAction.appendChild(actionVue)
        // Bouton vue:
        actionVue.appendChild(logoVue)

        //edit:
        tBodyAction.appendChild(actionEdit)
        // Bouton edit
        actionEdit.appendChild(logoEdit)

        //delete:
        tBodyAction.appendChild(actionDelete)
        // Bouton delete:
        actionDelete.appendChild(logoDelete)

        //---------------------------------------------------------
        // Fonction de Vue, Edit, et Delete:

        //Vue:
        actionVue.addEventListener('click', (event) => {

            event.preventDefault();

            // Cible l'id de vue utilisé:
            let idView = parseInt(event.target.getAttribute('data-actionvue'))
            console.log(idView)

            // Sélectionne la ligne de l'user:
            let getRowUser = document.getElementById("trRowUser_" + idView)
            console.log(getRowUser)

            //---------------------------------------------------------
            // Cache le tableau pour afficher la card user:
            table.style.display = 'none'

            //---------------------------------------------------------
            // Cadre de la card qui affiche l'user:

            // Selectionne l'id parent:
            let getDivCol = document.getElementById('divCol')

            // Card:
            let cardUser = createTag('div')
            addClass(cardUser, ['cardUser'])

            // Frame de la card:
            let divReadCardUser = createTag('div')
            addClass(divReadCardUser, ['display-frameCard__cardUser', 'shadow', 'rounded'])

            // Div gauche:
            let divLeftCardUser = createTag('div')
            addClass(divLeftCardUser, ['divLeftCardUser'])

            // Div droite:
            let divRightCardUser = createTag('div')
            addClass(divRightCardUser, ['divRightCardUser'])

            // Injecte dans le html:
            getDivCol.appendChild(cardUser)
            cardUser.appendChild(divReadCardUser)
            divReadCardUser.appendChild(divLeftCardUser)
            divReadCardUser.appendChild(divRightCardUser)

            //---------------------------------------------------------
            // Intérieur de la card:

            // H2 Cadre Username:
            let divDisplayUsername = createTag('div')
            addClass(divDisplayUsername, ['display-frameCard__cardUserUsername'])

            //---------------------------------------------------------
            // Cherche l'id user pour atteindre les éléments:

            // Username:
            const getUsername = getUser.find(user => user.id === idView).username
            // Email:
            const getEmail = getUser.find(user => user.id === idView).email
            // Rôles:
            const getRole = getUser.find(user => user.id === idView).admin
            // Bio:
            const getBio = getUser.find(user => user.id === idView).bio

            // Username:
            let divUsername = createTag('h2')
            divUsername.innerHTML = getUsername

            // Email;
            let divEmailUser = createTag('p')
            addClass(divEmailUser, ['divEmailUser'])
            divEmailUser.innerHTML = "Email: " + getEmail

            // Rôles:
            let divInfoRole = createTag('p')
            addClass(divInfoRole, ['divInfoRole'])
            if (getRole == true) {
                divInfoRole.innerHTML = "Rôles: " + "Cette personne est administrateur."
            } else(
                divInfoRole.innerHTML = "Rôles: " + "Cette personne n'est pas administrateur."
            )

            let divBio = createTag('p')
            addClass(divBio, ['divBio'])
            console.log(getBio)
            if (getBio === null){
                divBio.innerHTML = "Bio: </br>" + "Cette personne n'a pas rempli sa biographie."
            }else{
                divBio.innerHTML = "Bio: </br>" + getBio
            }


            //---------------------------------------------------------
            // Injecte dans le html:

            // Username:
            divLeftCardUser.appendChild(divDisplayUsername)
            divDisplayUsername.appendChild(divUsername)
            // Email:
            divDisplayUsername.appendChild(divEmailUser)
            // Rôles:
            divDisplayUsername.appendChild(divInfoRole)
            // Bio:
            divRightCardUser.appendChild(divBio)

        })


        //Edit:
        actionEdit.addEventListener('click', (event) => {

            event.preventDefault();
            console.log(event)

            //---------------------------------------------------------
            // Préparation de l'url pour la modification du comment:

            // Cible l'id du delete utilisé:
            let idEdit = event.target.getAttribute('data-actionEdit')
            console.log(idEdit)

            // Selectionne l'id  de la ligne
            //let getDelete = document.getElementById('trBody_' + idEdit)

            // vas sur la page profil correspondant:
            const url = 'http://localhost:3000/api/users/' +
                idEdit
            console.log(url)

            //---------------------------------------------------------
            // Récupére la modification du comment:

            function modifyFormData() {
                /*
                for (var i = 0; i < getUser.length; i++) {

                    let formData = {
                        id: getIdModify,
                        username: textareaModyfyPost.value
                        email: ,
                        password: ,
                        bio: ,
                        admin:
                    }
                    console.log(formData)
                    return formData
                }
                */
            }

            //---------------------------------------------------------
            // Envoie la modification du post:

            var myInit = {
                method: "PUT",
                headers: new Headers({
                    "Content-Type": "application/json;charset=UTF-8"
                }),
                body: JSON.stringify(getUser),
                mode: 'cors',
                cache: 'default'
            };
            /*
                // Fetch à laquelle on donne en paramétres l'url et options:
                fetch(url, myInit)
                .then(response => response.json())

                // Recharge la page:
                //location.reload()
                        */
        })


        //Delete: Valide
        actionDelete.addEventListener('click', (event) => {

            event.preventDefault();

            //---------------------------------------------------------
            // Récupére les id:

            // Cible l'id du delete utilisé:
            let idDelete = event.target.getAttribute('data-actionDelete')
            console.log(idDelete)

            // Cible l'id de la ligne correspondant:
            let getDelete = document.getElementById('trBody_' + idDelete)

            //---------------------------------------------------------
            // Supprime le post coté front:
            getDelete.remove(idDelete)

            //---------------------------------------------------------
            // Supprime le post coté back:

            // Prépare l'url pour supprimer sur le backend:
            function getUrlDelete() {

                for (var i = 0; i < getUser.length; i++) {
                    const url = 'http://localhost:3000/api/users/' + idDelete
                    return url
                }
            }
            getUrlDelete()

            //---------------------------------------------------------
            // Envoie la requête:
            var myInit = {
                method: "DELETE"
            };

            fetch(getUrlDelete(), myInit)
                .then(res => res.text())
                .then(res => console.log(res))

        })

    }

}
