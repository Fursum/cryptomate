import { useRouter } from "next/router";
import { FunctionComponent, useState } from "react";
import styles from "./searchBar.module.css";

const SearchBar: FunctionComponent = () => {
  const [value, setValue] = useState("");
  const router = useRouter();

  const search = (event: any) => {
    event.preventDefault();
    router.push(`/search/${value}`);
    setValue("");
  };

  const handleChange = (event: { target: HTMLInputElement }) => {
    setValue(event.target.value);
  };

  return (
    <div className={styles.searchInput}>
      <form onSubmit={search}>
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
    </div>
  );
};

export default SearchBar;
