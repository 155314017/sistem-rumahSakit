import { Container, Box } from "@mui/system";

import BreadCrumbs from "../../../components/medium/BreadCrumbs";
import CardIzinAkses from "../../pegawai/features/CardIzinAkses";
import CardBiodataPegawai from "../../pegawai/features/CardBiodataPegawai";
import CardJamPraktek from "../../pegawai/features/CardJamPraktek";
import useDetailDokter from "../hooks/useDetailDokter";

export default function DetailDokter() {
   const {
       breadcrumbItems
   } = useDetailDokter();


    return (
        <Container sx={{ py: 2, minWidth: '90vw' }} >
            <BreadCrumbs
                breadcrumbItems={breadcrumbItems}
                onBackClick={() => window.history.back()}
            />
            <Box sx={{ display: 'flex', flexDirection: 'row', gap: 10 }} >

                <Box mt={3} width={'30%'} display={'flex'} flexDirection={'column'} gap={3} >
                    {/* <CardDetail
                        title="Nama Ruangan"
                        columns={[
                            { id: "nomorRuangan", label: "No. Ruangan" },
                            { id: "namaGedung", label: "Nama Gedung" },
                            { id: "jenisRuangan", label: "Jenis Ruangan" },

                        ]}
                        data={[{ nomorRuangan: "abc1", namaGedung: "Gedung A", jenisRuangan: "VIP" }]}
                        actions={() => (
                            <>
                                <Link underline="hover" sx={{ color: "#8F85F3" }} href="/hapus">
                                    Hapus
                                </Link>
                                <Link underline="hover" sx={{ color: "#8F85F3" }} href="/ubah">
                                    Ubah
                                </Link>
                            </>
                        )}
                    /> */}
                    <CardBiodataPegawai />
                    <CardJamPraktek />
                </Box>
                <Box mt={3} >
                    <CardIzinAkses />
                </Box>

            </Box>
        </Container>
    );
}
