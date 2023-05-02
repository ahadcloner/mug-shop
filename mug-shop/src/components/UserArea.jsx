import React, {useEffect} from "react";
import '../assets/styles/UserArea.css';
import { FaUserTie } from "react-icons/fa";
import { ImExit } from "react-icons/im";
import {useContext} from "react";
import {UaContext} from "./SideBarContext";
import { useNavigate } from "react-router-dom";
import {useCookies} from "react-cookie";
import axios from "axios";
import {toast} from "react-toastify";
function UserArea(){
    const {UaClass,setUaClass} =useContext(UaContext);
    const navigate = useNavigate();
    const [cookie, setCookie, removeCookie] = useCookies(['token']);
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
    const call_logout = ()=>{
        let data = new FormData();
        data.append('token' , cookie.token);
        var config = {
            method: 'post',
            url: 'https://hitmug.ir/api/user/logout',
            headers: {
                'Authorization': 'Bearer '+cookie.token,
            },
            data : data
        };
        axios(config).then((res)=>{
            console.log(res);
            notify_success(res['data']['message']);
            removeCookie('token');
            navigate('/');
        }).catch((er)=>{
            console.log(er)
        })
    }
    useEffect(()=>{

    },[cookie.token])

    return(
      <>
        {
            cookie.token &&
                    <div className={`ua-container ${UaClass}`}>
                        <div
                            onClick={
                                () => {
                                    navigate('/profile/info');
                                    setUaClass(UaClass === 'ua-hide' ? 'ua-show' : 'ua-hide');

                                }} className="ua-item">
                            <FaUserTie/>
                            <span>مشاهده پروفایل</span>
                        </div>
                        <div className="ua-item">
                            <ImExit/>
                            <span onClick={call_logout}>خروج</span>
                        </div>
                    </div>
        }
      </>
    )
}
export default UserArea;