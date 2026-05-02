import { Route, Routes, Navigate } from "react-router";
import HomePage from "@/pages/HomePage";
import ProfilePage from "@/pages/ProfilePage";
import MatchPage from "@/pages/MatchPage";
import { NavBar } from "@/components/Navbar";
import LoginPage from "@pages/LoginPage/LoginPage";
import SignUpPage from "@/pages/SignUpPage";
import RequireAuth from "@auth/guards/RequireAuth";
import AchievementsPage from "@/pages/AchievementsPage";
import FriendsPage from "@/pages/FriendsPage";
import PersonalDataPage from "@/pages/PersonalDataPage";
import SettingsPage from "@/pages/SettingsPage";
import MatchHistoryPage from "@/pages/MatchHistoryPage";

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />

      <Route
        element={
          <RequireAuth>
            <NavBar />
          </RequireAuth>
        }
      >
        <Route path="/" element={<Navigate to="/home" replace />} />
        
        <Route
          path="/home"
          element={<HomePage />}
        />

        <Route
          path="/matches"
          element={<MatchPage />}
        />

        <Route
          path="/profile"
          element={<ProfilePage />}
        />

        <Route
          path="/personal-data"
          element={<PersonalDataPage />}
        />

        <Route
          path="/friends"
          element={<FriendsPage />}
        />

        <Route
          path="/achievements"
          element={<AchievementsPage />}
        />

        <Route
          path="/match-history"
          element={<MatchHistoryPage />}
        />

        <Route
          path="/settings"
          element={<SettingsPage />}
        />

      </Route>
    </Routes>
  );
};


export default App
