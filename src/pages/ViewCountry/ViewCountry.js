import { useParams } from "react-router";
import ViewCss from "./View.module.css";
import axios from "axios";
import { useEffect, useState } from "react";

function ViewCountry() {
  const { countryName } = useParams();
  const [collection, setCollection] = useState([]);
  console.log(countryName);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const data = await axios
        .get(`https://restcountries.com/v3.1/name/${countryName}`)
        .then((response) => response.data);

      console.log(data);
      setCollection(data);
    };

    fetchData();
    setLoading(true);
  }, []);

  return (
    <div>
      {loading ? (
        <div className={ViewCss.container}>
          <div className={ViewCss.info}>
            <img src={collection[0]?.flags?.svg} alt="" />
            <div className={ViewCss.name}>
              <h1> {collection[0]?.name?.common}</h1>
              <span> {collection[0]?.name?.official}</span>
            </div>

            <div className={ViewCss.content}>
              <div className={ViewCss.numbers}>
                <span>
                  Population <span className={ViewCss.arrow}>:</span>
                </span>
                <span> {collection[0]?.population}</span>
              </div>

              <div className={ViewCss.numbers}>
                <span className={ViewCss.area}>
                  Area(km<sup>2</sup>) <span className={ViewCss.arrow}>:</span>
                </span>
                <span> {collection[0]?.area}</span>
              </div>
            </div>
          </div>

          <div className={ViewCss.details}>
            <div className={ViewCss.group}>
              <span>Capital</span>
              <span> {collection[0]?.capital}</span>
            </div>

            <div className={ViewCss.group}>
              <span>Subregion</span>
              <span> {collection[0]?.subregion}</span>
            </div>

            <div className={ViewCss.group}>
              <span>Time Zones</span>
              <span>
                {collection[0]?.timezones ? collection[0]?.timezones[0] : "N/A"}
              </span>
            </div>

            <div className={ViewCss.group}>
              <span>Region</span>
              <span> {collection[0]?.region}</span>
            </div>

            <div className={ViewCss.group}>
              <span>Continents</span>
              <span> {collection[0]?.continents}</span>
            </div>
          </div>
        </div>
      ) : (
        <span className={ViewCss.loader}></span>
      )}
    </div>
  );
}

export default ViewCountry;
