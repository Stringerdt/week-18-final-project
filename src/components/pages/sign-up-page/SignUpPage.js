// react imports
import { useState } from "react";

// react-router-dom imports
import { Link } from "react-router-dom";

// react-bootstrap imports
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const SignUpPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const resetState = () => {
        setUsername("");
        setPassword("");
    }

    const createNewUser = async () => {
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
            const res = await fetch("https://63879acad9b24b1be3f56b81.mockapi.io/users", config);
            const user = await res.json();
            return user;
        } catch (error) {
            console.log(`Account creation failed. Error: ${error}`);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = await createNewUser();
        console.log(user);
        resetState();
    }

    return (
        <Container className="w-50">
            <h2 className="text-center">Welcome!</h2>
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
                        onChange={(e) => setPassword(e.target.value)}
                    ></Form.Control>
                    <Button className="mt-3" type="submit">Sign Up</Button>
                </Form.Group>
            </Form>
            <Container className="text-center">
                <h5>Already have an account?</h5>
                <Link to={"/log-in"}>
                    <Button>Log In</Button>
                </Link>
            </Container>
        </Container >
    )
}

export default SignUpPage