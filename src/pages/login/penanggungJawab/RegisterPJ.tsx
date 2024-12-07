import {
    Box,
    CardMedia,
    FormLabel,
    TextField,
    Typography,
    Button,
    Switch,
} from "@mui/material";
import { useEffect, useState } from "react";
import logo from "../../../img/St.carolus.png";
import patientImage from "../../../assets/img/registrationImg.jpg";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import AlertWarning from "../../../components/small/AlertWarning";
import AlertSuccess from "../../../components/small/AlertSuccess";
import Cookies from "js-cookie";
import "react-phone-input-2/lib/style.css";
import { useLocation, useNavigate } from "react-router-dom";
import SwitchCustom from "../../../components/small/SwitchCustom";

const validationSchema = Yup.object({
    nik: Yup.string()
        .matches(/^[0-9]+$/, "NIK harus berupa angka")
        .min(12, "NIK minimal 12 digit")
        .max(14, "NIK maksimal 14 digit")
        .required("NIK wajib diisi"),
    email: Yup.string().email("email tidak valid")
        .required("Email wajib diisi"),
});

interface FormValues {
    nik: string;
    email: string;
}

const otpValidationSchema = Yup.object({
    otp: Yup.string()
        .matches(/^[0-9]+$/, "OTP harus berupa angka")
        .min(4, "OTP minimal 4 digit")
        .max(4, "OTP maksimal 4 digit")
        .required("OTP wajib diisi"),
});

interface DataKirim {
    identityNumber: string;
    name: string;
    phone: string;
    email: string;
    gender: string;
    address: string;
}

