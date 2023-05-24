import React, {useEffect, useState} from "react";
import './AddUser.css';
import {useCookies} from "react-cookie";
import {useNavigate, useParams} from "react-router-dom";
import {Simple_get} from '../Utils/RequstSender';
import {Notifier} from "../Utils/Notifier";

function AddOoption() {
    const navigate = useNavigate();
    const [cookie, setCookie, removeCookie] = useCookies(['token']);
    const [name , setName]=useState();
    const [description , setDescription]=useState();
    const [price , setPrice]=useState(0);

    const submitForm = async () => {
        let dataObj = {
            'name': name,
            'description':description,
            'price':price
        }
        let data =
            await Simple_get('https://hitmug.ir/api/option/create', true, '', cookie.token, 'post', {...dataObj})
                .then((d => {
                        if (parseInt(d?.[2]) >= 200 && parseInt(d?.[2]) < 300) {
                            Notifier('success', 'آپشن جدید با موفقیت ساخته شد');
                            navigate('/admin');
                        } else {
                            if (d[0].response.data.errors?.name) Notifier('danger', d[0].response.data.errors.name[0])
                            if (d[0].response.data.errors?.description) Notifier('danger', d[0].response.data.errors.description[0])
                            if (d[0].response.data.errors?.price) Notifier('danger', d[0].response.data.errors.price[0])
                        }
                    })
                )
    }


    return (
        <div className={'add-user-form add-role-form'}>
            <div className="auf-top">
                <span>افزودن آپشن </span>
            </div>
            <div className="auf-bottom">
                <div className="aufb-row align-right">
                    <div className="aufbr-child align-right">
                        <span>نام آپشن</span>
                        <input name={'email'} type={"text"}
                               onChange={(e) => {
                                   setName(e.target.value);
                               }} value={name}
                        />
                    </div>
                    <div className="aufbr-child">
                        <span>توضیحات</span>
                        <input name={'email'} type={"text"}
                               onChange={(e) => {
                                   setDescription(e.target.value);
                               }} value={description}
                        />
                    </div>

                    <div className="aufbr-child">
                        <span>هزینه</span>
                        <input name={'email'} type={"number"} min={0}
                               onChange={(e) => {
                                   setPrice(e.target.value);
                               }} value={price}
                        />
                    </div>
                </div>

                <button onClick={() => submitForm()} className={'add-user-button'}>ثبت آپشن </button>
            </div>
        </div>
    )
}

export default AddOoption;