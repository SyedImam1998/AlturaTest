import React from 'react'
import './inputarea.css';
import { walletContext } from '../../App';

export default function InputArea() {
  const{value1}=React.useContext(walletContext);

  const[wallet,setWallet]=value1;
  return (
    <div className='inputArea'>
        <input className='inputfield' value={wallet} onChange={(e)=>setWallet(e.target.value)} placeholder='Enter Wallet Address' type="text"></input>
    </div>
  )
}
