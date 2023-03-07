import React, { useState } from 'react'
import './App.css'
import InputArea from './components/input_Area/InputArea'
import Nft_component from './components/Nft_Area/Nft_component'
export const walletContext=React.createContext();


function App() {
  const [wallet, setWallet] = useState("")

  return (
    <div className="App">
      <h1>NFT Collections</h1>
      <walletContext.Provider value={{value1:[wallet,setWallet]}}>

      <InputArea></InputArea >
      <Nft_component></Nft_component>
      </walletContext.Provider>
      
    </div>
  )
}

export default App
