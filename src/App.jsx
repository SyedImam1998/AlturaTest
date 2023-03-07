import React, { useState } from 'react'
import './App.css'
import InputArea from './components/input_Area/InputArea'
import Nft_component from './components/Nft_Area/Nft_component'
import Pop_Component from './components/Popup_Area/Pop_Component';
export const walletContext=React.createContext();


function App() {
  const [wallet, setWallet] = useState("elanhalpern.eth");
  const[popUp,setPopup]=React.useState(false);
  const [selected,setSelected]=React.useState('');

  

  return (
    <div className="App">
      <h1>NFT Collections</h1>
      <walletContext.Provider 
      value={{
        value1:[wallet,setWallet],
        value2:[popUp,setPopup],
        value3:[selected,setSelected]
        
        }}>

      <InputArea></InputArea >
      <Nft_component></Nft_component>
      <Pop_Component></Pop_Component>
      </walletContext.Provider>
      
    </div>
  )
}

export default App
