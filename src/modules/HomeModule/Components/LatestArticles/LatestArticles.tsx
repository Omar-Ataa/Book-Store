import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import { ArrowForward } from "@mui/icons-material";

const articles = [
  {
    date: "2 Aug, 2021",
    title: "Reading Books Always Makes The Moments Happy",
    image: "/article(1).png",
  },
  {
    date: "2 Aug, 2021",
    title: "Reading Books Always Makes The Moments Happy",
    image: "/article(2).png",
  },
  {
    date: "2 Aug, 2021",
    title: "Reading Books Always Makes The Moments Happy",
    image: "/article(3).png",
  },
];

export default function LatestArticles() {
  return (
    <Box
      sx={{
        padding: { xs: 3, md: 10 },
        textAlign: "center",
        bgcolor: "#F7FCFC",
      }}
    >
      <Typography
        variant="overline"
        sx={{ color: "#888", letterSpacing: "2px", mb: 2 }}
      >
        READ OUR ARTICLES
      </Typography>
      <Box sx={{ position: "relative", textAlign: "center", mt: 2 }}>
        {/* الخط الأفقي */}
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: 0,
            right: 0,
            height: "1px",
            backgroundColor: "#E0E0E0",
            zIndex: 1,
          }}
        />

        {/* العنوان في المنتصف */}
        <Typography
          variant="h1"
          gutterBottom
          sx={{
            position: "relative", // يضمن أن النص فوق الخط
            display: "inline-block", // لكي يكون النص في المنتصف بشكل صحيح
            padding: "0 16px", // لضمان وجود مسافة بين النص والخط
            fontSize: { xs: "20px", md: "48px" },
            textTransform: "capitalize",
            fontWeight: 400,
            color: "var(--blue-color)",
            backgroundColor: "#F7FCFC", // لإخفاء الخط خلف النص
            zIndex: 2, // النص فوق الخط
          }}
        >
          Latest Articles
        </Typography>
      </Box>
      <Grid my={3} container spacing={8} justifyContent="center">
        {articles.map((article, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Card
              sx={{
                boxShadow: "none",
                bgcolor: "transparent",
                borderRadius: "0",
                maxWidth: { xs: "100%", md: "345px" },
                margin: { xs: "0 auto", md: "inherit" },
              }}
            >
              <CardMedia
                component="img"
                image={article.image}
                alt={article.title}
                sx={{
                  borderRadius: "8px",
                  height: { xs: "200px", md: "250px" },
                  objectFit: "cover",
                }}
              />
              <CardContent sx={{ textAlign: "left", paddingTop: 3 }}>
                <Typography
                  variant="body2"
                  textTransform={"capitalize"}
                  fontSize={{ xs: "14px", md: "15px" }}
                  color="#74642F"
                >
                  {article.date}
                </Typography>
                <Typography
                  variant="h6"
                  fontWeight="400"
                  fontSize={{ xs: "18px", md: "26px" }}
                  gutterBottom
                  color={"#173F5F"}
                >
                  {article.title}
                </Typography>
                <Box
                  sx={{
                    left: 0,
                    right: 0,
                    height: "1px",
                    backgroundColor: "#E0E0E0",
                    my: "1rem",
                  }}
                />
                <Box display="flex" justifyContent="flex-end">
                  <Box>
                    <FacebookIcon
                      fontSize="small"
                      sx={{ mx: 2, color: "#173F5f" }}
                    />
                    <TwitterIcon
                      fontSize="small"
                      sx={{ mx: 2, color: "#173F5f" }}
                    />
                    <InstagramIcon
                      fontSize="small"
                      sx={{ mx: 2, color: "#173F5f" }}
                    />
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Button
        endIcon={<ArrowForward />}
        variant="outlined"
        sx={{
          mt: 4,
          paddingX: 4,
          paddingY: 1.5,
          textTransform: "uppercase",
          color: "#173F5F",
          borderColor: "#173F5F",
          letterSpacing: "1.6px",
          fontSize: { xs: "10px", md: "16px" },
        }}
      >
        Read All Articles
      </Button>
    </Box>
  );
}
