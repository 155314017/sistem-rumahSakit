import { Formik, Form, Field } from "formik";
import { Box, Stack } from "@mui/system";
import { Button, FormControl, Pagination, TextField, Typography } from "@mui/material";
import { useState } from "react";
import SearchBar from "../SearchBar";
import CardCatatanDetailTindakanPasien from "./CardCatatanDetailTindakanPasien";

export default function CardRekamMedis() {
    const [currentPage, setCurrentPage] = useState(1);
    const components = Array(5).fill(null);
    const [page, setPage] = useState(1);
    const pageSize = 2;
    const totalElements = components.length;
    const totalPages = Math.ceil(components.length / pageSize);
    const handleChangePage = (event, value) => {
        setPage(value);
    };

    const startIndex = (page - 1) * pageSize;
    const endIndex = page * pageSize;
    return (
        <Formik
            initialValues={{
                tinggiBadan: "",
                beratBadan: "",
                tekananDarah: "",
                suhuBadan: "",
                golonganDarah: "",
                detakJantung: "",
                frekuensiNafas: "",
                tingkatKesadaran: "",
                saturasi: "",
                alergi: "",
                catatanPerawat: "",
            }}
            onSubmit={(values) => {
                console.log(values);
            }}
        >
            {({ handleSubmit, values }) => (
                <Form onSubmit={handleSubmit}>
                    <Box
                        sx={{
                            borderRadius: "24px",
                            bgcolor: "#FAFAFA",
                            overflow: "hidden",
                            width: 'fit-content',
                            height: 'fit-content',
                            p: 4,
                            position: 'relative',
                            maxWidth: '100%'
                        }}
                    >
                        {/* membuat bentuk lengkung atas */}
                        <Box
                            position={"absolute"}
                            sx={{
                                top: 0,
                                left: "50%",
                                transform: "translateX(-50%)",
                                display: "flex",
                                // bgcolor: 'red'
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
                                        bgcolor: "#FAFAFA",
                                        borderRadius: "0px 15px 0px 0px ",
                                    }}
                                />
                            </Box>

                            {/* kotak tengah */}
                            <Box
                                sx={{
                                    width: "350px",
                                    height: "50px",
                                    bgcolor: "#F1F0FE",
                                    borderRadius: "0px 0px 22px 22px",
                                    '@media (max-width: 1194px)': { //responsif layar
                                        width: '200px'
                                    }
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
                                        bgcolor: "#FAFAFA",
                                        borderRadius: "15px 0px 0px 0px ",
                                    }}
                                />
                            </Box>
                        </Box>
                        {/* ---------- */}
                        <Box display={"flex"} flexDirection={"column"} justifyContent={"space-between"}>
                            <Typography
                                sx={{
                                    textTransform: "capitalize",
                                    fontWeight: "700",
                                    fontSize: "20px",
                                }}
                            >
                                Data Pemeriksaan
                            </Typography>
                        </Box>
                        {currentPage === 1 && (
                            <>

                                <Box mt={2} display={'flex'} flexDirection={'row'} gap={2} justifyContent={'space-between'} >
                                    <Button sx={{ width: '100%', height: '38px', bgcolor: '#8F85F3', color: 'white', border: '1px solid #8F85F3' }} >Data Pemeriksaan</Button>
                                    <Button sx={{ width: '100%', height: '38px', bgcolor: 'inherit', color: '#8F85F3', border: '1px solid #8F85F3' }} onClick={() => setCurrentPage(2)} >Rekam Medis</Button>
                                </Box>

                                <Box
                                    p={2}
                                    bgcolor={"#FFFFFF"}
                                    mt={2}
                                    border={"1px solid #C5C5D3"}
                                    borderRadius={"24px"}
                                    minHeight={"fit-content"}
                                >
                                    <FormControl sx={{ width: '100%' }} >
                                        <Typography>Tinggi Badan</Typography>
                                        <Field
                                            as={TextField}
                                            name="tinggiBadan"
                                            placeholder="Masukkan Tinggi Badan"
                                            variant="outlined"
                                            InputProps={{
                                                endAdornment: (
                                                    <Typography
                                                        sx={{
                                                            color: "black",
                                                            bgcolor: '#EEEEF2',
                                                            paddingRight: '8px',
                                                            minHeight: '90%',
                                                            justifyContent: 'center',
                                                            alignItems: 'center',
                                                            display: 'flex',
                                                            position: 'absolute',
                                                            border: '1px solid #A8A8BD',
                                                            right: 0,
                                                            top: 0,
                                                            bottom: 0,
                                                            width: 'fit-content',
                                                            px: 1,
                                                            borderTopRightRadius: '8px',
                                                            borderBottomRightRadius: '8px',
                                                        }}
                                                    >
                                                        Cm
                                                    </Typography>
                                                ),
                                            }}
                                            sx={{
                                                width: "100%",
                                                height: "48px",
                                                marginTop: "10px",
                                                "& .MuiOutlinedInput-root": {
                                                    borderRadius: "8px",
                                                    backgroundColor: "inherit",
                                                    position: 'relative',
                                                    "&:focus-within .MuiOutlinedInput-notchedOutline": {
                                                        borderColor: "#8F85F3",
                                                    },
                                                },
                                                "& .MuiOutlinedInput-notchedOutline": {
                                                    border: "1px solid #ccc",
                                                },
                                                "& .MuiOutlinedInput-input": {
                                                    padding: "10px",
                                                    fontSize: "16px",
                                                },
                                            }}
                                        />

                                    </FormControl>

                                    <FormControl sx={{ width: '100%' }} >
                                        <Typography>Berat Badan</Typography>
                                        <Field
                                            as={TextField}
                                            name="beratBadan"
                                            placeholder="Masukkan Berat Badan"
                                            variant="outlined"
                                            InputProps={{
                                                endAdornment: (
                                                    <Typography
                                                        sx={{
                                                            color: "black",
                                                            bgcolor: '#EEEEF2',
                                                            paddingRight: '8px',
                                                            minHeight: '90%',
                                                            justifyContent: 'center',
                                                            alignItems: 'center',
                                                            display: 'flex',
                                                            position: 'absolute',
                                                            border: '1px solid #A8A8BD',
                                                            right: 0,
                                                            top: 0,
                                                            bottom: 0,
                                                            width: 'fit-content',
                                                            px: 1,
                                                            borderTopRightRadius: '8px',
                                                            borderBottomRightRadius: '8px',
                                                        }}
                                                    >
                                                        Kg
                                                    </Typography>
                                                ),
                                            }}
                                            sx={{
                                                width: "100%",
                                                height: "48px",
                                                marginTop: "10px",
                                                "& .MuiOutlinedInput-root": {
                                                    borderRadius: "8px",
                                                    backgroundColor: "inherit",
                                                    "&:focus-within .MuiOutlinedInput-notchedOutline": {
                                                        borderColor: "#8F85F3",
                                                    },
                                                },
                                                "& .MuiOutlinedInput-notchedOutline": {
                                                    border: "1px solid #ccc",
                                                },
                                                "& .MuiOutlinedInput-input": {
                                                    padding: "10px",
                                                    fontSize: "16px",
                                                },
                                            }}
                                        />
                                    </FormControl>

                                    <FormControl sx={{ width: '100%' }} >
                                        <Typography>Tekanan Darah</Typography>
                                        <Field
                                            as={TextField}
                                            name="tekananDarah"
                                            placeholder="Masukkan Tekanan Darah"
                                            variant="outlined"
                                            InputProps={{
                                                endAdornment: (
                                                    <Typography
                                                        sx={{
                                                            color: "black",
                                                            bgcolor: '#EEEEF2',
                                                            paddingRight: '8px',
                                                            minHeight: '90%',
                                                            justifyContent: 'center',
                                                            alignItems: 'center',
                                                            display: 'flex',
                                                            position: 'absolute',
                                                            border: '1px solid #A8A8BD',
                                                            right: 0,
                                                            top: 0,
                                                            bottom: 0,
                                                            width: 'fit-content',
                                                            px: 1,
                                                            borderTopRightRadius: '8px',
                                                            borderBottomRightRadius: '8px',
                                                        }}
                                                    >
                                                        mmHg
                                                    </Typography>
                                                ),
                                            }}
                                            sx={{
                                                width: "100%",
                                                height: "48px",
                                                marginTop: "10px",
                                                "& .MuiOutlinedInput-root": {
                                                    borderRadius: "8px",
                                                    backgroundColor: "inherit",
                                                    "&:focus-within .MuiOutlinedInput-notchedOutline": {
                                                        borderColor: "#8F85F3",
                                                    },
                                                },
                                                "& .MuiOutlinedInput-notchedOutline": {
                                                    border: "1px solid #ccc",
                                                },
                                                "& .MuiOutlinedInput-input": {
                                                    padding: "10px",
                                                    fontSize: "16px",
                                                },
                                            }}
                                        />
                                    </FormControl>

                                    <FormControl sx={{ width: '100%' }} >
                                        <Typography>Suhu Badan</Typography>
                                        <Field
                                            as={TextField}
                                            name="suhuBadan"
                                            placeholder="Masukkan Suhu Badan"
                                            variant="outlined"
                                            InputProps={{
                                                endAdornment: (
                                                    <Typography
                                                        sx={{
                                                            color: "black",
                                                            bgcolor: '#EEEEF2',
                                                            paddingRight: '8px',
                                                            minHeight: '90%',
                                                            justifyContent: 'center',
                                                            alignItems: 'center',
                                                            display: 'flex',
                                                            position: 'absolute',
                                                            border: '1px solid #A8A8BD',
                                                            right: 0,
                                                            top: 0,
                                                            bottom: 0,
                                                            width: 'fit-content',
                                                            px: 1,
                                                            borderTopRightRadius: '8px',
                                                            borderBottomRightRadius: '8px',
                                                        }}
                                                    >
                                                        °C
                                                    </Typography>
                                                ),
                                            }}
                                            sx={{
                                                width: "100%",
                                                height: "48px",
                                                marginTop: "10px",
                                                "& .MuiOutlinedInput-root": {
                                                    borderRadius: "8px",
                                                    backgroundColor: "inherit",
                                                    "&:focus-within .MuiOutlinedInput-notchedOutline": {
                                                        borderColor: "#8F85F3",
                                                    },
                                                },
                                                "& .MuiOutlinedInput-notchedOutline": {
                                                    border: "1px solid #ccc",
                                                },
                                                "& .MuiOutlinedInput-input": {
                                                    padding: "10px",
                                                    fontSize: "16px",
                                                },
                                            }}
                                        />
                                    </FormControl>

                                    <FormControl sx={{ width: '100%' }} >
                                        <Typography>Golongan Darah</Typography>
                                        <Field
                                            as={TextField}
                                            name="golonganDarah"
                                            placeholder="Masukkan Golongan Darah"
                                            variant="outlined"
                                            sx={{
                                                width: "100%",
                                                height: "48px",
                                                marginTop: "10px",
                                                "& .MuiOutlinedInput-root": {
                                                    borderRadius: "8px",
                                                    backgroundColor: "inherit",
                                                    "&:focus-within .MuiOutlinedInput-notchedOutline": {
                                                        borderColor: "#8F85F3",
                                                    },
                                                },
                                                "& .MuiOutlinedInput-notchedOutline": {
                                                    border: "1px solid #ccc",
                                                },
                                                "& .MuiOutlinedInput-input": {
                                                    padding: "10px",
                                                    fontSize: "16px",
                                                },
                                            }}
                                        />
                                    </FormControl>

                                    <FormControl sx={{ width: '100%' }} >
                                        <Typography>Detak Jantung</Typography>
                                        <Field
                                            as={TextField}
                                            name="detakJantung"
                                            placeholder="Masukkan Detakan Jantung"
                                            variant="outlined"
                                            InputProps={{
                                                endAdornment: (
                                                    <Typography
                                                        sx={{
                                                            color: "black",
                                                            bgcolor: '#EEEEF2',
                                                            paddingRight: '8px',
                                                            minHeight: '90%',
                                                            justifyContent: 'center',
                                                            alignItems: 'center',
                                                            display: 'flex',
                                                            position: 'absolute',
                                                            border: '1px solid #A8A8BD',
                                                            right: 0,
                                                            top: 0,
                                                            bottom: 0,
                                                            width: 'fit-content',
                                                            px: 1,
                                                            borderTopRightRadius: '8px',
                                                            borderBottomRightRadius: '8px',
                                                        }}
                                                    >
                                                        Bpm
                                                    </Typography>
                                                ),
                                            }}
                                            sx={{
                                                width: "100%",
                                                height: "48px",
                                                marginTop: "10px",
                                                "& .MuiOutlinedInput-root": {
                                                    borderRadius: "8px",
                                                    backgroundColor: "inherit",
                                                    "&:focus-within .MuiOutlinedInput-notchedOutline": {
                                                        borderColor: "#8F85F3",
                                                    },
                                                },
                                                "& .MuiOutlinedInput-notchedOutline": {
                                                    border: "1px solid #ccc",
                                                },
                                                "& .MuiOutlinedInput-input": {
                                                    padding: "10px",
                                                    fontSize: "16px",
                                                },
                                            }}
                                        />
                                    </FormControl>

                                    <FormControl sx={{ width: '100%' }} >
                                        <Typography>Frekuensi Nafas</Typography>
                                        <Field
                                            as={TextField}
                                            name="frekuensiNafas"
                                            placeholder="Masukkan Frekuensi Nafas"
                                            variant="outlined"
                                            InputProps={{
                                                endAdornment: (
                                                    <Typography
                                                        sx={{
                                                            color: "black",
                                                            bgcolor: '#EEEEF2',
                                                            paddingRight: '8px',
                                                            minHeight: '90%',
                                                            justifyContent: 'center',
                                                            alignItems: 'center',
                                                            display: 'flex',
                                                            position: 'absolute',
                                                            border: '1px solid #A8A8BD',
                                                            right: 0,
                                                            top: 0,
                                                            bottom: 0,
                                                            width: 'fit-content',
                                                            px: 1,
                                                            borderTopRightRadius: '8px',
                                                            borderBottomRightRadius: '8px',
                                                        }}
                                                    >
                                                        /Menit
                                                    </Typography>
                                                ),
                                            }}
                                            sx={{
                                                width: "100%",
                                                height: "48px",
                                                marginTop: "10px",
                                                "& .MuiOutlinedInput-root": {
                                                    borderRadius: "8px",
                                                    backgroundColor: "inherit",
                                                    "&:focus-within .MuiOutlinedInput-notchedOutline": {
                                                        borderColor: "#8F85F3",
                                                    },
                                                },
                                                "& .MuiOutlinedInput-notchedOutline": {
                                                    border: "1px solid #ccc",
                                                },
                                                "& .MuiOutlinedInput-input": {
                                                    padding: "10px",
                                                    fontSize: "16px",
                                                },
                                            }}
                                        />
                                    </FormControl>

                                    <FormControl sx={{ width: '100%' }} >
                                        <Typography>Tingkat Kesadaran</Typography>
                                        <Field
                                            as={TextField}
                                            name="tingkatKesadaran"
                                            placeholder="Masukkan Tingkat Kesadaran"
                                            variant="outlined"
                                            sx={{
                                                width: "100%",
                                                height: "48px",
                                                marginTop: "10px",
                                                "& .MuiOutlinedInput-root": {
                                                    borderRadius: "8px",
                                                    backgroundColor: "inherit",
                                                    "&:focus-within .MuiOutlinedInput-notchedOutline": {
                                                        borderColor: "#8F85F3",
                                                    },
                                                },
                                                "& .MuiOutlinedInput-notchedOutline": {
                                                    border: "1px solid #ccc",
                                                },
                                                "& .MuiOutlinedInput-input": {
                                                    padding: "10px",
                                                    fontSize: "16px",
                                                },
                                            }}
                                        />
                                    </FormControl>

                                    <FormControl sx={{ width: '100%' }} >
                                        <Typography>Saturasi</Typography>
                                        <Field
                                            as={TextField}
                                            name="saturasi"
                                            placeholder="Masukkan Saturasi"
                                            variant="outlined"
                                            InputProps={{
                                                endAdornment: (
                                                    <Typography
                                                        sx={{
                                                            color: "black",
                                                            bgcolor: '#EEEEF2',
                                                            paddingRight: '8px',
                                                            minHeight: '90%',
                                                            justifyContent: 'center',
                                                            alignItems: 'center',
                                                            display: 'flex',
                                                            position: 'absolute',
                                                            border: '1px solid #A8A8BD',
                                                            right: 0,
                                                            top: 0,
                                                            bottom: 0,
                                                            width: 'fit-content',
                                                            px: 1,
                                                            borderTopRightRadius: '8px',
                                                            borderBottomRightRadius: '8px',
                                                        }}
                                                    >
                                                        %
                                                    </Typography>
                                                ),
                                            }}
                                            sx={{
                                                width: "100%",
                                                height: "48px",
                                                marginTop: "10px",
                                                "& .MuiOutlinedInput-root": {
                                                    borderRadius: "8px",
                                                    backgroundColor: "inherit",
                                                    "&:focus-within .MuiOutlinedInput-notchedOutline": {
                                                        borderColor: "#8F85F3",
                                                    },
                                                },
                                                "& .MuiOutlinedInput-notchedOutline": {
                                                    border: "1px solid #ccc",
                                                },
                                                "& .MuiOutlinedInput-input": {
                                                    padding: "10px",
                                                    fontSize: "16px",
                                                },
                                            }}
                                        />
                                    </FormControl>

                                    <FormControl sx={{ width: '100%' }} >
                                        <Typography>Alergi</Typography>
                                        <Field
                                            as={TextField}
                                            name="alergi"
                                            placeholder="Masukkan Alergi"
                                            variant="outlined"
                                            sx={{
                                                width: "100%",
                                                height: "48px",
                                                marginTop: "10px",
                                                "& .MuiOutlinedInput-root": {
                                                    borderRadius: "8px",
                                                    backgroundColor: "inherit",
                                                    "&:focus-within .MuiOutlinedInput-notchedOutline": {
                                                        borderColor: "#8F85F3",
                                                    },
                                                },
                                                "& .MuiOutlinedInput-notchedOutline": {
                                                    border: "1px solid #ccc",
                                                },
                                                "& .MuiOutlinedInput-input": {
                                                    padding: "10px",
                                                    fontSize: "16px",
                                                },
                                            }}
                                        />
                                    </FormControl>

                                    <FormControl sx={{ width: '100%' }} >
                                        <Typography>Catatan Perawat</Typography>
                                        <Field
                                            as={TextField}
                                            name="catatanPerawat"
                                            placeholder="Masukkan Catatan Perawat"
                                            variant="outlined"
                                            multiline
                                            // maxRows={1}
                                            inputProps={{
                                                maxLength: 500
                                            }}
                                            sx={{
                                                width: "100%",
                                                height: "111px",
                                                // maxHeight: '50px',
                                                marginTop: "10px",
                                                "& .MuiOutlinedInput-root": {
                                                    borderRadius: "8px",
                                                    backgroundColor: "inherit",
                                                    "&:focus-within .MuiOutlinedInput-notchedOutline": {
                                                        borderColor: "#8F85F3",
                                                    },
                                                },
                                                "& .MuiOutlinedInput-notchedOutline": {
                                                    border: "1px solid #ccc",
                                                },
                                                "& .MuiOutlinedInput-input": {
                                                    padding: "10px",
                                                    fontSize: "16px",
                                                    // overflow: 'auto',
                                                },
                                            }}
                                        />
                                    </FormControl>
                                    <Typography sx={{ color: '#A8A8BD', mt: values.catatanPerawat.length >= 350 ? 8 : 2, display: 'flex', flexDirection: 'row-reverse' }} >{values.catatanPerawat.length} / 500 Karakter</Typography>
                                </Box>
                            </>
                        )}


                        {currentPage === 2 && (
                            <>
                                <Box>
                                    <Box>
                                        <Box
                                            display={'flex'}
                                            flexDirection={'column'}
                                            p={2}
                                            minWidth={'970px'}
                                            mt={2}
                                            bgcolor={'#FFFFFF'}
                                            border={"1px solid #C5C5D3"}
                                            borderRadius={"24px"}
                                            minHeight={"fit-content"}
                                        >
                                            <Typography sx={{ fontWeight: 600, fontSize: '18px', lineHeight: '20px', color: '#0A0A0D', mb: 2 }} >Informasi Kunjungan</Typography>
                                            <Stack sx={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                                                <Box width={'100%'} >
                                                    <Typography sx={titleData} >Jenis Kunjungan</Typography>
                                                    <Typography sx={detailData} >Rawat Inap</Typography>
                                                </Box>
                                                <Box width={'100%'}  >
                                                    <Typography sx={titleData} >Keluhan</Typography>
                                                    <Typography sx={detailData} >Dada Berdebar</Typography>
                                                </Box>
                                                <Box width={'100%'} >
                                                    <Typography sx={titleData} >Tanggal masuk</Typography>
                                                    <Typography sx={detailData} >2025/01/02</Typography>
                                                </Box>
                                                <Box width={'100%'} >
                                                    <Typography sx={titleData} >Jenis Kunjungan</Typography>
                                                    <Typography sx={detailData} >Rawat Inap</Typography>
                                                </Box>
                                            </Stack>

                                            <Stack sx={{ display: 'flex', flexDirection: 'row', width: '100%', mt: 2 }}>
                                                <Box width={'100%'} >
                                                    <Typography sx={titleData} >Jenis Kunjungan</Typography>
                                                    <Typography sx={detailData} >Rawat Inap</Typography>
                                                </Box>
                                                <Box width={'100%'} >
                                                    <Typography sx={titleData} >Keluhan</Typography>
                                                    <Typography sx={detailData} >Dada Berdebar</Typography>
                                                </Box>
                                                <Box width={'100%'}  >
                                                    <Typography sx={titleData} >Tanggal masuk</Typography>
                                                    <Typography sx={detailData} >2025/01/02</Typography>
                                                </Box>
                                                <Box width={'100%'}>
                                                    <Typography sx={titleData} >Jenis Kunjungan</Typography>
                                                    <Typography sx={detailData} >Rawat Inap</Typography>
                                                </Box>
                                            </Stack>
                                        </Box>
                                    </Box>

                                    <Box
                                        display={'flex'}
                                        flexDirection={'column'}
                                        p={2}
                                        minWidth={'970px'}
                                        mt={2}
                                        bgcolor={'#FFFFFF'}
                                        border={"1px solid #C5C5D3"}
                                        borderRadius={"24px"}
                                        minHeight={"fit-content"}
                                    >
                                        <Typography sx={{ fontWeight: 600, fontSize: '18px', lineHeight: '20px', color: '#0A0A0D', mb: 2 }} >Informasi Kunjungan</Typography>
                                        <Stack>
                                            <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }} >
                                                <SearchBar />
                                                <SearchBar />
                                                <SearchBar />
                                                <SearchBar />
                                            </Box>
                                            {components.slice(startIndex, endIndex).map((_, index) => (
                                                <CardCatatanDetailTindakanPasien key={startIndex + index} />
                                            ))}
                                        </Stack>
                                    </Box>
                                    {/* Paginasi */}
                                    <Stack spacing={2} direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
                                        <Typography sx={{ color: "#A8A8BD" }}>
                                            Showing {components.length > 0 ? (page - 1) * pageSize + 1 : 0} to {Math.min((page) * pageSize, totalElements)} of {totalElements} entries
                                        </Typography>
                                        <Pagination
                                            count={totalPages}
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
                            </>
                        )}
                    </Box>
                </Form >
            )
            }
        </Formik >
    );
}


const titleData = {
    color: '#747487',
    fontWeight: 400,
    fontSize: '16px',
    lineHeight: '18px'
};

const detailData = {
    color: '#0A0A0D',
    fontWeight: 600,
    fontSize: '16px',
    lineHeight: '18px',
}