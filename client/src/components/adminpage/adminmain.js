import React, { useState,useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../../App.css';
import AdminBuslist from '../adminpage/adminbuslist';
import axios from 'axios';

function Adminmain() {
  // State variables for inputs
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [busservice, setService] = useState('Select');
  const [buses, setBuses] = useState([]);

  const handleFromCityChange = (e) => {
    setFrom(e.target.value);
  };

  const handleToCityChange = (e) => {
    setTo(e.target.value);
  };

  const handleBusTypeChange = (e) => {
    setService(e.target.value);
  };

  const handleSubmit = async (e) => {
    if(e){
      e.preventDefault();
    }
  
    // Create an object with the data to send in the request body
    const requestData = {
      from: from,
      to: to,
      busservice: busservice,
    };
  
    try {
      const response = await axios.post('api/tasks/filter', requestData);
      console.log('Response Data:', response.data);
      setBuses(response.data);
    } catch (error) {
      
      console.error('Error:', error);
    }
  };
  

  return (
    <>
    
      <div className='container d-flex justify-content-center'>
        <form className='form form-container' onSubmit={handleSubmit}>
          <Row className='my-3'>
            <Col className='form-col-lable'>
              <label className="from-label">From</label>
            </Col>
            <Col>
              <input
                className="form-input-box"
                type="text"
                name="fromCity"
                value={from}
                onChange={handleFromCityChange}
                list="cityname"
              />
              <datalist id="cityname">
                <option value="Coimbatore" />
                <option value="Erode" />
              </datalist>
            </Col>
          </Row>
          <Row className='my-3'>
            <Col>
              <label className="from-label2">To</label>
            </Col>
            <Col>
              <input
                type="text"
                name="toCity"
                value={to}
                onChange={handleToCityChange}
                className="form-input-box"
                list="cityname"
              />
              <datalist id="cityname">
                <option value="Coimbatore" />
                <option value="Erode" />
              </datalist>
            </Col>
          </Row>
          <Row className='my-3'>
            <Col className='justify-content-center'>Bus Type</Col>
            <Col>
              <select
                className="form-input-box"
                value={busservice}
                onChange={handleBusTypeChange}
              >
                <option value="Select">Select</option>
                <option value="AC">AC</option>
                <option value="NON AC">NON AC</option>
                <option value="Sleeper">Sleeper</option>
                <option value="Express">Express</option>
              </select>
            </Col>
          </Row>
          <Row className='submit-button my-3 '>
            <Button type='submit'>Submit</Button>
          </Row>
        </form>
      </div>
      <AdminBuslist buses={buses}
      handleSubmit={handleSubmit}
      />
    </>
  );
}

export default Adminmain;
