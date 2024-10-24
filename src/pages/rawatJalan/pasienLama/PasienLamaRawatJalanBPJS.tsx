/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Button,
  Box,
  Typography,
  CardMedia,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Alert,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import RadioButtonsGroup from "../../../components/medium/RadoButtonsGroup";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import logo from "../../../img/St.carolus.png";
import imagePendaftaran from "../../../assets/img/pendaftaran.jpeg";
import { doctors } from "../../../dummyData/dummyData";
import FileUploader from "../../../components/medium/FileUploader";
import InformasiTicket from "../../../components/small/InformasiTicket";
import CalenderPopover from "../../../components/medium/CalenderPopover";
import PoliSelect from "../../../components/inputComponent/PoliSelect";

const validationSchema = Yup.object({
  fullname: Yup.string().required("Nama wajib diisi"),
  phone: Yup.string().required("Nomor HP wajib diisi"),
  relation: Yup.string().required("Hubungan wajib diisi"),
  transportMethod: Yup.string().required("Cara datang/pengantar wajib diisi"),
});

interface FormValues {
  fullname: string;
  phone: string;
  relation: string;
  transportMethod: string;
  poli: string;
  docter: string;
  operationalDate: string;
}

const PasienLamaRawatJalanBPJS: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const totalPages = 2;
  const [showAlert, setShowAlert] = useState<boolean>(false);
  // const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  // const [fileBase64, setFileBase64] = useState<string | null>(null);
  const [showFormPage, setSHowFormPage] = useState(true);
  // const [selectedMethod, setSelectedMethod] = useState<string>("");

  // const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setSelectedMethod(event.target.value);
  // };
  // const handleFileChange = (file: File | null, base64: string | null) => {
  //   setUploadedFile(file);
  //   setFileBase64(base64);
  // };

  // const handleSubmit = (values: FormValues) => {
  //   console.log("Data yang diisi:", values);
  //   console.log("File yang diunggah:", uploadedFile);
  //   console.log("Base64:", fileBase64);
  // };

  const handleNext = (
    validateForm: any,
    setErrors: any,
    values: FormValues
  ) => {
    validateForm().then((formErrors: any) => {
      if (Object.keys(formErrors).length === 0) {
        console.log("Data yang diisi:", values);
        if (currentPage < totalPages) {
          setCurrentPage(currentPage + 1);
          setShowAlert(false);
        }
      } else {
        setShowAlert(true);
        setErrors(formErrors);
        setTimeout(() => setShowAlert(false), 3000);
      }
    });
  };

  // const handlePrev = () => {
  //   if (currentPage > 1) {
  //     setCurrentPage(currentPage - 1);
  //   }
  // };

  const getPageStyle = (page: number) => {
    if (page === currentPage) {
      return { color: "#8F85F3", cursor: "pointer", fontWeight: "bold" };
    } else if (page < currentPage) {
      return { color: "#8F85F3", cursor: "pointer" };
    } else {
      return { color: "black", cursor: "pointer" };
    }
  };

  const getBorderStyle = (page: number) => {
    if (page === currentPage) {
      return {
        display: "flex",
        border: "1px solid #8F85F3",
        width: "38px",
        height: "38px",
        borderRadius: "8px",
        justifyContent: "center",
        alignItems: "center",
      };
    } else if (page < currentPage) {
      return {
        display: "flex",
        border: "1px solid #8F85F3",
        width: "38px",
        height: "38px",
        borderRadius: "8px",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#8F85F3",
        color: "white",
      };
    } else {
      return {
        display: "flex",
        border: "1px solid #8F85F3",
        width: "38px",
        height: "38px",
        borderRadius: "8px",
        justifyContent: "center",
        alignItems: "center",
        color: "#8F85F3",
      };
    }
  };

  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        flexDirection: "row",
      }}
    >
      <Box>
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
          image={imagePendaftaran}
          alt="Example Image"
        />
      </Box>

      {showFormPage && (
        <Formik<FormValues>
          initialValues={{
            fullname: "",
            phone: "",
            relation: "",
            transportMethod: "",
            poli: "",
            docter: "",
            operationalDate: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            console.log("Form submitted with values:", values);
          }}
        >
          {({
            values,
            errors,
            touched,
            setFieldValue,
            validateForm,
            setErrors,
          }) => (
            <Form>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  p: 5,
                  position: "absolute",
                  right: "0",
                  top: "0",
                  width: "50%",
                }}
              >
                <Box sx={{ ml: 10 }}>
                  <Box>
                    <CardMedia
                      component="img"
                      sx={{
                        width: "112px",
                        objectFit: "cover",
                      }}
                      image={logo}
                      alt="Example Logo"
                    />
                  </Box>

                  <Typography
                    sx={{
                      fontSize: "32px",
                      fontWeight: "600",
                      lineHeight: "34px",
                      marginTop: 2,
                      mb: 5,
                      maxWidth: "450px",
                    }}
                  >
                    Formulir pendaftaran pasien BPJS
                  </Typography>

                  <Box
                    sx={{ display: "flex", flexDirection: "row", mt: 2, mb: 2 }}
                  >
                    <Box display={"flex"} flexDirection={"row"} width={"290px"}>
                      <Box
                        display={"flex"}
                        flexDirection={"row"}
                        alignItems="center"
                        onClick={() => setCurrentPage(1)}
                        sx={getPageStyle(1)}
                        mx={2}
                      >
                        <Box sx={getBorderStyle(1)}>1</Box>
                        <Typography sx={{ ml: 1 }}>
                          Penanggung jawab pasien
                        </Typography>
                      </Box>
                    </Box>

                    <Box display={"flex"} flexDirection={"row"} width={"290px"}>
                      <Box
                        display={"flex"}
                        flexDirection={"row"}
                        alignItems="center"
                        onClick={() => setCurrentPage(2)}
                        sx={getPageStyle(2)}
                        mx={2}
                      >
                        <Box sx={getBorderStyle(2)}>2</Box>
                        <Typography sx={{ ml: 1 }}>
                          Jenis kunjungan , Keluhan dan metode pembayaran
                        </Typography>
                      </Box>
                    </Box>
                  </Box>

                  {showAlert && (
                    <Alert severity="warning" sx={{ mb: 2 }}>
                      Semua field wajib diisi sebelum lanjut ke halaman
                      berikutnya!
                    </Alert>
                  )}

                  <Box>
                    {currentPage === 1 && (
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "8px",
                        }}
                      >
                        <RadioButtonsGroup
                          selectedValue={values.transportMethod}
                          onChange={(value) =>
                            setFieldValue("transportMethod", value)
                          }
                          widthInput="100%"
                          heightInput="56px"
                        />

                        <FormControl
                          sx={{
                            marginTop: "50px",
                            display: "flex",
                            flexDirection: "column",
                          }}
                        >
                          <Typography>
                            Nama lengkap penanggung jawab{" "}
                            <span style={{ color: "#d32f2f" }}>*</span>{" "}
                          </Typography>
                          <TextField
                            placeholder="Masukkan nama lengkap penanggung jawab"
                            fullWidth
                            value={values.fullname}
                            onChange={(e) =>
                              setFieldValue("fullname", e.target.value)
                            }
                            error={touched.fullname && Boolean(errors.fullname)}
                            helperText={touched.fullname && errors.fullname}
                            sx={{
                              mt: 2,
                              mb: 2,
                              border: "1px solid #8F85F3",
                              borderRadius: "8px",
                              width: "100%",
                              "& .MuiOutlinedInput-root": {
                                "& fieldset": {
                                  borderColor: "#8F85F3",
                                },
                                "&:hover fieldset": {
                                  borderColor: "#8F85F3",
                                },
                                "&.Mui-focused fieldset": {
                                  borderColor: "#8F85F",
                                },
                              },
                            }}
                          />
                        </FormControl>
                        <Typography>
                          No. Handphone penanggung jawab{" "}
                          <span style={{ color: "#d32f2f" }}>*</span>{" "}
                        </Typography>
                        <PhoneInput
                          country={"id"}
                          value={values.phone}
                          onChange={(phone) => setFieldValue("phone", phone)}
                          inputStyle={{
                            height: "48px",
                            borderRadius: "8px",
                            border: `1px solid ${
                              touched.phone && errors.phone ? "red" : "#ccc"
                            }`,
                            padding: "10px 40px 10px 60px",
                            fontSize: "16px",
                            width: "100%",
                            marginTop: "10px",
                          }}
                          buttonStyle={{
                            borderRadius: "8px 0 0 8px",
                            border: "1px solid #ccc",
                          }}
                          containerStyle={{
                            marginBottom: "10px",
                            width: "100%",
                          }}
                        />
                        {touched.phone && errors.phone && (
                          <Typography sx={{ color: "red", fontSize: "12px" }}>
                            {errors.phone}
                          </Typography>
                        )}

                        <FormControl fullWidth sx={{ mt: 2, mb: 2 }}>
                          <Typography>
                            Hubungan penanggung jawab dengan pasien{" "}
                            <span style={{ color: "#d32f2f" }}>*</span>{" "}
                          </Typography>
                          {/* <InputLabel id="relation-label">Hubungan</InputLabel> */}
                          <Select
                            labelId="relation-label"
                            value={values.relation}
                            onChange={(e) =>
                              setFieldValue("relation", e.target.value)
                            }
                            sx={{ width: "100%", height: "44px" }}
                          >
                            <MenuItem sx={{ color: "#8F85F3" }} value="anak">
                              Anak
                            </MenuItem>
                            <MenuItem
                              sx={{ color: "#8F85F3" }}
                              value="orang tua"
                            >
                              Orang Tua
                            </MenuItem>
                            <MenuItem sx={{ color: "#8F85F3" }} value="kerabat">
                              Kerabat
                            </MenuItem>
                          </Select>
                        </FormControl>
                        {touched.relation && errors.relation && (
                          <Typography sx={{ color: "red", fontSize: "12px" }}>
                            {errors.relation}
                          </Typography>
                        )}
                      </Box>
                    )}

                    {currentPage === 2 && (
                      <Box sx={{ display: "flex", flexDirection: "column" }}>
                        <FormControl>
                          <Typography>Jenis Kunjungan</Typography>
                          <TextField
                            variant="outlined"
                            sx={{
                              width: "100%",
                              borderRadius: "8px",
                              mb: 2,
                              padding: "0",
                              "& .MuiOutlinedInput-root": {
                                height: "44px",
                                padding: "0 12px",
                                border: "1px solid #8F85F3",
                                "& input": {
                                  height: "44px",
                                  padding: "0",
                                },
                                "& fieldset": {
                                  borderColor: "#8F85F3",
                                },
                                "&:hover fieldset": {
                                  borderColor: "#7A73E3",
                                },
                                "&.Mui-focused fieldset": {
                                  borderColor: "#6B63D1",
                                },
                              },
                            }}
                          />
                        </FormControl>
                        <Typography>Poli yang dituju</Typography>
                        <PoliSelect
                          value={values.poli}
                          onChange={(e) =>
                            setFieldValue("poli", e.target.value)
                          }
                        />
                        {touched.poli && errors.poli && (
                          <Typography sx={{ color: "red", fontSize: "12px" }}>
                            {errors.poli}
                          </Typography>
                        )}

                        <Box
                         display={"flex"}
                         flexDirection={"row"}
                         justifyContent={"center"}
                         alignItems={"center"}
                         sx={{ width: "100%" }}
                        >
                          <FormControl sx={{ mt: 2, mb: 2, width: "100%" }} size="small">
                            <InputLabel id="doctor-label">
                              Pilih Dokter
                            </InputLabel>
                            <Select
                              labelId="doctor-label"
                              value={values.docter}
                              label="Pilih Dokter"
                              onChange={(e) =>
                                setFieldValue("docter", e.target.value)
                              }
                              sx={{ width: "100%", borderRadius: "8px" }}
                            >
                              {doctors.map((doctor) => (
                                <MenuItem
                                  key={doctor.value}
                                  value={doctor.value}
                                  sx={{ color: "#8F85F3" }}
                                >
                                  {doctor.label}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                          {touched.docter && errors.docter && (
                            <Typography
                              sx={{ color: "red", fontSize: "12px", ml: 1 }}
                            >
                              {errors.docter}
                            </Typography>
                          )}

                          <Box sx={{ ml: 2, width: "100%" }}>
                            <CalenderPopover title="Pilih tanggal" />
                          </Box>
                        </Box>

                        <FormControl>
                          <Typography sx={{ textTransform: "capitalize" }}>keluhan pasien</Typography>
                          <TextField
                            id="outlined-multiline-static"
                            multiline
                            rows={4}
                            variant="outlined"
                            sx={{ maxHeight: "107px", maxWidth: "100%" }}
                          />
                        </FormControl>

                        <Box mt={4}>
                          <Box>
                            <Typography>Unggah kartu BPJS</Typography>
                            <FileUploader />
                            <Typography fontSize={"14px"} color="#A8A8BD">
                              Ukuran maksimal 1mb
                            </Typography>
                          </Box>

                          <Box mt={2}>
                            <Typography>Unggah surat rujukan BPJS</Typography>
                            <FileUploader />
                            <Typography fontSize={"14px"} color="#A8A8BD">
                              Ukuran maksimal 1mb
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                    )}
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mt: 4,
                    }}
                  >
                    {currentPage < totalPages ? (
                      <Button
                        onClick={() =>
                          handleNext(validateForm, setErrors, values)
                        }
                        sx={{
                          backgroundColor: "#8F85F3",
                          color: "white",
                          textTransform: "none",
                          width: "100%",
                          padding: "10px 24px",
                          borderRadius: "8px",
                          "&:hover": {
                            backgroundColor: "#7C75E2",
                          },
                        }}
                      >
                        Selanjutnya
                      </Button>
                    ) : (
                      <Button
                        type="submit"
                        onClick={() => setSHowFormPage(false)}
                        sx={{
                          backgroundColor: "#8F85F3",
                          color: "white",
                          textTransform: "none",
                          padding: "10px 24px",
                          width: "100%",
                          borderRadius: "8px",
                          "&:hover": {
                            backgroundColor: "#7C75E2",
                          },
                        }}
                      >
                        Selesai
                      </Button>
                    )}
                  </Box>
                </Box>
              </Box>
            </Form>
          )}
        </Formik>
      )}

      {!showFormPage && (
        <Box marginLeft={"60%"} marginTop={"10%"}>
          <InformasiTicket />
        </Box>
      )}
    </Box>
  );
};

export default PasienLamaRawatJalanBPJS;
