import React from "react";
import '../assets/styles/SideBar.css';
import {BiHomeAlt2} from "react-icons/bi";
import {IoMdLogIn} from "react-icons/io";
import {AiOutlineMessage} from "react-icons/ai";
import {GiArchiveRegister} from "react-icons/gi";
import {useContext} from "react";
import {SbContext} from "./SideBarContext";
import { useNavigate } from "react-router-dom";

function SideBar() {
    const {sideBarStatus, setSideBarStatus} = useContext(SbContext);
    const navigate = useNavigate();

    return (
        <section className={`sb-section ${sideBarStatus}`}>
            <div className={'sb-title'}>
                <h2>فروشگاه ماگ شاپ</h2>
            </div>
            <div className={'sb-menu'}>
                <div onClick={()=>navigate('/')} className={`sb-menu-item ${sideBarStatus==='sb-hide'?'special-menu':''}`}>
                    <span>خانه</span>
                    <BiHomeAlt2/>
                </div>
                <div className={`sb-menu-item ${sideBarStatus==='sb-hide'?'special-menu':''}`}>
                    <span>ثبت نام</span>
                    <GiArchiveRegister/>
                </div>
                <div onClick={()=>navigate('/login')} className={`sb-menu-item ${sideBarStatus==='sb-hide'?'special-menu':''}`}>
                    <span>ورود به حساب</span>
                    <IoMdLogIn/>
                </div>
                <div className={`sb-menu-item ${sideBarStatus==='sb-hide'?'special-menu':''}`}>
                    <span>ارسال پیام</span>
                    <AiOutlineMessage/>
                </div>
            </div>
        </section>
    )
}

export default SideBar;