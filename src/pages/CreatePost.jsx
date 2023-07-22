// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import {
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const [blog, setBlog] = useState({ title: "", content: "", image: "" });
  const navigator = useNavigate();
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setBlog({ ...blog, [name]: value });
  };

  const handleSubmit = async () => {
    console.log(blog);
    const res = await fetch("http://localhost:8000/api/blog/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
      body: JSON.stringify(blog),
    });
    const data = await res.json();

    if (res.ok) {
      console.log(data);
      alert("blog created");
      setBlog({ title: "", content: "", image: "" });
      navigator("/");
    } else {
      console.log(data);
    }
  };

  return (
    <>
      <Card
        sx={{
          p: 4,
          Width: "550px",
          margin: "10px auto",
          display: "flex",
          flexDirection: "column",
          borderRadius: 2,
          gap: 5,
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
            WRITE YOUR BLOG HERE
          </Typography>
        </CardContent>
        <TextField
          onChange={handleChange}
          value={blog.title}
          name="title"
          id="outlined-basic"
          label="Title"
          variant="outlined"
          type="text"
          required
        />

        <TextField
          onChange={handleChange}
          value={blog.image}
          name="image"
          id="outlined-basic"
          label="imageURL"
          variant="outlined"
        />

        <TextField
          autoComplete={"on"}
          rows={14}
          multiline
          placeholder="write your blog here"
          name="content"
          onChange={handleChange}
          value={blog.content}
          label="Content"
          type={"text"}
        />
        <Button
          onClick={handleSubmit}
          variant="contained"
          sx={{ p: 2, mb: "12px" }}
        >
          CREATE BLOG
        </Button>
      </Card>
    </>
  );
};

export default CreatePost;
