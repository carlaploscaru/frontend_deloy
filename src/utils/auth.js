import { json, redirect } from "react-router-dom";


export const getTokenDuration = () => {
  const storedExpirationDate = localStorage.getItem("expiration");
  const expirationDate = new Date(storedExpirationDate);
  const now = new Date();
  const duration = expirationDate.getTime() - now.getTime();
 
  return duration;
};


export const getAuthToken = () => {
  const token = localStorage.getItem("token");
  const tokenDuration = getTokenDuration();

  if (!token) {
    return null;
  }

  if (tokenDuration < 0) {
    return "EXPIRED";
  }

  return token;
};


const loadMe = async () => {
  //const token = getAuthToken();
  const token = localStorage.getItem("token");
  if (!token) {
    return null;
  }
  const response = await fetch("https://ibook-deploy.onrender.com/user/me", {
    method: "GET",
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  if (!response.ok) {
    throw json(
      {
        message: "Could not fetch my profile data!",
      },
      {
        status: 500,
      }
    );
  } else {
    const resData = await response.json();

    console.log("resData.me", resData.me);
    return resData.me;
  }
};



export const tokenLoader = () => {

  return {
    token: getAuthToken(),
    user: loadMe()
  };
};



export const getUserId = () => {
  const userId = localStorage.getItem("userId");
  if (!userId) {
    return null;
  }

  return userId;
};

export const getIsAdmin = () => {
  const isAdmin = localStorage.getItem("isAdmin");
  if (!isAdmin) {
    return null;
  }
  return isAdmin;
};