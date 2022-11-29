import React from "react";
import { useState } from "react";
import { AiFillCaretDown } from "react-icons/ai";
import Fade from "react-reveal/Fade";
import "./dropdown.css";
const Dropdown = () => {
  const [isactive, setIsactive] = useState(false);
  const [selected, setSelected] = useState("Choose One");
  const options = ["kozhikode", "Kannur", "Wayannad"];

  return (
    <div className="dropdown">
      <div
        className="dropdown-btn"
        onClick={(e) => {
          setIsactive(!isactive);
        }}
      >
        <p>{selected}</p>{" "}
        <span>
          <AiFillCaretDown />
        </span>
      </div>
      {isactive ? (
        <Fade bottom>
          <div className="dropdown-content">
            {options.map((option) => (
              <div
                className="dropdown-item"
                key={option.length}
                onClick={(e) => {
                  setSelected(e.target.textContent);
                  setIsactive(false);
                }}
              >
                {option}
              </div>
            ))}
          </div>
        </Fade>
      ) : (
        ""
      )}
    </div>
  );
};

export default Dropdown;
