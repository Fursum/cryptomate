import { FunctionComponent } from "react";
import ResultsElement from "./resultsElement";
import SearchResults_T from "./resultsType";

import styles from "./searchResults.module.css";

interface Props {
  searchResults: Array<SearchResults_T>;
}

const SearchResults: FunctionComponent<Props> = ({ searchResults }) => {
  if (searchResults.length == 0) return <div />;

  return (
    <div className={styles.centerContainer}>
      <div className={styles.resultsContainer}>
        {searchResults.map((element) => (
          <ResultsElement data={element} key={element.id} />
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
