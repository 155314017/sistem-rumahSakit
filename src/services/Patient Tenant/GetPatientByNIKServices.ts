import axios from 'axios'

interface PatientData {
  id: string
  identityNumber: string
  fullName: string
  birthDateAndPlace: string
  phoneNumber: string
  email: string
  gender: string
  address: string
}

interface PatientResponse {
  responseCode: string
  statusCode: string
  message: string
  data: PatientData
}

const baseUrl = 'https://hms.3dolphinsocial.com:8083'

const GetPatientByNIKServices = async (nik: string): Promise<PatientResponse | null> => {
  try {
    const response = await axios.get<PatientResponse>(`${baseUrl}/v1/manage/patient/get/${nik}`)
    console.log('TES RESPONSE: ', response)
    if (response.status === 200) {
      return response.data
    } else {
      throw new Error(`API responded with status: ${response.status}`)
    }
  } catch (error) {
    console.error('Error fetching Patient data:', error)
    throw error
  }
}

export default GetPatientByNIKServices
