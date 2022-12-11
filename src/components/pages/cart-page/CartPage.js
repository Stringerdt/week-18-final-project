// react imports
import { useState, useEffect } from "react";

// react-router-dom imports
import { Link } from "react-router-dom";

// react-bootstrap imports
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const CheckoutPage = ({ cart, handleCheckout, removeFromCart }) => {
    const [isConfirmed, setIsConfirmed] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (isLoading) {
            setIsLoading(false);
        }
    }, [isLoading])

    const handleDelete = (item) => {
        removeFromCart(item);
        setIsLoading(true);
    }

    const totalPrice = cart.map(cart => parseInt(cart.price) * (cart.quantity)).reduce((curr, prev) => curr + prev, 0).toFixed(2);

    return (
        <Container className="text-center">
            <h1>Cart</h1>
            {cart.map(item =>
                <Container key={item.id} className="border m-3 p-2">
                    <Row>
                        <Col xs={11}>
                            <p className="fs-4"><span>{item.productName}</span> - <span>${item.price * item.quantity}</span> - <span>qty: {item.quantity}</span></p>
                        </Col>
                        <Col>
                            <Button className="mt-2 btn-danger" onClick={() => handleDelete(item)}>Remove</Button>
                        </Col>
                    </Row>
                </Container>
            )}
            <p><span><strong>Total </strong></span> - <span>${totalPrice}</span></p>
            {cart.length > 0 ? (
                <Container>
                    {!isConfirmed ? (
                        <Button onClick={() => setIsConfirmed(true)}>Checkout</Button>
                    )
                        : (
                            <Container>
                                <h2>Confirm Purchase?</h2>
                                <Link to={"/purchase-confirmation"} onClick={() => handleCheckout()}>
                                    <Button className="btn-success">Click to Confirm Purchase</Button>
                                </Link>
                                <Button onClick={() => setIsConfirmed(false)} className="ms-2 btn-danger">No, Go Back</Button>
                            </Container>
                        )}
                </Container>
            ) : (
                <></>
            )
            }
            <Link to={"/store-catalog"}>
                <Button className="mt-3">Return to Store Catalog</Button>
            </Link>

        </Container>)
}

export default CheckoutPage;