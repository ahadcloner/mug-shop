import React from "react";
import p3 from "../assets/images/3.jpg";
import {IoMdAdd} from "react-icons/io";
import {AiOutlineMinus} from "react-icons/ai";
import {BsTrash2} from "react-icons/bs";
import {HiOutlineArrowUpCircle} from "react-icons/hi2";
import {upload} from "@testing-library/user-event/dist/upload";

function CardProduct({picture, title, price}) {
    return (
        <div className={"bc-product"}>
            <div className="bc-top">
                <img src={picture} alt={title}/>
                <div className="bc-info">
                    <div className="bc-row">
                        <span className={'special'}>{title}</span>
                        <span></span>
                    </div>
                    <div className="bc-row">
                        <span>قیمت واحد</span>
                        <span>{price}</span>
                    </div>
                    <div className="bc-row">
                        <span>تعداد خرید</span>
                        <span>1</span>
                    </div>
                    <div className="bc-row">
                        <span className={'special '}>جمع کل</span>
                        <span className={'special theme-color'}>1,250,000</span>
                    </div>
                </div>
            </div>
            <div className="bc-down">
                <div className="bc-actions">
                    <button><IoMdAdd/></button>
                    <button><AiOutlineMinus/></button>
                    <button className={'red'}><BsTrash2/></button>

                </div>
                <div className="bc-albume">
                    <button>بارگذاری عکس دلخواه</button>
                    <input type={"file"}/>
                    <div className="bc-gallery">
                        <img src={picture} alt={title}/>
                        <img src={picture} alt={title}/>
                        <img src={picture} alt={title}/>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default CardProduct;
