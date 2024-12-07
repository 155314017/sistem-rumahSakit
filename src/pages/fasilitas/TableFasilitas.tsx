import React, { useState, useEffect } from "react";
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

import ModalDeleteConfirmation from "../../components/small/ModalDeleteConfirmation";
import { FacilityServices, FacilityDataItem } from "../../services/ManageFacility/FacilityServices";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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

interface TableFacilityProps {
  fetchDatas: () => void;
  onSuccessDelete: () => void;
}

const TableFasilitas: React.FC<TableFacilityProps> = ({ fetchDatas, onSuccessDelete }) => {
  const [page, setPage] = useState(1);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [open, setOpen] = React.useState<boolean>(false);
  // const [data, setData] = useState<FacilityDataItem[]>([]);
  const [datas, setDatas] = useState<FacilityDataItem[]>([]);
  const [deletedItems, setDeletedItems] = useState("");
  const [dataIdBuilding, setDataIdBuilding] = useState<string[]>([]);

  const navigate = useNavigate();

  const fetchData = async () => {
    console.log('Fetching data...');
    try {
      const result = await FacilityServices();
      console.log('Result: ', result);
      setDatas(result);
      console.log("FETCHIG DATA ID FAICILITY")
      const buildingIds = result.map((data) => data.masterBuildingId);
      setDataIdBuilding(buildingIds);

      console.log('Data ID Facility: ', buildingIds);
      // setData(result); // Set data to display in table
    } catch (error) {
      console.log('Failed to fetch data from API: ', error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);



  const [buildings, setBuildings] = useState<string[]>([]);

  useEffect(() => {
    const fetchBuildings = async () => {
      try {
        const responses = await Promise.all(
          dataIdBuilding.map((id) => axios.get(`https://hms.3dolphinsocial.com:8083/v1/manage/building/${id}`))
        );

        const facilitiesData = responses.map((response) => {
          const name = response.data.data.name;
          return name ? name : "Data Gedung Tidak Tercatat";
        });

        setBuildings(facilitiesData);
        console.log("DATA FASILITAS UTAMA");
        console.log(facilitiesData);
      } catch (err) {
        console.error('Error:', err);
      }
    };

    if (dataIdBuilding.length > 0) {
      fetchBuildings();
    }
  }, [dataIdBuilding]);



  const handleChangePage = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const rowsPerPage = 10;

  const displayedData = datas.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  const urutkan = [
    { value: 1, label: "Biaya penanganan tertinggi" },
    { value: 2, label: "Biaya penanganan terendah" },
    { value: 3, label: "Nama fasilitas A-Z" },
    { value: 4, label: "Nama fasilitas Z-A" },
  ];

  const handleSelectionChange = (selectedValue: string) => {
    console.log("Selected Value:", selectedValue);
  };

  const toggleCollapse = () => {
    setIsCollapsed((prev) => !prev);
  };

  const confirmationDelete = (event: React.MouseEvent<HTMLAnchorElement>, buildingId: string) => {
    event.preventDefault();
    console.log("ID Gedung yang akan dihapus:", buildingId);
    setDeletedItems(buildingId);
    setOpen(true);
  };

  const handleDeleteSuccess = () => {
    console.log("Item deleted successfully");
    onSuccessDelete();
    fetchDatas();
    fetchData();
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
            Daftar Fasilitas
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
                options={urutkan}
                placeholder="Urutkan"
                onChange={handleSelectionChange}
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
                        No. Fasilitas
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
                        Nama Fasilitas
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
                        Deskripsi
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
                        Biaya Penanganan
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
                        Gedung
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
                            {index + 1}
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
                            {data.name}
                          </TableCell>
                          <TableCell
                            sx={[
                              {
                                color: "#292B2C",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                                maxWidth: "150px",
                                fontSize: "14px",
                                textTransform: "capitalize",
                              },
                            ]}
                            align="center"
                          >
                            {data.description}
                          </TableCell>
                          <TableCell
                            sx={[
                              {
                                color: "#292B2C",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                                maxWidth: "150px",
                                fontSize: "14px",
                                textTransform: "capitalize",
                              },
                            ]}
                            align="center"
                          >
                            {data.cost}
                          </TableCell>
                          <TableCell
                            sx={[
                              {
                                color: "#292B2C",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                                maxWidth: "150px",
                                fontSize: "14px",
                                textTransform: "capitalize",
                              },
                            ]}
                            align="center"
                          >
                            {buildings[index]}
                          </TableCell>
                          <TableCell
                            sx={[
                              {
                                color: "#292B2C",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                                maxWidth: "150px",
                                fontSize: "14px",
                                textTransform: "capitalize",
                              },
                            ]}
                            align="center"
                          >
                            {data.operationalSchedule}
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
                              underline="none"
                              color={"#8F85F3"}
                              onClick={(event) => confirmationDelete(event, data.id)}
                              sx={{ mr: 2 }}
                            >
                              Hapus
                            </Link>
                            <ModalDeleteConfirmation open={open} onClose={() => setOpen(false)} apiUrl={`https://hms.3dolphinsocial.com:8083/v1/manage/facility/${deletedItems}`} onDeleteSuccess={handleDeleteSuccess} />
                            <Link
                              href="#"
                              mr={2} 
                              onClick={() => navigate(`/editFasilitas/${data.id}`)}
                              underline="hover"
                              sx={{
                                textTransform: "capitalize",
                                color: "#8F85F3",
                              }}
                            >
                              Ubah
                            </Link>
                            <Link
                              href="/detailFasilitas "
                              underline="hover"
                              sx={{
                                textTransform: "capitalize",
                                color: "#8F85F3",
                              }}
                            >
                              Lihat Selengkapnya
                            </Link>
                          </TableCell>
                        </StyledTableRow>
                      ))
                    ) : (
                      <StyledTableRow>
                        <TableCell colSpan={7} align="center">
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


export default TableFasilitas;