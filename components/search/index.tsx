import { useRouter } from "next/router";
import { FunctionComponent, useState, useEffect } from "react";
import styles from "./searchBar.module.css";
import SearchResults from "./searchResults";
import SearchResults_T from "./searchResults/resultsType";

const SearchBar: FunctionComponent = () => {
  const [value, setValue] = useState("");
  const [searchData, setSearchData] = useState(new Array<SearchResults_T>());
  const router = useRouter();

  //Clear search bar when the page changes
  useEffect(() => {
    router.events.on("routeChangeComplete", () => {
      setSearchData([]);
      setValue("");
    });
  }, [router.events]);

  //Submit first result
  const handleSubmit = (event: any) => {
    event.preventDefault();
    if(searchData){
      let searchRoute = `/search/${searchData[0].baseAsset}/${searchData[0].quoteAsset}`
      router.push(searchRoute);
      setValue("");
    }
  };

  //Constlantly update search results
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
