import React, {useEffect, useState} from "react";
import '../assets/styles/Carosel.css';
import p1 from "../assets/images/p1.jpg";
import p2 from "../assets/images/p2.jpg";
import p3 from "../assets/images/p3.jpg";
import p4 from "../assets/images/p4.jpg";
import p5 from "../assets/images/p5.jpg";
import {GrFormNext,GrFormPrevious} from "react-icons/gr";
import {Simple_get} from "./Utils/RequstSender";
import {Notifier} from "./Utils/Notifier";

const data = [
    {id:0 ,  pic:p1 } ,{id:1 , pic:p2},{id:2 , pic:p3},{id:3 , pic:p4},{id:4 , pic:p5}
];


function Carosel() {
    const [images,setImages] = useState([])


    useEffect(()=>{
        const result = Simple_get('https://hitmug.ir/api/banner/index',false,'','','get',[])
            .then(d=>{
                if (parseInt(d?.[2]) >= 200 && parseInt(d?.[2]) < 300) {
                    setImages(d[0])
                } else {
                    Notifier('danger', 'خطا در دریافت لیست نقش ها')
                }
            })
    },[])

    const [activeSlide , setActiveSlide] = useState(0);
    const goNext = ()=>{
        if(activeSlide<images.length -1 ){
            setActiveSlide(activeSlide+1)
        }
        else {
            setActiveSlide(0)
        }
    }
    const goPrev = ()=>{
        if(activeSlide>0 ){
            setActiveSlide(activeSlide-1)
        }
        else {
            setActiveSlide(images.length-1 )
        }
    }
    // setTimeout(goNext ,3000);


    return (
        <div className={'car-container'}>
            <div className="car-image">
                {
                    images?.map((d,index)=>{
                        return(
                            <img className={`${activeSlide===parseInt(index) ?'active':''}`} key={d.id} src={'https://hitmug.ir/api.hitmug.ir/public/'+d.address} alt={"d.pic"}/>
                        )
                    })
                }
                <img  src={p1} alt={p1}/>

                <button onClick={goNext} className={'next'}><GrFormPrevious/></button>
                <button onClick={goPrev} className={'prev'}><GrFormNext/></button>
            </div>
        </div>
    )
}

export default Carosel;