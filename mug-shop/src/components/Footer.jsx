import React from "react";
import '../assets/styles/Footer.css';
import gurrantee from '../assets/images/award.png'
import support from '../assets/images/support.png'
import send from '../assets/images/truck.png'
import trust from '../assets/images/trust.png'
import enamad from '../assets/images/enamad.png'
import etehadie from '../assets/images/etehadie.png'
import saman from '../assets/images/saman.png'
import zarin from '../assets/images/zarinpal.png'
import {BsInstagram} from "react-icons/bs";
import {MdOutlineEmail} from "react-icons/md";
import {AiOutlineWhatsApp} from "react-icons/ai";

function Footer() {
    // for add to git
    return (
        <div className={'f-container'}>
            <div className="footer-top">
                <img src={gurrantee}/>
                <img src={support}/>
                <img src={send}/>
                <img src={trust}/>
            </div>
            <div className="footer-title">
                <span>قابل اطمینان</span>
                <span>پشتی بانی کامل</span>
                <span>ارسال سریع</span>
                <span>تضمین کیفیت</span>
            </div>
            <div className="sep"></div>
            <div className="footer-links">
                <div className="links-right">

                    <span>در باره ما</span>
                    <span>قوانین سایت</span>
                    <span>سوالات متداول</span>
                    <span>آموزش ها</span>

                </div>
                <div className="links-right">
                    <div className="feeds-input">
                        <span>عضویت در خبرنامه سایت</span>
                        <input type={"text"} placeholder={'ایمیل خود را وارد کنید'}/>
                    </div>
                    <div className="feeds-action">
                        <button>درخواست</button>
                    </div>
                </div>
                <div className="links-right">
                    <div className="icons">
                        <img src={enamad} alt={'permission'}/>
                        <img src={etehadie} alt={'branch'}/>
                    </div>
                    <div className="icons">
                        <img src={saman} alt={'branch'}/>
                        <img src={zarin} alt={'branch'}/>
                    </div>
                </div>
            </div>
            <div className="sep"></div>
            <div className="footer-social">
                <AiOutlineWhatsApp/>
                <MdOutlineEmail/>
                <BsInstagram/>
            </div>
            <div className="footer-rights">
                <span>®All Rights Reserved By HitMug</span>
            </div>
        </div>
    )
}

export default Footer;