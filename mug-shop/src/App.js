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
                            <Route path={'/admin/add-permission'} element={<AddPermission/>}/>
                            <Route path={'/admin/edit-role/:id'} element={<EditRole/>}/>
                            <Route path={'/admin/edit-permission/:id'} element={<EditPermission/>}/>
                            <Route path={'/admin/add-role-permission/:id'} element={<AddRolePermission/>}/>
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
