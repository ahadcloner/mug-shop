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
import AddUser from "./AdminForms/AddUser";
import AddAddress from "./AdminForms/AddAddress";


function AdminPanel() {

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
    ];
    const users_field_names = [
        {id: 0, title: 'email',is_date:false,is_boolean:false},
        {id: 1, title: 'full_name',is_date:false,is_boolean:false},
        {id: 2, title: 'created_at',is_date:true,is_boolean:false},
        {id: 3, title: 'birth_date',is_date:false,is_boolean:false},
        {id: 4, title: 'city.state.name',is_date:false,is_boolean:false},
        {id: 5, title: 'city.name',is_date:false,is_boolean:false},
        {id: 6, title: 'mobile',is_date:false,is_boolean:false},
        {id: 7, title: 'status',is_date:false,is_boolean:true},
        // {id: 9, title: ['مدیریت نقش ها','ویرایش اطلاعات']},
    ]
    const users_buttons=[
        {
            id:0 ,title:'تغییر وضعیت' , func:''
        },
        {
            id:1 ,title:'ویرایش اطلاعات' , func:()=>change_menu('edit-user')
        },
        {
            id:2 ,title:'مدیریت نقش ها' , func:''
        },
        {
            id:3 ,title:'آدرس ها' , func:(e)=>{
                change_menu('user-address');
                get_user_addresses(e);
                change_refresh_user_address();
            }
        },

    ]

    const roles_headers = [
        {id: 0, title: 'ردیف'},
        {id: 1, title: 'نام'},
        {id: 2, title: 'نام گارد'},
        {id: 3, title: 'عملیات'},
    ]
    const roles_field_names = [
        {id: 0, title: 'name',is_date:false},
        {id: 1, title: 'guard_name',is_date:false},
    ]
    const roles_buttons=[
        {
            id:0 ,title:'ویرایش نقش' , func:''
        },
        {
            id:1 ,title:'ویرایش دسترسی ها' , func:''
        }
    ]

    const permission_headers = [
        {id: 0, title: 'ردیف'},
        {id: 1, title: 'نام'},
        {id: 2, title: 'نام گارد'},
        {id: 3, title: 'عملیات'},
    ]
    const permission_field_names = [
        {id: 0, title: 'name',is_date:false},
        {id: 1, title: 'guard_name',is_date:false},
    ]
    const permission_buttons=[
        {
            id:0 ,title:'ویرایش دسترسی' , func:''
        }
    ]

    const user_address_headers = [
        {id: 0, title: 'ردیف'},
        {id: 1, title: 'استان'},
        {id: 2, title: 'شهر'},
        {id: 3, title: 'آدرس'},
        {id: 4, title: 'عملیات'},
    ];
    const user_address_field_names = [
        {id: 0, title: 'state_id',is_date:false,is_boolean:false},
        {id: 1, title: 'city_id',is_date:false,is_boolean:false},
        {id: 2, title: 'title',is_date:true,is_boolean:false},
        // {id: 9, title: ['مدیریت نقش ها','ویرایش اطلاعات']},
    ]
    const user_address_buttons=[
        {
            id:0 ,title:'ویرایش آدرس' , func:()=>change_menu('edit-address')
        },
        {
            id:1 ,title:'حذف آدرس' , func:''
        },

    ]


    const [apActiveMenu, setApActiveMenu] = useState('users');
    const [cookie, setCookie, removeCookie] = useCookies(['token']);
    const [users, setUsers] = useState([]);
    const [roles, setRoles] = useState([]);
    const [permissions, setPermissions] = useState([]);
    const [userAddresses, setUserAddresses] = useState([]);
    const [refreshData , setRefreshData]=useState(false);
    const [refreshRoleData , setRefreshRoleData]=useState(false);
    const [refreshPermissionData , setRefreshPermissionData]=useState(false);
    const [refreshUserAddressData , setRefreshUserAddressData]=useState(false);
    const change_refresh =()=>{
        setRefreshData(!refreshData);
    }
    const change_refresh_roles =()=>{
        setRefreshRoleData(!refreshRoleData);
    }
    const change_refresh_permissions =()=>{
        setRefreshPermissionData(!refreshPermissionData);
    }
    const change_refresh_user_address =()=>{
        setRefreshUserAddressData(!refreshUserAddressData);
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

       await axios.request(config)
            .then((response) => {
                setUsers( response.data.data)
                // console.log('users',response.data.data)
            })
            .catch((error) => {
                console.log(error);
            });

    }
    const get_roles = async () => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'https://hitmug.ir/api/role/index',
            headers: {
                'Authorization': 'Bearer '+cookie.token
            }
        };

       await axios.request(config)
            .then((response) => {
                setRoles( response.data.data)
            })
            .catch((error) => {
                console.log(error);
            });

    }
    const get_permissions = async () => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'https://hitmug.ir/api/permision/index',
            headers: {
                'Authorization': 'Bearer '+cookie.token
            }
        };

        await axios.request(config)
            .then((response) => {
                setPermissions( response.data.data)
            })
            .catch((error) => {
                console.log(error);
            });

    }

    const get_user_addresses = async (user_id)=>{
        let data={};
        if(user_id!=='')
        {
             data ={
                'user_id':user_id
            }
        }

        let config = {
            method: 'post',
            url: 'https://hitmug.ir/api/user/get-addresses',

            data:data,
            headers: {
                'Authorization': 'Bearer '+cookie.token
            }
        };

       await axios.request(config)
            .then((response) => {
               setUserAddresses( response.data.data)
            })
            .catch((error) => {
                console.log(error);
            });
    }


    useEffect(() => {
       get_users()
    }, [refreshData]);
    useEffect(() => {
        get_roles()
    }, [refreshRoleData]);
    useEffect(() => {
        get_permissions()
    }, [refreshPermissionData]);
    useEffect(() => {
        get_user_addresses('')
    }, [refreshUserAddressData]);

    return (
        <div className={'ap-container'}>

            {/*define modals*/}


            <div className="ap-menu">
                <div onClick={() => {
                    change_menu('users')
                }} className={`ap-menu-row ${apActiveMenu === 'users' 
                || apActiveMenu==='user-address'
                || apActiveMenu==='add-user'
                || apActiveMenu==='edit-address'
                || apActiveMenu==='edit-user'
                ||apActiveMenu==='add-address' ? 'apActive' : ''}`}>
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
                            action_function={(e)=>change_menu(e)}
                            action_function_argument={'add-user'}
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
                            headers={roles_headers}
                            data={roles}
                            reload={change_refresh_roles}
                            field_names ={roles_field_names}
                            buttons={roles_buttons}
                        />
                    </>
                }
                {
                    apActiveMenu === 'permissions' &&
                    <>
                        <DataGrid
                            grid_title={'دسترسی ها'}
                            action_title={'افزودن دسترسی'}
                            have_action={true}
                            headers={permission_headers}
                            data={permissions}
                            reload={change_refresh_permissions}
                            field_names ={permission_field_names}
                            buttons={permission_buttons}
                        />
                    </>
                }
                {
                    apActiveMenu === 'user-address' &&
                    <>
                       <DataGrid
                        grid_title={'آدرس های کاربر'}
                        data={userAddresses}
                        have_action={true}
                        headers={user_address_headers}
                        action_title={'افزودن آدرس'}
                        action_function={(e)=>{
                            change_menu(e)
                        }}
                        action_function_argument='add-address'
                        field_names={user_address_field_names}
                        buttons={user_address_buttons}
                        reload={change_refresh_user_address}
                       />
                    </>
                }
                {
                    (apActiveMenu === 'add-user' ||apActiveMenu==='edit-user') &&
                    <>
                       <AddUser
                           mode={apActiveMenu==='add-user'?'create':'edit'}
                           fields={[
                                'id' , 'email' , 'password' ,'username','mobile', 'state','city'
                           ]}
                       />
                    </>
                }
                {
                    ( apActiveMenu === 'add-address' || apActiveMenu==='edit-address') &&
                    <>
                        <AddAddress
                            mode={apActiveMenu==='add-address'?'create':'edit'}
                            fields={[
                               'id' , 'state' , 'city' ,'title'
                            ]}
                        />
                    </>
                }
            </div>
        </div>
    )
}

export default AdminPanel;