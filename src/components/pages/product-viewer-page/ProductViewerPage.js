// react imports

// react-router-dom imports
import { Link } from "react-router-dom";

// react-bootstrap imports
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

// my components
import ImagePlaceholder from "./ImagePlaceholder";

const ProductViewerPage = ({ product, addToCart }) => {

    const cartItem = {
        ...product, quantity: 1
    }

    return (
        <Container className="text-center mb-4">
            <h1 className="text-center mb-5">Product Viewer Page</h1>
            <ImagePlaceholder />
            <p className="fs-4 fw-semibold"><span>{product.productName}</span> - <span>${product.price}</span></p>
            <Button onClick={() => addToCart(cartItem)}>Add to Cart</Button>
            <Container className="mt-5">
                <Link to={`/store-view/${product.storeId}`}>
                    <Button>Return to Store</Button>
                </Link>
            </Container>
        </Container>
    )
}

export default ProductViewerPage;