import React, {useEffect, useState} from "react";
import './AdminModalUserAddress.css';
import Modal from "react-modal";
import {useCookies} from "react-cookie";
import axios from "axios";
import DataGrid from "../DataGrid";
Modal.setAppElement('#myModal');

function AdminModalUserAddress({isOpen,onRequestClose,user_id}){
    console.log('user_id passes' , user_id)
    const [cookie, setCookie, removeCookie] = useCookies(['token']);
    const [data , setData] = useState([]);
    const [reloadData , setReloadDate]=useState(false);
    const address_headers =[
        {id:0 , title :'استان'},
        {id:1 , title :'شهر'},
        {id:2 , title :'آدرس'},
        {id:3 , title :'عملیات'},
    ];
    const address_field_names = [
        {id: 0, title: 'city_id',is_date:false,is_boolean:false},
        {id: 1, title: 'title',is_date:false,is_boolean:false},
    ];
    const address_buttons=[
        {
            id:0 ,title:'ویرایش آدرس' , func:''
        },
        {
            id:1 ,title:'حذف آدرس' , func:''
        },
    ]

    useEffect( ()=>{
        const config = {
            method :'post' ,
            url:'https://hitmug.ir/api/user/get-addresses',
            data:{
                'user_id':user_id
            },
            headers: {
                'Authorization': 'Bearer '+cookie.token
            }
        }
         axios.request(config)
            .then((res)=>{
                setData(res.data.data)
                console.log(res.data.data)
            })
            .catch((err)=>{
                console.log(err)
            })
    },[isOpen])
    return(

        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            className="md"
            overlayClassName="ol"
        >
            <div className={'md-container'}>
                <span onClick={()=>{onRequestClose()}} className={'close'}>X</span>
                <DataGrid
                    data={data}
                    headers={address_headers}
                    buttons={address_buttons}
                    grid_title={'آدرس های کاربر'}
                    have_action={true}
                    action_title={'افزودن آدرس'}
                    field_names={address_field_names}
                    reload={reloadData}
                />
            </div>

        </Modal>
    )
}
export default AdminModalUserAddress;
