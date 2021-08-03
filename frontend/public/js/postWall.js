const url = 'http://localhost:3000/api/posts'
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

            // envoie le result à la fonction display:
            displayAll(result)
            findOne(result)

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



  for (var i = 0; i < result.length; i++) {

  }
}
