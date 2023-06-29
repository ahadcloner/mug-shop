import React, {useEffect, useState} from "react";
import './AddProduct.css';
import ImageUploader from "./ImageUploader";
import p1 from "../../assets/images/1.jpg";
import SelectBox from "../Utils/select-box/SelectBox";
import {Simple_get} from "../Utils/RequstSender";
import {useCookies} from "react-cookie";
import {Notifier} from "../Utils/Notifier";
import Creatable, {useCreatable} from 'react-select/creatable'
import {CreatableSelect_multi, CreatableSelect_single} from "../Utils/select-box/SelectBox";
import UploadForm from "../Utils/uploader";
import "../Utils/uploader/uploadForm.css"
import {queries} from "@testing-library/react";
import axios from "axios";


// import CreatableSelect from 'react-select/creatable';

function AddProduct() {
    let data = [
        {id: 1, title: 'ماگ حرارتی مدل اول', price: '27,000', picture: p1},
    ];
    const [cookie, setCookie, removeCookie] = useCookies(['token']);
    const [selectedBanners, setSelectedBanners] = useState();
    const [categories, setCategories] = useState([]);
    const [refreshCategories, setRefreshCategories] = useState(false);
    const [brands, setBrands] = useState([]);
    const [tags, setTags] = useState([]);
    const [attributes, setAttributes] = useState([]);
    const [refreshBrands, setRefreshBrands] = useState(false);
    const [refreshArrtirbutes, setRefreshAttrributes] = useState(false);
    const [refreshTags, setRefreshTags] = useState(false)
    const [selectedAttributes, setSelectedAttributes] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);
    const [selectedName, setSelectedName] = useState();
    const [selectedPrice, setSelectedPrice] = useState();
    const [selectedQuantity, setSelectedQuantity] = useState();
    const [selectedDiscount, setSelectedDiscount] = useState();
    const [selectedCategory, setSelectedCategory] = useState();
    const [selectedBrand, setSelectedBrand] = useState();
    const [dynamicInputs, setDynamicInputs] = useState([]);
    // const navigate = useNavigation();

    const get_dynamic_inputs = () => {
        let result = {}
        for (let i = 0; i < dynamicInputs.length; i++) {
            let element = document.getElementById('dynamic-input-' + dynamicInputs[i].label + '-' + i)
            result[dynamicInputs[i].label] = element.value
        }
        return result
    }

    const create_product = (e) => {
        e.preventDefault();
        let dynamics = get_dynamic_inputs()
        let dataObg = {
            'name': selectedName,
            'price': selectedPrice,
            'discount': selectedDiscount,
            'quantity': selectedQuantity,
            'brand_id': selectedBrand?.value,
            'category_id': selectedCategory?.value,
            'tags': selectedTags,
            'dynamics': dynamics,
        }


        const data = Simple_get('https://hitmug.ir/api/product/create', true, '', cookie.token, 'post', {...dataObg})
            .then((d) => {
                if (d?.[2] >= 200 && d?.[2] <= 300) {
                    Notifier('success', 'محصول با موفقیت ایجاد شد');

                    let formData = {}

                    formData = {
                        images: {...selectedBanners},
                        'product_id':parseInt( d?.[0])
                    }


                const config = {
                    method: 'post',
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        authorization: 'Bearer ' + cookie.token
                    },
                    url: 'https://hitmug.ir/api/product/image/create',
                    data: formData
                }
                axios.request(config)
                    .then((res) => {
                        Notifier('success', 'بنر با موفقیت ذخیره شد');
                        // navigate('/admin');
                    })
                    .catch((res) => {
                        Notifier('danger', 'خطا در ذخیره سازی بنر');
                    })


            }
    else
        {
            Notifier('danger', 'خطا');
        }
    }
)
    ;
}

const chanage_refresh_brands = () => {
    setRefreshBrands(!refreshBrands);
}
const chanage_refresh_tags = () => {
    setRefreshTags(!refreshTags);
}
const change_refresh_categories = () => {
    setRefreshCategories(!refreshCategories);
}
const change_refresh_arrtibutes = () => {
    setRefreshAttrributes(!refreshArrtirbutes);
}
const get_categories = async () => {
    const data = await
        Simple_get('https://hitmug.ir/api/product-category/index', false, '', '', 'get', [])
            .then((d) => {
                if (d?.[2] >= 200 && d?.[2] <= 300) {
                    setCategories(d?.[0]);

                } else {
                    Notifier('danger', 'خطا در دریافت دسته بندی ها');
                }
            })
}
const get_brands = async () => {
    const data = await
        Simple_get('https://hitmug.ir/api/brand/index', true, '', cookie.token, 'get', [])
            .then((d) => {
                if (d?.[2] >= 200 && d?.[2] <= 300) {
                    setBrands(d?.[0]);
                } else {
                    Notifier('danger', 'خطا در دریافت برند ها');
                }
            })
}
const get_tags = async () => {
    const data = await
        Simple_get('https://hitmug.ir/api/tag/index', true, '', cookie.token, 'get', [])
            .then((d) => {
                if (d?.[2] >= 200 && d?.[2] <= 300) {
                    setTags(d?.[0]);
                } else {
                    Notifier('danger', 'خطا در دریافت تگ ها');
                }
            })
}

const get_attributes = async () => {
    const data = await
        Simple_get('https://hitmug.ir/api/attribute/index', true, '', cookie.token, 'get', [])
            .then((d) => {
                if (d?.[2] >= 200 && d?.[2] <= 300) {
                    setAttributes(d?.[0]);
                } else {
                    Notifier('danger', 'خطا در ویژگی برند ها');
                }
            })
}


