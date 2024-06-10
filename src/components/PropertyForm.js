import { Form, json, redirect, useActionData, useNavigate, useNavigation } from "react-router-dom";
import classes from "./PropertyForm.module.css";
import { getAuthToken } from "../utils/auth";
import { useEffect, useState } from "react";

const PropertyForm = ({ method, property }) => {
  const navigate = useNavigate();
  const navigation = useNavigation();
  const data = useActionData();

  const [categories, setCategories] = useState();
  const [imageInputCounter, setImageInputCounter] = useState([]);
  const [images, setImages] = useState(() => {
    if (property) return property.image;
    else return [];
  });

  const newImageHandler = () => {

    if (imageInputCounter.length < 8) {
      let newCounter = [...imageInputCounter];
      console.log(newCounter)
      newCounter.push(newCounter.length + 1);
      setImageInputCounter(newCounter);
    } else {
    }
  };

  const substractNumberOfImagesToLoad = () => {
    if (imageInputCounter.length > 0) {
      let newCounter = [...imageInputCounter];
      console.log(newCounter);
      newCounter.pop();
      setImageInputCounter(newCounter);
    } else {
    }
  };

  useEffect(() => {
    const token = getAuthToken();

    const getCategories = async () => {
      const response = await fetch("https://ibook-wesite.onrender.com/category", {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      if (!response.ok) {
        throw json({ message: "Could not fetch properties" }, { status: 500 });
      } else {
        const resData = await response.json();

        setCategories(resData.categories);
      }
    };

    getCategories();
  }, [fetch]);

  const isSubmitting = navigation.state === "submitting";

  const cancelHandler = () => {
    navigate("..");
  };


  const clearImageFromInput = (event) => {
    console.log(event.target.id);
    const fileInput = document.getElementById(event.target.id);

    const ident = event.target.id.slice(-1);

    let previewId = "file-preview";

    if (!isNaN(ident)) {
      previewId = previewId + ident;
    }

    const preview = document.getElementById(previewId);

    preview.setAttribute("src", null);
    fileInput.value = null;
  };

  const clearImageFromDatabase = async (event) => {
    console.log(event.target.id.split("\\")[2]);
    console.log(property._id);

    let token = getAuthToken();

    let imageAndPlaceId =
      event.target.id.split("\\")[2] + "separator" + property._id;

    const response = await fetch(
      `https://ibook-wesite.onrender.com/place/image/${imageAndPlaceId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );

    if (!response.ok) {
      throw json({ message: "Could not delete image" }, { status: 500 });
    } else {
      const resData = await response.json();
    }

    if (property && images) {
      let newImages = images.filter((img) => img !== event.target.id);

      setImages([...newImages]);
    }
  };

  const imageChangeHandler = (event) => {
    console.log(event.target.id);
    const file = event.target.files;
    const ident = event.target.id.slice(-1);

    let previewId = "file-preview";

    if (!isNaN(ident)) {
      previewId = previewId + ident;
    }

    if (file) {
      const fileReader = new FileReader();
      console.log(file);
      const preview = document.getElementById(previewId);
      fileReader.onload = (event) => {
        preview.setAttribute("src", event.target.result);
      };

      console.log(fileReader);
      fileReader.readAsDataURL(file[0]);
    }
  };



  return (
    <Form method={method} className={classes.form}
      encType="multipart/form-data">
      {data && data.message && <p>{data.message}</p>}
      {/* {data && data.data && data.data[0].msg && <p>{data.data[0].msg} test</p>} */}
      {data && data.data && (
        <>
          {data.data.map((msg) => {
            //console.log("---", err);
            return <p key={msg}>{msg}</p>;
          })}
        </>
      )}
      <p>
        <p>
          {/* scot required cand fac error handling */}
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            name="title"

            defaultValue={property ? property.title : ""}
          />
        </p>
        <p>
          <label htmlFor="suprafata">Surface</label>
          <input
            id="suprafata"
            name="suprafata"
            type="text"

            defaultValue={property ? property.suprafata : ""}
          />
        </p>
        <p>
          <label htmlFor="tara">Country</label>
          <input
            id="tara"
            type="text"
            name="tara"

            defaultValue={property ? property.tara : ""}
          />
        </p>
        <p>
          <label htmlFor="oras">City</label>
          <input
            id="oras"
            type="text"
            name="oras"

            defaultValue={property ? property.oras : ""}
          />
        </p>

        <p>
          <label htmlFor="judet">Region</label>
          <input
            id="judet"
            type="text"
            name="judet"

            defaultValue={property ? property.judet : ""}
          />
        </p>

        <p>
          <label htmlFor="strada">Street</label>
          <input
            id="strada"
            type="strada"
            name="strada"

            defaultValue={property ? property.strada : ""}
          />
        </p>


        <p>
          <label htmlFor="price">Price</label>
          <input
            id="price"
            type="price"
            name="price"

            defaultValue={property ? property.price : ""}
          />
        </p>

        <p>
          <label htmlFor="currency">Currency</label>
          <select name="currency" id="currency">
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="RON"selected>RON</option>
            <option value="HUF">HUF</option>
          </select>
        </p>


        <p>
          <label htmlFor="category">Category</label>
          <select name="category" id="category">
            {categories &&
              categories.map((category) => {
                console.log(category);
                console.log;
                if (property && property.category._id === category._id) {
                  return (
                    <option value={category._id} selected>
                      {category.title}
                    </option>
                  );
                } else {
                  return <option value={category._id}>{category.title}</option>;
                }
              })}
          </select>
        </p>

        <p>
          {property && images && images.map(img => {
            return (
              <>
                <img
                  height={150}
                  width={150}
                  src={`https://ibook-wesite.onrender.com/${img}`}
                />
                <button
                  type="button"
                  id={img}
                  onClick={clearImageFromDatabase}
                  style={{ color: 'black' , marginLeft:"5px"}}
                >
                  x
                </button>
              </>
            );
          })}
        </p>
        <p>
          <label htmlFor="images">Images (8 images can be selected)</label>
          <>
            <input id="images" type="file" name="images" onChange={imageChangeHandler} />
            <div>
              <img
                src="#"
                height={150}
                width={150}
                alt="Preview Uploaded Image"
                id="file-preview"
                style={{ marginRight: "20px" }}
              ></img>
              <button type="button" id="images" onClick={clearImageFromInput} style={{ color: 'black',backgroundColor: "grey" }}>
                Clear
              </button>
            </div>
          </>

          {imageInputCounter.map((count) => {
            return (
              <>
                <input
                  id={"images" + count}
                  type="file"
                  name={"images" + count}
                  onChange={imageChangeHandler}
                />
                <div>
                  <img
                    src="#"
                    height={150}
                    width={150}
                    alt="Preview Uploaded Image"
                    id={`file-preview` + count}
                    style={{ marginRight: "20px" }}
                  ></img>
                  <button
                    type="button"
                    id={`images` + count}
                    onClick={clearImageFromInput}
                    style={{ color: 'black' }}
                  >
                    Clear
                  </button>
                </div>
              </>
            );
          })}
        </p>
        <button type="button" onClick={newImageHandler} style={{ color: "green", border: "2px solid green", fontSize: "30px", padding: "3px",backgroundColor: "white" }}>+</button>{"  "}
        <button type="button" onClick={substractNumberOfImagesToLoad} style={{width: "26px", color: "red", border: "2px solid red", fontSize: "30px", padding: "3px" ,backgroundColor: "white"}}>-</button>

        <div className={classes.actions}>
          <button style={{ backgroundColor: "grey", textDecoration:"none"}} type="button" onClick={cancelHandler} disabled={isSubmitting}>
            Cancel
          </button>
          <button disabled={isSubmitting} style={{ backgroundColor: "#f17318", textDecoration:"none"}}>
            {isSubmitting ? "Submitting..." : "Save"}
          </button>
        </div>
      </p>
    </Form>
  );
};

