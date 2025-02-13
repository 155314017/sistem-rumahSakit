import { Typography } from '@mui/material'
import { Box, Grid } from '@mui/system'
import AccessibleForwardOutlinedIcon from '@mui/icons-material/AccessibleForwardOutlined';
import HotelOutlinedIcon from '@mui/icons-material/HotelOutlined';
import CardAdd from '../../../components/small/card/CardAdd'
import AddSharpIcon from '@mui/icons-material/AddSharp';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import MediumCard from '../../../components/small/card/MediumCard'
import CardPanggilPasien from '../../../components/small/card/CardPanggilPasien';
import CardPasienTerlewati from '../../../components/small/card/CardPasienTerlewati';
import TableRawatJalan from '../../pasien/pasienRawatJalan/features/TableRawatJalan';
import AlertSuccess from '../../../components/small/alert/AlertSuccess';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function QueueDashboard() {
    const [successSkipPatient, setSuccessSkipPatient] = useState(false);
    const location = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        if (location.state && location.state.successSkip) {
            showTemporarySuccessSkipPatient()
        }
    }, [location.state, navigate])

    const showTemporarySuccessSkipPatient = async () => {
        setSuccessSkipPatient(true)
        await new Promise(resolve => setTimeout(resolve, 3000))
        setSuccessSkipPatient(false)
    }


    return (
        <Box>
            <Box>
                {successSkipPatient && <AlertSuccess label="Pasien Berhasil Dilewati" />}
                <Typography sx={{ fontSize: '32px', fontWeight: '700', mb: 2, mt: 2 }}>Dashboard Antrian</Typography>
                <Grid container justifyContent={'space-between'} flex={1} flexDirection={'row'} width={'100%'} >
                    <Box display={'flex'} flexDirection={'column'} gap={2} width={'49.5%'}>
                        <Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'} maxWidth={'100%'} >
                            <MediumCard
                                icon={ManageAccountsIcon}
                                title={'Total pasien hari ini'}
                                subtitle='100 Orang'
                                width='96%'
                                heigth='200px'
                            />
                            <MediumCard
                                icon={AccessibleForwardOutlinedIcon}
                                title={'Total pasien belum check in'}
                                subtitle={'200 Orang'}
                                width='100%'
                                heigth='200px' />
                        </Box>
                        <CardPanggilPasien />
                    </Box>

                    <Box display={'flex'} flexDirection={'column'} gap={2} width={'49.5%'}>
                        <Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'} maxWidth={'100%'} >
                            <MediumCard
                                icon={HotelOutlinedIcon}
                                title={'Total pasien hari ini'}
                                subtitle='100 Orang'
                                width='96%'
                                heigth='200px'
                            />
                            <CardAdd icon={AddSharpIcon} title="Tambah pasien" link="/tambahRuangan" width='96%'
                                heigth='200px' />
                        </Box>
                        <CardPasienTerlewati />
                    </Box>
                </Grid>
                <Box mt={3} >
                    <TableRawatJalan />
                </Box>

            </Box>
        </Box>
    )
}
