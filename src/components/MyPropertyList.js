import { Form, Link, NavLink, useSearchParams, useSubmit } from "react-router-dom";
import classes from "./PropertyList.module.css";
import Rating from "react-rating";
import starRed from "./assets/red.png";
import starGrey from "./assets/grey.png";
import starGold from "./assets/yellow.png";


const MyPropertyList = ({ properties }) => {
  const submit = useSubmit();

  const startDeleteHandler = (id) => {
    const proceed = window.confirm("Are you sure?");

    if (proceed) {
      console.log("okeyy",properties._id)
      submit({ id: id }, { method: "delete" });
      console.log("okeyy2")
    }
  };

 

  return (
    <>
    <header>
    <nav>
      <ul className={classes.header}>
        <nav className={classes.list}>
          <li className={classes.new_property}>
            <NavLink
              to="/properties/new"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
              end
              style={{color:"black"}}
            >
              New Property
            </NavLink>
          </li>
          </nav>
        </ul>
      </nav>
    </header>
    
          <div className={classes.propertiesPage}>
            <div className={classes.properties}>

              <h1 style={{marginBottom:"3rem"}}>My Properties</h1>

              <ul className={classes.list}>
                {properties.map((property) => (
                  <li key={property.id} className={classes.item}>
                    {
                      <>
                        <img
                          src={`https://ibook-deploy.onrender.com/${property.image[0]}`}
                          alt={property.title}
                        ></img>
                        <div style={{ color: 'white' }} className={classes.content}>
                          <h2 >  {property.title}</h2>
                          <p>Country:  {property.tara}, City:  {property.oras},Street:  {property.strada}, Surface:  {property.suprafata}</p>{/* <time>{property.oras}</time> */}
                          <h2 >Price:  {property.price}  {property.currency}</h2>

                          <Rating
                            placeholderRating={property.rating}
                            emptySymbol={
                              <img src={starGrey} className="icon" style={{ width: '20px', height: '20px' }} />
                            }
                            placeholderSymbol={
                              <img src={starRed} className="icon" style={{ width: '20px', height: '20px' }} />
                            }
                            fullSymbol={
                              <img src={starGold} className="icon" style={{ width: '20px', height: '20px' }} />
                            }
                            readonly={true}
                          />
                          <br></br>
                          <br></br>
                          <br></br>
                          <div className={classes.buttonContainer}>
                            <Link style={{ color: 'black', marginLeft:'1rem', backgroundColor:"green", padding:"8px",paddingLeft:"1rem", textAlign:"center"}} to={`/properties/${property._id}/edit`}>Edit</Link>
                            <button style={{ color: 'black' }} onClick={() => startDeleteHandler(property._id)}>Delete</button>
                          </div>
                        </div>



                      </>
                    }
                  </li>
                ))}
              </ul>
            </div>

          </div>
          </>
          );
};

          export default MyPropertyList;

