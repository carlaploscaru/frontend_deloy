import { useActionData } from "react-router-dom";
import { useState } from "react";

import React from 'react'
import Styles from './Styles'


import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import { useRouteLoaderData } from "react-router-dom";

const CARD_OPTIONS = {
    iconStyle: "solid",
    style: {
        base: {
            iconColor: "#c4f0ff",
            color: "#00f",
            fontWeight: 500,
            fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
            fontSize: "16px",
            fontSmoothing: "antialiased",
            ":-webkit-autofill": { color: "#fce883" },
            "::placeholder": { color: "#87bbfd" }
        },
        invalid: {
            iconColor: "#ffc7ee",
            color: "#ffc7ee"
        }
    }
}


const CardForm = () => {
    let actionData = useActionData();
    const stripe = useStripe();
    const elements = useElements();
    const [success, setSuccess] = useState(false)


    const propertyData = useRouteLoaderData("property-detail");
    const [formData, setFormData] = useState({
        number: '',
        name: '',
        expiry: '',
        cvc: ''
    });

    const handleReset = () => {
        setFormData({
            number: '',
            name: '',
            expiry: '',
            cvc: ''
        });
        console.log("ok")
    };

  



    const handlePaymentSubmit = async (e) => {
        e.preventDefault()
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement)
        })

        if (!error) {
            try {
                const { id } = paymentMethod
                const response = await axios.post("https://ibook-wesite.onrender.com/sale/payment", {
                    amount: actionData.price,
                    id
                })

                if (response.data.success) {
                    console.log("Successful payment")
                    setSuccess(true)
                }

            } catch (error) {
                console.log("Error", error)
            }
        } else {
            console.log(error.message)
        }
    }


    return (
        <>
         <Styles>
                    {!success ?
                        <form>
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br /><br /><br /><br />
                            <h1>🏁 Enter Card details</h1>
                            <a href="https://dashboard.stripe.com/test/developers">
                                Stripe
                            </a>
                           <div>
                            <iframe
                                className="card2024"
                                src="https://my.spline.design/creditcard-d88eb15d40c59aa8fee2992a1fccf38b/"
                                width={2000}
                                height={450}>
                            </iframe>
                            </div>
                            

                            <div>
                                <h2>Total:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{actionData.price} {propertyData.property.currency}</h2>
                                <li style={{ borderBottom: "1px solid #ddd", listStyleType: "none" }} />
                                <br />
                            </div>
                           

                            <fieldset>
                                <div>
                                    <CardElement options={CARD_OPTIONS} />
                                </div>
                            </fieldset>
                            <div className="buttons">
                                <button type="submit" style={{ backgroundColor: "blue" }} onClick={handlePaymentSubmit}>Pay</button>
                                {/* <button
                                    type="button"
                                    onClick={handleReset}
                                    style={{ backgroundColor: "grey" }}
                                >Reset</button> */}
                            </div>
                            <br />

                        </form>
                        :
                        <div>
                            <h2>You bought a property!</h2>
                        </div>
                    }
            </Styles>
        </>
    )
}

export default CardForm;