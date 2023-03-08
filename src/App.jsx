import React, { useState } from 'react'
import './App.css'
import InputArea from './components/input_Area/InputArea'
import Nft_component from './components/Nft_Area/Nft_component'
import Pop_Component from './components/Popup_Area/Pop_Component';
import { LazyMotion, domAnimation } from "framer-motion"
export const walletContext=React.createContext();
import { QueryClientProvider,QueryClient } from 'react-query';
const queryClient= new QueryClient();


function App() {
  const [wallet, setWallet] = useState("");
  const[popUp,setPopup]=React.useState(false);
  const [selected,setSelected]=React.useState('');

  console.log("secret",import.meta.env.VITE_REACT_SECRET_NAME)

  

  return (
    <QueryClientProvider client={queryClient}>


    <div className="App">
      <h1>Know Your NFT's</h1>
      <walletContext.Provider 
      value={{
        value1:[wallet,setWallet],
        value2:[popUp,setPopup],
        value3:[selected,setSelected]
        
      }}>
      <LazyMotion features={domAnimation}>

      <InputArea></InputArea >
      <Nft_component></Nft_component>
      <Pop_Component></Pop_Component>
      </LazyMotion>
      </walletContext.Provider>
      
    </div>
    </QueryClientProvider>
  )
}

export default App
