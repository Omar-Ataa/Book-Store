import {
  Box,
  Grid,
  Typography,
  IconButton,
  Container,
  Divider,
  ListItemText,
  ListItemButton,  // استخدمنا ListItemButton بدلاً من ListItem
  List,
  Drawer,
  Badge,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import "./NavBar.css";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Logout } from "@mui/icons-material";
import { CartContext } from "../../../../Context/CartContext";
import TopNav from "../TopNav/TopNav";

export default function NavBar() {
  const cartContext = useContext(CartContext);
  const totalItemsInCart = cartContext
    ? cartContext.cartItems.reduce((total, item) => total + item.quantity, 0)
    : 0;

  let navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const toggleDrawer = (open: boolean) => (event: any) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    console.log("Token deleted, user logged out");
    navigate("/");
  };

  return (
    <Box id="navbar">
      <TopNav />

      {/* Navigation bar */}
      <Box
        sx={{
          backgroundColor: "#FFFFFF",
          borderBottom: "1px solid #e0e0e0",
          py: 1,
        }}
      >
        <Container maxWidth="xl" sx={{ px: 0 }}> {/* حذف الهوامش الإضافية */}
          <Grid
            container
            alignItems="center"
            justifyContent="space-between"
            spacing={0} // منع المسافات بين العناصر
          >
            <Grid item xs={6} sm={3} md={2} lg={2}>
              <Box
                sx={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "50%",
                  backgroundColor: "var(--blue-color)",
                  backgroundImage: "url('src/assets/logo.png')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  border: "0.1rem solid #3f2b8c",
                }}
              />
            </Grid>
            <Grid item sm={6} md={8} lg={8}>
              <Box
                className="tabs-nav"
                sx={{
                  display: { xs: "none", sm: "flex" },
                  alignItems: "center",
                  justifyContent: "center",
                  textTransform: "uppercase",
                  flexWrap: "wrap",
                  gap: 1,
                }}
              >
                <Link to="/dashboard/home" className="nav-link active">
                  <Typography>Home</Typography>
                </Link>
                <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />

                <Link to="/dashboard/books" className="nav-link">
                  <Typography>Books</Typography>
                </Link>
                <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
                <Link to="/dashboard/new-release" className="nav-link">
                  <Typography>New Release</Typography>
                </Link>
              </Box>
            </Grid>
            <Grid item sm={3} md={2} lg={2}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                }}
              >
                <Box sx={{ display: { xs: "block", sm: "none" } }}>
                  <IconButton
                    sx={{
                      mr: 2,
                    }}
                    color="inherit"
                    onClick={() => navigate("/dashboard/cart")}
                  >
                    <Badge badgeContent={totalItemsInCart} color="error">
                      <ShoppingBagOutlinedIcon />
                    </Badge>
                  </IconButton>
                  <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    onClick={toggleDrawer(true)}
                  >
                    <MenuIcon />
                  </IconButton>
                  <Drawer
                    anchor="right"
                    open={drawerOpen}
                    onClose={toggleDrawer(false)}
                  >
                    <Box
                      sx={{ width: 250, mt: 6 }}
                      role="presentation"
                      onClick={toggleDrawer(false)}
                      onKeyDown={toggleDrawer(false)}
                    >
                      <List>
                        {[{ text: "Home", path: "/dashboard/home" }, 
                          { text: "Books", path: "/dashboard/books" },
                          { text: "New Release", path: "/dashboard/new-release" }
                        ].map((item) => (
                          <ListItemButton
                            key={item.text}
                            component={Link} // هنا استخدمنا component={Link}
                            to={item.path} // استخدمنا to بدلاً من onClick
                            sx={{ textAlign: "center" }}
                          >
                            <ListItemText
                              primary={item.text}
                              className="navbarItem"
                            />
                          </ListItemButton>
                        ))}
                        <Divider />
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            gap: 1,
                            mt: 2,
                          }}
                        >
                          <IconButton color="inherit">
                            <PersonOutlineOutlinedIcon />
                          </IconButton>

                          <IconButton color="inherit">
                            <FavoriteBorderOutlinedIcon />
                          </IconButton>
                          <IconButton
                            color="inherit"
                            onClick={() => navigate("/")}
                          >
                            <Logout />
                          </IconButton>
                        </Box>
                      </List>
                    </Box>
                  </Drawer>
                </Box>
                <Box
                  className="Nav-icons"
                  sx={{
                    display: { xs: "none", sm: "flex" },
                    color: "blue",
                    gap: 1,
                  }}
                >
                  <IconButton color="inherit">
                    <PersonOutlineOutlinedIcon />
                  </IconButton>
                  <Divider orientation="vertical" flexItem sx={{ ml: 1 }} />
                  <IconButton
                    color="inherit"
                    onClick={() => navigate("/dashboard/cart")}
                  >
                    <Badge badgeContent={totalItemsInCart} color="error">
                      <ShoppingBagOutlinedIcon />
                    </Badge>
                  </IconButton>
                  <Divider orientation="vertical" flexItem sx={{ ml: 1 }} />
                  <IconButton color="inherit">
                    <FavoriteBorderOutlinedIcon />
                  </IconButton>
                  <Divider orientation="vertical" flexItem sx={{ ml: 1 }} />
                  <IconButton color="inherit" onClick={handleLogout}>
                    <Logout />
                  </IconButton>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}
