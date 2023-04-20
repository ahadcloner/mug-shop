import React from "react";
import '../assets/styles/MainPage.css';
import Carosel from "./Carosel";
import ProductGallery from "./ProductGallery";
import {ImSortAlphaAsc} from "react-icons/im";
function MainPage(){
    return(
        <div className={'mp-container'}>
            <Carosel></Carosel>
            <div className={'mp-cat'}>
                <span>ارزان ترین ها</span>
                <span>گران ترین ها</span>
                <span>پر فروش ترین ها</span>
                <span>محبوب ترین ها</span>
                <span className={'theme-color'}>تازه ترین ها</span>
                <ImSortAlphaAsc/>
            </div>
            <ProductGallery></ProductGallery>
        </div>

    )
}
export default MainPage;