import React, {useEffect, useState} from "react";
import './AddUser.css';
import {useCookies} from "react-cookie";
import {useNavigate, useParams} from "react-router-dom";
import {Simple_get} from '../Utils/RequstSender';
import {Notifier} from "../Utils/Notifier";

function AddUserRole() {
    const navigate = useNavigate();
    const [cookie, setCookie, removeCookie] = useCookies(['token']);
    const [roles, setRoles] = useState();
    const [selectedRole , setSelectedRole]=useState();
    const user_id = useParams();

    const get_roles = async () => {
        const data = await Simple_get('https://hitmug.ir/api/role/index', true
            , '', cookie.token, 'get', [])
            .then((d) => {
                if (parseInt(d?.[2]) >= 200 && parseInt(d?.[2]) < 300) {
                    setRoles(d[0])
                } else {
                    Notifier('danger', 'خطا در دریافت لیست نقش ها')
                }
            });
    }

    const submitForm = async () => {
        let dataObj = {
            'user_id': user_id?.id,
            'role': selectedRole,
        }
        let data =
            await Simple_get('https://hitmug.ir/api/user/roles/assign', true, '', cookie.token, 'post', {...dataObj})
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
        get_roles().then();
        setSelectedRole(roles?.[0]?.name);
    }, []);
    useEffect(()=>{
        setSelectedRole(roles?.[0]?.name);
    },[roles])

    return (
        <div className={'add-user-form add-role-form'}>
            <div className="auf-top">
                <span>افزودن نقش کاربری </span>
            </div>
            <div className="auf-bottom">
                <div className="aufb-row align-right">
                    <div className="aufbr-child">
                        <span>انتخاب نقش کاربری</span>
                        <select onChange={(e) => {
                            setSelectedRole(e.target.selectedOptions[0].innerText);
                        }}>
                            {
                                roles?.map((r) => {
                                    return <option key={r.id}>{r.name}</option>
                                })}
                        </select>
                    </div>
                </div>

            <button onClick={() => submitForm()} className={'add-user-button'}>ثبت نقش کاربری</button>
            </div>
        </div>
    )
}

export default AddUserRole;