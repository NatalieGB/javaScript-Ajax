"use strict"

let navigation = document.getElementById("navigation")
let hamburger = document.getElementById("hamburger");

hamburger.addEventListener("click", function(){
    navigation.classList.toggle("clickedNav");
    hamburger.classList.toggle("clicked-hamburger");
});

let currentPage = 1;
let totalPages;

function getUserParameters(page) {
    fetch('https://reqres.in/api/unknown?page=' + page,{
        method: 'GET'
    })
        .then(function (receivedText){
            if (receivedText.status!==200){
                throw receivedText.status;
            }
            return receivedText.json();
        })
        .then(function (parsedJson){
            const fragment = new DocumentFragment();
            parsedJson.data.forEach((items) => {
                let li = document.createElement('li');
                li.innerText = `${'Star:'} ${ items.name} ${'Year:'} ${ items.year}`;
                fragment.appendChild(li);
            })
            document.getElementById('ul-users').innerHTML = " ";
            document.getElementById('ul-users').appendChild(fragment);
            totalPages=parsedJson.total_pages;
        })
        .catch(function (error){
        })
    document.getElementById('loadnext').addEventListener("click", function (){
        if (currentPage==totalPages){
            return;
        }
        currentPage++;
        getUserParameters(currentPage);
    })
    document.getElementById('loadprev').addEventListener("click", function (){
        if (currentPage==1){
            return;
        }
        currentPage--;
        getUserParameters(currentPage);
    })
}
getUserParameters(currentPage);

function getUsers(pages){
    let url = 'https://reqres.in/api/users?page= ' +pages;
    let request = new XMLHttpRequest();

    request.addEventListener("load", function (){
        let receivedText = request.responseText;
        let parsedJsonObject = JSON.parse(receivedText);

        const fragment = new DocumentFragment();
        parsedJsonObject.data.forEach(item =>{
            let li = document.createElement('li');
            li.innerText = `${item.first_name} ${item.last_name}`;
            fragment.appendChild(li);
        })
        document.getElementById('ul-users2').innerHTML = " ";
        document.getElementById('ul-users2').appendChild(fragment);
        totalPages=parsedJsonObject.total_pages;
    })
    request.addEventListener('error',function (){
        if (request.status!=200){
            let p = document.createElement('p');
            p.textContent = 'Error';
            document.getElementById('api-user2').appendChild(p);
        }
    })
    request.open('GET',url);
    request.send();
}
document.getElementById('loadprev2').addEventListener("click", function (){
    if (currentPage==1){
        return;
    }
    currentPage--;
    getUsers(currentPage);
})

document.getElementById('loadnext2').addEventListener("click", function (){
    if (currentPage==totalPages){
        return;
    }
    currentPage++;
    getUsers(currentPage);
})
getUsers(currentPage);