
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { GetRoomByIdServices } from "../../../services/Admin Tenant/ManageRoom/GetRoomByIdServices";

type ImageData = {
    imageName: string;
    imageType: string;
    imageData: string;
};

export default function useDetailRuangan() {
    const [name, setName] = useState<string>("");
    const [type, setType] = useState<string>("");
    const [deletedItems, setDeletedItems] = useState("");
    const [open, setOpen] = useState(false);
    const [ids, setIds] = useState("");
    const { id } = useParams();
    const navigate = useNavigate();
    const [largeImage, setLargeImage] = useState<string>("");
    const [smallImage, setSmallImages] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [buildingId, setBuildingId] = useState<string>("")
    const [buildingName, setBuildingName] = useState<string>("")


    const breadcrumbItems = [
        {
            label: "Dashboard",
            href: "/dashboard",
        },
        {
            label: "Ruangan",
            href: "/ruangan",
        },
        {
            label: "Detail Ruangan",
            href: "/detailRuangan",
        },
    ];

    const fetchData = async () => {
        setLoading(true);
        try {
            const token = Cookies.get("accessToken");
            const response = await GetRoomByIdServices(id, token);
            setIds(response.id);
            setName(response.name);
            setType(response.type);
            const imagesData = response.images;
            setBuildingId(response.masterBuildingId);
            const mappedImages = imagesData.map((image: ImageData) => ({
                imageName: image.imageName,
                imageType: image.imageType,
                imageData: `data:${image.imageType};base64,${image.imageData}`,
            }));

            const largeImage = mappedImages[0]?.imageData;
            const smallImages = mappedImages.slice(1).map((img: ImageData) => img.imageData);

            setLargeImage(largeImage);
            setSmallImages(smallImages);
            setLoading(false)
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [id]);


    useEffect(() => {
        const fetchDataBuildings = async () => {
            try {
                const token = Cookies.get("accessToken");
                const response = await axios.get(
                    `https://hms.3dolphinsocial.com:8083/v1/manage/building/${buildingId}`,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            accessToken: `${token}`,
                        }
                    }
                );
                setBuildingName(response.data.data.name)
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchDataBuildings();
    }, [buildingId]);


    const handleDeleteSuccess = () => {
        setOpen(false);
        navigate('/ruangan', { state: { successDelete: true, message: 'Ruangan berhasil dihapus!' } });
    };

    const confirmationDelete = (event: React.MouseEvent<HTMLAnchorElement>, buildingId: string) => {
        event.preventDefault();
        setDeletedItems(buildingId);
        setOpen(true);
    };

    return {
        name,
        type,
        deletedItems,
        open,
        ids,
        largeImage,
        smallImage,
        loading,
        buildingId,
        buildingName,
        breadcrumbItems,
        confirmationDelete,
        handleDeleteSuccess,
        navigate,
        setOpen
    }
        
}
