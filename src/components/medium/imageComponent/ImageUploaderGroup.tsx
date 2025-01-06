import React, { useState, DragEvent, ChangeEvent, useRef } from "react";
import { Box, Typography, CircularProgress, Alert } from "@mui/material";
import { Grid } from "@mui/system";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";

interface ImageDatas {
    image: string | null;
    imageBase64: string;
    type: string;
    name: string;
    loading: boolean;
    error: string;
}

interface ImageUploaderGroupProps {
    onChange: (images: { imageName: string; imageType: string; imageData: string;  }[]) => void;
}

const ImageUploaderGroup: React.FC<ImageUploaderGroupProps> = ({ onChange }) => {
    const [images, setImages] = useState<ImageDatas[]>(
        Array(5).fill({ image: null, imageBase64: "", type: "", name: "", loading: false, error: "" })
    );

    const inputRefs = useRef<HTMLInputElement[]>([]);

    const validateFile = (file: File): boolean => {
        const validTypes = ["image/jpeg", "image/png", "image/svg+xml", "image/gif"];
        return validTypes.includes(file.type);
    };

    const validateDimensions = (file: File, callback: (isValid: boolean) => void) => {
        const img = new Image();
        img.src = URL.createObjectURL(file);

        img.onload = () => {
            callback(img.width <= 8000 && img.height <= 4000);
        };
    };

    const handleFileUpload = (file: File, index: number) => {
        if (validateFile(file)) {
            validateDimensions(file, (isValid) => {
                if (isValid) {
                    const reader = new FileReader();
                    setImages((prevImages) =>
                        prevImages.map((img, i) => i === index ? { ...img, loading: true, error: "" } : img)
                    );

                    reader.onload = () => {
                        setTimeout(() => {
                            const base64 = (reader.result as string).split(",")[1];
                            const updatedImages = images.map((img, i) =>
                                i === index
                                    ? {
                                        ...img,
                                        image: reader.result as string,
                                        imageBase64: base64,
                                        type: file.type,
                                        name: file.name,
                                        loading: false
                                    }
                                    : img
                            );
                            setImages(updatedImages);

                            onChange(updatedImages.map((img) => ({
                                imageData: img.imageBase64,
                                imageType: img.type,
                                imageName: img.name
                            })));
                        }, 2000); // delay 2 detik
                    };

                    reader.readAsDataURL(file);
                } else {
                    setImages((prevImages) =>
                        prevImages.map((img, i) => i === index ? { ...img, error: "Dimensi gambar maksimal adalah 8000x4000 piksel." } : img)
                    );
                }
            });
        } else {
            setImages((prevImages) =>
                prevImages.map((img, i) => i === index ? { ...img, error: "File harus berupa JPG, PNG, SVG, atau GIF." } : img)
            );
        }
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
        const file = e.target.files?.[0];
        if (file) handleFileUpload(file, index);
    };

    const handleBoxClick = (index: number) => {
        if (inputRefs.current[index]) {
            inputRefs.current[index].click();
        }
    };

    const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    const handleDrop = (e: DragEvent<HTMLDivElement>, index: number) => {
        e.preventDefault();
        const file = e.dataTransfer.files?.[0];
        if (file) handleFileUpload(file, index);
    };

    return (
        <>
            <Typography sx={{ fontSize: "16px", fontWeight: 600, mt: 1 }}>Unggah Foto<span style={{ color: "red" }}>*</span></Typography>
            <Typography fontSize={'14px'} mb={1} color='#A8A8BD' >Format foto harus .SVG, .PNG, atau .JPG dan ukuran foto maksimal 4MB.</Typography>
            <Grid container justifyContent="center" alignItems="center" direction="column" spacing={4} maxHeight={'350px'} maxWidth={'100%'} >
                {images.map((imgData, index) => (
                    <Grid key={index}>
                        {imgData.error && (
                            <Alert severity="error" sx={{ mb: 3 }}>
                                {imgData.error}
                            </Alert>
                        )}

                        <Box
                            onClick={() => handleBoxClick(index)}
                            onDragOver={handleDragOver}
                            onDrop={(e) => handleDrop(e, index)}
                            sx={{
                                border: imgData.loading ? "2px dashed #8F85F3" : "2px dashed gray",
                                borderRadius: "12px",
                                textAlign: "center",
                                width: "190px",
                                height: "160px",
                                backgroundColor: "#fafafa",
                                transition: "background-color 0.3s ease",
                                cursor: "pointer",
                                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <input
                                type="file"
                                accept="image/jpeg, image/png, image/svg+xml, image/gif"
                                ref={(el) => (inputRefs.current[index] = el!)}
                                style={{ display: "none" }}
                                onChange={(e) => handleFileChange(e, index)}
                            />
                            {imgData.loading ? (
                                <CircularProgress sx={{ color:'#8F85F3'}} />
                            ) : imgData.image ? (
                                <img
                                    src={imgData.image}
                                    alt={`Uploaded ${index + 1}`}
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "contain",
                                        borderRadius: "8px",
                                    }}
                                />
                            ) : (
                                <Box>
                                    <AddPhotoAlternateOutlinedIcon />
                                    <Typography sx={{ color: "gray", fontSize: "18px" }}>
                                        Foto {index + 1}
                                    </Typography>
                                </Box>
                            )}
                        </Box>
                    </Grid>
                ))}
            </Grid>
        </>
    );
};

export default ImageUploaderGroup;