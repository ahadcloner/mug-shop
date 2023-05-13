import React, {useEffect, useState} from "react";
import './AddUser.css';
import {useCookies} from "react-cookie";
import {useNavigate, useParams} from "react-router-dom";
import {Simple_get} from '../Utils/RequstSender';
import {Notifier} from "../Utils/Notifier";

function AddRolePermission() {
    const navigate = useNavigate();
    const [cookie, setCookie, removeCookie] = useCookies(['token']);
    const [permissions, setPermissions] = useState();
    const [selectedPermission , setSelectedPermission]=useState();
    const role_id = useParams();
    console.log(selectedPermission)
    const get_permissions = async () => {
        const data = await Simple_get('https://hitmug.ir/api/permision/index', true
            , '', cookie.token, 'get', [])
            .then((d) => {
                if (parseInt(d?.[2]) >= 200 && parseInt(d?.[2]) < 300) {
                    setPermissions(d[0])
                } else {
                    Notifier('danger', 'خطا در دریافت لیست دسترسی')
                }
            });
    }

    const submitForm = async () => {
        let dataObj = {
            'role_id': role_id?.id,
            'permission_id': selectedPermission,
        }
        let data =
            await Simple_get('https://hitmug.ir/api/role/grant-permission', true, '', cookie.token, 'post', {...dataObj})
                .then((d => {
                        if (parseInt(d?.[2]) >= 200 && parseInt(d?.[2]) < 300) {
                            Notifier('success', d[1]);
                            navigate('/admin');
                        } else {
                            if (d[0].response.data.errors?.email) Notifier('danger', d[0].response.data.errors.email[0])
                            if (d[0].response.data.errors?.password) Notifier('danger', d[0].response.data.errors.password[0])
                        }
                    })
                )
    }

    useEffect(() => {
        get_permissions().then();
        setSelectedPermission(permissions?.[0]?.id);
    }, []);
    useEffect(()=>{
        setSelectedPermission(permissions?.[0]?.id  );
    },[permissions])

    return (
        <div className={'add-user-form add-role-form'}>
            <div className="auf-top">
                <span>افزودن دسترسی </span>
            </div>
            <div className="auf-bottom">
                <div className="aufb-row align-right">
                    <div className="aufbr-child">
                        <span>انتخاب دسترسی</span>
                        <select onChange={(e) => {
                            setSelectedPermission(e.target.selectedOptions[0]?.id);
                        }}>
                            {
                                permissions?.map((r) => {
                                    return <option id={r.id} key={r.id}>{r.name}</option>
                                })}
                        </select>
                    </div>
                </div>

                <button onClick={() => submitForm()} className={'add-user-button'}>ثبت دسترسی</button>
            </div>
        </div>
    )
}

export default AddRolePermission;