import { useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Stack } from "@mui/system";
import InformasiTicketAPI from "../../../../components/small/InformasiTicketAPI";
import GenerateQueuePatientServices from "../../../../services/Patient Tenant/GenerateQueuePatientServices";
import { GetDoctorServices } from "../../../../services/Admin Tenant/ManageDoctor/GetDoctorService";
import { getClinic } from "../../../../services/Admin Tenant/ManageClinic/GetClinic";
import dayjs from "dayjs";
import 'dayjs/locale/id';
import medicineImg from "../../../../img/meidicine.png"
import qrcodeImg from "../../../../img/qrcode.png"
import fillingImg from "../../../../img/filling.png"
import CardAntrianCounter from "../../../../components/small/card/CardAntrianCounter";
import PasienCard from "../../../../components/small/card/PasienCard";

const formatDate = (timestamp: number) => dayjs.unix(timestamp).locale('id').format('DD MMMM YYYY');
const formatTime = (timestamp: number) => dayjs.unix(timestamp).format('HH:mm');

type bookingCodeData = {
    nomorAntrian: string,
    namaDokter: string,
    namaKlinik: string,
    tanggalReserve: string,
    jadwalKonsul: string,
}

const style = {
    position: "absolute" as const,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 670,
    bgcolor: "#FFFFFF",
    border: "1px solid #A8A8BD",
    boxShadow: 2,
    p: 4,
    borderRadius: "16px",
};

const bookingCodeSchema = Yup.object({
    bookingCode: Yup.string()
        // .min(6, "Booking kode minimal 6 digit")
        // .max(6, "Booking kode maksimal 6 digit")
        .required("Booking kode wajib diisi"),
});

export default function usePilihKategoriPasien() {
    const [openModalKodeBooking, setOpenModalKodeBooking] = useState(false);
    const [openModalPilihPembayaran, setOpenModalPilihPembayaran] = useState(false);
    const [mainPages, setMainPages] = useState(true);
    const [inputCodePages, setInputCodePages] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [infoTicket, setInfoTicket] = useState(false);
    const [nomorAntrian, setNomorAntrian] = useState<string | number>(0);
    const [tiketAntrianKonter, setTiketAntrianKonter] = useState(false);
    const [errCode, setErrCode] = useState(false)
    const [dataKodeBooking, setDataKodeBooking] = useState<bookingCodeData>()

    const breadcrumbItems = [
        { label: "Pasien Lama", href: "/tes" },
        // { label: "Pasien", href: "/pasien" },
        // { label: "Tambah Pasien", href: "/tambahPasien/Umum" },
    ];



    const handleBack = () => {
        setOpenModalPilihPembayaran(false);
        setMainPages(true);
    }

    const pasienBaru = async () => {
        const counterId = "f2ac5cf2-b023-4756-ac33-b7b493d065dd" //nanti diganti
        setTiketAntrianKonter(true);
        setMainPages(false);
        try {
            const response = await GenerateQueuePatientServices(counterId)
            console.log(response);
            setNomorAntrian(response);
            console.log(response)

        } catch {
            console.log('error')
        }

    }

    const onSubmitKodeBooking = async (values: any) => {
        console.log("Kode booking:", values.bookingCode);
        setIsLoading(true);
        console.log(values.bookingCode)
        const bookingCode = { bookingCode: values.bookingCode };
        try {
            const response = await axios.post(
                'check-in/api',
                bookingCode,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            )
            console.log("response: ", response.data.data.registrationDatum.scheduleDatum.startDateTime)

            const dateTime = formatDate(response.data.data.registrationDatum.scheduleDatum.startDateTime);
            const startTime = formatTime(response.data.data.registrationDatum.scheduleDatum.startDateTime);
            const endTime = formatTime(response.data.data.registrationDatum.scheduleDatum.endDateTime);
            const consultationSchedule = dateTime + ' ' + startTime + ' - ' + endTime
            const namaDokter = await GetDoctorServices(response.data.data.registrationDatum.doctorDataId)
            const namaKlinik = await getClinic(response.data.data.registrationDatum.masterClinicId)
            const dateReserve = dayjs(response.data.data.createdDateTime * 1000).format('YYYY-MM-DD HH:mm');
            const dataBooking = {
                nomorAntrian: response.data.data.queueNumber,
                namaDokter: namaDokter.name,
                namaKlinik: namaKlinik.name,
                tanggalReserve: dateReserve,
                jadwalKonsul: consultationSchedule,
            }
            setDataKodeBooking(dataBooking)
            setOpenModalKodeBooking(false);
            setInfoTicket(true);
            setIsLoading(false);
            setInputCodePages(false);
        } catch (err: any) {
            console.log(err.status)
            setErrCode(true)
        }

    }

    return {
        formatDate,
        formatTime,
        setOpenModalKodeBooking,
        openModalKodeBooking,
        openModalPilihPembayaran,
        setOpenModalPilihPembayaran,
        mainPages,
        setMainPages,
        inputCodePages,
        setInputCodePages,
        isLoading,
        setIsLoading,
        infoTicket,
        setInfoTicket,
        nomorAntrian,
        setNomorAntrian,
        tiketAntrianKonter,
        setTiketAntrianKonter,
        errCode,
        setErrCode,
        dataKodeBooking,
        setDataKodeBooking,
        breadcrumbItems,
        handleBack,
        pasienBaru,
        bookingCodeSchema,
        style,
        onSubmitKodeBooking,
    }
}
