import Background from "@/components/Background";
import CustomCursor from "@/components/CustomCursor";
import Navbar from "@/components/Navbar";
import ViewStage from "@/components/ViewStage";
import MusicPlayer from "@/components/MusicPlayer";
import CatRadialNav from "@/components/CatRadialNav";
import LoadingScreen from "@/components/LoadingScreen";
import KonamiEasterEgg from "@/components/KonamiEasterEgg";
import NavHintToast from "@/components/NavHintToast";
import { ViewProvider } from "@/lib/view";

export default function Home() {
  return (
    <ViewProvider>
      <LoadingScreen />
      <Background />
      <CustomCursor />
      <Navbar />
      <ViewStage />
      <MusicPlayer />
      <CatRadialNav />
      <NavHintToast />
      <KonamiEasterEgg />
    </ViewProvider>
  );
}
