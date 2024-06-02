import starRed from "./assets/red.png";
import starGrey from "./assets/grey.png";
import starGold from "./assets/yellow.png";
import Rating from "react-rating";
import { isDisabled } from "@testing-library/user-event/dist/utils";
import { useState } from "react";
import { getAuthToken } from "../utils/auth";
import { redirect, useSubmit } from "react-router-dom";

const CategoryList = ({ categories }) => {
    const [showForm, setShowForm] = useState(false);
    const [newCategory, setNewCategory] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedCategoryName, setSelectedCategoryName] = useState("");
    const submit = useSubmit();


    const onChangeCategoryHandler = (event) => {
        setNewCategory(event.target.value)
    }

    const submitCategoryHandler = async (id) => {
        const token = getAuthToken();

        const response = await fetch(`https://ibook-deploy.onrender.com/category`, {
            method: "POST",
            headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ title: newCategory }),
        })

        categories.push(await response.json());//auto load(rerender), for geting id for delete and edit
        setShowForm(false);

    };


    const deleteCategoryHandler = async (id) => {
        const proceed = window.confirm("Are you sure?");

        if (proceed) {
            submit({ id: id }, { method: "delete" });
        }
    }

    const editCategoryHandler = async () => {
        submit({ id: selectedCategory, title: selectedCategoryName }, { method: "patch" })
        setSelectedCategory("")
    }


    return (
        <>
            <ul style={{marginLeft:"4rem"}}>
                <h1 style={{marginTop:"3rem"}}>Categories: </h1>

                <button style={{ backgroundColor: "#178ac0" ,marginTop: "0.5rem",marginLeft:"1rem"}}
                    onClick={() => {
                        setShowForm(!showForm)
                    }}>Add new category</button>
                {showForm && (<>
                    <input style={{marginLeft:"5px"}} name="title" id="title" onChange={onChangeCategoryHandler} ></input>
                    <button onClick={() => { submitCategoryHandler() }} style={{ color: "black", marginLeft:"5px"}}>Submit</button>
                </>)}
                
                {
                    categories.map((cat) => {

                        return (
                            <li style={{ padding: "8px 16px", borderBottom: "1px solid blue", listStyleType: "none",marginTop:"3rem" }}>
                                {cat._id !== selectedCategory && <div style={{border: '1px solid grey', padding:"1rem", borderRadius:"3px"}}> {cat.title}</div>}
                                {cat._id === selectedCategory && <div><input id="category" type="text" name="category" style={{fontSize:"17px"}}
                                    value={selectedCategoryName} onChange={(event) => { setSelectedCategoryName(event.target.value) }} />{" "}
                                    <button style={{ color: "black", marginTop:"2px" }} onClick={editCategoryHandler}>Submit</button>{" "}
                                </div>}
                                <button style={{ backgroundColor: "green" ,marginTop:"1rem" }} onClick={() => { setSelectedCategoryName(cat.title); setSelectedCategory(cat._id); }}>Edit</button>
                                <button style={{ backgroundColor: "orange" ,marginLeft: "20px"}} onClick={() => { deleteCategoryHandler(cat._id) }}>Delete</button>

                            </li>)
                    })

                }
             
            </ul>

        </>
    )
}

export default CategoryList;