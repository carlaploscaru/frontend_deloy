import starRed from "./assets/red.png";
import starGrey from "./assets/grey.png";
import starGold from "./assets/yellow.png";
import Rating from "react-rating";
import { isDisabled } from "@testing-library/user-event/dist/utils";

const ClientList = ({ clients }) => {
    return (
        <>
            <ul style={{ marginLeft :"2rem",borderTop: '2px solid blue', borderBottom: '2px solid blue', backgroundColor: 'lightblue', paddingTop: '1rem', paddingBottom:"2rem"}}>
                <h1>My clients: </h1>
                {
                    clients.map(rez => {

                        return (
                            <li style={{ padding: "8px 16px", borderBottom: "1px solid #ddd", listStyleType: "none" }}>
                                <p style={{color: "black", fontSize: "1.2em", textDecoration: "none"}}>Country: {rez.tara}, City: {rez.oras}, Surface:{rez.suprafata}, </p>
                                <p style={{textDecoration:"none",color:"grey"}}>start: {rez.data_start}, end: {rez.data_end}</p>
                                <p style={{textDecoration:"none",color:"grey"}}>clints: {rez.client}</p>
                                <p style={{textDecoration:"none",color:"grey"}}>Total price: {rez.price} {rez.currency}</p>
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
                                    readonly={true}
                                />
                                 {rez.comment && <p  style={{textDecoration:"none",color:"black",border: '1px solid darkgrey',
                                  backgroundColor: 'white', padding: '1rem', borderRadius:"1px"}}>{rez.comment} --- From user: {rez.client}</p>} 

                            </li>)
                    })

                }
            </ul>

        </>
    )
}

export default ClientList;