import { Box, CircularProgress, Stack, Typography } from '@mui/material'
import Grid from '@mui/material/Grid2'
import MediumCard from '../../../components/small/card/MediumCard'

// icon
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom'
import BedIcon from '@mui/icons-material/Bed'
import PeopleIcon from '@mui/icons-material/People'
import LocalHospitalIcon from '@mui/icons-material/LocalHospital'
import CardAdd from '../../../components/small/card/CardAdd'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import RoomPreferencesIcon from '@mui/icons-material/RoomPreferences'
import MedicalServicesIcon from '@mui/icons-material/MedicalServices'
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart'

// table
import TableRuangan from '../../../pages/ruangan/features/TableRuangan'
import TablePegawai from '../../../pages/pegawai/features/TablePegawai'
import TableGedung from '../../../pages/gedung/features/TableGedung'
import TableFasilitas from '../../../pages/fasilitas/features/TableFasilitas'
import TableDokter from '../../../pages/dokter/features/TableDokter'
import TableAmbulance from '../../../pages/ambulance/features/TableAmbulance'
import TableKlinik from '../../../pages/klinik/features/TableKlinik'
import TableKonter from '../../../pages/konter/features/TableKonter'
import TablePasien from '../../../pages/pasien/features/TablePasien'
import AlertSuccess from '../../../components/small/alert/AlertSuccess'





//hooks
import useIndex from "../hooks/useIndex";
export default function Index() {
  const { dataClinic,
    dataRoom,
    dataFacility,
    dataDoctor,
    fetchData,
    successLogin,
    successDeleteBuilding,
    successDeleteRoom,
    successDeleteFacility,
    successDeleteAmbulance,
    successDeleteClinic,
    successDeleteCounter,
    isLoading,
    showTemporarySuccessDeleteRoom,
    showTemporarySuccessDeleteBuilding,
    showTemporarySuccessDeleteFacility,
    showTemporarySuccessDeleteAmbulance,
    showTemporarySuccessDeleteClinic,
    showTemporarySuccessDeleteCounter

  } = useIndex()
  return (
    <Box>
      <Box sx={{ py: 5 }}>
        {successDeleteBuilding && <AlertSuccess label="Success delete Building" />}
        {successDeleteRoom && <AlertSuccess label="Success delete Room" />}
        {successDeleteFacility && <AlertSuccess label="Success delete Facility" />}
        {successDeleteAmbulance && <AlertSuccess label="Success delete Ambulance" />}
        {successDeleteClinic && <AlertSuccess label="Success delete Clinic" />}
        {successDeleteCounter && <AlertSuccess label="Success delete Counter" />}
        {successLogin && <AlertSuccess label="Success Login" />}
        <Typography sx={{ fontSize: '32px', fontWeight: '700' }}>Dashboard</Typography>
      </Box>
      <Grid container spacing={3} flex={1} justifyContent={'space-between'}>
        <MediumCard
          icon={MeetingRoomIcon}
          title="Total Ruangan"
          subtitle={isLoading ? <CircularProgress size={25} sx={{ mt: '10px', color: '#8F85F3' }} /> : dataRoom.length.toString() || '0'}
        />
        <MediumCard
          icon={BedIcon}
          title={'Ruangan tersedia'}
          subtitle={isLoading ? <CircularProgress size={25} sx={{ mt: '10px', color: '#8F85F3' }} /> : dataRoom.length.toString() || '0'}
        />
        <MediumCard icon={PeopleIcon} title={'Total pegawai'} subtitle={'2'} />
        <MediumCard
          icon={LocalHospitalIcon}
          title="Total poliklinik"
          subtitle={isLoading ? <CircularProgress size={25} sx={{ mt: '10px', color: '#8F85F3' }} /> : dataClinic.length.toString() || '0'}
        />
        <MediumCard
          icon={MedicalServicesIcon}
          title="Total dokter"
          subtitle={isLoading ? <CircularProgress size={25} sx={{ mt: '10px', color: '#8F85F3' }} /> : dataDoctor.length.toString() || '0'}
        />
        <MediumCard
          icon={MonitorHeartIcon}
          title="Total fasilitas"
          subtitle={isLoading ? <CircularProgress size={25} sx={{ mt: '10px', color: '#8F85F3' }} /> : dataFacility.length.toString() || '0'}
        />
        <CardAdd icon={RoomPreferencesIcon} title="Tambah ruangan" link="/tambahRuangan" />
        <CardAdd icon={PersonAddIcon} title="Tambah pegawai" link="/tambahPegawai" />
      </Grid>

      <Stack mt={3} spacing={3}>
        <TableGedung fetchDatas={fetchData} onSuccessDelete={showTemporarySuccessDeleteBuilding} />
        <TableRuangan fetchDatas={fetchData} onSuccessDelete={showTemporarySuccessDeleteRoom} />
        <TablePegawai />
        <TableFasilitas
          fetchDatas={fetchData}
          onSuccessDelete={showTemporarySuccessDeleteFacility}
        />
        <TableDokter />
        <TableAmbulance
          fetchDatas={fetchData}
          onSuccessDelete={showTemporarySuccessDeleteAmbulance}
        />
        <TableKlinik fetchDatas={fetchData} onSuccessDelete={showTemporarySuccessDeleteClinic} />
        <TableKonter fetchDatas={fetchData} onSuccessDelete={showTemporarySuccessDeleteCounter} />
        <TablePasien />
      </Stack>
    </Box>

  )
}