export default function RegisterPJ() {
    //   const [showPassword, setShowPassword] = useState(false);
    const [showLogin, setShowLogin] = useState(true);
    const [showEmailChanged, setShowEmailChanged] = useState(true);
    const [emailError, setEmailError] = useState(false);
    const [nikError, setNikError] = useState(false);
    const [, setPasswordError] = useState(false);
    const location = useLocation();
    const [showAlert, setShowAlert] = useState(false);
    const [isCounting, setIsCounting] = useState(false);
    const [secondsLeft, setSecondsLeft] = useState(60);
    const [resendSuccess, setResendSuccess] = useState(false);
    const [loginSuccess, setLoginSuccess] = useState(false);
    const [otp, setOtp] = useState("");
    const [data, setData] = useState<DataKirim>({ identityNumber: '', name: '', phone: '', email: '', gender: '', address: '' });
    const [patientId, setPatientId] = useState<string>('');
    const [show, setShow] = useState(true);
    const [notFound, setNotFound] = useState(false);

    const navigate = useNavigate();

    const [switchValue, setSwitchValue] = useState(false);

    // const otpFormShown = () => {
    //   // setShowEmailChanged(false);


    //   setOtp("");
    // };

    const handleClick = () => {
        setShowLogin(true);
        setShowEmailChanged(true);
    };

    const showTemporaryAlert = async () => {
        setShowAlert(true);
        await new Promise((resolve) => setTimeout(resolve, 3000));
        setShowAlert(false);
    };

    const showTemporarySuccessLogin = async () => {
        setLoginSuccess(true);
        await new Promise((resolve) => setTimeout(resolve, 3000));
        setLoginSuccess(false);
    };

    const showOtp = () => {
        setEmailError(false);
        setPasswordError(false);
        setShowLogin(false);
    };

    const validationCheck = async (values: FormValues) => {
        console.log("nilai: ", values)
        const { nik, email } = values;
        const nikIsValid = nik === "1234567891011";
        const emailIsValid = email === "chornaeld@gmail.com";
        setNikError(!nikIsValid);
        setEmailError(!emailIsValid);

        if (!nikIsValid || !emailIsValid) {
            await showTemporaryAlert();
            return false;
        }
        // showOtp();s
        Cookies.set('dataPasien', JSON.stringify(data), { expires: 7 });
        navigate("/register/penanggungJawab", { state: { successSendDataPj: switchValue, message: 'Gedung berhasil ditambahkan!', data: data, idPatient: patientId } })
        return true;
    };

    useEffect(() => {
        let timer: ReturnType<typeof setInterval>;
        if (isCounting && secondsLeft > 0) {
            timer = setInterval(() => {
                setSecondsLeft((prev) => prev - 1);
            }, 1000);
        } else if (secondsLeft === 0) {
            setIsCounting(false);
            setSecondsLeft(60);
        }

        return () => clearInterval(timer);
    }, [isCounting, secondsLeft]);

    useEffect(() => {
        if (location.state && location.state.successAdd) {
            console.log(location.state.message);
            console.log("DATA YANG DIKIRIM: ", location.state.data);
            setData(location.state.data);
            console.log("Data yang di state kan: ", data)
            setPatientId(location.state.idPatient)
            // navigate(location.pathname, { replace: true, state: undefined });
        }
    }, [location.state, navigate]);

    useEffect(() => {
        console.log("Id Patient: ", patientId);

        if (patientId === '') {
            setShowLogin(false);
            setNotFound(true);
        } else {

            setShowLogin(true);
            setNotFound(false);
        }
    }, [patientId]);


    const handleResendClick = () => {
        setIsCounting(true);
        setSecondsLeft(60);
        showTemporaryAlertSuccess();
        console.log("Resend clicked");
    };

    const showTemporaryAlertSuccess = async () => {
        setResendSuccess(true);
        await new Promise((resolve) => setTimeout(resolve, 3000));
        setResendSuccess(false);
    };

    const formatTime = () => {
        const minutes = Math.floor(secondsLeft / 60);
        const seconds = secondsLeft % 60;
        return `${minutes.toString().padStart(2, "0")}:${seconds
            .toString()
            .padStart(2, "0")}`;
    };


    const handleSwitchChange = (value: boolean) => {
        setSwitchValue(value);
        console.log('Switch value:', value);
        console.log('Data: ', data);
    };
    return (

        <>
            <style>
                {`
            :root {
            background-color: #ffff
            }
            `}
            </style>

            <Box >
                <Box>
                    <Box sx={{ position: "relative" }}>
                        <CardMedia
                            component="img"
                            sx={{
                                width: "50%",
                                height: "100vh",
                                objectFit: "cover",
                                position: "fixed",
                                top: "0",
                                left: "0",
                            }}
                            image={patientImage}
                            alt="Example Image"
                        />
                    </Box>

                    <Box
                        sx={{
                            position: "absolute",
                            bgcolor: "rgba(0, 0, 0, 0.5)",
                            width: "50%",
                            height: "100vh",
                            top: "0",
                            left: "0",
                        }}
                    ></Box>

                    <Box
                        sx={{
                            position: "absolute",
                            zIndex: "9999",
                            width: "40%",
                            left: "23%",
                            bottom: "0%",
                            transform: "translate(-50%, -50%)",
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: "56px",
                                fontWeight: "700",
                                lineHeight: "60px",
                                color: "white",
                            }}
                        >
                            Mulai permintaan janji temu Anda di sini.
                        </Typography>
                    </Box>
                </Box>
                {loginSuccess && <AlertSuccess label="Login Succeeded!" />}
                {showAlert && (
                    <AlertWarning teks="NIK atau Email yang Anda masukkan salah, silahkan coba lagi." />
                )}

                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        position: "absolute",
                        right: "0",
                        top: "0",
                        width: "50%",
                        flexDirection: "column",
                        gap: 5,
                        height: "100vh",
                        bgcolor: "#fff",
                    }}
                >
                    {show && (
                        <Box sx={{ width: "80%" }}>
                            <img src={logo} alt="logo-carolus" />
                            <Typography sx={{ fontSize: "32px", fontWeight: "600" }}>
                                Selamat Datang
                            </Typography>
                            <Typography
                                sx={{
                                    color: "gray",
                                    fontSize: "18px",
                                    marginBottom: "30px",
                                    width: "100%",
                                }}
                            >
                                Silahkan masukkan nomor NIK (Nomor induk kependudukan)
                                penanggung jawab.
                            </Typography>

                            <Formik
                                initialValues={{ nik: switchValue ? data.identityNumber : "", email: switchValue ? data.email : "" }}
                                enableReinitialize
                                validationSchema={switchValue ? null : validationSchema}
                                onSubmit={async (values) => {
                                    if (await validationCheck(values)) {
                                        console.log("nilai dikirim: ", values);
                                        await showTemporarySuccessLogin();
                                    }
                                }}
                            >
                                {({
                                    errors,
                                    touched,
                                    handleChange,
                                    handleBlur,
                                    values,
                                    isValid,
                                    dirty,
                                    //   setFieldValue,
                                }) => (
                                    <Form>
                                        <Box sx={{ display: "flex", flexDirection: "column" }}>
                                            <Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'} mb={'2%'}>
                                                <Typography fontWeight={"bold"} maxWidth={"190px"} fontSize={'20px'} >
                                                    Isi data diri Penanggung jawab
                                                </Typography>
                                                <SwitchCustom onChangeValue={handleSwitchChange} />
                                            </Box>
                                            <FormLabel sx={{ fontSize: "18px" }}>
                                                NIK (Nomor induk kependudukan) Penanggung jawab
                                            </FormLabel>
                                            <Field
                                                name="nik"
                                                as={TextField}
                                                placeholder="Masukkan NIK (Nomor induk kependudukan)"
                                                variant="outlined"
                                                fullWidth
                                                sx={{
                                                    width: "100%",
                                                    height: "48px",
                                                    marginTop: "10px",
                                                    "& .MuiOutlinedInput-root": {
                                                        borderRadius: "8px",
                                                        backgroundColor: nikError ? "#ffcccc" : "inherit",
                                                    },
                                                    "& .MuiOutlinedInput-notchedOutline": {
                                                        border: "1px solid #ccc",
                                                    },
                                                    "& .MuiOutlinedInput-input": {
                                                        padding: "10px",
                                                        fontSize: "16px",
                                                    },
                                                }}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={switchValue ? data.identityNumber : values.nik}
                                                error={switchValue ? false : touched.nik && Boolean(errors.nik)}
                                                helperText={switchValue ? false : touched.nik && errors.nik}
                                                disabled={switchValue}
                                            />

                                            <FormLabel sx={{ fontSize: "18px", marginTop: "20px" }}>
                                                Email
                                            </FormLabel>
                                            <Field
                                                name="email"
                                                as={TextField}
                                                placeholder="Masukkan Email"
                                                variant="outlined"
                                                fullWidth
                                                sx={{
                                                    width: "100%",
                                                    height: "48px",
                                                    marginTop: "10px",
                                                    "& .MuiOutlinedInput-root": {
                                                        borderRadius: "8px",
                                                        backgroundColor: emailError ? "#ffcccc" : "inherit",
                                                    },
                                                    "& .MuiOutlinedInput-notchedOutline": {
                                                        border: "1px solid #ccc",
                                                    },
                                                    "& .MuiOutlinedInput-input": {
                                                        padding: "10px",
                                                        fontSize: "16px",
                                                    },
                                                }}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={switchValue ? data.email : values.email}
                                                error={switchValue ? false : touched.email && Boolean(errors.email)}
                                                helperText={switchValue ? false : touched.email && errors.email}
                                                disabled={switchValue}
                                            />

                                            {/* {touched.email && errors.email && (
                                            <Typography sx={{ color: "red", fontSize: "12px" }}>
                                                {errors.email}
                                            </Typography>
                                        )} */}

                                            <Button
                                                type="submit"
                                                variant="contained"
                                                color="primary"
                                                fullWidth
                                                sx={{
                                                    width: "100%",
                                                    height: "48px",
                                                    mt: 5,
                                                    backgroundColor: "#8F85F3",
                                                    ":hover": { backgroundColor: "#D5D1FB" },
                                                }}
                                                disabled={switchValue ? false : !isValid || !dirty}
                                            >
                                                Lanjutkan
                                            </Button>

                                            <Button
                                                // onClick={() => navigate('/register/penanggungJawab') }
                                                sx={{
                                                    width: '100%',
                                                    height: '48px',
                                                    marginTop: '20px',
                                                    backgroundColor: '#ffff',
                                                    border: '1px solid #8F85F3',
                                                    color: '#8F85F3',
                                                    ":hover": { backgroundColor: '#8F85F3', color: '#ffff' },
                                                }}
                                            >
                                                Kembali ke halaman data pasien
                                            </Button>

                                            {/* <CustomButton onClick={() => console.log("hai ")} label="Daftar pasien baru" /> */}
                                        </Box>
                                    </Form>
                                )}
                            </Formik>
                        </Box>
                    )}

                    {notFound && (
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                p: 5,
                                position: "absolute",
                                width: "60%",
                                flexDirection: 'column',
                            }}
                        >
                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                <Typography sx={{ fontSize: '32px', fontWeight: '600', maxWidth: '410px' }}>
                                    Data Not Found  !
                                </Typography>
                                <Typography sx={{ color: '#A8A8BD', fontSize: '18px', marginBottom: '30px', maxWidth: '410px', fontWeight: '400' }}>
                                    Are you sure you filled the field ?? Look sus !
                                </Typography>
                                <Typography sx={{ color: '#A8A8BD', fontSize: '18px', marginBottom: '30px', maxWidth: '410px', fontWeight: '400' }}>
                                    Keep playing kiddos !
                                </Typography>
                            </Box>
                        </Box>
                    )}



                </Box>
            </Box>
        </>
    );
}
