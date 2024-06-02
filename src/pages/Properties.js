import { Suspense } from "react";
import { Await, defer, json, redirect, useLoaderData, useRouteLoaderData } from "react-router-dom"
import PropertyList from "../components/PropertyList";
import { getAuthToken } from "../utils/auth";
import Footer from "../components/Footer";
import { useState } from "react";

const PropertiesPage = () => {
  const { properties } = useLoaderData();

  return (
    <>
  
    <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
      <Await resolve={properties}>
        {(loadedProperties) => <PropertyList properties={loadedProperties} />}
      </Await>
    </Suspense>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
    <Footer/>
</>
  );
}



const loadProperties = async (filterArray) => {



  const token = getAuthToken();
  let response;
  if (Object.keys(filterArray).length === 0) {
    response = await fetch(`https://ibook-deploy.onrender.com/place?itemsperpage=${filterArray["itemsperpage"]}&page=${filterArray["page"]}`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  } else {
    response = await fetch(
      `https://ibook-deploy.onrender.com/place?itemsperpage=${filterArray["itemsperpage"]}&page=${filterArray["page"]}&category=${filterArray["category"]}&tara=${filterArray["tara"]}&oras=${filterArray["oras"]}&data_start=${filterArray["data_start"]}&data_end=${filterArray["data_end"]}`,
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
  }

  if (!response.ok) {
    throw json({ message: "Could not fetch properties" }, { status: 500 });
  } else {
    const resData = await response.json();

 

    return resData;
  }
};

export function loader({ request }) {

  let cleanFilterArray = {};
  if (request.url.includes("?")) {
    const paramsFilterArray = request.url
      .split("//")[1]
      .split("/")[1]
      .split("?")[1]
      .split("&");
    paramsFilterArray.forEach((element) => {
      const elementArray = element.split("=");
      console.log(elementArray);
      cleanFilterArray[elementArray[0]] = elementArray[1];
    });
  }

  const token = getAuthToken();
  if (!token) {
    return redirect('/auth?mode=login');
  }

  return defer({//pt Suspense de sus
    properties: loadProperties(cleanFilterArray),
  });
}


export default PropertiesPage;