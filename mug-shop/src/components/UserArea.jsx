import React from "react";
import '../assets/styles/UserArea.css';
import { FaUserTie } from "react-icons/fa";
import { ImExit } from "react-icons/im";
import {useContext} from "react";
import {UaContext} from "./SideBarContext";

function UserArea(){
    const {UaClass,setUaClass} =useContext(UaContext);
    return(
        <div className={`ua-container ${UaClass}`}>
            <div className="ua-item">
                <FaUserTie/>
                <span>مشاهده پروفایل</span>
            </div>
            <div className="ua-item">
                <ImExit/>
                <span>خروج</span>
            </div>
        </div>
    )
}
export default UserArea;