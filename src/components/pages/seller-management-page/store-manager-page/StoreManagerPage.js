// react imports
import { useState, useEffect } from "react";

// react-router-dom imports
import { Link } from "react-router-dom";

// react-bootstrap-imports
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

// my imports 
import ProductCreationForm from "./ProductCreationForm";

const StoreManagerPage = ({ store, handleProductLink }) => {
    const [productList, setProductList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getProducts = async () => {
            const res = await fetch(`https://63879acad9b24b1be3f56b81.mockapi.io/users/${store.userId}/stores/${store.id}/products`);
            const products = await res.json();
            setProductList(products);
            return products;
        }
        const resetProductList = async () => {
            const newProductList = await getProducts();
            setProductList(newProductList);
        }
        resetProductList();
        if (isLoading) {
            setIsLoading(false);
        }
    }, [isLoading, store.id, store.userId]);

    const deleteProduct = async (product) => {
        const config = {
            method: "DELETE",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        }
        try {
            await fetch(`https://63879acad9b24b1be3f56b81.mockapi.io/users/${store.userId}/stores/${store.id}/products/${product.id}`, config);
            setIsLoading(true);
        } catch {
            console.log("store deletion failed");
        }
    }

    const handleLoading = () => {
        setIsLoading(true);
    }

    return (
        <>
            {
                !isLoading
                    ? (
                        <Container className="text-center">
                            <h1>{store.storeName}</h1>
                            <h2>Product List:</h2>
                            <Container>
                                {productList.map((product) =>
                                    <Container key={product.id} className="my-4 border border-2 p-4 w-25">
                                        <div className="img-placeholder bg-dark text-white rounded-2 mx-auto border">
                                            <h2 className="text-center mt-5 pt-1">{product.id} Img Placeholder</h2>
                                        </div>
                                        <p className="fs-4 m-0">{product.productName}</p>
                                        <p className="fs-5">${product.price}</p>
                                        <Link to={`/users/${store.userId}/stores/${store.id}/store-manager/products/${product.id}/product-manager`}>
                                            <Button onClick={() => handleProductLink(product)}>Edit Product</Button>
                                        </Link>
                                        <Button className="btn-danger ms-3" onClick={() => deleteProduct(product)}>Delete Product</Button>
                                    </Container>)}
                            </Container>
                            <Container className="border p-4 w-50 my-3">
                                <h2>Add New Product</h2>
                                <ProductCreationForm
                                    handleLoading={handleLoading}
                                    store={store} />
                            </Container>
                            <Link to={`/seller-management`}>
                                <Button className="mb-4">Return to Seller Management Page</Button>
                            </Link>
                        </Container>
                    ) : (
                        <h1>Loading... </h1>
                    )
            }
        </>
    )
}

export default StoreManagerPage