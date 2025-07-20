import React, { useState, useEffect } from "react";
import Modal from "./Modal.jsx";
import { Link } from "react-router-dom";
import IMG from "../images/pocket-notes.svg";
import lock from "../images/Vector.png";
import circle from "../images/button.svg";
import plus from "../images/+.png";
import send from "../images/send.png";
import gray from "../images/send-gray.png";
import back from "../images/back.png";
import "../all_styles.css";

const NotesContainer = () => {
  const [screenSize, setScreenSize] = useState(window.innerWidth);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [groupNames, setGroupNames] = useState(
    JSON.parse(localStorage.getItem("groupNames")) || {}
  );
  const [selectedGroupName, setSelectedGroupName] = useState(
    localStorage.getItem("selectedGroupName") || ""
  );
  const [messages, setMessages] = useState(
    JSON.parse(localStorage.getItem("messages")) || []
  );
  const [inputValue, setInputValue] = useState("");
  const [color, setColor] = useState("");
  const [isSend, setIsSend] = useState(false);

  const checkScreenSize = () => {
    setScreenSize(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", checkScreenSize);
    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleNotes = (groupName) => {
    setSelectedGroupName(groupName);
    localStorage.setItem("selectedGroupName", groupName);
  };

  const time = new Date();

  const formattedDate = `${time.getDate()} ${time.toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  })}`;

  const formattedTime = time.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const sendMessage = () => {
    if (inputValue.trim() !== "") {
      const newMessage = {
        timestamp: {
          date: formattedDate,
          time: formattedTime,
        },
        content: inputValue,
      };
      const updatedMessages = [...messages, newMessage];
      setMessages(updatedMessages);
      localStorage.setItem("messages", JSON.stringify(updatedMessages));

      setGroupNames((prevGroupNames) => ({
        ...prevGroupNames,
        [selectedGroupName]: {
          ...prevGroupNames[selectedGroupName],
          messages: [
            ...(prevGroupNames[selectedGroupName]?.messages || []),
            newMessage,
          ],
        },
      }));

      setInputValue("");
    }
  };

  return (
    <div>
      {screenSize > 500 ? (
        // Desktop View
        <div style={{ opacity: isModalOpen ? 0.5 : 1 }} className="body-container">
          <div className="body-left">
            <h1 className="app-title">Pocket Notes</h1>
            <div className="group-names-container">
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                }}
              >
                {Object.keys(groupNames).map((groupName, index) => (
                  <div
                    className="group-item"
                    style={{
                      backgroundColor:
                        selectedGroupName === groupName ? "#D4DEEE" : "transparent",
                    }}
                    onClick={() => handleNotes(groupName)}
                    key={index}
                  >
                    <h4
                      className="group-initial"
                      style={{
                        backgroundColor: groupNames[groupName].color || "white",
                        marginLeft: "40px",
                      }}
                    >
                      {groupName.split(" ").map((word, index, array) => {
                        if (index === 0 || index === array.length - 1) {
                          return word.charAt(0).toUpperCase();
                        }
                        return null;
                      })}
                    </h4>
                    <h1 className="group-name">
                      {groupName}
                      {localStorage.setItem(
                        "groupNames",
                        JSON.stringify(groupNames)
                      )}
                    </h1>
                  </div>
                ))}
              </div>
              <button className="add-group-btn" onClick={openModal}>
                <img className="add-group-icon" src={circle} alt="Add Group" />
                <img className="plus-icon" src={plus} alt="Plus Icon" />
              </button>
            </div>
          </div>
          <div className="body-right">
            {selectedGroupName ? (
              // Messages Display
              <div className="selected-group-container">
                <div className="selected-group-header">
                  <p
                    className="selected-group-initial"
                    style={{
                      backgroundColor:
                        groupNames[selectedGroupName].color || "white",
                    }}
                  >
                    {selectedGroupName.split(" ").map((word, index, array) => {
                      if (index === 0 || index === array.length - 1) {
                        return word.charAt(0).toUpperCase();
                      }
                      return null;
                    })}
                  </p>
                  <h2 className="selected-group-name">{selectedGroupName}</h2>
                </div>
                <div className="selected-group-messages">
                  {(groupNames[selectedGroupName]?.messages || []).map(
                    (message, index) => (
                      <div className="message-item" key={index}>
                        <p>{message.content}</p>
                        <div className="message-timestamp">
                          <div>{message.timestamp?.date}</div>
                          <div style={{ padding: "0 10px" }}> ● </div>
                          <div>{message.timestamp?.time}</div>
                        </div>
                      </div>
                    )
                  )}
                </div>
                <div className="body-input-container">
                  <textarea
                    className="body-input"
                    type="text"
                    placeholder="Enter your text here..."
                    value={inputValue}
                    onChange={(e) => {
                      const newValue = e.target.value;
                      setInputValue(newValue);
                      setIsSend(newValue.trim().length > 0);
                    }}
                  ></textarea>
                  <img
                    className="send-icon"
                    style={{
                      cursor: isSend ? "pointer" : "not-allowed",
                      opacity: isSend ? 1 : 0.5,
                    }}
                    onClick={isSend ? sendMessage : undefined}
                    src={isSend ? send : gray}
                    alt={isSend ? "Send Message" : "Disabled"}
                  />
                </div>
              </div>
            ) : (
              // No Group Selected View
              <div className="no-group-selected-container">
                <img className="app-logo" src={IMG} alt="Pocket Notes Logo" />
                <div style={{ maxWidth: "520px", margin: "0 auto" }}>
                  <h1 className="app-title">Pocket Notes</h1>
                  <p className="app-description">
                    Send and receive messages without keeping your phone online.
                    Use Pocket Notes on up to 4 linked devices and 1 mobile phone
                  </p>
                </div>
                <div className="app-security-info">
                  <img className="lock-icon" src={lock} alt="Lock Icon" />
                  <h3>end-to-end encrypted</h3>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        // Mobile View
        <div>
          {!selectedGroupName ? (
            // Mobile Group List
            <div className="notes">
              <h1>Pocket Notes</h1>
              <div className="group-names">
                {Object.keys(groupNames).map((groupName, index) => (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "between",
                      gap: "25px",
                      width: "100%",
                      backgroundColor:
                        selectedGroupName === groupName
                          ? "#D4DEEE"
                          : "transparent",
                    }}
                    onClick={() => handleNotes(groupName)}
                    key={index}
                  >
                    <h4
                      className="group-initial"
                      style={{
                        backgroundColor:
                          groupNames[groupName].color || "white",
                      }}
                    >
                      {groupName.split(" ").map((word, index, array) => {
                        if (index === 0 || index === array.length - 1) {
                          return word.charAt(0).toUpperCase();
                        }
                        return null;
                      })}
                    </h4>
                    <Link
                      to={"/notes"}
                      style={{
                        cursor: "pointer",
                        color: "black",
                        textDecoration: "none",
                        listStyle: "none",
                      }}
                      onClick={() => {
                        handleNotes(groupName);
                      }}
                      key={index}
                    >
                      <p style={{ fontSize: "1.525rem" }}>{groupName}</p>
                      {localStorage.setItem(
                        "groupNames",
                        JSON.stringify(groupNames)
                      )}
                    </Link>
                  </div>
                ))}
              </div>
              <button className="create-btn" onClick={openModal}>
                <img style={{ position: "sticky", width: "60px" }} src={circle} />
                <img
                  style={{
                    position: "absolute",
                    top: "50%",
                    right: "50%",
                    transform: "translate(50%, -50%)",
                    width: "20px",
                  }}
                  src={plus}
                />
              </button>
            </div>
          ) : (
            // Mobile Messages Display
            <div className="container">
              <div className="header" id="header">
                <Link to={"/"} className="back-link">
                  <img src={back} alt="Back" />
                </Link>
                <p
                  id="group-initial"
                  style={{
                    backgroundColor:
                      groupNames[selectedGroupName]?.color || "white",
                  }}
                >
                  {selectedGroupName.split(" ").map((word, index, array) => {
                    if (index === 0 || index === array.length - 1) {
                      return word.charAt(0).toUpperCase();
                    }
                    return null;
                  })}
                </p>
                <h2 id="group-name">{selectedGroupName}</h2>
              </div>
              <div className="messages-container">
                {(groupNames[selectedGroupName]?.messages || []).map(
                  (message, index) => (
                    <div className="message" key={index}>
                      <p className="message-content">{message.content}</p>
                      <div className="message-timestamp">
                        <div className="date">{message.timestamp?.date}</div>
                        <div className="separator"> ● </div>
                        <div className="time">{message.timestamp?.time}</div>
                      </div>
                    </div>
                  )
                )}
              </div>
              <div className="input-container">
                <textarea
                  className="input-field"
                  type="text"
                  placeholder="Enter your text here..."
                  value={inputValue}
                  onChange={(e) => {
                    const newValue = e.target.value;
                    setInputValue(newValue);
                    setIsSend(newValue.trim().length > 0);
                  }}
                ></textarea>
                <img
                  className="send-button"
                  onClick={isSend ? sendMessage : undefined}
                  src={isSend ? send : gray}
                  alt={isSend ? "Send Message" : "Disabled"}
                />
              </div>
            </div>
          )}
        </div>
      )}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        setGroupNames={setGroupNames}
        setColor={setColor}
      />
    </div>
  );
};

export default NotesContainer;