import { Form, NavLink, useRouteLoaderData } from "react-router-dom";
import classes from "./MainNavigation.module.css";
import NewsletterSignup from "./NewsletterSignup";
import { useAuth } from "../contexts/AuthContext";
import { getAccessTokenWithRefreshToken } from "../auth/auth";

function MainNavigation() {
  const { isLoggedIn, logIn, logOut } = useAuth();

  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
              end
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/events"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Events
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/newsletter"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Newsletter
            </NavLink>
          </li>
          {!isLoggedIn ? (
            <li>
              <button onClick={(e) => logIn(e)}>Login</button>
            </li>
          ) : (
            <li>
              <button onClick={(e) => logOut(e)}>Logout</button>
            </li>
          )}
          <li>
            <button onClick={getAccessTokenWithRefreshToken}>New Token</button>
          </li>
        </ul>
      </nav>
      <NewsletterSignup />
    </header>
  );
}

export default MainNavigation;
