import React from "react";
import './AddUser.css';

function AddUser({mode, fields, value, value_setter}) {
    const handleInputChange = (event) => {
        const {name, value} = event.target;
        value_setter((prevUser) => ({
            ...prevUser,
            [name]: value
        }));
    };
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
                               onChange={(e) => {handleInputChange(e)}} value={mode === 'edit' ? fields[1] : value.email}/>
                    </div>
                    <div className="aufbr-child">
                        <span>رمز عبور</span>
                        <input name={'password'} type={"text"}
                               onChange={(e) => {handleInputChange(e)}}
                               value={mode === 'edit' ? fields[2] : value.password}/>
                    </div>
                </div>
                <div className="aufb-row">
                    <div className="aufbr-child">
                        <span>نام کاربری</span>
                        <input name={'full_name'}
                            type={"text"}
                               onChange={(e) => {handleInputChange(e)}}
                               value={mode === 'edit' ? fields[3] : value.fullName}/>
                    </div>
                    <div className="aufbr-child">
                        <span>شماره تماس</span>
                        <input name={'mobile'} type={"text"}
                               onChange={(e) => {handleInputChange(e)}}
                               value={mode === 'edit' ? fields[4] : value.mobile}/>
                    </div>
                </div>
                <div className="aufb-row">
                    <div className="aufbr-child">
                        <span>استان</span>
                        <select>
                            {mode === 'edit' && <option value=''>{fields[5]}</option>}
                            <option>کرمان</option>
                            <option>تهران</option>
                        </select>
                    </div>
                    <div className="aufbr-child">
                        <span>شهر</span>
                        <select>
                            {mode === 'edit' &&
                                <option value={mode === 'create' ? value.city_id : ''}>{fields[6]}</option>}
                            <option>کرمان</option>
                            <option>تهران</option>
                        </select>
                    </div>
                </div>
                <div className="aufb-row align-right">
                    <div className="aufbr-child">
                        <span>وضعیت</span>
                        <select value={mode === 'create' ? value.status : ''}>
                            <option>فعال</option>
                            <option>غیر فعال</option>
                        </select>
                    </div>
                </div>
            </div>
            <button className={'add-user-button'}>ثبت کاربر</button>
        </div>
    )
}

export default AddUser;