import { useNavigate } from "react-router-dom";
import { Book, getBooks } from "../lib/assets";
import styles from "./index.module.less";
import { useEffect, useState, useRef, useMemo } from "react";
import { DotLoading, Toast, SearchBar, List } from "antd-mobile";
import { SearchBarRef } from "antd-mobile/es/components/search-bar";
import prettyBytes from "pretty-bytes";

const Index = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [books, setBooks] = useState<Book[]>([]);
  const searchRef = useRef<SearchBarRef>(null);
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    setIsLoading(true);
    getBooks()
      .then((data) => {
        setBooks(data);
      })
      .catch((err) => {
        console.error(err);
        Toast.show({
          icon: "fail",
          content: err.message,
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const filterBooks = useMemo(() => {
    return books.filter((v) => v.name.includes(keyword));
  }, [books, keyword]);

  return (
    <div className={styles.container}>
      {isLoading ? (
        <>
          <DotLoading className={styles.loading} />
        </>
      ) : (
        <>
          <SearchBar
            className={styles.searchContainer}
            ref={searchRef}
            placeholder="请输入内容"
            onChange={(val) => {
              setKeyword(val);
            }}
          />
          <List header="书本列表">
            {filterBooks.map((book) => {
              return (
                <List.Item className={styles.listItem} key={book.index + book.name} onClick={() => navigate("/book?id=" + book.index)} extra={prettyBytes(book.size)}>
                  {book.name}
                </List.Item>
              );
            })}
          </List>
        </>
      )}
    </div>
  );
};

export default Index;
