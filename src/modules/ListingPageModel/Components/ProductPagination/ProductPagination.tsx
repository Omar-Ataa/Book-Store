// components/ProductPagination.tsx
import { Box, Pagination, PaginationItem, useMediaQuery } from "@mui/material";
import { ArrowForward, ArrowBack } from "@mui/icons-material";
interface ProductPaginationProps {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (event: React.ChangeEvent<unknown>, page: number) => void;
}

export default function ProductPagination({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
}: ProductPaginationProps) {
  const isMobile = useMediaQuery("(max-width:600px)")
  return (
    <Box sx={{ display: "flex", justifyContent: "center", my: 5 }}>
      <Pagination
        count={Math.ceil(totalItems / itemsPerPage)}
        page={currentPage}
        onChange={onPageChange}
        color="primary"
        shape="rounded"
        renderItem={(item) => (
          <PaginationItem
            components={{ previous: ArrowBack, next: ArrowForward }}
            {...item}
          />
        )}
        sx={{
          ".Mui-selected": {
            bgcolor: "#ED553B !important",
            ":hover": {
              backgroundColor: "#ED353B",
            },
          },
          ".MuiPaginationItem-root": {
            border: "1px solid #E5E3DA",
            borderRadius: "50%",
            width: isMobile?"20px": "48px",
            height: isMobile?"32px": "48px",
          },
        }}
      />
    </Box>
  );
}
