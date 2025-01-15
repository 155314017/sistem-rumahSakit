import { useEffect, useState } from 'react';
import { useFormik } from "formik";
import * as Yup from "yup";
import dayjs from 'dayjs';
import Cookies from "js-cookie";
import axios from 'axios';
import "dayjs/locale/id";
dayjs.locale('id');
import { useNavigate, useParams } from 'react-router-dom';
import { editCounter } from '../../../services/Admin Tenant/ManageCounter/EditCounterService';
import { GetCounterByIdServices } from '../../../services/Admin Tenant/ManageCounter/GetCounterById';

const jenisKonter = [
    { value: 1, label: "Asuransi" },
    { value: 2, label: "BPJS" },
    { value: 3, label: "Umum" },
];

type ImageData = {
    imageName: string;
    imageType: string;
    imageData: string;
};

export default function useEditKonter() {
    const [successAlert, setSuccessAlert] = useState(false);
    const [selectedDay, setSelectedDay] = useState<string | null>('1')
    const [startTime, setStartTime] = useState<dayjs.Dayjs | null>(null);
    const [endTime, setEndTime] = useState<dayjs.Dayjs | null>(null);
    const [operationalTime, setOperationalTime] = useState<string | null>(null);
    const [imagesData, setImagesData] = useState<ImageData[]>([]);
    const [errorAlert, setErrorAlert] = useState(false);
    const [apiUrl, setApiUrl] = useState('');
    const { id } = useParams();
    const [name, setName] = useState<string>('');
    const [location, setLocation] = useState<string>('');
    const [selectedDays, setSelectedDays] = useState<string>("1");
    const navigate = useNavigate();
    const [schedules, setSchedules] = useState<any[]>([]);
    const [statusEdit, setStatusEdit] = useState(false);
    const [editingIndex, setEditingIndex] = useState<number | null>(null);


    const dayMapping: { [key: string]: number } = {
        Senin: 1, // Monday
        Selasa: 2, // Tuesday
        Rabu: 3,   // Wednesday
        Kamis: 4,   // Thursday
        Jumat: 5,   // Friday
        Sabtu: 6,   // Saturday
        Minggu: 0   // Sunday
      }

    useEffect(() => {
        if (startTime && endTime) {
           
                  const dayOfWeek = dayjs(startTime).format('dddd'); // Get day name
                  
                  
                  
                  const dayMapping: { [key: string]: string } = {
                    Senin: '1',
                    Selasa: '2',
                    Rabu: '3',
                    Kamis: '4',
                    Jumat: '5',
                    Sabtu: '6',
                    Minggu: '7'
                  };
              
                  const dayValue = dayMapping[dayOfWeek] || '7'; // Map day to corresponding value
                  setSelectedDays(dayValue);
        }
    }, [startTime, endTime]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = Cookies.get("accessToken");
                const response = await GetCounterByIdServices(id,token);
                setApiUrl(`${import.meta.env.VITE_APP_BACKEND_URL_BASE}/v1/manage/counter/${id}`);
                setName(response.name);
                setLocation(response.location);
                const convertUnixToReadableTime = (timestamp: number) => {
                                          const date = dayjs(timestamp); // Use dayjs to parse Unix timestamp
                                  
                                          const dayOfWeek = date.format('dddd'); // Get the day of the week
                                          const time = date.format('HH:mm'); // Get the formatted time (HH:mm)
                                  
                                          return { day: dayOfWeek, time };
                                        };
                                  
                                        const schedules = response?.schedules || [];
                                        const formattedSchedules = schedules.map(schedule => {
                                          const start = convertUnixToReadableTime(schedule.startDateTime);
                                          const end = convertUnixToReadableTime(schedule.endDateTime);
                                  
                                          return {
                                            id: schedule.id,
                                            day: start.day, // Extracted day from the timestamp
                                            startTime: start.time, // Extracted start time
                                            endTime: end.time, // Extracted end time
                                          };
                                        });
                                setSchedules(formattedSchedules);
            }   catch (error) {
                console.error('Error saat menghapus data:', error);
            }
        };
        fetchData();
    }, [id]);

    const handleTambahHari = () => {
        const dateTime = selectedDay + " " + startTime?.format("HH:mm") + " - " + endTime?.format("HH:mm");
        setOperationalTime(dateTime);
    };

    const handleImageChange = (images: ImageData[]) => {
        setImagesData(images);
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
        { label: "Konter", href: "/konter" },
        { label: "Edit Konter", href: "/editKonter/:id" },
    ];

    const formik = useFormik({
        initialValues: {
            namaKonter: name,
            lokasiKonter: location,
        },
        enableReinitialize: true,
        validationSchema: Yup.object({
            namaKonter: Yup.string().required('Nama Konter is required'),
            lokasiKonter: Yup.string().required('Deskripsi Konter is required'),
        }),
        onSubmit: async (values) => {
            const formattedSchedules = schedules.map(schedule => {
                            const normalizedDay = schedule.day.trim().charAt(0).toUpperCase() + schedule.day.slice(1).toLowerCase();
                            const selectedDayOfWeek = dayMapping[normalizedDay];
                        
                            const parsedStartTime = dayjs(schedule.startTime, 'HH:mm', true);
                            const parsedEndTime = dayjs(schedule.endTime, 'HH:mm', true);
                        
                            const referenceDate = dayjs().startOf('week');
                        
                            const startDateTime = referenceDate
                            .day(selectedDayOfWeek)
                            .set('hour', parsedStartTime.hour())
                            .set('minute', parsedStartTime.minute())
                            .set('second', 0)
                        
                            const endDateTime = referenceDate
                            .day(selectedDayOfWeek)
                            .set('hour', parsedEndTime.hour())
                            .set('minute', parsedEndTime.minute())
                            .set('second', 0)
                            return {
                                startDateTime: startDateTime.valueOf(),
                                endDateTime: endDateTime.valueOf()
                              };
                            }).filter(schedule => schedule !== null);

            const data = {
                counterId: id,
                name: values.namaKonter,
                location: values.lokasiKonter,
                queueNumber: 0,
                additionalInfo: "",
                masterTypeId: "c0178047-d6e7-4ce8-b4de-54756bedf031",
                schedules: formattedSchedules,
                images: imagesData.map(image => ({
                    imageName: image.imageName || "",
                    imageType: image.imageType || "",
                    imageData: image.imageData || "",
                })),
            };
            const token = Cookies.get("accessToken");

            try {
                await editCounter(data, token);
                showTemporaryAlertSuccess();
                formik.resetForm();
                setImagesData([]);
                navigate('/konter', { state: { successEdit: true, message: 'Gedung berhasil ditambahkan!' } })

            } catch (error) {
                console.error('Error submitting form:', error);
                if (axios.isAxiosError(error)) {
                    console.error('Axios error message:', error.message);
                    showTemporaryAlertError();
                } else {
                    console.error('Unexpected error:', error);
                }
            }
        },
    });
     function handleEditSchedule(index: number) {
              setStatusEdit(true);
              const scheduleToEdit = schedules[index];
              
            
              if (scheduleToEdit) {
                try {
                  // Map day names to numeric values
                  const dayMap: Record<string, string> = {
                    'Senin': '1',
                    'Selasa': '2',
                    'Rabu': '3',
                    'Kamis': '4',
                    'Jumat': '5',
                    'Sabtu': '6',
                    'Minggu': '7',
                  };
            
                  // Check if the day from scheduleToEdit exists in the map
                  const mappedDayValue = dayMap[scheduleToEdit.day];
            
            
                  if (mappedDayValue) {
                    setSelectedDay(mappedDayValue); // Set numeric value for dropdown
                  } else {
                    console.error("Invalid day name:", scheduleToEdit.day);
                    return; // Exit the function if the day is invalid
                  }
            
                  // Parse start and end times correctly
                  const parsedStartTime = dayjs(scheduleToEdit.startTime, 'HH:mm');
                  const parsedEndTime = dayjs(scheduleToEdit.endTime, 'HH:mm');
            
                  if (parsedStartTime.isValid() && parsedEndTime.isValid()) {
                    setStartTime(parsedStartTime); // Set start time in the time picker (formatted as string)
                    setEndTime(parsedEndTime); // Set end time in the time picker (formatted as string)
                  } else {
                    console.error("Invalid time format in schedule:", scheduleToEdit);
                  }
                  setEditingIndex(index); // Set editing index to identify the schedule being edited
                } catch (error) {
                  console.error("Error parsing schedule times:", error);
                }
              } else {
                console.error("Schedule not found for index:", index);
              }
            }
    
    
    
            const handleSaveAndAddDay = () => {
                // Ensure all fields are filled out before saving
                if (!selectedDay || !startTime || !endTime) {
                  console.error("Please complete all fields before saving.");
                  return;
                }
              
                // Parse the times as Dayjs objects in the correct timezone
                const parsedStartTime = dayjs(startTime, "HH:mm", true);
                const parsedEndTime = dayjs(endTime, "HH:mm", true);
              
                // Check if the parsed times are valid
                if (!parsedStartTime.isValid()) {
                  console.error("Invalid start time format:", startTime);
                  return;
                }
                if (!parsedEndTime.isValid()) {
                  console.error("Invalid end time format:", endTime);
                  return;
                }
              
                // Validate that the start time is before the end time
                if (parsedStartTime.isAfter(parsedEndTime)) {
                  // Handle the case where the schedule crosses midnight
                  parsedEndTime.add(1, 'day'); // Add one day to the end time if it crosses midnight
                }
              
                // Define the mapping of days
                const dayMapping = {
                  "1": "Senin",
                  "2": "Selasa",
                  "3": "Rabu",
                  "4": "Kamis",
                  "5": "Jumat",
                  "6": "Sabtu",
                  "7": "Minggu",
                };
              
                // Validate and get the formatted day
                if (!Object.keys(dayMapping).includes(selectedDay)) {
                  console.error("Invalid day selected:", selectedDay);
                  return;
                }
              
                // Explicitly cast selectedDay as keyof typeof dayMapping
                const formattedDay = dayMapping[selectedDay as keyof typeof dayMapping];
              
                // Get today's date and set the correct year/month/day to calculate the correct date
                const today = dayjs();
              
                // Generate the full date with correct day of the week, keeping the time portion intact
                const startDateTime = today
                  .day(parseInt(selectedDay)) // Set the day of the week
                  .hour(parsedStartTime.hour()) // Set the hour of the start time
                  .minute(parsedStartTime.minute()) // Set the minute of the start time
                  .second(0) // Reset seconds for accuracy
                  .millisecond(0); // Reset milliseconds for accuracy
              
                const endDateTime = today
                  .day(parseInt(selectedDay)) // Set the day of the week
                  .hour(parsedEndTime.hour()) // Set the hour of the end time
                  .minute(parsedEndTime.minute()) // Set the minute of the end time
                  .second(0) // Reset seconds
                  .millisecond(0); // Reset milliseconds
              
                // If end time is earlier than start time, increment the end day by 1
                if (parsedEndTime.isBefore(parsedStartTime)) {
                  endDateTime.add(1, 'day');
                }
              
                // Ensure that the start time is before the end time
                if (startDateTime.isAfter(endDateTime)) {
                  console.error("Start time cannot be after end time.");
                  return;
                }
              
                // Create the new schedule object
                const newSchedule = {
                  day: formattedDay,
                  startTime: parsedStartTime.format("HH:mm"),
                  endTime: parsedEndTime.format("HH:mm"),
                  startDateTime: startDateTime.valueOf(), // Use the Unix timestamp for start time
                  endDateTime: endDateTime.valueOf(), // Use the Unix timestamp for end time
                };
              
                // Update the schedules array
                setSchedules((prevSchedules) => {
                  if (editingIndex !== null) {
                    // Update the schedule at the specific index
                    const updatedSchedules = [...prevSchedules];
                    updatedSchedules[editingIndex] = newSchedule;
                    return updatedSchedules;
                  } else {
                    // Add the new schedule
                    return [...prevSchedules, newSchedule];
                  }
                });
              
                // Clear the input fields and reset editing index
                setSelectedDay("");
                setStartTime(null);
                setEndTime(null);
                setEditingIndex(null);
              };
    
    
              const handleDeleteSchedule = (index: number) => {
                // Logic to delete the schedule at the specified index
                const updatedSchedules = schedules.filter((_, i) => i !== index);
                // Update the schedules state in your hook or component
                // Assuming you have a method to set schedules in your hook
                setSchedules(updatedSchedules);
              };
        


  return {
    formik,
    imagesData,
    setImagesData,
    handleImageChange,
    handleTambahHari,
    breadcrumbItems,
    operationalTime,
    selectedDay,
    setSelectedDay,
    startTime,
    setStartTime,
    endTime,
    setEndTime,
    successAlert,
    errorAlert,
    jenisKonter,
    selectedDays,
    apiUrl,
    handleDeleteSchedule,
    handleEditSchedule,
    handleSaveAndAddDay,
    statusEdit,
    schedules,
  }
}
