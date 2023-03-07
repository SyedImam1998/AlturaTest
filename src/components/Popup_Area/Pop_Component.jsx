import React from 'react'
import Attribute_Component from '../attribute_Area/Attribute_Component';
import Cancel_Component from '../cancel_Area/Cancel_Component';
import './popup.css';

import { walletContext } from '../../App';

export default function Pop_Component() {
    const{value1,value2,value3}=React.useContext(walletContext);
    const[wallet,setWallet]=value1;
    const[popUp,setPopup]=value2;
    const [selected,setSelected]=value3;
   

   
  return (
    <>
   
   {popUp && <div className='popup_Parent'>
       
   <div className='popup'>
       <div className='section-1'>
        
         <img src={selected.metadata.image}></img>
       </div>
       <div className='section-2'>
           <label>{selected.metadata.name}</label>
           {selected.metadata.hasOwnProperty('description')?<label>{selected.metadata.description.match(/^.*?\./)[0]} <a href="/">Read more</a></label>:<></>}
           <div className='att_List'>
           {
            selected.metadata.attributes?

            
               selected.metadata.attributes.map((item,index)=>{
                    if(index<5){

                        return(
                            <Attribute_Component value={item.value} trait={item.trait_type}></Attribute_Component>
                            )
                        }
               }):<></>
           }
              
           <p className='knowmore'>Know More...</p>
           </div>


           <div className='makeOffer'>
               <button>Make Offer</button>
           </div>

           
       </div>

   </div>
   <Cancel_Component></Cancel_Component>

</div>} 
</>
)
  
}
