import { NavLink } from 'react-router-dom';
import classes from './PropertiesNavigation.module.css'

const PropertiesNavigation=()=>{
    return(
        <header>
        <nav>
          <ul className={classes.header}>
            <nav className={classes.list}>
              <li>
                <NavLink
                  to="/properties"
                  className={({ isActive }) =>
                    isActive ? classes.active : undefined
                  }
                  end
                >
                  All Properties
                </NavLink>
              </li>
              {/* <li>
       
                <NavLink
                  to="/properties/new"
                  className={({ isActive }) =>
                    isActive ? classes.active : undefined
                  }
                  end
                >
                  New Property
                </NavLink>
              </li> */}
            </nav>
          </ul>
        </nav>
      </header>
    )

}

export default PropertiesNavigation;