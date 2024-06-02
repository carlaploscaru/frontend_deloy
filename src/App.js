import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout ,{ loader as profileImageLoader}from "./pages/Root";
import AuthenticationPage, { action as authAction } from "./pages/Authentication";
import HomePage from "./pages/Home";
import ConfirmPage, { action as confirmAction } from "./pages/Confirmation";
import { action as logoutAction } from "./pages/Logout";
import { tokenLoader } from "./utils/auth";
import RecoverPasswordPage, { action as resetAction } from "./pages/RecoverPassword";
import ErrorPage from "./pages/Error";
import PropertiesRootLayout from "./pages/PropertiesRoot";
import PropertiesPage, { loader as propertiesLoader } from "./pages/Properties";
import NewPropertyPage from "./pages/NewProperty";
import { action as manipulatePropertyAction } from "./components/PropertyForm";
import PropertyDetailPage, {
  loader as propertyDetailLoader,
  action as deletePropertyAction
} from "./pages/PropertyDetail";
import EditPropertyPage from "./pages/EditProperty";
import ProfilePage, { loader as userProfileLoader, action as userProfileAction } from "./pages/Profile";
import BookPage, { action as bookAction } from "./pages/Book";
import ManagementPage, { loader as managementLoader, action as managementAction } from "./pages/Management";
import MyPropertiesPage, { loader as MyPropertiesLoader, action as multipleOwnerPropertyAction } from "./pages/MyProperties";


const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    id: "root",
    loader: tokenLoader,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: "/me",
        id: "me",
        element: <ProfilePage />,
        loader: userProfileLoader,
        action: userProfileAction
      },
      {
        path: "/management",
        id: "management",
        element: <ManagementPage />,
        loader: managementLoader,
        action: managementAction
      },
      {
        path: "/my-properties",
        id: "my-properties",
        element: <MyPropertiesPage />,
        loader: MyPropertiesLoader,
        action: multipleOwnerPropertyAction,
       
      },
      {
        path: "properties",
        element: <PropertiesRootLayout />,
        children: [
          {
            index: true,
            element: <PropertiesPage />,
            loader: propertiesLoader,
          },
          {
            path: ":propertyId",
            id: "property-detail",
            loader: propertyDetailLoader,
            children: [
              {
                index: true,
                element: <PropertyDetailPage />,
                //action: deletePropertyAction,
              },
              {
                path: "edit",
                element: <EditPropertyPage />,
                action: manipulatePropertyAction,
                //loader: checkAuthLoader,
              },
              {
                path: "book",
                element: <BookPage />,
                action: bookAction,
              },
            ],
          },
          {
            path: "new",
            element: <NewPropertyPage />,
            action: manipulatePropertyAction,
            // loader: checkAuthLoader,
          },
        ],
      },
      {
        path: "auth",
        element: <AuthenticationPage />,
        action: authAction
      },
      {
        path: "confirm",
        element: <ConfirmPage />,
        action: confirmAction
      },
      {
        path: "recover-password",
        element: <RecoverPasswordPage />,
        action: resetAction
      },
      {
        path: "logout",
        action: logoutAction
      }
    ]
  },
]);


const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
