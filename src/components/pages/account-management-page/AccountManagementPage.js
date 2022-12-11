// react imports

// react-router-dom imports
import { Link } from "react-router-dom";

// react-bootstrap imports
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

// my components 
import LogInAlert from "../../common-components/LogInAlert";

const AccountManagementPage = ({ currentUser }) => {
    return (
        <>
            {currentUser ? (
                <Container>
                    <h1 className="text-center">Account Management</h1>
                    <Container className="text-center">
                        <Link to={"/seller-management"}>
                            <Button>Manage Seller Account</Button>
                        </Link>
                    </Container>
                </Container>
            )
                : (
                    <LogInAlert />
                )}
        </>


    )
}

export default AccountManagementPage