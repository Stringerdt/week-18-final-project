// react-router-dom imports
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";

// react-bootstrap imports
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

// my pages
import Header from "../components/root-components/Header";
import Footer from "../components/root-components/Footer";

const Root = ({ isLoggedIn, currentUser }) => {

    return (
        <div className="main-container">
            <div className="content-wrap">
                <Header />
                <div className="text-center my-3">
                    <Link to={"/"}>
                        <Button>Return Home</Button>
                    </Link>
                </div>
                {isLoggedIn ? (
                    <Container className="text-center">
                        <p>Welcome, {currentUser.username}
                            <Link to={"account-management"}>
                                <span className="ms-3">Manage Account</span>
                            </Link>
                            <Link to={"/cart"}>
                                <span className="ms-3">Cart</span>
                            </Link>
                        </p>
                    </Container>
                ) : (
                    <Container>
                        <p className="text-center">Not Logged In,
                            <Link to={"/log-in"}>
                                <span className="ms-1">Log In</span>
                            </Link>
                            <Link to={"/cart"}>
                                <span className="ms-3">Cart</span>
                            </Link>
                        </p>
                    </Container>
                )}
                <div className="content border p-3 m-3">
                    <Outlet />
                </div>
                <Footer />
            </div>
        </div >

    )
}

export default Root;