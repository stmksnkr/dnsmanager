import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { Link} from "react-router-dom";

function Dashboard() {
  const [recordstack, setRecordStack] = useState([]);
  const [domains, setDomains] = useState([]);
  const [newDomain, setNewDomain] = useState("");
  const [newDNSRecord, setNewDNSRecord] = useState("");
  const [recordType, setRecordType] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const hostedZoneId = 'Z04339233DVBHPD2PI7BG'; 
  
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3001/hostedzones");
      const data = await response.json();
      // console.log(data)
      setDomains(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleAdd = async () => {
    try {
      const response = await fetch("http://localhost:3001/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ domainName: newDomain }),
      });

      if (response.ok) {
        console.log("Data added successfully");
        const updatedDomains = [...domains];
        setDomains(updatedDomains);

        // Optionally update UI or show success message
      } else {
        console.error("Failed to add data");
        // Handle error or show error message
      }
    } catch (error) {
      console.error("Error:", error);
      // Handle network errors
    }
  };

  const deleteHostedZone = async (hostedZoneId) => {
    try {
      const response = await fetch(
        `http://localhost:3000/delete/${hostedZoneId}`,
        {
          method: "DELETE",
        }
      );
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const HandleRecord = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/record?hostedZoneId=${hostedZoneId}`
      );
      const data = await response.json();
      //   console.log(data)
      setRecordStack(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setNewDomain("");
    setNewDNSRecord("");
    setRecordType("");
    setEditIndex(null);
  };

  const addDomain = () => {
    if (!newDomain.trim() || !newDNSRecord.trim() || !recordType.trim()) {
      alert("Please enter domain, DNS record, and record type.");
      return;
    }

    if (editIndex !== null) {
      // If editing an existing entry
      const updatedDomains = [...domains];
      updatedDomains[editIndex] = {
        domain: newDomain,
        dnsRecord: newDNSRecord,
        recordType: recordType,
      };
      setDomains(updatedDomains);
    } else {
      // If adding a new entry
      setDomains([
        ...domains,
        { domain: newDomain, dnsRecord: newDNSRecord, recordType: recordType },
      ]);
    }

    closeModal();
  };

  const editDomain = (index) => {
    const domainToEdit = domains[index];
    setNewDomain(domainToEdit.domain);
    setNewDNSRecord(domainToEdit.dnsRecord);
    setRecordType(domainToEdit.recordType);
    setEditIndex(index);
    openModal();
  };

  return (
    <div className="container">
      <h1>Domain and DNS Records Dashboard</h1>

      <input
        type="text"
        placeholder="Example.com"
        value={newDomain}
        onChange={(e) => setNewDomain(e.target.value)}
      />

      <button onClick={handleAdd}>Add Domain</button>
      <table className="table">
        <thead>
          <tr>
            <th>Domain_ID</th>
            <th>Domain Name</th>
            <th>Caller Refernece</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {domains.map((item, index) => (
            <tr key={index}>
              <td>{item.Id.split("/").pop()}</td>
              <td><Link to={`/records/${item.Id.split("/").pop()}`}>{item.Name}</Link> </td>
              <td>{item.CallerReference}</td>
              <td>{item.recordType}</td>
              <td>
                <button onClick={() => editDomain(index)}>Edit</button>
                <button
                  onClick={() => deleteHostedZone(item.Id.split("/").pop())}
                >
                  Delete
                </button>
                
                
              </td>
            </tr>
          ))}
          
        </tbody>
      </table>

      <Modal isOpen={isModalOpen} onRequestClose={closeModal}>
        <h2>{editIndex !== null ? "Edit Domain" : "Add Domain"}</h2>
        <input
          type="text"
          placeholder="Enter Domain"
          value={newDomain}
          onChange={(e) => setNewDomain(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter DNS Record"
          value={newDNSRecord}
          onChange={(e) => setNewDNSRecord(e.target.value)}
        />
        <select
          value={recordType}
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
        <button onClick={addDomain}>
          {editIndex !== null ? "Save Changes" : "Add Domain"}
        </button>
        <button onClick={closeModal}>Close</button>
      </Modal>
    </div>
  );
}

export default Dashboard;
