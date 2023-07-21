import {
  Navbar,
  Container,
  Nav,
  Button,
  Form,
  Modal,
  FloatingLabel,
  Col,
  Spinner,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axiosConfig from "../config/axios";
import { useRoute } from "../context";

export const NavigationBar = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);

  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [signUpUsername, setSignUpUsername] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");

  const handleClose = () => {
    setShowLogin(false);
    setShowSignUp(false);
  };

  const handleShowLogin = () => {
    setShowLogin(true);
  };

  const handleShowSignUp = () => {
    setShowSignUp(true);
  };

  const routeCoin = useRoute();

  const handleLogin = async () => {
    try {
      const res = await axiosConfig.post("/user/login", {
        username: loginUsername,
        password: loginPassword,
      });
      const user = res.data.user;
      const token = res.data.token;

      if (res.status === 200) {
        sessionStorage.setItem("token", token);
        routeCoin.setUser(user);
        routeCoin.setIsLoggedin(true);
        setLoginUsername("");
        setLoginPassword("");
        handleClose();
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleSignUp = async () => {
    try {
      const response = await axiosConfig.post("/user/register", {
        firstName,
        lastName,
        username: signUpUsername,
        password: signUpPassword,
      });

      if (response.status === 200) {
        handleClose();
        setFirstName("");
        setLastName("");
        setSignUpUsername("");
        setSignUpPassword("");
        handleShowLogin();
      }
    } catch (e) {
      console.log(e);
    }
  };

  const navi = useNavigate();

  const handleLogout = () => {
    console.log("Logged out");
    sessionStorage.removeItem("token");
    routeCoin.setIsLoggedin(false);

    navi("/");
  };
  
//   const handleSearch = (cryptoId) => {
//     navi(`/currencies/${cryptoId}`);
//     routeCoin.setSelectCoin("")
//     handleClose(); // If you want to close the modal after clicking the search button
//   };

  return (
    <>
      {routeCoin.global === undefined ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
        <Navbar bg="dark" data-bs-theme="dark" className="py-1">
          <Container fluid>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav
                className="me-auto text-white fw-bold p-1 "
                style={{ fontSize: 12 }}
              >
                <Col>
                  Cryptos :{" "}
                  {routeCoin.global.total_cryptocurrencies.toLocaleString()}
                </Col>
                <Col>
                  Exchanges :{" "}
                  {routeCoin.global.active_exchanges.toLocaleString()}
                </Col>
                <Col>
                  Market Cap : $
                  {(
                    routeCoin.global.quote.USD.total_market_cap / 1e12
                  ).toLocaleString(undefined, {
                    maximumFractionDigits: 1,
                    minimumFractionDigits: 1,
                  })}
                  T
                </Col>
                <Col>
                  24h Vol : $
                  {(
                    routeCoin.global.quote.USD.total_volume_24h / 1e9
                  ).toLocaleString(undefined, {
                    maximumFractionDigits: 1,
                    minimumFractionDigits: 1,
                  })}
                  B
                </Col>

                <Col>Dominance :</Col>
                  <Col>BTC: {routeCoin.global.btc_dominance.toFixed(2)}%</Col>
                  <Col>ETH: {routeCoin.global.eth_dominance.toFixed(2)}%</Col>
              </Nav>
              {routeCoin.isLoggedin ? (
                <div className="d-flex align-items-center text-white">
                  <Col className="fw-bold me-2">User:</Col>
                  <Col className="text-white">{routeCoin.user.username}</Col>
                  <Button
                    variant="primary"
                    size="sm"
                    className="ms-3"
                    onClick={handleLogout}
                  >
                    Log out
                  </Button>
                </div>
              ) : (
                <div className="d-flex">
                  <Button
                    variant="outline-primary"
                    size="sm"
                    className="me-2"
                    onClick={handleShowLogin}
                  >
                    Log In
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={handleShowSignUp}
                  >
                    Sign Up
                  </Button>
                </div>
              )}
            </Navbar.Collapse>
          </Container>
        </Navbar>
      )}
      <Navbar className="bg-body-tertiary">
        <Container fluid>
          <Navbar.Brand href="/">exCoin</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link href="#action1">Home</Nav.Link>
              <Nav.Link href="#action2">Link</Nav.Link>
              <Nav.Link href="#" disabled>
                Link
              </Nav.Link>
            </Nav>
            <Form className="d-flex">
        <Form.Control
          type="search"
          placeholder="Search"
          className="me-2"
          aria-label="Search"
        //   value={routeCoin.selectCoin}
          onChange={(e) => routeCoin.setSelectCoin(e.target.value)}
        />
        <Button
          variant="outline-success"
        //   onClick={() => handleSearch(routeCoin.selectCoin)}
        >
          Search
        </Button>
      </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <>
        <Modal show={showLogin} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Sign In</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FloatingLabel
              controlId="floatingInput"
              label="Email address"
              className="mb-3"
              size="sm"
            >
              <Form.Control
                type="text"
                placeholder="username"
                value={loginUsername}
                onChange={(e) => setLoginUsername(e.target.value)}
              />
            </FloatingLabel>
            <FloatingLabel controlId="floatingPassword" label="Password">
              <Form.Control
                type="password"
                placeholder="Password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
              />
            </FloatingLabel>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleLogin}>
              Log In
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal show={showSignUp} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Sign Up</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FloatingLabel
              controlId="floatingFirstName"
              label="First Name"
              className="mb-3"
              size="sm"
            >
              <Form.Control
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </FloatingLabel>
            <FloatingLabel
              controlId="floatingLastName"
              label="Last Name"
              className="mb-3"
              size="sm"
            >
              <Form.Control
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </FloatingLabel>
            <FloatingLabel
              controlId="floatingSignUpUsername"
              label="Username"
              className="mb-3"
              size="sm"
            >
              <Form.Control
                type="text"
                placeholder="Username"
                value={signUpUsername}
                onChange={(e) => setSignUpUsername(e.target.value)}
              />
            </FloatingLabel>
            <FloatingLabel
              controlId="floatingSignUpPassword"
              label="Password"
              size="sm"
            >
              <Form.Control
                type="password"
                placeholder="Password"
                value={signUpPassword}
                onChange={(e) => setSignUpPassword(e.target.value)}
              />
            </FloatingLabel>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleSignUp}>
              Sign Up
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    </>
  );
};
