import React, {useEffect, useState} from "react";
import './ProductManager.css';
import p1 from "../../assets/images/1.jpg";
import p2 from "../../assets/images/2.jpg";
import p3 from "../../assets/images/3.jpg";
import p4 from "../../assets/images/4.jpg";
import p5 from "../../assets/images/5.jpg";
import {useNavigate} from "react-router-dom";
import {Simple_get} from "../Utils/RequstSender";
import {useCookies} from "react-cookie";
import {Notifier} from "../Utils/Notifier";



function ProductManager()
{

    const  navigate = useNavigate();
    let data = [
        {id: 1, title: 'ماگ حرارتی مدل اول', price: '27,000', picture: p1},
    ];

    const [cookie, setCookie, removeCookie] = useCookies(['token']);
    const [products , setProducts] = useState([]);
    const get_products = ()=>{
        let data = Simple_get('https://hitmug.ir/api/product/index' ,true,'',cookie.token,'get',[])
            .then((d)=>{
                if (parseInt(d?.[2]) >= 200 && parseInt(d?.[2]) < 300) {
                   setProducts(...[d?.[0]]);
                } else {
                    Notifier('danger', 'خطا در دریافت برند')
                }
            })
    }

    useEffect(()=>{
        get_products()
        console.log(products)
    },[]);


    return (
        <div className={'pm-container'}>
            <button onClick={()=>navigate('/admin/add-product')} className={'float-button'}>تعریف محصول</button>
            <div className={'pm-top'}>
                <h2>مدیریت محصولات</h2>
            </div>
            <div className="pm-bottom">

                {
                    products &&
                    products.map((p,index)=>{
                        console.log(p?.images?.[0]?.image)
                        return(
                            <div className="pm-card">
                                <div className="pm-card-pic">
                                    <img src={'https://hitmug.ir/api.hitmug.ir/public/'+p?.images?.[0]?.image} key={p.id}/>
                                </div>
                                <div className="pm-card-attributes">
                                    <div className="pm-card-row">
                                        <span>نام</span>
                                        <span>{p.name}</span>
                                    </div>
                                    <div className="pm-card-row">
                                        <span>قیمت</span>
                                        <span>{p.price}</span>
                                    </div>
                                    <div className="pm-card-row">
                                        <span>موجودی</span>
                                        <span> {p.total}</span>
                                    </div>
                                    <div className="pm-card-row">
                                        <span>دسته</span>
                                        <span>{p?.category?.name}</span>
                                    </div>
                                    <div className="pm-card-row">
                                        <span>گروه محصول</span>
                                        <span> ماگ و فندک</span>
                                    </div>
                                </div>
                                <div className="pm-card-actions">
                                    <button>ویرایش محصول</button>
                                    <button>ویرایش تصاویر</button>
                                    <button>ویرایش ویژگی ها</button>
                                    <button>ویرایش آپشن ها</button>
                                    <button>موجود / ناموجود کردن</button>
                                    <button>اعمال تخفیف</button>
                                    <button>انتقال به گروه محصول دیگر</button>
                                    <button>انتقال به دسته بندی دیگر</button>
                                </div>
                            </div>
                        )
                    })
                }

            </div>
        </div>
    )
}
export default ProductManager;

