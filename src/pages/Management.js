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
import CategoryList from "../components/CategoryList";
import UsersList from "../components/UsersList";
import Footer from "../components/Footer";

const ManagementPage = () => {
  const { categories, users } = useRouteLoaderData("management");
 
  

  return (
    <>
      <div style={{ display: "flex" ,gap: "300px"}}>
        <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
          <Await resolve={categories}>
            {(loadedCat) => <CategoryList categories={loadedCat} />}
          </Await>
        </Suspense>


        <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
          <Await resolve={users}>
            {(loadedUs) => <UsersList users={loadedUs} />}
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
      <Footer/>
    </>
  );
};

export default ManagementPage;

export const action = async ({ request, params }) => {
  const token = getAuthToken();
  const data = await request.formData();
  const catid = data.get("id")
  const catTitle = data.get("title")
  const userId= data.get("userId")

  if(userId && userId !==''){
    const response = await fetch(`https://ibook-wesite.onrender.com/user/${userId}`, {
      method: "PATCH",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    })
  }else{
    if (request.method === "PATCH") {
      const response = await fetch(`https://ibook-wesite.onrender.com/category/${catid}`, {
        method: "PATCH",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: catTitle })
      })
    } else {
      const response = await fetch(`https://ibook-wesite.onrender.com/category/${catid}`, {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      })
    }
  }

  return true;
};


const loadCategories = async () => {
  const token = getAuthToken();

  const response = await fetch("https://ibook-wesite.onrender.com/category", {
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

    return resData.categories;
  }

}

const loadUsers = async () => {
  const token = getAuthToken();

  const response = await fetch("https://ibook-wesite.onrender.com/user", {
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
    return resData.users;
    //daca in backend trimit un array atunci aici astept un array asa: return resData
    //daca in backend trimit un obiect {cheie: []} atunci aici astept asa: return resData.cheie
  }

}








export const loader = async ({ request, params }) => {
  const token = getAuthToken();

  if (!token) {
    return redirect("/auth?mode=login");
  }

  return defer({

    categories: loadCategories(),
    users: loadUsers(),

  });
}

