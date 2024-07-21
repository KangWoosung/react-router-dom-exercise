import { Outlet, ScrollRestoration, useNavigation } from "react-router-dom";
import NavBar from "./header/NavBar";
import Footer from "./footer/Footer";
import RootFrame from "./RootFrame";
import LoadingMain from "../components/main/LoadingMain";
import MainFrame from "./main/MainFrame";
import { ThemeProvider } from "@/context/ThemeProvider";
import { AuthProvider } from "@/context/AuthProvider";

const RootLayout = () => {
  const { state } = useNavigation();
  // const state = "loading";
  return (
    <AuthProvider>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <RootFrame>
          <NavBar />
          <ScrollRestoration />
          <MainFrame>
            {state === "loading" ? <LoadingMain /> : <Outlet />}
          </MainFrame>
          <Footer />
        </RootFrame>
      </ThemeProvider>
    </AuthProvider>
  );
};

export default RootLayout;
