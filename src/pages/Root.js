import { Await, Outlet, useLoaderData, useRouteLoaderData, useSubmit } from "react-router-dom";
import MainNavigation from "../components/MainNavigation";
import { useEffect } from "react";
import { getTokenDuration } from "../utils/auth";
import { Suspense } from "react";

const RootLayout = () => {
  const { token } = useLoaderData();
  const { user } = useRouteLoaderData("root");
  const submit = useSubmit();


  useEffect(() => {
    if (!token) {
      return;
    }

    if (token === "EXPIRED") {
      submit(null, { action: "/logout", method: "post" });
      return;
    }

    const tokenDuration = getTokenDuration();

    setTimeout(() => {
      submit(null, { action: "/logout", method: "post" });
    }, tokenDuration);//10000 pt 10 sec
  }, [token]);


  return (
    <>
      <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
        <Await resolve={user}>
          {(loadedUser) => <MainNavigation user={loadedUser} />}
        </Await>
      </Suspense>
      {/* <MainNavigation /> */}
      <main>
        <Outlet />
      </main>
    </>
  );
};



export default RootLayout;

