import React from 'react'
import CancelBtn from '../../assets/icons8-close.svg';
import './cancel.css';
import { walletContext } from '../../App';

export default function Cancel_Component() {
  const{value2}=React.useContext(walletContext);
  const [popUp,setPopup]=value2;

  const closeFun=()=>{
    setPopup(false);

  }
  return (
    <div className='cancelArea' onClick={closeFun}>
        <img src={CancelBtn} width="30px"></img>
    </div>
  )
}
