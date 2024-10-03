import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
// import App from './App';
import LoginPasien from './pages/login/loginPasien/LoginPasien';
import Login from './pages/login/loginPegawai/LoginPages';
import RegisterPasien from './pages/login/loginPasien/RegisterPasien';
import PasienLamaRawatJalanBPJS from './pages/rawatJalan/pasienLama/PasienLamaRawatJalanBPJS';
import PasienLamaRawatJalanUmum from './pages/rawatJalan/pasienLama/PasienLamaRawatJalanUmum';
import Home from './pages';
import PasienBaruRawatJalanUmum from './pages/rawatJalan/pasienBaru/PasienBaruRawatJalanUmum';
import PasienBaruRawatJalanBPJS from './pages/rawatJalan/pasienBaru/PasienBaruRawatJalanBPJS';
import Gedung from '../src/pages/gedung/index';
import Ambulance from './pages/ambulance';
import DetailAmbulance from './pages/ambulance/DetailAmbulance';
import TambahAmbulance from './pages/ambulance/TambahAmbulance';
import DetailGedung from './pages/gedung/DetailGedung';
import TambahGedung from './pages/gedung/TambahGedung';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <Routes>
        {/* Gedung */}
        <Route path="/gedung" element={<Gedung />} />
        <Route path="/detailGedung" element={<DetailGedung />} />
        <Route path="/tambahGedung" element={<TambahGedung/>} />

        {/* Ambulance */}
        <Route path="/ambulance" element={<Ambulance />} />
        <Route path="/detailAmbulance" element={<DetailAmbulance />} />
        <Route path="/tambahAmbulance" element={<TambahAmbulance />} />

        {/* Form Login */}
        <Route path="/" element={<LoginPasien />} />
        <Route path="/login/pegawai" element={<Login />} />
        <Route path="/login/pasien" element={<LoginPasien />} />

        {/* Form Register */}
        <Route path="/register/pasien" element={<RegisterPasien />} />

        {/* Dashboard  */}
        <Route path="/dashboard" element={<Home />} />

        {/* Page Rawat Jalan  */}
        <Route path="/rawatjalan/lama/bpjs" element={<PasienLamaRawatJalanBPJS />} />
        <Route path="/rawatjalan/lama/umum" element={<PasienLamaRawatJalanUmum />} />
        <Route path="/rawatjalan/baru/bpjs" element={<PasienBaruRawatJalanBPJS />} />
        <Route path="/rawatjalan/baru/umum" element={<PasienBaruRawatJalanUmum />}  />
        


        {/* <Route path="/about" element={<About />} /> */}
      </Routes>
    </Router>
  </StrictMode>,
);
