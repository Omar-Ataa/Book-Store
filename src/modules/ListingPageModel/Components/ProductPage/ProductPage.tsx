import {
  Box,
  Typography,
  Grid,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  useMediaQuery,
} from "@mui/material";
import TopSection from "../TopSection/TopSection";
import SidebarFilters from "../SidebarFilters/SidebarFilters";
import { useContext, useEffect, useMemo, useState } from "react";
import { TestImages } from "../../../../constants/ImgArray";
import ProductGrid from "../ProductGrid/ProductGrid";
import ProductPagination from "../ProductPagination/ProductPagination";
import { CartContext } from "../../../../Context/CartContext";
import { useSearchParams } from "react-router-dom";

export default function ProductPage() {
  const [minPrice, setMinPrice] = useState<number | undefined>();
  const [maxPrice, setMaxPrice] = useState<number | undefined>();
  const [sortOrder, setSortOrder] = useState<string>("alphabetical");
  const [itemsPerPage, setItemsPerPage] = useState<number>(12);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  let cartContext = useContext(CartContext);
  const [searchParams] = useSearchParams();
  const isMobile = useMediaQuery("(max-width:600px)");
  useEffect(() => {
    const categoryFromParams = searchParams.get("category");
    if (categoryFromParams) {
      setSelectedCategories([categoryFromParams]);
    }
  }, [searchParams]);

  const allBooks =
    cartContext?.categories.flatMap((category: any) =>
      category.books.map((book: any, index: number) => ({
        id: book._id,
        name: book.name,
        author: book.author || book.auther,
        price: book.price,
        image: TestImages[index % TestImages.length],
        categoryId: category._id,
      }))
    ) || [];

  // Filtering and sorting books using useMemo
  const filteredProducts = useMemo(() => {
    let filteredProducts = [...allBooks];

    // Apply filtering based on selected categories
    if (selectedCategories.length > 0) {
      filteredProducts = filteredProducts.filter((product) =>
        selectedCategories.includes(product.categoryId)
      );
    }
    // Apply sorting
    if (sortOrder === "alphabetical") {
      filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOrder === "price-asc") {
      filteredProducts.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "price-desc") {
      filteredProducts.sort((a, b) => b.price - a.price);
    }

    // Apply price filtering
    filteredProducts = filteredProducts.filter((product) => {
      const meetsMinPrice =
        minPrice !== undefined ? product.price >= minPrice : true;
      const meetsMaxPrice =
        maxPrice !== undefined ? product.price <= maxPrice : true;
      return meetsMinPrice && meetsMaxPrice;
    });

    // If both minPrice and maxPrice are undefined, display all products
    if (minPrice === undefined && maxPrice === undefined) {
      return filteredProducts;
    }

    return filteredProducts; // Return filtered and sorted products
  }, [selectedCategories, minPrice, maxPrice, sortOrder, allBooks]);

  // Function to select/deselect a category
  const handleCategoryChange = (categoryId: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories((prev) => [...prev, categoryId]); // إضافة الفئة
    } else {
      setSelectedCategories((prev) => prev.filter((id) => id !== categoryId)); // إزالة الفئة
    }
  };

  const handleItemsToShowChange = (event: any) => {
    setItemsPerPage(event.target.value);
    setCurrentPage(1);
  };

  //handle Page Change
  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setCurrentPage(page);
  };

  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // clear filter function
  const clearFilter = () => {
    setMinPrice(undefined);
    setMaxPrice(undefined);
    setSelectedCategories([]);
  };
  return (
    <>
      <TopSection currentPath="Home" pageTitle="Books" />
      <Box sx={{ padding: !isMobile ? 4 : 2 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={3}>
            <SidebarFilters
              minPrice={minPrice}
              maxPrice={maxPrice}
              setMinPrice={setMinPrice}
              setMaxPrice={setMaxPrice}
              clearFilter={clearFilter}
              onCategoryChange={handleCategoryChange}
            />
          </Grid>
          <Grid item xs={12} md={9}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 4,
              }}
            >
              <FormControl variant="standard" sx={{ width: 200 }}>
                <InputLabel>Sort by : </InputLabel>
                <Select
                  value={sortOrder}
                  onChange={(event) => setSortOrder(event.target.value)}
                  label="Sort by "
                  sx={{
                    color: "#393280",
                    fontWeight: "600",
                    fontSize: isMobile ? "" : "",
                  }}
                >
                  <MenuItem value="alphabetical">Alphabetically, A-Z</MenuItem>
                  <MenuItem value="price-asc">Price: Low to High</MenuItem>
                  <MenuItem value="price-desc">Price: High to Low</MenuItem>
                </Select>
              </FormControl>
              <Typography
                variant="body1"
                color="#393280"
                fontWeight="600"
                sx={{
                  fontSize: isMobile ? ".8rem" : "1rem",
                  textAlign: isMobile ? "center" : "start",
                }}
              >
                Showing {indexOfFirstProduct + 1}-
                {Math.min(indexOfLastProduct, filteredProducts.length)} of{" "}
                {filteredProducts.length} results
              </Typography>
              <FormControl
                variant="standard"
                sx={{ width: 100, color: "#393280", fontWeight: "600" }}
              >
                <InputLabel>Show : </InputLabel>
                <Select
                  value={itemsPerPage}
                  onChange={handleItemsToShowChange}
                  label="Show"
                >
                  <MenuItem value={8}>8</MenuItem>
                  <MenuItem value={12}>12</MenuItem>
                  <MenuItem value={24}>24</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <ProductGrid products={currentProducts} />
            <ProductPagination
              currentPage={currentPage}
              totalItems={filteredProducts.length}
              itemsPerPage={itemsPerPage}
              onPageChange={handlePageChange}
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
