import { Button, Box, Typography } from "@mui/material";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";

interface MicroBreadcrumbProps {
    title: string;
    description: string;
    onBackClick: () => void;
}

export default function BreadCrumbBasic({
    title,
    description,
    onBackClick,
}: MicroBreadcrumbProps) {
    return (
        <Box
            sx={{
                height: "50px",
                bgcolor: "#fff",
                borderRadius: "24px",
                position: "relative",
                overflow: "hidden",
                padding: "24px",
                
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    height: "100%",
                    gap: 2,
                }}
            >
                {/* Tombol Kembali */}
                <Button
                    variant="outlined"
                    color="inherit"
                    sx={{
                        minWidth: "38px",
                        minHeight: "38px",
                        borderRadius: "8px",
                        p: 0,
                        color: "#8F85F3",
                    }}
                    onClick={onBackClick}
                >
                    <ArrowBackIosRoundedIcon sx={{ fontSize: "14px" }} />
                </Button>

                <Box>
                    <Typography sx={{ fontSize: "20px", fontWeight: 600, lineHeight: '22px', color: '#0A0A0D' }}>
                        {title}
                    </Typography>
                    <Typography sx={{ fontSize: "18px", lineHeight: '20px', color: "#747487", mt: 1, fontWeight: 400 }}>
                        {description}
                    </Typography>
                </Box>
            </Box>

            {/* <Box sx={{ position: "absolute", top: 0, right: 0 }}>
                <img src={bgImage} alt="bgImage" style={{ width: "150px", height: "auto" }} />
            </Box> */}
        </Box >
    );
}
