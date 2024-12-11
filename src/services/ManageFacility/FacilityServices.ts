import axios from "axios";

export interface FacilityDataItem {
  id: string;
  name: string;
  description: string;
  additionalInfo: string;
  createdBy: string;
  createdDateTime: number;
  updatedBy: string | null;
  updatedDateTime: number | null;
  deletedBy: string | null;
  deletedDateTime: number | null;
  masterBuildingId: string;
  cost: number;
  images: string[];
  schedules: { id: string; startDateTime: number; endDateTime: number }[];
  operationalSchedule?: string;
}

export interface Pageable {
  pageNumber: number;
  pageSize: number;
  sort: {
    sorted: boolean;
    empty: boolean;
    unsorted: boolean;
  };
  offset: number;
  paged: boolean;
  unpaged: boolean;
}

export interface ApiResponse {
  responseCode: string;
  statusCode: string;
  message: string;
  data: {
    content: FacilityDataItem[];
    pageable: Pageable;
    totalPages: number;
    totalElements: number;
    last: boolean;
    size: number;
    number: number;
    sort: {
      sorted: boolean;
      empty: boolean;
      unsorted: boolean;
    };
    numberOfElements: number;
    first: boolean;
    empty: boolean;
  };
}

const API_URL =
  "https://hms.3dolphinsocial.com:8083/v1/manage/facility/?pageNumber=0&pageSize=10&orderBy=createdDateTime=asc";

export const FacilityServices = async (): Promise<FacilityDataItem[]> => {
  const response = await axios.get<ApiResponse>(API_URL, {
    timeout: 10000
});

  if (response.status === 200) {
    
    response.data.data.content.forEach((item) => {
      

      if (item.schedules.length > 0) {
        const { startDateTime, endDateTime } = item.schedules[0];

        const startDate = new Date(startDateTime * 1000);
        const endDate = new Date(endDateTime * 1000);

        const formatter = new Intl.DateTimeFormat("id-ID", {
          weekday: "long",
        });

        const startDay = formatter.format(startDate);
        const startHours = startDate.getHours().toString().padStart(2, "0");
        const startMinutes = startDate.getMinutes().toString().padStart(2, "0");
        const endHours = endDate.getHours().toString().padStart(2, "0");
        const endMinutes = endDate.getMinutes().toString().padStart(2, "0");

        const operationalSchedule = `${startDay}, ${startHours}:${startMinutes} - ${endHours}:${endMinutes}`;
        item.operationalSchedule = operationalSchedule; // Menyimpan hari dan jam operasional ke item

        console.log("Operational Schedule:", operationalSchedule);
      } else {
        console.log("No schedules available.");
      }

      console.log(
        "Created Date Time:",
        new Date(item.createdDateTime * 1000).toLocaleString()
      );
      console.log("Updated By:", item.updatedBy);
      console.log(
        "Updated Date Time:",
        item.updatedDateTime
          ? new Date(item.updatedDateTime * 1000).toLocaleString()
          : "N/A"
      );
      console.log("Deleted By:", item.deletedBy);
      console.log(
        "Deleted Date Time:",
        item.deletedDateTime
          ? new Date(item.deletedDateTime * 1000).toLocaleString()
          : "N/A"
      );
      console.log("Images:", item.images);
      console.log("----------------------------");
    });

    return response.data.data.content;
  } else {
    throw new Error(`API responded with status: ${response.status}`);
  }
};
