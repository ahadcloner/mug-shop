import React, {createContext, useState} from "react";
import './assets/styles/App.css';
import './assets/styles/reset.css'
import NavBar from "./components/NavBar";
import SideBar from "./components/SideBar";
import UserArea from "./components/UserArea";
import {SbContext} from "./components/SideBarContext";
import {UaContext} from "./components/SideBarContext";
import Card from "./components/Card";
import Gallery from "./components/Gallery";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import BuyCard from "./components/BuyCard";
import ProductDetail from "./components/ProductDetail";
import ProductGallery from "./components/ProductGallery";
import MainPage from "./components/MainPage";
import Login from "./components/Login";
import UserProfile from "./components/UserProfile";
import NotFound from "./components/NotFound";
import NewProfile from "./components/NewProfile";
import Footer from "./components/Footer";
import {ToastContainer} from "react-toastify";
import AdminPanel from "./components/AdminPanel";
import AddUser from "./components/AdminForms/AddUser";
import EditUser from "./components/AdminForms/EditUser";
import AddUserRole from "./components/AdminForms/AddUserRole";
import AddRole from "./components/AdminForms/AddRole";
import EditRole from "./components/AdminForms/EditRole";
import AddRolePermission from "./components/AdminForms/AddRolePermission";
import AddPermission from "./components/AdminForms/AddPermission";
import EditPermission from "./components/AdminForms/EditPermission";
import AddBanner from "./components/AdminForms/AddBanner";
import AddProductGroup from "./components/AdminForms/AddProductGroup";
import AddProductCategory from "./components/AdminForms/AddProductCategory";
import AddProductBrand from "./components/AdminForms/AddProductBrand";
import EditProductGroup from "./components/AdminForms/EditProductGroup";
import EditProductCategory from "./components/AdminForms/EditProductCategory";
import ProductManager from "./components/AdminForms/ProductManager";
import EditBrand from "./components/AdminForms/EditBrand";
import AddOption from "./components/AdminForms/AddOption";
import EditOption from "./components/AdminForms/EditOption";
import AddTag from "./components/AdminForms/AddTag";
import EditTag from "./components/AdminForms/EditTag";
import AddAttribute from "./components/AdminForms/AddAttribute";
import EditAttribute from "./components/AdminForms/EditAttribute";
import AddProduct from "./components/AdminForms/AddProduct";

function App() {
    const [sideBarStatus, setSideBarStatus] = useState('sb-hide');
    const [UaClass, setUaClass] = useState('ua-hide');

    return (<main>
            <UaContext.Provider value={{UaClass, setUaClass}}>
                <SbContext.Provider value={{sideBarStatus, setSideBarStatus}}>
                    <BrowserRouter>
                        <NavBar></NavBar>
                        <SideBar></SideBar>
                        <Routes>
                            <Route path={'/'} element={<MainPage/>}/>
                            <Route path={'/login/:section'} element={<Login/>}/>
                            <Route path={'/profile/:section'} element={<NewProfile/>}/>
                            <Route path={'/cart'} element={<BuyCard/>}/>
                            <Route path={'/product-detail/:id'} element={<ProductDetail/>}/>
                            <Route path={'/admin'} element={<AdminPanel/>}/>
                            <Route path={'/admin/add-user'} element={<AddUser/>}/>
                            <Route path={'/admin/edit-user/:id'} element={<EditUser/>}/>
                            <Route path={'/admin/add-user-role/:id'} element={<AddUserRole/>}/>
                            <Route path={'/admin/add-role'} element={<AddRole/>}/>
                            <Route path={'/admin/add-banner'} element={<AddBanner/>}/>
                            <Route path={'/admin/add-product-group'} element={<AddProductGroup/>}/>
                            <Route path={'/admin/add-product-category'} element={<AddProductCategory/>}/>
                            <Route path={'/admin/add-product-brand'} element={<AddProductBrand/>}/>
                            <Route path={'/admin/add-permission'} element={<AddPermission/>}/>
                            <Route path={'/admin/edit-role/:id'} element={<EditRole/>}/>
                            <Route path={'/admin/edit-product-group/:id'} element={<EditProductGroup/>}/>
                            <Route path={'/admin/edit-product-category/:id'} element={<EditProductCategory/>}/>
                            <Route path={'/admin/edit-permission/:id'} element={<EditPermission/>}/>
                            <Route path={'/admin/edit-brand/:id'} element={<EditBrand/>}/>
                            <Route path={'/admin/add-role-permission/:id'} element={<AddRolePermission/>}/>
                            <Route path={'/admin/product-manager'} element={<ProductManager/>}/>
                            <Route path={'/admin/add-option'} element={<AddOption/>}/>
                            <Route path={'/admin/add-tag'} element={<AddTag/>}/>
                            <Route path={'/admin/add-attribute'} element={<AddAttribute/>}/>
                            <Route path={'/admin/edit-option/:id'} element={<EditOption/>}/>
                            <Route path={'/admin/edit-tag/:id'} element={<EditTag/>}/>
                            <Route path={'/admin/edit-attribute/:id'} element={<EditAttribute/>}/>
                            <Route path={'/admin/add-product'} element={<AddProduct/>}/>
                            <Route path={'*'} element={<NotFound/>}/>
                        </Routes>
                        <UserArea></UserArea>
                        <ToastContainer
                            position="top-center"
                            autoClose={5000}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                            theme="colored"
                        />
                    </BrowserRouter>
                </SbContext.Provider>
            </UaContext.Provider>
        </main>
    );
}

export default App;
