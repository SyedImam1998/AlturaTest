import React from "react";
import "./attribute.css";
export default function Attribute_Component({ trait, value }) {
  return (
    <>
      <div className="att_parent">
        <div className="att_ans">
          {value}
        </div>
        <div className="att_que">{trait}</div>
      </div>
    </>
  );
}
