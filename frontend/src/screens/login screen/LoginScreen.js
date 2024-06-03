import React, { useEffect, useState } from "react";
import MainScreen from "../../components/mainscreen/MainScreen";
import { Button, Col, Form, Row } from "react-bootstrap";
import "./LoginScreen.css";
// import axios from "axios";
import { Link } from "react-router-dom";
import Loading from "../../components/loading/Loading";
import ErrorMessage from "../../components/error message/ErrorMessage";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../../components/features/user/usersSlice";
import { useNavigate } from "react-router-dom";

const LoginScreen = () => {
  // useEffect(() => {
  //   const { userInfo } = localStorage.getItem("userInfo");
  //   if(userInfo){
  //     history.push("/myNotes")
  //   }
  // }, [userInfo,]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const loading = useSelector((state) => state.userLogin.loading);
  const error = useSelector((state) => state.userLogin.error);
  // const users = useSelector((state) => state.users);
  // const { userInfo } = users;
  const userInfo = useSelector((state) => state.userLogin.userInfo);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const [error, setError] = useState("");
  // const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (userInfo ) {
      navigate("/myNotes");
    }
  }, [navigate, userInfo]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch(userLogin({ email, password }));

    // const config = {
    //   headers: {
    //     "Content-type": "application/json",
    //   },
    // };
    // setLoading(true);
    // try {
    //   const { data } = await axios.post(
    //     "/api/users/login",
    //     {
    //       email,
    //       password,
    //     },
    //     config
    //   );
    //   console.log(data);
    //   localStorage.setItem("userInfo", JSON.stringify(data));
    //   setLoading(false);
    //   setEmail("");
    //   setPassword("");
    // } catch (error) {
    //   setError(error.response.data.error.message);
    //   setLoading(false);
    //   setEmail("");
    //   setPassword("");
    // }
  };
  return (
    <MainScreen title="LOGIN">
      <div className="loginContainer">
        {loading && <Loading />}
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
          <Row className="py-3">
            <Col>
              New Customer ? <Link to="/register">Register Here</Link>
            </Col>
          </Row>
        </Form>
      </div>
    </MainScreen>
  );
};

export default LoginScreen;
