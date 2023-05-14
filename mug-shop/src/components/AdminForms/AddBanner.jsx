import React, {useEffect, useState} from "react";
import './AddUser.css';
import {useCookies} from "react-cookie";
import {useNavigate, useParams} from "react-router-dom";
import {Simple_get} from '../Utils/RequstSender';
import {Notifier} from "../Utils/Notifier";
import ImageUploader from "./ImageUploader";
import axios from "axios";


function AddBanner() {
    const navigate = useNavigate();
    const [cookie, setCookie, removeCookie] = useCookies(['token']);
    const [selectedBanner, setSelectedBanner] = useState();
    console.log(selectedBanner)

    const submitForm = async () => {
        let dataObj = new FormData();
        dataObj.append('banner', selectedBanner);
        const config = {
            method: 'post',
            headers: {
                'Content-Type': 'multipart/form-data',
                authorization: 'Bearer ' + cookie.token
            },
            url: 'https://hitmug.ir/api/banner/create',
            data: dataObj
        }
        axios.request(config)
            .then((res) => {
              Notifier('success' ,'بنر با موفقیت ذخیره شد');
              navigate('/admin');
            })
            .catch((res) => {
                Notifier('danger' ,'خطا در ذخیره سازی بنر');
            })
    }


    return (
        <div className={'add-user-form col'}>
            <div className="auf-top">
                <span>افزودن بنر  </span>
            </div>
            <div className="auf-bottom Ad-uploader">
                <div className=" align-right">
                    <div className=" align-right">
                        <span className="Ad-span">تصویر بنر</span>
                        <ImageUploader handle={(e) => setSelectedBanner(e)}/>
                    </div>
                </div>

                <button onClick={() => submitForm()} className={'add-user-button mt-4'}>ثبت بنر</button>
            </div>
        </div>
    )
}

export default AddBanner;