import { useContext, useEffect } from "react"
import { DataContext } from "../../Contexts/DataContext"
import "./Profile.css";
export const Profile = () => {
    const { changeTitle, user } = useContext(DataContext);
    useEffect(() => {
        changeTitle("My Profile")
    }, [changeTitle])

    return (
        <>
            <h1>My Profile</h1>
            <div className="user-profile-details">
                <div className="profile-heading">
                    <header><h3>Profile Details</h3></header>
                    <hr />
                </div>
                <div className="profile-details">
                    <div>
                        <h4>Name</h4>
                        <h4>Email</h4>
                    </div>
                    <div>
                        <p>{user?.firstName}{" "}{user?.lastName}</p>
                        <p>{user?.email}</p>
                    </div>
                </div>
            </div>
        </>
    )
}