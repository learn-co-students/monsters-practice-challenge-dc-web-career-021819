const URL_PREFIX='http://localhost:3000/';

let page=1;

const getMonsters = a =>{
  console.log('get monsters function'),
  //fetch from URL/monsters/ limiting 50 per page set page to #a
  fetch(URL_PREFIX+`monsters/?_limit=50&_page=${a}`)
  //then convert that data to json()
  .then(b=>b.json())
  //then take that result...
  .then(b=> {
    // set the monster-container's innerHTML to ''
    document.querySelector('#monster-container').innerHTML=''
    // for each element
    for (let c=0; c<b.length; c++) {
      // print out the monster object.
      console.log('monster',b[c]),
      // and use that object to create a Monster Card
      createMonsterCard(b[c])
      }
    }
  )
}

const createMonsterCard= a=>{
    // create DOM elements
  let b=document.createElement('div') // a div block for content
  let c=document.createElement('h2') // an h2 for the name
  let d=document.createElement('h4') // an h4 for the age
  let e=document.createElement('p') // an a paragraph for the description

    // set DOM elements
  c.innerHTML=`${a.name}` // set h2 to name
  d.innerHTML=`Age: ${a.age}` // set h4 to age
  e.innerHTML=`Bio: ${a.description}` // set p to description

    // append DOM elements
  // append children to parent div
  b.appendChild(c)
  b.appendChild(d)
  b.appendChild(e)
  // and append that div to monster-container
  document.querySelector('#monster-container').appendChild(b)
}

const createMonsterForm=()=>{
    // create DOM elements
  const a=document.createElement('form') // create a general form
  const b=document.createElement('input') // create input for name
  const c=document.createElement('input') // create input for age
  const d=document.createElement('input') // create input for description
  const e=document.createElement('button') // create button for 'create'

    // Set DOM elements
  // an id for these DOM elements so we can refer to them later.
  a.id='monster-form'
  b.id='name'
  c.id='age'
  d.id='description'
  // set placeholder text for inputs
  b.placeholder='name...'
  c.placeholder='age...'
  d.placeholder='description...'
  // set button innerHTML to 'create'
  e.innerHTML='Create'

    // append DOM elements
  // append all children to the parent form
  a.appendChild(b)
  a.appendChild(c)
  a.appendChild(d)
  a.appendChild(e)
  // append that form to the create-monster containter
  document.getElementById('create-monster').appendChild(a)
  // add submit event listener (function itself does most of the work)
  addSubmitEventListener()
}

const addSubmitEventListener=()=>{
  // look for the monster-form. and addEventListener for the 'submit'
  document.querySelector('#monster-form').addEventListener('submit',a=>{ // and when that happens
      // prevent default
      a.preventDefault()
      // print 'submitted' and the form data (from method below)
      console.log('submitted',getFormData())
      // run the postNewMonster method with the Form data
      postNewMonster(getFormData())
      // and clear that form.
      clearForm()
    }
  )
}

const getFormData=()=>{
  // Get DOM elements
  let a=document.querySelector('#name')
  let b=document.querySelector('#age')
  let c=document.querySelector('#description')

  // return an object with key:value pairs set from form data.
  return{name:a.value, age:parseFloat(b.value), description:c.value}
}

const postNewMonster=a=>{ // a = getFormData
  // set the URL
  let b=URL_PREFIX+`monsters`
  // set the post function for the fetch call.
  let c={
    // we want to post data.
    method:'POST',
    // the type of data we're sending is json, so its should Accept json.
    headers:{'Content-type':'application/json'},
    // (getFormData).stringify it.to JSON.in the body
    body:JSON.stringify(a)
  }

  // execute the fetch with the proper URL, and the proper post method.
  fetch(b,c)
  // then do as normal, and convert that data to json.
  .then(d=>d.json())
  // and lets print that new monster
  .then(d=>console.log('new monster',d))

}

const clearForm=()=>{
  // simply clears form
  document.querySelector('#monster-form').reset()
}

const addNavListeners=()=>{
  // Get DOM elements
  let a=document.querySelector('#back')
  let b=document.querySelector('#forward')

  // Add event listeners
  a.addEventListener('click',() => pageDown())
  b.addEventListener('click',() => pageUp())
}

// simply increase page count, and run getMonsters(with the new page num)
const pageUp=()=>{
  page++,
  getMonsters(page)
}

// if the page is greater than 1? subtract a page, and getMonsters(for that page)
// : otherwise alert that there (aint no monsters here)
const pageDown=()=>{
  1 < page ? (page--, getMonsters(page)) : alert('Aint no monsters here')
}

// a function that calls all the important functions.
const init=()=>{
  getMonsters()
  createMonsterForm()
  addNavListeners()
}
// call the init function at the DOMContentLoaded
document.addEventListener('DOMContentLoaded',init);
