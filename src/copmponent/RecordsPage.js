import React, { useEffect, useState } from 'react'

const RecordsPage = () => {
    const hostedZoneId = window.location.pathname.split('/')[2];
  console.log('records',hostedZoneId);
  // hostedZoneId.split("/")
  useEffect(() => {
    handleRecord (hostedZoneId);
  }, [hostedZoneId]);

    const [recordstack, setRecordStack] = useState([]);
    
      const handleRecord = async (hostedZoneId) => {
       
        try {
          const response = await fetch(`http://localhost:3001/record?hostedZoneId=${hostedZoneId}`);
          const data = await response.json();
          console.log(data)
          setRecordStack(data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      console.log('records',hostedZoneId)
    

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th>Domain_ID</th>
            <th>Domain Name</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          {recordstack?.map((item, index) => (
            <tr key={index}>
              <td>{hostedZoneId}</td>
              <td>{item.Name}</td>
              <td>{item.Type}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* <Link to={`/records/${hostedZoneId }`}>View Details</Link>  */}
    </div>
  )
}

export default RecordsPage
