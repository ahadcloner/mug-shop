import React from "react";
import './AddAddress.css';
function AddAddress({mode , fields})
{
    return (
        <div className={'add-address-form'}>
            <div className="aaf-top">
                <span>{
                    mode==='edit'?'ویرایش آدرس':'افزودن آدرس'
                }</span>
            </div>
            <div className="aaf-bottom">
                <div className="aafb-row">
                    <div className="aafbr-child">
                        <span>استان</span>
                        <select >
                            {mode==='edit' && <option value="">{fields[1]}</option>}
                            <option>کرمان</option>
                            <option>تهران</option>
                        </select>
                    </div>
                    <div className="aafbr-child">
                        <span>شهر</span>
                        <select>
                            {mode==='edit' && <option value="">{fields[2]}</option>}
                            <option>کرمان</option>
                            <option>تهران</option>
                        </select>
                    </div>
                </div>
                <div className="aafb-row">
                    <div className="aafbr-child full-width">
                        <span>آدرس</span>
                        <input type={"text"} value={mode==='edit'?fields[3]:''}/>
                    </div>
                </div>
            </div>
            <button className={'add-address-button'}>ثبت آدرس</button>
        </div>
    )
}
export default AddAddress;
