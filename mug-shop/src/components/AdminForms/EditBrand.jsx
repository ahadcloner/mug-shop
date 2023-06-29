import React, {useEffect, useState} from "react";
import './AddUser.css';
import {useCookies} from "react-cookie";
import {useNavigate, useParams} from "react-router-dom";
import {Simple_get} from '../Utils/RequstSender';
import {Notifier} from "../Utils/Notifier";

function EditBrand() {
    const navigate = useNavigate();
    const [cookie, setCookie, removeCookie] = useCookies(['token']);
    const [selectedBrand , setSelectedBrand]=useState();
    const [selectedBrand2 , setSelectedBrand2]=useState();
    const brand_id  = useParams();


    const get_brands = ()=>{
        Simple_get('https://hitmug.ir/api/brand/find/',true ,brand_id.id ,cookie.token ,'get' ,[])
            .then((d)=>{
                if (parseInt(d?.[2]) >= 200 && parseInt(d?.[2]) < 300) {
                    setSelectedBrand(d[0]?.name)
                    setSelectedBrand2(d[0]?.name2)
                } else {
                    Notifier('danger', 'خطا در دریافت برند')
                }
            })
    }
    const submitForm = async () => {
        let dataObj = {
            'name': selectedBrand,
            'name2':selectedBrand2
        }
        let data =
            await Simple_get('https://hitmug.ir/api/brand/update/', true, brand_id.id, cookie.token, 'patch', {...dataObj})
                .then((d => {
                        if (parseInt(d?.[2]) >= 200 && parseInt(d?.[2]) < 300) {
                            Notifier('success', 'تغییرات با موفقیت اعمال شد');
                            navigate('/admin');
                        } else {
                            if (d[0].response.data.errors?.name) Notifier('danger', d[0].response.data.errors.name[0])
                        }
                    })
                )
    }

    useEffect(() => {
        get_brands()
    }, []);
    return (
        <div className={'add-user-form add-role-form'}>
            <div className="auf-top">
                <span>ویرایش برند</span>
            </div>
            <div className="auf-bottom">
                <div className="aufb-row align-right">
                    <div className="aufbr-child align-right">
                        <span>نام برند</span>
                        <input name={'email'} type={"text"}
                               onChange={(e) => {
                                   setSelectedBrand(e.target.value);
                               }} value={selectedBrand}
                        />
                    </div>

                    <div className="aufbr-child">
                        <span>نام لاتین</span>
                        <input name={'email'} type={"text"}
                               onChange={(e) => {
                                   setSelectedBrand2(e.target.value);
                               }} value={selectedBrand2}
                        />
                    </div>
                </div>

                <button onClick={() => submitForm()} className={'add-user-button'}>ثبت برند </button>
            </div>
        </div>
    )
}

export default EditBrand;