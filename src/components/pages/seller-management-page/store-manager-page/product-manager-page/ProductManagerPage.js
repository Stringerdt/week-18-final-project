// react imports

// react-router-dom imports
import { Link } from "react-router-dom";

// react-bootstrap imports
import Button from "react-bootstrap/Button";

const ProductManagerPage = ({ product }) => {

    console.log("Product:");
    console.log(product);
    console.log(product.store.userId);

    return (
        <div className="text-center">
            <div className="img-placeholder bg-dark text-white rounded-2 mx-auto border">
                <h2 className="text-center mt-5 pt-1">Img Placeholder</h2>
            </div>
            <h1>{product.productName}</h1>
            <h2>${product.price}</h2>
            <Link to={`/users/${product.store.userId}/stores/${product.storeId}/store-manager`}>
                <Button>Return to Store</Button>
            </Link>
        </div>
    )
}

export default ProductManagerPage;