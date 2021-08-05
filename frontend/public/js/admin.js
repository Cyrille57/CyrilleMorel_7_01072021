

// 1) ////////////////////////////////////////////////////////
// XMLHttpRequest se connecte et récupére les données:


const url = 'http://localhost:3000/api/users'
// Création de la fonction qui se connecte:
async function connect(url) {

    // Creer un nouvel objet Ajax de type XMLHttpRequest:
    let xhr = new XMLHttpRequest()

    xhr.onreadystatechange = function () {
        // Détecte l'état de la requête:
        if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {

            // Envoie terminé, contenu récupéré et convertit en Json:
            var result = JSON.parse(this.responseText)
            console.log(result)
            // Réponse: retourne le tableau avec les produits
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

function displayAll(result) {
    console.log(result)
    //Selectionne l'id parent:
    let main = document.querySelector('main')
    console.log(main)
    //////////////////////////////////////////////////////////
    // Création des éléments de base enfants:

    // Container:
    let divContainer = createTag('div') //
    addClass(divContainer, 'container')

    // Row:
    let divRow = createTag('div') //
    addClass(divRow, 'row')

    // Col-12
    let divCol = createTag('div') //
    addClass(divCol, 'col-12')

    // Tableau
    let table = createTag('table') //
    addClass(table, 'table')
    addClass(table, 'table-dark')
    addClass(table, 'table-hover')
    addClass(table, 'table-bordered')
    addClass(table, 'mt-5')

    // Entete du tableau:
    let tHead = createTag('thead') //

    // Ligne de l'entete;
    let trHead = createTag('tr') //
    addClass(trHead, 'table')
    addClass(trHead, 'table-light')
    addClass(trHead, 'text-center')
    addClass(trHead, 'align-middle')

    // Colonne de l'entete:
    let thHead1 = createTag('th')
    addClass(thHead1, 'col-sm-3')
    thHead1.setAttribute('scope', 'col')
    thHead1.innerHTML = '#'

    let thHead2 = createTag('th')
    addClass(thHead2, 'col-sm-3')
    thHead2.setAttribute('scope', 'col')
    thHead2.innerHTML = 'Pseudo'

    let thHead3 = createTag('th')
    addClass(thHead3, 'col-sm-3')
    thHead3.setAttribute('scope', 'col')
    thHead3.innerHTML = 'Email'

    let thHead4 = createTag('th')
    addClass(thHead4, 'col-sm-3')
    thHead4.setAttribute('scope', 'col')
    thHead4.innerHTML = 'Action'

    // Corps du tableau:
    let tBody = createTag('tbody')

    // Ajout des élément de base:
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

    //////////////////////////////////////////////////////////
    // Boucle qui parcours result:
    for (var i = 0; i < result.length; i++) {

        //////////////////////////////////////////////////////////
        // Création des lignes du tableau à chaque tour du tableau:
        //console.log(' Dans la boucle : logueur du tableau:')
        //console.log(result.length)

        // Corp du tableau:
        let trBody = createTag('tr')
        addClass(trBody, 'text-center')
        addClass(trBody, 'table-striped')
        addClass(trBody, 'align-middle')
        addClass(trBody, 'text-white')
        trBody.setAttribute("id", "trBody_" + result[i].id)


        // Entete de la ligne:
        let thRow = createTag('th')
        thRow.setAttribute('scope', 'row')
        thRow.innerHTML = result[i].id

        // Colonne pseudo:
        let tdBodyUsername = createTag('td')
        tdBodyUsername.innerHTML = result[i].username

        // Colonne email:
        let tdBodyMail = createTag('td')
        tdBodyMail.innerHTML = result[i].email

        //Colonne Action:
        let tBodyAction = createTag('td')
        addClass(tBodyAction, 'd-flex')
        addClass(tBodyAction, 'justify-content-center')

        // Les boutons de la colonne action:
        // Vue:
        let actionVue = createTag('a')
        addClass(actionVue, 'btn')
        addClass(actionVue, 'btn-light')
        addClass(actionVue, 'btn-small')
        //actionVue.setAttribute('href', 'http://localhost:3000/api/users/' + result[i].id)
        actionVue.setAttribute('href', '../html/vueProfil.html')
        actionVue.setAttribute('type', 'button')
        actionVue.setAttribute("data-actionVue", result[i].id)
        actionVue.innerHTML = 'Vue'
        console.log('http://localhost:3000/api/users/' + result[i].id)

        // Icone de vue:
        let logoVue = createTag('i')
        addClass(logoVue, 'bi')
        addClass(logoVue, 'bi-eye')
        logoVue.setAttribute("data-actionVue", result[i].id)

        // Edit:
        let actionEdit = createTag('a')
        addClass(actionEdit, 'btn')
        addClass(actionEdit, 'btn-light')
        addClass(actionEdit, 'btn-small')
        addClass(actionEdit, 'mx-3')
        actionEdit.setAttribute('href', '#')
        actionEdit.setAttribute('type', 'button')
        actionEdit.setAttribute("data-actionEdit", result[i].id)
        actionEdit.innerHTML = 'Edit'

        // Icone de edit:
        let logoEdit = createTag('i')
        addClass(logoEdit, 'bi')
        addClass(logoEdit, 'bi-pencil-square')
        logoEdit.setAttribute("data-actionEdit", result[i].id)

        // Delete:
        let actionDelete = createTag('a')
        addClass(actionDelete, 'btn')
        addClass(actionDelete, 'btn-light')
        addClass(actionDelete, 'btn-small')
        actionDelete.setAttribute('href', '#')
        actionDelete.setAttribute('type', 'button')
        actionDelete.setAttribute("data-actionDelete", result[i].id)
        actionDelete.innerHTML = 'Delete'

        // Icone de delete:
        let logoDelete = createTag('i')
        addClass(logoDelete, 'bi')
        addClass(logoDelete, 'bi-x-square')
        logoDelete.setAttribute("data-actionDelete", result[i].id)

        // Ajout corp du tableau:
        tBody.appendChild(trBody)

        // Entete de la ligne:
        trBody.appendChild(thRow)

        // Colonne:
        trBody.appendChild(tdBodyUsername)
        trBody.appendChild(tdBodyMail)
        trBody.appendChild(tBodyAction)

        // Colonne Action:
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

        // Ecoue les évenement des bpoutons actions:

        //Vue:
        actionVue.addEventListener('click', (event) => {

            // Cible l'id du delete utilisé:
            let idDelete = event.target.getAttribute('data-actionVue')
            console.log(idDelete)

            // Selectionne l'id  de la ligne
            let getDelete = document.getElementById('trBody_' + idDelete)
            console.log(getDelete)

            // vas sur la page profil correspondant:
            const url = 'http://localhost:3000/api/users/' + result.id

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
                body: JSON.stringify(result),
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
        actionDelete.addEventListener('click', (event) => {

            // Cible l'id du delete utilisé:
            let idDelete = event.target.getAttribute('data-actionDelete')
            console.log(idDelete)
            // Cible l'id de la ligne correspondant:
            let getDelete = document.getElementById('trBody_' + idDelete)
            // supprime la ligne:
            getDelete.remove(idDelete)

            let getDataBdd = JSON.parse(result.getItem('result'))

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
                body: JSON.stringify(result),
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

    }



}

function findOne(result) {
    console.log('Fc FindOne:')
    console.log('result:' + result)

    var search = document.getElementById('search')
    console.log('SEARCH=' + search)

    search.addEventListener('keyup', (event) => {
        //event.preventDefault();
        const valueSearch = search.value

        const resultFind = result.filter(
            elt => elt.username.toLocaleLowerCase().includes(valueSearch.toLocaleLowerCase()))

        let sugg = ''

        if (valueSearch != '') {
            resultFind.forEach(res =>
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
