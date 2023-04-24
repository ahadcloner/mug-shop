import React, {useState} from "react";
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
    const [activeMenu, setActiveMenu] = useState('info');
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
        <div className={'mp-container'}>
            <div className="np-menu">
                <div onClick={()=>change_menu('info')} className={`np-menu-item ${activeMenu==='info'?'active':''}`}>
                    <span>اطلاعات شخصی</span>
                    <RiInformationLine/>
                </div>
                <div onClick={()=>change_menu('address')} className={`np-menu-item ${activeMenu==='address'?'active':''}`}>
                    <span>آدرس ها</span>
                    <TbLocation/>
                </div>
                <div onClick={()=>change_menu('order')} className={`np-menu-item ${activeMenu==='order'?'active':''}`}>
                    <span>سفارشات</span>
                    <BsBasket3/>
                </div>
                <div onClick={()=>change_menu('favorite')} className={`np-menu-item ${activeMenu==='favorite'?'active':''}`}>
                    <span>علاقه مندی ها</span>
                    <AiOutlineHeart/>
                </div>

                {
                    activeMenu ==='address' &&
                    <button className={'add-btn'}>
                        افزودن آدرس
                    </button>
                }


            </div>
            {
                activeMenu === 'info' &&
                <section id={'info'} className={'np-info-container'}>
                    <div className="info-card">
                        <span>ایمیل</span>
                        <span>ahad.mirhabibi@gmail.com</span>
                    </div>
                    <div className="info-card">
                        <span>نام کاربری</span>
                        <span>احد میرحبیبی</span>
                    </div>
                    <div className="info-card">
                        <span>تاریخ تولد</span>
                        <span>1374/01/08</span>
                    </div>
                    <div className="info-card">
                        <span>استان</span>
                        <span>کرمان</span>
                    </div>
                    <div className="info-card">
                        <span>شهر</span>
                        <span>کرمان</span>
                    </div>
                    <div className="info-card">
                        <span>شماره تماس</span>
                        <span>09387153611</span>
                    </div>
                </section>
            }
            {
                activeMenu === 'address' &&

                <section id='address' className={'np-address-container'} >
                    <div className="address-card">
                        <span>منزل</span>
                        <span>خیابان شهدای خانوک کوچه 5</span>
                    </div>
                    <div className="address-card">
                        <span>منزل</span>
                        <span>خیابان شهدای خانوک کوچهخیابان شهدای خانوک کوچهخیابان شهدای خانوک کوچه خیابان شهدای خانوک کوچه5خیابان شهدای خانوک کوچه</span>
                    </div>
                    <div className="address-card">
                        <span>منزل</span>
                        <span>خیابان شهدای خانوک کوچه 5</span>
                    </div>
                    <div className="address-card">
                        <span>منزل</span>
                        <span>خیابان شهدای خانوک کوچه 5</span>
                    </div>

                </section>


            }
            {
                activeMenu === 'order' &&
                <section id={'order'} className={'order-container'}>
                   <div className="order-header">
                        <span>ردیف</span>
                        <span>شماره سفارش</span>
                        <span>تعداد اقلام</span>
                        <span>مبلغ کل</span>
                        <span>تاریخ سفارش</span>
                        <span>وضعیت سفارش</span>
                        <span>نمایش جزیات</span>
                   </div>

                    <div onClick={()=>show_order_detail()} className="order-body">
                        <span>1</span>
                        <span>1008765</span>
                        <span>5</span>
                        <span>136,500</span>
                        <span>1402/01/12</span>
                        <span className={'deliver'}>تحویل شده</span>
                        <span className={'link'}>...</span>
                    </div>

                    <div onClick={()=>show_order_detail()} className="order-body">
                        <span>2</span>
                        <span>1008765</span>
                        <span>5</span>
                        <span>136,500</span>
                        <span>1402/01/12</span>
                        <span className={'doing'}>درحال پردازش</span>
                        <span className={'link'}>...</span>
                    </div>

                    <div onClick={()=>show_order_detail()} className="order-body">
                        <span>3</span>
                        <span>1008765</span>
                        <span>5</span>
                        <span>136,500</span>
                        <span>1402/01/12</span>
                        <span className={'deliver'}>تحویل شده</span>
                        <span className={'link'}>...</span>
                    </div>

                    <div onClick={()=>show_order_detail()} className="order-body">
                        <span>4</span>
                        <span>1008765</span>
                        <span>5</span>
                        <span>136,500</span>
                        <span>1402/01/12</span>
                        <span className={'cancel'}>تحویل شده</span>
                        <span className={'link'}>...</span>
                    </div>
                </section>
            }
            {
                activeMenu === 'favorite' &&
                <section id={'fave-container'} className={'fave-container'}>
                    {
                        data.map((d)=>{return(
                            <div key={d.id} className="fave-card">
                                <div className="fave-image">
                                    <img src= {d.picture} alt={d.title}/>
                                </div>
                                <div className="fave-body">
                                    <div className="fave-body-info">
                                        <h2>{d.title}</h2>
                                        <span>تومان{d.price}</span>
                                    </div>
                                    <div className="fave-body-action">
                                        <button><BsTrash2/></button>
                                    </div>
                                </div>
                            </div>
                        )})
                    }


                </section>
            }
            {
                activeMenu ==="order_detail" &&
                <section id={'order-detail'} className={'order-detail-container'}>
                    <CardProduct title={data[0].title} price={data[0].price} picture={data[0].picture} show_album={false}/>
                    <CardProduct title={data[0].title} price={data[0].price} picture={data[0].picture} show_album={false}/>
                    <CardProduct title={data[0].title} price={data[0].price} picture={data[0].picture} show_album={false}/>
                    <CardProduct title={data[0].title} price={data[0].price} picture={data[0].picture} show_album={false}/>
                    <CardProduct title={data[0].title} price={data[0].price} picture={data[0].picture} show_album={false}/>
                </section>
            }
        </div>
    )
}

export default NewProfile;