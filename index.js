// Upon page load, make a GET fetch (with restrictions for 50),
// then forEach thru json to display name, age, and description
// of each monster in the appropriate div

// When create button clicked, make a post? fetch, then save the user
// data for name, age, and description to the monsters list and save
// to the api

// When a user reaches the end of the monstr list, they should reference
// the get fetch above to page thru the monster list when hitting the
// forward and back arrows.

// Make monster div less ugly



document.addEventListener('DOMContentLoaded', function(){
  loadMonsters()
  loadForm()

  // Get DOM elements
  const monsterSubmitForm = document.getElementById('form')

  // Set Event Listener
  monsterSubmitForm.addEventListener('submit', createMonster)

})


// Helper function
function displayMonsters(monster){
  let monsterContainer = document.getElementById('monster-container')
  const monsterBox = document.createElement('div')

  monsterBox.innerHTML += `Name: ${monster.name} <br> Age: ${monster.age} <br>
  Description: ${monster.description} <br><br>`
  monsterContainer.appendChild(monsterBox)

}

function loadMonsters(){
  let collection = fetch('http://localhost:3000/monsters/?_limit=50&_page=4')
  .then(res => res.json())
  .then(monsters => {
      // when using HTML and text, use .innerHTML. However, you can only iterate
      // thru an interpolated + html element if you create the element first (ex: a div to place
      // the monster list within), using .createElement

      monsters.forEach(m => {
        displayMonsters(m)}
    )}
   )
  }

function loadForm(){
    const formApt = document.getElementById('create-monster')
    let formRoom = document.createElement('form')
    formRoom.id = 'form'

    let formText1 = document.createElement('input')
    let formText2 = document.createElement('input')
    let formText3 = document.createElement('input')
    let formText4 = document.createElement('button')


    formText1.setAttribute('id', 'name')
    formText1.setAttribute('placeholder', 'Name')

    formText2.setAttribute('id', 'age')
    formText2.setAttribute('placeholder', 'Age')

    formText3.setAttribute('id', 'description')
    formText3.setAttribute('placeholder', 'Cool Description')

    formText4.setAttribute('type', 'submit')
    formText4.setAttribute('id', 'submit')
    formText4.innerText = 'Create Monster!'


    formApt.appendChild(formRoom)

    formRoom.append(formText1, formText2, formText3, formText4)

  }

function createMonster(event){
  event.preventDefault()
  const name = event.currentTarget.name.value
  const age = event.currentTarget.age.value
  const description = event.currentTarget.description.value
  let data = {
    name: name,
    age: age,
    description: description
  }

  fetch('http://localhost:3000/monsters', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data),
   })
    .then(res => res.json())
    .then(data => {
      console.log(data)
    })



}
