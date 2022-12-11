// react imports
import { useState } from "react";

// react-router-dom imports
import { Link } from "react-router-dom";

// react-bootstrap imports
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const LoginPage = ({ handleLogIn }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const resetState = () => {
        setUsername("");
        setPassword("");
    }

    // verify user exists, verify password matches, and assign currentUser to that user
    const verifyLogin = async () => {
        // get req
        const res = await fetch("https://63879acad9b24b1be3f56b81.mockapi.io/users");
        const userList = await res.json();
        // finds the first user (will/should only be 1 with the same username)
        const matchedUser = userList.find(user => user.username === username);

        // runs if there is a match
        if (matchedUser) {
            // checks if the password is correct
            if (matchedUser.password === password) {
                // returns the user to log in
                return matchedUser;
            } else {
                // handles incorrect password
                return false;
            }
        } else {
            // handles no matching user
            return false;
        }
    }

    // function ran when form is submitted
    const handleSubmit = async (e) => {
        e.preventDefault();

        // sets user to the found matched user object in API
        const user = await verifyLogin();

        // if user is returned, handles log in and resets state to default
        if (user) {
            handleLogIn(user);
            resetState();

            // if no user is returned, logs that the log in failed; the verify function handles the alert message
        } else {
            console.log("log in failed");
        }
    }


    return (
        <Container className="w-50">
            <h2>Log In</h2>
            <Form
                onSubmit={(e) => handleSubmit(e)}>
                <Form.Group>
                    <Form.Label>username</Form.Label>
                    <Form.Control
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}></Form.Control>
                    <Form.Label>password</Form.Label>
                    <Form.Control
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}></Form.Control>
                    <Button className="mt-3" type="submit">Log In</Button>
                </Form.Group>
            </Form>
            <div className="text-center">
                <h5> New here? </h5>
                <Link to={"/sign-up"}>
                    <Button>Create an account</Button>
                </Link>
            </div>
        </Container>
    )
}

export default LoginPage