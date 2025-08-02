import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import './index.css';
import EmployeeApiContext from './Context/EmployeeApiContext';
import MainApp from './MainApp';
import ShowStores from './View/ShowStores/ShowStores';





function App() {
  return (

    <EmployeeApiContext>
      <BrowserRouter>
        <Routes>

          <Route path="/" element={<MainApp />} />
          <Route path='/:storeId' element={<ShowStores />} />


        </Routes>

      </BrowserRouter>
    </EmployeeApiContext>
  );
}

export default App;
