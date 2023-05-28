import React, {useEffect, useState} from "react";
import './AddProduct.css';
import ImageUploader from "./ImageUploader";
import p1 from "../../assets/images/1.jpg";
import SelectBox from "../Utils/select-box/SelectBox";
import {Simple_get} from "../Utils/RequstSender";
import {useCookies} from "react-cookie";
import {Notifier} from "../Utils/Notifier";
import Creatable, { useCreatable } from 'react-select/creatable'
import {CreatableSelect_multi,CreatableSelect_single} from "../Utils/select-box/SelectBox";
// import CreatableSelect from 'react-select/creatable';

function AddProduct() {
    let data = [
        {id: 1, title: 'ماگ حرارتی مدل اول', price: '27,000', picture: p1},
    ];
    const [cookie, setCookie, removeCookie] = useCookies(['token']);
    const [selectedBanner, setSelectedBanner] = useState();
    const [categories, setCategories] = useState([]);
    const [refreshCategories , setRefreshCategories] = useState(false);
    const [brands , setBrands] = useState([]);
    const [tags , setTags] = useState([]);
    const [attributes , setAttributes] = useState([]);
    const[ refreshBrands ,setRefreshBrands] = useState(false);
    const [refreshArrtirbutes , setRefreshAttrributes] = useState(false);
    const[ refreshTags ,setRefreshTags] = useState(false)
    const [selectedAttributes , setSelectedAttributes] = useState([]);
    const [selectedTags , setSelectedTags] = useState([]);
    const [dynamicInputs ,setDynamicInputs] = useState([]);
    const chanage_refresh_brands = ()=>{
        setRefreshBrands(!refreshBrands);
    }
    const chanage_refresh_tags = ()=>{
        setRefreshTags(!refreshTags);
    }
    const change_refresh_categories = ()=>{
        setRefreshCategories(!refreshCategories);
    }
    const change_refresh_arrtibutes = ()=>{
        setRefreshAttrributes(!refreshArrtirbutes);
    }
    const get_categories =async () => {
        const data = await
            Simple_get('https://hitmug.ir/api/product-category/index',false ,'','' ,'get',[])
                .then((d)=>{
                    if(d?.[2]>=200 && d?.[2]<=300)
                    {
                        setCategories(d?.[0]);
                        console.log(categories);
                    }
                    else
                    {
                        Notifier('danger' ,'خطا در دریافت دسته بندی ها');
                    }
                })
    }
    const get_brands =async () => {
        const data = await
            Simple_get('https://hitmug.ir/api/brand/index',true ,'',cookie.token,'get',[])
                .then((d)=>{
                    if(d?.[2]>=200 && d?.[2]<=300)
                    {
                        setBrands(d?.[0]);
                    }
                    else
                    {
                        Notifier('danger' ,'خطا در دریافت برند ها');
                    }
                })
    }
    const get_tags =async () => {
        const data = await
            Simple_get('https://hitmug.ir/api/tag/index',true ,'',cookie.token,'get',[])
                .then((d)=>{
                    if(d?.[2]>=200 && d?.[2]<=300)
                    {
                        setTags(d?.[0]);
                    }
                    else
                    {
                        Notifier('danger' ,'خطا در دریافت تگ ها');
                    }
                })
    }

    const get_attributes =async () => {
        const data = await
            Simple_get('https://hitmug.ir/api/attribute/index',true ,'',cookie.token,'get',[])
                .then((d)=>{
                    if(d?.[2]>=200 && d?.[2]<=300)
                    {
                        setAttributes(d?.[0]);
                    }
                    else
                    {
                        Notifier('danger' ,'خطا در ویژگی برند ها');
                    }
                })
    }


    const create_input = (attributes)=>{
        setDynamicInputs(...attributes);
    }
    useEffect(() => {
        get_categories();
    }, [refreshCategories]);

    useEffect(() => {
        get_brands();
    }, [refreshBrands]);
    useEffect(() => {
        get_tags();
    }, [refreshTags]);

    useEffect(() => {
        get_attributes();
    }, [refreshArrtirbutes]);

    useEffect(() => {
        if(selectedAttributes.length>0)
        {
            create_input(selectedAttributes)
        }
    }, [selectedAttributes]);
    const handleCreate = (e) => {
        if(e)
        {
            let dataobj = {
                'name':e
            }
            const data = Simple_get('https://hitmug.ir/api/product-category/create' , true , '',cookie.token ,'post',{...dataobj})
                .then((d)=>{
                    if(d?.[2]>=200 && d?.[2]<=300)
                    {
                        change_refresh_categories()
                    }
                    else
                    {
                        Notifier('danger' ,'خطا در ایجاد دسته بندی ها');
                    }
                })
        }
    }

    const handleCreate_tag = (e) => {
        console.log(e)
        if(e)
        {
            let dataobj = {
                'name':e
            }
            const data = Simple_get('https://hitmug.ir/api/tag/create' , true , '',cookie.token ,'post',{...dataobj})
                .then((d)=>{
                    if(d?.[2]>=200 && d?.[2]<=300)
                    {
                        chanage_refresh_tags()
                    }
                    else
                    {
                        Notifier('danger' ,'خطا در ایجاد تگ');
                    }
                })
        }
    }
    const handleCreate_brand = (e) => {
        if(e)
        {
            let dataobj = {
                'name':e
            }
            const data = Simple_get('https://hitmug.ir/api/brand/create' , true , '',cookie.token ,'post',{...dataobj})
                .then((d)=>{
                    if(d?.[2]>=200 && d?.[2]<=300)
                    {
                        chanage_refresh_brands()
                    }
                    else
                    {
                        Notifier('danger' ,'خطا در ایجاد برند');
                    }
                })
        }
    }

    const handleCreate_attribute = (e) => {
        if(e)
        {
            let dataobj = {
                'name':e
            }
            const data = Simple_get('https://hitmug.ir/api/attribute/create' , true , '',cookie.token ,'post',{...dataobj})
                .then((d)=>{
                    if(d?.[2]>=200 && d?.[2]<=300)
                    {
                        change_refresh_arrtibutes()
                    }
                    else
                    {
                        Notifier('danger' ,'خطا در ایجاد ویژگی');
                    }
                })
        }
    }
    return (
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

                    <div className="inputs-child">
                        <span>موجودی</span>
                        <input type={'text'}/>
                    </div>
                    <div className="inputs-child">
                        <span>تخفیف</span>
                        <input type={'text'}/>
                    </div>
                </div>
                <div className="inputs-row">
                    <div className="inputs-child">
                        <span>دسته بندی محصول</span>
                        <CreatableSelect_single
                            // isClearable
                            Focus={change_refresh_categories}
                            CreateOption={handleCreate}
                            options={categories.map((d)=>{return {value:d.id , label:d.name}})}/>
                    </div>
                    <div className="inputs-child">
                        <span>برند</span>
                        <CreatableSelect_single
                            // isClearable
                            Focus={chanage_refresh_brands}
                            CreateOption={handleCreate_brand}
                            options={brands?.map((d)=>{return {value:d.id , label:d.name}})}/>
                    </div>

                    <div className="inputs-child">
                        <span>تگ های محصول</span>
                        <CreatableSelect_multi
                            selectedOption = {(value)=>setSelectedTags(value)}
                            Focus={chanage_refresh_tags}
                            CreateOption={handleCreate_tag}
                            options={tags?.map((d)=>{return {value:d.id , label:d.name}})}/>
                    </div>
                    <div className="inputs-child">
                        <span>ویژگی ها</span>
                        <CreatableSelect_multi
                            selectedOption={(value)=>setSelectedAttributes(value)}
                            Focus={change_refresh_arrtibutes}
                            CreateOption={handleCreate_attribute}
                            options={attributes?.map((d)=>{return {value:d.id , label:d.name}})}/>
                        {/*<input type={'text'}/>*/}
                    </div>
                </div>
                <div className="inputs-row">
                    {
                       dynamicInputs?.map((di)=>{
                           return(
                               <div className={'inputs-child'}>
                                   <span>{di.label}</span>
                                   <input type={'text'}/>
                               </div>
                           )
                       })
                    }
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
        </div>
    )
}

export default AddProduct;