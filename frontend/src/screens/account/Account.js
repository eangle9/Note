import React, { useState } from "react";
import MainScreen from "../../components/mainscreen/MainScreen";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  logout,
  updatePassword,
} from "../../components/features/user/usersSlice";
import { useNavigate } from "react-router-dom";
import ErrorMessage from "../../components/error message/ErrorMessage";
import Loading from "../../components/loading/Loading";
import RemoveRedEyeRoundedIcon from "@mui/icons-material/RemoveRedEyeRounded";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";
import { IconButton } from "@mui/material";

const Account = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const { loading, error, success, userInfo } = useSelector(
    (state) => state.userLogin
  );
  const [message, setMessage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      return setMessage("the new password and confirm password does not match");
    } else {
      dispatch(updatePassword({ oldPassword, newPassword }));
      dispatch(logout());
      localStorage.removeItem("userInfo");
      navigate("/");
    }
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <MainScreen title="EDIT PASSWORD">
      <div style={{ display: "flex", flexDirection: "column", margin: "20px" }}>
        {message && <ErrorMessage variant="danger">{message}</ErrorMessage>}
        {loading && <Loading />}
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        <Form onSubmit={handleSubmit}>
          <div style={{position: "relative"}}>
            <Form.Group className="mb-3" controlId="oldPassword">
              <Form.Label>Old Password</Form.Label>
              <Form.Control
                type={showPassword? "text" : "password"}
                value={oldPassword}
                placeholder="Enter the old password"
                onChange={(e) => setOldPassword(e.target.value)}
              />
            </Form.Group>
            <div onClick={handleShowPassword} style={{position: "absolute", top: "50%", right: "10px", cursor: "pointer",  }}>
              {showPassword ? (
                <RemoveRedEyeRoundedIcon />             
              ) : (
                <VisibilityOffRoundedIcon   /> 
              )}
            </div>
          </div>
          <Form.Group className="mb-3" controlId="newPassword">
            <Form.Label>New Password</Form.Label>
            <Form.Control
              type="password"
              value={newPassword}
              placeholder="Enter new password"
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="confirmPassword">
            <Form.Label>confirm Password</Form.Label>
            <Form.Control
              type="password"
              value={confirmPassword}
              placeholder="Confirm password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Group>
          <Button type="submit" variant="primary">
            Update Password
          </Button>
        </Form>
      </div>
    </MainScreen>
  );
};

export default Account;
