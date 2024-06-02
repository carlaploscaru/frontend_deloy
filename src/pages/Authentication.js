import { json, redirect } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import Footer from "../components/Footer";

const AuthenticationPage = () => {

  return <>
  <br></br>
  <br></br>
  <AuthForm />
<p></p>
<br></br>
<br></br>
<br></br>
<br></br>
<br></br>
<br></br>
<br></br>
<br></br>
<br></br>
<br></br>
<br></br>
<br></br>
<br></br>
<br></br>
  <Footer/>
  </>
};


export const action = async ({ request }) => {

  const searchParams = new URL(request.url).searchParams;

  let mode = searchParams.get("mode") || "login";


  if (mode !== "login" && mode !== "signup" && mode !== "reset") {
    throw json({ message: "Unsuported mode." }, { status: 422 });
  }

  const data = await request.formData();

  console.log(data);

  let authData = {
    email: data.get("email"),
    password: data.get("password"),
  };

  if (mode === "signup") {
    authData = {
      name: data.get("name"),
      email: data.get("email"),
      password: data.get("password"),
      repeatPassword: data.get("repeatPassword"),
    };
  }

  if (mode === "reset") {
    authData = {
      email: data.get("email"),
    };
  }

  const response = await fetch("https://ibook-deploy.onrender.com/" + mode, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(authData),
  });

  if (response.status === 422 || response.status === 401) {
    return response;
  }

  if (!response.ok) {
    throw json({ message: "Could not authenticate user." }, { status: 500 });
  }

  const resData = await response.json();
  const token = resData.token;
  const isOwner = resData.isOwner;
  const isAdmin = resData.isAdmin;
  const userId = resData.userId;


  if (mode === "login") {
    localStorage.setItem("token", token);
    localStorage.setItem("isOwner", isOwner);
    localStorage.setItem("isAdmin", isAdmin);
    localStorage.setItem("userId", userId);
  }

  const expiration = new Date();
  expiration.setHours(expiration.getHours() + 1);
  localStorage.setItem("expiration", expiration.toISOString());

  if (mode === "reset") {
    return redirect("/recover-password");
  }

  if (mode === "signup") {
    return redirect("/confirm");
  }

  return redirect("/");
};


export default AuthenticationPage;
