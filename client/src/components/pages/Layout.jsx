import { Layout as ALayout, Modal } from "antd";
import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

import Header from "./Header";
import MainPage from "./mainPage/MainPage";

import DocumentControl from "./documentControl/DocumentControl";
import AdminSettings from "./adminSettings/AdminSettings";
import { Error404 } from "../fragments/messages/Error";
import Tasks from "./documentControl/tasks/Tasks";
import FAQ from "./FAQ/FAQ";
import Archive from "./archive/Archive";

import cat2 from "../../images/cat3.png";
import cat from "../../images/cat.png";

const images = {
  "arrowup arrowup arrowdown arrowdown arrowleft arrowright arrowleft arrowright keyb keya":
    cat2,
};

function Layout() {
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
    <ALayout className="layout">
      <Header />
      <Routes>
        <Route exact path="/" element={<MainPage />} />
        <Route path="/FAQ/*" element={<FAQ />} />
        <Route path="/document-control/*" element={<DocumentControl />} />
        <Route path="/admin-settings/*" element={<AdminSettings />} />
        <Route path="/tasks/*" element={<Tasks />} />
        <Route path="/archive/*" element={<Archive />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
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
    </ALayout>
  );
}

export default Layout;
