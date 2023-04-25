import React from "react";
import '../assets/styles/Gallery.css';
import p1 from '../assets/images/1.jpg';
import p2 from '../assets/images/2.jpg';
import p3 from '../assets/images/3.jpg';
import p4 from '../assets/images/4.jpg';
import p5 from '../assets/images/5.jpg';
import p6 from '../assets/images/6.jpg';
import p7 from '../assets/images/7.png';
import Card from "./Card";
import {useNavigate} from "react-router-dom";
let data =[
    {id:1 ,title:'ماگ حرارتی مدل اول' ,price:'27,000' , picture:p1},
    {id:2 ,title:'ماگ حرارتی مدل دوم' ,price:'410,000' , picture:p2},
    {id:3 ,title:'ماگ حرارتی مدل سوم' ,price:'23000' , picture:p3},
    {id:4 ,title:'ماگ حرارتی مدل چهارم' ,price:'3,600' , picture:p4},
    {id:5 ,title:'ماگ حرارتی مدل پنجم' ,price:'65000' , picture:p5},
    {id:6 ,title:'ماگ حرارتی مدل ششم' ,price:'135,000' , picture:p6},
    {id:7 ,title:'ماگ حرارتی مدل هفتم' ,price:'100,000' , picture:p7},
    {id:8 ,title:'ماگ حرارتی مدل اول' ,price:'27,000' , picture:p1},
    {id:9 ,title:'ماگ حرارتی مدل دوم' ,price:'410,000' , picture:p2},
    {id:10 ,title:'ماگ حرارتی مدل سوم' ,price:'23000' , picture:p3},
    {id:11 ,title:'ماگ حرارتی مدل چهارم' ,price:'3,600' , picture:p4},
    {id:12 ,title:'ماگ حرارتی مدل پنجم' ,price:'65000' , picture:p5},
];

function Gallery(){

    return(
        <section className={'g-container'}>
            {
                data.map((d )=>{
                    return(
                    <Card  key={d.id} price={d.price} picture={d.picture} name={d.title} />
                    )
                })}

        </section>
    )
}
export default Gallery;
