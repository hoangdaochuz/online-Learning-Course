import React from "react";
import styled from "styled-components";
import { useRef, useState, useEffect, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import Portal from "./Portal";
const StyledModal = styled.div`
  
  .wrapper {
    position: fixed;
    inset: 0;
    z-index: 1001;
    display: flex;
    max-width: 900px;
    margin: 0 auto;
  }

  .wrapper.closing .overlay {
    animation: fade-out 0.5s forwards;
  }

  .wrapper.closing .container {
    animation: fade-out 0.5s forwards, grow-down 0.5s forwards;
  }

  .overlay {
    background: rgb(0 0 0 / 50%);
    position: fixed;
    inset: 0;
    animation: fade-in 0.5s;
  }

  .container {
    background-color: rgba(255, 255, 255);
    position: relative;
    margin: auto;
    max-height: var(--max-height-modal);
    height: var(--height-modal);
    overflow: hidden;
    border-radius: 8px;
    animation: fade-in 0.5s, grow-up 0.5s;
  }

  .close-wrapper {
    position: absolute;
    top: 20px;
    right: 20px;
    width: 40px;
    height: 40px;
    background-color: rgba(22, 24, 35, 0.03);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    z-index: 1;
  }

  .close-icon {
    font-size: 25px;
  }
  @keyframes fade-in {
    from {
      opacity: 0;
    }

    to {
      opacity: 1;
    }
  }

  @keyframes fade-out {
    from {
      opacity: 1;
    }

    to {
      opacity: 0;
    }
  }

  @keyframes grow-up {
    from {
      transform: scale(0.1);
    }

    to {
      transform: scale(1);
    }
  }

  @keyframes grow-down {
    from {
      transform: scale(1);
    }

    to {
      transform: scale(0.1);
    }
  }
`;
const defaultFn = () => {};

function Modal({
  isOpen,
  children,
  containerID,
  shouldCloseOnOverlayClick = true,
  onRequestClose = defaultFn,
}) {
  const containerRef = useRef();
  const [closing, setClosing] = useState(false);
  const handleRequestClose = useCallback(() => {
    setClosing(true);

    containerRef.current.addEventListener(
      "animationend",
      () => {
        console.log(1);
        setClosing(false);
        onRequestClose();
      },
      { once: true }
    );
  }, [onRequestClose]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isOpen && e.key === "Escape") {
        handleRequestClose();
      }
    };
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, handleRequestClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <Portal containerID={containerID}>
      <StyledModal>
        <div className={`wrapper ${closing ? "closing" : ""}`}>
          <div
            className="overlay"
            onClick={shouldCloseOnOverlayClick ? handleRequestClose : defaultFn}
          ></div>
          <div ref={containerRef} className="container">
            <div className="close-wrapper" onClick={handleRequestClose}>
              <FontAwesomeIcon icon={faClose} className="close-icon" />
            </div>
            {children}
          </div>
        </div>
      </StyledModal>
    </Portal>
  );
}

export default Modal;
