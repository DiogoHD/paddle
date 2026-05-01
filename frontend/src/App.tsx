import { BrowserRouter, Route, Routes } from "react-router";
import HomePage from "./pages/HomePage/HomePage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import MatchPage from "./pages/MatchPage/MatchPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import { NavBar } from "./components/navbar";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={
            <LoginPage />
          }
        />
        <Route element={<NavBar />}>
          <Route
            path="/matches"
            element={
              <MatchPage />
            }
          />

          <Route
            path="/home"
            element={
              <HomePage />
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
    </BrowserRouter>
  );
};


export default App
