// react imports
import { useState, useEffect } from "react";

// react-router-dom imports
import { Link } from "react-router-dom";

// react-bootstrap imports
import Container from "react-bootstrap/Container";

const StoreCatalogPage = ({ handleStoreLink }) => {
    const [storeList, setStoreList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getStores = async () => {
            const res = await fetch("https://63879acad9b24b1be3f56b81.mockapi.io/users")
            const users = await res.json();
            const usersStores = users.map(users => users.stores);
            const allStores = [];
            usersStores.map(userStore => {
                return allStores.push(...userStore);
            })
            setStoreList(allStores);
        }
        getStores();
        setIsLoading(false);
    }, [])

    return (
        <>
            {
                !isLoading
                    ? (
                        <Container className="text-center">
                            <h1>Store Catalog Page</h1>
                            <Container>
                                {storeList.map((store) => (
                                    <Link
                                        key={store.id}
                                        to={`/store-view/${store.id}`}
                                        onClick={() => handleStoreLink(store)}>
                                        <Container >
                                            <p>{store.storeName}</p>
                                        </Container>
                                    </Link>

                                ))}
                            </Container>
                        </Container>
                    ) : (
                        <h1>Loading...</h1>
                    )
            }
        </>
    )
}

export default StoreCatalogPage;