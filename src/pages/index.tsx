import { Link } from "react-router-dom";
import { Book, getBooks } from "../lib/assets";
import styles from "./index.module.less";
import { useEffect, useState } from "react";
import { DotLoading, Toast } from "antd-mobile";

const Index = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    setIsLoading(true);
    getBooks()
      .then((data) => {
        setBooks(data);
      })
      .catch((err) => {
        console.error(err)
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
          <DotLoading className={styles.loading} />
        </>
      ) : (
        <ul>
          {books.map((book) => {
            return (
              <li key={book.index + book.name}>
                <Link style={{ color: "#fff" }} to={"/book?id=" + book.index}>
                  {book.name}
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
