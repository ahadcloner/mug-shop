import React, {useState} from "react";
import '../assets/styles/UserProfile.css';

import {RiUser6Line, RiInformationLine, RiErrorWarningLine} from "react-icons/ri";
import {FaShoppingBasket} from "react-icons/fa";
import {AiOutlineHeart, AiTwotoneEdit} from "react-icons/ai";
import {BiExit} from "react-icons/bi";
import {CiLocationOn} from "react-icons/ci";
import {RxCross1} from "react-icons/rx";
import {IoMdAdd} from "react-icons/io";

import p1 from '../assets/images/1.jpg';
import p2 from '../assets/images/2.jpg';
import p3 from '../assets/images/3.jpg';
import p4 from '../assets/images/4.jpg';
import p5 from '../assets/images/5.jpg';
import p6 from '../assets/images/6.jpg';
import p7 from '../assets/images/7.png';
import ChangeSingleParameterModal from "./Modals/ChangeSingleParameterModal";
import TextAreaModal from "./Modals/TextAreaModal";
import ComboModal from "./Modals/ComboModal";
import CardProduct from "./CardProduct";
import Card from "./Card";

const profile_addresses = [
    {id: 0, address: 'خیابان شهدای خانوک کوچه 5 درب اول سمت راست'},
    {id: 1, address: 'بلوار جمهوری یانک رسالت'},
    {id: 2, address: 'خیابان شهید مصطفی خمینی کوچه 45'},
    {id: 3, address: 'خیابان شهید عباس پور مقابل کلانتری'},
    {id: 4, address: 'خیابان جمهوری کوچه 12 فرعی اول سمت راست'},
]
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
const states = [
    {id: 0, value: 'کرمان'},
    {id: 1, value: 'تهران'},
    {id: 2, value: 'مشهد'},
    {id: 3, value: 'اصفهان'},
    {id: 4, value: 'خوزستان'},
    {id: 5, value: 'قم'}
]


