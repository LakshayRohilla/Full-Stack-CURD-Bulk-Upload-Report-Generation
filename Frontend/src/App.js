import logo from './logo.svg';
import './App.css';
import UploadExcelPage from './pages/uploadExcelPage';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <UploadExcelPage/>
      </header>
    </div>
  );
}

export default App;
