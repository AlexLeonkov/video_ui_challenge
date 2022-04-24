import { Form, Button, Card } from "react-bootstrap";
import React from "react";
import { useState, useEffect } from "react";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";

import { auth } from "../../firebase-config";

function Register(props) {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");

  const [user, setUser] = useState({});

  props.func(user?.email);
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      console.log(currentUser);
      setUser(currentUser);
    });
  }, []);

  const register = async () => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
      console.log(user);
    } catch (error) {
      console.log(error.message);
    }
  };

  const logout = async () => {
    await signOut(auth);
    setUser(null);
  };
  return (
    <>
      <Container
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "100vh" }}
      >
        <Card>
          <Card.Body>
            <h2 className="text-center mb-4">Sign Up</h2>

            <Form>
              <Form.Group id="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  onChange={(event) => {
                    setRegisterEmail(event.target.value);
                  }}
                  required
                />
              </Form.Group>
              <Form.Group id="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  onChange={(event) => {
                    setRegisterPassword(event.target.value);
                  }}
                  required
                />
              </Form.Group>
              <Link style={{ textDecoration: "none" }} to="/video">
                <Button
                  style={{ height: 40 }}
                  onClick={register}
                  className="w-100"
                >
                  Sign Up
                </Button>
              </Link>
            </Form>
          </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
          Already have an account? <Link to="/login">Log In</Link>
        </div>

        <Button onClick={logout}>Log Out</Button>
      </Container>
    </>
  );
}

export default Register;
