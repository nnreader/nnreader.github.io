// generate by iconfont-componentized

import React, { memo } from 'react';

import IconFontGengduo from "./IconFontGengduo";
import IconFontShezhi from "./IconFontShezhi";
import IconFontLiangdu from "./IconFontLiangdu";
import IconFontMulu from "./IconFontMulu";
import IconFontYejianmoshi from "./IconFontYejianmoshi";

export { IconFontGengduo };
export { IconFontShezhi };
export { IconFontLiangdu };
export { IconFontMulu };
export { IconFontYejianmoshi };

export const names = ["gengduo","shezhi","liangdu","mulu","yejianmoshi"];

function IconFont(props) {
    switch (props.name) {
        case 'gengduo': return <IconFontGengduo {...props} />;
        case 'shezhi': return <IconFontShezhi {...props} />;
        case 'liangdu': return <IconFontLiangdu {...props} />;
        case 'mulu': return <IconFontMulu {...props} />;
        case 'yejianmoshi': return <IconFontYejianmoshi {...props} />;
        default:
            throw new Error(`IconFont's name must one of ${JSON.stringify(names)} but got "${props.name}"`)
    }
}

IconFont.defaultProps = {
    size: 24
}

export default memo(IconFont)