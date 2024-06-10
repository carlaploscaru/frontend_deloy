import {
  Await,
  defer,
  json,
  redirect,
  useActionData,
  useRouteLoaderData,
} from "react-router-dom";
import { getAuthToken } from "../utils/auth";
import { Suspense } from "react";
import ProfileForm from "../components/ProfileForm";
import BookList from "../components/BookList";
import ClientList from "../components/ClientList";
import Footer from "../components/Footer";

const ProfilePage = () => {
  const data = useActionData();
  const { user, reservations,clients } = useRouteLoaderData("me");
  
  return (
    <>
      <div style={{ display: "flex" }}>

        <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
          <Await resolve={clients}>
            {(loadedRezv)=> <ClientList clients={loadedRezv}/>}
          </Await>
        </Suspense>

        <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
          <Await resolve={reservations}>
            {(loadedRezv)=> <BookList reservations={loadedRezv}/>}
          </Await>
        </Suspense>


        <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
          <Await resolve={user}>
            {(loadedUser) => <ProfileForm user={loadedUser} />}
          </Await>
        </Suspense>
      </div>
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
      <br></br>
      <br></br>
      <Footer/>
    </>
  );
};

export default ProfilePage;

export const action = async ({ request, params }) => {
  const token = getAuthToken();

  const aaa = await request.formData();

  const data = Object.fromEntries(aaa);


  const formData = new FormData();

  formData.append("name", data.name);
  formData.append("image", data.images);

  const response = await fetch("https://ibook-wesite.onrender.com/user/me", {
    method: "PATCH",
    headers: {
      Authorization: "Bearer " + token,
    },
    body: formData,
  });

  return response;
};


const loadRezervations = async () => {
  const token = getAuthToken();

  const response = await fetch("https://ibook-wesite.onrender.com/sale", {
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

    console.log(resData.reservations);
    return resData.reservations;
  }

}



const loadClients = async () => {
  const token = getAuthToken();

  const response = await fetch("https://ibook-wesite.onrender.com/sale/clients", {
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

   
    return resData.clients;
  }
};




const loadMe = async () => {
  const token = getAuthToken();

  const response = await fetch("https://ibook-wesite.onrender.com/user/me", {
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

    console.log(resData.me);
    return resData.me;
  }
};

export const loader = async ({ request, params }) => {
  const token = getAuthToken();

  if (!token) {
    return redirect("/auth?mode=login");
  }

  return defer({
    user: loadMe(),
    reservations: loadRezervations(),
    clients: loadClients(),
  });
};