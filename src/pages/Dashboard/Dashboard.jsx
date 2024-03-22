import CoachDashboard from "./CoachDashboard"
import UserDashboard from "./UserDashboard"


const Dashboard = () => {
    const userDoc = JSON.parse(localStorage.getItem("user-info"));


    return (
        <div>
            {userDoc.userType === "coach" ? (
                <CoachDashboard />
            ) : (
                <UserDashboard />
            )}
        </div>
    );
};

export default Dashboard