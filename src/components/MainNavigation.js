import { Form, NavLink, useRouteLoaderData } from "react-router-dom";
import Icon from "./assets/icon.png";
import classes from "./MainNavigation.module.css";
import { getIsAdmin } from "../utils/auth";
import { getUserId } from "../utils/auth";
import { useState } from "react";

const MainNavigation = ({ ownerId, user }) => {
  const { token } = useRouteLoaderData("root");
  const isAdmin = getIsAdmin();
  const userId = getUserId();


  const [isOpen, setIsOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleMenuClose = () => {
    setIsOpen(false);
  };


  return (
    <header className={classes.header}>
      <img src={Icon} className={classes.icon} />
      <nav>
        <ul className={classes.list}>
          <div className={classes.list1}>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Home
            </NavLink>

            {isAdmin === "true" && token && (
              <li>
                <NavLink
                  to="/management"
                  className={({ isActive }) =>
                    isActive ? classes.active : undefined
                  }
                >
                  Managemant
                </NavLink>
              </li>
            )}
            {!token && (
              <NavLink
                to="/auth?mode=login"
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
              >
                Login
              </NavLink>
            )}
            {token && (
              <li>
                <NavLink
                  to="/properties"
                  className={({ isActive }) =>
                    isActive ? classes.active : undefined
                  }
                >
                  Properties
                </NavLink>
              </li>
            )}
          </div>

          {userId !== null &&
            <div className={classes.list2}>
              <p onClick={handleMenuToggle} style={{ textDecoration: "none", fontSize: "2rem", display: "flex", textAlign: "center", writingMode: " vertical-lr" }} className={classes.menuTrigger}>
                |||
              </p>
              {isOpen && (
                <div className={classes.dropdown}>

                  {token && (
                    <NavLink
                      to="/my-properties"
                      onClick={handleMenuClose}
                      className={classes.menuLink}
                    >
                      My Properties
                    </NavLink>
                  )}
                  

                  
                  <div style={{ display: "flex", alignItems: "center" }}>
                  {token && (
                      <NavLink
                        to="/me"
                        onClick={handleMenuClose}
                        className={classes.menuLink}
                        style={{marginRight:"1rem"}}
                      >
                        Profile
                      </NavLink>
                    )}
                    <p>{user && user.image && (
                      <><img
                        style={{ width: '60px', height: '60px', borderRadius: '50%',marginBottom:"2rem" }}
                        src={`https://ibook-wesite.onrender.com/${user.image}`}
                        alt="User Avatar" />
                      </>)}
                    </p>
                  </div>


                  {token && (
                    <li>
                      <Form action="/logout" method="post"  >
                        <button >Logout</button>
                      </Form>
                    </li>
                  )}

                </div>
              )}
            </div>}

        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;