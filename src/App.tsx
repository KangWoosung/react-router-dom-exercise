import "./App.css";
import Footer from "./layout/footer/Footer";
import NavBar from "./layout/header/NavBar";

function App() {
  return (
    <div className="wrapper grid min-h-[100dvh] grid-rows-[auto-1fr-auto] bg-background ">
      <NavBar />
      <Footer />
    </div>
  );
}

export default App;
