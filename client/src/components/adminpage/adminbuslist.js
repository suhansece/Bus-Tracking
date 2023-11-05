import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/esm/Button';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import { IoArrowRedoSharp,IoGitCommitOutline } from 'react-icons/io5';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AdminBuslist = (props) => {
  const [bus, setBus] = useState({});
  const [showGoLivePopup, setShowGoLivePopup] = useState(false);
  const [showUpdatePopup, setShowUpdatePopup] = useState(false);
  const [mapLatitude, setMapLatitude] = useState(55.335491858348368);
  const [mapLongitude, setMapLongitude] = useState(47.70932921182813);

  // Add state variables for the update pop-up
  const [updateData, setUpdateData] = useState({
    busno: '',
    busservice: '',
    from: '',
    to: '',
  });

  
  const onClick = (data) => {
    setBus(data);
    setMapLatitude(data.latitude);
    setMapLongitude(data.longitude);
    setShowGoLivePopup(true);
  };

  // Event handler to open the update pop-up
  const onUpdate = (data) => {
    setUpdateData(data); // Set the data for the row being updated
    setShowUpdatePopup(true);
  };

  const iframeStyle = {
    border: '0',
    width: '600px',
    height: '450px',
    borderRadius: '20px',
  };

  const popupContentStyle = {
    maxHeight: '550px',
    overflowY: 'auto',
  };

  // Event handler to update input field values
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdateData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleStopChange = (index, e) => {
    const updatedStops = [...updateData.stops];
    updatedStops[index] = e.target.value;
    setUpdateData((prevData) => ({
      ...prevData,
      stops: updatedStops,
    }));
  };
  const onUpdates = async () => {
    setShowUpdatePopup(false);
  
    try {
      await axios.patch(`/api/tasks/${updateData._id}`, {
        busno: updateData.busno,
        busservice: updateData.busservice,
        from: updateData.from,
        to: updateData.to,
        stops: updateData.stops,
        mapsrc: updateData.mapsrc,
      });
  
      // Call the handleSubmit function from props
      if (typeof props.handleSubmit === 'function') {
        props.handleSubmit();
      }
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };
  


  return (
    <div>
      <Link to="/admin/addbus"><Button style={{marginLeft:"70%" , marginBottom:"5px"}}>Add new bus</Button></Link>
      {showGoLivePopup && (
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
                      < IoGitCommitOutline  /> {stop} 
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
              <Button onClick={() => setShowGoLivePopup(false)}>Close</Button>
            </Col>
          </Row>
        </div>
      )}


{showUpdatePopup && (
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
        <h2>Update</h2>
        <div style={popupContentStyle}>
          <div style={{ marginLeft: "20%", width: "60%" }}>
            <Row>
              <Col>
                <p>BusNo</p>
              </Col>
              <Col>
                <input
                  type="text"
                  name="busno"
                  value={updateData.busno}
                  onChange={handleInputChange}
                  placeholder="Bus No"
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <p>Busservice</p>
              </Col>
              <Col>
                <input
                  type="text"
                  name="busservice"
                  value={updateData.busservice}
                  onChange={handleInputChange}
                  placeholder="Bus Type"
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <p>From</p>
              </Col>
              <Col>
                <input
                  type="text"
                  name="from"
                  value={updateData.from}
                  onChange={handleInputChange}
                  placeholder="Start"
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <p>To</p>
              </Col>
              <Col>
                <input
                  type="text"
                  name="to"
                  value={updateData.to}
                  onChange={handleInputChange}
                  placeholder="End"
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <p>Mapsrc</p>
              </Col>
              <Col>
                <input
                  type="text"
                  name="mapsrc"
                  value={updateData.mapsrc}
                  onChange={handleInputChange}
                  placeholder="Mapsrc"
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <p>Stops</p>
              </Col>
              <Col>
                <ul>
                  {updateData.stops.map((stop, index) => (
                    <li key={index}style={{listStyle:"none"}}>
                      <IoArrowRedoSharp/>
                      <input
                        type="text"
                        value={stop}
                        onChange={(e) => handleStopChange(index, e)}
                      />
                    </li>
                  ))}
                </ul>
              </Col>
            </Row>
            <Button onClick={onUpdates}>Update</Button>
            <Button onClick={() => setShowUpdatePopup(false)}style={{marginLeft:"2px"}}>Close</Button>
          </div>
        </div>
      </Col>
    </Row>
    
  </div>
)}
      <div className="table-container">
        {
          props.buses[0]&&(
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
            {props.buses.map((busData, index) => (
              <tr key={busData._id}>
                <td>{index + 1}</td>
                <td>{busData.busno}</td>
                <td>{busData.busservice}</td>
                <td>{busData.from}</td>
                <td>{busData.to}</td>
                <td>
                  <Button  onClick={() => onClick(busData)}>Go Live</Button>
                  <Button style={{marginLeft:"2px"}}onClick={() => onUpdate(busData)}>Update</Button>
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

export default AdminBuslist;
