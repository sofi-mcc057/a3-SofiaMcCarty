// FRONT-END (CLIENT) JAVASCRIPT HERE
let ul = null
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
                <button class = deletebtn id="${item.id}" onclick="remove(event, ${item.id})">delete</button>`;
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