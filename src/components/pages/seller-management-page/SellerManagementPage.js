// react imports
import { useState, useEffect } from "react";

// react-router-dom imports
import { Link } from "react-router-dom";

// react-bootstrap imports
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

// my components
import LogInAlert from "../../common-components/LogInAlert";

const SellerManagementPage = ({ currentUser, handleStoreLink }) => {
    const [storeName, setStoreName] = useState("");
    const [storeList, setStoreList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (currentUser) {
            const getStores = async () => {
                const res = await fetch(`https://63879acad9b24b1be3f56b81.mockapi.io/users/${currentUser.id}/stores`);
                const stores = await res.json();
                return stores;
            }
            const resetStoreList = async () => {
                const newStoreList = await getStores();
                setStoreList(await newStoreList);
            }
            resetStoreList();
            if (isLoading) {
                setIsLoading(false);
            }
        }
    }, [currentUser, isLoading])

    const createNewStore = async () => {
        const newStore = {
            "storeName": storeName
        }
        const config = {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newStore)
        }
        try {
            const res = await fetch(`https://63879acad9b24b1be3f56b81.mockapi.io/users/${currentUser.id}/stores`, config);
            const data = await res.json();
            console.log(data);
        } catch {
            console.log("store creation failed");
        }
    }

    const deleteStore = async (store) => {
        const config = {
            method: "DELETE",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        }
        try {
            await fetch(`https://63879acad9b24b1be3f56b81.mockapi.io/users/${store.userId}/stores/${store.id}`, config);
            setIsLoading(true);
        } catch {
            console.log("store deletion failed");
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        createNewStore();
        setIsLoading(true);
    }

    return (
        <>
            {currentUser ? (
                <>
                    {
                        !isLoading
                            ? (
                                <Container>
                                    <Container className="text-center">
                                        <h1>Store List</h1>
                                        {storeList.length > 0 ? (
                                            <Container>
                                                {storeList.map((store) =>
                                                    <Container key={store.id}>
                                                        <Row className="mb-3 border border-2 p-2 w-75 mx-auto">
                                                            <Col xs={8}>
                                                                <h3 className="text-start ps-4 m-0"> {store.storeName}  </h3>
                                                            </Col>
                                                            <Col>
                                                                <span>
                                                                    <Link to={`/users/${store.userId}/stores/${store.id}/store-manager`}>
                                                                        <Button onClick={() => handleStoreLink(store)}>Manage Store</Button>
                                                                    </Link>
                                                                </span>
                                                            </Col>
                                                            <Col>
                                                                <span>
                                                                    <Button className="btn-danger" onClick={() => deleteStore(store)}>Delete Store</Button>
                                                                </span>
                                                            </Col>
                                                        </Row>
                                                    </Container>)}
                                            </Container>
                                        ) : (<h1>No Stores Created </h1>)}
                                    </Container>
                                    <Container className="text-center border border-2 rounded-2 m-4 p-3 w-75 mx-auto">
                                        <h1>Create New Store</h1>
                                        <Form
                                            onSubmit={(e) => handleSubmit(e)}>
                                            <Form.Group>
                                                <Form.Label>Store Name</Form.Label>
                                                <Form.Control
                                                    className="w-50 mx-auto"
                                                    value={storeName}
                                                    onChange={(e) => setStoreName(e.target.value)}
                                                ></Form.Control>
                                                <Container className="text-center mt-2">
                                                    <Button type="submit">Create Store</Button>
                                                </Container>
                                            </Form.Group>
                                        </Form>
                                    </Container>
                                </Container >
                            ) : (
                                <h1>Loading... </h1>
                            )
                    }
                </>
            )
                : (
                    <LogInAlert />
                )}
        </>
    )
}

export default SellerManagementPage;