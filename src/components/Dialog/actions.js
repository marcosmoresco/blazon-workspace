import { render } from 'react-dom'
import Confirm from './Confirm'

const create = (title, text, icon, template, resolve, reject) => {
  const containerElement = document.createElement('div')
  document.body.appendChild(containerElement)
  return render(<Confirm 
    title={title}
    text={text}
    icon={icon}
    template={template} 
    resolve={resolve} 
    reject={reject}/>, containerElement)
}

export const confirm = (title, text, icon, template) => {
  
  return new Promise(function(resolve, reject) {
    create(title, text, icon, template, resolve, reject)
  })
}