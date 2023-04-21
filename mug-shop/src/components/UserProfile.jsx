import React, {useState} from "react";
import '../assets/styles/UserProfile.css';
import {RiUser6Line, RiInformationLine ,RiErrorWarningLine} from "react-icons/ri";
import {FaShoppingBasket} from "react-icons/fa";
import {AiOutlineHeart, AiTwotoneEdit} from "react-icons/ai";
import {BiExit} from "react-icons/bi";
import {GoVerified} from "react-icons/go";


function UserProfile() {
    const [showInfo, setShowInfo] = useState(true);
    const [showOrders, setShowOrders] = useState(false);
    const [showFavorite, setShowFavorite] = useState(false);
    const show_menu = (item) => {
        if (item === 'infos') {
            setShowInfo(true);
            setShowOrders(false);
            setShowFavorite(false);
        }
        if (item === 'orders') {
            setShowInfo(false);
            setShowOrders(true);
            setShowFavorite(false);
        }
        if (item === 'favorites') {
            setShowInfo(false);
            setShowOrders(false);
            setShowFavorite(true);
        }
    }
    return (
        <div className={'up-container'}>
            <div className="up-menu">
                <div className="menu-card">
                    <div className="up-menu-card-row">
                        <RiUser6Line/>
                        <span>احد میرحبیبی</span>
                    </div>
                </div>
                <div className="menu-menus">
                    <ul>
                        <li onClick={() => show_menu('infos')}>
                            <RiInformationLine/>
                            <span>اطلاعات شخصی</span>
                        </li>
                        <li onClick={() => show_menu('orders')}>
                            <FaShoppingBasket/>
                            <span>سفارشات</span>
                        </li>
                        <li onClick={() => show_menu('favorites')}>
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
                    <div className={'up-info-container'}>
                        <div className="up-info-row">
                            <div className="up-info-col edit">
                                <span>نام کاربری</span>
                                <span className={'info-value'}>احد میرحبیبی</span>
                                <AiTwotoneEdit/>
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
                                <AiTwotoneEdit/>

                            </div>
                            <div className="up-info-col edit">
                                <span>تاریخ تولد</span>
                                <span className={'info-value'}>1374/01/08</span>
                                <AiTwotoneEdit/>
                            </div>
                        </div>
                    </div>
                }
                {
                    showOrders &&
                    <div className={'up-orders-container'}>
                        <table>
                            <th>
                                <td>ردیف</td>
                                <td>شماره سفارش</td>
                                <td>تعداد کالا</td>
                                <td>مبلغ سفارش</td>
                                <td>تاریخ سفارش</td>
                                <td>وضعیت</td>
                                <td>عملیات</td>
                            </th>
                            <tbody>
                            <tr>
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
                            <tr>
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
                            <tr>
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
                            <tr>
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
                    showFavorite && <>favorites page</>
                }
            </div>
        </div>
    )
}

export default UserProfile;