import React, {useEffect, useState} from "react";
import './AddUser.css';
import {useCookies} from "react-cookie";
import axios from "axios";
import PersianDatePicker from "../PersianDatePicker";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import {Simple_get} from '../Utils/RequstSender';
import {Notifier} from "../Utils/Notifier";

function AddUser({mode, fields, value, value_setter, reload, change_menue}) {
    const handleInputChange = (event) => {
        const {name, value} = event.target;
        value_setter((prevUser) => ({
            ...prevUser,
            [name]: value
        }));
    };

    const [cookie, setCookie, removeCookie] = useCookies(['token']);
    const [states, setStates] = useState([]);
    const [selectedState, setSelectedState] = useState(0);
    const [cities, setCities] = useState([]);
    const [selectedCity, setSelectedCity] = useState(0);
    const [selectedStatus, setSelectedStatus] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date().toLocaleDateString('fa-IR'));

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
            'email': value.email,
            'password': value.password,
            'birth_date': selectedDate.format?.(),
            'mobile': value.mobile,
            'full_name': value.full_name,
            'city_id': cities[selectedCity]['id'],
            'status': !selectedStatus
        }
        let data =
            await Simple_get('https://hitmug.ir/api/user/register', true, '', cookie.token, 'post', {...dataObj})
                .then((d => {
                        if (parseInt(d?.[2]) > 200 && parseInt(d?.[2]) < 300) {
                            Notifier('success', d[1])
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
                {mode === 'edit' ? 'ویرایش کاربر' : 'افزودن کاربر'}
            </div>
            <div className="auf-bottom">
                <div className="aufb-row">
                    <div className="aufbr-child">
                        <span>ایمیل</span>
                        <input name={'email'} type={"text"}
                               onChange={(e) => {
                                   handleInputChange(e)
                               }} value={mode === 'edit' ? fields[1] : value.email}/>
                    </div>
                    <div className="aufbr-child">
                        <span>رمز عبور</span>
                        <input name={'password'} type={"text"}
                               onChange={(e) => {
                                   handleInputChange(e)
                               }}
                               value={mode === 'edit' ? fields[2] : value.password}/>
                    </div>
                </div>
                <div className="aufb-row">
                    <div className="aufbr-child">
                        <span>نام کاربری</span>
                        <input name={'full_name'}
                               type={"text"}
                               onChange={(e) => {
                                   handleInputChange(e)
                               }}
                               value={mode === 'edit' ? fields[3] : value.fullName}/>
                    </div>
                    <div className="aufbr-child">
                        <span>شماره تماس</span>
                        <input name={'mobile'} type={"text"}
                               onChange={(e) => {
                                   handleInputChange(e)
                               }}
                               value={mode === 'edit' ? fields[4] : value.mobile}/>
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
                </div>
                <div className="aufb-row">
                    <div className="aufbr-child">
                        <span>استان</span>
                        <select onChange={(e) => {
                            setSelectedState(e.target.selectedIndex);
                            // console.log(selectedCity,cities[selectedCity].id ,cities[selectedCity].name)
                        }}>
                            {/*{mode === 'edit' && <option value=''>{fields[5]}</option>}*/}
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
                </div>
                <div className="aufb-row align-right">
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