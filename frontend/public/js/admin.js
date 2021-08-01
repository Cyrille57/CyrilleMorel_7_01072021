
const url = 'http://localhost:3000/api/users'



// GET Request.
fetch(url)
    // Handle success
    .then(response => response.json())  // convert to json
    .then(json => console.log(json))    //print data to console
    .catch(err => console.log('Request Failed', err)); // Catch errors