const create_input = (attributes) => {
    setDynamicInputs(attributes);
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
    create_input(selectedAttributes)
}, [selectedAttributes]);
const handleCreate = (e) => {
    if (e) {
        let dataobj = {
            'name': e
        }
        const data = Simple_get('https://hitmug.ir/api/product-category/create', true, '', cookie.token, 'post', {...dataobj})
            .then((d) => {
                if (d?.[2] >= 200 && d?.[2] <= 300) {
                    change_refresh_categories()
                } else {
                    Notifier('danger', 'خطا در ایجاد دسته بندی ها');
                }
            })
    }
}

const handleCreate_tag = (e) => {
    if (e) {
        let dataobj = {
            'name': e
        }
        const data = Simple_get('https://hitmug.ir/api/tag/create', true, '', cookie.token, 'post', {...dataobj})
            .then((d) => {
                if (d?.[2] >= 200 && d?.[2] <= 300) {
                    chanage_refresh_tags()
                } else {
                    Notifier('danger', 'خطا در ایجاد تگ');
                }
            })
    }
}
const handleCreate_brand = (e) => {
    if (e) {
        let dataobj = {
            'name': e
        }
        const data = Simple_get('https://hitmug.ir/api/brand/create', true, '', cookie.token, 'post', {...dataobj})
            .then((d) => {
                if (d?.[2] >= 200 && d?.[2] <= 300) {
                    chanage_refresh_brands()
                } else {
                    Notifier('danger', 'خطا در ایجاد برند');
                }
            })
    }
}

const handleCreate_attribute = (e) => {
    if (e) {
        let dataobj = {
            'name': e
        }
        const data = Simple_get('https://hitmug.ir/api/attribute/create', true, '', cookie.token, 'post', {...dataobj})
            .then((d) => {
                if (d?.[2] >= 200 && d?.[2] <= 300) {
                    change_refresh_arrtibutes()
                } else {
                    Notifier('danger', 'خطا در ایجاد ویژگی');
                }
            })
    }
}

return (
    <div className={'add-p-container'}>
        <div className={'add-p-header'}><h2>تعریف محصول</h2></div>

        <div className="add-p-inputs">
            <div className="inputs-row">
                <div className="inputs-child">
                    <span>نام محصول</span>
                    <input type={'text'} value={selectedName} onChange={(e) => setSelectedName(e.target.value)}/>
                </div>
                <div className="inputs-child">
                    <span>قیمت واحد</span>
                    <input type={'text'} value={selectedPrice} onChange={(e) => setSelectedPrice(e.target.value)}/>
                </div>

                <div className="inputs-child">
                    <span>موجودی</span>
                    <input type={'text'} value={selectedQuantity}
                           onChange={(e) => setSelectedQuantity(e.target.value)}/>
                </div>
                <div className="inputs-child">
                    <span>تخفیف</span>
                    <input type={'text'} value={selectedDiscount}
                           onChange={(e) => setSelectedDiscount(e.target.value)}/>
                </div>
            </div>
            <div className="inputs-row">
                <div className="inputs-child">
                    <span>دسته بندی محصول</span>
                    <CreatableSelect_single
                        // isClearable
                        selectedOption={(value) => setSelectedCategory(value)}

                        Focus={change_refresh_categories}
                        CreateOption={handleCreate}
                        options={categories.map((d) => {
                            return {value: d.id, label: d.name}
                        })}/>
                </div>
                <div className="inputs-child">
                    <span>برند</span>
                    <CreatableSelect_single
                        // isClearable
                        selectedOption={(value) => setSelectedBrand(value)}
                        Focus={chanage_refresh_brands}
                        CreateOption={handleCreate_brand}
                        options={brands?.map((d) => {
                            return {value: d.id, label: d.name}
                        })}/>
                </div>

                <div className="inputs-child">
                    <span>تگ های محصول</span>
                    <CreatableSelect_multi
                        selectedOption={(value) => setSelectedTags(value)}
                        Focus={chanage_refresh_tags}
                        CreateOption={handleCreate_tag}
                        options={tags?.map((d) => {
                            return {value: d.id, label: d.name}
                        })}/>
                </div>
                <div className="inputs-child">
                    <span>ویژگی ها</span>
                    <CreatableSelect_multi
                        selectedOption={(value) => setSelectedAttributes(value)}
                        Focus={change_refresh_arrtibutes}
                        CreateOption={handleCreate_attribute}
                        options={attributes?.map((d) => {
                            return {value: d.id, label: d.name}
                        })}/>
                    {/*<input type={'text'}/>*/}
                </div>
            </div>
            <div className="inputs-row">
                {
                    dynamicInputs?.map((di, index) => {
                        return (
                            <div key={di.value} className={'inputs-child'}>
                                <span>{di?.label}</span>
                                <input id={'dynamic-input-' + di.label.toString() + '-' + index.toString()}
                                       type={'text'}/>
                            </div>
                        )
                    })
                }
            </div>
        </div>
        <div className="add-p-galley">
            <div className="galley-uploader">
                <span>تصاویر محصول</span>
                <UploadForm onDrop={setSelectedBanners}/>
            </div>
        </div>
        <div className="add-p-actions">
            <button type={"submit"} onClick={(e) => create_product(e)}>ثبت محصول</button>
        </div>
    </div>
)
}

export default AddProduct;