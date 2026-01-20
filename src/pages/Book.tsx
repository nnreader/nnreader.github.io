import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { useScroll, useClickAway } from "ahooks";
import classnames from "classnames";
import { DotLoading } from "antd-mobile";
import { debounce } from "lodash-es";
import prettyBytes from "pretty-bytes";

import { getBookInfo } from "../lib/assets";
import styles from "./Book.module.less";
import { Novel, transformText } from "../novel";
import IconFront from "../components/react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { NavBar } from "antd-mobile";

function Book() {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [novel, setNovel] = useState<Novel | null>(null);
  const scroll = useScroll(document);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [toolbarVisible, setToolbarVisible] = useState(false);
  const [sideBarVisible, setSidebarVisible] = useState(false);
  const [index, setIndex] = useState(searchParams.get("index") ? +searchParams.get("index")! : -1);
  const refSidebar = useRef(null);
  const [scrollHeight, setScrollHeight] = useState(0);
  const [bookName, setBookName] = useState("");
  const [progress, setProgress] = useState<number | void>(undefined);
  const [loaded, setLoaded] = useState(0);
  const [showNextPage, setShowNextPage] = useState(false);
  const titleRef = useRef(document.title);

  const updateShowNextPage = useMemo(() => {
    return debounce(
      (top?: number) => {
        setShowNextPage(top ? top > 100 : false);
      },
      500,
      { maxWait: 1000 }
    );
  }, []);

  useEffect(() => {
    updateShowNextPage(scroll?.top);
  }, [scroll?.top, updateShowNextPage]);

  const updateScrollHeight = useCallback(() => {
    requestAnimationFrame(() => {
      setScrollHeight(document.documentElement.scrollHeight);
    });
  }, []);

  useLayoutEffect(() => {
    updateScrollHeight();
  }, [updateScrollHeight, content]);

  // 点击其他内容时，收起侧边栏
  useClickAway(
    () => {
      if (sideBarVisible) {
        setSidebarVisible(false);
      }
    },
    [refSidebar.current],
    "click"
  );

  const bookId = useMemo(() => {
    return searchParams.get("id") as string;
  }, [searchParams]);

  // 获取章节信息
  useEffect(() => {
    getBookInfo(bookId, (e) => {
      setLoaded(e.loaded);
      if (typeof e.progress === "number") {
        setProgress(parseInt((e.progress * 100).toString()));
      }
    }).then((data) => {
      setBookName(data.info.name);
      setNovel(transformText(data.content));
    });
  }, [bookId]);

  // 显示侧边栏时，聚焦到当前章节
  useEffect(() => {
    if (sideBarVisible) {
      // 显示侧边栏
      const dom = document.querySelector("." + styles.activeSection);

      dom?.scrollIntoView();
    }
  }, [sideBarVisible]);

  const menus = useMemo(() => {
    interface Menu {
      label: string;
      icon: JSX.Element;
      onClick: () => void;
    }

    const arr: Array<Menu> = [
      {
        label: "目录",
        icon: <IconFront name="mulu" color="#fff" />,
        onClick: () => {
          setToolbarVisible(false);
          setSidebarVisible((val) => !val);
        },
      },
      {
        label: "亮度",
        icon: <IconFront name="liangdu" color="#fff" />,
        onClick: () => {},
      },
      {
        label: "夜间模式",
        icon: <IconFront name="yejianmoshi" color="#fff" />,
        onClick: () => {},
      },
      {
        label: "设置",
        icon: <IconFront name="shezhi" color="#fff" />,
        onClick: () => {},
      },
    ];

    return arr;
  }, []);

  // 页面滚动的百分比
  const percent = useMemo(() => {
    const scrollTop = scroll?.top || 0;
    const totalHeight = scrollHeight - window.innerHeight;

    if (totalHeight === 0) {
      return 100;
    }

    const scrollPercentage = parseInt(`${(scrollTop / totalHeight) * 100}`);

    if (Number.isNaN(scrollPercentage)) return 0;

    return scrollPercentage;
  }, [scroll?.top, scrollHeight]);

  // 切换章节时，滚动到顶部
  useEffect(() => {
    if (!novel) return;

    if (index === -1) {
      setTitle("前沿");
      setContent(novel.description ?? "还没有简介");
      return;
    }

    setTitle(novel.sections[index].title);
    setContent(novel.sections[index].content);

    window.scrollTo(0, 0);
  }, [index, novel, novel?.description, novel?.sections]);

  // 是否可以下一章
  const nextable = useMemo(() => {
    if (!novel) return false;
    return index < novel.sections?.length - 1;
  }, [index, novel]);

  // const prevable = useMemo(() => {
  //   if (!novel) return false;
  //   return index > 0;
  // }, [index, novel]);

  // 渲染章节内容
  const params = useMemo(() => {
    if (!bookName && (progress === undefined || progress < 100)) {
      return (
        <>
          <DotLoading className={styles.loading} /> {typeof progress === "number" ? progress + "%" : prettyBytes(loaded)}
        </>
      );
    }

    return content.split("\n").map((v, index) => {
      return <p key={index}>{v.trim().replace(/\s+/g, " ")}</p>;
    });
  }, [bookName, content, loaded, progress]);

  // 上一章
  const prevSection = useCallback(() => {
    setToolbarVisible(false);

    const newIndex = Math.max(index - 1, -1);
    setIndex(newIndex);

    const searchParams = new URLSearchParams(location.search);

    searchParams.set("index", newIndex + "");

    const newSearchParams = searchParams.toString();

    navigate({ pathname: location.pathname, search: newSearchParams });
  }, [index, location.pathname, location.search, navigate]);

  // 下一章
  const nextSection = useCallback(() => {
    if (!novel) return;
    const newIndex = Math.min(index + 1, novel.sections.length - 1);
    setIndex(newIndex);
    setToolbarVisible(false);

    const searchParams = new URLSearchParams(location.search);

    searchParams.set("index", newIndex + "");

    const newSearchParams = searchParams.toString();

    navigate({ pathname: location.pathname, search: newSearchParams });
  }, [index, location.pathname, location.search, navigate, novel]);

  // 点击内容，展开/收起 内容
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onClickContent = useCallback((event: any) => {
    // 获取点击事件的坐标信息
    const clickX = event.clientX; // 点击事件的 X 坐标
    const clickY = event.clientY; // 点击事件的 Y 坐标

    // 获取屏幕中央的坐标
    const screenWidth = window.innerWidth || document.documentElement.clientWidth;
    const screenHeight = window.innerHeight || document.documentElement.clientHeight;
    const centerX = screenWidth / 2;
    const centerY = screenHeight / 2;

    // 设置 Y 轴上下的允许偏移范围
    const offsetY = 80;

    // 判断点击事件是否在屏幕中央并且在 Y 轴上下不超过 offsetY 像素
    if (Math.abs(clickX - centerX) <= offsetY && Math.abs(clickY - centerY) <= offsetY) {
      // 在屏幕中央并且在 Y 轴上下不超过 100px 的位置被点击
      setToolbarVisible((val) => !val);
    } else {
      setToolbarVisible(false);
    }
  }, []);

  // 点击底部状态栏，下一章
  const onClickFooter = useCallback(() => {
    if (percent < 95) return;

    nextSection();
  }, [nextSection, percent]);

  // 下拉刷新下一章
  useEffect(() => {
    function onTouchEnd() {
      const scrollTop = scroll?.top || 0;

      const totalHeight = scrollHeight - window.innerHeight;

      if (totalHeight === 0) {
        return 100;
      }

      const scrollPercentage = parseInt(`${(scrollTop / totalHeight) * 100}`);

      if (scrollPercentage > 100 && showNextPage) {
        requestAnimationFrame(() => {
          nextSection();
        });
      }
    }

    document.addEventListener("touchend", onTouchEnd);

    return () => {
      document.removeEventListener("touchend", onTouchEnd);
    };
  }, [nextSection, scroll?.top, scrollHeight, showNextPage]);

  useEffect(() => {
    document.title = title ? `${title} - ${bookName}` : titleRef.current;

    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      document.title = titleRef.current;
    };
  }, [bookName, title]);

  return (
    <div className={styles.reader}>
      {/* 侧边栏 */}
      <div ref={refSidebar} className={classnames(styles.sidebar, sideBarVisible ? styles.sidebarVisible : undefined)}>
        <h3>{bookName}</h3>
        <ul>
          {novel &&
            novel.sections.map((section, i) => {
              return (
                <li key={i} className={classnames(i === index ? styles.activeSection : undefined)}>
                  <a
                    onClick={(e) => {
                      e.preventDefault();
                      setIndex(i);
                      setSidebarVisible(false);
                    }}
                  >
                    {section.title.trim().replace(/\s+/, " ")}
                  </a>
                </li>
              );
            })}
        </ul>
      </div>

      {/* 标题栏 */}
      <NavBar
        className={styles.header}
        onBack={() => navigate(-1)}
        left={
          <div className={styles.rightIcon}>
            <IconFront style={{ marginRight: 8 }} name="home" color="#fff" onClick={() => navigate("/")} />
          </div>
        }
        right={
          <div className={styles.rightIcon}>
            <IconFront
              style={{ marginRight: 8 }}
              name="mulu"
              color="#fff"
              onClick={(event) => {
                event.stopPropagation();
                setSidebarVisible((val) => !val);
              }}
            />
            <IconFront name="gengduo" color="#fff" onClick={() => setToolbarVisible((val) => !val)} />
          </div>
        }
      >
        <span>{title}</span>
      </NavBar>

      {/* 主题内容 */}
      <div className={styles.content} onClick={onClickContent}>
        {params}
      </div>

      {/* 底部状态栏 */}
      <div className={styles.footer} style={{ visibility: title ? "visible" : "hidden" }} onClick={onClickFooter}>
        <div className={styles.inner} style={{ width: percent + "%" }}></div>
        <div className={styles.text}>{percent}%</div>
        {percent > 95 ? <div className={styles.nextPage}>{nextable ? "点击加载下一章" : "已没有更多"}</div> : null}

        {percent > 100 && nextable && showNextPage ? <div className={styles.scrollNextPage}>松开加载下一章</div> : null}
      </div>

      {/* 工具栏 */}
      <div className={classnames(styles.toolbar, toolbarVisible ? styles.visible : styles.invisible)}>
        <div className={styles.navigator}>
          <div onClick={prevSection}>上一章</div>
          <div>{percent}%</div>
          <div onClick={nextSection}>下一章</div>
        </div>

        <ul>
          {menus.map((menu) => {
            return (
              <li key={menu.label} onClick={menu.onClick}>
                {menu.icon}
                <span>{menu.label}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default Book;
