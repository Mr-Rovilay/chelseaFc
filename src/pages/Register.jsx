// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";

const Register = () => {
  const [user, setUser] = useState({ name: "", email: "", password: "" });
  const navigator = useNavigate();

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUser({ ...user, [name]: value });
  };
  const handleSubmit = async () => {
    console.log(user);
    const res = await fetch("http://localhost:8000/api/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    const data = await res.json();

    if (res.ok) {
      navigator("/");
    } else {
      console.log(data);
    }
  };
  return (
    <Card
      sx={{
        p: 4,
        Width: "550px",
        margin: "3px auto",
        display: "flex",
        flexDirection: "column",
        borderRadius: 2,
        gap: 5,
      }}
      elevation={10}
    >
      <CardContent sx={{ m: 0 }}>
        <Typography
          gutterBottom
          variant="h4"
          component="div"
          sx={{ fontWeight: "bold", color: "lightblue", textAlign: "center" }}
        >
          Register Here
        </Typography>
      </CardContent>
      <TextField
        onChange={handleChange}
        value={user.name}
        name="name"
        id="outlined-basic"
        label="Name"
        variant="outlined"
        type={"text"}
      />
      <TextField
        onChange={handleChange}
        value={user.email}
        name="email"
        id="outlined-basic"
        label="Email"
        variant="outlined"
        type={"email"}
      />
      <TextField
        name="password"
        onChange={handleChange}
        value={user.password}
        id="outlined-basic"
        label="Password"
        variant="outlined"
        type={"password"}
      />
      <Button
        onClick={handleSubmit}
        variant="contained"
        sx={{ p: 2, mb: "12px" }}
      >
        Register
      </Button>
    </Card>
  );
};

export default Register;
