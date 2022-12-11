// react imports
import { useState, useEffect } from "react";

// react-router-dom imports
import { Link } from "react-router-dom";

// react-bootstrap imports
import Row from "react-bootstrap/Row";

// my components 
import FeaturedStore from "./featured-store/FeaturedStore";

const HomePage = ({ handleStoreLink }) => {

    const [isLoading, setIsLoading] = useState(true);
    const [featuredStores, setFeaturedStores] = useState([]);

    useEffect(() => {
        const getStores = async () => {
            const res = await fetch("https://63879acad9b24b1be3f56b81.mockapi.io/users")
            const users = await res.json();

            // array of each user w/ their stores
            const usersStores = users.map(users => users.stores);

            // makes a new array of each spread store array to get all stores in 1 array
            const allStores = [];
            usersStores.map(userStore => {
                return allStores.push(...userStore);
            })
            console.log(allStores);
            // gets my 5 random Id's for the featured stores
            const tempStores = [];
            const tempIds = tempStores.map(store => store.id);
            for (let i = 0; i < 5; i++) {
                const randId = Math.floor(Math.random() * allStores.length);
                const featuredStore = allStores.find(store => parseInt(store.id) === randId);
                if (!tempIds.includes(featuredStore.id)) {
                    tempStores.push(featuredStore);
                    // I don't know why it worked less with tempstores.id than 
                    // just using a tempIds array, * revisit *
                    tempIds.push(featuredStore.id);
                } else {
                    i--;
                    console.log(`repeat: ${featuredStore.id}`);
                }
            }
            setFeaturedStores(tempStores);
        }
        if (isLoading) {
            getStores();
            setIsLoading(false);
            console.log("useEffect called");
        }
    }, [isLoading])

    return (
        <>
            {
                !isLoading
                    ? (
                        <div className="text-center">
                            <section>
                                <h1>Welcome to DS Marketplace</h1>
                                <h4>Put your money where your heart is.</h4>
                                <p>We connect you with charitable stores, nonprofits, and stores with missions.</p>
                            </section>
                            <section>
                                <h3>Check out these stores and their mission...</h3>
                                <Row>
                                    {featuredStores.map(store =>
                                        <FeaturedStore
                                            key={store.id}
                                            store={store}
                                            handleStoreLink={handleStoreLink} />
                                    )}
                                </Row>
                            </section>
                            <Link to={"/store-catalog"}>
                                <h3 className="mt-3">Or ... View All Stores</h3>
                            </Link>
                        </div >
                    )
                    : (
                        <h1 className="text-center">Loading...</h1>
                    )
            }
        </>

    )
}

export default HomePage