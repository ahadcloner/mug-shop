import React, {useEffect, useState} from "react";
import '../assets/styles/NewProfile.css';
import {RiUser6Line, RiInformationLine, RiErrorWarningLine} from "react-icons/ri";
import {BsBasket3} from "react-icons/bs";
import {AiOutlineHeart, AiTwotoneEdit} from "react-icons/ai";
import {BiExit} from "react-icons/bi";
import {TbLocation} from "react-icons/tb";
import {RxCross1} from "react-icons/rx";
import {IoMdAdd} from "react-icons/io";
import CardProduct from "./CardProduct";
import {BsTrash2} from "react-icons/bs";

import p1 from '../assets/images/1.jpg';
import p2 from '../assets/images/2.jpg';
import p3 from '../assets/images/3.jpg';
import p4 from '../assets/images/4.jpg';
import p5 from '../assets/images/5.jpg';
import p6 from '../assets/images/6.jpg';
import p7 from '../assets/images/7.png';
import Card from "./Card";
import {useParams} from "react-router-dom";
let data = [
    {id: 1, title: 'ماگ حرارتی مدل اول', price: '27,000', picture: p1},
    {id: 2, title: 'ماگ حرارتی مدل دوم', price: '410,000', picture: p2},
    {id: 3, title: 'ماگ حرارتی مدل سوم', price: '23000', picture: p3},
    {id: 4, title: 'ماگ حرارتی مدل چهارم', price: '3,600', picture: p4},
    {id: 5, title: 'ماگ حرارتی مدل پنجم', price: '65000', picture: p5},
    {id: 6, title: 'ماگ حرارتی مدل ششم', price: '135,000', picture: p6},
    {id: 7, title: 'ماگ حرارتی مدل هفتم', price: '100,000', picture: p7},
    {id: 8, title: 'ماگ حرارتی مدل اول', price: '27,000', picture: p1},
    {id: 9, title: 'ماگ حرارتی مدل دوم', price: '410,000', picture: p2},
    {id: 10, title: 'ماگ حرارتی مدل سوم', price: '23000', picture: p3},
    {id: 11, title: 'ماگ حرارتی مدل چهارم', price: '3,600', picture: p4},
    {id: 12, title: 'ماگ حرارتی مدل پنجم', price: '65000', picture: p5},
    {id: 13, title: 'ماگ حرارتی مدل پنجم', price: '65000', picture: p5},
    {id: 14, title: 'ماگ حرارتی مدل پنجم', price: '65000', picture: p5},
    {id: 15, title: 'ماگ حرارتی مدل پنجم', price: '65000', picture: p5},
    {id: 16, title: 'ماگ حرارتی مدل پنجم', price: '65000', picture: p5},
    {id: 17, title: 'ماگ حرارتی مدل پنجم', price: '65000', picture: p5},
    {id: 18, title: 'ماگ حرارتی مدل پنجم', price: '65000', picture: p5},
    {id: 19, title: 'ماگ حرارتی مدل پنجم', price: '65000', picture: p5},
];

