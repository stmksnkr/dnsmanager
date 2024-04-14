import './App.css';
import { Route, Routes } from 'react-router-dom';
// import DomainDashboard from './copmponent/DomainDashboard';
import Dashboard from './copmponent/Dashboard';
// import GetDomain from './copmponent/GetDomain';
import Records from './copmponent/Record';

function App() {
  
  return (

    
    <div className="App">
      <Routes>
      <Route exact path="/" element={<Dashboard/>} />
      <Route exact path="/records" element={<Records/>} />
      </Routes>
    
    
      {/* <GetDomain/> */}
      
     {/* <DomainDashboard/> */}
    
    </div>
  );
}

export default App;
