import { Link } from "react-router-dom";
import { getBooks } from "../lib/assets";
import styles from "./index.module.less";

const books = await getBooks();

const Index = () => {
  return (
    <div className={styles.container}>
      <ul>
        {books.map((book) => {
          return (
            <li key={book}>
              <Link style={{ color: "#fff" }} to={"/book?name=" + btoa(encodeURIComponent(book)) }>
                {book}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Index;
