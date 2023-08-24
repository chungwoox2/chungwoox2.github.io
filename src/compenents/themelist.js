import React, { useState, useEffect } from "react";
import axios from "axios";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import "../pages/css/App.css";

const ThemeList = (props) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div>
      <ListGroup.Item action variant="light" onClick={handleShow}>
        <div id="ThemeListMain">
          <div className="ThemeName">{props.name} 우량주</div>
        </div>
      </ListGroup.Item>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{props.name} 우량주 목록</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>우량주이름1</div>
          <div>우량주이름2</div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ThemeList;
