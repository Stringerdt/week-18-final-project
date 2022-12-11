// react imports
import { useState } from "react";

// react-router-dom imports

// react-bootstrap imports
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

// my components

const ProductCreationForm = ({ store, handleLoading }) => {
    // component state
    const [productName, setProductName] = useState("")
    const [price, setPrice] = useState("");
    const [message, setMessage] = useState("");

    const resetState = () => {
        setProductName("");
        setPrice("");
    }

    const addNewProduct = async () => {
        const newProduct = {
            "productName": productName,
            "price": price,
        }
        const config = {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newProduct)
        }
        await fetch(`https://63879acad9b24b1be3f56b81.mockapi.io/users/${store.userId}/stores/${store.id}/products`, config);
        setMessage(`Product Added: ${productName}`);
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        addNewProduct();
        resetState();
        handleLoading();
    }

    return (
        <Form onSubmit={(e) => handleSubmit(e)}>
            <Form.Label>Product Name</Form.Label>
            <Form.Control
                type="text"
                className="w-75 mx-auto"
                value={productName}
                onChange={(e) => setProductName(e.target.value)} />
            <Form.Label>Price</Form.Label>
            <Form.Control
                type="text"
                className="w-75 mx-auto"
                value={price}
                onChange={(e) => setPrice(e.target.value)} />
            <Button className="mt-3" type="submit">Add New Product</Button>
            {message ? (
                <p className="mt-2">{message}</p>
            ) : (
                <></>
            )}
        </Form>
    )
}

export default ProductCreationForm