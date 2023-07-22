// eslint-disable-next-line no-unused-vars
// import React from "react";
// import { BrowserRouter, Route, Routes } from "react-router-dom";
// import { Container } from "@mui/material";
// import Home from "./pages/Home";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import CreatePost from "./pages/CreatePost";
// import UpdatePost from "./pages/UpdatePost";
// import Navbar from "./components/Navbar";
// import Footer from "./components/Footer";

// const App = () => {
//   return (
//     <div>
//       <BrowserRouter>
//         <Navbar />
//         <Container sx={{ p: 1, mt: 10 }}>
//           <Routes>
//             <Route path="/" element={<Home />} />
//             <Route path="/login" element={<Login />} />
//             <Route path="/Create" element={<CreatePost />} />
//             <Route path="/register" element={<Register />} />
//             <Route path="/update/:id" element={<UpdatePost />} />
//           </Routes>
//         </Container>
//         <Footer />
//       </BrowserRouter>
//     </div>
//   );
// };

// export default App;

// eslint-disable-next-line no-unused-vars
import React, { createContext, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import { Container } from "@mui/material";
import CreatePost from "./pages/CreatePost";
import Footer from "./components/Footer";
import UpdatePost from "./pages/UpdatePost";

export const AuthContext = createContext();

const App = () => {
  const [refresh, setRefresh] = useState(false);
  const [auth, setAuth] = useState(null);

  return (
    <AuthContext.Provider value={{ auth, setAuth, refresh, setRefresh }}>
      <BrowserRouter>
        <Navbar />
        <Container sx={{ p: 1, mt: 10 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/Create" element={<CreatePost />} />
            <Route path="/register" element={<Register />} />
            <Route path="/update/:id" element={<UpdatePost />} />
          </Routes>
        </Container>
        <Footer />
      </BrowserRouter>
    </AuthContext.Provider>
  );
};

export default App;
