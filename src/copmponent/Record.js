import React ,{ useState , useEffect }from 'react';

function Records({data}) {


  useEffect(() => {
    handleRecord ();
  }, []);

  
    console.log(data)
    const [recordstack, setRecordStack] = useState([]);
    const hostedZoneId = data; 
    
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
      {/* <Link to={`/records/${hostedZoneId }`}>View Details</Link>  */}
    </div>
  );
}

export default Records;
