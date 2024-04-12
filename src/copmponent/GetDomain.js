import React, { useState, useEffect } from "react";

function GetDomain() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3000/hostedzones");
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div>
      {data ? (
        <ul>
          {data.map((item) => (
            <li key={item.Id}>{item.Id} {item.Name}</li>
            
          ))}
        </ul>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default GetDomain;
