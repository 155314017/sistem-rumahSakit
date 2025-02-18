import axios from 'axios';
import dayjs from 'dayjs';
import { useFormik } from "formik";
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from "yup";
import { createExclusions, createSchedules, KalenderData, validateInput } from '../../../services/Admin Tenant/ManageSchedule/ScheduleUtils';
import { ImageData, uploadImages } from '../../../services/Admin Tenant/ManageImage/ImageUtils';
import { createCounter } from '../../../services/Admin Tenant/ManageCounter/CreateCounterService';
import { useSuccessNotification } from '../../../hooks/useSuccessNotification';

const jenisKonter = [
    { value: 1, label: "Asuransi" },
    { value: 2, label: "BPJS" },
    { value: 3, label: "Umum" },
];

export default function useTambahKonter() {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [selectedDay, setSelectedDay] = useState<string | null>(null);
    const [startTime, setStartTime] = useState<dayjs.Dayjs | null>(null);
    const [endTime, setEndTime] = useState<dayjs.Dayjs | null>(null);
    const [operationalTime, setOperationalTime] = useState<string | null>(null);
    const kalenderRef = useRef<{ getData: () => KalenderData }>(null);
    const [imagesData, setImagesData] = useState<ImageData[]>([]);
    const { isSuccess, message, showAlert } = useSuccessNotification();
    const navigate = useNavigate();

    // const showTemporaryAlertSuccess = async () => {
    //     setSuccessAlert(true);
    //     await new Promise((resolve) => setTimeout(resolve, 3000));
    //     setSuccessAlert(false);
    // };

    // const showTemporaryAlertError = async () => {
    //     setErrorAlert(true);
    //     await new Promise((resolve) => setTimeout(resolve, 3000));
    //     setErrorAlert(false);
    // };


    const breadcrumbItems = [
        { label: "Dashboard", href: "/dashboard" },
        { label: "Konter", href: "/konter" },
        { label: "Tambah Konter", href: "/tambahKonter" },
    ];

    const formik = useFormik({
        initialValues: {
            namaKonter: '',
            lokasiKonter: '',
        },
        validationSchema: Yup.object({
            namaKonter: Yup.string().required('Nama Konter is required'),
            lokasiKonter: Yup.string().required('Deskripsi Konter is required'),
        }),
        onSubmit: async () => {
        },
    });

    const handleImageChange = (images: ImageData[]) => {
        setImagesData(images);
    };

    const getPageStyle = (page: number) => {
        if (page === currentPage) {
            return { color: "#8F85F3", cursor: "pointer", fontWeight: "bold" };
        } else if (page < currentPage) {
            return { color: "#8F85F3", cursor: "pointer" };
        } else {
            return { color: "black", cursor: "pointer" };
        }
    };

    const handleSaveKonter = async () => {
        try {
            const kalenderData = kalenderRef.current?.getData() || { praktek: [], exclusion: [] };

            // Validasi input schedule
            validateInput(kalenderData);

            // Data untuk CreateAmbulanceService
            const konterData = {
                name: formik.values.namaKonter,
                location: formik.values.lokasiKonter,
                additionalInfo: ''
            };

            // Buat konter baru
            const { data: { id: konterId } } = await createCounter(konterData);
            if (!konterId) throw new Error('Konter ID tidak ditemukan');

            // Proses secara parallel untuk optimasi
            await Promise.all([
                createSchedules(konterId, kalenderData.praktek),
                createExclusions(konterId, kalenderData.exclusion),
                uploadImages(konterId, imagesData)
            ]);

            // Reset state dan redirect
            formik.resetForm();
            setImagesData([]);

            navigate('/konter', {
                state: {
                    successAdd: true,
                    message: 'Konter berhasil ditambahkan!'
                }
            });
        } catch (error) {
            console.error('[DEBUG] Error saat menyimpan konter:', error);
            if (axios.isAxiosError(error)) {
                const responseData = error.response?.data;
                console.error('[DEBUG] Detail error dari server:', responseData || error.message);
            }
            showAlert('Failed to add counter!', 300);
        }
    };

    const tabs = [
        { pageNumber: 1, label: 'Informasi Konter' },
        { pageNumber: 2, label: 'Jam Operasional' },
    ];

    return {
        breadcrumbItems,
        formik,
        selectedDay,
        setSelectedDay,
        startTime,
        setStartTime,
        endTime,
        setEndTime,
        operationalTime,
        setOperationalTime,
        handleImageChange,
        jenisKonter,
        currentPage,
        setCurrentPage,
        getPageStyle,
        kalenderRef,
        handleSaveKonter,
        message,
        showAlert,
        isSuccess,
        tabs
    }
}
