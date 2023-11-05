import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/esm/Button';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import { IoGitCommitOutline } from 'react-icons/io5';
import "../App.css";

const Buslist = ({ buses }) => {
  const [bus, setBus] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const [mapLatitude, setMapLatitude] = useState(55.335491858348368); // Initial latitude
  const [mapLongitude, setMapLongitude] = useState(47.70932921182813); // Initial longitude

  const onClick = (data) => {
    setBus(data);
    setMapLatitude(data.latitude); // Set the latitude for the map
    setMapLongitude(data.longitude); // Set the longitude for the map
    setShowPopup(true);
  };
  const iframeStyle = {
    border: '0',
    width: '600px',
    height: '450px',
    borderRadius: '20px',
  };

  const popupContentStyle = {
    maxHeight: '550px', // Set the maximum height for scrolling
    overflowY: 'auto', // Enable vertical scrolling if content exceeds maxHeight
  };

  return (
    <div>
      {showPopup && (
        <div className="modal-overlay right-popup">
          <Row className="modal-content">
            <Col
              style={{
                textAlign: 'center',
                background: '#F0FFFF',
                padding: '20px',
                borderRadius: '10px',
              }}
            >
              <h2>Bus Details</h2>
              <div style={popupContentStyle}>
                <p>Bus No: {bus.busno}</p>
                <p>Bus Type: {bus.busservice}</p>
                <p>Start: {bus.from}</p>
                <p>End: {bus.to}</p>
                <div
                  style={{
                    border: '1px solid',
                    marginBottom: '20px',
                    display: 'flex',
                    justifyContent: 'center',
                    width: 'auto',
                    alignItems: 'center',
                  }}
                >
                  <p>Stops </p>
                  {bus.stops.map((stop, index) => (
                    <p key={index} style={{marginRight:"5px"}}>
                      <IoGitCommitOutline /> {stop} 
                    </p>
                  ))}
                </div>
                <iframe
                  src={`https://www.google.com/maps/embed?pb${bus.mapsrc}`}
                  style={iframeStyle}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
              <Button onClick={() => setShowPopup(false)}>Close</Button>
            </Col>
          </Row>
        </div>
      )}

      <div className="table-container">

      {
        buses[0]&&(
<Table striped bordered hover variant="primary" className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Bus No</th>
              <th>Bus Type</th>
              <th>Start</th>
              <th>End</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {buses.map((busData, index) => (
              <tr key={busData._id}>
                <td>{index + 1}</td>
                <td>{busData.busno}</td>
                <td>{busData.busservice}</td>
                <td>{busData.from}</td>
                <td>{busData.to}</td>
                <td>
                  <Button onClick={() => onClick(busData)}>Go Live</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        )
      }
        
      </div>
    </div>
  );
};

export default Buslist;