function NewProfile() {
    const section = useParams();

    const [activeMenu, setActiveMenu] = useState(section.section);
    useEffect(() => {
        setActiveMenu(section.section);
    }, [section]);
    const change_menu = (m) => {
        if(m==='info'){
            setActiveMenu('info');
        }
        if(m==='address'){
            setActiveMenu('address');
        }
        if(m==='order'){
            setActiveMenu('order');
        }
        if(m==='favorite'){
            setActiveMenu('favorite');
        }
        if(m==='order_detail'){
            setActiveMenu('order_detail');
        }
    }
    const show_order_detail = ()=>{
        change_menu('order_detail');
    }

    return (
        <div className={'np-container'}>
            <div className="np-menu">
                <div onClick={()=>change_menu('info')}  className={`np-menu-row ${activeMenu==='info'?'active':''}`}>
                    <span>اطلاعات شخصی</span>
                    <RiInformationLine/>
                </div>
                <div onClick={()=>change_menu('address')}  className={`np-menu-row ${activeMenu==='address'?'active':''}`}>
                    <span>آدرس ها</span>
                    <TbLocation/>
                </div>
                <div onClick={()=>change_menu('order')}  className={`np-menu-row ${activeMenu==='order'?'active':''}`}>
                    <span>سفارشات</span>
                    <BsBasket3/>
                </div>
                <div onClick={()=>change_menu('favorite')}  className={`np-menu-row ${activeMenu==='favorite'?'active':''}`}>
                    <span>علاقه مندی ها</span>
                    <AiOutlineHeart/>
                </div>

            </div>
            <div className="np-view">
                {
                    activeMenu ==='info' &&
                    <div className={'info-container'}>
                        <div className={"info-card align-right"}>
                            <span>ایمیل</span>
                            <input type={"text"} value={'ahad.mirhabibi@gmail.com'}/>
                        </div>
                        <div className={"info-card"}>
                            <span>نام کاربری</span>
                            <input type={"text"} value={'احد میرحبیبی'}/>
                        </div>
                        <div className={"info-card align-right"}>
                            <span>شماره تماس</span>
                            <input type={"text"} value={'09387153611'}/>
                        </div>
                        <div className={"info-card"}>
                            <span>تاریخ تولد</span>
                            <input type={"text"} value={'1374/01/08'}/>
                        </div>
                        <div className={"info-card align-right"}>
                            <span>استان</span>
                            <select name="state" id="state">
                                <option>تهران</option>
                                <option>کرمان</option>
                                <option>قم</option>
                                <option>خراسان</option>
                                <option>اصفهان</option>
                            </select>
                        </div>
                        <div className={"info-card"}>
                            <span>شهر</span>
                            <select name="city" id="city">
                                <option>تهران</option>
                                <option>کرمان</option>
                                <option>قم</option>
                                <option>خراسان</option>
                                <option>اصفهان</option>
                            </select>
                        </div>
                        <button>ویرایش اطلاعات</button>
                    </div>
                }
                {
                    activeMenu==='address' &&
                    <div className={'address-container'}>
                        <div className="address-card edit delete">
                            <div className="address-title">
                                <span>آدرس منزل</span>
                            </div>
                            <div className="address-value">
                                <span>کرمان خیابان شهدای خانوک نبش کوچه 5</span>
                            </div>
                            <BsTrash2></BsTrash2>
                            <AiTwotoneEdit></AiTwotoneEdit>
                        </div>
                        <div className="address-card edit delete">
                            <div className="address-title">
                                <span>آدرس منزل</span>
                            </div>
                            <div className="address-value">
                                <span>کرمان خیابان شهدای خانوک نبش کوچه 5</span>
                            </div>
                            <BsTrash2></BsTrash2>
                            <AiTwotoneEdit></AiTwotoneEdit>
                        </div>
                        <div className="address-card edit delete">
                            <div className="address-title">
                                <span>آدرس منزل</span>
                            </div>
                            <div className="address-value">
                                <span>کرمان خیابان شهدای خانوک نبش کوچه 5</span>
                            </div>
                            <BsTrash2></BsTrash2>
                            <AiTwotoneEdit></AiTwotoneEdit>
                        </div>
                        <div className="address-card edit delete">
                            <div className="address-title">
                                <span>آدرس منزل</span>
                            </div>
                            <div className="address-value">
                                <span>کرمان خیابان شهدای خانوک نبش کوچه 5</span>
                            </div>
                            <BsTrash2></BsTrash2>
                            <AiTwotoneEdit></AiTwotoneEdit>
                        </div>
                        <div className="address-card edit delete">
                            <div className="address-title">
                                <span>آدرس منزل</span>
                            </div>
                            <div className="address-value">
                                <span>کرمان خیابان شهدای خانوک نبش کوچه 5</span>
                            </div>
                            <BsTrash2></BsTrash2>
                            <AiTwotoneEdit></AiTwotoneEdit>
                        </div>

                        <button>افزودن آدرس</button>
                    </div>
                }
                {
                    activeMenu==='order' &&
                    <div className={'order-container'}>
                        <div className="order-header">
                            <span>ردیف</span>
                            <span>شماره سفارش</span>
                            <span>تاریخ</span>
                            <span>تعداد اقلام</span>
                            <span>مبلغ</span>
                            <span>وضعیت</span>
                            <span>نمایش جزئیات</span>
                        </div>
                        <div onClick={()=>change_menu('order_detail')} className="order-body">
                            <span>1</span>
                            <span>362541</span>
                            <span>1402/01/25</span>
                            <span>3</span>
                            <span>136,500</span>
                            <span className={'deliver-span'}>تحویل داده شده</span>
                            <span>...</span>
                        </div>
                        <div onClick={()=>change_menu('order_detail')} className="order-body">
                            <span>2</span>
                            <span>362541</span>
                            <span>1402/01/25</span>
                            <span>3</span>
                            <span>136,500</span>
                            <span className={'process-span'}>در حال پردازش</span>
                            <span >...</span>
                        </div>
                        <div onClick={()=>change_menu('order_detail')} className="order-body">
                            <span>3</span>
                            <span>362541</span>
                            <span>1402/01/25</span>
                            <span>3</span>
                            <span>136,500</span>
                            <span className={'cancel-span'}>لغو شده</span>
                            <span >...</span>
                        </div>
                        <div onClick={()=>change_menu('order_detail')} className="order-body">
                            <span>4</span>
                            <span>362541</span>
                            <span>1402/01/25</span>
                            <span>3</span>
                            <span>136,500</span>
                            <span className={'deliver-span'}>تحویل داده شده</span>
                            <span>...</span>
                        </div>
                        <div onClick={()=>change_menu('order_detail')} className="order-body">
                            <span>5</span>
                            <span>362541</span>
                            <span>1402/01/25</span>
                            <span>3</span>
                            <span>136,500</span>
                            <span className={'deliver-span'}>تحویل داده شده</span>
                            <span>...</span>
                        </div>

                    </div>
                }
                {
                    activeMenu === 'order_detail' &&
                    data.map((d)=>{return(
                        <CardProduct title={d.title} price={d.price} picture={d.picture} show_album={false}></CardProduct>
                    )})
                }
            </div>
        </div>
    )
}

export default NewProfile;