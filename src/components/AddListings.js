import React, { useState } from 'react';
import './AddListings.css';

const AddListing = () => {
  const [empId, setEmpId] = useState('');
  const [empName, setEmpName] = useState('');
  const [empPosition, setEmpPosition] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      fetch('http://localhost:8000/api/employees', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          EmpId: empId,
          EmpName: empName,
          EmpPosition: empPosition,
        }),
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('Failed to make the POST request.');
          }
        })
        .then((data) => {
          console.log(data); // Log the response data
          setSuccessMessage('Employee added successfully');
        })
        .catch((error) => {
          console.error(error);
        });

      setEmpId('');
      setEmpName('');
      setEmpPosition('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Add Employee</h1>
      {successMessage && <p>{successMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="empIdInput">Employee ID:</label>
          <input
            type="text"
            id="empIdInput"
            placeholder="Employee ID"
            value={empId}
            onChange={(e) => setEmpId(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="empNameInput">Employee Name:</label>
          <input
            type="text"
            id="empNameInput"
            placeholder="Employee Name"
            value={empName}
            onChange={(e) => setEmpName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="empPositionInput">Employee Position:</label>
          <input
            type="text"
            id="empPositionInput"
            placeholder="Employee Position"
            value={empPosition}
            onChange={(e) => setEmpPosition(e.target.value)}
            required
          />
        </div>
        <button className="add" type="submit">Add Employee</button>
      </form>
    </div>
  );
};

export default AddListing;
