// react imports

// react-router-dom imports
import { Link } from "react-router-dom";

// react-bootstrap imports
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";

const FeaturedStore = ({ store, handleStoreLink }) => {
    return (
        <Col className="featured-store-wrapper">
            <Link to={`/store-view/${store.id}`} onClick={() => handleStoreLink(store)}>
                <Card className="h-100">
                    <Card.Text className="fw-semibold pt-5">{store.storeName}</Card.Text>
                </Card>
            </Link>
        </Col>
    )
}

export default FeaturedStore;