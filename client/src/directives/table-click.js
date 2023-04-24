
import { toRefs } from 'vue';
const tableClick = {
  updated(el, binding, vnode) {
    const { userList, status, field, index, socket } = toRefs(binding.value);

    tableClick.el = el
    tableClick.userList = userList
    tableClick.status = status
    tableClick.field = field
    tableClick.index = index
    tableClick.socket = socket.value
    bindEvent()
  }
};

function bindEvent() {
  tableClick.el.addEventListener('click', handleTabelClick, false)
  window.addEventListener('click', handleWindowClick, false)
}

function removeInput() {
  tableClick.target.removeChild(tableClick.input)
  unbindInputEvent()
  tableClick.input = null
  tableClick.target = null
  tableClick.socket.emit('changeStatus', false)
}

function handleWindowClick(e) {
  if (tableClick.input) {
    removeInput()
  }
}

function handleStopPropagation(e) {
  e.stopPropagation();
}

function handleTabelClick(e) {
  handleStopPropagation(e);
  handleWindowClick(e)

  tableClick.target = getTarget(e)
  const target = tableClick.target
  const field = target.dataset.field

  if (field) {
    const index = target.getAttribute('data-index')
    const tdText = target.innerText
    tableClick.input = createInput(tdText)

    target.appendChild(tableClick.input)
    tableClick.input.select()

    tableClick.field.value = field
    tableClick.index.value = index

    bindInputEvent()

    tableClick.socket.emit('changeStatus', true)
  }


}

function bindInputEvent() {
  tableClick.input.addEventListener('click', handleStopPropagation, false)
}


function unbindInputEvent() {
  tableClick.input.removeEventListener('click', handleStopPropagation, false)
}

function getTarget(e) {
  const target = e.target.tagName.toLowerCase()

  switch (target) {
    case 'span':
      return e.target.parentNode
    case 'td':
      return e.target
    default:
      return e.target
  }
}

function createInput(value) {

  const input = document.createElement('input');
  input.value = value;

  input.style.cssText = `
    position:absolute;
    top:0;
    left:0;
    width:100%;
    height:100%;
    border:none;
    box-sizing:border-box;
  `

  return input;

}

export default tableClick