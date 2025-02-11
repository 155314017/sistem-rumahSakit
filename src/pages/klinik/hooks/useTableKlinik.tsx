/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { Clinic, ClinicDataItem } from "../../../services/Admin Tenant/ManageClinic/Clinic";
import { useNavigate } from "react-router-dom";
import { GetScheduleByTypeId } from "../../../services/Admin Tenant/ManageSchedule/GetScheduleByTypeIdServices";


export default function useTableKlinik(fetchDatas: () => void, onSuccessDelete: () => void) {
  const [page, setPage] = useState(1);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [open, setOpen] = useState<boolean>(false);
  const [dataClinic, setDataClinic] = useState<ClinicDataItem[]>([]);
  const [deletedItems, setDeletedItems] = useState("");
  const [pageNumber] = useState(0);
  const [pageSize] = useState(100);
  const [sort, setSort] = useState('');
  const [orderBy, setOrderBy] = useState("createdDateTime=asc");

  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, [pageNumber, pageSize, orderBy]);

  useEffect(() => {
    if (sort == "Nama klinik A-Z") {
      setOrderBy('name=asc');
    } else if (sort == "Nama klinik Z-A") {
      setOrderBy('name=desc');
    } else if (sort == "Nomor klinik 1-9") {
      setOrderBy('createdDateTime=asc');
    } else if (sort == "Nomor klinik 9-1") {
      setOrderBy('createdDateTime=desc');
    }
  }, [sort])

  const fetchData = async () => {
    try {
      const result = await Clinic(pageNumber, pageSize, orderBy);
      const allSchedules = [];
      const dataSchedules = [];

      for (let index = 0; index < result.length; index++) {
        const hasil = await GetScheduleByTypeId(result[index].id);

        const schedules = [];
        const formattedSchedules = []; // Array untuk menyimpan jadwal yang sudah diformat

        for (let scheduleIndex = 0; scheduleIndex < hasil.length; scheduleIndex++) {
          const formatTime = (timeArray: string | any[]) => {
            const hours = String(timeArray[0]).padStart(2, '0');
            const minutes = String(timeArray[1]).padStart(2, '0');
            return `${hours}:${minutes}`;
          };

          const startTimeFormatted = formatTime(hasil[scheduleIndex].startTime);
          const endTimeFormatted = formatTime(hasil[scheduleIndex].endTime);
          formattedSchedules.push(`${startTimeFormatted} - ${endTimeFormatted}`);
          schedules.push({
            startTime: startTimeFormatted,
            endTime: endTimeFormatted,
          });
        }
        allSchedules.push({
          id: result[index].id,
          schedules: schedules,
        });

        dataSchedules.push({
          id: result[index].id,
          operationalSchedule: formattedSchedules.join(' / '),
        });
      }

      setDataClinic(result);
    } catch (error) {
      console.error('Failed to fetch data from API: ', error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const confirmationDelete = (event: React.MouseEvent<HTMLAnchorElement>, clinicId: string) => {

    event.preventDefault();
    setDeletedItems(clinicId);
    setOpen(true);
  };


  const handleDeleteSuccess = () => {
    onSuccessDelete();
    fetchDatas();
    fetchData();
  };

  const handleChangePage = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const rowsPerPage = 10;

  const displayedData = dataClinic.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  const urutkan = [
    { value: 1, label: "Nomor klinik 1-9" },
    { value: 2, label: "Nomor klinik 9-1" },
    { value: 3, label: "Nama klinik A-Z" },
    { value: 4, label: "Nama klinik Z-A" },
  ];

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return {
    page,
    isCollapsed,
    open,
    setOpen,
    dataClinic,
    deletedItems,
    confirmationDelete,
    handleDeleteSuccess,
    handleChangePage,
    rowsPerPage,
    displayedData,
    urutkan,
    toggleCollapse,
    navigate,
    setSort,
  }
}
