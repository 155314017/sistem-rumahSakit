import { useState } from "react";
import {
  Box,
  Stack,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Link,
  TablePagination,
} from "@mui/material";
import SearchBar from "../../components/small/SearchBar";
import DropdownList from "../../components/small/DropdownList";
import { styled } from "@mui/material/styles";
import bgImage from "../../assets/img/String.png";

import DataAmbulance from "../../dummyData/dataAmbulance";

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const StyledTableContainer = styled(TableContainer)`
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #8f85f3;
    border-radius: 10px;
    border: 2px solid #f1f1f1;
  }

  ::-webkit-scrollbar-thumb:hover {
    background-color: #6c63ff;
    cursor: pointer;
  }
`;

export default function TableAmbulance() {
  const datas = DataAmbulance;

  const [page, setPage] = useState(2);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (
    _event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const displayedData = datas.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const sortir = [
    { value: 1, label: "Status" },
    { value: 2, label: "Status" },
    { value: 3, label: "Status" },
  ];

  const urutkan = [
    { value: 1, label: "Tarif ambulance tertinggi" },
    { value: 2, label: "Tarif ambulance  terendah" },
    { value: 3, label: "Nomor ambulance 1-9" },
    { value: 4, label: "Nomor ambulance 9-1" },
  ];

  const handleSelectionChange = (selectedValue: string) => {
    console.log("Selected Value:", selectedValue);
  };

  return (
    <Box>
      <Box
        position={"relative"}
        p={3}
        height={800}
        sx={{ borderRadius: "24px", bgcolor: "#fff" }}
      >
        <Typography
          sx={{
            textTransform: "capitalize",
            fontWeight: "700",
            fontSize: "20px",
          }}
        >
          Daftar Ambulance
        </Typography>

        {/* membuat bentuk lengkung atas */}
        <Box
          position={"absolute"}
          sx={{
            top: 0,
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
          }}
        >
          {/* lengkung kiri */}
          <Box
            sx={{
              width: "50px",
              height: "30px",
              bgcolor: "#F1F0FE",
            }}
          >
            <Box
              sx={{
                width: "50px",
                height: "30px",
                bgcolor: "#fff",
                borderRadius: "0px 15px 0px 0px ",
              }}
            />
          </Box>

          {/* kotak tengah */}
          <Box
            sx={{
              width: "600px",
              height: "50px",
              bgcolor: "#F1F0FE",
              borderRadius: "0px 0px 22px 22px",
            }}
          />

          {/* lengkung kanan */}
          <Box
            sx={{
              width: "50px",
              height: "30px",
              bgcolor: "#F1F0FE",
            }}
          >
            <Box
              sx={{
                width: "50px",
                height: "30px",
                bgcolor: "#fff",
                borderRadius: "15px 0px 0px 0px ",
              }}
            />
          </Box>
        </Box>
        {/* ---------- */}

        <Box position="absolute" sx={{ top: 0, right: 0 }}>
          <img src={bgImage} alt="bg-image" />
        </Box>

        <Box
          mt={3}
          display={"flex"}
          justifyContent={"space-between"}
          sx={{ gap: 3 }}
        >
          <SearchBar />
          <DropdownList
            options={sortir}
            placeholder="Sortir"
            onChange={handleSelectionChange}
          />
          <DropdownList
            options={urutkan}
            placeholder="Urutkan"
            onChange={handleSelectionChange}
          />
        </Box>

        <Box mt={3}>
          <StyledTableContainer
            sx={{
              mt: 2,
              boxShadow: "none",
              mb: 2,
              maxHeight: "610px",
              borderRadius: "16px",
            }}
          >
            <Table stickyHeader sx={{ width: "100%" }}>
              <TableHead>
                <TableRow>
                  <TableCell
                    width={"15%"}
                    sx={{
                      fontSize: "14px",
                      fontWeight: 700,
                      color: "#292B2C",
                      bgcolor: "#F1F0FE",
                    }}
                    align="center"
                  >
                    No. Ambulance
                  </TableCell>
                  <TableCell
                    width={"15%"}
                    sx={{
                      fontSize: "14px",
                      fontWeight: 700,
                      color: "#292B2C",
                      bgcolor: "#F1F0FE",
                    }}
                    align="center"
                  >
                    Biaya Tarif
                  </TableCell>
                  <TableCell
                    width={"15%"}
                    sx={{
                      fontSize: "14px",
                      fontWeight: 700,
                      color: "#292B2C",
                      bgcolor: "#F1F0FE",
                    }}
                    align="center"
                  >
                    Jam Operasional
                  </TableCell>
                  <TableCell
                    width={"15%"}
                    sx={{
                      fontSize: "14px",
                      fontWeight: 700,
                      color: "#292B2C",
                      bgcolor: "#F1F0FE",
                    }}
                    align="center"
                  >
                    Status
                  </TableCell>
                  <TableCell
                    width={"15%"}
                    sx={{
                      fontSize: "14px",
                      fontWeight: 700,
                      color: "#292B2C",
                      bgcolor: "#F1F0FE",
                    }}
                    align="center"
                  >
                    Aksi
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {displayedData.map((data, index) => (
                  <StyledTableRow key={index}>
                    <TableCell
                      sx={[{ color: "#292B2C", fontSize: "14px" }]}
                      align="center"
                    >
                      {data.no_ambulance}
                    </TableCell>
                    <TableCell
                      sx={[
                        {
                          color: "#292B2C",
                          fontSize: "14px",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                          maxWidth: "150px",
                          textTransform: "capitalize",
                        },
                      ]}
                      align="center"
                    >
                      Rp {data.biaya_tarif},-
                    </TableCell>
                    <TableCell
                      sx={[
                        {
                          color: "#292B2C",
                          fontSize: "14px",
                          textTransform: "capitalize",
                        },
                      ]}
                      align="center"
                    >
                      {data.jam_operasional}
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={[
                        {
                          color: "#292B2C",
                          fontSize: "14px",
                          display: "flex",
                          justifyContent: "center",
                        },
                      ]}
                    >
                      <Box
                        sx={{
                          bgcolor:
                            data.status === "available" ? "#d4edda" : "#f8d7da",
                          color:
                            data.status === "available" ? "#155724" : "#721c24",
                          padding: "4px 8px",
                          borderRadius: "8px",
                          textTransform: "capitalize",
                          width: "80px",
                        }}
                      >
                        {data.status}
                      </Box>
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={[
                        {
                          color: "#292B2C",
                          fontSize: "14px",
                          textTransform: "capitalize",
                        },
                      ]}
                    >
                      <Link
                        href="#"
                        mr={2}
                        underline="hover"
                        sx={{ textTransform: "capitalize", color: "#F04438" }}
                      >
                        Hapus
                      </Link>
                      <Link
                        href="#"
                        mr={2}
                        underline="hover"
                        sx={{ textTransform: "capitalize", color: "#8F85F3" }}
                      >
                        Ubah
                      </Link>
                      <Link
                        href="#"
                        underline="hover"
                        sx={{ textTransform: "capitalize", color: "#8F85F3" }}
                      >
                        Detail
                      </Link>
                    </TableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </StyledTableContainer>
        </Box>
        <Stack
          spacing={2}
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Typography sx={{ color: "#8F85F3" }}>
            Showing {page * rowsPerPage + 1} to{" "}
            {Math.min(page * rowsPerPage + rowsPerPage, datas.length)} of{" "}
            {datas.length} entries
          </Typography>
          <TablePagination
            // shape="rounded"
            count={datas.length}
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              color: "#8F85F3",
              "& .MuiPaginationItem-root": {
                color: "#8F85F3",
              },
              "& .Mui-selected": {
                backgroundColor: "#8F85F3",
                color: "white",
              },
              "& .MuiPaginationItem-ellipsis": {
                color: "#8F85F3",
              },
            }}
          />
        </Stack>
      </Box>
    </Box>
  );
}