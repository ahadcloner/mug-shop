import React from "react";
import '../assets/styles/ProductGallery.css';
import p1 from '../assets/images/1.jpg';
import p2 from '../assets/images/2.jpg';
import p3 from '../assets/images/3.jpg';
import p4 from '../assets/images/4.jpg';
import p5 from '../assets/images/5.jpg';
import p6 from '../assets/images/6.jpg';
import p7 from '../assets/images/7.png';
import {IoMdAdd} from "react-icons/io";
import {AiOutlineMinus} from "react-icons/ai";
import {CgBookmark} from "react-icons/cg";
import { useNavigate } from "react-router-dom";

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
];

function ProductGallery() {
    const navigate = useNavigate();
    return (
        <div className={'pg-container'}>
            <div className="pg-card-container">
                <div className={'correcter'}>
                    {
                        data.map((d) => {
                            return (
                                <div onClick={()=>navigate('product-detail/'+d.id)} key={d.id} className={'pg-card'}>
                                    <div className="pg-card-image">
                                        <img src={d.picture} alt={d.title}/>
                                    </div>
                                    <div className="pg-card-body">
                                        <div className="pg-card-title">
                                            <h2>{d.title}</h2>
                                        </div>
                                        <div className="pg-card-price">
                                            <span>{d.price}</span>
                                            <span>قیمت</span>
                                        </div>
                                        <div className="pg-card-actions">
                                            <div className={'seprate'}>
                                                <button><CgBookmark/></button>
                                            </div>

                                            <div className={'functional'}>
                                                <button><AiOutlineMinus/></button>
                                                <span>1</span>
                                                <button><IoMdAdd/></button>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default ProductGallery;