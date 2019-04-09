document.addEventListener("DOMContentLoaded", function(){
  createMonsterField();
  get50Monster();
  let form = document.querySelector("form")
  form.addEventListener("submit", handleFormSubmit)
  let forward = document.getElementById('forward');
  let back = document.getElementById('back');
  let i = 1;
  forward.addEventListener('click', function(){
    get50Monster(++i);
  })
  back.addEventListener('click', function(){
    if (i > 1){
      get50Monster(--i)
    }else{
      alert("No Monsters");
    }
  })
})



function get50Monster(i = 1){
  document.getElementById('monster-container').innerHTML = '';
  fetch('http://localhost:3000/monsters?_limit=50&_page=' + i)
    .then(res => res.json())
    .then(monsterArray => monsterArray.forEach(renderMonster))
}

function renderMonster(monster){
  const container = document.getElementById('monster-container');
  const monsterDiv = document.createElement('div');
  const ul = monsterDiv.appendChild(document.createElement('ul'));
  const nameLi = document.createElement('li');
  nameLi.innerText = `Name: ${monster.name} ${monster.id}`;
  const ageLi = document.createElement('li');
  ageLi.innerText = `Age: ${monster.age}`;
  const descriptionLi = document.createElement('li');
  descriptionLi.innerText = `Bio: ${monster.description}`;
  ul.appendChild(nameLi);
  ul.appendChild(ageLi);
  ul.appendChild(descriptionLi);
  container.appendChild(monsterDiv)
}






















function handleFormSubmit(event){
  event.preventDefault();
  const name = document.getElementById('createName').value;
  document.getElementById('createName').value = '';
  const age = document.getElementById('createAge').value;
  document.getElementById('createAge').value = '';
  const description = document.getElementById('createDescription').value;
  document.getElementById('createDescription').value = '';
  postMonster(name, age, description)
}

function postMonster(name, age, description){
  let obj = {name: name, age: age, description: description};
  fetch(`http://localhost:3000/monsters`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(obj)
  }).then(res => res.json())
  .then(renderMonster)
}

function createMonsterField(){
  const createDiv = document.getElementById('create-monster')
  const createForm = createDiv.appendChild(document.createElement('form'));
  const nameInput = document.createElement('input');
  const ageInput = document.createElement('input');
  const descriptionInput = document.createElement('input');
  const submitBtn = document.createElement('input');
  createForm.appendChild(nameInput);
  nameInput.id = "createName";
  nameInput.placeholder = "name";
  createForm.appendChild(ageInput);
  ageInput.id = "createAge";
  ageInput.placeholder = "age";
  createForm.appendChild(descriptionInput);
  descriptionInput.id = "createDescription";
  descriptionInput.placeholder = "description";
  createForm.appendChild(submitBtn);
  submitBtn.type = "submit";
  submitBtn.value = "create monster";
}
