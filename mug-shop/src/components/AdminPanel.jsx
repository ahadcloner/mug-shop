import React, {useState} from "react";
import '../assets/styles/AdminPanel.css';
import {BsUniversalAccessCircle, BsBorderWidth} from "react-icons/bs";
import {SiOpenaccess} from "react-icons/si";
import {GiVerticalBanner, GiMoneyStack} from "react-icons/gi";
import {RiProductHuntFill} from "react-icons/ri";
import {AiOutlineComment, AiOutlineUser} from "react-icons/ai";
import {TbCategory, TbDiscount2} from "react-icons/tb";
import {HiOutlineDocumentReport} from "react-icons/hi";


function AdminPanel() {
    const [apActiveMenu, setApActiveMenu] = useState('users');
    const change_menu = (name) => {
        setApActiveMenu(name);
    }
    return (
        <div className={'ap-container'}>
            <div className="ap-menu">
                <div onClick={() => {
                    change_menu('users')
                }} className={`ap-menu-row ${apActiveMenu==='users'?'apActive':''}`}>
                    <AiOutlineUser/>
                    <span>مدیریت کاربران</span>
                </div>
                <div onClick={() => {
                    change_menu('roles')
                }} className={`ap-menu-row ${apActiveMenu==='roles'?'apActive':''}`}>
                    <BsUniversalAccessCircle/>
                    <span>مدیریت نقش ها</span>
                </div>
                <div onClick={() => {
                    change_menu('permissions')
                }}className={`ap-menu-row ${apActiveMenu==='permissions'?'apActive':''}`}>
                    <SiOpenaccess/>
                    <span>مدیریت مجوز ها</span>
                </div>
                <div onClick={() => {
                    change_menu('banners')
                }} className={`ap-menu-row ${apActiveMenu==='banners'?'apActive':''}`}>
                    <GiVerticalBanner/>
                    <span>مدیریت بنر ها</span>
                </div>
                <div onClick={() => {
                    change_menu('categories')
                }} className={`ap-menu-row ${apActiveMenu==='categories'?'apActive':''}`}>
                    <TbCategory/>
                    <span>دسته بندی ها</span>
                </div>
                <div onClick={() => {
                    change_menu('products')
                }} className={`ap-menu-row ${apActiveMenu==='products'?'apActive':''}`}>
                    <RiProductHuntFill/>
                    <span>مدیریت محصولات </span>
                </div>
                <div onClick={() => {
                    change_menu('discounts')
                }} className={`ap-menu-row ${apActiveMenu==='discounts'?'apActive':''}`}>
                    <TbDiscount2/>
                    <span>مدیریت تخفیف ها </span>
                </div>
                <div onClick={() => {
                    change_menu('orders')
                }} className={`ap-menu-row ${apActiveMenu==='orders'?'apActive':''}`}>
                    <BsBorderWidth/>
                    <span>مدیریت سفارشات ها</span>
                </div>
                <div onClick={() => {
                    change_menu('comments')
                }} className={`ap-menu-row ${apActiveMenu==='comments'?'apActive':''}`}>
                    <AiOutlineComment/>
                    <span>مدیریت کامنت ها</span>
                </div>
                <div onClick={() => {
                    change_menu('finance')
                }}className={`ap-menu-row ${apActiveMenu==='finance'?'apActive':''}`}>
                    <GiMoneyStack/>
                    <span>مدیریت مالی</span>
                </div>
                <div onClick={() => {
                    change_menu('reports')
                }} className={`ap-menu-row ${apActiveMenu==='reports'?'apActive':''}`}>
                    <HiOutlineDocumentReport/>
                    <span>گزارشات</span>
                </div>

            </div>
            <div className="ap-view">
                {
                    apActiveMenu === 'users' &&
                    <>
                    </>
                }
            </div>
        </div>
    )
}

export default AdminPanel;