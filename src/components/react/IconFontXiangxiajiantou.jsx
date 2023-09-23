// generate by iconfont-componentized
import React, { memo, useMemo } from 'react';

function IconFontXiangxiajiantou (props) {
    const classNames = useMemo(() => {
        const classNameParts = ['icon-font', 'icon-font-xiangxiajiantou'];

        if (props.className) {
            classNameParts.push(props.className);
        }

        return classNameParts.join(' ');
    }, [props.className]);

    const styles = useMemo(() => {
        const size = props.size;

        return {
            width: size,
            height: size,
            ...(props.style || {})
        }
    }, [props.size, props.style])

    return (
        <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width={props.size} height={props.size} fill={props.color} {...props} className={classNames} style={styles}>
            <path d="M510.919389 801.24466c-4.403287 0-8.809643-1.282203-12.622482-3.846608L73.471338 511.923252c-10.370185-6.971785-13.130042-21.032012-6.158257-31.406291 6.971785-10.375302 21.032012-13.135158 31.406291-6.163373l412.200016 276.993638 412.19797-276.993638c10.370185-6.971785 24.429389-4.217045 31.406291 6.163373 6.971785 10.374278 4.211928 24.434505-6.161327 31.406291L523.535731 797.398052C519.722892 799.963481 515.320629 801.24466 510.919389 801.24466L510.919389 801.24466zM510.919389 547.405371c-4.403287 0-8.809643-1.283226-12.622482-3.846608L73.471338 258.081916c-10.370185-6.971785-13.130042-21.030989-6.158257-31.406291 6.971785-10.379395 21.032012-13.133112 31.406291-6.161327l412.200016 276.992615 412.19797-276.992615c10.370185-6.976902 24.429389-4.211928 31.406291 6.161327 6.971785 10.375302 4.211928 24.434505-6.161327 31.406291L523.535731 543.558763C519.722892 546.122145 515.320629 547.405371 510.919389 547.405371L510.919389 547.405371zM510.919389 547.405371" fill="#ffffff" />
        </svg>
    )
}

IconFontXiangxiajiantou.displayName = 'IconFontXiangxiajiantou';

IconFontXiangxiajiantou.defaultProps = {
    size: 24
}

export default memo(IconFontXiangxiajiantou)
