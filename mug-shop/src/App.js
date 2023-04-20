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
                    <Route path={'/card'} element={<BuyCard/>}/>
                    <Route path={'/product-detail/:id'} element={<ProductDetail/>}/>
                </Routes>
                <UserArea></UserArea>
            </BrowserRouter>
                </SbContext.Provider>
            </UaContext.Provider>
        </main>
    );
}

export default App;
