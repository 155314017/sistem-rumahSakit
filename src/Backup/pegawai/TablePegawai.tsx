import { useState, useEffect } from "react";
import * as React from 'react';
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
  IconButton,
  Pagination,
  Collapse,
} from "@mui/material";
import SearchBar from "../../components/small/SearchBar";
import DropdownList from "../../components/small/DropdownList";
import { styled } from "@mui/material/styles";
import bgImage from "../../assets/img/String.png";

// icon
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";

import DataPegawai from "../../dummyData/dataPegawai";
import { EmployeeDataItem, EmployeeServices } from "../../services/Admin Tenant/ManageEmployee/EmployeeServices";
// import ModalDeleteConfirmation from "../../components/small/ModalDeleteConfirmation";

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

export default function TablePegawai() {
  const [page, setPage] = useState(1);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [datas, setDatas] = useState<EmployeeDataItem[]>([]);
  // const [open, setOpen] = React.useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await EmployeeServices();
        setDatas(result); // Store the result in datas state
      } catch (error) {
        console.log('Failed to fetch data from API: ', error);
      }
    };

    fetchData();
  }, []);

  const handleChangePage = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const rowsPerPage = 10;

  const displayedData = datas.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  const sortir = [
    { value: 1, label: "Role Pegawai" },
    { value: 2, label: "Role Pegawai" },
    { value: 3, label: "Role Pegawai" },
  ];

  const urutkan = [
    { value: 1, label: "Terbaru" },
    { value: 2, label: "Terlama" },
    { value: 3, label: "Nama Pegawai A-Z" },
    { value: 4, label: "Nama Pegawai Z-A" },
  ];

  const toggleCollapse = () => {
    setIsCollapsed((prev) => !prev);
  };

  const confirmationDelete = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    // setOpen(true);
  };


  return (
    <Box>
      <Box
        position={"relative"}
        p={3}
        sx={{ borderRadius: "24px", bgcolor: "#fff", overflow: "hidden" }}
      >
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography
            sx={{
              textTransform: "capitalize",
              fontWeight: "700",
              fontSize: "20px",
            }}
          >
            Daftar Pegawai
          </Typography>
          {/* collapse button */}
          <IconButton sx={{ zIndex: 1 }} onClick={toggleCollapse}>
            {isCollapsed ? (
              <ChevronRightRoundedIcon
                sx={{ fontSize: "30px", color: "#8F85F3" }}
              />
            ) : (
              <ExpandMoreRoundedIcon
                sx={{ fontSize: "30px", color: "#8F85F3" }}
              />
            )}
          </IconButton>
        </Box>

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

        <Collapse in={!isCollapsed} timeout="auto" unmountOnExit>
          <Box>
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
                // onChange={handleSelectionChange}
                loading={false}
              />
              <DropdownList
                options={urutkan}
                placeholder="Urutkan"
                // onChange={handleSelectionChange}
                loading={false}
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
                        width={"10%"}
                        sx={{
                          fontSize: "14px",
                          fontWeight: 700,
                          color: "#292B2C",
                          bgcolor: "#F1F0FE",
                        }}
                        align="center"
                      >
                        NIP
                      </TableCell>
                      <TableCell
                        width={"15%"}
                        sx={{
                          fontSize: "14px",
                          fontWeight: 700,
                          color: "#292B2C",
                          bgcolor: "#F1F0FE",
                        }}
                        align="left"
                      >
                        Nama Pegawai
                      </TableCell>
                      <TableCell
                        width={"12%"}
                        sx={{
                          fontSize: "14px",
                          fontWeight: 700,
                          color: "#292B2C",
                          bgcolor: "#F1F0FE",
                        }}
                        align="left"
                      >
                        Role Pegawai
                      </TableCell>
                      <TableCell
                        width={"12%"}
                        sx={{
                          fontSize: "14px",
                          fontWeight: 700,
                          color: "#292B2C",
                          bgcolor: "#F1F0FE",
                        }}
                        align="center"
                      >
                        Menu Akses
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
                        Detail Akses
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
                    {displayedData.length > 0 ? (
                        displayedData.map((data, index) => (
                          <StyledTableRow key={index}>
                            <TableCell
                              sx={[{ color: "#292B2C", fontSize: "14px" }]}
                              align="center"
                            >
                              {data.masterUser.identityNumber}
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
                            >
                              {data.name}
                            </TableCell>
                            <TableCell
                              sx={[
                                {
                                  color: "#292B2C",
                                  fontSize: "14px",
                                  textTransform: "capitalize",
                                },
                              ]}
                            >
                              {data.role}
                            </TableCell>
                            <TableCell
                              align="center"
                              sx={[{ color: "#292B2C", fontSize: "14px" }]}
                            >
                              {data.name}
                            </TableCell>
                            <TableCell
                              align="center"
                              sx={[{ color: "#292B2C", fontSize: "14px" }]}
                            >
                              {data.name}
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
                                onClick={confirmationDelete}
                                href="#"
                                mr={2}
                                underline="hover"
                                sx={{
                                  textTransform: "capitalize",
                                  color: "#8F85F3",
                                }}
                              >
                                Hapus
                              </Link>

                              {/* <ModalDeleteConfirmation open={open} onClose={() => setOpen(false)} /> */}
                              <Link
                                href="#"
                                mr={2}
                                underline="hover"
                                sx={{
                                  textTransform: "capitalize",
                                  color: "#8F85F3",
                                }}
                              >
                                Ubah
                              </Link>
                              <Link
                                href="/detailPegawai"
                                underline="hover"
                                sx={{
                                  textTransform: "capitalize",
                                  color: "#8F85F3",
                                }}
                              >
                                Lihat selengkapnya
                              </Link>
                            </TableCell>
                          </StyledTableRow>
                        ))
                     ) : (
                      <StyledTableRow>
                        <TableCell colSpan={11} align="center">
                          Tidak ada data
                        </TableCell>
                      </StyledTableRow>
                    )}
                  </TableBody>
                </Table>
              </StyledTableContainer>
            </Box>
            <Stack spacing={2} direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
              <Typography sx={{ color: "#A8A8BD" }}>
                Showing {((page - 1) * rowsPerPage) + 1} to{" "}
                {Math.min(page * rowsPerPage, datas.length)} of{" "}
                {datas.length} entries
              </Typography>
              <Pagination
                count={Math.ceil(datas.length / rowsPerPage)}
                variant="outlined"
                shape="rounded"
                page={page}
                onChange={handleChangePage}
                sx={{
                  "& .MuiPaginationItem-root": {
                    color: "#8F85F3",
                    border: 'none',
                  },
                  "& .Mui-selected": {
                    backgroundColor: "#8F85F3",
                    bgcolor: '#D5D1FB',
                  },
                  "& .MuiPaginationItem-ellipsis": {
                    border: 'none',
                  },
                  "& .MuiPaginationItem-text": {
                    border: 'none',
                  },
                }}
              />

            </Stack>
          </Box>
        </Collapse>
      </Box>
    </Box>
  );
}