import { useEffect, useState } from "react";

export default function Tip() {
  const [timeLeft, setTimeLeft] = useState("");
  
  useEffect(() => {
    let interval;

    async function fetchSubscription() {
      try {
        const res = await fetch("/api/profile", { credentials: "include" });
        const data = await res.json();

        if (data.success && data.user.subscriber && data.user.subscriptionExpires) {
          const endTime = new Date(data.user.subscriptionExpires).getTime();

          // Frissítés másodpercenként
          interval = setInterval(() => {
            const now = Date.now();
            const diff = endTime - now;

            if (diff <= 0) {
              setTimeLeft("Előfizetés lejárt");
              clearInterval(interval);
            } else {
              const days = Math.floor(diff / (1000 * 60 * 60 * 24));
              const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
              const minutes = Math.floor((diff / (1000 * 60)) % 60);
              const seconds = Math.floor((diff / 1000) % 60);
              setTimeLeft(`${days} nap ${hours} óra ${minutes} perc ${seconds} mp`);
            }
          }, 1000);
        } else {
          setTimeLeft("Nincs aktív előfizetés");
        }
      } catch (err) {
        setTimeLeft("Hiba történt az előfizetés lekérdezésekor");
      }
    }

    fetchSubscription();

    return () => clearInterval(interval); // cleanup
  }, []);

  return (
    <div>
      <h1>Tippek</h1>
      <p>Előfizetésed hátralévő ideje: {timeLeft}</p>
    </div>
  );
}
