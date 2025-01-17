//component
import { Container, Box, Typography, Button, FormControl, OutlinedInput } from "@mui/material";
import BreadCrumbs from "../../../components/medium/BreadCrumbs";
import bgImage from "../../../assets/img/String.png";
import AlertSuccess from "../../../components/small/alert/AlertSuccess";
import CustomTimePicker from "../../../components/small/CustomTimePicker";
import DropdownListAPI from '../../../components/small/dropdownlist/DropdownListAPI';

//hooks
import useEditSubFasilitas from "../hooks/useEditSubFasilitas";


export default function EditSubFasilitas() {
    const{
    breadcrumbItems,
    formData: formik,
    successAlert,
    errorAlert,
    startTime,
    endTime,
    handleTambahHari,
    selectedDays,
    showTemporaryAlertSuccess,
    setSelectedDay,
    facilityOptions,
    setEndTime,
    setStartTime
    }=useEditSubFasilitas();
  return (
    <Container sx={{ py: 2 }}>
    <BreadCrumbs
        breadcrumbItems={breadcrumbItems}
        onBackClick={() => window.history.back()}
    />
    <Box mt={3}>
        <Box position="relative" p={3} sx={{ borderRadius: "24px", bgcolor: "#fff", overflow: "hidden" }}>
            <Typography fontSize="20px" fontWeight="700">Edit SubFasilitas</Typography>
            <Box position="absolute" sx={{ top: 0, right: 0 }}>
                <img src={bgImage} alt="bg-image" />
            </Box>

            <Box component="form" noValidate autoComplete="off" mt={3} onSubmit={formik.handleSubmit}>
                <Typography sx={{ fontSize: "16px" }}>Nama Sub Fasilitas<span style={{ color: "red" }}>*</span></Typography>
                <FormControl fullWidth sx={{ my: 1 }}>
                    <OutlinedInput
                        id="namaSubFasilitas"
                        name="namaSubFasilitas"
                        size="small"
                        placeholder="Masukkan nama fasilitas"
                        value={formik.values.namaSubFasilitas}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.namaSubFasilitas && Boolean(formik.errors.namaSubFasilitas)}
                    />
                    {formik.touched.namaSubFasilitas && formik.errors.namaSubFasilitas && (
                        <Typography color="error">{formik.errors.namaSubFasilitas}</Typography>
                    )}
                </FormControl>

                <Typography sx={{ fontSize: "16px", mt: 2 }}>Pilih Fasilitas<span style={{ color: "red" }}>*</span></Typography>
                <DropdownListAPI
                    options={facilityOptions.map(({ id, name }) => ({ value: id, label: name }))}
                    placeholder="Pilih Fasilitas Induk"
                    defaultValue={formik.values.masterFacilityId}
                    onChange={(selectedOptionValue) => {
                        formik.setFieldValue('masterFacilityId', selectedOptionValue);
                    }}
                    loading={false}
                />

                <Box display={'flex'} flexDirection={'column'} border={'1px solid #A8A8BD'} borderRadius={'16px'} padding={'16px'} mt={2}>
                    <Typography mb={'15px'} >Jam Operasional</Typography>
                    <Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'} gap={'32px'} >
                        {/* Hari */}
                        <Box display={'flex'} flexDirection={'column'} width={'100%'} >
                            <Typography>Hari</Typography>
                            <DropdownListAPI
                                options={[
                                    { value: "1", label: "Senin" },
                                    { value: "2", label: "Selasa" },
                                    { value: "3", label: "Rabu" },
                                    { value: "4", label: "Kamis" },
                                    { value: "5", label: "Jumat" },
                                    { value: "6", label: "Sabtu" },
                                    { value: "7", label: "Minggu" },
                                ]}
                                placeholder="Pilih hari"
                                onChange={(value: string) => setSelectedDay(value)}
                                loading={false}
                                defaultValue={selectedDays}
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
        <AlertSuccess label="Success adding SubFacility" />
    )}
    {errorAlert && (
        <AlertSuccess label="Error adding SubFacility" />
    )}
</Container>
  )
}
