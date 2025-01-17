/* eslint-disable @typescript-eslint/no-explicit-any */

import React, {
    useState,
    useRef,
    useEffect,
    MouseEvent,
    forwardRef,
    useImperativeHandle
} from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import '@fullcalendar/core';
import dayjs from 'dayjs';
import 'dayjs/locale/id';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import {
    Container,
    Typography,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Box,
    Select,
    MenuItem,
    FormControl,
    Menu,
    Alert,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { DateCalendar, DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import CardJadwalPraktek from '../small/card/CardJadwalPraktek';
import CardJadwalExclusion from '../small/card/CardJadwalExclusion';
import DropdownList from '../small/dropdownlist/DropdownList';
import DropdownListTime from '../small/dropdownlist/DropdownListTime';
import { CloseOutlined } from '@mui/icons-material';
import ModalUbahNoHp from '../small/modal/ModalUbahNoHp';

// Definisikan interface untuk Event dan Session
interface Event {
    id: string;
    title: string;
    start: string;
    end?: string;
    allDay?: boolean;
    type?: string;
    notes?: string;
    color?: string;
    textColor?: string;
    borderColor?: string;
}

interface Session {
    id: string;
    startTime: string;
    endTime: string;
    selectedDays: string[];
    notes: string;
}

// Definisikan interface untuk data yang akan diekspose ke parent
interface KalenderData {
    praktek: PraktekData[];
    exclusion: ExclusionData[];
}

interface PraktekData {
    id: string;
    startTime: string;
    endTime: string;
    selectedDay: string[];
    notes: string;
    type: string;
}

interface ExclusionData {
    id: string;
    start: string;
    end?: string;
    title: string;
    type: string;
    notes: string;
    allDay?: boolean;
}

interface TestKalenderRef {
    getData: () => KalenderData;
}

const StyledDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiPaper-root': {
        position: 'fixed',
        top: 0,
        right: 0,
        margin: 0,
        borderTopLeftRadius: '16px',
        borderBottomLeftRadius: '16px',
        minHeight: '100%',
        width: '40vw',
        maxWidth: 'none',
        boxShadow: theme.shadows[5],
        animation: 'slideIn 0.5s ease-out',
        '&.slideOut': {
            animation: 'slideOut 0.5s ease-in forwards',
        },
    },
}));

const jamOperasional = [
    { value: "07:00 am", label: "07:00 am" },
    { value: "08:00 am", label: "08:00 am" },
    { value: "09:00 am", label: "09:00 am" },
    { value: "10:00 am", label: "10:00 am" },
    { value: "11:00 am", label: "11:00 am" },
    { value: "12:00 pm", label: "12:00 pm" },
    { value: "01:00 pm", label: "01:00 pm" },
    { value: "02:00 pm", label: "02:00 pm" },
    { value: "03:00 pm", label: "03:00 pm" },
    { value: "04:00 pm", label: "04:00 pm" },
    { value: "05:00 pm", label: "05:00 pm" },
    { value: "06:00 pm", label: "06:00 pm" },
    { value: "07:00 pm", label: "07:00 pm" },
    { value: "08:00 pm", label: "08:00 pm" },
    { value: "09:00 pm", label: "09:00 pm" },
];

const GlobalStyles = styled('style')`
  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }

  @keyframes slideOut {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(100%);
      opacity: 0;
    }
  }
`;

const StyledContainer = styled(Container)(({ theme }) => ({
    borderRadius: '16px',
    minWidth: '100%',
    padding: theme.spacing(4),
    '& .fc-event': {
        border: 'none',
        borderRadius: theme.shape.borderRadius,
        color: '#fff',
        fontSize: '0.875rem',
        alignItems: 'center',
        justifyContent: 'center',
    },
    '& .fc-timegrid-slot': {
        borderBottom: '1px solid #e0e0e0',
        height: '75px'
    },
    '& .fc-daygrid-day-number': {
        color: 'black',
        marginRight: '40%',
        marginTop: '5%',
    },
    '& .fc-col-header-cell': {
        border: 'none',
        textAlign: 'center',
    },
    '& .fc-now-indicator-line': {
        backgroundColor: '#00FF00 !important',
        height: '2px !important',
        width: '1px !important',
    },
    '& .fc-now-indicator-arrow': {
        borderTopColor: '#00FF00 !important',
    },
    '& .fc-day-today .fc-daygrid-day-number': {
        backgroundColor: '#7367F0',
        borderRadius: '100px',
        padding: '4px',
        color: 'white',
    },
    '& .fc-day-today': {
        backgroundColor: 'inherit !important',
    },
    '& .fc-day-today .fc-daygrid-day-number::before': {
        content: '""',
        display: 'block',
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        border: '2px solid #7367F0',
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 1,
    },
    '& .fc-event-praktek': {
        backgroundColor: '#D5D1FB !important',
        borderColor: '#5A5AA5 !important',
        color: '#000000 !important',
        width: '100% !important',
        height: '100% !important',
    },
    '& .fc-event-exclusion': {
        backgroundColor: '#B8E0C9 !important',
        borderColor: '#388E3C !important',
        color: '#000000 !important',
        width: '100% !important',
        height: '100% !important',
    },
    '& .fc-event-praktek:hover, & .fc-event-exclusion:hover': {
        opacity: 0.8,
    },
    '@media (max-width: 768px)': {
        '& .fc-timegrid-slot-label': {
            fontSize: '0.8rem',
        },
        '& .fc-timegrid-slot-frame': {
            padding: '5px',
        },
    },
}));

