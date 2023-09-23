import { Link } from "react-router-dom";
import { getBooks } from "../lib/assets";
import styles from "./index.module.less";
import { useEffect, useState } from "react";
import { DotLoading, Toast } from "antd-mobile";

const Index = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [books, setBooks] = useState<string[]>([]);

  useEffect(() => {
    setIsLoading(true);
    getBooks()
      .then((data) => {
        setBooks(data);
      })
      .catch((err) => {
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
        <DotLoading className={styles.loading} />
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
