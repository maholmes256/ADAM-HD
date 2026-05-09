import { useEffect, useState } from 'react';
import { useAuth } from '../firebase/AuthContext';
import AccountScreen from './numberRaiders/AccountScreen';
import LoginScreen from './numberRaiders/LoginScreen';
import StudentDashScreen from './numberRaiders/StudentDashScreen';
import { screenForRole } from './numberRaiders/data';
import STYLES from './numberRaiders/styles';

export default function NumberRaiders({
  initialScreen = "home",
  onStartGame,
}) {
  const { authReady, currentUser, userType, login, logout } = useAuth();
  const [firebaseState, setFirebaseState] = useState({
    loading: false,
    error: null,
    fallback: false,
  });
  const [screen, setScreen] = useState(initialScreen);
  const [ddOpen, setDdOpen] = useState(false);

  useEffect(() => {
    if (!authReady) return;
    if (!userType || !currentUser) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setScreen("home");
      return;
    }

    setScreen((currentScreen) =>
      currentScreen === "home" ? screenForRole(userType) : currentScreen,
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authReady, userType, currentUser?.id, currentUser?.grade]);

  function navigate(nextScreen) {
    if (userType && nextScreen === "home") {
      setScreen(screenForRole(userType));
      setDdOpen(false);
      return;
    }

    if (!userType && nextScreen !== "home") {
      setScreen("home");
      setDdOpen(false);
      return;
    }

    if (nextScreen === "game") {
      if (userType) {
        onStartGame?.();
      } else {
        setScreen("home");
      }
      setDdOpen(false);
      return;
    }

    setScreen(nextScreen === "account" ? "account" : "student");
    setDdOpen(false);
  }

  const SCREENS = ["home", "student", "game"];
  const visibleScreens = !authReady
    ? []
    : userType
      ? SCREENS.filter(
          (s) =>
            s === "game" || s === "student",
        )
      : ["home"];
  const LABELS = {
    home: "HOME",
    student: "STUDENT DASH",
    game: "GAME",
  };
  const activeScreen = !authReady
    ? null
    : userType
      ? screen === "home"
        ? screenForRole(userType)
        : screen === "game" || screen === "account"
          ? screen
          : "student"
      : "home";

  async function handleLogout() {
    await logout();
    setFirebaseState({ loading: false, error: null, fallback: false });
    setScreen("home");
    setDdOpen(false);
  }

  return (
    <>
      <style>{STYLES}</style>
      <div className="game-root">
        <nav className="nav">
          <div className="nav-logo">
            NUMBER RAIDERS
            <small>AN EDUCATIONAL ADVENTURE</small>
          </div>
          <div
            className="flex gap-12"
            style={{ alignItems: "center", position: "relative" }}
          >
            {userType && (
              <span className="px-badge badge-sand" style={{ fontSize: 7 }}>
                STUDENT
              </span>
            )}
            <div style={{ position: "relative" }}>
              <div className="profile-btn" onClick={() => setDdOpen((o) => !o)}>
                {userType ? "HJ" : "?"}
              </div>
              {ddOpen && (
                <div className="dropdown">
                  {!userType ? (
                    <button
                      className="dropdown-item"
                      onClick={() => navigate("home")}
                    >
                      ▶ SIGN IN
                    </button>
                  ) : (
                    <>
                      <button
                        className="dropdown-item"
                        onClick={() => navigate("student")}
                      >
                        ★ DASHBOARD
                      </button>
                      <button className="dropdown-item" onClick={handleLogout}>
                        ✖ SIGN OUT
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </nav>

        <div className="screen-nav">
          {visibleScreens.map((s) => (
            <button
              key={s}
              className={`snav-btn ${activeScreen === s ? "active" : ""}`}
              onClick={() => navigate(s)}
            >
              {LABELS[s]}
            </button>
          ))}
        </div>

        {activeScreen === "home" && <LoginScreen onLogin={login} />}
        {activeScreen === "student" && (
          <StudentDashScreen
            firebaseState={firebaseState}
          />
        )}
        {activeScreen === "account" && (
          <AccountScreen
            onNavigate={navigate}
          />
        )}
      </div>
    </>
  );
}
