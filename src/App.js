import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import './index.css';
import EmployeeApiContext from './Context/EmployeeApiContext';
import MainApp from './MainApp';
import ShowStores from './View/ShowStores/ShowStores';
import ByDateStore from './Component/ByDateStore/ByDateStore';





function App() {
  return (

    <EmployeeApiContext>
      <BrowserRouter>
        <Routes>

          <Route path="/" element={<MainApp />} />
          <Route path='/:byDateId' element={<ByDateStore />} />
          <Route path='/:byDateId/:storeId' element={<ShowStores />} />

          <Route path='*' element={<MainApp />} />


          {/* <Route path='/:storeId' element={<ShowStores />} /> */}



        </Routes>

      </BrowserRouter>
    </EmployeeApiContext>
  );
}

export default App;
