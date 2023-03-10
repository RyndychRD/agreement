import { Modal } from "antd";
import { useState, useEffect } from "react";

import cat from "../../../images/cat.png";
import cat2 from "../../../images/cat3.png";

const images = {
  "arrowup arrowup arrowdown arrowdown arrowleft arrowright arrowleft arrowright keyb keya":
    cat2,
};

export default function Pashalka() {
  const [keyCodeSequence, setKeyCodeSequence] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  useEffect(() => {
    function handleKeyDown(event) {
      setKeyCodeSequence((prevKeyCodeSequence) => {
        if (prevKeyCodeSequence.length > 9) {
          prevKeyCodeSequence.shift();
        }
        return [...prevKeyCodeSequence, event.code.toLowerCase()];
      });
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    const joinedKeyCodeSequence = keyCodeSequence.join(" ");
    if (images[joinedKeyCodeSequence]) {
      setModalIsOpen(true);
    }
  }, [keyCodeSequence]);

  const handleCloseModal = () => {
    setModalIsOpen(false);
    setKeyCodeSequence([]);
  };

  return (
    <Modal
      width="750px"
      height="750px"
      open={modalIsOpen}
      onCancel={handleCloseModal}
    >
      <img
        src={
          images[keyCodeSequence.join(" ")]
            ? images[keyCodeSequence.join(" ")]
            : cat
        }
        alt="Картинка"
      />
    </Modal>
  );
}
