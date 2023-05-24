import React, {useEffect, useState} from "react";
import './AddUser.css';
import {useCookies} from "react-cookie";
import {useNavigate, useParams} from "react-router-dom";
import {Simple_get} from '../Utils/RequstSender';
import {Notifier} from "../Utils/Notifier";

function EditOption() {
    const navigate = useNavigate();
    const [cookie, setCookie, removeCookie] = useCookies(['token']);
    const [name , setName] = useState();
    const [desc , setDesc] = useState();
    const [price, setPrice]=useState();
    const op_id  = useParams();


    const get_option = ()=>{
        Simple_get('https://hitmug.ir/api/option/find/',true ,op_id.id ,cookie.token ,'get' ,[])
            .then((d)=>{
                if (parseInt(d?.[2]) >= 200 && parseInt(d?.[2]) < 300) {
                    setName(d[0]?.name)
                    setDesc(d[0]?.description)
                    setPrice(d[0]?.price)
                } else {
                    Notifier('danger', 'خطا در دریافت آپشن')
                }
            })
    }
    const submitForm = async () => {
        let dataObj = {
            'name': name,
            'description':desc,
            'price':price
        }
        let data =
            await Simple_get('https://hitmug.ir/api/option/update/', true, op_id.id, cookie.token, 'patch', {...dataObj})
                .then((d => {
                        if (parseInt(d?.[2]) >= 200 && parseInt(d?.[2]) < 300) {
                            Notifier('success', 'تغییرات با موفقیت اعمال شد');
                            navigate('/admin');
                        } else {
                            if (d[0].response.data.errors?.name) Notifier('danger', d[0].response.data.errors.name[0])
                            if (d[0].response.data.errors?.description) Notifier('danger', d[0].response.data.errors.description[0])
                            if (d[0].response.data.errors?.price) Notifier('danger', d[0].response.data.errors.price[0])
                        }
                    })
                )
    }

    useEffect(() => {
        get_option()
    }, []);
    return (
        <div className={'add-user-form add-role-form'}>
            <div className="auf-top">
                <span>ویرایش آپشن</span>
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
                                   setDesc(e.target.value);
                               }} value={desc}
                        />
                    </div>


                    <div className="aufbr-child">
                        <span>توضیحات</span>
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

export default EditOption;