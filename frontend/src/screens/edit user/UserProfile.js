import React, { useEffect, useState } from "react";
import "./UserProfile.css";
import MainScreen from "../../components/mainscreen/MainScreen";
import { Button, Col, Form, Row } from "react-bootstrap";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userEdit } from "../../components/features/user/usersSlice";
import ErrorMessage from "../../components/error message/ErrorMessage";
import Loading from "../../components/loading/Loading";

const EditUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [confirmPassword, setconfirmPassword] = useState("");
  const [load, setLoad] = useState(false);
  const [pic, setPic] = useState("");
  // const [time, setTime] = useState(true);
  const [message, setMessage] = useState(null);
  const { userInfo, loading, error, success } = useSelector(
    (state) => state.userLogin
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!userInfo) {
      navigate("/");
    }
    setName(userInfo.name);
    setEmail(userInfo.email);
    setPic(userInfo.pic);
  }, [navigate, userInfo]);

  const picDetails = async (picfile) => {
    const data = new FormData();
    if (!picfile) {
      return setMessage("please select an image");
    }
    setMessage(null);
    data.append("file", picfile);
    data.append("upload_preset", "yymwhoqd");
    // try {
    if (picfile.type === "image/png" || picfile.type === "image/jpeg") {
      setLoad(true);
      await axios
        .post("https://api.cloudinary.com/v1_1/note-zipper/image/upload", data)
        .then((res) => {
          console.log("resp", res);
          setPic(res.data.url.toString());
        })
        .then((res) => setLoad(false))
        .catch((error) => {
          setLoad(false);
          console.log("error", error);
          setMessage("Failed to upload image");
        });
      // console.log("res", response.data.url)
      // setPic(response.data.url);
      // console.log("pic", pic)
    } else {
      setMessage(
        "please select a '.png' or '.jpej' file for your profile picture "
      );
    }
    // } catch (error) {
    //   setMessage("Failed to upload image");
    // }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // if (password !== confirmPassword) {
    //   return setMessage("password is not match");
    // }
    dispatch(userEdit({ name, email, pic }));
    // dispatch(userLogin({ email, password }));
  };

  return (
    <MainScreen title="EDIT PROFILE">
      <div>
        <Row className="profileContainer">
          <Col md={6}>
            {message && <ErrorMessage variant="danger">{message}</ErrorMessage>}
            {error && <ErrorMessage>{error}</ErrorMessage>}
            {success && (
              <ErrorMessage variant="success">
                successfully updated your profile
              </ErrorMessage>
            )}
            {loading && <Loading />}
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  value={name}
                  placeholder="Enter name"
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  placeholder="Enter your email address"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
              {/* <Form.Group className="mb-3" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  placeholder="Enter Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="confirm password">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  value={confirmPassword}
                  placeholder="Confirm Password"
                  onChange={(e) => setconfirmPassword(e.target.value)}
                />
              </Form.Group> */}
              <Form.Group className="mb-3" controlId="profile picture">
                <Form.Label>Change Profile Picture</Form.Label>
                <Form.Control
                  type="file"
                  onChange={(e) => picDetails(e.target.files[0])}
                />
              </Form.Group>
              <Button type="submit" variant="primary">
                Update
              </Button>
            </Form>
          </Col>
          <Col
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {load && <Loading/>}
            <img src={pic} className="profilePic" alt="profile" />
          </Col>
        </Row>
      </div>
    </MainScreen>
  );
};

export default EditUser;
