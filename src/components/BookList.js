import Rating from "react-rating";
import starRed from "./assets/red.png";
import starGrey from "./assets/grey.png";
import starGold from "./assets/yellow.png";
import { useState } from "react";
import { getAuthToken } from "../utils/auth";


const BookList = ({ reservations }) => {
    const [showCommentPopup, setShowCommentPopup] = useState(false);
    const [comment, setComment] = useState(false);
    const [showCommentPopupRezId, setShowCommentPopupRezId] = useState(false);
    const [blocked, setBlocked] = useState(false);



    const onRateHandler = async (id, rate) => {
        const token = getAuthToken();

        const response = await fetch(`https://ibook-wesite.onrender.com/sale/${id}`, {
            method: "PUT",
            headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ rating: rate }),
        })
    }


    const changePopupState = (id) => {
     
        setBlocked(false);//block only send bad comment

        setShowCommentPopup(!showCommentPopup);
        setShowCommentPopupRezId(id)
    };

    const submitCommentHandler = async (id) => {
        const token = getAuthToken();
        const comment = document.getElementById(id).value;

        if (containsCurseWords(comment)) {
            setBlocked(true);
            alert("Your comment was blocked");
            setShowCommentPopup(false);
            return;
        }

        const response = await fetch(`https://ibook-wesite.onrender.com/sale/${id}/comment`, {
            method: "PUT",
            headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ comment: comment }),
        })

        const resData = await response.json();//useless(to take the respons, u can print it)


        reservations = reservations.map(rez => {//takes the values
            if (rez._id === id) {
                rez.comment = comment;
                
                return rez;
            } else {
                return rez;
            }
        })
        setShowCommentPopup(false);

    };

    const containsCurseWords = (comment) => {
        const curseWords = ['bad', 'worst'];
        const words = comment.split(' ');
        return words.some(word => curseWords.includes(word.toLowerCase()));
    };



    const onChangeCommentHandler = async (event) => {
        setComment(event.target.value);
    }


    return (
        <>
            <ul  style={{ marginLeft :"8rem",borderTop: '2px solid blue', borderBottom: '2px solid blue', backgroundColor: 'lightblue', paddingTop: '1rem', paddingBottom:"2rem"}}>
                <h1>My rezervations:</h1>
                {
                    reservations.map(rez => {
                        return (
                            <>
                                <li style={{ padding: "8px 16px", borderBottom: "1px solid #ddd", listStyleType: "none" }}>
                                    <p style={{color: "black", fontSize: "1.2em", textDecoration: "none"}}>Country: {rez.tara}, City: {rez.oras}, Surface:{rez.suprafata}, </p>
                                    <p style={{textDecoration:"none",color:"grey"}}>start: {rez.data_start}, end: {rez.data_end}</p>
                                    <p style={{textDecoration:"none",color:"grey"}}>owner: {rez.owner}</p>
                                    <p style={{textDecoration:"none",color:"grey"}}>Total price: {rez.price} {rez.currency} </p>
                                </li>
                                <Rating
                                    placeholderRating={rez.rating}
                                    emptySymbol={
                                        <img src={starGrey} className="icon" />
                                    }
                                    placeholderSymbol={
                                        <img src={starRed} className="icon" />
                                    }
                                    fullSymbol={
                                        <img src={starGold} className="icon" />
                                    }
                                    onChange={(rate) => { onRateHandler(rez._id, rate) }}
                                />


                                <button onClick={() => { changePopupState(rez._id) }}
                                    type="button"
                                    style={{ color: "#f0f0f0" , marginLeft: "30px"}}>
                                    Give comment
                                </button>
                                {showCommentPopup && showCommentPopupRezId === rez._id && <div className="popup">
                                    <div className="popup-inner">
                                        <h2>Leave us a comment</h2>
                                        <textarea
                                            id={rez._id}
                                            onChange={onChangeCommentHandler}
                                            placeholder="Write your opinion here..."
                                            rows={6}
                                            cols={40}
                                        />
                                    </div>
                                    <button onClick={() => { submitCommentHandler(rez._id) }} style={{ color: "green" }}>Submit</button>
                                </div>}

                                {blocked && <p>You are blocked</p>}

                                {rez.comment && (
                                    <div style={{ marginTop: "3px", width: "320px", border: "1px solid #ccc", padding: "8px",backgroundColor:"white", borderRadius:"2px"}}>
                                        <p style={{color:"grey"}}>Your comment:</p>
                                        <div style={{overflow: "auto"}}>{rez.comment}</div>
                                    </div>
                                )}

              

                            </>
                        )
                    })
                }
            </ul >
        </>
    )
}



export default BookList;