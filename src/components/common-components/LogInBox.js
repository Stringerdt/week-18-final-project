// react imports
import { useState } from "react";

// react-bootstrap imports
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const LogInBox = ({ handleLogIn, handleLogOut }) => {
    // component states
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [alertMessage, setAlertMessage] = useState("");

    const resetState = () => {
        setUsername("");
        setPassword("");
        setAlertMessage("");
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
                setAlertMessage("Incorrect password");
                return false;
            }
        } else {
            // handles no matching user
            setAlertMessage("User not found");
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
        <Container>
            <Form
                className="w-25 m-auto border px-4"
                onSubmit={(e) => handleSubmit(e)}>
                < Form.Group className="p-3" >
                    <h3 className="text-center">Log In</h3>
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        className="mb-2"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}></Form.Control>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        className="mb-3"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}></Form.Control>
                    <div className="text-center">
                        <Button type="submit">Log In</Button>
                        <Button className="mx-2" onClick={() => handleLogOut()}>Log Out</Button>
                    </div>
                </Form.Group >
                <p className="text-center">{alertMessage}</p>
            </Form >
        </Container >
    )
}

export default LogInBox