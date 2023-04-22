import React, {useState} from "react";
import '../assets/styles/NavBar.css'
import { RxHamburgerMenu } from "react-icons/rx";
import { CgBookmark } from "react-icons/cg";
import { BiSearchAlt } from "react-icons/bi";
import { SlBasket } from "react-icons/sl";
import { RiUser6Line } from "react-icons/ri";
import { VscTriangleDown } from "react-icons/vsc";
import {UaContext,SbContext} from "./SideBarContext";
import {useContext} from "react";
import { useNavigate } from "react-router-dom";



function NavBar(){
    const navigate = useNavigate();
    const {sideBarStatus,setSideBarStatus} = useContext(SbContext);
    const {UaClass,setUaClass} = useContext(UaContext);

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
                    <span>احد میرحبیبی</span>
                    <VscTriangleDown/>
                </div>
                <div className={'nb-icons'}>
                    <SlBasket onClick={()=>navigate('/cart')}/>
                    <CgBookmark onClick={()=>navigate('/profile')}/>
                </div>
            </div>
        </nav>
    )
}
export default NavBar;