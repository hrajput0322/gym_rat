import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./components/Home";
import SearchExercises from "./components/SearchExercises";
import { useState } from "react";
import ExerciseListProvider from "./store/ExerciseStore";

function App() {
  const [selectedTab, setSelectedTab] = useState("Home");
  return (
    <ExerciseListProvider>
      <Navbar selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      {selectedTab==="Home" && <Home setSelectedTab={setSelectedTab} />}
      {selectedTab==="SearchExercises" && <SearchExercises />}
      <Footer />
    </ExerciseListProvider>
  );
}

export default App;
