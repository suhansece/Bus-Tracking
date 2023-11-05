import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";

const Addbus = () => {
  const [formData, setFormData] = useState({
    from: "",
    to: "",
    busno: "",
    busservice: "",
    mapsrc: "",
    stops: [""] // One stop input field as a default
  });

  const handleFieldChange = (e, field) => {
    const updatedFormData = { ...formData };
    updatedFormData[field] = e.target.value;
    setFormData(updatedFormData);
  };

  const handleStopChange = (e, index) => {
    const updatedStops = [...formData.stops];
    updatedStops[index] = e.target.value;
    setFormData({ ...formData, stops: updatedStops });
  };

  const addStop = () => {
    setFormData({ ...formData, stops: [...formData.stops, ""] });
  };

  const removeStop = () => {
    if (formData.stops.length > 1) {
      const updatedStops = [...formData.stops];
      updatedStops.pop(); 
      setFormData({ ...formData, stops: updatedStops });
    }
  };

  const handleSubmit = async (e) => {
    
    console.log(formData);
    const data = await axios.post("/api/tasks", {
      busno: formData.busno,
      busservice: formData.busservice,
      from: formData.from,
      to: formData.to,
      stops: formData.stops,
      mapsrc: formData.mapsrc
    });
    console.log(data);
  };

  return (
    <div
      style={{
        marginRight: "30%",
        marginLeft: "30%",
        border: "2px solid gray",
        padding: "20px",
        background: "gray"
      }}
    >
      <h1>Add Bus</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="from" className="m-4">
          <Form.Label>From</Form.Label>
          <Form.Control
            type="text"
            value={formData.from}
            onChange={(e) => handleFieldChange(e, "from")}
            placeholder="Enter from location"
          />
        </Form.Group>
        <Form.Group controlId="to" className="m-4">
          <Form.Label>To</Form.Label>
          <Form.Control
            type="text"
            value={formData.to}
            onChange={(e) => handleFieldChange(e, "to")}
            placeholder="Enter to location"
          />
        </Form.Group>
        <Form.Group controlId="busno" className="m-4">
          <Form.Label>Bus Number</Form.Label>
          <Form.Control
            type="text"
            value={formData.busno}
            onChange={(e) => handleFieldChange(e, "busno")}
            placeholder="Enter bus number"
          />
        </Form.Group>
        <Form.Group controlId="busservice" className="m-4">
          <Form.Label>Bus Service</Form.Label>
          <Form.Control
            type="text"
            value={formData.busservice}
            onChange={(e) => handleFieldChange(e, "busservice")}
            placeholder="Enter bus service"
          />
        </Form.Group>
        <Form.Group controlId="mapsrc" className="m-4">
          <Form.Label>Map Source</Form.Label>
          <Form.Control
            type="text"
            value={formData.mapsrc}
            onChange={(e) => handleFieldChange(e, "mapsrc")}
            placeholder="Enter map source"
          />
        </Form.Group>
        <Form.Group controlId="stops" className="m-4">
          <Form.Label>Stops</Form.Label>
          {formData.stops.map((stop, index) => (
            <div key={index}>
              <Form.Control className="my-3"
                type="text"
                value={stop}
                onChange={(e) => handleStopChange(e, index)}
                placeholder={`Stop ${index + 1}`}
              />
            </div>
          ))}
          <Button variant="primary" onClick={addStop}>
            Add Stop
          </Button>
          <Button variant="danger" onClick={removeStop}>
            Remove Last Stop
          </Button>
        </Form.Group>
        <Button variant="success" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default Addbus;
