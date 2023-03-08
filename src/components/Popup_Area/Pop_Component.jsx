import React from "react";
import Attribute_Component from "./attribute_Area/Attribute_Component";
import Cancel_Component from "./cancel_Area/Cancel_Component";
import "./popup.css";
import { m, AnimatePresence } from "framer-motion";
import { walletContext } from "../../App";

export default function Pop_Component() {
  const { value1, value2, value3 } = React.useContext(walletContext);
  const [wallet, setWallet] = value1;
  const [popUp, setPopup] = value2;
  const [selected, setSelected] = value3;

  const copy = () => {
    console.log("copy");
    navigator.clipboard.writeText(wallet);
  };

  function extractFirstSentence(str) {
    const regex = /^[^,.]+[,.]/;
    const match = str.match(regex);
    if (match) {
      let sentence = match[0].replace(/,$/, ".");
      return sentence;
    }
    return "";
  }
  
  return (
    <>
      <AnimatePresence mode="wait">
        {popUp && (
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.1 } }}
            exit={{ opacity: 0, transition: { duration: 0.1 } }}
            className="popup_Parent"
          >
            <m.div
              initial={{ y: 1000, opacity: 0 }}
              animate={{
                y: 0,
                opacity: 1,
                transition: {
                  duration: 0.4,
                  delay: 0.2,
                  type: "spring",
                },
              }}
              exit={{ y: 1000, opacity: 0, transition: { duration: 0.6 } }}
              className="popup"
            >
              <div className="section-1">
                <img src={selected.metadata.image}></img>
              </div>
              <div className="section-2">

                <div className="section-2-child">

               

                <label>{selected.metadata.name}</label>
                {selected.metadata.hasOwnProperty("description") ? (
                  <label id="description">
                    {/* {selected.metadata.description.match(/^.*?\./)
                      ? selected.metadata.description.match(/^.*?\./)[0]
                      : selected.metadata.description} */}

                      {extractFirstSentence(selected.metadata.description)}
                      
                      
                      {" "}
                    <a href={selected.openseaUrl} target="_blank">
                      Read more
                    </a>
                  </label>
                ) : (
                  <></>
                )}
                <div className="att_List">
                  {selected.metadata.attributes ? (
                    <>
                      {selected.metadata.attributes.map((item, index) => {
                        if (index < 5) {
                          return (
                            <Attribute_Component
                              value={item.value}
                              trait={item.trait_type}
                            ></Attribute_Component>
                          );
                        }
                      })}
                      <p
                        style={{ cursor: "pointer" }}
                        onClick={() =>
                          window.open(`${selected.openseaUrl}`, "_blank")
                        }
                        className="knowmore"
                      >
                        Know More...
                      </p>
                    </>
                  ) : (
                    <></>
                  )}
                </div>

                <div>
                  <label className="walletAdd">
                    Wallet Address:{" "}
                    <a onClick={copy}>
                      {wallet.slice(0, 4)}...{wallet.slice(-3)}
                    </a>
                  </label>
                </div>
                <div className="makeOffer">
                  <button
                    onClick={() =>
                      window.open(`${selected.openseaUrl}`, "_blank")
                    }
                  >
                    Make Offer
                  </button>
                </div>
                </div>
              </div>
            </m.div>
            <Cancel_Component></Cancel_Component>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}
