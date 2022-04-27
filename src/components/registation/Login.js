import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Card } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { useAuth } from "../../context/auth-context";

function Login() {
  const { signin } = useAuth();
  const history = useNavigate();

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const login = async (e) => {
    e.preventDefault();
    try {
      await signin(loginEmail, loginPassword);
      history("/");
    } catch (error) {
      // TODO
    }
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
                    setLoginPassword(event.target.value);
                  }}
                  type="password"
                  required
                />
              </Form.Group>
              <Button className="w-100" type="submit">
                Log In
              </Button>
            </Form>
            <div className="w-100 text-center mt-2">
              Need an account? <Link to="/register">Sign Up</Link>
            </div>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}

export default Login;
