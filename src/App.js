import './App.css';
import { Route, Routes } from 'react-router-dom';
// import DomainDashboard from './copmponent/DomainDashboard';
import Dashboard from './copmponent/Dashboard';
// import GetDomain from './copmponent/GetDomain';
import RecordsPage from './copmponent/RecordsPage';

function App() {
  
  return (

    
    <div className="App">
      <Routes>
      <Route exact path="/" element={<Dashboard/>} />
      <Route exact path="/records/:recordId" element={<RecordsPage/>} />
      </Routes>
    
    
      {/* <GetDomain/> */}
      
     {/* <DomainDashboard/> */}
    
    </div>
  );
}

export default App;
