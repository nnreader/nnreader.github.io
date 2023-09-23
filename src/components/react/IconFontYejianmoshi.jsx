// generate by iconfont-componentized
import React, { memo, useMemo } from 'react';

function IconFontYejianmoshi (props) {
    const classNames = useMemo(() => {
        const classNameParts = ['icon-font', 'icon-font-yejianmoshi'];

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
            <path d="M623.709091 46.545455C826.181818 97.745455 977.454545 283.927273 977.454545 505.018182 977.454545 765.672727 768 977.454545 512 977.454545 267.636364 977.454545 67.490909 786.618182 48.872727 542.254545c-2.327273-2.327273-2.327273-4.654545-2.327272-9.30909 0-16.290909 11.636364-27.927273 27.927272-27.927273 13.963636 0 23.272727 9.309091 27.927273 20.945454 51.2 123.345455 172.218182 209.454545 311.854545 209.454546 186.181818 0 337.454545-153.6 337.454546-344.436364 0-121.018182-60.509091-225.745455-153.6-288.581818-9.309091-4.654545-16.290909-16.290909-16.290909-25.6 0-16.290909 13.963636-30.254545 27.927273-30.254545h13.963636z" fill="#ffffff" />
        </svg>
    )
}

IconFontYejianmoshi.displayName = 'IconFontYejianmoshi';

IconFontYejianmoshi.defaultProps = {
    size: 24
}

export default memo(IconFontYejianmoshi)
