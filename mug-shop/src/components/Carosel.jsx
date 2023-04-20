import React, {useState} from "react";
import '../assets/styles/Carosel.css';
import p1 from "../assets/images/p1.jpg";
import p2 from "../assets/images/p2.jpg";
import p3 from "../assets/images/p3.jpg";
import p4 from "../assets/images/p4.jpg";
import p5 from "../assets/images/p5.jpg";
import {GrFormNext,GrFormPrevious} from "react-icons/gr";

const data = [
    {id:0 ,  pic:p1 } ,{id:1 , pic:p2},{id:2 , pic:p3},{id:3 , pic:p4},{id:4 , pic:p5}
];


function Carosel() {

    const [activeSlide , setActiveSlide] = useState(0);
    const goNext = ()=>{
        if(activeSlide<data.length -1 ){
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
            setActiveSlide(data.length-1 )
        }
    }
    // setTimeout(goNext ,3000);


    return (
        <div className={'car-container'}>
            <div className="car-image">
                {
                    data.map((d)=>{
                        return(
                            <img className={`${activeSlide===d.id ?'active':''}`} key={d.id} src={d.pic} alt={d.pic}/>
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