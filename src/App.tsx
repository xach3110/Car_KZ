import { useState } from "react";
import "./App.css";

import Header from "./components/Header";
import CarFirst from "./components/CarFirst";
import CarList from "./components/CarLists_Comp";
import CarList_delivered from "./components/CardList_delivered";
import HowWeWork from "./components/HowWeWork";
import HeroBanner from "./components/HeroBanner";
import VideoReviews from "./components/VideoRewiev";
import CalculationForm from "./components/CalculatedCar";
import MyTeam from "./components/MyTeam";
import InfoSection from "./components/InfoSection";
import Partner from "./components/PartnerSection";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";
import SlidingModal from "./components/SlidingModal";

function App() {
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <>
      <Header />
      <CarFirst />
      <CarList />
      <CarList_delivered />
      <HowWeWork />
      <HeroBanner onOpenModal={() => setModalOpen(true)} />
      <VideoReviews />
      <CalculationForm />
      <InfoSection onOpenModal={() => setModalOpen(true)}/>
      <MyTeam />
      <Partner />
      <FAQ />
      <Footer />

      {/* Глобальное модальное окно */}
      <SlidingModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}

export default App;
