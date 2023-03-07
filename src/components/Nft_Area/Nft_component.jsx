import React, { useEffect } from 'react'
import './nft.css'
import NftCard from './NftCard';
import axios from 'axios';

import { walletContext } from '../../App';
export default function Nft_component() {
  

  const{value1}=React.useContext(walletContext);
  const[wallet,setWallet]=value1;



  const address = 'elanhalpern.eth'
  const baseURL = `https://eth-mainnet.g.alchemy.com/v2/KzFflHbQjO9Yrk00CDks1zFHccZOxCRR`;
  const url = `${baseURL}/getNFTs/?owner=${wallet}`;
  const[getNftList,setNftList]=React.useState([]); 
const config = {
    method: 'get',
    url: url,
};



  useEffect(()=>{
    axios(config)
    .then(response => {
      let nftList=response['data'].ownedNfts.map((item)=>{
        let number = item.metadata.name;
        return{
          "contractAddress":item.contract.address,
          "metadata":item.metadata,
          "openseaUrl":`https://opensea.io/assets/ethereum/${item.contract.address}/${number}`

        }
      });
      console.log(response['data'].ownedNfts)
      console.log(nftList);
      setNftList(nftList);
    
    })
    .catch(error => console.log('error', error));

  },[wallet])
  return (
    <div className='nft-area'>
      {getNftList.length>0?
        getNftList.map((nft)=>{
          return(
            <NftCard imageUrl={nft.metadata.image} Name={nft.metadata.name}></NftCard>
          )

        })
      
      
      
      :<h4>No NFT's Found on this Wallet Address !!!</h4>}
       
      
  </div>
  )
}
