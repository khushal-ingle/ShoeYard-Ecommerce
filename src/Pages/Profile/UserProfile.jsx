export const UserProfile = ({ user }) => {
    return (
        <div className="user-profile-details">
            <div className="profile-heading">
                <header>Profile Details</header>

            </div>
            <div className="profile-details">
                <ul>
                    <li>
                        <h4>First Name</h4>
                        <p>{user?.firstName}{" "}{ user?.lastName}</p>
                    </li>
                    <li>
                        <h4>Email</h4>
                        <p>{user?.email}</p>
                    </li>
                </ul>
            </div>
        </div>
    )
}