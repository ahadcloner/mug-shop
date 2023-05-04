import React, {useEffect, useState} from "react";
import '../assets/styles/AdminPanel.css';
import {BsUniversalAccessCircle, BsBorderWidth} from "react-icons/bs";
import {SiOpenaccess} from "react-icons/si";
import {GiVerticalBanner, GiMoneyStack} from "react-icons/gi";
import {RiProductHuntFill} from "react-icons/ri";
import {AiOutlineComment, AiOutlineUser} from "react-icons/ai";
import {TbCategory, TbDiscount2} from "react-icons/tb";
import {HiOutlineDocumentReport} from "react-icons/hi";
import DataGrid from "./DataGrid";
import axios from "axios";
import {useCookies} from "react-cookie";

const users_headers = [
    {id: 0, title: 'ردیف'},
    {id: 1, title: 'ایمیل'},
    {id: 2, title: 'نام کاربری'},
    {id: 3, title: 'تاریخ ثبت نام'},
    {id: 4, title: 'تاریخ تولد'},
    {id: 5, title: 'استان'},
    {id: 6, title: 'شهر'},
    {id: 7, title: 'شماره تماس'},
    {id: 8, title: 'وضعیت'},
    {id: 9, title: 'عملیات'},
]
const users_field_names = [
    {id: 0, title: 'email',is_date:false},
    {id: 1, title: 'full_name',is_date:false},
    {id: 2, title: 'created_at',is_date:true},
    {id: 3, title: 'birth_date',is_date:false},
    {id: 4, title: 'state',is_date:false},
    {id: 5, title: 'city',is_date:false},
    {id: 6, title: 'mobile',is_date:false},
    {id: 7, title: 'status',is_date:false},
    // {id: 9, title: ['مدیریت نقش ها','ویرایش اطلاعات']},
]
const users_buttons=[
    {
        id:0 ,title:'ویرایش اطلاعات' , func:''
    },
    {
        id:1 ,title:'مدیریت نقش ها' , func:''
    }
]

function AdminPanel() {
    const [apActiveMenu, setApActiveMenu] = useState('users');
    const [cookie, setCookie, removeCookie] = useCookies(['token']);
    const [users, setUsers] = useState([]);
    const [refreshData , setRefreshData]=useState(false);
    const change_refresh =()=>{
        setRefreshData(!refreshData);
    }
    const change_menu = (name) => {
        setApActiveMenu(name);
    }

    const get_users = async () => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'https://hitmug.ir/api/user/index',
            headers: {
                'Authorization': 'Bearer '+cookie.token
            }
        };

        axios.request(config)
            .then((response) => {
                setUsers( response.data.data)
                console.log(users)
            })
            .catch((error) => {
                console.log(error);
            });

    }
    useEffect(() => {
       get_users()
    }, [refreshData]);
    return (
        <div className={'ap-container'}>
            <div className="ap-menu">
                <div onClick={() => {
                    change_menu('users')
                }} className={`ap-menu-row ${apActiveMenu === 'users' ? 'apActive' : ''}`}>
                    <AiOutlineUser/>
                    <span>مدیریت کاربران</span>
                </div>
                <div onClick={() => {
                    change_menu('roles')
                }} className={`ap-menu-row ${apActiveMenu === 'roles' ? 'apActive' : ''}`}>
                    <BsUniversalAccessCircle/>
                    <span>مدیریت نقش ها</span>
                </div>
                <div onClick={() => {
                    change_menu('permissions')
                }} className={`ap-menu-row ${apActiveMenu === 'permissions' ? 'apActive' : ''}`}>
                    <SiOpenaccess/>
                    <span>مدیریت مجوز ها</span>
                </div>
                <div onClick={() => {
                    change_menu('banners')
                }} className={`ap-menu-row ${apActiveMenu === 'banners' ? 'apActive' : ''}`}>
                    <GiVerticalBanner/>
                    <span>مدیریت بنر ها</span>
                </div>
                <div onClick={() => {
                    change_menu('categories')
                }} className={`ap-menu-row ${apActiveMenu === 'categories' ? 'apActive' : ''}`}>
                    <TbCategory/>
                    <span>دسته بندی ها</span>
                </div>
                <div onClick={() => {
                    change_menu('products')
                }} className={`ap-menu-row ${apActiveMenu === 'products' ? 'apActive' : ''}`}>
                    <RiProductHuntFill/>
                    <span>مدیریت محصولات </span>
                </div>
                <div onClick={() => {
                    change_menu('discounts')
                }} className={`ap-menu-row ${apActiveMenu === 'discounts' ? 'apActive' : ''}`}>
                    <TbDiscount2/>
                    <span>مدیریت تخفیف ها </span>
                </div>
                <div onClick={() => {
                    change_menu('orders')
                }} className={`ap-menu-row ${apActiveMenu === 'orders' ? 'apActive' : ''}`}>
                    <BsBorderWidth/>
                    <span>مدیریت سفارشات ها</span>
                </div>
                <div onClick={() => {
                    change_menu('comments')
                }} className={`ap-menu-row ${apActiveMenu === 'comments' ? 'apActive' : ''}`}>
                    <AiOutlineComment/>
                    <span>مدیریت کامنت ها</span>
                </div>
                <div onClick={() => {
                    change_menu('finance')
                }} className={`ap-menu-row ${apActiveMenu === 'finance' ? 'apActive' : ''}`}>
                    <GiMoneyStack/>
                    <span>مدیریت مالی</span>
                </div>
                <div onClick={() => {
                    change_menu('reports')
                }} className={`ap-menu-row ${apActiveMenu === 'reports' ? 'apActive' : ''}`}>
                    <HiOutlineDocumentReport/>
                    <span>گزارشات</span>
                </div>

            </div>
            <div className="ap-view">
                {
                    apActiveMenu === 'users' &&
                    <>
                        <DataGrid
                            grid_title={'کاربران'}
                            action_title={'افزودن کاربر'}
                            have_action={true}
                            headers={users_headers}
                            data={users}
                            reload={change_refresh}
                            field_names ={users_field_names}
                            buttons={users_buttons}
                        />
                    </>
                }
                {
                    apActiveMenu === 'roles' &&
                    <>
                        <DataGrid
                            grid_title={'نقش ها'}
                            action_title={'افزودن نقش'}
                            have_action={true}
                            headers={users_headers}
                            data={users}
                            reload={change_refresh}
                            field_names ={users_field_names}
                            buttons={users_buttons}
                        />
                    </>
                }
            </div>
        </div>
    )
}

export default AdminPanel;