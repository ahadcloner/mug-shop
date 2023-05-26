import React from "react";
import './ProductManager.css';
import p1 from "../../assets/images/1.jpg";
import p2 from "../../assets/images/2.jpg";
import p3 from "../../assets/images/3.jpg";
import p4 from "../../assets/images/4.jpg";
import p5 from "../../assets/images/5.jpg";
import {useNavigate} from "react-router-dom";
function ProductManager()
{

    const  navigate = useNavigate();
    let data = [
        {id: 1, title: 'ماگ حرارتی مدل اول', price: '27,000', picture: p1},
    ];


    return (
        <div className={'pm-container'}>
            <button onClick={()=>navigate('/admin/add-product')} className={'float-button'}>تعریف محصول</button>
            <div className={'pm-top'}>
                <h2>مدیریت محصولات</h2>
            </div>
            <div className="pm-bottom">


                <div className="pm-card">
                    <div className="pm-card-pic">
                        <img src={data[0].picture}/>
                    </div>
                    <div className="pm-card-attributes">
                        <div className="pm-card-row">
                            <span>نام</span>
                            <span>ماگ حرارتی</span>
                        </div>
                        <div className="pm-card-row">
                            <span>قیمت</span>
                            <span>236000</span>
                        </div>
                        <div className="pm-card-row">
                            <span>موجودی</span>
                            <span> 50</span>
                        </div>
                        <div className="pm-card-row">
                            <span>دسته</span>
                            <span>ماگ حرارتی</span>
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

                <div className="pm-card">
                    <div className="pm-card-pic">
                        <img src={data[0].picture}/>
                    </div>
                    <div className="pm-card-attributes">
                        <div className="pm-card-row">
                            <span>نام</span>
                            <span>ماگ حرارتی</span>
                        </div>
                        <div className="pm-card-row">
                            <span>قیمت</span>
                            <span>236000</span>
                        </div>
                        <div className="pm-card-row">
                            <span>موجودی</span>
                            <span> 50</span>
                        </div>
                        <div className="pm-card-row">
                            <span>دسته</span>
                            <span>ماگ حرارتی</span>
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
                <div className="pm-card">
                    <div className="pm-card-pic">
                        <img src={data[0].picture}/>
                    </div>
                    <div className="pm-card-attributes">
                        <div className="pm-card-row">
                            <span>نام</span>
                            <span>ماگ حرارتی</span>
                        </div>
                        <div className="pm-card-row">
                            <span>قیمت</span>
                            <span>236000</span>
                        </div>
                        <div className="pm-card-row">
                            <span>موجودی</span>
                            <span> 50</span>
                        </div>
                        <div className="pm-card-row">
                            <span>دسته</span>
                            <span>ماگ حرارتی</span>
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
                <div className="pm-card">
                    <div className="pm-card-pic">
                        <img src={data[0].picture}/>
                    </div>
                    <div className="pm-card-attributes">
                        <div className="pm-card-row">
                            <span>نام</span>
                            <span>ماگ حرارتی</span>
                        </div>
                        <div className="pm-card-row">
                            <span>قیمت</span>
                            <span>236000</span>
                        </div>
                        <div className="pm-card-row">
                            <span>موجودی</span>
                            <span> 50</span>
                        </div>
                        <div className="pm-card-row">
                            <span>دسته</span>
                            <span>ماگ حرارتی</span>
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
                <div className="pm-card">
                    <div className="pm-card-pic">
                        <img src={data[0].picture}/>
                    </div>
                    <div className="pm-card-attributes">
                        <div className="pm-card-row">
                            <span>نام</span>
                            <span>ماگ حرارتی</span>
                        </div>
                        <div className="pm-card-row">
                            <span>قیمت</span>
                            <span>236000</span>
                        </div>
                        <div className="pm-card-row">
                            <span>موجودی</span>
                            <span> 50</span>
                        </div>
                        <div className="pm-card-row">
                            <span>دسته</span>
                            <span>ماگ حرارتی</span>
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
                <div className="pm-card">
                    <div className="pm-card-pic">
                        <img src={data[0].picture}/>
                    </div>
                    <div className="pm-card-attributes">
                        <div className="pm-card-row">
                            <span>نام</span>
                            <span>ماگ حرارتی</span>
                        </div>
                        <div className="pm-card-row">
                            <span>قیمت</span>
                            <span>236000</span>
                        </div>
                        <div className="pm-card-row">
                            <span>موجودی</span>
                            <span> 50</span>
                        </div>
                        <div className="pm-card-row">
                            <span>دسته</span>
                            <span>ماگ حرارتی</span>
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
                <div className="pm-card">
                    <div className="pm-card-pic">
                        <img src={data[0].picture}/>
                    </div>
                    <div className="pm-card-attributes">
                        <div className="pm-card-row">
                            <span>نام</span>
                            <span>ماگ حرارتی</span>
                        </div>
                        <div className="pm-card-row">
                            <span>قیمت</span>
                            <span>236000</span>
                        </div>
                        <div className="pm-card-row">
                            <span>موجودی</span>
                            <span> 50</span>
                        </div>
                        <div className="pm-card-row">
                            <span>دسته</span>
                            <span>ماگ حرارتی</span>
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



            </div>
        </div>
    )
}
export default ProductManager;

