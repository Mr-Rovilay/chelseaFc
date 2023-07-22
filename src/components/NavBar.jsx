import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  AppBar,
  Box,
  Toolbar,
  Button,
  useMediaQuery,
  IconButton,
} from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { AuthContext } from "../App";

const Navbar = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { auth, setAuth, refresh, setRefresh } = useContext(AuthContext);

  const navigator = useNavigate();

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const isNonMobileDevise = useMediaQuery("(min-width: 1000px)");

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch("http://localhost:8000/api/user/auth", {
        method: "GET",
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      const data = await res.json();
      if (res.ok) {
        setAuth(data);
        setRefresh(false);
      } else {
        setAuth(null);
      }
    };
    fetchUser();
  }, [auth, refresh]);

  const logout = () => {
    localStorage.removeItem("token");
    setRefresh(true);
    navigator("/login");
  };

  return (
    <AppBar sx={{ p: "0 5%" }}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Link to={"/"} style={{ color: "#fff", textDecoration: "none" }}>
          <h3>ChelseaFc Blog</h3>
        </Link>
        <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
          {isNonMobileDevise ? (
            <>
              {auth ? (
                <>
                  <Button>
                    <Link
                      style={{ color: "#fff", textDecoration: "none" }}
                      to={"/"}
                    >
                      Home
                    </Link>
                  </Button>

                  <Button>
                    <Link
                      style={{ color: "#fff", textDecoration: "none" }}
                      to={"/Create"}
                    >
                      Create
                    </Link>
                  </Button>

                  <Button color="inherit" onClick={logout}>
                    LogOut
                  </Button>
                </>
              ) : (
                <>
                  <Button>
                    <Link
                      style={{ color: "#fff", textDecoration: "none" }}
                      to={"/Login"}
                    >
                      Login
                    </Link>
                  </Button>
                </>
              )}
            </>
          ) : (
            <>
              <IconButton
                sx={{ color: "#fff" }}
                id="demo-positioned-button"
                aria-controls={open ? "demo-positioned-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="demo-positioned-menu"
                aria-labelledby="demo-positioned-button"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
              >
                {auth
                  ? [
                      <>
                        <MenuItem onClick={handleClose}>
                          <Link
                            style={{ color: "inherit", textDecoration: "none" }}
                            to={"/"}
                          >
                            Home
                          </Link>
                        </MenuItem>
                        <MenuItem onClick={handleClose}>
                          <Link
                            style={{ color: "inherit", textDecoration: "none" }}
                            to={"/Create"}
                          >
                            Create
                          </Link>
                        </MenuItem>

                        <MenuItem
                          onClick={() => {
                            handleClose();
                            logout();
                          }}
                        >
                          logout
                        </MenuItem>
                      </>,
                    ]
                  : [
                      <>
                        <MenuItem onClick={handleClose}>
                          <Link
                            style={{ color: "inherit", textDecoration: "none" }}
                            to={"/Login"}
                          >
                            Login
                          </Link>
                        </MenuItem>
                      </>,
                    ]}
              </Menu>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
