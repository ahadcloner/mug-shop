import React, {useEffect, useState} from "react";
import './AddUser.css';
import {useCookies} from "react-cookie";
import axios from "axios";
import PersianDatePicker from "../PersianDatePicker";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";

function AddUser({mode, fields, value, value_setter,reload ,change_menue}) {
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
    const [selectedDate ,setSelectedDate] = useState(new Date().toLocaleDateString('fa-IR'));

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

    const get_states = async () => {
        const config = {
            method: 'get',
            url: 'https://hitmug.ir/api/state/index',
            headers: {
                authorization: 'Bearer ' + cookie.token
            }
        }
        await axios.request(config)
            .then((res) => {
                // console.log(res.data.data)
                setStates(res.data.data)

            })
            .catch((err) => {
                console.log(err)
            })
    }

    const get_cities = async (id) => {
        const config = {
            method: 'get',
            url: 'https://hitmug.ir/api/state/cities/' + states[id].id,
            headers: {
                authorization: 'Bearer ' + cookie.token
            }
        }
        await axios.request(config)
            .then((res) => {
                setCities(res.data.data)
            })
            .catch((err) => console.log(err))
    }

    const submitForm = async () => {
        console.log('>>>>>>',selectedStatus)
        const config = {
            method: 'post',
            url: 'https://hitmug.ir/api/user/register',
            data: {
                'email': value.email,
                'password': value.password,
                'birth_date':selectedDate.format?.(),
                'mobile': value.mobile,
                'full_name':value.full_name,
                'city_id': cities[selectedCity]['id'],
                'status':!selectedStatus

            }
        }
        await axios.request(config)
            .then((res) => {
                notify_success(res['data']['message'])
                reload();
                change_menue('users');
            })
            .catch((err) =>{
                let status = parseInt(err['response']['status']);
                const errors = err['response']['data']['errors'];
                if(errors['email'])
                {
                    errors['email'].map((e)=>{
                        notify_danger(e)
                    })
                }
                if(errors['password'])
                {
                    errors['password'].map((e)=>{
                        notify_danger(e)
                    })
                }

                notify_danger(errors['password'][0])
            })
    }


useEffect(() => {
    get_states().then()
}, [])

useEffect(() => {
    get_cities(selectedState).then()
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
                        date_setter ={setSelectedDate}
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
                            states.map((s) => {
                                return <option key={s.id}>{s.name}</option>
                            })}
                    </select>
                </div>
                <div className="aufbr-child">
                    <span>شهر</span>
                    <select onLoad={()=>{setSelectedCity(0)}} onChange={(e) => {
                        setSelectedCity(e.target.selectedIndex)

                    }}>
                        {
                            cities.map((c) => {
                                return <option key={c.id}>{c.name}</option>
                            })}
                    </select>
                </div>
            </div>
            <div className="aufb-row align-right">
                <div className="aufbr-child">
                    <span>وضعیت</span>
                    <select onChange={(e)=>{
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