import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = (props) => {
    // console.log(props.name);

    const navigate = useNavigate();
    const token = sessionStorage.getItem("accessToken");

    if (!token) {
        return <Navigate to={"/api/auth/signin"} />;
    }

    return <div>{props.children}</div>;
};

export default ProtectedRoute;
