let addToy = false;
const toyCollection = document.querySelector("#toy-collection");


document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

  fetch('http://localhost:3000/toys')
    .then(response => response.json())
    .then(renderToys)

function renderToys(toys){
  toys.forEach(toy => {
    const toyDiv = document.createElement("div");
    toyDiv.classList.add("card");
    let btn = document.createElement("button");
    btn.setAttribute('class', 'like-btn');
    btn.setAttribute('id', toy.id);
    btn.innerText = "Like <3";
    toyDiv.innerHTML = `<h2>${toy.name}</h2>
      <img src=${toy.image} class="toy-avatar"/>
      <p>${toy.likes} Likes</p>`;
    btn.addEventListener("click", (e) => {
      likes(e);
    })
    toyDiv.append(btn);
    toyCollection.append(toyDiv);
  })
}

function likes(e) {
  let more = parseInt(e.target.previousElementSibling.innerText) + 1

  fetch(`http://localhost:3000/toys/${e.target.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"

      },
      body: JSON.stringify({
        "Likes": more
      })
    })
    .then(response => response.json())
    .then((object => {
      e.target.previousElementSibling.innerText = `${more} Likes`;
    }))
}

// const configurationObject = {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json",
//     Accept: "application/json"
//   },
//   body: JSON.stringify({
//     "name": "Jessie",
//     "image": "https://vignette.wikia.nocookie.net/p__/images/8/88/Jessie_Toy_Story_3.png/revision/latest?cb=20161023024601&path-prefix=protagonist",
//     "likes": 0
//   })
// }

// fetch("http://localhost:3000/toys", configurationObject)
//   .then(function(response){
//     return response.json();
//   })
//   .then(function(object){
//     renderToys(object);
//   })




