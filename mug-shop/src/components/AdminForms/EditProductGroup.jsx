import React, {useEffect, useState} from "react";
import './AddUser.css';
import {useCookies} from "react-cookie";
import {useNavigate, useParams} from "react-router-dom";
import {Simple_get} from '../Utils/RequstSender';
import {Notifier} from "../Utils/Notifier";

function EditProductGroup() {
    const navigate = useNavigate();
    const [cookie, setCookie, removeCookie] = useCookies(['token']);
    const [selectedProductGroup , setSelectedProductGroup]=useState();
    const product_group_id  = useParams();

    const get_product_group = ()=>{
        Simple_get('https://hitmug.ir/api/product-group/find/',true ,product_group_id.id ,cookie.token ,'get' ,[])
            .then((d)=>{
                if (parseInt(d?.[2]) >= 200 && parseInt(d?.[2]) < 300) {
                    setSelectedProductGroup(d[0]?.name)
                } else {
                    Notifier('danger', 'خطا در دریافت گروه محصول')
                }
            })
    }
    const submitForm = async () => {
        let dataObj = {
            'name': selectedProductGroup,
        }
        let data =
            await Simple_get('https://hitmug.ir/api/product-group/update/', true, product_group_id.id, cookie.token, 'patch', {...dataObj})
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

    useEffect(() => {
        get_product_group()
    }, []);
    return (
        <div className={'add-user-form add-role-form'}>
            <div className="auf-top">
                <span>ویرایش گروه محصول  </span>
            </div>
            <div className="auf-bottom">
                <div className="aufb-row align-right">
                    <div className="aufbr-child align-right">
                        <span>نام گروه محصول</span>
                        <input name={'email'} type={"text"}
                               onChange={(e) => {
                                   setSelectedProductGroup(e.target.value);
                               }} value={selectedProductGroup}
                        />
                    </div>
                </div>

                <button onClick={() => submitForm()} className={'add-user-button'}>ثبت گروه محصول </button>
            </div>
        </div>
    )
}

export default EditProductGroup;