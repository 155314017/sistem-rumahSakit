import axios from 'axios'
import Cookies from 'js-cookie'

export interface AmbulanceDataItem {
  id: string
  number: string
  status: string
  additionalInfo: string
  createdBy: string
  createdDateTime: number
  updatedBy: string | null
  updatedDateTime: number | null
  deletedBy: string | null
  deletedDateTime: number | null
  cost: number
  images: string[]
  schedules: { id: string; startDateTime: number; endDateTime: number }[]
  operationalSchedule?: string
}

export interface Pageable {
  pageNumber: number
  pageSize: number
  sort: {
    sorted: boolean
    empty: boolean
    unsorted: boolean
  }
  offset: number
  paged: boolean
  unpaged: boolean
}

export interface ApiResponse {
  responseCode: string
  statusCode: string
  message: string
  data: {
    content: AmbulanceDataItem[]
    pageable: Pageable
    totalPages: number
    totalElements: number
    last: boolean
    size: number
    number: number
    sort: {
      sorted: boolean
      empty: boolean
      unsorted: boolean
    }
    numberOfElements: number
    first: boolean
    empty: boolean
  }
}

const API_URL = `${import.meta.env.VITE_APP_BACKEND_URL_BASE}/v1/manage/ambulance/`

// Function to create an ambulance service
export const CreateAmbulanceServices = async (data: {
  number: string
  status: string
  cost: number
  additionalInfo: string
  images: { imageName: string; imageType: string; imageData: string }[]
  schedules: { startDateTime: number; endDateTime: number }[]
}): Promise<AmbulanceDataItem[]> => {
  const token = Cookies.get('accessToken')

  if (!token) {
    throw new Error('No access token found.')
  }

  try {
    const response = await axios.post<ApiResponse>(API_URL, data, {
      headers: {
        'Content-Type': 'application/json',
        accessToken: token
      }
    })

    if (response.status === 200) {

      const content = response.data?.data?.content
      if (!content || content.length === 0) {
        console.warn('No ambulance data found in response.')
        return []
      }

      // Process the ambulance data
      const ambulances = content.map((item) => {
        if (item.schedules?.length > 0) {
          const operationalSchedules: string[] = item.schedules.map((schedule) => {
            const startDate = new Date(schedule.startDateTime * 1000)
            const endDate = new Date(schedule.endDateTime * 1000)

            const formatter = new Intl.DateTimeFormat('id-ID', {
              weekday: 'long'
            })

            const startDay = formatter.format(startDate)
            const startHours = startDate.getHours().toString().padStart(2, '0')
            const startMinutes = startDate.getMinutes().toString().padStart(2, '0')
            const endHours = endDate.getHours().toString().padStart(2, '0')
            const endMinutes = endDate.getMinutes().toString().padStart(2, '0')

            return `${startDay}, ${startHours}:${startMinutes} - ${endHours}:${endMinutes}`
          })

          item.operationalSchedule = operationalSchedules.join(' | ')
        } else {
          item.operationalSchedule = 'No schedules available.'
        }

        return item
      })
      return ambulances
    } else {
      throw new Error(`API responded with status: ${response.status}`)
    }
  } catch (error) {
    console.error('Error fetching ambulance services:', error)
    throw error
  }
}
