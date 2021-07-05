import React from 'react'
import Image from 'next/image'
import {
  sortableContainer,
  sortableElement,
  sortableHandle,
} from 'react-sortable-hoc'
import orderIcon from '../images/order.svg'

export const DragHandle = sortableHandle(() => <Image alt="Order" src={orderIcon} className="Drag-handle"/>)

export const SortableItem = sortableElement(({component}) => (
  <React.Fragment>    
    {component}
  </React.Fragment>
))

export const SortableContainer = sortableContainer(({children}) => {
  return <React.Fragment>{children}</React.Fragment>
})