import { render } from 'react-dom'
import Confirm from './Confirm'

const create = (text, template, resolve, reject) => {
  const containerElement = document.createElement('div')
  document.body.appendChild(containerElement)
  return render(<Confirm 
    text={text} 
    template={template} 
    resolve={resolve} 
    reject={reject}/>, containerElement)
}

export const confirm = (text, template) => {
  
  return new Promise(function(resolve, reject) {
    create(text, template, resolve, reject)
  })
}