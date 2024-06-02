import { useState } from "react";
import { getAuthToken, getUserId } from "../utils/auth";
import { useSubmit } from "react-router-dom";

const UsersList = ({ users }) => {
    const [blockedUsers, setBlockedUsers] = useState([]);
    const submit = useSubmit();

    const handleBlockUser = (userId) => {
        console.log(userId)
        submit({ userId: userId }, { method: "patch" })

    }



    return (
        <ul>
            <h1 style={{marginTop:"3.3rem"}}>Users: </h1>
            {
                users.map((user) => {
                    return (
                        <li key={user._id} style={{ padding: "8px 16px", borderBottom: "1px solid #ddd", listStyleType: "none", borderBottom: '1px solid blue' }}>
                            <div>
                                <h1>{user.name}</h1>
                                <p style={{ textDecoration: "none", color: "grey" }}>{user.email}</p>

                                <div div style={{ border: user.enabled === "0" ? '2px solid grey' : 'none'}}>
                                    <button style={{ backgroundColor: "grey", marginTop:"1rem" }} onClick={() => handleBlockUser(user._id)}>
                                        {user.enabled === "0" ? "Unblock" : "Block"}
                                    </button>
                                    {user.enabled === "0" && <p style={{ color: "grey",marginLeft: '1rem' }}>Blocked</p>}
                                </div>

                            </div>

                        </li>)

                })
            }
        </ul>

    )

}


export default UsersList;