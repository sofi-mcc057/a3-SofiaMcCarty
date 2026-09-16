// FRONT-END (CLIENT) JAVASCRIPT HERE
let ul = null
// const usernameInput = document.querySelector('#usernameInput')
// const passwordInput = document.querySelector('#passwordInput')
// const loginForm = document.getElementById('loginForm')
// const loginButton = document.getElementById('loginButton')
// const makeUserButton = document.getElementById('makeUser')
console.log("JavaScript initialized successfully.")

async function handleLogin(){
  const usernameInput = document.getElementById('usernameInput')
  const passwordInput = document.getElementById('passwordInput')
  const payload = { username: usernameInput.value, password: passwordInput.value }
      const response = await fetch('/login', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(payload)
      })
      if (response.ok){
        window.location.href = response.url
      } else{
        const errorDiv = document.createElement('div')
        errorDiv.className = 'alert alert-danger mt-3' 
        errorDiv.innerHTML = `<p class="mb-0">Invalid login, press "create account" to make an account with these credentials</p>`
        document.getElementById('loginForm').appendChild(errorDiv)
      }
}
async function handleRegister(){
  const usernameInput = document.getElementById('usernameInput')
  const passwordInput = document.getElementById('passwordInput')
  const makeUserButton = document.getElementById('makeUser')
  const payload = { username: usernameInput.value, password: passwordInput.value }
      const response = await fetch('/register', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(payload)
      })
  const data = await response.json()
  const alertDiv = document.createElement('div');
  alertDiv.id = 'loginErrorMessage';
  alertDiv.className = response.ok ? 'alert alert-success mt-3' : 'alert alert-danger mt-3';
  alertDiv.innerHTML = `<p class="mb-0">${data.message}</p>`;
  if (makeUserButton && makeUserButton.parentNode) {
    makeUserButton.parentNode.insertBefore(alertDiv, makeUserButton.nextSibling);
} else {
    document.body.appendChild(alertDiv);
}
}
const mainForm = document.getElementById('myForm')
if (mainForm){
const submit = async function( event ) {
  // stop form submission from trying to load
  // a new .html page for displaying results...
  // this was the original browser behavior and still
  // remains to this day
  event.preventDefault()

  const name = document.querySelector( '#yourname' )
  const type = document.querySelector('#assignmenttype')
  const grade = document.querySelector('#gradeletter')
  const comment = document.querySelector('#cmts')
        json = { yourname: name.value,
                assignmenttype: type.value,
                gradeletter: grade.value,
                cmts: comment.value
        },
        body = JSON.stringify( json )

  const response = await fetch( '/submit', {
    method:'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body 
  })

  const arr = await response.json()
  ul.innerHTML = ''
  for (let item of arr){
    const li = document.createElement('li')
    li.innerHTML = `<span class="listlabel">Name:</span> <span class="values">${item.yourname}</span><br>
                <span class="listlabel">Assignment Type:</span> <span class="values">${item.assignmenttype}</span><br>
                <span class="listlabel">Grade:</span> <span class="values">${item.gradeletter}</span><br>
                <span class="listlabel">Comments:</span> <span class="values">${item.cmts}</span><br>
                <span class="listlabel">GPA:</span> <span class="values">${item.GPA}</span><br>
                <button class = deletebtn id="${item.id}" onclick="remove(event, ${item.id})">delete</button><br>
                <button class = editbtn id="${item.id}" onclick="edit(event, ${item.id})">edit</button><br>`;
    ul.appendChild(li)
  }
  console.log(arr)
  
}

const remove = async function ( event ){
  event.preventDefault()
  const itemId = event.currentTarget.getAttribute('id')
  const data = {id: itemId}
  const response = await fetch(`/${itemId}`, {
    method: 'DELETE',
    body: JSON.stringify(data)
  })
  event.target.parentElement.remove()
 
}


window.onload = function() {
  const button = document.querySelector('.btn')
  button.onclick = submit
  ul = document.createElement('ul')
  document.body.appendChild(ul)
}
}