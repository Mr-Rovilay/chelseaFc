// eslint-disable-next-line no-unused-vars
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { AuthContext } from "../App";

const Login = () => {
  const [user, setUser] = useState({ email: "", password: "" });
  const navigator = useNavigate();

  const { setRefresh } = useContext(AuthContext);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUser({ ...user, [name]: value });
  };
  const handleSubmit = async () => {
    console.log(user);
    const res = await fetch("http://localhost:8000/api/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    const data = await res.json();

    if (res.ok) {
      localStorage.setItem("token", data.token);
      setRefresh(true);
      navigator("/");
    } else {
      console.log(data);
    }
  };

  return (
    <Card
      sx={{
        p: 3,
        Width: "550px",
        margin: "30px auto",
        display: "flex",
        flexDirection: "column",
        borderRadius: 2,
        gap: 5,
        justifyContent: "center",
      }}
      elevation={10}
    >
      <CardContent>
        <Typography
          gutterBottom
          variant="h4"
          component="div"
          sx={{ fontWeight: "bold", color: "lightblue", textAlign: "center" }}
        >
          Login Here
        </Typography>
      </CardContent>
      <TextField
        onChange={handleChange}
        value={user.email}
        name={"email"}
        id="outlined-basic"
        label="Email"
        variant="outlined"
        type={"email"}
        required
      />
      <TextField
        name={"password"}
        onChange={handleChange}
        value={user.password}
        id="outlined-basic"
        label="Password"
        variant="outlined"
        type={"password"}
        required
      />
      <Button
        onClick={handleSubmit}
        variant="contained"
        sx={{ p: 2, mb: "12px" }}
      >
        LOGIN
      </Button>
      <Typography variant="h6" sx={{}}>
        Don't have an Account? please{" "}
        <Link
          style={{ color: "lightblue", textDecoration: "underline" }}
          to={"/Register"}
        >
          Register
        </Link>{" "}
        here
      </Typography>
    </Card>
  );
};

export default Login;
