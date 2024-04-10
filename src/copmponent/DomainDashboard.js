import React, { useState } from 'react';

function DomainDashboard() {
    const [domains, setDomains] = useState([]);
    const [newDomain, setNewDomain] = useState('');
    const [newDNSRecord, setNewDNSRecord] = useState('');
    const [recordType, setRecordType] = useState('');

    const addDomain = () => {
        if (!newDomain.trim() || !newDNSRecord.trim() || !recordType.trim()) {
            alert('Please enter domain, DNS record, and record type.');
            return;
        }
        setDomains([...domains, { domain: newDomain, dnsRecord: newDNSRecord, recordType: recordType }]);
        setNewDomain('');
        setNewDNSRecord('');
        setRecordType('');
    };

    return (
        <div className="container">
            <h1>Domain and DNS Records Dashboard</h1>
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
            <button onClick={addDomain}>Add Domain</button>
            <table>
                <thead>
                    <tr>
                        <th>Domain</th>
                        <th>DNS Record</th>
                        <th>Record Type</th>
                    </tr>
                </thead>
                <tbody>
                    {domains.map((item, index) => (
                        <tr key={index}>
                            <td>{item.domain}</td>
                            <td>{item.dnsRecord}</td>
                            <td>{item.recordType}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default DomainDashboard;
