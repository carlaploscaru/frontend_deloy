import { Link, useLocation, useSubmit } from "react-router-dom";
import classes from "./PropertyItem.module.css";
import { getUserId } from "../utils/auth";
import { useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules';
import { useEffect } from "react";

const PropertyItem = ({ property, clients }) => {
const location = useLocation();
const queryParams = new URLSearchParams(location.search);
console.log("fffffffff22222222222222", clients)
const updateData =() => {
    localStorage.setItem('data_start', queryParams.get('data_start'));
    localStorage.setItem('data_end', queryParams.get('data_end'));
};

  // const submit = useSubmit();
  const userId = getUserId();

  // const startDeleteHandler = () => {
  //   const proceed = window.confirm("Are you sure?");

  //   if (proceed) {
  //     submit(null, { method: "delete" });
  //   }
  // };

  let showButtons = true;
  if (window.location.href.includes("book")) {
    showButtons = false;
  }


  const [showFrame, setShowFrame] = useState(false);
  const openExeFile = () => {
   // setShowFrame(true);
   setShowFrame(prevState => !prevState);
  };



  return (
    <article className={classes.property}>
      {userId && (userId === property.owner.id) && showButtons && <p style={{ color: "grey", textDecoration: "none" }}>This is your property</p>}
      


      <div style={{ position: 'relative' }}>
        <Swiper
          effect={'coverflow'}
          grabCursor={true}
          centeredSlides={true}
          loop={true}
          slidesPerView={'auto'}
          coverflowEffect={{rotate: 0, depth: 500, modifier: 5}}
          pagination={{ el: '.swiper-pagination', clickable: true }}
          navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
            clickable: true,
          }}
          modules={[EffectCoverflow, Pagination, Navigation]}
          className={classes.bullets}
        >
          {property.image && property.image.map((img, index) => (
            <SwiperSlide key={index}>
              <div>
                <img width={300} height={300} style={{ margin: "10px" }} src={`https://ibook-deploy.onrender.com/${img}`} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div >
          <div style={{ paddingRight: '500px' }} className="swiper-button-prev">
            <ion-icon name="arrow-back-outline"></ion-icon>
          </div>
          <div style={{ paddingLeft: '100px' }} className="swiper-button-next">
            <ion-icon name="arrow-forward-outline"></ion-icon>
          </div>
          
        </div>
      </div>





      <div>
        <button style={{ color: "black", backgroundColor: "#a4ddf4", marginBottom:"5px"}} onClick={openExeFile}>Open House Tour</button>
        {showFrame && (
          <div style={{ width: '800px', height: '600px', border: '1px solid grey'}}>
            <iframe title="House Tour" src={`http://localhost/testvirtualtur/`} width="100%" height="100%"  />
          </div>
        )}
      </div>




      <br></br>
      <div style={{ border: "1px solid grey", padding: "10px", backgroundColor: "#f3fafe", margin: "1px", borderRadius: "2px" }}>
        <h1>{property.title}</h1>
        <h3>Country:  {property.tara}, City:  {property.oras},Street:  {property.strada}, Surface:  {property.suprafata}</h3>{/* <time>{property.oras}</time> */}
        <h3 >Price:  {property.price}  {property.currency}</h3>
        {/* <p >Owner:  {property.owner}  </p> */}
        <h3>Owner: {property.owner.name}</h3>
        {/* <h2 >Category  {property.category}</h2> */}
        <h3> Category: {property.category.title}</h3>
      </div>

      {/* {
        property.image && property.image.map(img => <img width={300} height={300} style={{margin :"10px"}}src={`http://localhost:8000/${img}`} />)
      } */}

     


      {<menu className={classes.actions}>
        {/* {userId && (userId === property.owner.id) && showButtons && <Link to="edit">Edit</Link>}
        {userId && (userId === property.owner.id) && showButtons && <button onClick={startDeleteHandler}>Delete</button>} */}
        {showButtons && <Link onClick={() => updateData()} to={'book'} style={{ backgroundColor: "#f17318", padding: "1rem", borderRadius: "3px", marginRight: "40px", color: "white" }}>Book</Link>}
      </menu>}

     

    </article>
  );
};

export default PropertyItem;
