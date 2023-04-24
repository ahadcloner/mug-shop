import React from "react";
import '../assets/styles/UserArea.css';
import { FaUserTie } from "react-icons/fa";
import { ImExit } from "react-icons/im";
import {useContext} from "react";
import {UaContext} from "./SideBarContext";
import { useNavigate } from "react-router-dom";
function UserArea(){
    const {UaClass,setUaClass} =useContext(UaContext);
    const navigate = useNavigate();
    return(
        <div className={`ua-container ${UaClass}`}>
            <div className="ua-item">
                <FaUserTie/>
                <span onClick={()=>navigate('/profile/info')}>مشاهده پروفایل</span>
            </div>
            <div className="ua-item">
                <ImExit/>
                <span>خروج</span>
            </div>
        </div>
    )
}
export default UserArea;