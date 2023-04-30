import React from "react";
import '../assets/styles/NotFound.css';
import {useNavigate} from "react-router-dom";

function NotFound(){
    const navigate = useNavigate();
    return(
                    <div id="notfound">
                        <div className="notfound">
                            <div className="notfound-404">
                                <h1>4<span></span>4</h1>
                            </div>
                            <h2>متاسفانه چنین صفحه ای وجود ندارد</h2>
                            <p>شما می توانید از سایت ماگ شاپ ، ماگ دلخواه با طرح دلخواه خود را سفارش دهید</p>
                            <a  onClick={()=>navigate('/')}>مشاهده محصولات سایت</a>
                        </div>
                    </div>
    )
}
export default NotFound;