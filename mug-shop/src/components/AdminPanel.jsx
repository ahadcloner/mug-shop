import React, {useEffect, useState} from "react";
import '../assets/styles/AdminPanel.css';
import {BsUniversalAccessCircle, BsBorderWidth} from "react-icons/bs";
import {SiOpenaccess} from "react-icons/si";
import {GiVerticalBanner, GiMoneyStack} from "react-icons/gi";
import {RiProductHuntFill} from "react-icons/ri";
import {AiOutlineComment, AiOutlineUser} from "react-icons/ai";
import {TbCategory, TbDiscount2,TbBrandApple} from "react-icons/tb";
import {HiOutlineDocumentReport} from "react-icons/hi";
import {IoOptions} from "react-icons/io5";
import {AiOutlineUngroup} from "react-icons/ai";
import {BiTagAlt} from "react-icons/bi";
import {MdEditAttributes} from "react-icons/md";

import DataGrid from "./DataGrid";
import axios from "axios";
import {useCookies} from "react-cookie";
import AddUser from "./AdminForms/AddUser";
import AddAddress from "./AdminForms/AddAddress";
import {Simple_get} from "./Utils/RequstSender";
import {Notifier} from "./Utils/Notifier";
import {useNavigate} from "react-router-dom";


function AdminPanel() {
    const navigate = useNavigate();

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
        {id: 0, title: 'email', is_date: false, is_boolean: false,is_image:false},
        {id: 1, title: 'full_name', is_date: false, is_boolean: false,is_image:false},
        {id: 2, title: 'created_at', is_date: true, is_boolean: false,is_image:false},
        {id: 3, title: 'birth_date', is_date: false, is_boolean: false,is_image:false},
        {id: 4, title: 'city.state.name', is_date: false, is_boolean: false,is_image:false},
        {id: 5, title: 'city.name', is_date: false, is_boolean: false,is_image:false},
        {id: 6, title: 'mobile', is_date: false, is_boolean: false,is_image:false},
        {id: 7, title: 'status', is_date: false, is_boolean: true,is_image:false},
        // {id: 9, title: ['مدیریت نقش ها','ویرایش اطلاعات']},
    ]
    const users_buttons = [
        {
            id: 0, title: 'تغییر وضعیت', func: (e) => change_user_status(e)
        },
        {
            id: 1, title: 'ویرایش اطلاعات', func: (e) => {
                navigate('/admin/edit-user/' + e)
            }
        },
        {
            id: 2, title: 'مدیریت نقش ها', func: (e) => {
                change_menu('user-roles');
                get_user_roles(e);
            }
        },
        {
            id: 3, title: 'آدرس ها', func: (e) => {
                change_menu('user-address');
                get_user_addresses(e);
                change_refresh_user_address();
            }
        },
        {
            id: 4, title: 'حذف', func: (e) => {
                delete_user(e);
            }
        },

    ]

    const user_roles_headers = [
        {id: 0, title: 'ردیف'},
        {id: 1, title: 'نام نقش'},
        {id: 2, title: 'عملیات'},
    ];
    const user_roles_field_names = [
        {id: 0, title: 'name', is_date: false, is_boolean: false,is_image:false},
        // {id: 9, title: ['مدیریت نقش ها','ویرایش اطلاعات']},
    ]
    const user_roles_buttons = [
        {
            id: 0, title: 'حذف نقش', func: (e) => {
                delete_user_role(e);
            }
        },

    ]

    const roles_headers = [
        {id: 0, title: 'ردیف'},
        {id: 1, title: 'نام'},
        {id: 2, title: 'نام گارد'},
        {id: 3, title: 'عملیات'},
    ];
    const roles_field_names = [
        {id: 0, title: 'name', is_date: false,is_image:false},
        {id: 1, title: 'guard_name', is_date: false,is_image:false},
    ];
    const roles_buttons = [
        {
            id: 0, title: 'ویرایش نقش', func: (e) => {
                navigate('/admin/edit-role/' + e)
            }
        },
        {
            id: 1, title: 'ویرایش دسترسی ها', func: (e) => {
                change_menu('role-permissions');
                change_refresh_role_permissions();
            }
        },
        {
            id: 2, title: 'حذف نقش', func: (e) => {
                delete_role(e)
            }
        },
    ];


    const role_permissions_headers = [
        {id: 0, title: 'ردیف'},
        {id: 1, title: 'نام'},
        {id: 3, title: 'عملیات'},
    ];
    const role_permissions_field_names = [
        {id: 0, title: 'name', is_date: false,is_image:false},
    ];
    const role_permissions_buttons = [
        {
            id: 0, title: 'حذف دسترسی', func: (e) => {
                delete_role_permission(e);
            }
        }

    ];

    const permission_headers = [
        {id: 0, title: 'ردیف'},
        {id: 1, title: 'نام'},
        {id: 2, title: 'نام گارد'},
        {id: 3, title: 'عملیات'},
    ]
    const permission_field_names = [
        {id: 0, title: 'name', is_date: false,is_image:false},
        {id: 1, title: 'guard_name', is_date: false,is_image:false},
    ]
    const permission_buttons = [
        {
            id: 0, title: 'ویرایش دسترسی', func: (e)=>{navigate('/admin/edit-permission/'+e)}
        },
        {
            id: 1, title: 'حذف دسترسی', func:(e)=>{
                delete_permission(e);
            }
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
        {id: 0, title: 'state_id', is_date: false, is_boolean: false,is_image:false},
        {id: 1, title: 'city_id', is_date: false, is_boolean: false,is_image:false},
        {id: 2, title: 'title', is_date: true, is_boolean: false,is_image:false},
        // {id: 9, title: ['مدیریت نقش ها','ویرایش اطلاعات']},
    ]
    const user_address_buttons = [
        {
            id: 0, title: 'ویرایش آدرس', func: () => change_menu('edit-address')
        },
        {
            id: 1, title: 'حذف آدرس', func: ''
        },

    ]

    const banners_headers = [
        {id: 0, title: 'ردیف'},
        {id: 1, title: 'بنر'},
        {id: 2, title: 'الویت نمایش'},
        {id: 9, title: 'عملیات'},
    ];
    const banners_field_names = [
        {id: 0, title: 'address', is_date: false, is_boolean: false,is_image:true},
        {id: 1, title: 'order', is_date: false, is_boolean: false,is_image:false},
    ]
    const banners_buttons = [
        {
            id: 1, title: 'افزایش الویت', func: (e)=>{inc_order(e)}
        },
        {
            id: 2, title: 'کاهش الویت',  func: (e)=>{desc_order(e)}
        },
        {
            id: 3, title: 'حذف بنر',func:(e)=>{delete_banner(e)}
        },
    ]

    const product_group_headers = [
        {id: 0, title: 'ردیف'},
        {id: 1, title: 'نام'},
        {id: 2, title: 'الویت نمایش'},
        {id: 9, title: 'عملیات'},
    ];
    const product_group_field_names = [
        {id: 0, title: 'name', is_date: false, is_boolean: false,is_image:false},
        {id: 1, title: 'order', is_date: false, is_boolean: false,is_image:false},
    ]
    const product_group_buttons = [
        {
            id: 1, title: 'افزایش الویت', func: (e)=>{inc_product_group(e)}
        },
        {
            id: 2, title: 'کاهش الویت',  func: (e)=>{desc_product_group(e)}
        },
        {
            id: 3, title: 'ویرایش',  func: (e)=>{navigate('/admin/edit-product-group/'+e)}
        },
        {
            id: 4, title: 'حذف گروه محصول',func:(e)=>{delete_product_group(e)}
        },
    ]

    const product_category_headers = [
        {id: 0, title: 'ردیف'},
        {id: 1, title: 'نام'},
        {id: 9, title: 'عملیات'},
    ];
    const product_category_field_names = [
        {id: 0, title: 'name', is_date: false, is_boolean: false,is_image:false},
    ]
    const product_category_buttons = [
        {
            id: 1, title: 'ویرایش', func: (e)=>{navigate('/admin/edit-product-category/'+e)}
        },
        {
            id: 2, title: 'حذف',  func: (e)=>{delete_product_category(e)}
        },

    ]

    const product_brands_headers = [
        {id: 0, title: 'ردیف'},
        {id: 1, title: 'نام'},
        {id: 2, title: 'نام لاتین'},
        {id: 9, title: 'عملیات'},
    ];
    const product_brands_field_names = [
        {id: 0, title: 'name', is_date: false, is_boolean: false,is_image:false},
        {id: 1, title: 'name2', is_date: false, is_boolean: false,is_image:false},
    ]
    const product_brands_buttons = [
        {
            id: 1, title: 'ویرایش', func: (e)=>{navigate('/admin/edit-brand/'+e)}
        },
        {
            id: 2, title: 'حذف',  func: (e)=>{delete_product_brand(e)}
        },

    ]

    const product_options_headers = [
        {id: 0, title: 'ردیف'},
        {id: 1, title: 'نام'},
        {id: 2, title: 'توضیحات'},
        {id: 3, title: 'هزینه'},
        {id: 9, title: 'عملیات'},
    ];
    const product_options_field_names = [
        {id: 0, title: 'name', is_date: false, is_boolean: false,is_image:false},
        {id: 1, title: 'description', is_date: false, is_boolean: false,is_image:false},
        {id: 2, title: 'price', is_date: false, is_boolean: false,is_image:false},
    ]
    const product_options_buttons = [
        {
            id: 1, title: 'ویرایش', func:(e)=>navigate('/admin/edit-option/'+e)
        },
        {
            id: 2, title: 'حذف',  func:(e)=>{delete_option(e)}
        }
    ]

    const tag_headers = [
        {id: 0, title: 'ردیف'},
        {id: 1, title: 'نام'},
        {id: 9, title: 'عملیات'},
    ];
    const tag_field_names = [
        {id: 0, title: 'name', is_date: false, is_boolean: false,is_image:false},
    ]
    const tag_buttons = [
        {
            id: 1, title: 'ویرایش', func:(e)=>navigate('/admin/edit-tag/'+e)
        },
        {
            id: 2, title: 'حذف',  func:(e)=>{delete_tag(e)}
        }
    ]

    const attribute_headers = [
        {id: 0, title: 'ردیف'},
        {id: 1, title: 'نام'},
        {id: 9, title: 'عملیات'},
    ];
    const attribute_field_names = [
        {id: 0, title: 'name', is_date: false, is_boolean: false,is_image:false},
    ]
    const attribute_buttons = [
        {
            id: 1, title: 'ویرایش', func:(e)=>navigate('/admin/edit-attribute/'+e)
        },
        {
            id: 2, title: 'حذف',  func:(e)=>{delete_attribute(e)}
        }
    ]

    const [showToggleMenu , setShowToggleMenu] = useState(false);
    const [apActiveMenu, setApActiveMenu] = useState('users');
    const [cookie, setCookie, removeCookie] = useCookies(['token']);
    const [users, setUsers] = useState([]);
    const [roles, setRoles] = useState([]);
    const [permissions, setPermissions] = useState([]);
    const [userAddresses, setUserAddresses] = useState([]);
    const [userRoles, setUserRoles] = useState([]);
    const [banners, setBanners] = useState([]);
    const [productGroups, setProductGroups] = useState([]);
    const [productCategories, setProductCategories] = useState([]);
    const [productBrands, setProductBrands] = useState([]);
    const [productOptions, setProductOptions] = useState([]);
    const [tags, setTags] = useState([]);
    const [attributes, setAttributes] = useState([]);
    const [rolePermissions, setRolePermissions] = useState([]);
    const [refreshData, setRefreshData] = useState(false);
    const [refreshRoleData, setRefreshRoleData] = useState(false);
    const [refreshPermissionData, setRefreshPermissionData] = useState(false);
    const [refreshUserAddressData, setRefreshUserAddressData] = useState(false);
    const [refreshUserRolesData, setRefreshUserRolesData] = useState(false);
    const [refreshRolePermissions, setRefreshRolePermissions] = useState(false);
    const [refreshBanners, setRefreshBanners] = useState(false);
    const [refreshProductGroups, setRefreshProductGroups] = useState(false);
    const [refreshProductCategories, setRefreshProductCategories] = useState(false);
    const [refreshProductBrands, setRefreshProductBrands] = useState(false);
    const [refreshProductOptions, setRefreshProductOptions] = useState(false);
    const [refreshTags, setRefreshTags] = useState(false);
    const [refreshAttributes, setRefreshAttributes] = useState(false);
    const [lastUserId, setLastUserId] = useState();
    const [lastRoleId, setLastRoleId] = useState();
    const [lastPermissionId, setLastPermissionId] = useState();
    const [LastProductGroupId, setLastProductGroupId] = useState();
    const [LastProductCategoryId, setLastProductCategoryId] = useState();
    const [LastBrandId, setLastBrandId] = useState();
    const [lastOptionId, setLastOptionId] = useState();
    const [lastTagId, setLastTagId] = useState();
    const [lastAttributeId, setLastAttributeId] = useState();


    const [newUser, setNewUser] = useState({
        email: '',
        full_name: '',
        mobile: '',
        city_id: '',
        birth_date: '',
        status: false,
        password: ''
    });


    const change_refresh = () => {
        setRefreshData(!refreshData);
    }
    const change_refresh_roles = () => {
        setRefreshRoleData(!refreshRoleData);
    }
    const change_refresh_permissions = () => {
        setRefreshPermissionData(!refreshPermissionData);
    }
    const change_refresh_user_address = () => {
        setRefreshUserAddressData(!refreshUserAddressData);
    }
    const change_refresh_user_roles = () => {
        setRefreshUserRolesData(!refreshUserRolesData);
    }

    const change_refresh_role_permissions = () => {
        setRefreshRolePermissions(!refreshRolePermissions);
    }

    const change_refresh_banners = () => {
        setRefreshBanners(!refreshBanners);
    }
    const change_refresh_product_groups = () => {
        setRefreshProductGroups(!refreshProductGroups);
    }

    const change_refresh_product_categories = () => {
        setRefreshProductCategories(!refreshProductCategories)
    }

    const change_refresh_product_brands = () => {
        setRefreshProductBrands(!refreshProductBrands)
    }

    const change_refresh_product_options = () => {
        setRefreshProductOptions(!refreshProductOptions)
    }
    const change_refresh_tags = () => {
        setRefreshTags(!refreshTags)
    }

    const change_refresh_attributes = () => {
        setRefreshAttributes(!refreshAttributes)
    }
    const change_menu = (name) => {
        setApActiveMenu(name);
    }


    const get_users = async () => {
        const data = await Simple_get('https://hitmug.ir/api/user/index', true
            , '', cookie.token, 'get', [])
            .then((d) => {
                if (parseInt(d?.[2]) >= 200 && parseInt(d?.[2]) < 300) {
                    setUsers(d[0])
                } else {
                    Notifier('danger', 'خطا در دریافت لیست کاربران')
                }
            })
    }
    const get_roles = async () => {
        const data = await Simple_get('https://hitmug.ir/api/role/index', true
            , '', cookie.token, 'get', [])
            .then((d) => {
                if (parseInt(d?.[2]) >= 200 && parseInt(d?.[2]) < 300) {
                    setRoles(d[0])
                } else {
                    Notifier('danger', 'خطا در دریافت لیست نقش ها')
                }
            });
    }

    const get_tags = async () => {
        const data = await Simple_get('https://hitmug.ir/api/tag/index', true
            , '', cookie.token, 'get', [])
            .then((d) => {
                if (parseInt(d?.[2]) >= 200 && parseInt(d?.[2]) < 300) {
                    setTags(d[0])
                } else {
                    Notifier('danger', 'خطا در دریافت لیست تگ ها')
                }
            });
    }

    const get_attributes = async () => {
        const data = await Simple_get('https://hitmug.ir/api/attribute/index', true
            , '', cookie.token, 'get', [])
            .then((d) => {
                if (parseInt(d?.[2]) >= 200 && parseInt(d?.[2]) < 300) {
                    setAttributes(d[0])
                } else {
                    Notifier('danger', 'خطا در دریافت لیست ویژگی ها')
                }
            });
    }
    const get_permissions = async () => {

        const data = await Simple_get('https://hitmug.ir/api/permision/index', true
            , '', cookie.token, 'get', [])
            .then((d) => {
                if (parseInt(d?.[2]) >= 200 && parseInt(d?.[2]) < 300) {
                    setPermissions(d[0])
                } else {
                    Notifier('danger', 'خطا در دریافت لیست دسترسی ها')
                }
            });
    }

    const get_user_addresses = async (user_id) => {
        if (user_id !== '') {
            let mydata = {
                'user_id': user_id
            }
            const data = await Simple_get('https://hitmug.ir/api/user/get-addresses', true
                , '', cookie.token, 'post', mydata)
                .then((d) => {
                    if (parseInt(d?.[2]) >= 200 && parseInt(d?.[2]) < 300) {
                        setUserAddresses(d[0])
                    } else {
                        Notifier('danger', 'خطا در دریافت لیست آدرس ها')
                    }
                });
        }
    }
    const delete_user = (id) => {

        if (window.confirm('آیا برای حذف کاربر اطمینان دارید؟')) {
            Simple_get('https://hitmug.ir/api/user/delete', true, '/' + id, cookie.token, 'delete', [])
                .then((d) => {
                    if (parseInt(d?.[2]) >= 200 && parseInt(d?.[2]) < 300) {
                        Notifier('success', 'اطلاعات کاربر با موفقیت حذف شد');
                        change_refresh();
                    } else {
                        Notifier('danger', 'خطا در حذف حساب کاربری');
                    }
                })
        }
    }

    const delete_user_role = async (role_id) => {
        const result = roles.filter((k) => {
            return role_id == k.id
        })
        const role_name = result?.[0]?.name
        let dataObj = {
            'user_id': lastUserId,
            'role': role_name,
        }
        await Simple_get('https://hitmug.ir/api/user/roles/revoke', true, '', cookie.token, 'post', {...dataObj})
            .then((d) => {
                if (parseInt(d?.[2]) >= 200 && parseInt(d?.[2]) < 300) {
                    Notifier('success', 'نقش کاربری موفقیت حذف شد');
                    change_refresh_user_roles();
                } else {
                    Notifier('danger', 'خطا در حذف نقش کاربری');
                }
            })

    }

    const delete_role = (role_id) => {
        if (window.confirm('آیا برای حذف کردن نقش مطمین هستید؟')) {
            Simple_get('https://hitmug.ir/api/role/delete/', true, role_id, cookie.token, 'delete', [])
                .then((d) => {
                    if (parseInt(d?.[2]) >= 200 && parseInt(d?.[2]) < 300) {
                        Notifier('success', 'نقش با موفقیت حذف شد');
                        change_refresh_roles();
                    } else {
                        Notifier('danger', 'خطا در حذف نقش');
                    }
                })
        }
    }

    const get_user_roles = async (id) => {
        let data = await Simple_get('https://hitmug.ir/api/user/roles/', true, id, cookie.token, 'get', [])
            .then((d) => {
                if (parseInt(d?.[2]) >= 200 && parseInt(d?.[2]) < 300) {
                    setUserRoles(d?.[0])
                } else {
                    Notifier('danger', 'خطا در در یافت نقش های کاربری');
                }
            })
    }

    const get_role_permissions = (role_id) => {
        Simple_get('https://hitmug.ir/api/role/permissions/', true, role_id, cookie.token, 'get', [])
            .then((d) => {
                if (parseInt(d?.[2]) >= 200 && parseInt(d?.[2]) < 300) {
                    setRolePermissions(d?.[0])
                } else {
                    Notifier('danger', 'خطا در در یافت دسترسی های نقش');
                }
            })
    }

    const delete_role_permission = (permission_id) => {
        let dataObj = {
            'role_id': lastRoleId,
            'permission_id': permission_id,
        }
        Simple_get('https://hitmug.ir/api/role/revoke-permission', true, '', cookie.token, 'post', {...dataObj})
            .then((d) => {
                if (parseInt(d?.[2]) >= 200 && parseInt(d?.[2]) < 300) {
                    Notifier('success', 'دسترسی با موفقیت حذف شد');
                    change_refresh_role_permissions();
                } else {
                    Notifier('danger', 'خطا در حذف دسترسی');
                }
            })
    }

    const delete_permission = (id)=>{
            Simple_get('https://hitmug.ir/api/permision/delete/', true, id, cookie.token, 'delete', [])
                .then((d) => {
                    if (parseInt(d?.[2]) >= 200 && parseInt(d?.[2]) < 300) {
                        Notifier('success', 'دسترسی با موفقیت حذف شد');
                        change_refresh_permissions();
                    } else {
                        Notifier('danger', 'خطا در حذف دسترسی');
                    }
                })
    }

    const get_banners= async ()=>{
        const data = await Simple_get('https://hitmug.ir/api/banner/index', true
            , '', cookie.token, 'get', [])
            .then((d) => {
                if (parseInt(d?.[2]) >= 200 && parseInt(d?.[2]) < 300) {
                    setBanners(d[0])
                } else {
                    Notifier('danger', 'خطا در دریافت بنر ها')
                }
            });
    }

    const get_product_groups= async ()=>{
        const data = await Simple_get('https://hitmug.ir/api/product-group/index', true
            , '', cookie.token, 'get', [])
            .then((d) => {
                if (parseInt(d?.[2]) >= 200 && parseInt(d?.[2]) < 300) {
                    setProductGroups(d[0])
                } else {
                    Notifier('danger', 'خطا در دریافت گروه محصولات')
                }
            });
    }

    const get_product_categories= async ()=>{
        const data = await Simple_get('https://hitmug.ir/api/product-category/index', true
            , '', cookie.token, 'get', [])
            .then((d) => {
                if (parseInt(d?.[2]) >= 200 && parseInt(d?.[2]) < 300) {
                    setProductCategories(d[0])
                } else {
                    Notifier('danger', 'خطا در دریافت دسته بندی ها')
                }
            });
    }

    const get_product_brands= async ()=>{
        const data = await Simple_get('https://hitmug.ir/api/brand/index', true
            , '', cookie.token, 'get', [])
            .then((d) => {
                if (parseInt(d?.[2]) >= 200 && parseInt(d?.[2]) < 300) {
                    setProductBrands(d[0])
                } else {
                    Notifier('danger', 'خطا در دریافت برند ها')
                }
            });
    }

    const get_product_options= async ()=>{
        const data = await Simple_get('https://hitmug.ir/api/option/index', true
            , '', cookie.token, 'get', [])
            .then((d) => {
                if (parseInt(d?.[2]) >= 200 && parseInt(d?.[2]) < 300) {
                    setProductOptions(d[0])
                } else {
                    Notifier('danger', 'خطا در دریافت آپشن ها')
                }
            });
    }


    const inc_order = (id)=>{
        Simple_get('https://hitmug.ir/api/banner/inc-order/' ,true ,id , cookie.token , 'post' ,[])
            .then((d)=>{
                if (parseInt(d?.[2]) >= 200 && parseInt(d?.[2]) < 300) {
                    change_refresh_banners()
                } else {
                    Notifier('danger', 'خطا در افزایش اولویت')
                }
            })
    }

    const inc_product_group = (id)=>{
        Simple_get('https://hitmug.ir/api/product-group/inc/' ,true ,id , cookie.token , 'post' ,[])
            .then((d)=>{
                if (parseInt(d?.[2]) >= 200 && parseInt(d?.[2]) < 300) {
                    change_refresh_product_groups()
                } else {
                    Notifier('danger', 'خطا در افزایش اولویت')
                }
            })
    }
    const desc_order = (id)=>{
        Simple_get('https://hitmug.ir/api/banner/desc-order/' ,true ,id , cookie.token , 'post' ,[])
            .then((d)=>{
                if (parseInt(d?.[2]) >= 200 && parseInt(d?.[2]) < 300) {
                    change_refresh_banners()
                } else {
                    Notifier('danger', 'خطا در کاهش اولویت')
                }
            })
    }

    const desc_product_group = (id)=>{
        Simple_get('https://hitmug.ir/api/product-group/desc/' ,true ,id , cookie.token , 'post' ,[])
            .then((d)=>{
                if (parseInt(d?.[2]) >= 200 && parseInt(d?.[2]) < 300) {
                    change_refresh_product_groups()
                } else {
                    Notifier('danger', 'خطا در کاهش اولویت')
                }
            })
    }

    const delete_banner=(id)=>{
        Simple_get('https://hitmug.ir/api/banner/delete/', true, id, cookie.token, 'delete', [])
            .then((d) => {
                if (parseInt(d?.[2]) >= 200 && parseInt(d?.[2]) < 300) {
                    Notifier('success', 'بنر با موفقیت حذف شد');
                    change_refresh_banners();
                } else {
                    Notifier('danger', 'خطا در حذف بنر');
                }
            })
    }

    const delete_option=(id)=>{
        Simple_get('https://hitmug.ir/api/option/delete/', true, id, cookie.token, 'delete', [])
            .then((d) => {
                if (parseInt(d?.[2]) >= 200 && parseInt(d?.[2]) < 300) {
                    Notifier('success', 'آپشن با موفقیت حذف شد');
                    change_refresh_product_options();
                } else {
                    Notifier('danger', 'خطا در حذف آپشن');
                }
            })
    }

    const delete_tag=(id)=>{
        Simple_get('https://hitmug.ir/api/tag/delete/', true, id, cookie.token, 'delete', [])
            .then((d) => {
                if (parseInt(d?.[2]) >= 200 && parseInt(d?.[2]) < 300) {
                    Notifier('success', 'تگ با موفقیت حذف شد');
                    change_refresh_tags();
                } else {
                    Notifier('danger', 'خطا در حذف تگ');
                }
            })
    }

    const delete_attribute=(id)=>{
        Simple_get('https://hitmug.ir/api/attribute/delete/', true, id, cookie.token, 'delete', [])
            .then((d) => {
                if (parseInt(d?.[2]) >= 200 && parseInt(d?.[2]) < 300) {
                    Notifier('success', 'ویژگی با موفقیت حذف شد');
                    change_refresh_attributes();
                } else {
                    Notifier('danger', 'خطا در حذف ویژگی');
                }
            })
    }

    const delete_product_group=(id)=>{
        Simple_get('https://hitmug.ir/api/product-group/delete/', true, id, cookie.token, 'delete', [])
            .then((d) => {
                if (parseInt(d?.[2]) >= 200 && parseInt(d?.[2]) < 300) {
                    Notifier('success', 'گروه محصول با موفقیت حذف شد');
                    change_refresh_product_groups()
                } else {
                    Notifier('danger', 'خطا در حذف گروه محصول');
                }
            })
    }

    const delete_product_category=(id)=>{
        Simple_get('https://hitmug.ir/api/product-category/delete/', true, id, cookie.token, 'delete', [])
            .then((d) => {
                if (parseInt(d?.[2]) >= 200 && parseInt(d?.[2]) < 300) {
                    Notifier('success', 'دسته بندی با موفقیت حذف شد');
                    change_refresh_product_categories()
                } else {
                    Notifier('danger', 'خطا در حذف دسته بندی');
                }
            })
    }

    const delete_product_brand=(id)=>{
        Simple_get('https://hitmug.ir/api/brand/delete/', true, id, cookie.token, 'delete', [])
            .then((d) => {
                if (parseInt(d?.[2]) >= 200 && parseInt(d?.[2]) < 300) {
                    Notifier('success', 'برند با موفقیت حذف شد');
                    change_refresh_product_brands()
                } else {
                    Notifier('danger', 'خطا در حذف برند');
                }
            })
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
    useEffect(() => {
        lastUserId && get_user_roles(lastUserId)
    }, [refreshUserRolesData]);
    useEffect(() => {
        lastRoleId && get_role_permissions(lastRoleId)
    }, [refreshRolePermissions]);
    useEffect(() => {
        get_banners();
    }, [refreshBanners]);
    useEffect(() => {
        get_product_groups();
    }, [refreshProductGroups]);
    useEffect(() => {
        get_product_categories();
    }, [refreshProductCategories]);
    useEffect(() => {
        get_product_brands();
    }, [refreshProductBrands]);
    useEffect(() => {
        get_product_options();
    }, [refreshProductOptions]);
    useEffect(() => {
        get_tags();
    }, [refreshTags]);
    useEffect(() => {
        get_attributes();
    }, [refreshAttributes]);

    const change_user_status = async (user_id) => {

        const data = await Simple_get('https://hitmug.ir/api/user/change-status', true
            , '', cookie.token, 'post', {user_id: user_id})
            .then((d) => {
                if (parseInt(d?.[2]) >= 200 && parseInt(d?.[2]) < 300) {
                    change_refresh()
                    Notifier('success', 'وضعیت حساب بروزرسانی شد')
                } else {
                    Notifier('danger', 'خطا در بروزرسانی وضعیت حساب کاربری')
                }
            });

    }

    return (
        <div className={'ap-container'}>

            {/*define modals*/}

            {
                showToggleMenu &&
                <div className="ap-menu">

                    <div onClick={()=>setShowToggleMenu(false)} className={'ap-menu-row close'}><span>X</span></div>
                    <div onClick={() => {
                        change_menu('users');
                        setShowToggleMenu(false);
                        change_refresh();
                    }} className={`ap-menu-row ${apActiveMenu === 'users'
                    || apActiveMenu === 'user-address'
                    || apActiveMenu === 'add-user'
                    || apActiveMenu === 'edit-address'
                    || apActiveMenu === 'user-roles'
                    || apActiveMenu === 'add-address' ? 'apActive' : ''}`}>
                        <AiOutlineUser/>
                        <span>مدیریت کاربران</span>
                    </div>
                    <div onClick={() => {
                        change_menu('roles');
                        change_refresh_roles();
                        setShowToggleMenu(false);
                    }} className={`ap-menu-row 
                    ${apActiveMenu === 'roles'
                    || apActiveMenu === 'role-permissions'

                        ? 'apActive' : ''}`}>
                        <BsUniversalAccessCircle/>
                        <span>مدیریت نقش ها</span>
                    </div>
                    <div onClick={() => {
                        change_menu('permissions');
                        setShowToggleMenu(false);

                    }} className={`ap-menu-row ${apActiveMenu === 'permissions' ? 'apActive' : ''}`}>
                        <SiOpenaccess/>
                        <span>مدیریت مجوز ها</span>
                    </div>
                    <div onClick={() => {

                        change_menu('banners');
                        change_refresh_banners();
                        setShowToggleMenu(false);
                    }} className={`ap-menu-row ${apActiveMenu === 'banners' ? 'apActive' : ''}`}>
                        <GiVerticalBanner/>
                        <span>مدیریت بنر ها</span>
                    </div>
                    <div onClick={() => {
                        change_menu('categories');
                        change_refresh_product_groups();
                        setShowToggleMenu(false);
                    }} className={`ap-menu-row ${apActiveMenu === 'categories' ? 'apActive' : ''}`}>
                        <AiOutlineUngroup/>
                        <span>گروه محصولات</span>
                    </div>
                    <div onClick={() => {
                        change_menu('product-categories');
                        change_refresh_product_categories();
                        setShowToggleMenu(false);
                    }} className={`ap-menu-row ${apActiveMenu === 'product-categories' ? 'apActive' : ''}`}>
                        <TbCategory/>
                        <span>دسته بندی ها</span>
                    </div>
                    <div onClick={() => {
                        change_menu('product-brands');
                        change_refresh_product_brands();
                        setShowToggleMenu(false);
                    }} className={`ap-menu-row ${apActiveMenu === 'product-brands' ? 'apActive' : ''}`}>
                        <TbBrandApple/>
                        <span>برند ها</span>
                    </div>

                    <div onClick={() => {
                        change_menu('product-options');
                        change_refresh_product_options();
                        setShowToggleMenu(false);
                    }} className={`ap-menu-row ${apActiveMenu === 'product-options' ? 'apActive' : ''}`}>
                        <IoOptions/>
                        <span>آپشن ها</span>
                    </div>
                    <div onClick={() => {
                        change_menu('product-tags');
                        change_refresh_tags();
                        setShowToggleMenu(false);
                    }} className={`ap-menu-row ${apActiveMenu === 'product-tags' ? 'apActive' : ''}`}>
                        <BiTagAlt/>
                        <span>تگ ها</span>
                    </div>

                    <div onClick={() => {
                        change_menu('product-attributes');
                        change_refresh_attributes();
                        setShowToggleMenu(false);
                    }} className={`ap-menu-row ${apActiveMenu === 'product-attributes' ? 'apActive' : ''}`}>
                        <MdEditAttributes/>
                        <span>ویژگی ها</span>
                    </div>

                    <div onClick={() => {
                        change_menu('products')
                        setShowToggleMenu(false);
                        navigate('/admin/product-manager');
                    }} className={`ap-menu-row ${apActiveMenu === 'products' ? 'apActive' : ''}`}>
                        <RiProductHuntFill/>
                        <span>مدیریت محصولات </span>
                    </div>
                    <div onClick={() => {
                        change_menu('discounts')
                        setShowToggleMenu(false);
                    }} className={`ap-menu-row ${apActiveMenu === 'discounts' ? 'apActive' : ''}`}>
                        <TbDiscount2/>
                        <span>مدیریت تخفیف ها </span>
                    </div>
                    <div onClick={() => {
                        change_menu('orders')
                        setShowToggleMenu(false);
                    }} className={`ap-menu-row ${apActiveMenu === 'orders' ? 'apActive' : ''}`}>
                        <BsBorderWidth/>
                        <span>مدیریت سفارشات</span>
                    </div>
                    <div onClick={() => {
                        change_menu('comments')
                        setShowToggleMenu(false);
                    }} className={`ap-menu-row ${apActiveMenu === 'comments' ? 'apActive' : ''}`}>
                        <AiOutlineComment/>
                        <span>مدیریت کامنت ها</span>
                    </div>
                    <div onClick={() => {
                        change_menu('finance')
                        setShowToggleMenu(false);
                    }} className={`ap-menu-row ${apActiveMenu === 'finance' ? 'apActive' : ''}`}>
                        <GiMoneyStack/>
                        <span>مدیریت مالی</span>
                    </div>
                    <div onClick={() => {
                        change_menu('reports')
                        setShowToggleMenu(false);
                    }} className={`ap-menu-row ${apActiveMenu === 'reports' ? 'apActive' : ''}`}>
                        <HiOutlineDocumentReport/>
                        <span>گزارشات</span>
                    </div>

                </div>
            }

            <div className="ap-view">
                <span onClick={()=>setShowToggleMenu(true)} className={'toggle-btn'}>منو</span>
                {
                    apActiveMenu === 'users' &&
                    <>
                        <DataGrid
                            grid_title={'کاربران'}
                            action_title={'افزودن کاربر'}
                            action_function={() => navigate('/admin/add-user')}
                            action_function_argument={'add-user'}
                            have_action={true}
                            headers={users_headers}
                            data={users}
                            reload={change_refresh}
                            field_names={users_field_names}
                            buttons={users_buttons}
                            additional_id_setter={(e) => {
                                setLastUserId(e)
                            }}
                        />
                    </>
                }

                {

                    apActiveMenu === 'user-roles' &&
                    <>

                        <DataGrid
                            grid_title={'نقش های کاربری'}
                            action_title={'افزودن نقش'}
                            action_function={() => {
                                lastUserId && navigate('/admin/add-user-role/' + lastUserId)
                            }}
                            action_function_argument={''}
                            have_action={true}
                            headers={user_roles_headers}
                            data={userRoles}
                            reload={change_refresh_user_roles}
                            field_names={user_roles_field_names}
                            buttons={user_roles_buttons}
                            additional_id_setter={(e) => {
                                setLastRoleId(e)
                            }}
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
                            action_function={() => navigate('/admin/add-role')}
                            headers={roles_headers}
                            data={roles}
                            reload={change_refresh_roles}
                            field_names={roles_field_names}
                            buttons={roles_buttons}
                            additional_id_setter={(e) => {
                                setLastRoleId(e)
                            }}
                        />
                    </>
                }
                {
                    apActiveMenu === 'role-permissions' &&
                    <>

                        <DataGrid
                            grid_title={'دسترسی های نقش'}
                            action_title={'افزودن دسترسی'}
                            have_action={true}
                            action_function={() => {
                                lastRoleId && navigate('/admin/add-role-permission/' + lastRoleId)
                            }}
                            headers={role_permissions_headers}
                            data={rolePermissions}
                            reload={change_refresh_role_permissions}
                            field_names={role_permissions_field_names}
                            buttons={role_permissions_buttons}
                            additional_id_setter=''
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
                            action_function={() => {
                                navigate('/admin/add-permission');
                            }}
                            headers={permission_headers}
                            data={permissions}
                            reload={change_refresh_permissions}
                            field_names={permission_field_names}
                            buttons={permission_buttons}
                            additional_id_setter={(e)=>setLastPermissionId(e)}
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
                            action_function={(e) => {
                                change_menu(e)
                            }}
                            action_function_argument='add-address'
                            field_names={user_address_field_names}
                            buttons={user_address_buttons}
                            reload={change_refresh_user_address}
                            additional_id_setter=''
                        />
                    </>
                }
                {
                    (apActiveMenu === 'add-user' || apActiveMenu === 'edit-user') &&
                    <>

                    </>
                }
                {
                    (apActiveMenu === 'add-address' || apActiveMenu === 'edit-address') &&
                    <>
                        <AddAddress
                            mode={apActiveMenu === 'add-address' ? 'create' : 'edit'}
                            fields={[
                                'id', 'state', 'city', 'title'
                            ]}
                        />
                    </>
                }
                {
                    apActiveMenu === 'banners' &&
                    <>
                        <DataGrid
                            grid_title={'بنر های سایت'}
                            data={banners}
                            have_action={true}
                            headers={banners_headers}
                            action_title={'افزودن بنر'}
                            action_function={()=>{navigate('/admin/add-banner')}}
                            action_function_argument=''
                            field_names={banners_field_names}
                            buttons={banners_buttons}
                            reload={change_refresh_banners}
                            additional_id_setter=''
                        />
                    </>
                }
                {
                    apActiveMenu === 'categories' &&
                    <>
                        <DataGrid
                            grid_title={'گروه های محصول'}
                            data={productGroups}
                            have_action={true}
                            headers={product_group_headers}
                            action_title={'افزودن گروه محصول'}
                            action_function={()=>{navigate('/admin/add-product-group')}}
                            action_function_argument=''
                            field_names={product_group_field_names}
                            buttons={product_group_buttons}
                            reload={change_refresh_product_groups}
                            additional_id_setter={(e) => {
                            setLastProductGroupId(e)
                        }}
                        />
                    </>
                }
                {
                    apActiveMenu === 'product-categories' &&
                    <>
                        <DataGrid
                            grid_title={'دسته بندی ها'}
                            data={productCategories}
                            have_action={true}
                            headers={product_category_headers}
                            action_title={'افزودن دسته بندی'}
                            action_function={()=>{navigate('/admin/add-product-category')}}
                            action_function_argument=''
                            field_names={product_category_field_names}
                            buttons={product_category_buttons}
                            reload={change_refresh_product_categories}
                            additional_id_setter={(e)=>setLastProductCategoryId(e)}
                        />
                    </>
                }
                {
                    apActiveMenu === 'product-brands' &&
                    <>
                        <DataGrid
                            grid_title={'برند ها'}
                            data={productBrands}
                            have_action={true}
                            headers={product_brands_headers}
                            action_title={'افزودن برند'}
                            action_function={()=>{navigate('/admin/add-product-brand')}}
                            action_function_argument=''
                            field_names={product_brands_field_names}
                            buttons={product_brands_buttons}
                            reload={change_refresh_product_brands}
                            additional_id_setter={(e)=>{setLastBrandId(e)}}
                        />
                    </>
                }
                {
                    apActiveMenu === 'product-options' &&
                    <>
                        <DataGrid
                            grid_title={'آپشن ها'}
                            data={productOptions}
                            have_action={true}
                            headers={product_options_headers}
                            action_title={'افزودن آپشن'}
                            action_function={()=>{navigate('/admin/add-option')}}
                            action_function_argument=''
                            field_names={product_options_field_names}
                            buttons={product_options_buttons}
                            reload={change_refresh_product_options}
                            additional_id_setter={(e)=>{setLastOptionId(e)}}
                        />
                    </>
                }

                {
                    apActiveMenu === 'product-tags' &&
                    <>
                        <DataGrid
                            grid_title={'تگ ها'}
                            data={tags}
                            have_action={true}
                            headers={tag_headers}
                            action_title={'افزودن تگ'}
                            action_function={()=>{navigate('/admin/add-tag')}}
                            action_function_argument=''
                            field_names={tag_field_names}
                            buttons={tag_buttons}
                            reload={change_refresh_tags}
                            additional_id_setter={(e)=>{setLastTagId(e)}}
                        />
                    </>
                }
                {
                    apActiveMenu === 'product-attributes' &&
                    <>
                        <DataGrid
                            grid_title={'ویژگی ها'}
                            data={attributes}
                            have_action={true}
                            headers={attribute_headers}
                            action_title={'افزودن ویژگی'}
                            action_function={()=>{navigate('/admin/add-attribute')}}
                            action_function_argument=''
                            field_names={attribute_field_names}
                            buttons={attribute_buttons}
                            reload={change_refresh_attributes}
                            additional_id_setter={(e)=>{setLastAttributeId(e)}}
                        />
                    </>
                }
            </div>
        </div>
    )
}

export default AdminPanel;