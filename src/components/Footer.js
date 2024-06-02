import React from "react";
import classes from "./Footer.module.css";

const Footer = () => {
    return (
        <footer id="footer"  className={classes.footer} >
            <div className={classes.container} >
                <div className={classes.row} >
                    <div className={classes.column} >
                        <h4>Booking Site</h4>
                        <p> Telefon: +40771224970 </p>
                        <p> E-mail: office@rezervari.ro </p>
                        <p> Address: Romania,Timisoara</p>
                    </div>
                    <div className={classes.column} >
                        <h4 >Information</h4>
                        <div>
                            <a href="#" >About Us</a>
                            <a href="#" >Terms and Conditions</a>
                        </div>
                    </div>
                    <div className={classes.column} >
                        <h4>Account</h4>
                        <div >
                            <a href="#">My Account</a>
                            <a href="#">Booking History</a>
                            <a href="#">My properties</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
