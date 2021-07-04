import React from 'react'
import {
  sortableContainer,
  sortableElement,
  sortableHandle,
} from 'react-sortable-hoc'
import orderIcon from '../images/order.svg'

export const DragHandle = sortableHandle(() => <img alt="Order" src={orderIcon} className="Drag-handle"/>)

export const SortableItem = sortableElement(({component}) => (
  <React.Fragment>    
    {component}
  </React.Fragment>
))

export const SortableContainer = sortableContainer(({children}) => {
  return <React.Fragment>{children}</React.Fragment>
})