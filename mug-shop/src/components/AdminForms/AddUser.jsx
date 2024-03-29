import React, {useEffect, useState} from "react";
import './AddUser.css';
import {useCookies} from "react-cookie";
import axios from "axios";
import PersianDatePicker from "../PersianDatePicker";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import {Simple_get} from '../Utils/RequstSender';
import {Notifier} from "../Utils/Notifier";

function AddUser() {
    const navigate =useNavigate();
    const [cookie, setCookie, removeCookie] = useCookies(['token']);
    const [states, setStates] = useState([]);
    const [selectedState, setSelectedState] = useState(0);
    const [cities, setCities] = useState([]);
    const [selectedCity, setSelectedCity] = useState(0);
    const [selectedStatus, setSelectedStatus] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date().toLocaleDateString('fa-IR'));
    const [email , setEmail]=useState();
    const [password , setPassword]=useState();
    const [mobile , setMobile]=useState();
    const [fullName , setFullName]=useState();

    const get_states = async () => {
        const data = await Simple_get('https://hitmug.ir/api/state/index', true,
            '', cookie.token, 'get', {})
            .then((d) => {
                if (parseInt(d?.[2]) >= 200 && parseInt(d?.[2]) < 300) {
                    setStates(d[0])
                } else {
                    Notifier('danger', 'خطا در دریافت لیست استان ها')
                }
            });
    }
    const get_cities = async (id) => {
            const data =
                await Simple_get('https://hitmug.ir/api/state/cities',
                    true, '/' + states[id].id, cookie.token, 'get', {}).then((d)=>{
                    if (parseInt(d?.[2]) >= 200 && parseInt(d?.[2]) < 300) {
                        setCities(d[0])
                    } else {
                        Notifier('danger', 'خطا در دریافت لیست شهر ها')
                    }
                });
    }
    const submitForm = async () => {
        let dataObj = {
            'email': email,
            'password': password,
            'birth_date': selectedDate.format?.(),
            'mobile': mobile,
            'full_name': fullName,
            'city_id': cities[selectedCity]['id'],
            'status': !selectedStatus
        }
        let data =
            await Simple_get('https://hitmug.ir/api/user/register', true, '', cookie.token, 'post', {...dataObj})
                .then((d => {
                        if (parseInt(d?.[2]) > 200 && parseInt(d?.[2]) < 300) {
                            Notifier('success', d[1]);
                            navigate('/admin');
                        } else {
                            if (d[0].response.data.errors?.email) Notifier('danger', d[0].response.data.errors.email[0])
                            if (d[0].response.data.errors?.password) Notifier('danger', d[0].response.data.errors.password[0])
                        }
                    })
                )
    }

    useEffect(() => {
        get_states()
    }, []);

    useEffect(() => {
        get_cities(selectedState)
    }, [states, selectedState])


    return (
        <div className={'add-user-form'}>
            <div className="auf-top">
                <span>افزودن کاربر </span>
            </div>
            <div className="auf-bottom">
                <div className="aufb-row">
                    <div className="aufbr-child">
                        <span>ایمیل</span>
                        <input name={'email'} type={"text"}
                               onChange={(e) => {
                                   setEmail(e.target.value);
                               }} value={email}
                        />
                    </div>
                    <div className="aufbr-child">
                        <span>رمز عبور</span>
                        <input name={'password'} type={"text"}
                               onChange={(e) => {
                                   setPassword(e.target.value)
                               }}
                               value={password}
                        />
                    </div>
                    <div className="aufbr-child">
                        <span>نام کاربری</span>
                        <input name={'full_name'}
                               type={"text"}
                            onChange={(e) => {
                                setFullName(e.target.value)
                            }}
                            value={fullName}
                        />
                    </div>
                    <div className="aufbr-child">
                        <span>شماره تماس</span>
                        <input name={'mobile'} type={"text"}
                            onChange={(e) => {
                                setMobile(e.target.value)
                            }}
                            value={mobile}
                        />
                    </div>
                </div>

                <div className="aufb-row align-right">
                    <div className="aufbr-child">
                        <span>تاریخ تولد</span>
                        <PersianDatePicker
                            date={selectedDate}
                            date_setter={setSelectedDate}
                        />
                    </div>
                    <div className="aufbr-child">
                        <span>استان</span>
                        <select onChange={(e) => {
                            setSelectedState(e.target.selectedIndex);
                            // console.log(selectedCity,cities[selectedCity].id ,cities[selectedCity].name)
                        }}>
                            {
                                states?.map((s) => {
                                    return <option key={s.id}>{s.name}</option>
                                })}
                        </select>
                    </div>
                    <div className="aufbr-child">
                        <span>شهر</span>
                        <select onLoad={() => {
                            setSelectedCity(0)
                        }} onChange={(e) => {
                            setSelectedCity(e.target.selectedIndex)

                        }}>
                            {
                                cities?.map((c) => {
                                    return <option key={c.id}>{c.name}</option>
                                })}
                        </select>
                    </div>
                    <div className="aufbr-child">
                        <span>وضعیت</span>
                        <select onChange={(e) => {
                            setSelectedStatus(Boolean(e.target.selectedIndex))
                        }}>
                            <option>فعال</option>
                            <option>غیر فعال</option>
                        </select>
                    </div>
                </div>
            </div>
            <button onClick={() => submitForm()} className={'add-user-button'}>ثبت کاربر</button>
        </div>
    )
}

export default AddUser;