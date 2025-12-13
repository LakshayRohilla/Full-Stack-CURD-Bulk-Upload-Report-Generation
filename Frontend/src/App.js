import './App.css';
import HomePage from './pages/homepage';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UploadExcelPage from './pages/uploadExcelPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<HomePage/>} />
          <Route path="/bulkUpload" element={<UploadExcelPage/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
