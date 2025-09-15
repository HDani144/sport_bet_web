import { Outlet, useNavigate } from "react-router-dom";

const Layout = () => {
  const navigate = useNavigate();

  return (
    <div className="Layout">
      <nav>
        <ul>
          <li className="grow">
            <button type="button" onClick={() => navigate("/")}>
              Főoldal
            </button>
          </li>
          <li>
            <button type="button" onClick={() => navigate("/create")}>
              Csomagok
            </button>
          </li>
          <li>
            <button type="button" onClick={() => navigate("/company")}>
              Company create
            </button>
          </li>
          <li>
            <button onClick={() => navigate("/login")}>
                Bejelentkezés
            </button>
          </li>
          <li>
            <button onClick={() => navigate("/registration")}>
                Regisztráció
            </button>
          </li>
        </ul>
      </nav>
      <Outlet />
    </div>
  );
};

export default Layout;
