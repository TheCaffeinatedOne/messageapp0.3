const socket = io()
const alias = document.getElementById('alias')
const chat = document.querySelector('.chat-form')
const chatInput = document.querySelector('.chat-input')

console.log(chatInput)

var output1 = alias.value + ": " + chatInput.value
var output = output1;

console.log("debug:" + chatInput.value)

chat.addEventListener('submit', e => {
  e.preventDefault()
  console.log(chatInput.value)
  console.log(output1.value)
  socket.emit('chat', alias.value + ": " + chatInput.value)
  chatInput.value = ''
})

const chatDump = document.querySelector('.chat-dump')
const render = ({message, id}) => {
  const div = document.createElement('div')
  div.classList.add('chat-message')
  if (id === socket.id) { // broadcasted chat is from this client
    div.classList.add('chat-message--user')
  }
  div.innerText = message // insert message into new div
  chatDump.appendChild(div)
}

socket.on('chat', data => {
  render(data)
  document.getElementById( 'bottom' ).scrollIntoView();
})
