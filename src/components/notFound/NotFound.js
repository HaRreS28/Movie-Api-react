import React from 'react'
import './NotFound.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFaceFrown } from '@fortawesome/free-solid-svg-icons'

const NotFound = () => {
  return (
    <div className='not-found-container mt-3'>
      <div>
       <p>This page could not be found</p>
       <FontAwesomeIcon icon={faFaceFrown}/>
    </div>
    </div>
  )
}

export default NotFound