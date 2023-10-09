import { Link } from "react-router-dom";
import { getBooks } from "../lib/assets";
import styles from "./index.module.less";
import { useEffect, useState } from "react";
import { DotLoading, Toast } from "antd-mobile";

const Index = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [books, setBooks] = useState<string[]>([]);
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    setIsLoading(true);
    getBooks(setPercent)
      .then((data) => {
        setBooks(data);
      })
      .catch((err) => {
        // eslint-disable-next-line no-debugger
        debugger;
        Toast.show({
          icon: "fail",
          content: err.message,
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <div className={styles.container}>
      {isLoading ? (
        <>
          <DotLoading className={styles.loading} /> {percent}%
        </>
      ) : (
        <ul>
          {books.map((book) => {
            return (
              <li key={book}>
                <Link style={{ color: "#fff" }} to={"/book?name=" + btoa(encodeURIComponent(book))}>
                  {book}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default Index;
