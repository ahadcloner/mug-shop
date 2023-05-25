import React, {useEffect, useState} from "react";
import './AddUser.css';
import {useCookies} from "react-cookie";
import {useNavigate, useParams} from "react-router-dom";
import {Simple_get} from '../Utils/RequstSender';
import {Notifier} from "../Utils/Notifier";

function AddTag() {
    const navigate = useNavigate();
    const [cookie, setCookie, removeCookie] = useCookies(['token']);
    const [tag , setTag]=useState();



    const submitForm = async () => {
        let dataObj = {
            'name': tag,
        }
        let data =
            await Simple_get('https://hitmug.ir/api/tag/create', true, '', cookie.token, 'post', {...dataObj})
                .then((d => {
                        if (parseInt(d?.[2]) >= 200 && parseInt(d?.[2]) < 300) {
                            Notifier('success','عملیات با موفقیت انجام شد');
                            navigate('/admin');
                        } else {
                            if (d[0].response.data.errors?.name) Notifier('danger', d[0].response.data.errors.name[0])
                        }
                    })
                )
    }


    return (
        <div className={'add-user-form add-role-form'}>
            <div className="auf-top">
                <span>افزودن تگ </span>
            </div>
            <div className="auf-bottom">
                <div className="aufb-row align-right">
                    <div className="aufbr-child align-right">
                        <span>نام تگ</span>
                        <input name={'email'} type={"text"}
                               onChange={(e) => {
                                   setTag(e.target.value);
                               }} value={tag}
                        />
                    </div>
                </div>

                <button onClick={() => submitForm()} className={'add-user-button'}>ثبت تگ </button>
            </div>
        </div>
    )
}

export default AddTag;