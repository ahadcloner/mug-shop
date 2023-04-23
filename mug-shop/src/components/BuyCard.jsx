import React from "react";
import '../assets/styles/BuyCard.css'
import CardProduct from "./CardProduct";
import p1 from "../assets/images/1.jpg";
import p2 from "../assets/images/2.jpg";
import p3 from "../assets/images/3.jpg";
import p4 from "../assets/images/4.jpg";
import p5 from "../assets/images/5.jpg";
import p6 from "../assets/images/6.jpg";
import p7 from "../assets/images/7.png";

let data = [
    {id: 1, title: 'ماگ حرارتی مدل اول', price: '27,000', picture: p1},
    {id: 2, title: 'ماگ حرارتی مدل دوم', price: '410,000', picture: p2},
    {id: 3, title: 'ماگ حرارتی مدل سوم', price: '23000', picture: p3},
    {id: 4, title: 'ماگ حرارتی مدل چهارم', price: '3,600', picture: p4},
    {id: 5, title: 'ماگ حرارتی مدل پنجم', price: '65000', picture: p5},
    {id: 6, title: 'ماگ حرارتی مدل ششم', price: '135,000', picture: p6},
    {id: 7, title: 'ماگ حرارتی مدل هفتم', price: '100,000', picture: p7},
    {id: 8, title: 'ماگ حرارتی مدل اول', price: '27,000', picture: p1},
    {id: 9, title: 'ماگ حرارتی مدل دوم', price: '410,000', picture: p2},
    {id: 10, title: 'ماگ حرارتی مدل سوم', price: '23000', picture: p3},
    {id: 11, title: 'ماگ حرارتی مدل چهارم', price: '3,600', picture: p4},
    {id: 12, title: 'ماگ حرارتی مدل پنجم', price: '65000', picture: p5},
];


function BuyCard() {
    return (
        <section className={'bc-container'}>
            <div  className="bc-cards">
                {
                    data.map((d) => {
                        return (
                            <CardProduct   key={d.id} picture={d.picture} title={d.title} price={d.price}/>
                        )
                    })
                }
            </div>
            <div  className="bc-factor">
                <div  className="bc-factor-info">
                    <div className="info-row">
                        <span>تعداد اقلام</span>
                        <span>5</span>
                    </div>
                    <div className="info-row">
                        <span>تخفیف</span>
                        <span>0</span>
                    </div>
                    <div className="info-row">
                        <span>هزینه ارسال</span>
                        <span>3,725,650</span>
                    </div>
                    <div className="info-row">
                        <span className={'special'}>جمع فاکتور</span>
                        <span className={'special theme-color'}>3,725,650</span>
                    </div>
                </div>
                    <div className="bc-factor-send">
                        <form >
                            {/*<div className="form-row">*/}
                            {/*    <select name="state" id="state">*/}
                            {/*        <option value="1">استان</option>*/}
                            {/*        <option value="1">کرمان</option>*/}
                            {/*        <option value="2">تهران</option>*/}
                            {/*        <option value="3">مشهد</option>*/}
                            {/*        <option value="4">اصفهان</option>*/}
                            {/*    </select>*/}
                            {/*    <select name="state" id="state" >*/}
                            {/*        <option value="1">شهر</option>*/}
                            {/*        <option value="1">کرمان</option>*/}
                            {/*        <option value="2">تهران</option>*/}
                            {/*        <option value="3">مشهد</option>*/}
                            {/*        <option value="4">اصفهان</option>*/}
                            {/*    </select>*/}
                            {/*</div>*/}
                            {/*<div className="form-row">*/}
                            {/*    <textarea name="address" id="address"*/}
                            {/*    placeholder={"خیابان - کوچه - پلاک - کدپستی"}>*/}
                            {/*    </textarea>*/}
                            {/*</div>*/}
                            {/*<div className="form-row">*/}
                            {/*    <input type="text" placeholder={'نام و نام خانوادگی گیرنده'}/>*/}
                            {/*    <input className={"reverse-align"} type="text" placeholder={"09123456789"}/>*/}
                            {/*</div>*/}
                            <div className="form-row">
                             <button>ثبت سفارش</button>
                            </div>

                        </form>
                    </div>
                </div>
        </section>
)
}
export default BuyCard;