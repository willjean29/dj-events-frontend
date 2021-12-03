import { useRouter } from "next/router";
import React, { useState } from "react";
import styles from "styles/Search.module.css";
function Search() {
  const [term, setTerm] = useState("");
  const router = useRouter();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!term) return;
    router.push(`/events/search?term=${term}`);
  };
  return (
    <div className={styles.search}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search Events"
          value={term}
          onChange={(e) => {
            setTerm(e.target.value);
          }}
        />
      </form>
    </div>
  );
}

export default Search;
