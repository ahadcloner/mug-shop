import React, {useEffect, useState} from "react";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../assets/styles/Login.css';
import {ImMug} from "react-icons/im";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import {useCookies} from "react-cookie";



function Login() {
    const [cookie, setCookie, removeCookie] = useCookies(['token']);
    const section = useParams();
    const [pageState, setPageState] = useState(section.section);
    const [confirmMode, setConfirmMode] = useState('');
    const [registerEmail, setRegisterEmail] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');
    const [registerPasswordConfirm, setRegisterPasswordConfirm] = useState('');
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const navigate = useNavigate();

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
    const notify_danger = (message) => toast.error(message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
    });
    useEffect(()=>{

        if(cookie.token ){
            navigate('/')
        }
    },[cookie.token])
    const call_register = async (e) => {
        e.preventDefault();
        if (registerPassword === registerPasswordConfirm) {
            var bodyFormData = new FormData();
            bodyFormData.append('email', registerEmail);
            bodyFormData.append('password', registerPassword);
            let api = await axios({
                method: "post",
                url: "https://hitmug.ir/api/user/register",
                data: bodyFormData,
                headers: {"Content-Type": "multipart/form-data"},
            })
                .then(function (response) {
                    notify_success(response['data']['message'])
                    setConfirmMode('register');
                    setPageState('confirm');
                })
                .catch(function (response) {
                    let status = parseInt(response['response']['status']);
                    const errors = response['response']['data']['errors'];
                    notify_danger(errors['email'][0])
                    notify_danger(errors['password'][0])
                });
        } else {
            notify_danger('رمز عبور با تکرار رمز عبور مطابقت ندارد')
        }


    }
    const call_login = async (e) => {
        e.preventDefault();





        const data = new FormData();
        data.append('email', loginEmail);
        data.append('password', loginPassword);
        let api = await axios.post('https://hitmug.ir/api/user/login', data)
            .then((response) => {
                notify_success(response['data']['message']);
                let token = response['data']['token'];
                console.log(token)
                setCookie('token' , token);
            })
            .catch((response) => {
                // console.log(response);
                const errors = response['response']['data']['errors'];


                    try {
                        notify_danger(errors['password'][0])
                    }catch (e){}
                    try {
                        notify_danger(errors['email'][0])
                    }catch (e){}
                    try {
                        notify_danger(response['response']['data']['message'])
                    }
                    catch (e){}




            })

    }


    useEffect(() => {
        setPageState(section.section)
    }, [section])
    return (
        <div className={'login-container hero'}>
            {
                pageState === 'login' &&
                <form className={'login-form'}>
                    <div className="login-top">
                        <span className={'hero title'}>ورود به حساب کاربری</span>
                    </div>
                    <div className="login-mid">
                        <div className="login-row">
                            <span>ایمیل</span>
                            <input name={'email'} type={"text"} placeholder={'ایمیل خود را وارد کنید'}
                                   value={loginEmail}
                                   onChange={(e) => {
                                       setLoginEmail(e.target.value)
                                   }}
                            />
                        </div>
                        <div className="login-row">
                            <span>رمز عبور</span>
                            <input name={'password'} className={'dir-left'} type={"password"}
                                   placeholder={'رمز عبور خود را وارد کنید'}
                                   value={loginPassword}
                                   onChange={(e) => {
                                       setLoginPassword(e.target.value)
                                   }}
                            />
                        </div>

                    </div>
                    <div className="login-action">
                        <button type={"submit"} onClick={call_login}>ورود</button>
                    </div>
                    <span onClick={() => setPageState('forget')} className={'forget-link'}>
                    فراموشی رمز عبور
                </span>
                    <span onClick={() => setPageState('register')} className={'register-link'}>
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
                        <button onClick={() => {
                            setConfirmMode('forget');
                            setPageState('confirm');
                        }}>باز نشانی رمز عبور
                        </button>
                    </div>
                </form>
            }
            {
                pageState === 'confirm' &&
                <form className={'confirm-form'}>
                    <div className="confirm-top">
                        <span
                            className={'title'}>{confirmMode === 'register' ? 'تکمیل ثبت نام' : 'بازنشانی رمز عبور'}</span>
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
                <form className={'register-form'} onSubmit={call_register}>
                    <div className="register-top">
                        <span className={'title'}>ثبت نام در ماگ شاپ</span>
                    </div>
                    <div className="register-mid">
                        <div className="register-row">
                            <span>ایمیل</span>
                            <input value={registerEmail}
                                   onChange={(e) => {
                                       setRegisterEmail(e.target.value)
                                   }}
                                   name={'email'}
                                   type={"text"}
                                   placeholder={'ایمیل خود را وارد کنید'}
                            />
                        </div>
                        <div className="register-row">
                            <span>رمز عبور</span>
                            <input name={'password'} className={'dir-left'} type={"password"}
                                   placeholder={'رمز عبور خود را وارد کنید'}
                                   value={registerPassword}
                                   onChange={(e) => {
                                       setRegisterPassword(e.target.value)
                                   }}
                            />
                        </div>
                        <div className="register-row">
                            <span>تکرار رمز عبور</span>
                            <input className={'dir-left'} type={"password"}
                                   placeholder={'تکرار رمز عبور خود را وارد کنید'}
                                   value={registerPasswordConfirm}
                                   onChange={(e) => {
                                       setRegisterPasswordConfirm(e.target.value)
                                   }}

                            />

                        </div>

                    </div>
                    <div className="register-action">
                        <button type="submit"
                            //         onClick={() => {
                            //     setConfirmMode('register');
                            //     setPageState('confirm');
                            // }
                            // }
                        >ثبت نام
                        </button>
                    </div>
                    <span onClick={() => setPageState('login')} className={'register-link'}>
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