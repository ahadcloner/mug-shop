import React, {useEffect, useState} from "react";
import '../assets/styles/Login.css';
import { ImMug } from "react-icons/im";
import {useParams} from "react-router-dom";

function Login(){
    const section = useParams();
    const [pageState ,setPageState] =useState(section.section);
    const [confirmMode ,setConfirmMode] =useState('register');
    useEffect((
    )=>{
        setPageState(section.section)
    } ,[section] )
    return(
        <div className={'login-container hero'}>
            {
                pageState ==='login' &&
                <form className={'login-form'}>
                    <div className="login-top">
                        <span className={'hero title'}>ورود به حساب کاربری</span>
                    </div>
                    <div className="login-mid">
                        <div className="login-row">
                            <span>ایمیل</span>
                            <input type={"text"} placeholder={'ایمیل خود را وارد کنید'}/>
                        </div>
                        <div className="login-row">
                            <span>رمز عبور</span>
                            <input className={'dir-left'} type={"password"} placeholder={'رمز عبور خود را وارد کنید'}/>
                        </div>

                    </div>
                    <div className="login-action">
                        <button>ورود</button>
                    </div>
                    <span onClick={()=>setPageState('forget')} className={'forget-link'}>
                    فراموشی رمز عبور
                </span>
                    <span onClick={()=>setPageState('register')} className={'register-link'}>
                   ثبت نام در ماگ شاپ
                </span>
                </form>
            }
            {
                pageState === 'forget' &&
                <form className={'forget-form'}>
                    <div className="forget-top">
                        <span className={'title'}>فراموشی رمز عبور</span>
                    </div>
                    <div className="forget-mid">
                        <div className="forget-row">
                            <span>ایمیل</span>
                            <input type={"text"} placeholder={'ایمیل خود را وارد کنید'}/>
                        </div>

                    </div>
                    <div className="forget-action">
                        <button onClick={()=>{
                            setConfirmMode('forget');
                            setPageState('confirm');}}>باز نشانی رمز عبور</button>
                    </div>
                </form>
            }
            {
                pageState ==='confirm' &&
                <form className={'confirm-form'}>
                    <div className="confirm-top">
                        <span className={'title'}>{confirmMode==='register'?'تکمیل ثبت نام':'بازنشانی رمز عبور'}</span>
                    </div>
                    <div className="confirm-mid">
                        <div className="confirm-row">
                            <span>کد چهار رقمی</span>
                            <input type={"text"} placeholder={'کد چهار رقمی ارسال شده به ایمیلتان را وارد کنید'}/>
                        </div>

                    </div>
                    <div className="confirm-action">
                        <button>ارسال</button>
                    </div>
                </form>
            }
            {
                pageState === 'register' &&
                <form className={'register-form'}>
                    <div className="register-top">
                        <span className={'title'}>ثبت نام در ماگ شاپ</span>
                    </div>
                    <div className="register-mid">
                        <div className="register-row">
                            <span>ایمیل</span>
                            <input type={"text"} placeholder={'ایمیل خود را وارد کنید'}/>
                        </div>
                        <div className="register-row">
                            <span>رمز عبور</span>
                            <input className={'dir-left'} type={"password"} placeholder={'رمز عبور خود را وارد کنید'}/>
                        </div>
                        <div className="register-row">
                            <span>تکرار رمز عبور</span>
                            <input className={'dir-left'} type={"password"} placeholder={'تکرار رمز عبور خود را وارد کنید'}/>
                        </div>

                    </div>
                    <div className="register-action">
                        <button onClick={()=>{
                            setConfirmMode('register');
                            setPageState('confirm');}}
                        >ثبت نام</button>
                    </div>
                    <span onClick={()=>setPageState('login')} className={'register-link'}>
                   ورود به ماگ شاپ
                </span>
                </form>

            }

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