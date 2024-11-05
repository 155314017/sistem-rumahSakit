import { useState } from 'react';
import { Container, Box, Typography, Button, FormControl, OutlinedInput } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import BreadCrumbs from "../../components/medium/BreadCrumbs";
import bgImage from "../../assets/img/String.png";
import AlertSuccess from "../../components/small/AlertSuccess";
import DropdownList from "../../components/small/DropdownList";
import ImageUploaderGroup from '../../components/medium/ImageUploaderGroup';
import axios from "axios"; 
import Cookies from "js-cookie";

type ImageData = {
    imageName: string;
    imageType: string;
    imageData: string;
};

const jenisGedung = [
    { value: 1, label: "Gedung A" },
    { value: 2, label: "Gedung B" },
    { value: 3, label: "Gedung C" },
    { value: 4, label: "Gedung D" },
    { value: 5, label: "Gedung E" },
    { value: 6, label: "Gedung F" },
];

const jenisRuangan = [
    { value: 1, label: "VIP" },
    { value: 2, label: "Kelas 1" },
    { value: 3, label: "Kelas 2" },
    { value: 4, label: "Kelas 3" },
    { value: 5, label: "BPJS" },
];

const handleSelectionChange = (selectedValue: string) => {
    console.log("Selected Value:", selectedValue);
};

export default function TambahRuangan() {
    const [successAlert, setSuccessAlert] = useState(false);
    const [errorAlert, setErrorAlert] = useState(false);
    const [imagesData, setImagesData] = useState<ImageData[]>([]);

    const showTemporaryAlertSuccess = async () => {
        setSuccessAlert(true);
        await new Promise((resolve) => setTimeout(resolve, 3000));
        setSuccessAlert(false);
    };

    const showTemporaryAlertError = async () => {
        setErrorAlert(true);
        await new Promise((resolve) => setTimeout(resolve, 3000));
        setErrorAlert(false);
    };

    const breadcrumbItems = [
        { label: "Dashboard", href: "/dashboard" },
        { label: "Ruangan", href: "/ruangan" },
        { label: "Tambah Ruangan", href: "/tambahRuangan" },
    ];

    const formik = useFormik({
        initialValues: {
            namaKlinik: '',
            gedung: '',
            jenisRuangan: '',
        },
        validationSchema: Yup.object({
            namaKlinik: Yup.string().required('Nama Ruangan is required'),
            gedung: Yup.string().required('Gedung is required'),
            jenisRuangan: Yup.string().required('Jenis Ruangan is required'),
        }),
        onSubmit: async (values) => {
            const data = {
                name: values.namaKlinik,
                masterBuildingId: "17e145fa-ea31-495e-b725-149108b12321",
                type: values.jenisRuangan,
                additionalInfo: "add info,",
                images: imagesData,
            }

            const token = Cookies.get("accessToken"); 
            console.log("Token :", token)

            try {
                const response = await axios.post('https://hms.3dolphinsocial.com:8083/v1/manage/room/', data, {
                    headers: {
                        'Content-Type': 'application/json',
                        'accessToken': `${token}`
                    },
                });
                console.log('Response:', response.data);
                showTemporaryAlertSuccess(); // Show success alert
            } catch (error) {
                console.error('Error adding room:', error);
                showTemporaryAlertError(); // Show error alert
            }
        },
    });

    return (
        <Container sx={{ py: 2 }}>
            <BreadCrumbs
                breadcrumbItems={breadcrumbItems}
                onBackClick={() => window.history.back()}
            />
            <Box mt={3}>
                <Box position="relative" p={3} sx={{ borderRadius: "24px", bgcolor: "#fff", overflow: "hidden" }}>
                    <Typography fontSize="20px" fontWeight="700">Tambah Ruangan</Typography>
                    <Box position="absolute" sx={{ top: 0, right: 0 }}>
                        <img src={bgImage} alt="bg-image" />
                    </Box>

                    {/* <ImageUploader onImagesSelected={handleImagesSelected} /> */}
                    <ImageUploaderGroup onChange={(images) => setImagesData(images)} />

                    <Box component="form" noValidate autoComplete="off" mt={3} onSubmit={formik.handleSubmit}>
                        <Typography sx={{ fontSize: "16px" }}>Nama Ruangan<span style={{ color: "red" }}>*</span></Typography>
                        <FormControl fullWidth sx={{ my: 1 }}>
                            <OutlinedInput
                                id="namaKlinik"
                                name="namaKlinik"
                                size="small"
                                placeholder="Masukkan Nama ruangan"
                                value={formik.values.namaKlinik}
                                onChange={formik.handleChange}
                                onBlur={() => formik.setTouched({ ...formik.touched, namaKlinik: true })}
                                error={formik.touched.namaKlinik && Boolean(formik.errors.namaKlinik)}
                            />
                            {formik.touched.namaKlinik && formik.errors.namaKlinik && (
                                <Typography color="error">{formik.errors.namaKlinik}</Typography>
                            )}
                        </FormControl>

                        <Typography sx={{ fontSize: "16px" }}>Pilih Gedung<span style={{ color: "red" }}>*</span></Typography>
                        <DropdownList
                            options={jenisGedung}
                            placeholder="Pilih gedung"
                            onChange={(selectedValue) => formik.setFieldValue('gedung', selectedValue)}
                        />

                        <Typography sx={{ fontSize: "16px", mt: 1 }}>Jenis Ruangan<span style={{ color: "red" }}>*</span></Typography>
                        <DropdownList
                            options={jenisRuangan}
                            placeholder="Pilih jenis ruangan"
                            onChange={(selectedValue) => formik.setFieldValue('jenisRuangan', selectedValue)}
                        />

                        <Button
                            type="submit"
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
                <AlertSuccess label="Success adding building" />
            )}
            {errorAlert && (
                <AlertSuccess label="Error adding building" />
            )}
        </Container>
    );
}