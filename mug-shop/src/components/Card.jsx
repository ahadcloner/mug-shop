import React from "react";
import '../assets/styles/Card.css';
import p1 from '../assets/images/2.jpg';
import { CgBookmark } from "react-icons/cg";
import { IoMdAdd } from "react-icons/io";
import { AiOutlineMinus } from "react-icons/ai";
import {useNavigate} from "react-router-dom";

function Card({picture ,price ,name}){

    return(
        <article > className={'c-container'}>
            <div className={'c-top'}>
                 <img  src={picture} alt={name}/>
            </div>
            <div className={'c-bottom'}>
                <div className={'c-title'}>
                    <h2>{name}</h2>
                </div>
                <div className={'c-price'}>
                    <span>{price}</span>
                    <span>قیمت</span>
                </div>
                <div className={'c-actions'}>
                    <button><CgBookmark/></button>
                    <button><AiOutlineMinus/></button>
                    <button><IoMdAdd/></button>
                </div>
            </div>
        </article>
    )
}
export default Card;