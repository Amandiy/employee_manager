import './App.js';
import './App.css';
import NavBar from './components/NavBar';
import {BrowserRouter, Routes,Route} from 'react-router-dom';
import EditEmployee from './components/EditEmployee.js';
import AddEmployee from './components/AddEmployee.js';
import EmployeeList from './components/EmployeeList.js';

function App() {
  return (
    <BrowserRouter>
    <NavBar/>
    <Routes>
    <Route path='/'element={<EmployeeList/>}/>
      <Route path='/employee/add' element={<AddEmployee/>}/>
      <Route path='/edit/:id' element={<EditEmployee/>}/>
 

    </Routes>
    </BrowserRouter>
  
  );
}

export default App;
