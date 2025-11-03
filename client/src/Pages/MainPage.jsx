import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./MainPage.css";

export default function MainPage() {
  const navigate = useNavigate();

  // 👉 EZT ADD HOZZÁ
  useEffect(() => {
    document.body.classList.add("has-hero");
    return () => document.body.classList.remove("has-hero");
  }, []);

  return (
    <>
      {/* Videó teljes szélességben */}
      <div className="video-hero">
        <video autoPlay loop muted playsInline>
          <source src="/videos/bg.mp4" type="video/mp4" />
          A böngésződ nem támogatja a videó lejátszását.
        </video>
      </div>

      <div className="MainPage">
        <div className="about_us">
          <h4>Rólunk</h4>
          <p>
            A sportfogadás számunkra nem csupán hobbi, hanem évek óta tartó
            szenvedély és hivatás. Tapasztalatainkat és tudásunkat folyamatosan
            bővítjük, hogy mindig a legfrissebb információkkal és legpontosabb
            elemzésekkel segítsünk téged a fogadásokban.
            <br />
            <br />
            Célunk egyszerű: olyan tippeket adni, amelyek valóban értéket
            képviselnek. Nálunk nem a szerencsén, hanem a statisztikákon, a
            szakértelmen és a gondos előkészítésen van a hangsúly. Hiszünk abban,
            hogy a sikeres sportfogadás alapja a tudatos döntés, és mi azért
            dolgozunk, hogy ebben minden nap támogatást nyújtsunk.
            <br />
            <br />
            Közösségünkben csakis „tuti tippek” kapnak helyet – semmi felesleges
            kockázat, semmi üres ígéret. Ha velünk tartasz, biztos lehetsz benne,
            hogy minden információ mögött komoly kutatómunka, sportismeret és
            hosszú évek tapasztalata áll.
          </p>
          <button
            type="button"
            className="register_now"
            onClick={() => navigate("/registration")}
          >
            Regisztrálj most
          </button>
        </div>

        <div className="attention">
          <h3>NAGYON FONTOS!</h3>
          <p>
            A sportfogadás szerencsejátéknak minősül, amelyben a hatályos magyar
            jogszabályok szerint 18 éven aluliak nem vehetnek részt. A Tipp K.O.
            nem minősül szerencsejáték-szervezőnek, és nem ösztönöz senkit
            annak gyakorlására.
          </p>
        </div>
      </div>
    </>
  );
}
