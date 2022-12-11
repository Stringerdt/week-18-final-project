// react imports
// react-router-dom imports
import { Link } from "react-router-dom";

// react-bootstrap imports
import Container from "react-bootstrap/Container";

const PurchaseConfirmationPage = () => {
    return (
        <Container className="text-center">
            <h1>Thank you for your purchase!</h1>
            <h4>Your order details have been sent to your email</h4>
            <Link to={"/"}>
                <p>CLICK HERE to return Home</p>
            </Link>
        </Container>
    )
}

export default PurchaseConfirmationPage