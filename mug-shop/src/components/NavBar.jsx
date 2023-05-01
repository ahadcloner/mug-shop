import React, {useState} from "react";
import '../assets/styles/NavBar.css'
import { RxHamburgerMenu } from "react-icons/rx";
import { AiOutlineHeart } from "react-icons/ai";
import { BiSearchAlt } from "react-icons/bi";
import { SlBasket } from "react-icons/sl";
import { VscTriangleDown } from "react-icons/vsc";
import {UaContext,SbContext} from "./SideBarContext";
import {useContext} from "react";
import { useNavigate } from "react-router-dom";
import {useCookies} from "react-cookie";



function NavBar(){
    const navigate = useNavigate();
    const {sideBarStatus,setSideBarStatus} = useContext(SbContext);
    const {UaClass,setUaClass} = useContext(UaContext);
    const [cookie, setCookie, removeCookie] = useCookies(['token']);

    const [inputOp,setInputOp] = useState(0);
    const handleClick=()=>{
        setSideBarStatus(sideBarStatus==='sb-hide'?'':'sb-hide');
    }
    const changeOp = ()=>{
        setInputOp(1-inputOp);
    }
    const handleUserArea = ()=>{
        setUaClass(UaClass === 'ua-hide'?'ua-show':'ua-hide');
    }
    return(
        <nav className={'nb-container'}>
            <div className={ 'nb-right'}>
                <div className={'nb-humber'}>
                    <RxHamburgerMenu className={sideBarStatus==='sb-hide'?'':'rotated'} onClick={handleClick}/>
                </div>
                <div className={'nb-search'}>
                    <input  style={{opacity:`${inputOp}`}} type={"text"} placeholder={"جستجو کنید"}/>
                    <BiSearchAlt onClick={changeOp}/>
                </div>
            </div>
            <div className={ 'nb-center'}>
                <h2 onClick={()=>navigate('/')}>فروشگاه ماگ شاپ</h2>
            </div>
            <div className={ 'nb-left'}>
                <div onClick={handleUserArea} className={'nb-user-area'}>
                    {
                        cookie.token &&
                        <>
                            <span>احد میرحبیبی</span>
                            <VscTriangleDown/>
                        </>

                    }
                    {
                        !cookie.token &&
                        <span onClick={()=>{navigate('/login/login')}}>ورود به حساب</span>
                    }

                </div>
                <div className={'nb-icons'}>
                    <SlBasket onClick={()=>navigate('/cart')}/>
                    <AiOutlineHeart onClick={()=>navigate('/profile/favorite')}/>
                </div>
            </div>
        </nav>
    )
}
export default NavBar;