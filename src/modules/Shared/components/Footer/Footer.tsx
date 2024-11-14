import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  IconButton,
  Divider,
} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";

export default function Footer() {
  return (
    <Box id="footer" sx={{ bgcolor: "rgba(237, 85, 59, 1)", color: "white", py: 6 ,}}>
      <Container maxWidth="lg">
        <Grid container spacing={5}>
          <Grid item xs={12} sm={4}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: { xs: "center", sm: "flex-start" },
              }}
            >
              <Box
                component="img"
                src="src/assets/Logo.png"
                alt="Logo"
                sx={{ width: 80, height: 80, mb: 2 }}
              />
              <Typography
                variant="body2"
                sx={{ mb: 2, textAlign: { xs: "center", sm: "left" } }}
              >
                Nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                commodo consequat.
              </Typography>
              <Box>
                <IconButton
                  color="inherit"
                  aria-label="Facebook"
                  component="a"
                    sx={{ mr: 1 }}
                >
                  <FacebookIcon />
                </IconButton>
                <IconButton
                  color="inherit"
                  aria-label="LinkedIn"
                  component="a"
                    sx={{ mr: 1 }}
                >
                  <LinkedInIcon />
                </IconButton>
                <IconButton
                  color="inherit"
                  aria-label="Twitter"
                  component="a"
                    sx={{ mr: 1 }}
                >
                  <TwitterIcon />
                </IconButton>
                <IconButton
                  color="inherit"
                  aria-label="YouTube"
                  component="a"
                  >
                  <YouTubeIcon />
                </IconButton>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography
              fontWeight={"bold"}
              variant="h6"
              gutterBottom
              component="div"
            >
              COMPANY
            </Typography>
            <Link href="#" color="inherit" display="block" sx={{ mb: 1 }}>
              HOME
            </Link>
            <Link href="#" color="inherit" display="block" sx={{ mb: 1 }}>
              ABOUT US
            </Link>
            <Link href="#" color="inherit" display="block" sx={{ mb: 1 }}>
              BOOKS
            </Link>
            <Link href="#" color="inherit" display="block" sx={{ mb: 1 }}>
              NEW RELEASE
            </Link>
            <Link href="#" color="inherit" display="block" sx={{ mb: 1 }}>
              CONTACT US
            </Link>
            <Link href="#" color="inherit" display="block">
              BLOG
            </Link>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography
              fontWeight={"bold"}
              variant="h6"
              gutterBottom
              component="div"
            >
              IMPORTANT LINKS
            </Typography>
            <Link href="#" color="inherit" display="block" sx={{ mb: 1 }}>
              Privacy Policy
            </Link>
            <Link href="#" color="inherit" display="block" sx={{ mb: 1 }}>
              FAQs
            </Link>
            <Link href="#" color="inherit" display="block">
              Terms of Service
            </Link>
          </Grid>
        </Grid>
        <Box
          mt={5}
          display="flex"
          justifyContent="space-between"
          flexWrap="wrap"
          alignItems="center"
        >
          <Typography variant="body2" sx={{ mb: { xs: 2, sm: 0 } }}>
            © 2024{" "}
            <Link
              target="_blank"
              className="text-warning fw-bold"
            >
               Omar
            </Link>{" "}
            . All Rights Reserved.
          </Typography>
          <Box display="flex" alignItems="center">
            <Link href="#" color="inherit" sx={{ mr: 2 }}>
              Privacy
            </Link>
            <Divider
              orientation="vertical"
              flexItem
              sx={{ mr: 2, bgcolor: "black" }}
            />
            <Link href="#" color="inherit">
              Terms of Service
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
