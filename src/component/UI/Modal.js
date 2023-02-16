import React from "react";
import classes from "./Modal.module.css";
import ReactDom from "react-dom";

const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onClick}></div>;
};

const Overlays = (props) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};

const portalPath = document.getElementById("Overlays");

const Modal = (props) => {
  return (
    <React.Fragment>
      {ReactDom.createPortal(<Backdrop onClick={props.onClick} />, portalPath)}
      {ReactDom.createPortal(<Overlays>{props.children}</Overlays>, portalPath)}
    </React.Fragment>
  );
};

export default Modal;
