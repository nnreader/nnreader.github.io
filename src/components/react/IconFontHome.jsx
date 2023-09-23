// generate by iconfont-componentized
import React, { memo, useMemo } from 'react';

function IconFontHome (props) {
    const classNames = useMemo(() => {
        const classNameParts = ['icon-font', 'icon-font-home'];

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
            <path d="M511.803392 48.39424L21.641216 538.556416h154.353664V981.03296h292.347904V664.979456h86.919168v316.055552h292.347904V538.556416h154.355712L511.803392 48.39424z m296.30464 450.658304v442.476544h-213.34016V625.475584h-165.924864v316.055552H215.498752V499.052544h-98.48832l394.79296-394.79296 394.790912 394.79296h-98.486272z" fill="#ffffff" />
        </svg>
    )
}

IconFontHome.displayName = 'IconFontHome';

IconFontHome.defaultProps = {
    size: 24
}

export default memo(IconFontHome)
