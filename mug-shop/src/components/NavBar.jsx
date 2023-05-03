import React, {useEffect, useState} from "react";
import '../assets/styles/NavBar.css'
import {RxHamburgerMenu} from "react-icons/rx";
import {AiOutlineHeart} from "react-icons/ai";
import {BiSearchAlt} from "react-icons/bi";
import {SlBasket} from "react-icons/sl";
import {VscTriangleDown} from "react-icons/vsc";
import {UaContext, SbContext} from "./SideBarContext";
import {useContext} from "react";
import {useNavigate} from "react-router-dom";
import {useCookies} from "react-cookie";
import {ImExit} from "react-icons/im";
import {FaUserTie} from "react-icons/fa";
import {IoMdLogIn} from "react-icons/io";
import axios from "axios";
import {toast} from "react-toastify";


function NavBar() {
    const navigate = useNavigate();
    const {sideBarStatus, setSideBarStatus} = useContext(SbContext);
    const {UaClass, setUaClass} = useContext(UaContext);
    const [cookie, setCookie, removeCookie] = useCookies(['token']);

    const [inputOp, setInputOp] = useState(0);
    const notify_success = (message) => toast.success(message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
    });
    const handleClick = () => {
        setSideBarStatus(sideBarStatus === 'sb-hide' ? '' : 'sb-hide');
    }
    const changeOp = () => {
        setInputOp(1 - inputOp);
    }
    const handleUserArea = () => {
        setUaClass(UaClass === 'ua-hide' ? 'ua-show' : 'ua-hide');
    }
    const call_logout = () => {
        let data = new FormData();
        data.append('token', cookie.token);
        var config = {
            method: 'post',
            url: 'https://hitmug.ir/api/user/logout',
            headers: {
                'Authorization': 'Bearer ' + cookie.token,
            },
            data: data
        };
        axios(config).then((res) => {
            console.log(res);
            notify_success(res['data']['message']);
            removeCookie('token');
            navigate('/');
        }).catch((er) => {
            console.log(er)
        })
    }
    useEffect(()=>{

    },[cookie.token])
    return (
        <nav className={'nb-container'}>
            <div className={'nb-right'}>
                <div className={'nb-humber'}>
                    <RxHamburgerMenu className={sideBarStatus === 'sb-hide' ? '' : 'rotated'} onClick={handleClick}/>
                </div>
                <div className={'nb-search'}>
                    <input style={{opacity: `${inputOp}`}} type={"text"} placeholder={"جستجو کنید"}/>
                    <BiSearchAlt onClick={changeOp}/>
                </div>
            </div>
            <div className={'nb-center'}>
                <h2 onClick={() => navigate('/')}>فروشگاه ماگ شاپ</h2>
            </div>
            <div className={'nb-left'}>
                <div onClick={handleUserArea} className={'nb-user-area'}>
                    {
                        cookie.token &&
                        <>
                            <span className={'large-screen'}>احد میرحبیبی</span>
                            <VscTriangleDown className={'large-screen'}/>
                        </>

                    }
                    {
                        !cookie.token &&
                        <>
                            <span className={'large-screen'} onClick={() => {
                                navigate('/login/login')
                            }}>ورود به حساب</span>
                            <IoMdLogIn onClick={() => {
                                navigate('/login/login')
                            }} className={'small-screen'}/>
                        </>
                    }

                </div>
                <div className={'nb-icons'}>
                    <SlBasket onClick={() => navigate('/cart')}/>
                    {cookie.token && <AiOutlineHeart onClick={() => navigate('/profile/favorite')}/>}
                    {cookie.token && <FaUserTie onClick={()=>{handleUserArea()}} className={'small-screen'}/>}

                </div>
            </div>
        </nav>
    )
}

export default NavBar;