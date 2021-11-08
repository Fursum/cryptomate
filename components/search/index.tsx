import { useRouter } from "next/router";
import { FunctionComponent, useState, useEffect } from "react";
import styles from "./searchBar.module.css";
import SearchResults from "./searchResults";

const SearchBar: FunctionComponent = () => {
  const [value, setValue] = useState("");
  const [searchData, setSearchData] = useState([]);
  const router = useRouter();

  useEffect(() => {
    router.events.on("routeChangeComplete", () => {
      setSearchData([]);
      setValue("");
    });
  }, [router.events]);

  const handleSubmit = (event: any) => {
    event.preventDefault();
    setValue("");
  };

  const handleChange = async (event: { target: HTMLInputElement }) => {
    if (event.target.value)
      fetch(`/api/search/${event.target.value.replace("/", "")}`)
        .then((res) => res.json().then((data) => setSearchData(data.results)))
        .catch((err) => {
          setSearchData([]);
        });
    else setSearchData([]);

    setValue(event.target.value);
  };

  return (
    <div className={styles.searchInput}>
      <form onSubmit={handleSubmit}>
        <label htmlFor="searchBar">
          <span className={styles.hidden}>Search cryptocurrency</span>
        </label>
        <input
          value={value}
          maxLength={12}
          type="text"
          placeholder="Search"
          onChange={handleChange}
          required
        />
      </form>
      {searchData ? <SearchResults searchResults={searchData} /> : ""}
    </div>
  );
};

export default SearchBar;
