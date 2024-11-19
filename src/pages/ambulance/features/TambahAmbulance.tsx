import { Container, Box } from '@mui/system'
import { Typography, Button } from '@mui/material'
import BreadCrumbs from '../../../components/medium/BreadCrumbs'
import ImageUploaderGroup from '../../../components/medium/ImageUploaderGroup'
import CustomTimePicker from '../../../components/small/CustomTimePicker'
import DropdownList from '../../../components/small/DropdownList'
import InputCurrencyIdr from '../../../components/inputComponent/InputCurrencyIdr'



import 'dayjs/locale/id'


// hooks
import useTambahAmbulance from '../hooks/useTambahAmbulance'

export default function TambahAmbulance() {
  const {
    handleTambahHari,
    handleImageChange,
    breadcrumbItems,
    formik,
    setSelectedDay,
    setStartTime,
    setEndTime,
    startTime,
    endTime
  } = useTambahAmbulance()

  return (
    <>
      <Container sx={{ py: 2 }}>
        <BreadCrumbs breadcrumbItems={breadcrumbItems} onBackClick={() => window.history.back()} />

        <Box mt={3}>
          <Box p={3} sx={{ borderRadius: '24px', bgcolor: '#fff', overflow: 'hidden' }}>
            <Typography fontSize="20px" fontWeight="700">
              Tambah Ambulance
            </Typography>

            <ImageUploaderGroup onChange={handleImageChange} />

            <Box
              component="form"
              noValidate
              autoComplete="off"
              mt={3}
              onSubmit={formik.handleSubmit}
            >
              <Typography sx={{ fontSize: '16px' }}>
                Biaya Tarif<span style={{ color: 'red' }}>*</span>
              </Typography>
              <InputCurrencyIdr
                onChange={value => {
                  formik.setFieldValue('operationalCost', value)
                }}
                defaultValue={0}
              />

              <Box
                display={'flex'}
                flexDirection={'column'}
                border={'1px solid #A8A8BD'}
                borderRadius={'16px'}
                padding={'16px'}
                mt={2}
              >
                <Typography mb={'15px'}>Jam Operasional</Typography>
                <Box
                  display={'flex'}
                  flexDirection={'row'}
                  justifyContent={'space-between'}
                  gap={'32px'}
                >
                  {/* Hari */}
                  <Box display={'flex'} flexDirection={'column'} width={'100%'}>
                    <Typography>Hari</Typography>
                    <DropdownList
                      options={[
                        { value: 1, label: 'Senin' },
                        { value: 2, label: 'Selasa' },
                        { value: 3, label: 'Rabu' },
                        { value: 4, label: 'Kamis' },
                        { value: 5, label: 'Jumat' },
                        { value: 6, label: 'Sabtu' },
                        { value: 7, label: 'Minggu' }
                      ]}
                      placeholder="Pilih hari"
                      onChange={(value: string) => {
                        console.log('Selected value:', value)
                        setSelectedDay(value)
                      }}
                      loading={false}
                    />
                  </Box>

                  {/* Jam Mulai */}
                  <Box display={'flex'} flexDirection={'column'} width={'100%'}>
                    <Typography>Jam mulai</Typography>
                    <CustomTimePicker
                      value={startTime}
                      onChange={newValue => setStartTime(newValue)}
                    />
                  </Box>

                  {/* Jam Selesai */}
                  <Box display={'flex'} flexDirection={'column'} width={'100%'}>
                    <Typography>Jam selesai</Typography>
                    <CustomTimePicker value={endTime} onChange={newValue => setEndTime(newValue)} />
                  </Box>
                </Box>
                <Button
                  fullWidth
                  sx={{
                    mt: 2,
                    bgcolor: 'transparent',
                    color: '#8F85F3',
                    border: '1px solid #8F85F3',
                    ':hover': { bgcolor: '#8F85F3', color: 'white' }
                  }}
                  onClick={handleTambahHari}
                >
                  + Tambah hari
                </Button>
              </Box>

              <Button
                type="submit"
                variant="contained"
                color="inherit"
                sx={{
                  mt: 3,
                  width: '100%',
                  bgcolor: '#8F85F3',
                  color: '#fff',
                  textTransform: 'none',
                  borderRadius: '8px',
                  boxShadow: 'none',
                  ':hover': { bgcolor: '#a098f5', boxShadow: 'none' }
                }}
                disabled={!formik.isValid || !formik.dirty}
              >
                Simpan
              </Button>
            </Box>
          </Box>
        </Box>
      </Container>
    </>
  )
}
