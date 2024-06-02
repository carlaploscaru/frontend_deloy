import { Form, useActionData, useNavigation } from "react-router-dom";
import classes from "./ProfileForm.module.css";
import { useState } from "react";

const ProfileForm = ({ user }) => {
 
  const navigation = useNavigation();
  const data = useActionData();

  const [showFilePreview, setShowFilePreview] = useState(false);
  const isSubmitting = navigation.state === "submitting";

  const imageChangeHandler = (event) => {
    console.log(event.target.id);
    const file = event.target.files;

    let previewId = "file-preview";

    if (file) {
      const fileReader = new FileReader();
      //console.log("file",file);
      const preview = document.getElementById(previewId);
      fileReader.onload = (event) => {
        preview.setAttribute("src", event.target.result);
      };

      console.log(fileReader);
      if (file[0]) {
        fileReader.readAsDataURL(file[0]);
        setShowFilePreview(true)
      } else {
        preview.setAttribute("src", null);
        setShowFilePreview(false)
      }
    }
  };

  const clearImageFromInput = (event) => {
    console.log("clearimageFromInput");
    console.log(event.target.id);
    const fileInput = document.getElementById(event.target.id);

    let previewId = "file-preview";

    const preview = document.getElementById(previewId);

    preview.setAttribute("src", null);
    fileInput.value = null;
    setShowFilePreview(false)
  };




  


  return (
    <>
      <Form
        method="patch"
        className={classes.form}
        encType="multipart/form-data"
      >
        <h1>Profile management</h1>
        <br></br>
        {data && data.message && <p>{data.message}</p>}
        {data && data.data && (
          <>
            {data.data.map((err) => {
              console.log("---", err);
              return <p key={err.msg}>{err}</p>;
            })}
          </>
        )}
        
        <p>
          {user && user.image && (
            <>
              <img
                height={150}
                width={150}
                src={`https://ibook-deploy.onrender.com/${user.image}`}
              />

            </>
          )}
        </p>
        <p style={{color:"#313030", textDecoration:"none"}}>Email: {user.email}</p>
        <p>
          <label htmlFor="name">Name</label>
          <input id="name" type="text" name="name" defaultValue={user.name} />
        </p>

        <p>
          <label htmlFor="images">Images</label>
          <>
            <input
              id="images"
              type="file"
              name="images"
              onChange={imageChangeHandler}
            />
            <div>
              <img
                src="#"
                height={150}
                width={150}
                alt="Preview Uploaded Image"
                id="file-preview"
                style={{ marginRight: "20px" }}
                hidden={!showFilePreview}
              ></img>
              {showFilePreview && <button
                type="button"
                id="images"
                onClick={clearImageFromInput}
                style={{ color: "green" }}
              >
                Clear
              </button>}
            </div>
          </>
        </p>
        <div className={classes.actions}>
          <button disabled={isSubmitting}>
            {isSubmitting ? "Submitting" : "Save"}
          </button>
        </div>
      </Form>



    </>
  );
};

export default ProfileForm;