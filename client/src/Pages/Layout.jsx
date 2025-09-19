import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Layout = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState(null);
  const [isSubscriber, setIsSubscriber] = useState(false);

  useEffect(() => {
  async function fetchUser() {
    try {
      const res = await fetch("/api/profile", {
        credentials: "include",
      });
      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          setUserName(data.user.name);
          setIsSubscriber(data.user.subscriber); // itt jön a friss státusz
        } else {
          setUserName(null);
          setIsSubscriber(false);
        }
      }
    } catch (err) {
      console.error("Profile fetch error:", err);
      setUserName(null);
      setIsSubscriber(false);
    }
  }

  fetchUser();
}, []);


  const handleLogout = async () => {
  try {
    await fetch("/api/logout", {
      method: "POST",
      credentials: "include", // fontos, hogy a cookie is törlődjön
    });
  } catch (err) {
    console.error("Logout error:", err);
  }

  localStorage.removeItem("token");
  localStorage.removeItem("userName");
  localStorage.removeItem("subscriber");

  setUserName(null);
  setIsSubscriber(false);

  navigate("/login");
};


  return (
    <div className="Layout">
      <nav>
        <ul>
          <li>
            <button type="button" onClick={() => navigate("/")}>Főoldal</button>
          </li>
          <li>
            <button type="button" onClick={() => navigate("/subscription")}>Feliratkozás</button>
          </li>
          <li>
            <button
              type="button"
              disabled={!isSubscriber}
              id="tip-button"
              onClick={() => navigate("/tips")}
            >
              Tippek
            </button>
          </li>
          {!userName ? (
            <>
              <li>
                <button type="button" onClick={() => navigate("/login")}>Bejelentkezés</button>
              </li>
              <li>
                <button type="button" onClick={() => navigate("/registration")}>Regisztráció</button>
              </li>
            </>
          ) : (
            <>
              <li>Üdv, {userName}</li>
              <li>
                <button type="button" onClick={handleLogout}>Kilépés</button>
              </li>
            </>
          )}
        </ul>
      </nav>
      <Outlet />
    </div>
  );
};

export default Layout;
