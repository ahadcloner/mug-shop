import React, {useState} from "react";
import '../assets/styles/MainPage.css';
import Carosel from "./Carosel";
import ProductGallery from "./ProductGallery";
import {ImSortAlphaAsc} from "react-icons/im";
import Footer from "./Footer";
import Category from "./Category";
import p1 from "../assets/images/1.jpg";
import p2 from "../assets/images/2.jpg";
import p3 from "../assets/images/3.jpg";
import p4 from "../assets/images/4.jpg";
import p5 from "../assets/images/5.jpg";

let data = [
    {id: 1, title: 'ماگ حرارتی مدل اول', price: '27,000', picture: p1},
    {id: 2, title: 'ماگ حرارتی مدل دوم', price: '410,000', picture: p2},
    {id: 3, title: 'ماگ حرارتی مدل سوم', price: '23000', picture: p3},
    {id: 4, title: 'ماگ حرارتی مدل چهارم', price: '3,600', picture: p4},
    {id: 5, title: 'ماگ حرارتی مدل پنجم', price: '65000', picture: p5},
    {id: 6, title: 'ماگ حرارتی مدل اول', price: '27,000', picture: p1},
    {id: 7, title: 'ماگ حرارتی مدل دوم', price: '410,000', picture: p2},
    {id: 8, title: 'ماگ حرارتی مدل سوم', price: '23000', picture: p3},
    {id: 9, title: 'ماگ حرارتی مدل چهارم', price: '3,600', picture: p4},
    {id: 10, title: 'ماگ حرارتی مدل پنجم', price: '65000', picture: p5},
    {id: 11, title: 'ماگ حرارتی مدل پنجم', price: '65000', picture: p5},
    {id: 12, title: 'ماگ حرارتی مدل اول', price: '27,000', picture: p1},
    {id: 13, title: 'ماگ حرارتی مدل دوم', price: '410,000', picture: p2},
    {id: 14, title: 'ماگ حرارتی مدل سوم', price: '23000', picture: p3},
    {id: 15, title: 'ماگ حرارتی مدل چهارم', price: '3,600', picture: p4},
    {id: 16, title: 'ماگ حرارتی مدل پنجم', price: '65000', picture: p5},

];

function MainPage() {
    const [viewMode , setViewMode] = useState('category');
    const view_products = ()=>{
        setViewMode('product');
    }
    const view_categories = ()=>{
        setViewMode('category');
    }

    return (
        <>
            <div className={'mp-container'}>
                {
                    viewMode ==='category' &&
                    <>
                        <Carosel></Carosel>
                        <Category data={[...data]} title={'ماگ حرارتی'} changeView={view_products}></Category>
                        <Category data={[...data]} title={'ماگ شیشه ای'} changeView={view_products}></Category>
                        <Category data={[...data]} title={'ماگ رنگی'} changeView={view_products}></Category>
                        <Category data={[...data]} title={'ماگ سفالی'} changeView={view_products}></Category>
                        <Category data={[...data]} title={'ماگ سرامیکی'} changeView={view_products}></Category>
                    </>
                }
                {
                    viewMode === 'product' &&
                    <>
                        <div className={'mp-cat'}>
                            <span>پر فروش ترین ها</span>
                            <span>محبوب ترین ها</span>
                            <span className={'theme-color'}>تازه ترین ها</span>
                            <ImSortAlphaAsc/>
                        </div>
                        <ProductGallery changeView={view_categories} title={'ماگ سفالی'}/>
                    </>
                }
            </div>
        </>
    )
}

export default MainPage;