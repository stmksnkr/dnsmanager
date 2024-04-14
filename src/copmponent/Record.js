import React ,{ useState }from 'react';
import { Link } from 'react-router-dom';

function Records({data}) {
    console.log(data)
    const [recordstack, setRecordStack] = useState([]);
    const hostedZoneId = 'Z04339233DVBHPD2PI7BG'; 
    
      const handleRecord = async () => {
       
        try {
          const response = await fetch(`http://localhost:3000/record?hostedZoneId=${hostedZoneId}`);
          const data = await response.json();
        //   console.log(data)
          setRecordStack(data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
    
  // Assuming you have some records data
  return (


    <div>
      <h2>Records</h2>
      <button onClick={handleRecord}>fetch record</button>

      <table className="table">
        <thead>
          <tr>
            <th>Domain_ID</th>
            <th>Domain Name</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          {recordstack.map((item, index) => (
            <tr key={index}>
              <td>{hostedZoneId}</td>
              <td>{item.Name}</td>
              <td>{item.Type}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to={`/records/${hostedZoneId }`}>View Details</Link> 
    </div>
  );
}

export default Records;
