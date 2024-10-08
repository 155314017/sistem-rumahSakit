import { Box, Grid } from "@mui/system";
import { Typography } from "@mui/material";
import SideBar from "../../components/SideBar/SideBar";
import Header from "../../components/medium/Header";
import MediumCard from "../../components/medium/MediumCard";
import CardAdd from "../../components/medium/CardAdd";
import TableAmbulance from "../ambulance/TableAmbulance";

// icon
import MinorCrashIcon from "@mui/icons-material/MinorCrash";
import AddBoxIcon from "@mui/icons-material/AddBox";

export default function Ambulance() {
  return (
    <Box>
      <SideBar />

      <Box p={2} sx={{ marginLeft: "130px" }}>
        <Header />
        <Box>
          <Typography sx={{ fontSize: "32px", fontWeight: "700", py: 5 }}>
            Ambulance
          </Typography>
          <Grid container spacing={3} flex={1} mb={3}>
            <MediumCard
              icon={MinorCrashIcon}
              title="Total Ambulance"
              subtitle="10"
            />
            <CardAdd
              icon={AddBoxIcon}
              title="Tambah Ambulance"
              link="/tambahAmbulance"
            />
          </Grid>

          <TableAmbulance />
        </Box>
      </Box>
    </Box>
  );
}
