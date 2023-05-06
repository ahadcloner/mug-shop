import React from "react";
import './AddUser.css';
function AddUser({mode , fields}){
    return(
        <div className={'add-user-form'}>
                <div className="auf-top">
                    { mode==='edit'?'ویرایش کاربر':'افزودن کاربر'}
                </div>
                <div className="auf-bottom">
                    <div className="aufb-row">
                        <div className="aufbr-child">
                            <span>ایمیل</span>
                            <input type={"text"} value={mode==='edit'?fields[1]:''}/>
                        </div>
                        <div className="aufbr-child">
                            <span>رمز عبور</span>
                            <input type={"text"} value={mode==='edit'?fields[2]:''} />
                        </div>
                    </div>
                    <div className="aufb-row">
                        <div className="aufbr-child">
                            <span>نام کاربری</span>
                            <input type={"text"} value={mode==='edit'?fields[3]:''}/>
                        </div>
                        <div className="aufbr-child">
                            <span>شماره تماس</span>
                            <input type={"text"} value={mode==='edit'?fields[4]:''}/>
                        </div>
                    </div>
                   <div className="aufb-row">
                       <div className="aufbr-child">
                           <span>استان</span>
                           <select>
                               {mode==='edit' && <option value="">{fields[5]}</option>}
                               <option>کرمان</option>
                               <option>تهران</option>
                           </select>
                       </div>
                       <div className="aufbr-child">
                           <span>شهر</span>
                           <select>
                               {mode==='edit' && <option value="">{fields[6]}</option>}
                               <option>کرمان</option>
                               <option>تهران</option>
                           </select>
                       </div>
                    </div>
                    <div className="aufb-row align-right">
                        <div className="aufbr-child">
                            <span>وضعیت</span>
                            <select>
                                <option>فعال</option>
                                <option>غیر فعال</option>
                            </select>
                        </div>
                    </div>
                </div>
            <button className={'add-user-button'}>ثبت کاربر</button>
        </div>
    )
}
export default AddUser;