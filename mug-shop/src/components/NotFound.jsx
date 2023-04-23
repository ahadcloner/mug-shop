import React from "react";
import '../assets/styles/NotFound.css';
import {useNavigate} from "react-router-dom";

function NotFound(){
    const navigate = useNavigate();
    return(
        <div className={'nf-container'}>
            <div className="message-container">
                <div className="message">
                    <span>متاسفانه چنین صفحه ای وجود ندارد</span>
                    <button onClick={()=> navigate('/')}>ورود به صفحه اصلی سایت</button>
                </div>
            </div>
        </div>
    )
}
export default NotFound;