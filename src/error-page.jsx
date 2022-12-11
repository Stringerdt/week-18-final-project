// react-router-dom imports
import { useRouteError } from "react-router-dom";
import { Link } from "react-router-dom";

// react-bootstrap imports
import Button from "react-bootstrap/Button";

const ErrorPage = () => {
    const error = useRouteError;
    console.log(error);

    return (
        <div className="text-center mt-3">
            <h1>Oops!</h1>
            <p>Sorry, an enexpected error has occurred</p>
            <p>
                <i>{error.statusText || error.message}</i>
            </p>
            <div className="text-center mt-3">
                <Link to={"/"}>
                    <Button>Return Home</Button>
                </Link>
            </div>
        </div>
    )
}

export default ErrorPage;