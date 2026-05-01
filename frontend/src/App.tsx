import { Route, Routes, Navigate } from "react-router";
import HomePage from "./pages/HomePage/HomePage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import MatchPage from "./pages/MatchPage/MatchPage";
import { NavBar } from "./components/navbar";

const App = () => {
  return (
    <Routes>
      
      <Route element={<NavBar />}>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route
          path="/home"
          element={
            <HomePage />
          }
        />

        <Route
          path="/matches"
          element={
            <MatchPage />
          }
        />

        <Route
          path="/profile"
          element={
            <ProfilePage />
          }
        />
      </Route>
    </Routes>
  );
};


export default App
