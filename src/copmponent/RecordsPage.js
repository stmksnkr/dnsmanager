import React, { useEffect, useState } from "react";

const RecordsPage = () => {
  const hostedZoneId = window.location.pathname.split("/")[3];
  const domainInit= window.location.pathname.split("/")[2];
  

  const [recordstack, setRecordStack] = useState([]);
  const [SubDomain, setSubDomain] = useState('');
  const [DNSRecord, setNewDNSRecord] = useState([]);
  const [RecordType, setRecordType] = useState("");
  const [isDomainAdded, setIsDomainAdded] = useState(false);
  
  useEffect(() => {
    handleRecord(hostedZoneId);
  }, [hostedZoneId,isDomainAdded]);

  
  const handleRecord = async (hostedZoneId) => {
    try {
      const response = await fetch(
        `https://backend-dns.vercel.app/record?hostedZoneId=${hostedZoneId}`
      );
      const data = await response.json();
      setRecordStack(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const AddRecord = async (hostedZoneId) => {
    try {

      const response = await fetch( `https://backend-dns.vercel.app/dns/${hostedZoneId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ subdomain: SubDomain,domain :domainInit ,type: RecordType , value:DNSRecord}),
      });
      if (response.ok) {
        setIsDomainAdded(true);
        setSubDomain('');
      } else {
        console.error("Failed to add data");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  function  deleteRecord(){
    alert("abc")
  }


  return (
    <div>
      <h1> DNS Records based on hostedID</h1>
      <input
        type="text"
        placeholder="SubDomain"
        value={SubDomain}
        onChange={(e) => setSubDomain(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter DNS Record"
        value={DNSRecord}
        onChange={(e) => setNewDNSRecord(e.target.value)}
      />
      <select
        value={RecordType}
        onChange={(e) => setRecordType(e.target.value)}
      >
        <option value="">Select Record Type</option>
        <option value="A">A (Address) Record</option>
        <option value="AAAA">AAAA (IPv6 Address) Record</option>
        <option value="CNAME">CNAME (Canonical Name) Record</option>
        <option value="MX">MX (Mail Exchange) Record</option>
        <option value="NS">NS (Name Server) Record</option>
        <option value="PTR">PTR (Pointer) Record</option>
        <option value="SOA">SOA (Start of Authority) Record</option>
        <option value="SRV">SRV (Service) Record</option>
        <option value="TXT">TXT (Text) Record</option>
        <option value="DNSSEC">DNSSEC</option>
      </select>
      <button onClick={()=>AddRecord(hostedZoneId)}>Add DNS</button>

      <table className="table">
        <thead>
          <tr>
            <th>Record Name</th>
            <th>Type</th>
            <th>Value</th>
            <br></br>
          </tr>
        </thead>
        <tbody>
          {recordstack?.map((item, index) => (
            <tr key={index}>
              <button
                  onClick={() => deleteRecord(item.subdomain)}
                >
                  Delete
                </button>
              <td>{item.Id}</td>
              <td>{item.Name}</td>
              <td>{item.Type}</td>

              {item.ResourceRecords.map((record, index) => (
                <tr key={index}>{record.Value}</tr>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {/* <Link to={`/records/${hostedZoneId }`}>View Details</Link>  */}
    </div>
  );
};

export default RecordsPage;
