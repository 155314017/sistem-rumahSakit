import { Container, Box, Typography, Button, FormControl, OutlinedInput, IconButton } from "@mui/material";
import BreadCrumbs from "../../../components/medium/BreadCrumbs";
import bgImage from "../../../assets/img/String.png";
import AlertSuccess from "../../../components/small/alert/AlertSuccess";
import DropdownList from "../../../components/small/dropdownlist/DropdownList";
import CustomTimePicker from "../../../components/small/CustomTimePicker";
import ImageUploaderGroup from '../../../components/medium/imageComponent/ImageUploaderGroup';
import { Delete as DeleteIcon } from '@mui/icons-material'

//hooks
import useTambahKonter from "../hooks/useTambahKonter";
export default function TambahKonter() {
    const {
        breadcrumbItems,
    formik,
    setSelectedDay,
    startTime,
    setStartTime,
    endTime,
    setEndTime,
    handleTambahHari,
    handleImageChange,
    successAlert,
    errorAlert,
    jenisKonter,
    showTemporaryAlertSuccess,
    handleDeleteSchedule,
    schedules
    } = useTambahKonter();
  return (
    <Container sx={{ py: 2 }}>
    <BreadCrumbs
        breadcrumbItems={breadcrumbItems}
        onBackClick={() => window.history.back()}
    />
    <Box mt={3}>
        <Box position="relative" p={3} sx={{ borderRadius: "24px", bgcolor: "#fff", overflow: "hidden" }}>
            <Box
                position={"absolute"}
                sx={{
                    top: 0,
                    left: "50%",
                    transform: "translateX(-50%)",
                    display: "flex",
                }}
            >
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

                <Box
                    sx={{
                        width: "600px",
                        height: "50px",
                        bgcolor: "#F1F0FE",
                        borderRadius: "0px 0px 22px 22px",
                    }}
                />

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
            <Typography fontSize="20px" fontWeight="700">Tambah Konter</Typography>
            <Box position="absolute" sx={{ top: 0, right: 0 }}>
                <img src={bgImage} alt="bg-image" />
            </Box>

            {/* <ImageUploader onImagesSelected={handleImagesSelected} /> */}
            <ImageUploaderGroup onChange={handleImageChange} />

            <Box component="form" noValidate autoComplete="off" mt={3} onSubmit={formik.handleSubmit}>
                <Typography sx={{ fontSize: "16px" }}>Nama Konter<span style={{ color: "red" }}>*</span></Typography>
                <FormControl fullWidth sx={{ my: 1 }}>
                    <OutlinedInput
                        id="namaKonter"
                        name="namaKonter"
                        size="small"
                        placeholder="Masukkan Nama konter"
                        value={formik.values.namaKonter}
                        onChange={formik.handleChange}
                        onBlur={() => formik.setTouched({ ...formik.touched, namaKonter: true })}
                        error={formik.touched.namaKonter && Boolean(formik.errors.namaKonter)}
                    />
                    {formik.touched.namaKonter && formik.errors.namaKonter && (
                        <Typography color="error">{formik.errors.namaKonter}</Typography>
                    )}
                </FormControl>

                <Typography sx={{ fontSize: "16px" }}>Pilih Konter<span style={{ color: "red" }}>*</span></Typography>
                <DropdownList
                    options={jenisKonter}
                    placeholder="Pilih konter"
                    // onChange={handleSelectionChange}
                    loading={false}
                />

                <Typography sx={{ fontSize: "16px", mt: 1 }}>Lokasi Konter<span style={{ color: "red" }}>*</span></Typography>
                <FormControl fullWidth sx={{ my: 1 }}>
                    <OutlinedInput
                        id="lokasiKonter"
                        name="lokasiKonter"
                        size="small"
                        placeholder="Masukkan lokasi konter"
                        value={formik.values.lokasiKonter}
                        onChange={formik.handleChange}
                        onBlur={() => formik.setTouched({ ...formik.touched, lokasiKonter: true })}
                        error={formik.touched.lokasiKonter && Boolean(formik.errors.lokasiKonter)}
                        sx={{ height: '107px', alignItems: 'flex-start', borderRadius: '8px' }}
                    />
                    {formik.touched.lokasiKonter && formik.errors.lokasiKonter && (
                        <Typography color="error">{formik.errors.lokasiKonter}</Typography>
                    )}
                </FormControl>

                <Box display={'flex'} flexDirection={'column'} border={'1px solid #A8A8BD'} borderRadius={'16px'} padding={'16px'} mt={2} >
                    <Typography mb={'15px'} >Jam Operasional</Typography>
                    <Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'} gap={'32px'} >
                        {/* Hari */}
                        <Box display={'flex'} flexDirection={'column'} width={'100%'} >
                            <Typography>Hari</Typography>
                            <DropdownList
                                options={[
                                    { value: 1, label: "Senin" },
                                    { value: 2, label: "Selasa" },
                                    { value: 3, label: "Rabu" },
                                    { value: 4, label: "Kamis" },
                                    { value: 5, label: "Jumat" },
                                    { value: 6, label: "Sabtu" },
                                    { value: 7, label: "Minggu" },
                                ]}
                                placeholder="Pilih hari"
                                onChange={(value: string) => {
                                    setSelectedDay(value);
                                }}
                                loading={false}
                            />
                        </Box>

                        {/* Jam Mulai */}
                        <Box display={'flex'} flexDirection={'column'} width={'100%'} >
                            <Typography>Jam mulai</Typography>
                            <CustomTimePicker
                                value={startTime}
                                onChange={(newValue) => setStartTime(newValue)}
                            />
                        </Box>

                        {/* Jam Selesai */}
                        <Box display={'flex'} flexDirection={'column'} width={'100%'} >
                            <Typography>Jam selesai</Typography>
                            <CustomTimePicker
                                value={endTime}
                                onChange={(newValue) => setEndTime(newValue)}
                            />
                        </Box>
                    </Box>
                    <Button
                        fullWidth
                        sx={{
                            mt: 2,
                            bgcolor: 'transparent',
                            color: '#8F85F3',
                            border: '1px solid #8F85F3',
                            ":hover": { bgcolor: '#8F85F3', color: 'white' },
                        }}
                        onClick={handleTambahHari}
                    >
                        + Tambah hari
                    </Button>
                    {schedules.map((schedule, index) => (
                  <Box
                    key={index}
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    mt={2}
                    sx={{
                      border: '1px solid black',
                      padding: '4px',
                      borderRadius: '6px'
                    }}
                  >
                    <Typography>{`${schedule.day}: ${schedule.startTime.format(
                      'HH:mm'
                    )} - ${schedule.endTime.format('HH:mm')}`}</Typography>
                    <IconButton color="error" onClick={() => handleDeleteSchedule(index)}>
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                ))}
                </Box>

                <Button
                    type="submit"
                    onClick={showTemporaryAlertSuccess}
                    variant="contained"
                    color="inherit"
                    sx={{
                        mt: 3,
                        width: "100%",
                        bgcolor: "#8F85F3",
                        color: "#fff",
                        textTransform: "none",
                        borderRadius: "8px",
                        ":hover": { bgcolor: "#a098f5" },
                    }}
                    disabled={!formik.isValid || !formik.dirty}
                >
                    Simpan
                </Button>
            </Box>
        </Box>
    </Box>
    {successAlert && (
        <AlertSuccess label="Success adding counter" />
    )}
    {errorAlert && (
        <AlertSuccess label="Error adding counter" />
    )}
</Container>
  )
}
