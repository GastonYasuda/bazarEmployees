import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './View/Main/Main';
import './index.css';
import EmployeeApiContext from './Context/EmployeeApiContext';



function App() {
  return (
    <EmployeeApiContext>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
        </Routes>
      </BrowserRouter>
    </EmployeeApiContext>
  );
}

export default App;