function UserProfile() {

    const [showInfo, setShowInfo] = useState(true);
    const [showOrders, setShowOrders] = useState(false);
    const [showFavorite, setShowFavorite] = useState(false);
    const [showAddresses, setShowAddresses] = useState(false);
    const [showOrderDetail, setShowOrderDetail] = useState(false);
    const [addressCount, setAddressCount] = useState(0);
    const [openSingleParameterModal, setOpenSingleParameterModal] = React.useState(false);
    const [openTextAreaModal, setOpenTextAreaModal] = React.useState(false);
    const [openComboModal, setOpenComboModal] = React.useState(false);
    const [modalTitle, setModalTitle] = React.useState('');
    const [modalFieldTitle, setModalFieldTitle] = React.useState('');
    const [modalOldValue, setModalOldValue] = React.useState('');
    const [modalComboData, setModalComboData] = useState([]);
    const [activeMenu, setActiveMenu] = useState('infos');

    const change_menu = (item) => {
        setActiveMenu(item);
    }

    function open_modal(title, field_title, old_value) {
        setModalTitle(title);
        setModalFieldTitle(field_title);
        setModalOldValue(old_value);
        setOpenSingleParameterModal(true);
    }

    function open_textarea_modal(title, field_title, old_value) {
        setModalTitle(title);
        setModalFieldTitle(field_title);
        setModalOldValue(old_value);
        setOpenTextAreaModal(true);
    }

    function open_combo_modal(title, field_title, old_value, data) {
        setModalTitle(title);
        setModalFieldTitle(field_title);
        setModalOldValue(old_value);
        setModalComboData([...data]);
        setOpenComboModal(true);
    }

    function close_modal() {
        setOpenSingleParameterModal(false);
    }

    function close_textarea_modal() {
        setOpenTextAreaModal(false);
    }

    function close_combo_modal() {
        setOpenComboModal(false);
    }

    const add_address = () => {
        if (addressCount < 5) {
            setAddressCount(addressCount + 1);
        }
    }
    const show_menu = (item) => {
        if (item === 'infos') {
            setShowInfo(true);
            setShowOrders(false);
            setShowFavorite(false);
            setShowAddresses(false);
            setShowOrderDetail(false);
        }
        if (item === 'orders') {
            setShowInfo(false);
            setShowOrders(true);
            setShowFavorite(false);
            setShowAddresses(false);
            setShowOrderDetail(false);
        }
        if (item === 'favorites') {
            setShowInfo(false);
            setShowOrders(false);
            setShowFavorite(true);
            setShowAddresses(false);
            setShowOrderDetail(false);
        }
        if (item === 'addresses') {
            setShowInfo(false);
            setShowOrders(false);
            setShowFavorite(false);
            setShowAddresses(true);
            setShowOrderDetail(false);
        }
    }
    const change_show_order_detail = ()=>{
        setShowInfo(false);
        setShowOrders(false);
        setShowFavorite(false);
        setShowAddresses(false);
        setShowOrderDetail(true);
    }
    return (
        <div className={'up-container'}>
            <ChangeSingleParameterModal
                isOpen={openSingleParameterModal}
                onRequestClose={close_modal}
                old_value={modalOldValue}
                title={modalTitle}
                field_title={modalFieldTitle}
            >
            </ChangeSingleParameterModal>

            <TextAreaModal
                isOpen={openTextAreaModal}
                onRequestClose={close_textarea_modal}
                old_value={modalOldValue}
                title={modalTitle}
                field_title={modalFieldTitle}
            >
            </TextAreaModal>

            <ComboModal
                isOpen={openComboModal}
                onRequestClose={close_combo_modal}
                old_value={modalOldValue}
                title={modalTitle}
                field_title={modalFieldTitle}
                data={[...modalComboData]}
            >
            </ComboModal>


            <div className="up-menu">
                <div className="menu-card">
                    <div className="up-menu-card-row">
                        <RiUser6Line/>
                        <span>احد میرحبیبی</span>
                    </div>
                </div>
                <div className="menu-menus">
                    <ul>
                        <li className={`${activeMenu === "infos" ? 'active-menu' : ''}`} onClick={() => {
                            show_menu('infos');
                            change_menu('infos')
                        }}>
                            <RiInformationLine/>
                            <span>اطلاعات شخصی</span>
                        </li>
                        <li className={`${activeMenu === "addresses" ? 'active-menu' : ''}`} onClick={() => {
                            show_menu('addresses');
                            change_menu('addresses')
                        }}>
                            <CiLocationOn/>
                            <span>آدرس ها</span>
                        </li>
                        <li className={`${activeMenu === "orders" ? 'active-menu' : ''}`} onClick={() => {
                            show_menu('orders');
                            change_menu('orders')
                        }}>
                            <FaShoppingBasket/>
                            <span>سفارشات</span>
                        </li>
                        <li className={`${activeMenu === "favorites" ? 'active-menu' : ''}`} onClick={() => {
                            show_menu('favorites');
                            change_menu('favorites')
                        }}>
                            <AiOutlineHeart/>
                            <span>علاقه مندی ها</span>
                        </li>
                        <li>
                            <BiExit/>
                            <span>خروج از حساب کاربری</span>
                        </li>

                    </ul>
                </div>
            </div>
            <div className="up-view">
                {
                    showInfo &&
                    <>
                        <div className={'up-info-container'}>
                            <div className="up-info-row">
                                <div className="up-info-col edit">
                                    <span>نام کاربری</span>
                                    <span className={'info-value'}>احد میرحبیبی</span>
                                    <AiTwotoneEdit
                                        onClick={() => open_modal('تغییر نام کاربری', 'نام کاربری', 'احد میرحبیبی')}/>
                                </div>
                                <div className="up-info-col">
                                    <span>ایمیل</span>
                                    <span className={'info-value'}>ahad.mirhabibi@gmail.com</span>
                                </div>
                            </div>
                            <div className="up-info-row">
                                <div className="up-info-col edit">
                                    <span>شماره تماس</span>
                                    <span className={'info-value'}>09387153611</span>
                                    <AiTwotoneEdit
                                        onClick={() => open_modal('تغییر شماره تماس', 'شماره تماس', '09387153611')}/>
                                </div>
                                <div className="up-info-col edit">
                                    <span>تاریخ تولد</span>
                                    <span className={'info-value'}>1374/01/08</span>
                                    <AiTwotoneEdit/>
                                </div>
                            </div>
                            <div className="up-info-row">

                                <div className="up-info-col edit">
                                    <span>شهر </span>
                                    <span className={'info-value'}>کرمان</span>
                                    <AiTwotoneEdit onClick={()=>open_combo_modal('تغییر شهر','شهر','کرمان',[...states])}/>
                                </div>
                                <div className="up-info-col edit">
                                    <span>استان </span>
                                    <span className={'info-value'}>کرمان</span>
                                    <AiTwotoneEdit onClick={()=>open_combo_modal('تغییر استان','استان','کرمان',[...states])} />
                                </div>
                            </div>
                        </div>
                    </>
                }
                {
                    showAddresses &&
                    <div className={'up-address-container'}>
                        <div className="up-addresses">
                            <div className="up-addresses-row">
                                {
                                    profile_addresses.slice(0, addressCount).map((d) => {
                                        return (
                                            <div key={d.id} className="up-addresses-col edit delete">
                                                <span> آدرس{d.id + 1}</span>
                                                <span className={'info-value'}>{d.address}</span>
                                                <AiTwotoneEdit className={'edit-icon'}
                                                               onClick={() => open_textarea_modal('تغییر آدرس', 'آدرس', d.address)}/>
                                                <RxCross1 className={'delete-icon'}/>
                                            </div>
                                        )
                                    })
                                }

                            </div>
                        </div>
                        {
                            addressCount < 5 ?
                                <>
                                    <button className={'add-row-btn'} onClick={() => {
                                        add_address()
                                    }}><IoMdAdd/></button>
                                    <span className={'add-row-span'}> افزودن آدرس </span>
                                </> : <></>
                        }
                    </div>
                }
                {
                    showOrders &&
                    <div className={'up-orders-container'}>
                        <table>
                            <thead>
                                <th>ردیف</th>
                                <th>شماره سفارش</th>
                                <th>تعداد کالا</th>
                                <th>مبلغ سفارش</th>
                                <th>تاریخ سفارش</th>
                                <th>وضعیت</th>
                                <th>عملیات</th>
                            </thead>
                            <tbody>
                            <tr onClick={()=>change_show_order_detail()}>
                                <td>1</td>
                                <td>10001</td>
                                <td>3</td>
                                <td>145,600</td>
                                <td>1400/01/10</td>
                                <td className={'deliver'}>
                                    تحویل شده
                                </td>
                                <td>جزئیات سفارش</td>
                            </tr>
                            <tr onClick={()=>change_show_order_detail()}>
                                <td>2</td>
                                <td>10001</td>
                                <td>3</td>
                                <td>145,600</td>
                                <td>1400/01/10</td>
                                <td className={'process'}>
                                    جاری
                                </td>
                                <td>جزئیات سفارش</td>
                            </tr>
                            <tr onClick={()=>change_show_order_detail()}>
                                <td>3</td>
                                <td>10001</td>
                                <td>3</td>
                                <td>145,600</td>
                                <td>1400/01/10</td>
                                <td className={'cancel td-alight-right'}>
                                    لغو شده
                                </td>
                                <td>جزئیات سفارش</td>
                            </tr>
                            <tr onClick={()=>change_show_order_detail()}>
                                <td>4</td>
                                <td>10001</td>
                                <td>3</td>
                                <td>145,600</td>
                                <td>1400/01/10</td>
                                <td className={'deliver td-alight-right'}>
                                    تحویل شده
                                </td>
                                <td>جزئیات سفارش</td>
                            </tr>

                            </tbody>
                        </table>
                    </div>
                }
                {
                    showOrderDetail &&

                    data.slice(0,4).map((d)=>{
                        return(
                            <CardProduct key={d.id} picture={d.picture} title={d.title} price={d.price} />
                        )
                    })

                }
                {
                    showFavorite &&
                    <>
                        {/*<Card picture={data[0].picture} price={data[0].price} name={data[0].title} ></Card>*/}
                    </>
                }
            </div>
        </div>
    )
}

export default UserProfile;