import React, { useState, useEffect } from "react";
import axios from "axios";
// import { useNavigate } from "react-router-dom";
import { FacilityServices, FacilityDataItem } from "../../../services/ManageFacility/FacilityServices";
import { Schedule } from "@mui/icons-material";

export interface BuildingDataItem {
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
    content: BuildingDataItem[];
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

export default function useTableFasilitas(fetchDatas: () => void, onSuccessDelete: () => void) {
  const [page, setPage] = useState(1);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [open, setOpen] = useState<boolean>(false);
  const [datas, setDatas] = useState<FacilityDataItem[]>([]);
  const [deletedItems, setDeletedItems] = useState("");
  const [dataIdBuilding, setDataIdBuilding] = useState<string[]>([]);
  const [buildings, setBuildings] = useState<string[]>([]);

//   const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const result = await FacilityServices();
      setDatas(result);
      
      const buildingIds = result.map((data) => data.masterBuildingId);
      setDataIdBuilding(buildingIds);
    } catch (error) {
      console.error("Failed to fetch data from API: ", error);
    }
  };

  
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const fetchBuildings = async () => {
      try {
        const responses = await Promise.all(
          dataIdBuilding.map((id) =>
            axios
              .get(`https://hms.3dolphinsocial.com:8083/v1/manage/building/${id}`)
              .catch(() => ({ data: { data: { name: "Data Gedung Tidak Ditemukan" } } }))
          )
        );

        const facilitiesData = responses.map((response) => {
          const name = response.data.data.name;
          return name || "Data Gedung Tidak Tercatat";
        });

        setBuildings(facilitiesData);
      } catch (err) {
        console.error("Error:", err);
      }
    };

    if (dataIdBuilding.length > 0) {
      fetchBuildings();
    }
  }, [dataIdBuilding]);

  const handleChangePage = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const rowsPerPage = 10;
  const displayedData = datas.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  const urutkan = [
    { value: 1, label: "Biaya penanganan tertinggi" },
    { value: 2, label: "Biaya penanganan terendah" },
    { value: 3, label: "Nama fasilitas A-Z" },
    { value: 4, label: "Nama fasilitas Z-A" },
  ];

  const toggleCollapse = () => {
    setIsCollapsed((prev) => !prev);
  };

  const confirmationDelete = (event: React.MouseEvent<HTMLAnchorElement>, buildingId: string) => {
    event.preventDefault();
    setDeletedItems(buildingId);
    setOpen(true);
  };

  
  const handleDeleteSuccess = () => {
    onSuccessDelete();
    fetchData();
    fetchDatas();
  };

  return {
    page,
    isCollapsed,
    open,
    datas,
    deletedItems,
    dataIdBuilding,
    buildings,
    fetchData,
    toggleCollapse,
    handleChangePage,
    rowsPerPage,
    displayedData,
    urutkan,
    confirmationDelete,
    handleDeleteSuccess,
    setOpen,
    Schedule
    
  };
}
