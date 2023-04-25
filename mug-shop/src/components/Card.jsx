import React from "react";
import '../assets/styles/Card.css';
import p1 from '../assets/images/2.jpg';
import { CgBookmark } from "react-icons/cg";
import { IoMdAdd } from "react-icons/io";
import { AiOutlineMinus } from "react-icons/ai";
import {Link, useNavigate} from "react-router-dom";

function Card({picture ,price ,name}){
    const navigate = useNavigate();
    return(
        <Link to={'/product-detail/1'}  className={'c-container'}>
            <Link to='/product-detail/1' className={'c-top'}>
                 <img  src={picture} alt={name}/>
            </Link>
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
        </Link>
    )
}
export default Card;