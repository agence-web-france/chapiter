import DynamicComponentWithNoSSR from "components/nossr/nossr";
import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const Modal: React.FC<{}> = ({ children }) => {
  const modalRoot = document.querySelector("#modal") as HTMLElement;
  const el = useRef(document.createElement("div"));

  useEffect(() => {
    const current = el.current;
    modalRoot!.appendChild(current);
    return () => void modalRoot!.removeChild(current);
  }, []);

  return createPortal(children, el.current);
};

const ModalNoSSR: React.FC<{}> = ({ children }) => (
  <DynamicComponentWithNoSSR>
    <Modal>{children}</Modal>
  </DynamicComponentWithNoSSR>
);

export default ModalNoSSR;
