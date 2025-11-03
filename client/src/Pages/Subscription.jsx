import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../Components/Modal";
import Loading from "../Loading/Loading";

export default function Subscription() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalMessage, setModalMessage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await fetch("/api/profile", {
          credentials: "include",
        });
        if (!res.ok) {
          setUser(null);
        } else {
          const data = await res.json();
          if (data.success) {
            setUser(data.user);
          }
        }
      } catch (err) {
        console.error("Profile fetch error:", err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, []);

  async function handlePayment(packageName) {
    try {
      const res = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ packageName }),
      });

      const data = await res.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        setModalMessage("Nem sikerült indítani a fizetést.");
      }
    } catch (err) {
      console.error("Payment error:", err);
      setModalMessage("Hiba történt a fizetés indításakor.");
    }
  }

  const packages = [
    {
      title: "Gold Csomag",
      price: "14.990",
      oldPrice: "19.990",
      period: "Havonta",
      features: [
        "Heti 15-20 kidolgozott tipp",
        "Átlagosan napi 2-3 kidolgozott tipp",
        "Alap stratégiai útmutatók",
      ],
    },
    {
      title: "Platina Csomag",
      price: "24.990",
      oldPrice: "29.990",
      period: "Havonta",
      features: [
        "Heti 15-20 kidolgozott tipp",
        "Átlagosan napi 2-3 kidolgozott tipp",
        "Alap stratégiai útmutatók",
        "Nagytétes szerint",
      ],
    },
  ];

  if (loading) return <Loading />;

  return (
    <div className="SubscriptionPage">
      <header className="SubscriptionHeader">
        <h1>Előfizetési Csomagjaink</h1>
        <em>Válaszd a számodra legmegfelelőbb hozzáférést a tartalmakhoz.</em>
      </header>

      <div className="SubscriptionPackages">
        {packages.map((pkg, idx) => (
          <div key={idx} className="SubscriptionCard">
            <h2 className="PackageTitle">{pkg.title}</h2>

            <div className="PackagePrice">
              <p className="CurrentPrice">{pkg.price} Ft</p>
              <s className="OldPrice">{pkg.oldPrice} Ft</s>
            </div>

            <p className="PackagePeriod">{pkg.period}</p>

            <ul className="PackageFeatures">
              {pkg.features.map((feature, i) => (
                <li key={i}>{feature}</li>
              ))}
            </ul>

            <div className="PackageDescription">
              <h3>Hogyan fizethetsz elő?</h3>
              <p>
                Kattints a fizetés gombra, és biztonságosan bankkártyával
                fizethetsz a Stripe rendszeren keresztül.
              </p>
            </div>

            <button
              type="button"
              className="PackageButton"
              onClick={() => {
                if (!user) {
                  setModalMessage("Kérlek jelentkezz be a fizetéshez!");
                } else {
                  handlePayment(pkg.title);
                }
              }}
            >
              Fizetés
            </button>
          </div>
        ))}
      </div>

      <Modal
        message={modalMessage}
        onClose={() => {
          setModalMessage(null);
          if (!user) navigate("/login");
        }}
      />
    </div>
  );
}
