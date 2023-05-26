import React, {useEffect, useState} from "react";
import './AddUser.css';
import {useCookies} from "react-cookie";
import {useNavigate, useParams} from "react-router-dom";
import {Simple_get} from '../Utils/RequstSender';
import {Notifier} from "../Utils/Notifier";

function EditAttribute() {
    const navigate = useNavigate();
    const [cookie, setCookie, removeCookie] = useCookies(['token']);
    const [attr , setAttr]=useState();
    const attr_id  = useParams();

    const get_attribute = ()=>{
        Simple_get('https://hitmug.ir/api/attribute/find/',true ,attr_id.id ,cookie.token ,'get' ,[])
            .then((d)=>{
                if (parseInt(d?.[2]) >= 200 && parseInt(d?.[2]) < 300) {
                    setAttr(d[0]?.name)
                } else {
                    Notifier('danger', 'خطا در دریافت ویژگی')
                }
            })
    }
    const submitForm = async () => {
        let dataObj = {
            'name': attr,
        }
        let data =
            await Simple_get('https://hitmug.ir/api/attribute/update/', true, attr_id.id, cookie.token, 'patch', {...dataObj})
                .then((d => {
                        if (parseInt(d?.[2]) >= 200 && parseInt(d?.[2]) < 300) {
                            Notifier('success', 'عملیات با موفقیت انجام شد');
                            navigate('/admin');
                        } else {
                            if (d[0].response.data.errors?.name) Notifier('danger', d[0].response.data.errors.name[0])
                        }
                    })
                )
    }

    useEffect(() => {
        get_attribute()
    }, []);
    return (
        <div className={'add-user-form add-role-form'}>
            <div className="auf-top">
                <span>ویرایش ویژگی  </span>
            </div>
            <div className="auf-bottom">
                <div className="aufb-row align-right">
                    <div className="aufbr-child align-right">
                        <span>نام ویژگی</span>
                        <input name={'email'} type={"text"}
                               onChange={(e) => {
                                   setAttr(e.target.value);
                               }} value={attr}
                        />
                    </div>
                </div>

                <button onClick={() => submitForm()} className={'add-user-button'}>ثبت ویژگی </button>
            </div>
        </div>
    )
}

export default EditAttribute;