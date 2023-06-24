// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const Listings = () => {
//   const [employees, setEmployees] = useState([]);
//   const [selectedId, setSelectedId] = useState('');

//   useEffect(() => {
//     fetchEmployees();
//   }, []);

//   const fetchEmployees = async () => {
//     try {
//       const response = await axios.get('http://localhost:8000/api/employees');
//       console.log(response.data); // Log the response data
//       if (Array.isArray(response.data.employees)) {
//         setEmployees(response.data.employees);
//       } else {
//         console.error('Invalid response data:', response.data);
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const deleteEmployee = async () => {
//     try {
//       await axios.delete(`http://localhost:8000/api/employees/${selectedId}`);
//       fetchEmployees();
//       setSelectedId('');
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <div>
//       <h1>Employees</h1>
//       {Array.isArray(employees) ? (
//         <table>
//           <thead>
//             <tr>
//               <th>EmpId</th>
//               <th>EmpName</th>
//               <th>EmpPosition</th>
//               <th>Delete</th>
//             </tr>
//           </thead>
//           <tbody>
//             {employees.map((employee) => (
//               <tr key={employee.EmpId}>
//                 <td>{employee.EmpId}</td>
//                 <td>{employee.EmpName}</td>
//                 <td>{employee.EmpPosition}</td>
//                 <td>
//                   <button onClick={() => setSelectedId(employee.EmpId)}>Delete</button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       ) : (
//         <p>No employees found.</p>
//       )}
//       {selectedId && (
//         <div>
//           <p>Selected EmpId: {selectedId}</p>
//           <button onClick={deleteEmployee}>Confirm Delete</button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Listings;



import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Listings.css'

const Listings = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedId, setSelectedId] = useState('');

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/employees');
      console.log(response.data); // Log the response data
      if (Array.isArray(response.data.employees)) {
        setEmployees(response.data.employees);
      } else {
        console.error('Invalid response data:', response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const deleteEmployee = async () => {
    try {
      await axios.delete(`http://localhost:8000/api/employees/${selectedId}`);
      fetchEmployees();
      setSelectedId('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="employee-list">
      <h1>Employees</h1>
      {Array.isArray(employees) ? (
        <div className="employee-grid">
          {employees.map((employee) => (
            <div key={employee.EmpId} className="employee-block">
              <div className="employee-details">
                <p>EmpId: {employee.EmpId}</p>
                <p>EmpName: {employee.EmpName}</p>
                <p>EmpPosition: {employee.EmpPosition}</p>
              </div>
              <button className="delete-button"onClick={() => setSelectedId(employee.EmpId)}>Delete</button>
            </div>
          ))}
        </div>
      ) : (
        <p>No employees found.</p>
      )}
      {selectedId && (
        <div>
          <p className="Si">Selected EmpId: {selectedId}</p>
          <button className="cd" onClick={deleteEmployee}>Confirm Delete</button>
        </div>
      )}
    </div>
  );
};

export default Listings;
