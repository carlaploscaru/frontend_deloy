import { Suspense } from "react";
import { Await, defer, json, redirect, useLoaderData, useRouteLoaderData } from "react-router-dom"
import { getAuthToken } from "../utils/auth";
import MyPropertyList from "../components/MyPropertyList";
import Footer from "../components/Footer";

const MyPropertiesPage = () => {
  const { properties } = useLoaderData("my-properties");

  return (
    <>
    <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
      <Await resolve={properties}>
        {(loadedProperties) => <MyPropertyList properties={loadedProperties} />}
      </Await>
    </Suspense>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
    <Footer/>
     </>
  );
}

export default MyPropertiesPage;



const loadMyProperties = async (ownerId) => {
  const token = getAuthToken();
  const response = await fetch("https://ibook-wesite.onrender.com/place/owner/" + ownerId, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  if (!response.ok) {
    throw json(
      {
        message: "Could not fetch details for the selected property",
      },
      {
        status: 500,
      }
    );
  } else {
    const resData = await response.json();
    return resData.place;
  }
  
};


export const action = async ({ request }) => {
  const token = getAuthToken();
  const data = await request.formData();
  const propertyid = data.get("id")
  const userId= data.get("userId")


  if(propertyid && propertyid !==''){
  const response = await fetch(`https://ibook-wesite.onrender.com/place/${propertyid}`, {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
  });
  }

  return redirect("/my-properties");
};










export const loader = async ({ request, params }) => {
 // const ownerId = params.ownerId;
  const ownerId = localStorage.getItem("userId");
  const token = getAuthToken();

  if (!token) {
    return redirect("/auth?mode=login");
  }

  return defer({
    properties: loadMyProperties(ownerId),
   
  });
};


  

