import { useRef, useState, useEffect } from "react";
import classes from "./PageContent.module.css";
import emailjs from '@emailjs/browser';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import p1 from "./assets/i1.jpg";
import p2 from "./assets/i2.jpg";
import p3 from "./assets/i3.jpg";
import p4 from "./assets/i4.jpg";
//const dotenv = require("dotenv");
//dotenv.config({ path: ".env" });


const PageContent = ({ title }) => {
  const [emailSent, setEmailSent] = useState(false);
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    const formData = new FormData(form.current);
    const name = formData.get('to_name');
    const email = formData.get('from_name');
    const message = formData.get('message');
    setEmailSent(false);
    if (!name || !email || !message) {
      alert('You must complete every field.');
      return;
    } else {
      emailjs.sendForm('service_gi28jan', 'template_0uz260p', form.current, '7X0njLcHKJuVT9Bo4')
        .then((result) => {
          console.log(result.text);
          setEmailSent(true);
        }, (error) => {
          console.log(error.text);
        });
    };
  }




  const [photos, setPhotos] = useState([
    { id: 1, src: p1, alt: 'Photo 1' },
    { id: 2, src: p2, alt: 'Photo 2' },
    { id: 3, src: p3, alt: 'Photo 3' },
    { id: 4, src: p4, alt: 'Photo 4' },
  ]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % photos.length);
    }, 5000);

    return () => clearInterval(intervalId);
  }, [photos]);



  const handleSliderClick = () => {
    const slider = document.querySelector(`.${classes.slider}`);
    const nextIndex = (activeIndex + 1) % photos.length;
    const offset = nextIndex * slider.offsetWidth;

    slider.scrollTo({
      left: offset,
    });
  };


  const handleClick = () => {
    const targetElement = document.getElementById('questionsId'); 
    const targetOffsetTop = targetElement.offsetTop;
  
    window.scrollTo({
      top: targetOffsetTop,
      behavior: 'smooth' 
    });
  };

  return (
    <>
      <>
        <div className={classes.content}>
        <div className={classes.sliderContainer}>
          <div className={classes.slider} onClick={handleSliderClick}>
            {photos.map((photo, index) => (
              <div
                key={photo.id}
                className={`${classes.slide} ${index === activeIndex ? classes.active : ""
                  }`}
              >
                <img src={photo.src} alt={photo.alt} />
                <div className={classes.bullets}>
                  {photos.map((_, bulletIndex) => (
                    <span
                      key={bulletIndex}
                      className={`${classes.bullet} ${bulletIndex === index ? classes.active : ""
                        }`}
                      onClick={() => setActiveIndex(bulletIndex)}
                    ></span>
                  ))}
                </div>
              </div>
            ))}

          </div>

          <div className={classes.overlay}>
              <div className={classes.overlayContent}>
                <h1 style={{fontSize:"50px"}}>Welcome to our website destined for booking places to live in. </h1>
                <br></br>
                <h2>If you have any questions do not hesitate to ask us!</h2>
                <button style={{backgroundColor:"#0056b3",fontSize:"25px", padding:"2rem"}}className={classes.overlayButton} onClick={handleClick}>Ask a question </button>
              </div>
            </div>
          </div>
        </div>



      
         


        <h1 style={{ display: "flex", justifyContent: "center" }}>Book your dream place</h1>
        <div className={classes.styledBox}><p>Our page is destined to give a friendly environment for all kinds of needs regarding moving
          or traveling.</p></div>

        <div className={classes.styledBox}>
          <p className={classes.text_right}>The users in need for places to stay in can surf our website to find the most
            comforting and suitable accommodation for them for a good price and a lot of utilities incorporated.</p></div>

        <div className={classes.styledBox}><p>Welcome to our page!</p></div>

        <div className={classes.styledBox}>
          <p className={classes.text_right}>For any questions don'd hasitate to ask us in the form nnderneath.</p></div>
      </>


      <div id="questionsId" style={{ textAlign: "center" }} className={classes.content_questions}>
        <h2 style={{ textAlign: "center" }}>Questions </h2>
        <form ref={form} onSubmit={sendEmail} className={classes.form}>
          <div className={classes.formGroup}>
            <p>Name:</p>
            <input type="text" name="to_name" />
          </div>
          <div className={classes.formGroup}>
            <p>Email:</p>
            <input type="email" name="from_name" />
          </div>
          <div className={classes.formGroup}>
            <p>Message:</p>
            <textarea name="message" />
          </div>

          <div className={classes.formGroup}>
            <input style={{ color: "black", border: "-moz-initial" }} className={classes.submitButton} type="submit" value="Send" />
            {emailSent && <Popup modal nested open={emailSent}>
              {close => (
                <div className='modal'>
                  <div className='content'>Message Sent Successfully!</div>
                  <button style={{ color: "black" }} onClick={() => close()}>Close</button>
                </div>
              )}
            </Popup>}
          </div>

        </form>


        <h2>Follow Us</h2>
        <div className={classes.follow}>
          <p>Name: Ploscaru Carla</p>
          <p>Instagram: <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" >@BinstagramB</a></p>
          <p>Facebook: <a href="https://www.facebook.com/?locale=ro_RO" target="_blank" rel="noopener noreferrer">@BfacebookB</a></p>
          <p>Twitter: <a href="https://twitter.com/i/flow/login" target="_blank" rel="noopener noreferrer">@BtwitterB</a></p>
          <p>Tiktok: <a href="https://www.tiktok.com/login?enter_from=live_center&enter_method=redirect&lang=en&redirect_url=https%3A%2F%2Flivecenter.tiktok.com" target="_blank" rel="noopener noreferrer">@BtiktokB</a></p>
        </div>
      </div>

    </>
  );
};

export default PageContent;
