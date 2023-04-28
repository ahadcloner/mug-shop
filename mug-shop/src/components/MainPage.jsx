import React from "react";
import '../assets/styles/MainPage.css';
import Carosel from "./Carosel";
import ProductGallery from "./ProductGallery";
import {ImSortAlphaAsc} from "react-icons/im";
import Footer from "./Footer";
function MainPage(){
    return(
        <>
        <div className={'mp-container'}>
            <Carosel></Carosel>
            <div className={'mp-cat'}>
                <span>پر فروش ترین ها</span>
                <span>محبوب ترین ها</span>
                <span className={'theme-color'}>تازه ترین ها</span>
                <ImSortAlphaAsc/>
            </div>
            <ProductGallery></ProductGallery>
        </div>
</>
    )
}
export default MainPage;