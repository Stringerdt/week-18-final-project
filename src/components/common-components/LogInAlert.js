// react imports

// react-router-dom imports
import { Link } from "react-router-dom";

// react-bootstrap imports
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";


const LogInAlert = () => {
    return (
        <Container className="text-center">
            <h3>Please sign in to manage account</h3>
            <Link to={"/log-in"}>
                <Button>Log In</Button>
            </Link>
        </Container>)
}

export default LogInAlert