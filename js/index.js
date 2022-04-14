const createMonster = document.getElementById('create-monster')
const form = document.createElement('form')
let inputName = document.createElement('input')
let inputAge = document.createElement('input')
let inputDescrip = document.createElement('input')
const submit = document.createElement('button')

inputName.setAttribute("id", "monster-name")
inputName.placeholder = 'name'
inputAge.setAttribute("id", "monster-age")
inputAge.placeholder = 'age'
inputDescrip.setAttribute("id", "monster-description")
inputDescrip.placeholder = 'description'
submit.innerText = 'Create Monster'
form.append(inputName, inputAge, inputDescrip, submit)
createMonster.appendChild(form)
console.log(createMonster)

form.addEventListener('submit', (e) => {
  e.preventDefault()
  fetch("http://localhost:3000/monsters/", {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      name: e.target['monster-name'].value,
      age: e.target['monster-age'].value,
      description: e.target['monster-description'].value
    })
  })
})

fetch("http://localhost:3000/monsters/?_limit=50&_page=0")
  .then(res => res.json()) // Convert server response to JS Object
  .then(data => data.forEach(element => {
    //Grab & define
    const monsterList = document.getElementById('monster-container')
    let h1 = document.createElement('h1')
    h1.innerText = element.name
    let h3 = document.createElement('h3')
    h3.innerText = `Age: ${element.age}`
    let p = document.createElement('p')
    p.innerText = `Bio: ${element.description}`
    // Append
    monsterList.append(h1, h3, p)
  })).catch(err => alert(err))



const fwdBtn = document.getElementById('forward')
let page = 1
fwdBtn.addEventListener('click', (e) => {

  page++
  const monsterList = document.getElementById('monster-container')
  monsterList.innerText = ""
  fetch(`http://localhost:3000/monsters/?_limit=50&_page=${page}`)
    .then(res => res.json())
    .then(data => data.forEach(element => {
      let h1 = document.createElement('h1')
      h1.innerText = element.name
      let h3 = document.createElement('h3')
      h3.innerText = `Age: ${element.age}`
      let p = document.createElement('p')
      p.innerText = `Bio: ${element.description}`
      // Append
      monsterList.append(h1, h3, p)
    }))
    .catch(err => alert(`No more pages: ${err}`))
})

const backBtn = document.getElementById('back')
backBtn.addEventListener('click', (e) => {
  page--
  const monsterList = document.getElementById('monster-container')
  monsterList.innerText = ""
  fetch(`http://localhost:3000/monsters/?_limit=50&_page=${page}`)
    .then(res => res.json())
    .then(data => {
      if (page < 1) {
        alert("Aint no more pages left")
      }
      data.forEach(element => {
        let h1 = document.createElement('h1')
        h1.innerText = element.name
        let h3 = document.createElement('h3')
        h3.innerText = `Age: ${element.age}`
        let p = document.createElement('p')
        p.innerText = `Bio: ${element.description}`
        monsterList.append(h1, h3, p)
      })
    })
    .catch(err => alert(`No more pages: ${err}`))
})
