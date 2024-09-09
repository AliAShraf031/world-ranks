import axios from "axios";
import { useEffect, useState } from "react";
import HomeCss from "./Home.module.css";
import { Link } from "react-router-dom";

function Home() {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState();
  const [active, setActive] = useState("All");
  const [filter, setFilter] = useState();
  const [collection, setCollection] = useState([]);
  const [member, setMember] = useState(false);
  const [independent, setIndependent] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const data = await axios
        .get("https://restcountries.com/v3.1/all")
        .then((response) => response.data);

      console.log(data);
      setCollection(data);
      setFilter(data);
    };
    fetchData();
    setLoading(true);
  }, []);

  return (
    <>
      <div className={HomeCss.container}>
        <div className={HomeCss.info}>
          <p>
            Found
            <span style={{ color: "#D2D5DA" }}> {collection.length || 0} </span>
            country
          </p>
          <div className={HomeCss.search}>
            <input
              type="text"
              placeholder="Search by Name, Region, Subregion..."
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="11" cy="11" r="7" stroke="#6C727F" strokeWidth="2" />
              <path
                d="M20 20L17 17"
                stroke="#6C727F"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>
        <div className={HomeCss.content}>
          <div className={HomeCss.left}>
            <div className={HomeCss.group}>
              <span>Sort by</span>
              <select value={sort} onChange={(e) => setSort(e.target.value)}>
                <option>Population</option>
                <option>Name</option>
                <option>Area</option>
              </select>
            </div>
            <div className={HomeCss.group}>
              <span>Region</span>
              <div className={HomeCss.region}>
                <span
                  className={active === "All" ? HomeCss.active : ""}
                  onClick={() => {
                    setActive("All");
                    setCollection(filter);
                  }}
                >
                  All Countries
                </span>
                <span
                  className={active === "Africa" ? HomeCss.active : ""}
                  onClick={() => {
                    setActive("Africa");
                    const filterCountries = filter.filter((country) => {
                      return country.region === "Africa";
                    });
                    setCollection(filterCountries);
                  }}
                >
                  Africa
                </span>
                <span
                  className={active === "Antarctic" ? HomeCss.active : ""}
                  onClick={() => {
                    setActive("Antarctic");
                    const filterCountries = filter.filter((country) => {
                      return country.region === "Antarctic";
                    });
                    setCollection(filterCountries);
                  }}
                >
                  Antarctic
                </span>
                <span
                  className={active === "Americas" ? HomeCss.active : ""}
                  onClick={() => {
                    setActive("Americas");

                    const filterCountries = filter.filter((country) => {
                      return country.region === "Americas";
                    });
                    setCollection(filterCountries);
                  }}
                >
                  Americas
                </span>
                <span
                  className={active === "Asia" ? HomeCss.active : ""}
                  onClick={() => {
                    setActive("Asia");

                    const filterCountries = filter.filter((country) => {
                      return country.region === "Asia";
                    });
                    setCollection(filterCountries);
                  }}
                >
                  Asia
                </span>
                <span
                  className={active === "Europe" ? HomeCss.active : ""}
                  onClick={() => {
                    setActive("Europe");

                    const filterCountries = filter.filter((country) => {
                      return country.region === "Europe";
                    });
                    setCollection(filterCountries);
                  }}
                >
                  Europe
                </span>
                <span
                  className={active === "Oceania" ? HomeCss.active : ""}
                  onClick={() => {
                    setActive("Oceania");

                    const filterCountries = filter.filter((country) => {
                      return country.region === "Oceania";
                    });
                    setCollection(filterCountries);
                  }}
                >
                  Oceania
                </span>
              </div>
            </div>
            <div className={HomeCss.group}>
              <span>Status</span>
              <div className={HomeCss.check}>
                <input
                  type="checkbox"
                  value={member}
                  onChange={() => setMember(!member)}
                />
                <label>Member of the United Nations</label>
              </div>
              <div className={HomeCss.check}>
                <input
                  type="checkbox"
                  onChange={() => setIndependent(!independent)}
                  value={independent}
                />
                <label>Independent</label>
              </div>
            </div>
          </div>
          <div className={HomeCss.right}>
            <table>
              <thead>
                <tr>
                  <th>Flag</th>
                  <th>Name</th>
                  <th>Population</th>
                  <th>
                    Area (Km<sup>2</sup>)
                  </th>
                  <th>Region</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  collection
                    .filter((country) =>
                      country.name.common
                        .toLowerCase()
                        .includes(search.toLowerCase())
                    )
                    .filter((country) => {
                      if (member) {
                        return country.unMember;
                      } else {
                        return country;
                      }
                    })
                    .filter((country) => {
                      if (independent) {
                        return country.independent;
                      } else {
                        return country;
                      }
                    })
                    .map((country) => (
                      <tr key={Math.random()}>
                        <td>
                          <Link to={`view/${country.name.common}`}>
                            <img src={country.flags.svg} alt="" />
                          </Link>
                        </td>
                        <td>{country.name.common}</td>
                        <td>{country.population}</td>
                        <td>{country.area}</td>
                        <td>{country.region}</td>
                      </tr>
                    ))
                ) : (
                  <span className={HomeCss.loader}></span>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
