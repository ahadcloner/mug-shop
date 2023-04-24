import React from "react";
import "../assets/styles/ProductDetail.css";
import p1 from "../assets/images/1.jpg";
import p2 from "../assets/images/2.jpg";
import p3 from "../assets/images/3.jpg";
import p4 from "../assets/images/4.jpg";
import p5 from "../assets/images/5.jpg";
import p6 from "../assets/images/6.jpg";
import p7 from "../assets/images/7.png";
import { BiSend } from "react-icons/bi";
import { IoMdAdd } from "react-icons/io";
import { AiOutlineMinus } from "react-icons/ai";
import AOS from 'aos';
import 'aos/dist/aos.css';
import {useParams} from "react-router-dom";
let data = [
  { id: 1, title: "ماگ حرارتی مدل اول", price: "27,000", picture: p1 },
  { id: 2, title: "ماگ حرارتی مدل دوم", price: "410,000", picture: p2 },
  { id: 3, title: "ماگ حرارتی مدل سوم", price: "23000", picture: p3 },
  { id: 4, title: "ماگ حرارتی مدل چهارم", price: "3,600", picture: p4 },
  { id: 5, title: "ماگ حرارتی مدل پنجم", price: "65000", picture: p5 },
  { id: 6, title: "ماگ حرارتی مدل ششم", price: "135,000", picture: p6 },
  { id: 7, title: "ماگ حرارتی مدل هفتم", price: "100,000", picture: p7 },
  { id: 8, title: "ماگ حرارتی مدل اول", price: "27,000", picture: p1 },
  { id: 9, title: "ماگ حرارتی مدل دوم", price: "410,000", picture: p2 },
  { id: 10, title: "ماگ حرارتی مدل سوم", price: "23000", picture: p3 },
  { id: 11, title: "ماگ حرارتی مدل چهارم", price: "3,600", picture: p4 },
  { id: 12, title: "ماگ حرارتی مدل پنجم", price: "65000", picture: p5 },
];

function ProductDetail() {
  const index = useParams();
  console.log('od is ',index)
  let product = data.find((d)=>d.id===parseInt(index.id))
  return (
    <section className={"pd-container"}>
      <div className="pd-top">
        <div  className="pd-top-left">
          <div className="row-correcter">
            <div  className="pd-top-left-table">
              <table>
                {/* {[1, 2, 3, 4, 5, 6].map((item, index) => { */}
                {/* return ( */}
                <tr>
                  <td>رنگ</td>
                  <td>مشکی</td>
                </tr>
                <tr>
                  <td>مدل</td>
                  <td>داستان</td>
                </tr>
                <tr>
                  <td>ظرفیت</td>
                  <td>300 سی سی</td>
                </tr>
                <tr>
                  <td>اندازه</td>
                  <td>متوسط</td>
                </tr>
                <tr>
                  <td>تعداد</td>
                  <td>
                    <button>
                      <AiOutlineMinus />
                    </button>
                    <span>1</span>
                    <button>
                      <IoMdAdd />
                    </button>
                  </td>
                </tr>

                {/* ); */}
                {/* })} */}
              </table>
            </div>
            <div className="pd-top-left-addtocard">
              <div className="addtocard-middle-item">
                <span>نام محصول</span>
                <span>{product.title}</span>
              </div>
              <div className="addtocard-middle-item">
                <span>امتیاز کاربران</span>
                <span>4.2</span>
              </div>
              <div className="addtocard-middle-item price-bold">
                <span>قیمت محصول</span>
                <span className="theme-color">{product.price}</span>
              </div>
              <div className="addtocard-bottom">
                <button>افزودن به سبد خرید</button>
              </div>
            </div>
          </div>
        </div>
        <div className="pd-top-right">
          <div className="pd-product-image">
            <div className="pd-image-main">
              <img src={product.picture} />
            </div>
            <div className="pd-image-album">
              <img src={p2} />
              <img src={p3} />
              <img src={p2} />
              <img src={p3} />
              <img src={p2} />
            </div>
          </div>
        </div>
      </div>
      <div  className="pd-bottom">
        <div className="pd-comments-title">
          <h2>نظرات کاربران</h2>
        </div>
        <div className="pd-comments-input">
          <input type={"text"} placeholder={"نظری بنویسید "} />
          <button>
            <BiSend />
          </button>
        </div>
        <div  className="pd-comments-comments">
          <div  className="pd-comment-card">
            <div className="pd-comment-top">
              <h3>احد میرحبیبی</h3>
            </div>
            <div className="pd-comment-body">
              <p>
                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
                استفاده از طراحان گرافیک است.
              </p>
            </div>
            <div className="pd-comment-top">
              <h3>احد میرحبیبی</h3>
            </div>
            <div className="pd-comment-body">
              <p>
                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
                استفاده از طراحان گرافیک است.
              </p>
            </div>
            <div className="pd-comment-top">
              <h3>احد میرحبیبی</h3>
            </div>
            <div className="pd-comment-body">
              <p>
                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
                استفاده از طراحان گرافیک است.
              </p>
            </div>
            <div className="pd-comment-top">
              <h3>احد میرحبیبی</h3>
            </div>
            <div className="pd-comment-body">
              <p>
                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
                استفاده از طراحان گرافیک است.
              </p>
            </div>
            <div className="pd-comment-top">
              <h3>احد میرحبیبی</h3>
            </div>
            <div className="pd-comment-body">
              <p>
                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
                استفاده از طراحان گرافیک است.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default ProductDetail;
