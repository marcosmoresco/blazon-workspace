import { render } from 'react-dom'
import Confirm from './Confirm'

const create = (title, text, template, resolve, reject) => {
  const containerElement = document.createElement('div')
  document.body.appendChild(containerElement)
  return render(<Confirm 
    title={title}
    text={text} 
    template={template} 
    resolve={resolve} 
    reject={reject}/>, containerElement)
}

export const confirm = (title, text, template) => {
  
  return new Promise(function(resolve, reject) {
    create(title, text, template, resolve, reject)
  })
}