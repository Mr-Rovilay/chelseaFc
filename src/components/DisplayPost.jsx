// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import PostCard from "./PostCard";
import { Box } from "@mui/material";

const DisplayPost = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("http://localhost:8000/api/blog/", {
        method: "GET",
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      const data = await res.json();

      if (res.ok) {
        setPosts(data);
      } else {
        console.log(data);
      }
    };
    fetchData();
  }, [posts]);

  return (
    <>
      <Box
        sx={{
          Width: 345,
          display: "flex",
          flexDirection: "column",
          margin: "auto",
          gap: 3,
        }}
      >
        {posts && posts.map((post) => <PostCard post={post} key={posts.id} />)}
      </Box>
    </>
  );
};

export default DisplayPost;
