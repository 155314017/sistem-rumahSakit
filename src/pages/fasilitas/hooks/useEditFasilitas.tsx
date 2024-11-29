import { useEffect, useState } from 'react';
import { Container, Box, Typography, Button, FormControl, OutlinedInput } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import dayjs from 'dayjs';
import axios from 'axios';
import Cookies from "js-cookie";
import { useNavigate, useParams } from 'react-router-dom';


type Building = {
    id: string;
    name: string;
};

type ImageData = {
    imageName: string;
    imageType: string;
    imageData: string;
};
export default function useEditFasilitas() {
    const [successAlert, setSuccessAlert] = useState(false);
    const [operationalTime, setOperationalTime] = useState<string | null>(null);
    const [selectedDay, setSelectedDay] = useState<string | null>(null);
    const [startTime, setStartTime] = useState<dayjs.Dayjs | null>(null);
    const [endTime, setEndTime] = useState<dayjs.Dayjs | null>(null);
    const [imagesData, setImagesData] = useState<ImageData[]>([]);
    const [errorAlert, setErrorAlert] = useState(false);
    const [gedungOptions, setGedungOptions] = useState<Building[]>([]);
    const [apiUrl, setApiUrl] = useState('');
    const { id } = useParams();
    const [initialOperationalCost, setInitialOperationalCost] = useState<number>(0);
    const [name, setName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [buildingName, setBuildingName] = useState('');
    const navigate = useNavigate();
    const [selectedDays, setSelectedDays] = useState<string>("1");

    const dayMapping: { [key: string]: number } = {
        "1": 1,
        "2": 2,
        "3": 3,
        "4": 4,
        "5": 5,
        "6": 6,
        "7": 0,
    };

    useEffect(() => {
        if (startTime && endTime) {
            const formattedStartTime = startTime.format("HH:mm");
            const formattedEndTime = endTime.format("HH:mm");
            const dayOfWeek = startTime.format("dddd");
            const dayMapping: { [key: string]: string } = {
                "Monday": "1",
                "Tuesday": "2",
                "Wednesday": "3",
                "Thursday": "4",
                "Friday": "5",
                "Saturday": "6",
                "Sunday": "7"
            };

            const dayValue = dayMapping[dayOfWeek] || "7";
            setSelectedDays(dayValue);
        }
    }, [startTime, endTime]);

    useEffect(() => {
        const fetchGedungData = async () => {
            try {
                const response = await axios.get('https://hms.3dolphinsocial.com:8083/v1/manage/building/?pageNumber=0&pageSize=10&orderBy=createdDateTime=asc', {
                    timeout: 10000
                });
                setGedungOptions(response.data.data.content.map((item: Building) => ({
                    id: item.id,
                    name: item.name,
                })));
            } catch (error) {
                console.error("Error fetching buildings:", error);
            }
        };
        fetchGedungData();
    }, []);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = Cookies.get("accessToken");
                const response = await axios.get(`https://hms.3dolphinsocial.com:8083/v1/manage/facility/${id}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'accessToken': `${token}`
                    }
                });
                setApiUrl(`https://hms.3dolphinsocial.com:8083/v1/manage/facility/${id}`);
                setName(response.data.data.name);
                setDescription(response.data.data.description);
                setInitialOperationalCost(response.data.data.cost);
                const buildingResponse = await axios.get(`https://hms.3dolphinsocial.com:8083/v1/manage/building/${response.data.data.masterBuildingId}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'accessToken': `${token}`
                    }
                });

                setBuildingName(buildingResponse.data.data.id);

                if (response.data.data.schedules && response.data.data.schedules.length > 0) {
                    const schedule = response.data.data.schedules[0];
                    setStartTime(dayjs.unix(schedule.startDateTime));
                    setEndTime(dayjs.unix(schedule.endDateTime));
                }

                setImagesData(response.data.data.images || []);
            } catch (error) {
                console.error('Error:', error);
            }
        };
        fetchData();
    }, [id]);
    const handleImageChange = (images: ImageData[]) => {
        setImagesData(images);
    };


    const handleTambahHari = () => {
        const dateTime = selectedDay + " " + startTime?.format("HH:mm") + " - " + endTime?.format("HH:mm");
        setOperationalTime(dateTime);
    };

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
        { label: "Fasilitas", href: "/fasilitas" },
        { label: "Edit Fasilitas", href: "/editFasilitas/:id" },
    ];

    const formik = useFormik({
        initialValues: {
            namaFasilitas: name,
            masterBuildingId: buildingName,
            deskripsiKlinik: description,
            operationalCost: initialOperationalCost || 0,
        },
        enableReinitialize: true,
        validationSchema: Yup.object({
            namaFasilitas: Yup.string().required('Facility Name is required'),
            masterBuildingId: Yup.string().required('Gedung is required'),
            deskripsiKlinik: Yup.string().required('Deskripsi Klinik is required'),
            operationalCost: Yup.number().required('Operational Cost is required').positive('Must be a positive number'),
        }),
        onSubmit: async (values) => {

            const selectedDayOfWeek = dayMapping[selectedDay || "1"];
            const adjustedStartTime = startTime?.day(selectedDayOfWeek);
            const adjustedEndTime = endTime?.day(selectedDayOfWeek);
            const schedules = [
                {
                    startDateTime: adjustedStartTime?.unix(),
                    endDateTime: adjustedEndTime?.unix(),
                }
            ];

            const data = {
                facilityId: id,
                name: values.namaFasilitas,
                masterBuildingId: values.masterBuildingId,
                description: values.deskripsiKlinik,
                cost: values.operationalCost,
                additionalInfo: "hai",
                schedules: schedules,
                images: imagesData.map(image => ({
                    imageName: image.imageName || "",
                    imageType: image.imageType || "",
                    imageData: image.imageData || "",
                })),
            };
            const token = Cookies.get("accessToken");

            try {
                await axios.put('https://hms.3dolphinsocial.com:8083/v1/manage/facility/', data, {
                    headers: {
                        'Content-Type': 'application/json',
                        'accessToken': `${token}`
                    },
                });
                showTemporaryAlertSuccess();
                formik.resetForm();
                setImagesData([]);
                navigate('/fasilitas', { state: { successEdit: true, message: 'Fasilitas berhasil di edit!' } })
            } catch (error) {
                console.error('Error submitting form:', error);
                if (axios.isAxiosError(error)) {
                    showTemporaryAlertError();
                } else {
                    console.error('Unexpected error:', error);
                }
            }
        },
    });

  return {
    apiUrl,
    breadcrumbItems,
    formik,
    gedungOptions,
    handleTambahHari,
    handleImageChange,
    successAlert,
    setSelectedDay,
    setStartTime,
    setEndTime,
    selectedDays,
    showTemporaryAlertSuccess,
    errorAlert,
    operationalTime,
    selectedDay,
    startTime,
    endTime,
    imagesData,
    initialOperationalCost,

  }
}
