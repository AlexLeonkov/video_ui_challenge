import { Form, Button, Card } from "react-bootstrap";
import { useState } from "react";

import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import { useAuth } from "../../context/auth-context";


function Register(props) {
  const { signup} = useAuth();
  const history = useNavigate();

  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");

  const register = async () => {
    try {
      await signup(registerEmail, registerPassword);
      history('/');
    } catch (error) {
      // TODO
    }
  }

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
            <div className="w-100 text-center mt-2">
              Already have an account? <Link to="/login">Log In</Link>
            </div>
          </Card.Body>
        </Card>
       
      </Container>
    </>
  );
}

export default Register;
