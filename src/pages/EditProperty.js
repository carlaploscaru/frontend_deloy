import { useRouteLoaderData } from "react-router-dom";
import PropertyForm from "../components/PropertyForm";

const EditPropertyPage = () => {
  // const data = useRouteLoaderData("property-detail");
  const data = useRouteLoaderData("property-detail");
  console.log("hereree")

  return <PropertyForm method="patch" property={data.property} />;
};

export default EditPropertyPage;
