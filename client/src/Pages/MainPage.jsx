import { useNavigate } from "react-router-dom";

export default function MainPage(){
    const navigate = useNavigate();
  return (
    <div className="MainPage">
      <h1>Main Page</h1>
        <div className="about_us">
            <h4>
                Rólunk
            </h4>
            
            <p>
                A sportfogadás számunkra nem csupán hobbi, hanem évek óta tartó szenvedély és hivatás. Tapasztalatainkat és tudásunkat folyamatosan bővítjük, hogy mindig a legfrissebb információkkal és legpontosabb elemzésekkel segítsünk téged a fogadásokban.

Célunk egyszerű: olyan tippeket adni, amelyek valóban értéket képviselnek. Nálunk nem a szerencsén, hanem a statisztikákon, a szakértelmen és a gondos előkészítésen van a hangsúly. Hiszünk abban, hogy a sikeres sportfogadás alapja a tudatos döntés, és mi azért dolgozunk, hogy ebben minden nap támogatást nyújtsunk.

Közösségünkben csakis „tuti tippek” kapnak helyet – semmi felesleges kockázat, semmi üres ígéret. Ha velünk tartasz, biztos lehetsz benne, hogy minden információ mögött komoly kutatómunka, sportismeret és hosszú évek tapasztalata áll.
            </p>
            <button type="button" className="register_now" onClick={() => navigate("/registration")}>
                Regisztralj most
            </button>
        </div>

      <div className="attention"> 
        <h3>
            NAGYON FONTOS!
        </h3>
        <p>
A sportfogadás szerencsejátéknak minősül, amelyben a hatályos magyar jogszabályok szerint 18 éven aluliak nem vehetnek részt. Szolgáltatásainkat kizárólag nagykorú, azaz 18. életévüket betöltött személyek vehetik igénybe.

Fontos hangsúlyozni, hogy jelen vállalkozás nem minősül szerencsejáték-szervezőnek, és nem tartozik sem az Szjtv., sem a 32/2005. (X. 21.) PM rendelet hatálya alá. A Tipp K.O. nem folytat sem engedélyezett, sem tiltott szerencsejáték-szervezési tevékenységet, és nem ösztönöz senkit annak gyakorlására.

A felhasználó tudomásul veszi, hogy minden sportfogadás, amelyhez a szolgáltató információt biztosít, kockázattal jár. Ennek következtében az oldal üzemeltetője sem anyagi, sem egyéb felelősséget nem vállal a közzétett és/vagy értékesített információk felhasználásával kapcsolatban. A oldal által kínált sportfogadási tanácsok megvásárlása nem garantálja a sikeres fogadást.

Felhívjuk a figyelmét arra, hogy a szerencsejáték függőséget okozhat, a túlzott és kontrollálatlan játék pedig káros lehet. Játssz felelősségteljesen!
        </p>
      </div>
    </div>
  );
};
