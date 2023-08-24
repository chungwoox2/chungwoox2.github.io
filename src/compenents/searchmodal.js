import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';

function SearchModal({ onDataUpdate }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [inputValue, setInputValue] = useState('');

  const getLocalIPAddress = () => {
    const currentURL = window.location.href;
    const domain = new URL(currentURL).hostname;
    return domain || 'localhost';
  };

  const handleSearch = async (e) => {
    e.preventDefault();

    const ipAddress = getLocalIPAddress();
    const url = `http://${ipAddress}:3001/search`;

    try {
      const response = await axios.post(url, { name: inputValue });
      const data = response?.data;
      console.log(response.data);
      if (data.message) {
        alert(data.message); // 서버에서 전달한 메시지를 알림창으로 표시
      } else {
        onDataUpdate(data.results, data.finance, data.recommend, data.rim); // 부모 컴포넌트에 전달하는 코드
      }
    } catch (error) {
      console.error('Error:', error);
      alert('해당 정보가 없습니다.');
    }
  };

  const handleOnKeyPress = e => {
    if (e.key === 'Enter') {
      handleSearch(e);
      handleClose();
    }
  };

  const handleSubmit = (event) => {
    handleSearch(event); // Call handleSearch function
    handleClose(); // Call handleClose function
  };

  return (
    <form onSubmit={handleSubmit} onKeyDown={handleOnKeyPress}>
      <div id="SearchModal">
        <Button variant="outline-primary" className="searchButton" onClick={handleShow}>
          찾기
        </Button>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>검색어를 입력해주세요</Modal.Title>
          </Modal.Header>
          <Modal.Body id="ModalBody">
            <input
              type="search"
              className="searchSpace"
              placeholder="여섯자리 숫자코드 혹은 이름으로 입력하세요"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleOnKeyPress}
            />
          </Modal.Body>
          <Modal.Footer id="ModalFooter">
            <Button className="firstButton" type="submit" onClick={handleSubmit} >
              찾기
            </Button>
            <Button variant="outline-secondary" className="secondButton" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </form>
  );
}

export default SearchModal;
