
document.addEventListener("DOMContentLoaded", runner);

let limit = 50;
let pageNumber = 1;

function runner(){
  let backButton = document.getElementById("back");
  let forwardButton = document.getElementById("forward");

  let monsterContainer = document.getElementById("monster-container")

  createForm();

  renderMonsters(`http://localhost:3000/monsters/?_limit=${limit}&_page=${pageNumber}`);

  forwardButton.addEventListener("click", forwardButtonHandler);
  backButton.addEventListener("click", backButtonHandler);
}

function forwardButtonHandler(event){
  let monsterContainer = document.getElementById("monster-container")
  monsterContainer.innerHTML = ""
  pageNumber += 1;
  renderMonsters(`http://localhost:3000/monsters/?_limit=${limit}&_page=${pageNumber}`)
}

function backButtonHandler(event){
  if(pageNumber > 1){
    let monsterContainer = document.getElementById("monster-container")
    monsterContainer.innerHTML = ""
    pageNumber -= 1;
    renderMonsters(`http://localhost:3000/monsters/?_limit=${limit}&_page=${pageNumber}`)
  }
}

function renderMonsters(url){
  let monsterContainer = document.getElementById("monster-container")
  fetch(url)
  .then(res => res.json())
  .then(data => {
    // debugger
    data.forEach( element => {
      let item = document.createElement("div");
      item.innerHTML += `<h2>${element.name}</h2><br>age: ${element.age}<br>description: ${element.description}`;
      monsterContainer.appendChild(item);
    })
  }
  )
}

function createForm(){
  let form = document.createElement("form");
  let nameLabel = document.createElement("label");
  nameLabel.innerText = "Name: "
  let nameInput = document.createElement("input");
  nameInput.id = "name-input-id";

  let ageLabel = document.createElement("label");
  ageLabel.innerText = "Age: "
  let ageInput = document.createElement("input");
  ageInput.id = "age-input-id";

  let descriptionLabel = document.createElement("label");
  descriptionLabel.innerText = "Description: "
  let descriptionInput = document.createElement("input")
  descriptionInput.id = "description-input-id";
  let submit = document.createElement("input")
  submit.type = "submit";

  form.appendChild(nameLabel);
  form.appendChild(nameInput);
  form.appendChild(ageLabel);
  form.appendChild(ageInput);
  form.appendChild(descriptionLabel);
  form.appendChild(descriptionInput);
  form.appendChild(submit);
  let createMonster = document.getElementById("create-monster");
  createMonster.appendChild(form);

  form.addEventListener("submit", formSubmitHandler);
}
// POST http://localhost:3000/monsters
// headers:
// {
//   "Content-Type": "application/json",
//   Accept: "application/json"
// }
//
// data:
// { name: string, age: number, description: string }
function formSubmitHandler(event){
  event.preventDefault();

  let nameInput = document.getElementById("name-input-id");
  let ageInput = document.getElementById("age-input-id");
  let descriptionInput = document.getElementById("description-input-id");
  let data = {
    name: `${nameInput.value}`,
    age: `${ageInput.value}`,
    description: `${descriptionInput.value}`
  };

  fetch("http://localhost:3000/monsters", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(data)
  })
  .then(response => response.json());

  nameInput.value = "";
  ageInput.value = "";
  descriptionInput.value = "";
}
