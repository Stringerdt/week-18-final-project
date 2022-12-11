// react imports
import { useState } from "react";

// react-bootstrap imports
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

// API base endpoint = "https://63879acad9b24b1be3f56b81.mockapi.io/"

const SignUpBox = () => {
    // component states
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [alertMessage, setAlertMessage] = useState("");

    // returns a list of usernames 
    const getUsernameList = async () => {
        const res = await fetch("https://63879acad9b24b1be3f56b81.mockapi.io/users");
        const data = await res.json();
        const usernameList = data.map(user => user.username);
        return usernameList;
    }

    // creates a new user object and posts it to API
    const createNewUser = async (username, password) => {
        const newUser = {
            "username": username,
            "password": password
        }
        const config = {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newUser)
        }
        try {
            await fetch("https://63879acad9b24b1be3f56b81.mockapi.io/user", config);
        } catch (error) {
            console.log(`Account creation failed. Error: ${error}`);
        }
    }

    // handles the submission of the sign up box
    // ** Needs redirect to next page when account is created ** 
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (username.length > 0 && password.length > 3) {
            const usernameList = await getUsernameList();
            if (usernameList.includes(username)) {
                setAlertMessage("Sorry! This username is taken. Please try again.");
                setUsername("");
                setPassword("");
            } else {
                await createNewUser(username, password);
                setAlertMessage("Welcome!");
            }
        } else {
            setAlertMessage("enter username; password must be >3 characters")
        }
    }

    return (
        <Container className="p-5">
            <Form
                className="w-25 m-auto border px-4"
                /* on submit, prevent default => validate the sign up */
                onSubmit={(e) => handleSubmit(e)}>
                <Form.Group className="p-3">
                    <h3 className="text-center">Create Account</h3>
                    <Form.Label>Username</Form.Label>

                    {/* username input */}
                    <Form.Control
                        className="mb-2"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    ></Form.Control>

                    <Form.Label>Password</Form.Label>

                    {/* password input */}
                    <Form.Control
                        className="mb-3"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}></Form.Control>

                    {/* submit button */}
                    <Button type="submit">Sign Up</Button>

                    {/* alert message area */}
                    <p className="text-center">{alertMessage}</p>
                </Form.Group>
            </Form>
        </Container>
    )
}

export default SignUpBox;