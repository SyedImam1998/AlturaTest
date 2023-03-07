import React from 'react'
import { walletContext } from '../../App'

export default function NftCard({imageUrl,Name,data}) {
  const{value1,value2,value3}=React.useContext(walletContext);
  const[wallet,setWallet]=value1;
  const[popUp,setPopup]=value2;
  const [selected,setSelected]=value3;


  return (
    <div className='nft-card' onClick={()=>{
      setSelected(data);
      setPopup(true);
    }}>
              <div className='nft-image'>
                <img src={imageUrl} ></img>
              </div>
              <div className='nft-name'>
                <p>{Name}</p>
              </div>
        </div>
  )
}
