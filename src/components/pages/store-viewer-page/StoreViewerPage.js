// react imports
import { useState, useEffect } from "react";

// react-router-dom imports
import { Link } from "react-router-dom";

// react-bootstrap imports
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

// my component imports
import ImagePlaceholder from "../product-viewer-page/ImagePlaceholder";

const StoreViewerPage = ({ store, handleProductLink }) => {
    // component state
    const [productList, setProductList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getProducts = async () => {
            const res = await fetch(`https://63879acad9b24b1be3f56b81.mockapi.io/users/${store.userId}/stores/${store.id}/products`);
            const products = await res.json();
            setProductList(products);
        }
        getProducts();
        if (isLoading) {
            setIsLoading(false)
        }
    }, [isLoading, store]);


    return (
        <Container className="text-center">
            <h1>{store.storeName}</h1>
            <h2>Product List</h2>
            <Container>
                {productList.map((product) =>
                    <Container key={product.id}>
                        <Container key={product.id} className="my-4 border border-2 p-4 w-25">
                            <ImagePlaceholder />
                            <h2 className="text-center mt-5 pt-1">{product.id} Img Placeholder</h2>
                            <Link
                                to={`/product-view/${product.id}`}
                                onClick={() => handleProductLink(product)}>
                                <p className="fs-4 m-0">{product.productName}</p>
                            </Link >
                            <p className="fs-5">${product.price}</p>
                        </Container>
                    </Container>
                )}
            </Container>
            <Link to={"/store-catalog"}>
                <Button className="mt-5">Return to Store Catalog</Button>
            </Link>
        </Container >
    )
}

export default StoreViewerPage;