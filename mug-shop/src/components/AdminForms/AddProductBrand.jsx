import React, {useEffect, useState} from "react";
import './AddUser.css';
import {useCookies} from "react-cookie";
import {useNavigate, useParams} from "react-router-dom";
import {Simple_get} from '../Utils/RequstSender';
import {Notifier} from "../Utils/Notifier";

function AddProductBrand() {
    const navigate = useNavigate();
    const [cookie, setCookie, removeCookie] = useCookies(['token']);
    const [selectedProductBrand , setSelectedProductBrand]=useState();
    const [selectedProductBrand2 , setSelectedProductBrand2]=useState();

    const submitForm = async () => {
        let dataObj = {
            'name': selectedProductBrand,
            'name2':selectedProductBrand2
        }
        let data =
            await Simple_get('https://hitmug.ir/api/brand/create', true, '', cookie.token, 'post', {...dataObj})
                .then((d => {
                        if (parseInt(d?.[2]) >= 200 && parseInt(d?.[2]) < 300) {
                            Notifier('success', d[1]);
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
                <span>افزودن برند </span>
            </div>
            <div className="auf-bottom">
                <div className="aufb-row align-right">
                    <div className="aufbr-child align-right">
                        <span>نام برند</span>
                        <input name={'email'} type={"text"}
                               onChange={(e) => {
                                   setSelectedProductBrand(e.target.value);
                               }} value={selectedProductBrand}
                        />
                    </div>
                    <div className="aufbr-child">
                        <span>نام لاتین</span>
                        <input name={'email'} type={"text"}
                               onChange={(e) => {
                                   setSelectedProductBrand2(e.target.value);
                               }} value={selectedProductBrand2}
                        />
                    </div>
                </div>

                <button onClick={() => submitForm()} className={'add-user-button'}>ثبت برند </button>
            </div>
        </div>
    )
}

export default AddProductBrand;