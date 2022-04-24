import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { Form, Button, Card, Alert } from "react-bootstrap";

import { Container } from "react-bootstrap";

import { auth } from "../../firebase-config";

function Login() {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [user, setUser] = useState({});

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      console.log(currentUser);
      setUser(currentUser);
      console.log(user);
    });
  }, []);

  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      console.log(user);
    } catch (error) {
      console.log(error.message);
    }
  };

  const logout = async () => {
    await signOut(auth);
    console.log("logged out");
  };

  return (
    <>
      <Container
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "100vh" }}
      >
        <Card>
          <Card.Body>
            <h2 className="text-center mb-4">Log In</h2>

            <Form onSubmit={login}>
              <Form.Group id="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  onChange={(event) => {
                    setLoginEmail(event.target.value);
                  }}
                  required
                />
              </Form.Group>
              <Form.Group id="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  onChange={(event) => {
                    setLoginEmail(event.target.value);
                  }}
                  type="password"
                  required
                />
              </Form.Group>
              <Button className="w-100" type="submit">
                Log In
              </Button>
            </Form>
          </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
          Need an account? <Link to="/register">Sign Up</Link>
        </div>
      </Container>
    </>
  );
}

export default Login;
