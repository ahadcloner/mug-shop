import React, {useEffect, useState} from "react";
import './AddProduct.css';
import ImageUploader from "./ImageUploader";
import p1 from "../../assets/images/1.jpg";
import SelectSearch from "react-select-search";
import 'react-select-search/style.css'

function AddProduct()
{
    let data = [
        {id: 1, title: 'ماگ حرارتی مدل اول', price: '27,000', picture: p1},
    ];
    const [selectedBanner ,setSelectedBanner] = useState();
    return(
        <div className={'add-p-container'}>
            <div className="add-p-inputs">
                <div className="inputs-row">
                    <div className="inputs-child">
                        <span>نام محصول</span>
                        <input type={'text'}/>
                    </div>
                    <div className="inputs-child">
                        <span>قیمت واحد</span>
                        <input type={'text'}/>
                    </div>
                </div>
                <div className="inputs-row">
                    <div className="inputs-child">
                        <span>موجودی</span>
                        <input type={'text'}/>
                    </div>
                    <div className="inputs-child">
                        <span>تخفیف</span>
                        <input type={'text'}/>
                    </div>
                </div>
            </div>
            <div className="add-p-galley">
                <div className="galley-uploader">
                    <span>تصاویر محصول</span>
                    <ImageUploader handle={(e) => setSelectedBanner(e)}/>
                </div>
                <div className="gallery-album">
                    <img src={data[0].picture}/>
                    <img src={data[0].picture}/>
                    <img src={data[0].picture}/>
                    <img src={data[0].picture}/>
                    <img src={data[0].picture}/>
                    <img src={data[0].picture}/>
                    <img src={data[0].picture}/>

                </div>
            </div>
            <div className="add-p-inputs">
                <div className="inputs-row">
                    <div className="inputs-child">
                        <span>نام محصول</span>
                        <SelectSearch options={[{name:'ahad' ,value:1},{name:'reza',value:2}]} value="sv" name="language"/>
                    </div>
                    <div className="inputs-child">
                        <span>قیمت واحد</span>
                        <input type={'text'}/>
                    </div>
                </div>
                <div className="inputs-row">
                    <div className="inputs-child">
                        <span>موجودی</span>
                        <input type={'text'}/>
                    </div>
                    <div className="inputs-child">
                        <span>تخفیف</span>
                        <input type={'text'}/>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default AddProduct;