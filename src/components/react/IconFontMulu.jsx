// generate by iconfont-componentized
import React, { memo, useMemo } from 'react';

function IconFontMulu (props) {
    const classNames = useMemo(() => {
        const classNameParts = ['icon-font', 'icon-font-mulu'];

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
            <path d="M106.666667 192a21.333333 21.333333 0 1 0 0 42.666667h85.333333a21.333333 21.333333 0 0 0 0-42.666667H106.666667z m0 298.666667a21.333333 21.333333 0 0 0 0 42.666666h85.333333a21.333333 21.333333 0 0 0 0-42.666666H106.666667z m0 298.666666a21.333333 21.333333 0 0 0 0 42.666667h85.333333a21.333333 21.333333 0 0 0 0-42.666667H106.666667zM320 192a21.333333 21.333333 0 0 0 0 42.666667h597.333333a21.333333 21.333333 0 0 0 0-42.666667H320z m0 298.666667a21.333333 21.333333 0 0 0 0 42.666666h597.333333a21.333333 21.333333 0 0 0 0-42.666666H320z m0 298.666666a21.333333 21.333333 0 0 0 0 42.666667h597.333333a21.333333 21.333333 0 0 0 0-42.666667H320z" fill="#ffffff" />
        </svg>
    )
}

IconFontMulu.displayName = 'IconFontMulu';

IconFontMulu.defaultProps = {
    size: 24
}

export default memo(IconFontMulu)
