import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { useScroll, useClickAway } from "ahooks";
import classnames from "classnames";

import { getBookContent } from "../lib/assets";
import styles from "./Book.module.less";
import { Novel, transformText } from "../novel";
import IconFron from "../components/react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

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

  const updateScrollHeight = useCallback(() => {
    requestAnimationFrame(() => {
      setScrollHeight(document.documentElement.scrollHeight);
    });
  }, []);

  useLayoutEffect(() => {
    updateScrollHeight();
  }, [updateScrollHeight, content]);

  useClickAway(
    () => {
      if (sideBarVisible) {
        setSidebarVisible(false);
      }
    },
    [refSidebar.current],
    "click"
  );

  const bookName = useMemo(() => {
    return decodeURIComponent(atob(searchParams.get("name") as string));
  }, [searchParams]);

  useEffect(() => {
    getBookContent(bookName).then((raw) => setNovel(transformText(raw)));
  }, [bookName]);

  const menus = useMemo(() => {
    interface Menu {
      label: string;
      icon: JSX.Element;
      onClick: () => void;
    }

    const arr: Array<Menu> = [
      {
        label: "目录",
        icon: <IconFron name="mulu" color="#fff" />,
        onClick: () => {
          setToolbarVisible(false);
          setSidebarVisible((val) => !val);
        },
      },
      {
        label: "亮度",
        icon: <IconFron name="liangdu" color="#fff" />,
        onClick: () => {},
      },
      {
        label: "夜间模式",
        icon: <IconFron name="yejianmoshi" color="#fff" />,
        onClick: () => {},
      },
      {
        label: "设置",
        icon: <IconFron name="shezhi" color="#fff" />,
        onClick: () => {},
      },
    ];

    return arr;
  }, []);

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

  const params = useMemo(() => {
    return content.split("\n").map((v, index) => {
      return <p key={index}>{v.trim().replace(/\s+/g, " ")}</p>;
    });
  }, [content]);

  const nextable = useMemo(() => {
    if (!novel) return false;
    return index < novel.sections?.length - 1;
  }, [index, novel]);

  const prevSection = useCallback(() => {
    setToolbarVisible(false);

    const newIndex = Math.max(index - 1, -1);
    setIndex(newIndex);

    const searchParams = new URLSearchParams(location.search);

    searchParams.set("index", newIndex + "");

    const newSearchParams = searchParams.toString();

    navigate({ pathname: location.pathname, search: newSearchParams });
  }, [index, location.pathname, location.search, navigate]);

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

  const onClickFooter = useCallback(() => {
    if (percent < 95) return;

    nextSection();
  }, [nextSection, percent]);

  return (
    <div className={styles.reader}>
      {/* 侧边栏 */}
      <div ref={refSidebar} className={classnames(styles.sidebar, sideBarVisible ? styles.sidebarVisible : undefined)}>
        <ul>
          {novel &&
            novel.sections.map((section, i) => {
              return (
                <li key={i} className={classnames(i === index ? styles.activeSection : undefined)}>
                  <a
                    href="javascript: "
                    onClick={() => {
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
      <div className={styles.header}>
        <span>{title}</span>
        <IconFron style={{ marginRight: 4 }} name="mulu" color="#fff" onClick={() => setSidebarVisible((val) => !val)} />
        <IconFron name="gengduo" color="#fff" onClick={() => setToolbarVisible((val) => !val)} />
      </div>

      {/* 主题内容 */}
      <div className={styles.content} onClick={onClickContent}>
        {params}
      </div>

      {/* 底部状态栏 */}
      <div className={styles.footer} onClick={onClickFooter}>
        <div className={styles.inner} style={{ width: percent + "%" }}></div>
        <div className={styles.text}>{percent}%</div>
        {percent > 95 ? <div className={styles.nextPage}>{nextable ? "点击加载下一章" : "已没有更多"}</div> : null}
      </div>

      {/* 工具栏 */}
      <div className={classnames(styles.toolbar, toolbarVisible ? styles.visible : undefined)}>
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