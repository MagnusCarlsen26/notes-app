import React, { useEffect, useState } from "react";
import blue from "../images/blue.png";
import brown from "../images/brown.png";
import darkBlue from "../images/dark blue.png";
import green from "../images/+.png";
import purple from "../images/purple.png";
import violet from "../images/violet.png";
import skyBlue from "../images/sky blue.png";
import "../all_styles.css";

const Modal = ({ isOpen, onClose, setGroupNames, setColor }) => {
  const [input, setInput] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [clickedColors, setClickedColors] = useState({});
  const [colorError, setColorError] = useState("");
  const [screenSize, setScreenSize] = useState(window.innerWidth);

  useEffect(() => {
    const checkScreenSize = () => {
      setScreenSize(window.innerWidth);
    };
    window.addEventListener("resize", checkScreenSize);
    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  const handleColorSelection = (color) => {
    setColor(color);
    setSelectedColor(color);
    setColorError(" ");
  };

  const handleClick = (color) => {
    const updatedClickedColors = {};
    Object.keys(clickedColors).forEach((key) => {
      updatedClickedColors[key] = false;
    });
    updatedClickedColors[color] = true;
    setClickedColors(updatedClickedColors);
  };

  const handleInput = (e) => {
    if (input.trim().length >= 15) {
      setColorError("We recommend not more than this length for the group name");
    } else if (input.trim().length < 15) {
      setColorError("");
    }
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!isOpen) return;

      const modalContentId = screenSize > 500 ? "modal-content-desktop" : "modal-content-mobile";
      const modalContent = document.getElementById(modalContentId);
      if (modalContent && !modalContent.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen, onClose, screenSize]);

  if (!isOpen) return null;

  const handleGroupName = () => {
    if (input.trim() !== "" && selectedColor.trim() !== "") {
      setGroupNames((prevGroupNames) => ({
        ...prevGroupNames,
        [input]: { color: selectedColor },
      }));
      onClose();
    } else {
      if (input.trim() === "" && selectedColor.trim() === "") {
        setColorError("Please Choose a GroupName and a color!");
      } else if (input.trim() === "") {
        setColorError("Please Choose a GroupName!");
      } else {
        setColorError("Please Choose a color!");
      }
    }
  };

  return (
    <div
      id={screenSize > 500 ? "modal-content-desktop" : "modal-content-mobile"}
      className={screenSize > 500 ? "modal-container" : ""}
      style={screenSize <= 500 && colorError ? { height: "300px" } : {}}
    >
      {screenSize > 500 ? (
        <h1>Create New Group</h1>
      ) : (
        <h2>Create New Group</h2>
      )}

      <div className={screenSize > 500 ? "group-name-container" : ""}
           style={screenSize <= 500 ? { display: "flex", gap: "5px" } : {}}>
        {screenSize > 500 ? (
          <h2>Group Name</h2>
        ) : (
          <h3>Group Name</h3>
        )}
        <input
          className={screenSize > 500 ? "group-name-input" : ""}
          type="text"
          placeholder="Enter Group Name"
          onChange={(e) => {
            setInput(e.target.value);
            handleInput();
          }}
        />
      </div>

      <div className={screenSize > 500 ? "color-selection-container" : ""}
           style={screenSize <= 500 ? { display: "flex" } : {}}>
        {screenSize > 500 ? (
          <h2>Choose color</h2>
        ) : (
          <h4>Choose color</h4>
        )}
        <div className={screenSize > 500 ? "color-buttons-container" : ""}
             style={screenSize <= 500 ? { display: "flex", gap: "15px", margin: "auto 0", justifyContent: "center" } : {}}>
          <button
            className="color-button"
            onClick={() => {
              handleColorSelection("#FF79F2");
              handleClick("#FF79F2");
            }}
          >
            <img
              className={
                clickedColors["#FF79F2"]
                  ? "color-image selected"
                  : "color-image"
              }
              src={violet}
              alt="Violet"
            />
          </button>
          <button
            className="color-button"
            onClick={() => {
              handleColorSelection("#B38BFA");
              handleClick("#B38BFA");
            }}
          >
            <img
              className={
                clickedColors["#B38BFA"]
                  ? "color-image selected"
                  : "color-image"
              }
              src={purple}
              alt="purple"
            />
          </button>
          <button
            className="color-button"
            onClick={() => {
              handleColorSelection("#43E6FC");
              handleClick("#43E6FC");
            }}
          >
            <img
              className={
                clickedColors["#43E6FC"]
                  ? "color-image selected"
                  : "color-image"
              }
              src={skyBlue}
              alt="skyblue"
            />
          </button>
          <button
            className="color-button"
            onClick={() => {
              handleColorSelection("#F19576");
              handleClick("#F19576");
            }}
          >
            <img
              className={
                clickedColors["#F19576"]
                  ? "color-image selected"
                  : "color-image"
              }
              src={brown}
              alt="brown"
            />
          </button>
          <button
            className="color-button"
            onClick={() => {
              handleColorSelection("#0047FF");
              handleClick("#0047FF");
            }}
          >
            <img
              className={
                clickedColors["#0047FF"]
                  ? "color-image selected"
                  : "color-image"
              }
              src={darkBlue}
              alt="darkblue"
            />
          </button>
          <button
            className="color-button"
            onClick={() => {
              handleColorSelection("#6691FF");
              handleClick("#6691FF");
            }}
          >
            <img
              className={
                clickedColors["#6691FF"]
                  ? "color-image selected"
                  : "color-image"
              }
              src={blue}
              alt="blue"
            />
          </button>
        </div>
      </div>

      <button
        className="create-button"
        onClick={() => {
          handleGroupName();
        }}
      >
        Create
      </button>
      <div style={{ color: "red" }}>{colorError && <p>{colorError}</p>}</div>
    </div>
  );
};

export default Modal;