import React from "react";
import '../assets/styles/Category.css';
import Card from "./Card";
import p1 from "../assets/images/1.jpg";
import p2 from "../assets/images/2.jpg";
import p3 from "../assets/images/3.jpg";
import p4 from "../assets/images/4.jpg";
import p5 from "../assets/images/5.jpg";
import {BiChevronLeft} from "react-icons/bi";
import Footer from "./Footer";

function Category({data, title, changeView}) {
    return (
        <>
            <div className={'cat-container'}>
                {
                    data.slice(0, 5).map((d) => {
                        return (
                            <div key={d.id} className="cat-card">
                                <div className="cat-card-image">
                                    <img src={d.picture} alt={d.title}/>
                                </div>
                                <div className="cat-card-title">
                                    <span>{d.title}</span>
                                </div>
                            </div>
                        )
                    })
                }
                <div className="cat-card-action">
                    <BiChevronLeft/>
                    <span onClick={() => changeView()} className={'view-title'}>مشاهده محصولات</span>
                </div>
                <h2>{title}</h2>
            </div>
            <Footer/>
        </>
    )
}

export default Category;