import React, { useEffect } from "react";
import "./nft.css";
import NftCard from "./NftCard";
import axios from "axios";
import { useQuery } from "react-query";
import { walletContext } from "../../App";
import Loading_Component from "../Load_Area/Loading_Component";
import Error_Component from "../error_Area/Error_Component";

export default function Nft_component() {
  const { value1, value2, value3 } = React.useContext(walletContext);
  const [wallet, setWallet] = value1;
  
  const [getNftList, setNftList] = React.useState([]);

  const baseURL = import.meta.env.VITE_API_URL;
  const url = `${baseURL}/getNFTs/?owner=${wallet}`;
  const config = {
    method: "get",
    url: url,
  };

  const callApi = () => {
    return axios(config);
  };

  const onSuccess = (data) => {
    console.log("successfully fetched", data);
    setNftList(data);
  };

  const dataTransformation=(data)=>{
    console.log(data);
    let nftList = data.data.ownedNfts
        .filter((item) => item.title)
        .map((item) => {
          if (item.title !== "") {
            if (item.metadata.image.includes("ipfs://")) {
              let part = item.metadata.image.split("//");
              const requiredString = part[1];
              let url = `https://ipfs.io/ipfs/${requiredString}`;
              item.metadata.image = url;
            }

            let number = parseInt(item.id.tokenId, 16);;
            return {
              contractAddress: item.contract.address,
              metadata: item.metadata,
              openseaUrl: `https://opensea.io/assets/ethereum/${item.contract.address}/${number}`,
            };
          }
        });
      return nftList;
  }   
 


  const { isLoading, data, isError, error,isFetching } = useQuery(["nftData",wallet], callApi, {
    select: (data) => {
      return dataTransformation(data);
    },
    onSuccess,
    enabled:!!wallet
    // onError,
  });
  if (isLoading) return <Loading_Component></Loading_Component>
  // if (isFetching) return <div>fetching</div>
  
  if (isError) {
    console.log(error.message)
    return <Error_Component message={error.message}></Error_Component>;
  }
  if(!wallet){
    return(<div className="nft-area">
      <h3>Hello 👋 User...</h3>

    </div>)
  }

  

  return (
    <div className="nft-area">
      {getNftList.length > 0 ? (
        getNftList.map((nft,index) => {
          if (nft.metadata.image.includes("ipfs://")) {
            let part = nft.metadata.image.split("//");
            const requiredString = part[1];
            let url = `https://ipfs.io/ipfs/${requiredString}`;
            return (
              <NftCard
                imageUrl={url}
                Name={nft.metadata.name}
                data={nft}
              ></NftCard>
            );
          }
          return (
            <NftCard key={nft.metadata.name+index}
              imageUrl={nft.metadata.image}
              Name={nft.metadata.name}
              data={nft}
            ></NftCard>
          );
        })
      ) : (
        <h4>No NFT's Found on this Wallet Address !!!</h4>
      )}
    </div>
  );
}
