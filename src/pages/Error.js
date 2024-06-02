import { useRouteError } from "react-router-dom";
import PageContent from "../components/PageContent";

const ErrorPage = () => {
  const error = useRouteError();

   // console.log(document.location.href.includes('properties/new'));

  let title = "An error occured!";
  let message = "Something went wrong!";

  if (error.status === 500) {
    message = error.data.message;
  }

  if (error.status === 404) {
    title = "Not found!";
    message = "Could not find resurce or page.";
  }

  if(error.status === 403 && document.location.href.includes('properties/new')) {
    title = "Not authorized!";
    message = "Please upgrade your account to Owner Account!";
  }else if(error.status === 403) {
    title = "Not authorized!";
    message = "If you do not own this propery you are not allowed to edit it!";
  }


  return (
    <>
      <PageContent title={title}>
        <p>{message}</p>
      </PageContent>
    </>
  );
};

export default ErrorPage;