import React, { useEffect, useState } from "react";
import MainScreen from "../../components/mainscreen/MainScreen";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import ErrorMessage from "../../components/error message/ErrorMessage";
import Loading from "../../components/loading/Loading";
import { useDispatch, useSelector } from "react-redux";
import { userRegister } from "../../components/features/user/usersSlice";
import { useNavigate } from "react-router-dom";

const RegisterScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pic, setPic] = useState(
    "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
  );
  const [message, setMessage] = useState(null);
  const [picMessage, setPicMessage] = useState(null);
  const { loading, error, userInfo } = useSelector((state) => state.userLogin);
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo) {
      navigate("/myNotes");
    }
  }, [navigate, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password.length < 4) {
      console.log("length", password.length);
      return setMessage("password must be at least 4 characters long");
    }
    if (password !== confirmPassword) {
      setMessage("Password is not Match");
    } else {
      setMessage(null);
      dispatch(userRegister({ name, email, password, pic }));
      // try {
      //   const config = {
      //     headers: {
      //       "Content-type": "application/json",
      //     },
      //   };
      //   setLoading(true);
      //   const { data } = await axios.post(
      //     "/api/users",
      //     { name, email, password, pic },
      //     config
      //   );
      //   setLoading(false);
      //   setName("");
      //   setEmail("");
      //   setPassword("");
      //   setConfirmPassword("");
      //   console.log(data);
      //   localStorage.setItem("userInfo", JSON.stringify(data));
      // } catch (error) {
      //   setError(error.response.data.error.message);
      //   setLoading(false);
      //   setName("");
      //   setEmail("");
      //   setPassword("");
      //   setConfirmPassword("");
      // }
    }
  };

  const picDetails = async(pics) => {
    if (!pics) {
      return setPicMessage("Please Select an Image");
    }
    setPicMessage(null);
    if (pics.type === "image/png" || pics.type === "image/jpeg") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "yymwhoqd");
      await axios
        .post("https://api.cloudinary.com/v1_1/note-zipper/image/upload", data)
        .then((res) => setPic(res.data.url.toString()))
        .catch((err) => console.log("error while uploading an image", err));
    } else {
      return setPicMessage("Please Select an Image");
    }
  };

  return (
    <MainScreen title="REGISTER">
      <div style={{ display: "flex", flexDirection: "column", margin: "20px" }}>
        {message && <ErrorMessage variant="danger">{message}</ErrorMessage>}
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        {loading && <Loading />}
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

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

          <Form.Group className="mb-3" controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm Passwrod"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Group>
          {picMessage && (
            <ErrorMessage variant="danger">{picMessage}</ErrorMessage>
          )}
          <Form.Group controlId="formImage" className="mb-3">
            <Form.Label>Profile Picture</Form.Label>
            <Form.Control
              type="file"
              onChange={(e) => picDetails(e.target.files[0])}
            />
          </Form.Group>

          {/* <Button variant="primary" onClick={handleUpload}>
            Upload
          </Button> */}

          <Button variant="primary" type="submit">
            Register
          </Button>

          <Row className="py-3">
            <Col>
              Have an Account ? <Link to="/login">Login</Link>
            </Col>
          </Row>
        </Form>
      </div>
    </MainScreen>
  );
};

export default RegisterScreen;
