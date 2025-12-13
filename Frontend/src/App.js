import './App.css';
import HomePage from './pages/homepage';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UploadExcelPage from './pages/uploadExcelPage';
import ProductPage from './pages/productPage';
import UserPage from './pages/usersPage';
import CategoryPage from './pages/categoryPage';
import AddCategoryFormPage from './pages/formPages/addCategoryFormPage';
import AddProductFormPage from './pages/formPages/addProductFormPage';
import AddUserFormPage from './pages/formPages/addUserFormPage';
import ErrorPage from './pages/errorPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter> 
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/bulkUpload" element={<UploadExcelPage/>} />
          <Route path="/product" element={<ProductPage/>} />
          <Route path="/user" element={<UserPage/>} />
          <Route path="/category" element={<CategoryPage/>} />
          {/* Forms */}
          <Route path="/createCategory" element={<AddCategoryFormPage/>} />
          <Route path="/createProduct" element={<AddProductFormPage/>} />
          <Route path="/createUser" element={<AddUserFormPage/>} />
          {/* No Page */}
          <Route path="*" element={<ErrorPage/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