export default PropertyForm;

export const action = async ({ request, params }) => {
  const method = request.method;


  const aaa = await request.formData();

  const data = Object.fromEntries(aaa);

  const formData = new FormData();
  formData.append("title", data.title);
  formData.append("suprafata", data.suprafata);
  formData.append("tara", data.tara);
  formData.append("oras", data.oras);
  formData.append("strada", data.strada);
  formData.append("judet", data.judet);
  formData.append("price", data.price);
  formData.append("currency", data.currency);
  formData.append("categoryId", data.category);


  formData.append("image", data.images);
  if (data.images1 !== null) formData.append("image", data.images1);
  if (data.images2 !== null) formData.append("image", data.images2);
  if (data.images3 !== null) formData.append("image", data.images3);
  if (data.images4 !== null) formData.append("image", data.images4);
  if (data.images5 !== null) formData.append("image", data.images5);
  if (data.images6 !== null) formData.append("image", data.images6);
  if (data.images7 !== null) formData.append("image", data.images7);
  if (data.images8 !== null) formData.append("image", data.images8);


  // const propertyData = {
  //   title: data.get("title"),
  //   suprafata: data.get("suprafata"),
  //   tara: data.get("tara"),
  //   oras: data.get("oras"),
  //   judet: data.get("judet"),
  //   strada: data.get("strada"),
  //   categoryId: data.get("category"),
  //   userId: data.get("owner"),
  // };

  let url = "https://ibook-wesite.onrender.com/place";

  if (method === "PATCH") {
    const propertyId = params.propertyId;
    url = "https://ibook-wesite.onrender.com/place/" + propertyId;
  }

  const token = getAuthToken();




  const response = await fetch(url, {
    method: method,
    headers: {
      Authorization: "Bearer " + token,
    },
    body: formData,
  });

  if (response.status === 422 || response.status === 401) {
    return response;
  }

  if (!response.ok) {
    throw json(
      { message: "Could not save property" },
      { status: response.status }
    );
  }

  return redirect("/my-properties");
}