import axios from "axios";

export interface DataItem {
  id: string;
  name: string;
  address: string;
  additionalInfo: string;
  createdBy: string;
  createdDateTime: number;
  updatedBy: string | null;
  updatedDateTime: number | null;
  deletedBy: string | null;
  deletedDateTime: number | null;
  images: string[];
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
    content: DataItem[];
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

const API_URL = `${import.meta.env.VITE_APP_BACKEND_URL_BASE}/v1/manage/tenant/?pageNumber=0&pageSize=10&orderBy=createdDateTime=asc`;

export const Tenant = async (): Promise<DataItem[]> => {
  const response = await axios.get<ApiResponse>(API_URL);

  if (response.status === 200) {

    

    return response.data.data.content;
  } else {
    throw new Error(`API responded with status: ${response.status}`);
  }
};
