import React from "react";
import '../assets/styles/Login.css';
import { ImMug } from "react-icons/im";

function Login(){
    return(
        <div className={'login-container hero'}>
            <form className={'login-form'}>
                <div className="login-top">
                    <span className={'hero title'}>ورود به حساب کاربری</span>
                </div>
                <div className="login-mid">
                    <div className="login-row">
                        <span>نام کاربری</span>
                        <input type={"text"} placeholder={'نام کاربری خود را وارد کنید'}/>
                    </div>
                    <div className="login-row">
                        <span>رمز عبور</span>
                        <input className={'dir-left'} type={"password"} placeholder={'رمز عبور خود را وارد کنید'}/>
                    </div>

                </div>
                <div className="login-action">
                    <button>ورود</button>
                </div>
                <div className="login-link">
                    <span>فراموشی رمز عبور</span>
                </div>
            </form>
        < ImMug className={'cube'}/>
        < ImMug className={'cube'}/>
        < ImMug className={'cube'}/>
        < ImMug className={'cube'}/>
        < ImMug className={'cube'}/>
        < ImMug className={'cube'}/>

        </div>

    )
}
export default Login;