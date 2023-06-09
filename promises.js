const axios = require('axios');


// Creating the promise object
// const p = new Promise((resolve, reject) => {

// })
const p = new Promise(function(resolve, reject) {
    // resolve (1);
    //for reject, do not pass a string... rather, pass an error object
    reject(new Error("Fail!"));
});

// p.then(result => console.log(result));  // p.then gives us access to the successful operation and we can log it
p.catch(err => console.log('Error', err.message));

// Always pass in your resolve and reject
const promise = new Promise(function(resolve, reject) {
    let x = 4
    if(x < 5) {
        resolve('Success');
    } else {
        reject(new Error('Error Message'));
    }
});

// YOu use a .then method and the .catch method to consume a promise
// The .then method accepts two callback functions  - onFulfilled and onRejected  - promise.then(onFulfilled, onRejected) both of these are optional
promise
    .then(result => console.log(result))
    .catch(error => console.log('Error', error.message));


// ANOTHER EXAMPLE
function getUsers() {
    return new Promise((resolve, reject) => {
        setTimeout (() => {
            resolve([
                {username: "ElozinoLopez", email: "elozinolopez@gmail.com"},
                {username: "Faruq Hameed", email: "faruqismelendes@gmail.com"},
            ])
        }, 5000)
    })
}

// setting the property to be printable output when onFulfilled executes - defining unfulfilled
function onFulfilled(users){
    console.log(users);
}

// assigning the selected printable output to the getUser function
const promis = getUsers();

// consuming the promise
promis.then(onFulfilled);


// REPLACING A CALLBACK WITH A PROMISE EXAMPLE
// Here, we are replacing the callbacks in index.js with promise



console.log("Before");
// get user
// const thePromise = getUser(1);          // assigned the getUser to a variable
// thePromise.then(user => console.log(user));  //using the then method to consume the promises
// .catch(err => console.log(err.message)) 


// line 62 and 63 expantiated in line 66 to 69
getUser(1)
    .then(user => getRepositories(user.getRepositories))
    .then(repos => getUserCommits(repos[0]))
    .then(getUserCommits => console.log('commits', getUserCommits))
    .catch(err => console.log(err.message))  //you have to call the .catch method after consuming teh promise so that if there is an error in any of them, it will catch teh error


console.log("After");

function getUser(id) {
    return new Promise ((resolve, reject) => {
        setTimeout(() => {
            console.log("Getting a user from the database");
            resolve ({id: id, gitHubUserName: "ElozinoLopez"})          
        }, 3000)
    })    
}

function getRepositories(user) {
    return new Promise ((resolve, reject) => {
        setTimeout(() => {
            console.log("Calling GitHub API...");
            resolve(["Repo1", "Repo2", "Repo3"]);
        }, 2000) 
    })       
}

// Add a function to get all the commits from the user repo

function getUserCommits (repos) {
    return new Promise ((resolve, reject) => {
        setTimeout (() => {
            console.log('Calling user commits...');
            resolve(["Commit1", "Commit2", "Commit3"])
        }, 3000)
    })        
}


// USING A 3RD PARTY LIBRARY FOR CONSUMING APIs
// Install axios
// Require it... and then fetch the desired api url

const URL = `https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current_weather=true&hourly=temperature_2m,relativehumidity_2m,windspeed_10m`;
axios.get(URL)
    .then(value => console.log(value.data))
    .catch(err => console.log(err.message))



// USING ASYNC and AWAIT

console.log("The section for async and await begins here...");
console.log("Before");

getUser(1)
    .then(user => getRepositories(user.getRepositories))
    .then(repos => getUserCommits(repos[0]))
    .then(getUserCommits => console.log('commits', getUserCommits))
    .catch(err => console.log(err.message)) 

// applying the async and await to the .then block of the promises
async function displayCommits(){
    const user = await getUser(1)
    const repos = await getRepositories(user.getRepositories)
    const commits = await getUserCommits(repos[0])
    console.log('The commits', commits);

    // Applying the async and await to the axios function and
    // dropping the axios here to which the await operator has been applied
    const URL = `https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current_weather=true&hourly=temperature_2m,relativehumidity_2m,windspeed_10m`;
    const result = await axios.get(URL)
    console.log(result.data);

    // Since we are getting a data object, We can destructure line 142 and 143 to read as bellow
    // const { data } = await axios.get(URL)
    // console.log(data)
}   

displayCommits()




console.log("After");

function getUser(id) {
    return new Promise ((resolve, reject) => {
        setTimeout(() => {
            console.log("Getting a user from the database");
            resolve ({id: id, gitHubUserName: "ElozinoLopez"})          
        }, 3000)
    })    
}

function getRepositories(user) {
    return new Promise ((resolve, reject) => {
        setTimeout(() => {
            console.log("Calling GitHub API...");
            resolve(["Repo1", "Repo2", "Repo3"]);
        }, 2000) 
    })       
}

// Add a function to get all the commits from the user repo

function getUserCommits (repos) {
    return new Promise ((resolve, reject) => {
        setTimeout (() => {
            console.log('Calling user commits...');
            resolve(["Commit1", "Commit2", "Commit3"])
        }, 3000)
    })        
}


// HOW TO RETURN THE ERROR WHEN USING ASYNC AND AWAIT
// We use the try catch block to achieve this. Seen as below

console.log("The section for the try catch block begins here...");
console.log("Before the Try Catch Block");

getUser(1)
    .then(user => getRepositories(user.getRepositories))
    .then(repos => getUserCommits(repos[0]))
    .then(getUserCommits => console.log('commits', getUserCommits))
    .catch(err => console.log(err.message)) 

// applying try catch block to the async and await block
// to collect the error, we place the resoled promises in the try block and place the error in the catch block
async function displayCommits(){
    try {    
        const user = await getUser(1)
        const repos = await getRepositories(user.getRepositories)
        const commits = await getUserCommits(repos[0])
        console.log('The commits', commits);  
    } catch(err){
        console.log('The Try Catch Error ', err.message);
    }
  
}   

displayCommits()

console.log("After");

function getUser(id) {
    return new Promise ((resolve, reject) => {
        setTimeout(() => {
            console.log("Getting a user from the database");
            resolve ({id: id, gitHubUserName: "ElozinoLopez"})          
        }, 3000)
    })    
}

function getRepositories(user) {
    return new Promise ((resolve, reject) => {
        setTimeout(() => {
            console.log("Calling GitHub API...");
            resolve(["Repo1", "Repo2", "Repo3"]);
        }, 2000) 
    })       
}

// Add a function to get all the commits from the user repo

function getUserCommits (repos) {
    return new Promise ((resolve, reject) => {
        setTimeout (() => {
            console.log('Calling user commits...');
            reject(new Error('Trowing this error from the try catch block section'))
        }, 3000)
    })        
}





    
