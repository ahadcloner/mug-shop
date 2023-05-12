import React, {useEffect, useState} from "react";
import './AddUser.css';
import {useCookies} from "react-cookie";
import axios from "axios";
import PersianDatePicker from "../PersianDatePicker";
import {toast} from "react-toastify";
import {useNavigate, useParams} from "react-router-dom";
import {Simple_get} from '../Utils/RequstSender';
import {Notifier} from "../Utils/Notifier";

function EditUser() {
    const navigate = useNavigate();
    const [cookie, setCookie, removeCookie] = useCookies(['token']);
    const [states, setStates] = useState([]);
    const [selectedState, setSelectedState] = useState();
    const [cities, setCities] = useState([]);
    const [selectedCity, setSelectedCity] = useState();
    const [selectedStatus, setSelectedStatus] = useState(false);
    const [selectedDate, setSelectedDate] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [mobile, setMobile] = useState();
    const [fullName, setFullName] = useState();
    const id = useParams();
    const [user, setUser] = useState();


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
        if(id){
            const data =
                await Simple_get('https://hitmug.ir/api/state/cities',
                    true, '/' + id, cookie.token, 'get', []).then((d) => {
                    if (parseInt(d?.[2]) >= 200 && parseInt(d?.[2]) < 300) {
                        setCities(d?.[0])
                    } else {
                        Notifier('danger', 'خطا در دریافت لیست شهر ها')
                    }
                });
        }
    }
    const submitForm = async () => {
        let dataObj = {
            'email': email,
            'password': password,
            'birth_date': selectedDate ? selectedDate.format?.():'',
            'mobile': mobile,
            'full_name': fullName,
            'city_id': selectedCity,
            'status': selectedStatus
        }
        let data =
            await Simple_get('https://hitmug.ir/api/user/update/', true, user?.id, cookie.token, 'patch', {...dataObj})
                .then((d => {
                        if (parseInt(d?.[2]) >= 200 && parseInt(d?.[2]) < 300) {
                            Notifier('success','تغییرات با موفقیت اانجام شد');
                            navigate('/admin')

                        } else {
                            if (d[0].response.data.errors?.email) Notifier('danger', d[0].response.data.errors.email[0])
                            if (d[0].response.data.errors?.password) Notifier('danger', d[0].response.data.errors.password[0])
                        }
                    })
                )
    }

    const get_user = async () => {
        const data = await Simple_get('https://hitmug.ir/api/user/find', true, '/' + id.id, cookie.token, 'get', [])
            .then((d) => {
                if (parseInt(d?.[2]) >= 200 && parseInt(d?.[2]) < 300) {
                    const user = d?.[0];
                    setUser(d?.[0]);
                    setSelectedCity(user.city_id);
                    setSelectedStatus(user.status);
                    setSelectedDate(new Date (user.birth_date).toLocaleDateString('fa-IR'));
                    setEmail(user.email);
                    setPassword(user.password);
                    setFullName(user.full_name);
                    setMobile(user.mobile);
                } else {
                    Notifier('danger', 'خطا در دریافت اطلاعات کاربر');
                }
            });
    }


    useEffect(() => {
            get_user();

    }, [id.id]);

    useEffect(()=>{
        get_states().then(()=>{
            setSelectedState(user?.city?.state?.id)
        })
    },[user]);

    useEffect(() => {
        get_cities(user?.city.state?.id).then(()=>{
            setSelectedCity(user?.city?.id);
        })
    }, [selectedState])

    useEffect(() => {
        let combo = document.querySelector('#state-combo');
        let childs = Array.from(combo.children);
        childs.forEach((item, index) => {
            if (parseInt(item.id) === parseInt(user?.city?.state?.id)) {
                combo.selectedIndex = index;
                setSelectedState(parseInt(item.id));
            }
        });
    }, [states]);

    useEffect(() => {
        let combo = document.querySelector('#city-combo');
        let childs = Array.from(combo.children);
        childs.forEach((item, index) => {
            if (parseInt(item.id) === parseInt(user?.city?.id)) {
                combo.selectedIndex = index;
                setSelectedCity(parseInt(item.id));
            }
        });
    }, [selectedCity]);

    return (
        <div className={'add-user-form'}>
            <div className="auf-top">
                <span>ویرایش کاربر </span>
            </div>
            <div className="auf-bottom">
                <div className="aufb-row">
                    <div className="aufbr-child">
                        <span>ایمیل</span>
                        <input name={'email'} type={"text"}
                               onChange={(e) => {
                                   // setEmail(e.target.value);
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
                        <select id={'state-combo'} onChange={(e) => {
                            setSelectedState(e.target.selectedOptions[0].id);
                        }}>
                            {
                                states?.map((s) => {
                                    return <option id={s.id} key={s.id}>{s.name}</option>
                                })}
                        </select>
                    </div>
                    <div className="aufbr-child">
                        <span>شهر</span>
                        <select id={'city-combo'}
                         onChange={(e) => {
                            setSelectedCity(e.target.selectedOptions[0].id)

                        }}>
                            {
                                cities?.map((c) => {
                                    return <option id={c.id} key={c.id}>{c.name}</option>
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
            <button onClick={() => submitForm()} className={'add-user-button'}>ثبت اطلاعات</button>
        </div>
    )
}

export default EditUser;