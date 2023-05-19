import React, {useEffect, useState} from "react";
import './AddUser.css';
import {useCookies} from "react-cookie";
import {useNavigate, useParams} from "react-router-dom";
import {Simple_get} from '../Utils/RequstSender';
import {Notifier} from "../Utils/Notifier";

function EditProductCategory() {
    const navigate = useNavigate();
    const [cookie, setCookie, removeCookie] = useCookies(['token']);
    const [selectedProductCategory , setSelectedProductCategory]=useState();
    const product_category_id  = useParams();

    const get_product_group = ()=>{
        Simple_get('https://hitmug.ir/api/product-category/find/',true ,product_category_id.id ,cookie.token ,'get' ,[])
            .then((d)=>{
                if (parseInt(d?.[2]) >= 200 && parseInt(d?.[2]) < 300) {
                    setSelectedProductCategory(d[0]?.name)
                } else {
                    Notifier('danger', 'خطا در دریافت دسته بندی')
                }
            })
    }
    const submitForm = async () => {
        let dataObj = {
            'name': selectedProductCategory,
        }
        let data =
            await Simple_get('https://hitmug.ir/api/product-category/update/', true, product_category_id.id, cookie.token, 'patch', {...dataObj})
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
                <span>ویرایش دسته بندی</span>
            </div>
            <div className="auf-bottom">
                <div className="aufb-row align-right">
                    <div className="aufbr-child align-right">
                        <span>نام دسته بندی</span>
                        <input name={'email'} type={"text"}
                               onChange={(e) => {
                                   setSelectedProductCategory(e.target.value);
                               }} value={selectedProductCategory}
                        />
                    </div>
                </div>

                <button onClick={() => submitForm()} className={'add-user-button'}>ثبت دسته بندی</button>
            </div>
        </div>
    )
}

export default EditProductCategory;