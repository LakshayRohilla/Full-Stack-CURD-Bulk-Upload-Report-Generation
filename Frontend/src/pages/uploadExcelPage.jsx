import ProductBulkUpload from "../components/product/productBulkUpload";
import MiniDrawer from "../components/Shared/navBar";

const UploadExcelPage = () => {
    return (
        <>
        {/* <Navbar/> */}
        {/* <p>Please upload excel sheet for bulk upload</p>
        <UploadButton/> */}
        <MiniDrawer/>
        <ProductBulkUpload/>
        {/* <Footer/> */}
        </>
    );
}

export default UploadExcelPage;