const TestKalender = forwardRef<TestKalenderRef>((_, ref) => {
    useImperativeHandle(ref, () => ({
        getData: () => getKalenderData(),
    }));
    // State management
    const [events, setEvents] = useState<Event[]>([]);
    const [sessions, setSessions] = useState<Session[]>([]);
    const [exclusionEvents, setExclusionEvents] = useState<Event[]>([]);
    const [open, setOpen] = useState(false);
    const [openExclusion, setOpenExclusion] = useState(false);
    const [currentDate, setCurrentDate] = useState(dayjs());
    const [currentView, setCurrentView] = useState<string>('timeGridDay');
    const calendarRef = useRef<FullCalendar>(null);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const openMenu = Boolean(anchorEl);
    const [openModalKodeBooking, setOpenModalKodeBooking] = useState(false);
    const [newEvent, setNewEvent] = useState({
        type: 'Praktek',
        startTime: '',
        endTime: '',
        senin: false,
        selasa: false,
        rabu: false,
        kamis: false,
        jumat: false,
        sabtu: false,
        minggu: false,
        notes: '',
    });
    const [newExclusion, setNewExclusion] = useState({
        exclusionTitle: '',
        exclusionDateStart: '',
        exclusionTimeStart: '',
        exclusionDateEnd: '',
        exclusionTimeEnd: '',
        exclusionNotes: '',
    });
    const [errorPraktek, setErrorPraktek] = useState<string>('');
    const [errorExclusion, setErrorExclusion] = useState<string>('');
    const [availableDates, setAvailableDates] = useState<Set<string>>(new Set());

    const days = [
        { label: 'Min', value: 'minggu' },
        { label: 'Sen', value: 'senin' },
        { label: 'Sel', value: 'selasa' },
        { label: 'Rab', value: 'rabu' },
        { label: 'Kam', value: 'kamis' },
        { label: 'Jum', value: 'jumat' },
        { label: 'Sab', value: 'sabtu' },
    ];

    const tipeJadwal = [
        { value: 'Praktek', label: "Praktek" },
        { value: 'Pengecualian', label: "Pengecualian" },
    ];

    // Mengatur fungsi untuk mengekspos data ke parent
    useImperativeHandle(ref, () => ({
        getData: () => getKalenderData(),
    }));

    const getKalenderData = (): KalenderData => {
        // Mapping sessions to praktek array
        const praktek: PraktekData[] = sessions.map(session => ({
            id: session.id,
            startTime: session.startTime,
            endTime: session.endTime,
            selectedDay: session.selectedDays,
            notes: session.notes,
            type: 'Praktek',
        }));

        // Mapping exclusionEvents to exclusion array
        const exclusion: ExclusionData[] = exclusionEvents.map(event => ({
            id: event.id,
            start: event.start,
            end: event.end,
            title: event.title,
            type: event.type || '',
            notes: event.notes || '',
            allDay: event.allDay || false,
        }));

        return {
            praktek,
            exclusion,
        };
    };

    // Hooks useEffect
    useEffect(() => {
        console.log('Tanggal yang diformat: ', currentDate.format('dddd, D MMMM YYYY'));
    }, [currentDate]);

    useEffect(() => {
        if (calendarRef.current) {
            const calendarApi = calendarRef.current.getApi();
            calendarApi.gotoDate(currentDate.format('YYYY-MM-DD'));
        }
    }, [currentDate]);

    useEffect(() => {
        const generatedEvents: Event[] = [];

        sessions.forEach(session => {
            const { startTime, endTime, selectedDays, notes, id } = session;
            const startDate = dayjs().startOf('day');
            const endDate = dayjs().add(1, 'year').endOf('day');

            selectedDays.forEach(day => {
                const dayMap: { [key: string]: number } = {
                    'minggu': 0,
                    'senin': 1,
                    'selasa': 2,
                    'rabu': 3,
                    'kamis': 4,
                    'jumat': 5,
                    'sabtu': 6,
                };
                const targetDay = dayMap[day];
                let current = startDate.day(targetDay);
                if (current.isBefore(startDate, 'day')) {
                    current = current.add(1, 'week');
                }

                while (current.isBefore(endDate, 'day')) {
                    const formattedDate = current.format('YYYY-MM-DD');
                    const startTime24 = dayjs(startTime, ['hh:mm a', 'hh:mm A']).format('HH:mm:ss');
                    const endTime24 = dayjs(endTime, ['hh:mm a', 'hh:mm A']).format('HH:mm:ss');

                    generatedEvents.push({
                        id: `${id}-${day}-${formattedDate}`,
                        title: 'Praktek',
                        start: `${formattedDate}T${startTime24}`,
                        end: `${formattedDate}T${endTime24}`,
                        type: 'Praktek',
                        notes: notes,
                        color: '#8F85F3',
                        textColor: '#FFFFFF',
                        borderColor: '#5A5AA5',
                    });

                    current = current.add(1, 'week');
                }
            });
        });

        setEvents([...generatedEvents, ...exclusionEvents]);

        const updatedAvailableDates = new Set<string>();
        sessions.forEach(session => {
            session.selectedDays.forEach(day => {
                const dayMap: { [key: string]: number } = {
                    'minggu': 0,
                    'senin': 1,
                    'selasa': 2,
                    'rabu': 3,
                    'kamis': 4,
                    'jumat': 5,
                    'sabtu': 6,
                };
                const targetDay = dayMap[day];
                let current = dayjs().startOf('day').day(targetDay);
                const endDate = dayjs().add(1, 'year').endOf('day');
                if (current.isBefore(dayjs(), 'day')) {
                    current = current.add(1, 'week');
                }
                while (current.isBefore(endDate, 'day')) {
                    updatedAvailableDates.add(current.format('YYYY-MM-DD'));
                    current = current.add(1, 'week');
                }
            });
        });

        setAvailableDates(updatedAvailableDates);
    }, [sessions, exclusionEvents]);

    useEffect(() => {
        console.log('Available Dates:', Array.from(availableDates));
    }, [availableDates]);

    const renderEventContent = (eventInfo: any) => {
        const start = dayjs(eventInfo.event.start).format('hh:mm a');
        const end = dayjs(eventInfo.event.end).format('hh:mm a');

        return (
            <div style={{ textAlign: 'center' }}>
                <strong>{eventInfo.event.title}</strong>
                <div style={{ fontSize: '0.75rem' }}>
                    {start} - {end}
                </div>
            </div>
        );
    };

    // Handlers for event and exclusion changes
    const handleEventChange = (field: keyof typeof newEvent, value: string | boolean) => {
        setNewEvent({ ...newEvent, [field]: value });
    };

    const handleExclusionChange = (field: keyof typeof newExclusion, value: string) => {
        setNewExclusion({ ...newExclusion, [field]: value });
    };

    // Menu handlers
    const handleMenuOpen = (event: MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };


    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleMenuSelect = (type: 'Praktek' | 'Pengecualian') => {
        handleMenuClose();
        if (type === 'Praktek') {
            setOpen(true);
            setOpenExclusion(false);
        } else if (type === 'Pengecualian') {
            setOpenExclusion(true);
            setOpen(false);
        }
    };

    const handleChangeTipeJadwal = (value: string) => {
        if (value === 'Praktek') {
            setOpen(true);
            setOpenExclusion(false);
        } else if (value === 'Pengecualian') {
            setOpenExclusion(true);
            setOpen(false);
        }
    };

    // Validation functions
    const validatePraktek = () => {
        const { type, startTime, endTime } = newEvent;
        const isAnyDaySelected = ['senin', 'selasa', 'rabu', 'kamis', 'jumat', 'sabtu', 'minggu'].some(day => newEvent[day as keyof typeof newEvent]);
        if (!type || !startTime || !endTime || !isAnyDaySelected) {
            setErrorPraktek('Harap isi tipe jadwal, waktu mulai, waktu selesai, dan pilih setidaknya satu hari.');
            return false;
        }
        const start = dayjs(startTime, ['hh:mm a', 'hh:mm A']);
        const end = dayjs(endTime, ['hh:mm a', 'hh:mm A']);
        if (end.isBefore(start)) {
            setErrorPraktek('Waktu selesai tidak boleh sebelum waktu mulai.');
            return false;
        }
        setErrorPraktek('');
        return true;
    };

    const validateExclusion = () => {
        const { exclusionTitle, exclusionDateStart, exclusionTimeStart, exclusionDateEnd, exclusionTimeEnd } = newExclusion;
        if (!exclusionTitle || !exclusionDateStart || !exclusionTimeStart) {
            setErrorExclusion('Harap isi judul, tanggal mulai, dan waktu mulai.');
            return false;
        }
        if (exclusionDateEnd && exclusionTimeEnd) {
            const startDateTime = dayjs(`${exclusionDateStart}T${exclusionTimeStart}`, 'YYYY-MM-DDThh:mm a');
            const endDateTime = dayjs(`${exclusionDateEnd}T${exclusionTimeEnd}`, 'YYYY-MM-DDThh:mm a');
            if (endDateTime.isBefore(startDateTime)) {
                setErrorExclusion('Tanggal selesai tidak boleh sebelum tanggal mulai.');
                return false;
            }
        }
        setErrorExclusion('');
        return true;
    };

    // Close modal handlers
    const handleClosePraktek = () => {
        setOpen(false);
        setNewEvent({
            type: 'Praktek',
            startTime: '',
            endTime: '',
            senin: false,
            selasa: false,
            rabu: false,
            kamis: false,
            jumat: false,
            sabtu: false,
            minggu: false,
            notes: '',
        });
        setErrorPraktek('');
    };

    const handleCloseExclusion = () => {
        setOpenExclusion(false);
        setNewExclusion({
            exclusionTitle: '',
            exclusionDateStart: '',
            exclusionTimeStart: '',
            exclusionDateEnd: '',
            exclusionTimeEnd: '',
            exclusionNotes: '',
        });
        setErrorExclusion('');
    };

    // Input change handlers
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        handleEventChange(name as keyof typeof newEvent, value);
    };

    const handleChangeExclusionField = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        handleExclusionChange(name as keyof typeof newExclusion, value);
    };

    // Toggle day selection
    const toggleDay = (day: string) => {
        handleEventChange(day as keyof typeof newEvent, !newEvent[day as keyof typeof newEvent]);
    };

    // Calendar navigation handlers
    const handlePrev = () => {
        if (calendarRef.current) {
            const calendarApi = calendarRef.current.getApi();
            calendarApi.prev();
            setCurrentDate(dayjs(calendarApi.getDate()));
        }
    };

    const handleNext = () => {
        if (calendarRef.current) {
            const calendarApi = calendarRef.current.getApi();
            calendarApi.next();
            setCurrentDate(dayjs(calendarApi.getDate()));
        }
    };

    // Add event handlers
    const handleAddEvent = () => {
        if (validatePraktek()) {
            const { startTime, endTime, notes } = newEvent;
            const selectedDaysArray = Object.keys(newEvent).filter(day =>
                ['senin', 'selasa', 'rabu', 'kamis', 'jumat', 'sabtu', 'minggu'].includes(day) && newEvent[day as keyof typeof newEvent]
            );

            const newSession: Session = {
                id: `session-${Date.now()}`,
                startTime,
                endTime,
                selectedDays: selectedDaysArray,
                notes,
            };

            setSessions([...sessions, newSession]);
            console.log('Sesi Praktek Ditambahkan:', newSession);
            handleClosePraktek();
        }
    };

    const handleAddExclusion = () => {
        if (validateExclusion()) {
            const { exclusionTitle, exclusionDateStart, exclusionTimeStart, exclusionDateEnd, exclusionTimeEnd, exclusionNotes } = newExclusion;
            const startDateTime = dayjs(`${exclusionDateStart}T${exclusionTimeStart}`, 'YYYY-MM-DDThh:mm a').toISOString();
            const endDateTime = exclusionTimeEnd
                ? dayjs(`${exclusionDateEnd}T${exclusionTimeEnd}`, 'YYYY-MM-DDThh:mm a').toISOString()
                : undefined;

            const exclusionToAdd: Event = {
                id: `exclusion-${Date.now()}`,
                title: exclusionTitle,
                start: startDateTime,
                end: endDateTime,
                allDay: false,
                notes: exclusionNotes,
                type: 'Pengecualian',
                color: '#B8E0C9',
                textColor: '#000000',
                borderColor: '#388E3C',
            };

            setExclusionEvents([...exclusionEvents, exclusionToAdd]);
            console.log('Event Pengecualian Ditambahkan:', exclusionToAdd);
            handleCloseExclusion();
        }
    };

    // View change handler
    const handleViewChange = (view: string) => {
        if (calendarRef.current) {
            const calendarApi = calendarRef.current.getApi();
            calendarApi.changeView(view);
        }
        setCurrentView(view);
    };

    return (
        <>
            <GlobalStyles />
            <Box
                bgcolor={'white'}
                width={'94%'}
                ml={'2%'}
                border={'1px solid #C5C5D3'}
                borderRadius={'16px'}
                padding={0}
            >
                <StyledContainer>
                    {/* Header */}
                    <Box
                        display={'flex'}
                        flexDirection={'row'}
                        alignItems={'center'}
                        justifyContent={'space-between'}
                        mb={'2%'}
                    >
                        <Typography variant="h6">Jadwal Praktek</Typography>
                        <Box>
                            <Button
                                variant="contained"
                                onClick={handleMenuOpen}
                                // onClick={() => setOpenModalKodeBooking(true)}
                                sx={{ bgcolor: '#8F85F3', color: 'white' }}
                            >
                                Tambah Jadwal
                            </Button>
                            <Menu
                                anchorEl={anchorEl}
                                open={openMenu}
                                onClose={handleMenuClose}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'right',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                            >

                                <MenuItem
                                    sx={{
                                        color: '#8F85F3',
                                        borderRadius: '16px',
                                        marginX: '12px',
                                        mt: '6px',
                                        '&:hover': { bgcolor: '#D5D1FB' },
                                        '&.Mui-selected': {
                                            backgroundColor: '#8F85F3',
                                            color: '#fff',
                                            '&:hover': {
                                                backgroundColor: '#6E6CB2',
                                            }
                                        }
                                    }}
                                    onClick={() => handleMenuSelect('Praktek')}>
                                    Praktek
                                </MenuItem>
                                <MenuItem
                                    sx={{
                                        color: '#8F85F3',
                                        borderRadius: '16px',
                                        marginX: '12px',
                                        mt: '6px',
                                        '&:hover': { bgcolor: '#D5D1FB' },
                                        '&.Mui-selected': {
                                            backgroundColor: '#8F85F3',
                                            color: '#fff',
                                            '&:hover': {
                                                backgroundColor: '#6E6CB2',
                                            }
                                        }
                                    }}
                                    onClick={() => handleMenuSelect('Pengecualian')}>
                                    Pengecualian
                                </MenuItem>
                            </Menu>
                        </Box>
                    </Box>

                    {/* Konten Utama */}
                    <Box display="flex" flexDirection="row" gap={4}>
                        {/* Sidebar */}
                        <Box
                            width="35%"
                            display="flex"
                            flexDirection="column"
                            paddingY={2}
                            gap={3}
                            sx={{
                                overflowY: 'auto',
                                maxHeight: '85vh',
                                '&::-webkit-scrollbar': {
                                    width: '60px',
                                },
                                '&::-webkit-scrollbar-track': {
                                    background: 'transparent',
                                },
                                '&::-webkit-scrollbar-thumb': {
                                    backgroundColor: '#D5D1FB',
                                    borderRadius: '3px',
                                    border: '1px solid #D5D1FB',
                                },
                                scrollbarWidth: 'none',
                                scrollbarColor: '#D5D1FB transparent',
                            }}
                        >
                            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="id">
                                <Box
                                    sx={{
                                        border: '1px solid #C5C5D3',
                                        borderRadius: '16px',
                                        padding: 2
                                    }}
                                >
                                    <DateCalendar
                                        value={currentDate}
                                        onMonthChange={(newMonth) => {
                                            setCurrentDate(newMonth);
                                        }}
                                        shouldDisableDate={(date) => !availableDates.has(date.format('YYYY-MM-DD'))}
                                        slotProps={{
                                            day: {
                                                sx: {
                                                    '&.Mui-selected': {
                                                        backgroundColor: '#8F85F3',
                                                        color: '#fff',
                                                        '&:hover': {
                                                            backgroundColor: '#6E6CB2',
                                                        },
                                                    },
                                                    '&.Mui-selected:focus': {
                                                        backgroundColor: '#8F85F3',
                                                    },
                                                },
                                            },
                                        }}
                                        onChange={(value) => {
                                            if (value) {
                                                setCurrentDate(value);
                                            }
                                        }}
                                    />
                                </Box>
                            </LocalizationProvider>
                            <CardJadwalPraktek sessions={sessions} />
                            {exclusionEvents.map((event) => (
                                <CardJadwalExclusion key={event.id} event={event} />
                            ))}
                        </Box>

                        {/* Kalender */}
                        <Box
                            width="100%"
                            display="flex"
                            flexDirection="column"
                            gap={3}
                            padding={'8px 0'}
                            borderRadius={'16px'}
                        >
                            {/* Header Kalender */}
                            <Box display="flex" justifyContent="space-between" alignItems="center">
                                <Box display="flex" alignItems="center" gap={2}>
                                    <Typography variant="h5">{currentDate.format('dddd, D MMMM YYYY')}</Typography>
                                    <Box display="flex" gap={0}>
                                        <NavigateBeforeIcon sx={{ cursor: 'pointer' }} onClick={handlePrev} />
                                        <NavigateNextIcon sx={{ cursor: 'pointer' }} onClick={handleNext} />
                                    </Box>
                                </Box>
                                <Box display="flex" alignItems="center" flexDirection={'row'} gap={2}>
                                    <Typography fontSize={'16px'} fontWeight={600} lineHeight={'18px'}>Format</Typography>
                                    <FormControl size="small">
                                        <Select
                                            value={currentView}
                                            onChange={(e) => handleViewChange(e.target.value as string)}
                                            sx={{
                                                minWidth: '200px',
                                                minHeight: '38px',
                                                borderRadius: '8px',
                                                border: '1px solid #A8A8BD',
                                            }}
                                        >
                                            <MenuItem
                                                sx={{
                                                    color: '#8F85F3',
                                                    borderRadius: '16px',
                                                    marginX: '12px',
                                                    mt: '6px',
                                                    '&:hover': { bgcolor: '#D5D1FB' },
                                                    '&.Mui-selected': {
                                                        backgroundColor: '#8F85F3',
                                                        color: '#fff',
                                                        '&:hover': {
                                                            backgroundColor: '#6E6CB2',
                                                        }
                                                    }
                                                }}
                                                value="dayGridMonth">
                                                Bulan
                                            </MenuItem>
                                            <MenuItem
                                                sx={{
                                                    color: '#8F85F3',
                                                    borderRadius: '16px',
                                                    marginX: '12px',
                                                    mt: '6px',
                                                    '&:hover': { bgcolor: '#D5D1FB' },
                                                    '&.Mui-selected': {
                                                        backgroundColor: '#8F85F3',
                                                        color: '#fff',
                                                        '&:hover': {
                                                            backgroundColor: '#6E6CB2',
                                                        }
                                                    }
                                                }}
                                                value="timeGridWeek">
                                                Minggu
                                            </MenuItem>
                                            <MenuItem
                                                sx={{
                                                    color: '#8F85F3',
                                                    borderRadius: '16px',
                                                    marginX: '12px',
                                                    mt: '6px',
                                                    '&:hover': { bgcolor: '#D5D1FB' },
                                                    '&.Mui-selected': {
                                                        backgroundColor: '#8F85F3',
                                                        color: '#fff',
                                                        '&:hover': {
                                                            backgroundColor: '#6E6CB2',
                                                        }
                                                    }
                                                }}
                                                value="timeGridDay">
                                                Hari
                                            </MenuItem>
                                        </Select>
                                    </FormControl>
                                </Box>
                            </Box>

                            {/* Komponen FullCalendar */}
                            <FullCalendar
                                ref={calendarRef}
                                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                                initialView={currentView}
                                locale="id"
                                timeZone="local"
                                headerToolbar={false}
                                height="85vh"
                                events={events}
                                selectable
                                dayMaxEvents
                                eventContent={renderEventContent}
                                nowIndicator={true}
                                views={{
                                    timeGridWeek: {
                                        titleFormat: { month: 'long', year: 'numeric' },
                                        slotDuration: '01:00:00',
                                        slotLabelInterval: '01:00',
                                    },
                                    timeGridDay: {
                                        titleFormat: { month: 'long', year: 'numeric', day: 'numeric' },
                                        slotDuration: '01:00:00',
                                        slotLabelInterval: '01:00',
                                    },
                                }}
                                slotMinTime="00:00:00"
                                slotMaxTime="24:00:00"
                                eventOverlap={false}
                                eventDisplay="block"
                                eventClassNames={(arg) => {
                                    if (arg.event.extendedProps.type === 'Pengecualian') {
                                        return ['fc-event-exclusion'];
                                    }
                                    return ['fc-event-praktek'];
                                }}
                            />
                        </Box>
                    </Box>

                    {/* Modal Praktek */}
                    <StyledDialog open={open} onClose={handleClosePraktek}>
                        <Box
                            display={'flex'}
                            flexDirection={'row'}
                            alignItems={'center'}
                            justifyContent={'space-between'}
                            maxWidth={'95%'}
                        >
                            <DialogTitle>Tambah Jadwal Baru</DialogTitle>
                            <CloseOutlined sx={{ cursor: 'pointer' }} onClick={handleClosePraktek} />
                        </Box>
                        <DialogContent>
                            <Box display="flex" flexDirection="column" gap={2}>
                                <Typography>Tipe Jadwal</Typography>
                                <DropdownList
                                    defaultValue='Praktek'
                                    onChange={handleChangeTipeJadwal}
                                    loading={false}
                                    options={tipeJadwal}
                                    placeholder='Pilih tipe jadwal'
                                />
                                <Box
                                    borderRadius={'16px'}
                                    padding={2}
                                    border={'1px solid #C5C5D3'}
                                    display="flex"
                                    gap={2}
                                    flexDirection={'row'}
                                    alignItems={'center'}
                                    justifyContent={'space-between'}
                                >
                                    <Typography fontSize={'16px'} fontWeight={600} lineHeight={'18px'}>Jam</Typography>
                                    <Box display="flex" gap={2} flexDirection={'row'}>
                                        <DropdownListTime
                                            placeholder='Jam mulai'
                                            loading={false}
                                            options={jamOperasional}
                                            onChange={(value) => handleEventChange('startTime', value)}
                                        />
                                        <DropdownListTime
                                            placeholder='Jam selesai'
                                            loading={false}
                                            options={jamOperasional}
                                            onChange={(value) => handleEventChange('endTime', value)}
                                        />
                                    </Box>
                                </Box>
                                <Box
                                    display="flex"
                                    gap={2}
                                    flexDirection={'column'}
                                    border={'1px solid #C5C5D3'}
                                    borderRadius={'16px'}
                                    padding={2}
                                >
                                    <Typography fontSize={'16px'} fontWeight={600} lineHeight={'18px'}>Ulang pada hari</Typography>
                                    <Box display={'flex'} flexDirection={'row'} gap={2}>
                                        {days.map((day) => (
                                            <Button
                                                key={day.value}
                                                onClick={() => toggleDay(day.value)}
                                                sx={{
                                                    border: '1px solid #8F85F3',
                                                    color: newEvent[day.value as keyof typeof newEvent] ? '#fff' : '#8F85F3',
                                                    backgroundColor: newEvent[day.value as keyof typeof newEvent] ? '#8F85F3' : 'transparent',
                                                    borderRadius: '16px',
                                                    padding: 1,
                                                    '&:hover': {
                                                        bgcolor: '#8F85F3',
                                                        color: 'white',
                                                    },
                                                    transition: 'background-color 0.3s, color 0.3s',
                                                }}
                                            >
                                                {day.label}
                                            </Button>
                                        ))}
                                    </Box>
                                </Box>
                                <TextField
                                    name="notes"
                                    placeholder="Masukkan catatan"
                                    multiline
                                    rows={4}
                                    fullWidth
                                    sx={{
                                        '& .MuiInputBase-root': {
                                            borderRadius: '16px',
                                        },
                                    }}
                                    value={newEvent.notes}
                                    onChange={handleChange}
                                />
                                {errorPraktek && <Alert severity="error">{errorPraktek}</Alert>}
                            </Box>
                        </DialogContent>
                        <DialogActions>
                            <Button
                                sx={{
                                    padding: 1,
                                    mb: '1%',
                                    bgcolor: '#8F85F3',
                                    color: 'white',
                                    borderRadius: '8px'
                                }}
                                onClick={handleAddEvent}
                                fullWidth
                            >
                                Simpan
                            </Button>
                        </DialogActions>
                    </StyledDialog>

                    <ModalUbahNoHp open={openModalKodeBooking} onClose={() => setOpenModalKodeBooking(false)} />

                    {/* Modal Pengecualian */}
                    <StyledDialog open={openExclusion} onClose={handleCloseExclusion}>
                        <Box
                            display={'flex'}
                            flexDirection={'row'}
                            alignItems={'center'}
                            justifyContent={'space-between'}
                            maxWidth={'95%'}
                        >
                            <DialogTitle>Tambah Pengecualian Baru</DialogTitle>
                            <CloseOutlined sx={{ cursor: 'pointer' }} onClick={handleCloseExclusion} />
                        </Box>
                        <DialogContent>
                            <Box display="flex" flexDirection="column" gap={2}>
                                <Typography>Tipe Jadwal</Typography>
                                <DropdownList
                                    defaultValue='Pengecualian'
                                    onChange={handleChangeTipeJadwal}
                                    loading={false}
                                    options={tipeJadwal}
                                    placeholder='Pilih tipe jadwal'
                                />
                                <Typography>Judul jadwal</Typography>
                                <TextField
                                    name="exclusionTitle"
                                    sx={{
                                        '& .MuiInputBase-root': {
                                            borderRadius: '8px',
                                        },
                                    }}
                                    placeholder='Masukkan judul jadwal'
                                    value={newExclusion.exclusionTitle}
                                    onChange={handleChangeExclusionField}
                                />
                                <Box
                                    borderRadius={'16px'}
                                    padding={2}
                                    border={'1px solid #C5C5D3'}
                                    display="flex"
                                    gap={2}
                                    flexDirection={'row'}
                                    alignItems={'center'}
                                    justifyContent={'space-between'}
                                >
                                    <Typography fontSize={'16px'} fontWeight={600} lineHeight={'18px'}>Jam</Typography>
                                    <Box display="flex" gap={2} flexDirection={'row'}>
                                        <DropdownListTime
                                            placeholder='Jam mulai'
                                            loading={false}
                                            options={jamOperasional}
                                            onChange={(value) => handleExclusionChange('exclusionTimeStart', value)}
                                        />
                                        <DropdownListTime
                                            placeholder='Jam selesai'
                                            loading={false}
                                            options={jamOperasional}
                                            onChange={(value) => handleExclusionChange('exclusionTimeEnd', value)}
                                        />
                                    </Box>
                                </Box>
                                <Box
                                    display="flex"
                                    gap={2}
                                    flexDirection={'column'}
                                    border={'1px solid #C5C5D3'}
                                    borderRadius={'16px'}
                                    padding={2}
                                >
                                    <Typography fontSize={'16px'} fontWeight={600} lineHeight={'18px'}>Tanggal</Typography>
                                    <Box display={'flex'} flexDirection={'row'} gap={2}>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <Box>
                                                <Typography>Mulai</Typography>
                                                <DatePicker
                                                    name="exclusionDateStart"
                                                    slots={{ textField: TextField }}
                                                    slotProps={{
                                                        textField: {
                                                            fullWidth: true,
                                                            margin: 'normal',
                                                        },
                                                    }}
                                                    value={newExclusion.exclusionDateStart ? dayjs(newExclusion.exclusionDateStart) : null}
                                                    onChange={(newValue) => {
                                                        setNewExclusion({
                                                            ...newExclusion,
                                                            exclusionDateStart: newValue ? newValue.format('YYYY-MM-DD') : ''
                                                        });
                                                    }}
                                                />
                                            </Box>
                                            <Typography>-</Typography>
                                            <Box>
                                                <Typography>Selesai</Typography>
                                                <DatePicker
                                                    name="exclusionDateEnd"
                                                    slots={{ textField: TextField }}
                                                    slotProps={{
                                                        textField: {
                                                            fullWidth: true,
                                                            margin: 'normal',
                                                        },
                                                    }}
                                                    value={newExclusion.exclusionDateEnd ? dayjs(newExclusion.exclusionDateEnd) : null}
                                                    onChange={(newValue) => {
                                                        setNewExclusion({
                                                            ...newExclusion,
                                                            exclusionDateEnd: newValue ? newValue.format('YYYY-MM-DD') : ''
                                                        });
                                                    }}
                                                />
                                            </Box>
                                        </LocalizationProvider>
                                    </Box>
                                </Box>
                                <TextField
                                    name="exclusionNotes"
                                    placeholder="Masukkan catatan"
                                    multiline
                                    rows={4}
                                    fullWidth
                                    sx={{
                                        '& .MuiInputBase-root': {
                                            borderRadius: '16px',
                                        },
                                    }}
                                    value={newExclusion.exclusionNotes}
                                    onChange={handleChangeExclusionField}
                                />
                                {errorExclusion && <Alert severity="error">{errorExclusion}</Alert>}
                            </Box>
                        </DialogContent>
                        <DialogActions>
                            <Button
                                onClick={handleAddExclusion}
                                fullWidth
                                sx={{
                                    padding: 1,
                                    mb: '1%',
                                    bgcolor: '#8F85F3',
                                    color: 'white',
                                    borderRadius: '8px'
                                }}
                            >
                                Tambah
                            </Button>
                        </DialogActions>
                    </StyledDialog>
                </StyledContainer>
            </Box>
        </>
    );

});

export default TestKalender;
