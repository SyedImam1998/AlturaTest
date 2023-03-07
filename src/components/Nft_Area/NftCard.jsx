import React from 'react'

export default function NftCard({imageUrl,Name}) {
  return (
    <div className='nft-card'>
              <div className='nft-image'>
                <img src={imageUrl} ></img>
              </div>
              <div className='nft-name'>
                <p>{Name}</p>
              </div>
        </div>
  )
}
