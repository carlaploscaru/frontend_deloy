import { redirect } from "react-router-dom";

export const action = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expiration");
  localStorage.removeItem("isAdmin");
  localStorage.removeItem("isOwner");
  localStorage.removeItem("data_start");
  localStorage.removeItem("data_end");
  localStorage.removeItem("userId");

  return redirect("/");
};