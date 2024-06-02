import starRed from "./assets/red.png";
import starGrey from "./assets/grey.png";
import starGold from "./assets/yellow.png";
import Rating from "react-rating";

const ClientsListForComments = ({ clients }) => {
    return (
        <>
         
            <ul >
            <h3 style={{  marginRight:"32rem"}}>Comments section:</h3>

                {
                    
                    clients.map(rez => {

                        return (
                            <div style={{ borderRadius:"2px", maxWidth:"50rem",  backgroundColor: "#f3fafe", margin: "1px", borderRadius: "2px" }}>
                               
                               {rez.comment && <Rating
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
                                />}
                                 {rez.comment && <p  style={{textDecoration:"none",color:"black",border: '1px solid darkgrey',
                                  backgroundColor: 'white', padding: '1rem', borderRadius:"1px"}}>{rez.comment} --- From user: {rez.client}</p>} 

                            </div>)
                    })

                }
            </ul>

        </>
    )
}

export default ClientsListForComments;