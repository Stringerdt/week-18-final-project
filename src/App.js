// react imports
import React from "react";
import { useState } from "react";

// react-router-dom imports
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// stylesheets
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';

// API url = "https://63879acad9b24b1be3f56b81.mockapi.io/"

// my main components
import ErrorPage from "./error-page";
import Root from "./routes/root";

// my general pages
import LoginPage from "./components/pages/login-page/LoginPage";
import SignUpPage from "./components/pages/sign-up-page/SignUpPage";

// my account management & seller management pages
import AccountManagementPage from "./components/pages/account-management-page/AccountManagementPage";
import SellerManagementPage from "./components/pages/seller-management-page/SellerManagementPage";
import StoreManagerPage from "./components/pages/seller-management-page/store-manager-page/StoreManagerPage";
import ProductManagerPage from "./components/pages/seller-management-page/store-manager-page/product-manager-page/ProductManagerPage";

// my shopper pages
import HomePage from "./components/pages/home-page/HomePage";
import StoreCatalogPage from "./components/pages/store-catalog-page/StoreCatalogPage";
import StoreViewerPage from "./components/pages/store-viewer-page/StoreViewerPage";
import ProductViewerPage from "./components/pages/product-viewer-page/ProductViewerPage";

// my cart/checkout pages
import CartPage from "./components/pages/cart-page/CartPage";
import PurchaseConfirmationPage from "./components/pages/purchase-confirmation-page/PurchaseConfirmationPage";


function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [currentUser, setCurrentUser] = useState();
    const [store, setStore] = useState();
    const [product, setProduct] = useState();
    const [cart, setCart] = useState([]);

    const handleLogIn = (user) => {
        setIsLoggedIn(true);
        setCurrentUser(user);
    }

    const handleStoreLink = (store) => {
        setStore(store);
    }

    const handleProductLink = (product) => {
        setProduct(product);
    }

    const handleCheckout = () => {
        setCart([]);
    }

    const addToCart = (item) => {
        const matchedItem = cart.find(cartItem => cartItem.id === item.id);
        if (!matchedItem) {
            const newCart = cart;
            newCart.push(item);
            setCart(newCart);
        } else {
            const newQuantity = matchedItem.quantity++;
            const newCart = cart.map(cartItem => cartItem.id === item.id ? { ...cartItem, quantity: newQuantity } : cartItem);
            console.log(newCart);
        }
    }

    const removeFromCart = (item) => {
        const itemIndex = cart.indexOf(item);
        if (itemIndex !== -1) {
            cart.splice(itemIndex, 1);
        }

    }

    // router with paths
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Root
                isLoggedIn={isLoggedIn}
                currentUser={currentUser} />,
            errorElement: <ErrorPage />,
            children: [
                {
                    path: "",
                    element: <HomePage
                        handleStoreLink={handleStoreLink}
                        isLoggedIn={isLoggedIn} />
                },
                // login/signup paths
                {
                    path: "log-in",
                    element: <LoginPage handleLogIn={handleLogIn} />
                }, {
                    path: "sign-up",
                    element: <SignUpPage />
                },
                // account/seller management paths
                {
                    path: "account-management",
                    element: <AccountManagementPage currentUser={currentUser} />
                }, {
                    path: "seller-management",
                    element: <SellerManagementPage
                        currentUser={currentUser}
                        handleStoreLink={handleStoreLink} />
                }, {
                    path: "/users/:userId/stores/:storeId/store-manager",
                    element: <StoreManagerPage
                        store={store}
                        handleProductLink={handleProductLink} />
                }, {
                    path: "/users/:userId/stores/:storeId/store-manager/products/:productId/product-manager",
                    element: <ProductManagerPage product={product} />
                },
                // stores/product viewer paths
                {
                    path: "/store-catalog",
                    element: <StoreCatalogPage
                        handleStoreLink={handleStoreLink} />
                }, {
                    path: "/store-view/:storeId",
                    element: <StoreViewerPage
                        store={store}
                        handleProductLink={handleProductLink} />
                }, {
                    path: "/product-view/:productId",
                    element: <ProductViewerPage
                        product={product}
                        addToCart={addToCart} />
                },
                // cart/purchase confirmation paths
                {
                    path: "/cart",
                    element: <CartPage
                        cart={cart}
                        handleCheckout={handleCheckout}
                        removeFromCart={removeFromCart} />
                }, {
                    path: "/purchase-confirmation",
                    element: <PurchaseConfirmationPage />
                }

            ]
        }
    ]);

    return (
        <RouterProvider router={router} />
    )
}

export default App;
