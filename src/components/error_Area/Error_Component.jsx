import React from 'react'
import './error.css';

export default function Error_Component({message}) {
  return (
    <div className='error-Area'>
       
        
        <p>{message}</p>
        <p>Please send us: syedimam1998@gmail</p>
        
    </div>
  )
}
