import { FunctionComponent, useEffect, useRef } from "react";
import ResultsElement from "./resultsElement";
import SearchResults_T from "./resultsType";

import styles from "./searchResults.module.css";

interface Props {
  searchResults: Array<SearchResults_T>;
}

const SearchResults: FunctionComponent<Props> = ({ searchResults }) => {

  return (
    <div className={styles.centerContainer}>
      <div className={styles.resultsContainer}>
        {searchResults.map((element, index) => (
          <ResultsElement data={element} key={element.id}/>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
