import {
  Form,
  Link,
  useActionData,
  useNavigation,
  useSearchParams,
} from "react-router-dom";
import classes from "./AuthForm.module.css";

const AuthForm = () => {
  const data = useActionData();
  const navigation = useNavigation();
  const [searchParams] = useSearchParams();

  const isLogin = searchParams.get("mode") === "login";
  const isSubmitting = navigation.state === "submitting";
  const passwordRecovery = searchParams.get("mode") === "reset";

console.log(data);

  return (
    <>
      
        <h1 style={{marginLeft: '25%'}}>{isLogin && "Log in"}
          {!isLogin && !passwordRecovery && "Create a new user"}
          {passwordRecovery && "Recover password"}
        </h1>
        <Form method="post" className={classes.form}>
        <div className={classes.form1}>
        {data && data.message && <p style={{color:"black", textDecoration:"none"}}>{data.message}</p>}
        {/* {data && data.data && data.data[0].msg && <p>{data.data[0].msg}</p>} */}
        {data && data.data && (
          <>
            {data.data.map((err) => {
              console.log("---", err);
              return (
                <p key={err.msg} style={{color:"black", textDecoration:"none"}}>{err.msg}</p>
              )
            })}
          </>
        )}
        
        
        {!isLogin && !passwordRecovery && (
          <p>
            <label htmlFor="name">Name</label>
            <input id="name" type="text" name="name" />{/*required(for warning: text complete*/}
          </p>
        )}
        <p>
          <label htmlFor="email">Email</label>
          <input id="email" type="text" name="email" />
        </p>
        {!passwordRecovery && <p>
          <label htmlFor="password">Password</label>
          <input id="password" type="password" name="password" />
        </p>}


        {!isLogin && !passwordRecovery && (
          <p>
            <label htmlFor="repeatPassword">Repeat Password</label>
            <input
              id="repeatPassword"
              type="password"
              name="repeatPassword"

            />
          </p>
        )}
        <div className={classes.actions}>
          <Link to={`?mode=reset`} style={{ color: "black"}}>
            {"Recover password"}
          </Link>
          <Link to={`?mode=${isLogin ? "signup" : "login"}`} style={{ color: "black" }}>
            {isLogin ? "Create new user" : "Login"}
          </Link>
          <button disabled={isSubmitting}>
            {isSubmitting ? "Submitting" : "Save"}
          </button>
        </div>

        </div>
      </Form>
    </>
  );
};

export default AuthForm;
