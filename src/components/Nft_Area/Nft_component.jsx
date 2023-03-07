import React, { useEffect } from 'react'
import './nft.css'
import NftCard from './NftCard';
import axios from 'axios';

import { walletContext } from '../../App';
export default function Nft_component() {
  

  const{value1,value2,value3}=React.useContext(walletContext);
  const[wallet,setWallet]=value1;
  const[popUp,setPopup]=value2;
  const [selected,setSelected]=value3;




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
      let nftList=response['data'].ownedNfts
      .filter(item=>item.title)
      .map((item)=>{
        console.log(item.title)
        if(item.title!==''){

          if(item.metadata.image.includes("ipfs://")){
            console.log(item.metadata.image)
            let part=item.metadata.image.split("//");
            const requiredString = part[1]; 
            let url=`https://ipfs.io/ipfs/${requiredString}`

            item.metadata.image=url;
        }
        // let string
        // const firstSentence = item.metadata.description.match(/^.*?\./)[0];
        // item.metadata.description=firstSentence;
         
          let number = item.metadata.name;
          return{
            "contractAddress":item.contract.address,
            "metadata":item.metadata,
            "openseaUrl":`https://opensea.io/assets/ethereum/${item.contract.address}/${number}`
            
          }
        }
      });
      console.log(response['data'].ownedNfts)
      console.log(nftList);
      setNftList(nftList);
      console.log("getngft",getNftList)
    
    })
    .catch(error => console.log('error', error));

  },[wallet])

  console.log("getngf1t",getNftList)
  return (
    <div className='nft-area'>
      {getNftList.length>0?
        getNftList.map((nft)=>{
          if(nft.metadata.image.includes("ipfs://")){
            let part=nft.metadata.image.split("//");
            const requiredString = part[1]; 
            let url=`https://ipfs.io/ipfs/${requiredString}`
            return(
              <NftCard imageUrl={url} Name={nft.metadata.name} data={nft}></NftCard>
            )

          }
          return(
            <NftCard imageUrl={nft.metadata.image} Name={nft.metadata.name} data={nft}></NftCard>
          )

        })
      
      
      
      :<h4>No NFT's Found on this Wallet Address !!!</h4>}
       
      
  </div>
  )
}
