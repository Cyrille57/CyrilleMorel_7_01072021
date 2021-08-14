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
            console.log(getUser)

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
    console.log(getUser)
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
        trBody.setAttribute("id", "trBody_" + getUser[i].id)

        // Entete de la ligne:
        let thRow = createTag('th')
        thRow.setAttribute('scope', 'row')
        thRow.innerHTML = getUser[i].id

        //---------------------------------------------------------
        // Colonne:

        // Colonne pseudo:
        let tdBodyUsername = createTag('td')
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
        //actionVue.setAttribute('href', 'http://localhost:3000/api/users/' + getUser[i].id)
        actionVue.setAttribute('href', '../html/vueProfil.html')
        actionVue.setAttribute('type', 'button')
        actionVue.setAttribute("data-actionVue", getUser[i].id)
        actionVue.innerHTML = 'Vue'
        console.log('http://localhost:3000/api/users/' + getUser[i].id)

        // Icone de vue:
        let logoVue = createTag('i')
        addClass(logoVue, ['bi', 'bi-eye'])
        logoVue.setAttribute("data-actionVue", getUser[i].id)

        // Edit:
        let actionEdit = createTag('a')
        addClass(actionEdit, ['btn', 'btn-light', 'btn-small', 'mx-3'])
        actionEdit.setAttribute('href', '#')
        actionEdit.setAttribute('type', 'button')
        actionEdit.setAttribute("data-actionEdit", getUser[i].id)
        actionEdit.innerHTML = 'Edit'

        // Icone de edit:
        let logoEdit = createTag('i')
        addClass(logoEdit, ['bi', 'bi-pencil-square'])
        logoEdit.setAttribute("data-actionEdit", getUser[i].id)

        // Delete:
        let actionDelete = createTag('a')
        addClass(actionDelete, ['btn', 'btn-light', 'btn-small'])
        actionDelete.setAttribute('href', '#')
        actionDelete.setAttribute('type', 'button')
        actionDelete.setAttribute("data-actionDelete", getUser[i].id)
        actionDelete.innerHTML = 'Delete'

        // Icone de delete:
        let logoDelete = createTag('i')
        addClass(logoDelete, ['bi', 'bi-x-square'])
        logoDelete.setAttribute("data-actionDelete", getUser[i].id)

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
        // Ecoute les évenement des bpoutons actions:

        //Vue:
        actionVue.addEventListener('click', (event) => {
            event.preventDefault();

            // Cible l'id de vue utilisé:
            let idView = event.target.getAttribute('data-actionVue')
            console.log(idView)

            // Selectionne l'id de la ligne:
            //let getDelete = document.getElementById('trBody_' + idView)
            //console.log(getDelete)

            // vas sur la page profil correspondant:
            const url = 'http://localhost:3000/api/users/' + idView

            var myInit = {
                method: "GET",
                headers: new Headers({
                    "Content-Type": "application/json;charset=UTF-8"
                }),
                body: JSON.stringify(),
                mode: 'cors',
                cache: 'default'
            };

            // Fetch à laquelle on donne en paramétres l'url et options:
            fetch(url, myInit)
                .then(response => response.json())

            // Recharge la page:
            //location.reload()

        })

    
        // Edit:
        actionEdit.addEventListener('click', (event) => {
            event.preventDefault();
            //console.log(event)
            // Cible l'id du less utilisé:
            let idEdit = event.target.getAttribute('data-actionEdit')
        })

        //Edit:
        // Ecoue les évenement des bpoutons actions:
        actionEdit.addEventListener('click', (event) => {

            // Cible l'id du delete utilisé:
            let idEdit = event.target.getAttribute('data-actionEdit')
            console.log(idEdit)

            // Selectionne l'id  de la ligne
            let getDelete = document.getElementById('trBody_' + idEdit)

            // vas sur la page profil correspondant:
            const url = 'http://localhost:3000/api/users/:id'

            var myInit = {
                method: "PUT",
                headers: new Headers({
                    "Content-Type": "application/json;charset=UTF-8"
                }),
                body: JSON.stringify(getUser),
                mode: 'cors',
                cache: 'default'
            };

            // Fetch à laquelle on donne en paramétres l'url et options:
            fetch(url, myInit)
                .then(response => response.json())

            // Recharge la page:
            //location.reload()

        })


        //Delete:
    /*    actionDelete.addEventListener('click', (event) => {

            // Cible l'id du delete utilisé:
            let idDelete = event.target.getAttribute('data-actionDelete')
            console.log(idDelete)
            // Cible l'id de la ligne correspondant:
            let getDelete = document.getElementById('trBody_' + idDelete)
            // supprime la ligne:
            getDelete.remove(idDelete)

            let getDataBdd = JSON.parse(getUser.getItem('getUser'))

            let removeIndex = getDataBdd.map(function (item) {
                return item.idDelete;
            }).indexOf(idDelete);

            getDataBdd.splice(removeIndex, 1)

            if (getDataBdd.length == 0) {
                // Va à la page:
                //window.location = "panierEmpty.html"
            }

            const url = 'http://localhost:3000/api/users/:id'

            var myInit = {
                method: "DELETE",
                headers: new Headers({
                    "Content-Type": "application/json;charset=UTF-8"
                }),
                body: JSON.stringify(getUser),
                mode: 'cors',
                cache: 'default'
            };

            // Fetch à laquelle on donne en paramétres l'url et options:
            fetch(url, myInit)
                .then(response => response.json())
            // Quand la promesse est tenue, elle est parsée au format Json

            // Recharge la page:
            //location.reload()

        })
        */
    }



}

function findOne(getUser) {
    console.log('Fc FindOne:')
    console.log('getUser:' + getUser)

    var search = document.getElementById('search')
    console.log('SEARCH=' + search)

    search.addEventListener('keyup', (event) => {
        //event.preventDefault();
        const valueSearch = search.value

        const getUserFind = getUser.filter(
            elt => elt.username.toLocaleLowerCase().includes(valueSearch.toLocaleLowerCase()))

        let sugg = ''

        if (valueSearch != '') {
            getUserFind.forEach(res =>
                //sugg += '<a href="' + res.username +'"> '+ res.username +'  </a> ')
                sugg += res.username + ',')
        }
        //document.getElementById('suggestions').innerHTML = sugg

        var splits = sugg.split(",");
        console.log(splits)

        var filterSplits = splits.filter(Boolean)
        console.log(filterSplits)
        console.log(filterSplits.length)

        for (let i = 0; i < filterSplits.length; i++) {

            let inputSugg = document.getElementById('suggestions')
            let liSearch = createTag('li')
            let resFindSearch = createTag('a')
            addClass(resFindSearch, 'lienSearch')
            resFindSearch.setAttribute('href', filterSplits[i])
            resFindSearch.innerHTML = filterSplits[i]
            inputSugg.appendChild(liSearch)
            liSearch.appendChild(resFindSearch)

        }

        //document.getElementById('suggestions').innerHTML = filterSplits

    })

}
