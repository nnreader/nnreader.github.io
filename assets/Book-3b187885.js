import{r as s,j as c,R as x,u as l3,a as r3,b as u3}from"./index-e03a3c7f.js";import{_ as X,m as f3,w as m3,c as L,g as h3}from"./with-default-props-fd974342.js";var Y=function(e){return typeof e=="function"},d3=!1;const g3=d3;function W(e,n){if(e===n)return!0;for(var i=0;i<e.length;i++)if(!Object.is(e[i],n[i]))return!1;return!0}function S(e){var n=s.useRef(e);return n.current=e,n}var v3=function(e){g3&&(Y(e)||console.error("useUnmount expected parameter is a function, got ".concat(typeof e)));var n=S(e);s.useEffect(function(){return function(){n.current()}},[])};const D=v3;var w3=!!(typeof window<"u"&&window.document&&window.document.createElement);const x3=w3;function b(e,n){if(x3){if(!e)return n;var i;return Y(e)?i=e():"current"in e?i=e.current:i=e,i}}var j3=function(e){return e.every(function(n){var i=b(n);if(!i)return!1;if(i.getRootNode()instanceof ShadowRoot)return!0})},N3=function(e){return e?e.getRootNode():document},z3=function(e){if(!e||!document.getRootNode)return document;var n=Array.isArray(e)?e:[e];return j3(n)?N3(b(n[0])):document};const y3=z3;var b3=function(e){var n=function(i,t,h){var m=s.useRef(!1),o=s.useRef([]),u=s.useRef([]),l=s.useRef();e(function(){var d,z=Array.isArray(h)?h:[h],g=z.map(function(_){return b(_)});if(!m.current){m.current=!0,o.current=g,u.current=t,l.current=i();return}(g.length!==o.current.length||!W(g,o.current)||!W(t,u.current))&&((d=l.current)===null||d===void 0||d.call(l),o.current=g,u.current=t,l.current=i())}),D(function(){var d;(d=l.current)===null||d===void 0||d.call(l),m.current=!1})};return n};const _3=b3;var E3=_3(s.useEffect);const U=E3;function L3(e,n,i){i===void 0&&(i="click");var t=S(e);U(function(){var h=function(u){var l=Array.isArray(n)?n:[n];l.some(function(d){var z=b(d);return!z||z.contains(u.target)})||t.current(u)},m=y3(n),o=Array.isArray(i)?i:[i];return o.forEach(function(u){return m.addEventListener(u,h)}),function(){o.forEach(function(u){return m.removeEventListener(u,h)})}},Array.isArray(i)?i:[i],n)}function M3(e){var n=s.useRef(0),i=X(s.useState(e),2),t=i[0],h=i[1],m=s.useCallback(function(o){cancelAnimationFrame(n.current),n.current=requestAnimationFrame(function(){h(o)})},[]);return D(function(){cancelAnimationFrame(n.current)}),[t,m]}function k3(e,n){n===void 0&&(n=function(){return!0});var i=X(M3(),2),t=i[0],h=i[1],m=S(n);return U(function(){var o=b(e,document);if(o){var u=function(){var l;o===document?document.scrollingElement?l={left:document.scrollingElement.scrollLeft,top:document.scrollingElement.scrollTop}:l={left:Math.max(window.pageXOffset,document.documentElement.scrollLeft,document.body.scrollLeft),top:Math.max(window.pageYOffset,document.documentElement.scrollTop,document.body.scrollTop)}:l={left:o.scrollLeft,top:o.scrollTop},m.current(l)&&h(l)};return u(),o.addEventListener("scroll",u),function(){o.removeEventListener("scroll",u)}}},[],e),t}const S3="_reader_wunqc_1",C3="_sidebar_wunqc_5",F3="_sidebarVisible_wunqc_17",P3="_activeSection_wunqc_26",I3="_header_wunqc_33",R3="_rightIcon_wunqc_46",A3="_content_wunqc_51",$3="_footer_wunqc_67",H3="_text_wunqc_80",B3="_nextPage_wunqc_84",q3="_inner_wunqc_90",O3="_scrollNextPage_wunqc_98",T3="_toolbar_wunqc_109",V3="_invisible_wunqc_117",W3="_visible_wunqc_120",X3="_navigator_wunqc_123",f={reader:S3,sidebar:C3,sidebarVisible:F3,activeSection:P3,header:I3,rightIcon:R3,content:A3,footer:$3,text:H3,nextPage:B3,inner:q3,scrollNextPage:O3,toolbar:T3,invisible:V3,visible:W3,navigator:X3},Y3=e=>/^第\s*[^章]+\s*章/.test(e.trimStart());function D3(e){const n={name:"小说名称",description:"小说描述",sections:[]},i=e.split(`
`);for(;i.length;){const t=i.shift();Y3(t)?n.sections.push({title:t.trim(),content:""}):n.sections.length===0?n.description+=t+`
`:n.sections[n.sections.length-1].content+=t+`
`}return n}function C(e){const n=s.useMemo(()=>{const t=["icon-font","icon-font-home"];return e.className&&t.push(e.className),t.join(" ")},[e.className]),i=s.useMemo(()=>{const t=e.size;return{width:t,height:t,...e.style||{}}},[e.size,e.style]);return c.jsx("svg",{viewBox:"0 0 1024 1024",xmlns:"http://www.w3.org/2000/svg",width:e.size,height:e.size,fill:e.color,...e,className:n,style:i,children:c.jsx("path",{d:"M511.803392 48.39424L21.641216 538.556416h154.353664V981.03296h292.347904V664.979456h86.919168v316.055552h292.347904V538.556416h154.355712L511.803392 48.39424z m296.30464 450.658304v442.476544h-213.34016V625.475584h-165.924864v316.055552H215.498752V499.052544h-98.48832l394.79296-394.79296 394.790912 394.79296h-98.486272z",fill:"#ffffff"})})}C.displayName="IconFontHome";C.defaultProps={size:24};const U3=s.memo(C);function F(e){const n=s.useMemo(()=>{const t=["icon-font","icon-font-xiangxiajiantou"];return e.className&&t.push(e.className),t.join(" ")},[e.className]),i=s.useMemo(()=>{const t=e.size;return{width:t,height:t,...e.style||{}}},[e.size,e.style]);return c.jsx("svg",{viewBox:"0 0 1024 1024",xmlns:"http://www.w3.org/2000/svg",width:e.size,height:e.size,fill:e.color,...e,className:n,style:i,children:c.jsx("path",{d:"M510.919389 801.24466c-4.403287 0-8.809643-1.282203-12.622482-3.846608L73.471338 511.923252c-10.370185-6.971785-13.130042-21.032012-6.158257-31.406291 6.971785-10.375302 21.032012-13.135158 31.406291-6.163373l412.200016 276.993638 412.19797-276.993638c10.370185-6.971785 24.429389-4.217045 31.406291 6.163373 6.971785 10.374278 4.211928 24.434505-6.161327 31.406291L523.535731 797.398052C519.722892 799.963481 515.320629 801.24466 510.919389 801.24466L510.919389 801.24466zM510.919389 547.405371c-4.403287 0-8.809643-1.283226-12.622482-3.846608L73.471338 258.081916c-10.370185-6.971785-13.130042-21.030989-6.158257-31.406291 6.971785-10.379395 21.032012-13.133112 31.406291-6.161327l412.200016 276.992615 412.19797-276.992615c10.370185-6.976902 24.429389-4.211928 31.406291 6.161327 6.971785 10.375302 4.211928 24.434505-6.161327 31.406291L523.535731 543.558763C519.722892 546.122145 515.320629 547.405371 510.919389 547.405371L510.919389 547.405371zM510.919389 547.405371",fill:"#ffffff"})})}F.displayName="IconFontXiangxiajiantou";F.defaultProps={size:24};const Z3=s.memo(F);function P(e){const n=s.useMemo(()=>{const t=["icon-font","icon-font-gengduo"];return e.className&&t.push(e.className),t.join(" ")},[e.className]),i=s.useMemo(()=>{const t=e.size;return{width:t,height:t,...e.style||{}}},[e.size,e.style]);return c.jsxs("svg",{viewBox:"0 0 1024 1024",xmlns:"http://www.w3.org/2000/svg",width:e.size,height:e.size,fill:e.color,...e,className:n,style:i,children:[c.jsx("path",{d:"M288 512m-64 0a64 64 0 1 0 128 0 64 64 0 1 0-128 0Z",fill:"#ffffff"}),c.jsx("path",{d:"M512 512m-64 0a64 64 0 1 0 128 0 64 64 0 1 0-128 0Z",fill:"#ffffff"}),c.jsx("path",{d:"M736 512m-64 0a64 64 0 1 0 128 0 64 64 0 1 0-128 0Z",fill:"#ffffff"})]})}P.displayName="IconFontGengduo";P.defaultProps={size:24};const G3=s.memo(P);function I(e){const n=s.useMemo(()=>{const t=["icon-font","icon-font-shezhi"];return e.className&&t.push(e.className),t.join(" ")},[e.className]),i=s.useMemo(()=>{const t=e.size;return{width:t,height:t,...e.style||{}}},[e.size,e.style]);return c.jsxs("svg",{viewBox:"0 0 1024 1024",xmlns:"http://www.w3.org/2000/svg",width:e.size,height:e.size,fill:e.color,...e,className:n,style:i,children:[c.jsx("path",{d:"M511.913993 607.897867c-52.980346 0-95.983874-43.003528-95.983874-95.983874s43.003528-95.983874 95.983874-95.983874 95.983874 43.003528 95.983874 95.983874S564.894339 607.897867 511.913993 607.897867zM511.913993 479.919368c-17.545439 0-31.994625 14.449185-31.994625 31.994625s14.449185 31.994625 31.994625 31.994625 31.994625-14.449185 31.994625-31.994625S529.631446 479.919368 511.913993 479.919368z",fill:"#ffffff"}),c.jsx("path",{d:"M630.947757 960.010751c-9.976818 0-19.781623-4.816395-25.802117-13.073072L531.695616 846.309424c-13.589115 0.860071-25.974131 0.860071-39.563245 0l-73.450025 100.456241c-7.912649 10.836889-21.673778 15.653284-34.574836 11.868974-34.574836-9.804804-67.429531-23.393919-97.704015-40.251302-11.69696-6.536536-18.061482-19.609609-15.997312-32.854695l19.26558-123.334117c-9.804804-8.77272-19.093566-18.061482-27.866286-27.866286l-123.334117 19.26558c-13.073072 2.064169-26.318159-4.300353-32.854695-15.997312-16.857383-30.446498-30.446498-63.301193-40.251302-97.876029-3.612296-12.901058 1.032085-26.662187 11.868974-34.574836l100.456241-73.450025c-0.516042-6.880564-0.688056-13.417101-0.688056-19.781623s0.172014-12.901058 0.688056-19.781623l-100.456241-73.450025c-10.836889-7.912649-15.653284-21.673778-11.868974-34.574836 9.804804-34.574836 23.393919-67.429531 40.251302-97.704015 6.536536-11.69696 19.781623-18.061482 32.854695-15.997312l123.334117 19.26558c8.77272-9.804804 18.061482-19.093566 27.866286-27.866286l-19.26558-123.334117c-2.064169-13.245087 4.300353-26.318159 16.169326-32.854695 30.446498-16.857383 63.301193-30.446498 97.704015-40.251302 12.901058-3.612296 26.662187 1.032085 34.574836 11.868974l73.450025 100.456241c13.589115-0.860071 25.802117-0.860071 39.563245 0l73.450025-100.456241c7.912649-10.836889 21.673778-15.48127 34.574836-11.868974 34.402822 9.804804 67.257517 23.393919 97.704015 40.251302 11.69696 6.536536 18.061482 19.609609 15.997312 32.854695l-19.26558 123.334117c9.804804 8.77272 19.093566 18.061482 27.866286 27.694272l123.334117-19.26558c13.073072-2.064169 26.318159 4.300353 32.854695 15.997312 16.857383 30.446498 30.446498 63.301193 40.423316 97.876029 3.612296 12.901058-1.032085 26.662187-11.868974 34.574836L846.309424 492.13237c0.516042 6.880564 0.688056 13.417101 0.688056 19.781623 0 6.364522-0.172014 12.901058-0.688056 19.781623l100.456241 73.450025c10.836889 7.912649 15.48127 21.673778 11.868974 34.574836-9.804804 34.574836-23.393919 67.429531-40.423316 97.876029-6.536536 11.69696-19.437594 18.061482-32.854695 15.997312L762.194524 734.500252c-8.600706 9.804804-18.061482 19.093566-27.866286 27.694272l19.26558 123.334117c2.064169 13.245087-4.300353 26.318159-15.997312 32.854695-30.274483 16.857383-63.129179 30.446498-97.704015 40.251302C636.968251 959.494709 634.044011 960.010751 630.947757 960.010751zM337.147657 872.627583c13.933143 6.70855 28.554342 12.729044 43.51957 17.889467l70.525785-96.499916c6.70855-9.288762 18.061482-14.277171 29.414413-12.901058 20.641693 2.408198 42.143457 2.408198 62.613136 0 11.868974-1.376113 22.705863 3.612296 29.414413 12.901058l70.525785 96.499916c14.965228-5.160423 29.586427-11.180917 43.51957-17.889467l-18.40551-118.345708c-1.720141-11.352931 2.752226-22.877877 11.69696-29.930455 16.341341-13.073072 31.306568-27.866286 44.207626-44.207626 7.224593-8.944734 18.40551-13.589115 29.930455-11.69696l118.345708 18.40551c6.70855-13.933143 12.729044-28.554342 17.889467-43.51957l-96.499916-70.525785c-9.288762-6.70855-14.277171-18.061482-12.901058-29.414413 1.204099-10.320847 1.892155-20.641693 1.892155-31.306568s-0.688056-20.985721-1.892155-31.306568c-1.376113-11.352931 3.612296-22.705863 12.901058-29.414413l96.499916-70.525785c-5.160423-14.965228-11.180917-29.586427-17.889467-43.51957l-118.345708 18.40551c-11.352931 1.720141-22.877877-2.752226-29.930455-11.69696-12.901058-16.169326-27.694272-31.134554-44.207626-44.207626-8.944734-7.224593-13.417101-18.577524-11.69696-29.930455L686.852343 151.372417c-13.933143-6.70855-28.554342-12.729044-43.51957-17.889467l-70.525785 96.499916c-6.70855 9.288762-17.717453 14.449185-29.414413 12.901058-20.469679-2.408198-41.971443-2.408198-62.613136 0-11.524945 1.376113-22.705863-3.612296-29.586427-12.901058l-70.525785-96.499916c-14.965228 5.160423-29.586427 11.180917-43.51957 17.889467l18.40551 118.345708c1.720141 11.352931-2.752226 22.877877-11.69696 29.930455-16.341341 12.901058-31.134554 27.866286-44.207626 44.207626-7.224593 8.944734-18.577524 13.417101-29.930455 11.69696L151.372417 337.147657c-6.70855 13.933143-12.729044 28.554342-17.889467 43.51957l96.499916 70.525785c9.288762 6.70855 14.277171 18.061482 12.901058 29.586427-1.204099 10.148833-1.892155 20.641693-1.892155 31.134554 0 10.664875 0.688056 20.985721 1.892155 31.306568 1.376113 11.524945-3.612296 22.705863-12.901058 29.586427l-96.499916 70.525785c5.160423 14.965228 11.180917 29.586427 17.889467 43.51957l118.345708-18.40551c11.352931-1.720141 22.877877 2.752226 29.930455 11.69696 12.901058 16.341341 27.694272 31.134554 44.207626 44.207626 8.944734 7.224593 13.589115 18.577524 11.69696 29.930455L337.147657 872.627583z",fill:"#ffffff"})]})}I.displayName="IconFontShezhi";I.defaultProps={size:24};const J3=s.memo(I);function R(e){const n=s.useMemo(()=>{const t=["icon-font","icon-font-liangdu"];return e.className&&t.push(e.className),t.join(" ")},[e.className]),i=s.useMemo(()=>{const t=e.size;return{width:t,height:t,...e.style||{}}},[e.size,e.style]);return c.jsx("svg",{viewBox:"0 0 1024 1024",xmlns:"http://www.w3.org/2000/svg",width:e.size,height:e.size,fill:e.color,...e,className:n,style:i,children:c.jsx("path",{d:"M512 810.666667c164.949333 0 298.666667-133.717333 298.666667-298.666667s-133.717333-298.666667-298.666667-298.666667-298.666667 133.717333-298.666667 298.666667 133.717333 298.666667 298.666667 298.666667z m0 42.666666c-188.522667 0-341.333333-152.810667-341.333333-341.333333S323.477333 170.666667 512 170.666667s341.333333 152.810667 341.333333 341.333333-152.810667 341.333333-341.333333 341.333333zM64 533.333333a21.333333 21.333333 0 0 1 0-42.666666h42.666667a21.333333 21.333333 0 0 1 0 42.666666H64zM490.666667 64a21.333333 21.333333 0 0 1 42.666666 0v42.666667a21.333333 21.333333 0 0 1-42.666666 0V64z m0 853.333333a21.333333 21.333333 0 0 1 42.666666 0v42.666667a21.333333 21.333333 0 0 1-42.666666 0v-42.666667z m426.666666-384a21.333333 21.333333 0 0 1 0-42.666666h42.666667a21.333333 21.333333 0 0 1 0 42.666666h-42.666667zM180.138667 210.304a21.333333 21.333333 0 0 1 30.165333-30.165333l30.165333 30.165333a21.333333 21.333333 0 1 1-30.165333 30.165333L180.138667 210.304z m633.557333-30.165333a21.333333 21.333333 0 0 1 30.165333 30.165333l-30.165333 30.165333a21.333333 21.333333 0 1 1-30.165333-30.165333l30.165333-30.165333zM210.304 783.530667a21.333333 21.333333 0 1 1 30.165333 30.165333l-30.165333 30.165333a21.333333 21.333333 0 1 1-30.165333-30.165333l30.165333-30.165333z m573.226667 30.165333a21.333333 21.333333 0 1 1 30.165333-30.165333l30.165333 30.165333a21.333333 21.333333 0 0 1-30.165333 30.165333l-30.165333-30.165333z",fill:"#ffffff"})})}R.displayName="IconFontLiangdu";R.defaultProps={size:24};const K3=s.memo(R);function A(e){const n=s.useMemo(()=>{const t=["icon-font","icon-font-mulu"];return e.className&&t.push(e.className),t.join(" ")},[e.className]),i=s.useMemo(()=>{const t=e.size;return{width:t,height:t,...e.style||{}}},[e.size,e.style]);return c.jsx("svg",{viewBox:"0 0 1024 1024",xmlns:"http://www.w3.org/2000/svg",width:e.size,height:e.size,fill:e.color,...e,className:n,style:i,children:c.jsx("path",{d:"M106.666667 192a21.333333 21.333333 0 1 0 0 42.666667h85.333333a21.333333 21.333333 0 0 0 0-42.666667H106.666667z m0 298.666667a21.333333 21.333333 0 0 0 0 42.666666h85.333333a21.333333 21.333333 0 0 0 0-42.666666H106.666667z m0 298.666666a21.333333 21.333333 0 0 0 0 42.666667h85.333333a21.333333 21.333333 0 0 0 0-42.666667H106.666667zM320 192a21.333333 21.333333 0 0 0 0 42.666667h597.333333a21.333333 21.333333 0 0 0 0-42.666667H320z m0 298.666667a21.333333 21.333333 0 0 0 0 42.666666h597.333333a21.333333 21.333333 0 0 0 0-42.666666H320z m0 298.666666a21.333333 21.333333 0 0 0 0 42.666667h597.333333a21.333333 21.333333 0 0 0 0-42.666667H320z",fill:"#ffffff"})})}A.displayName="IconFontMulu";A.defaultProps={size:24};const Q3=s.memo(A);function $(e){const n=s.useMemo(()=>{const t=["icon-font","icon-font-yejianmoshi"];return e.className&&t.push(e.className),t.join(" ")},[e.className]),i=s.useMemo(()=>{const t=e.size;return{width:t,height:t,...e.style||{}}},[e.size,e.style]);return c.jsx("svg",{viewBox:"0 0 1024 1024",xmlns:"http://www.w3.org/2000/svg",width:e.size,height:e.size,fill:e.color,...e,className:n,style:i,children:c.jsx("path",{d:"M623.709091 46.545455C826.181818 97.745455 977.454545 283.927273 977.454545 505.018182 977.454545 765.672727 768 977.454545 512 977.454545 267.636364 977.454545 67.490909 786.618182 48.872727 542.254545c-2.327273-2.327273-2.327273-4.654545-2.327272-9.30909 0-16.290909 11.636364-27.927273 27.927272-27.927273 13.963636 0 23.272727 9.309091 27.927273 20.945454 51.2 123.345455 172.218182 209.454545 311.854545 209.454546 186.181818 0 337.454545-153.6 337.454546-344.436364 0-121.018182-60.509091-225.745455-153.6-288.581818-9.309091-4.654545-16.290909-16.290909-16.290909-25.6 0-16.290909 13.963636-30.254545 27.927273-30.254545h13.963636z",fill:"#ffffff"})})}$.displayName="IconFontYejianmoshi";$.defaultProps={size:24};const p3=s.memo($),e1=["home","xiangxiajiantou","gengduo","shezhi","liangdu","mulu","yejianmoshi"];function Z(e){switch(e.name){case"home":return c.jsx(U3,{...e});case"xiangxiajiantou":return c.jsx(Z3,{...e});case"gengduo":return c.jsx(G3,{...e});case"shezhi":return c.jsx(J3,{...e});case"liangdu":return c.jsx(K3,{...e});case"mulu":return c.jsx(Q3,{...e});case"yejianmoshi":return c.jsx(p3,{...e});default:throw new Error(`IconFont's name must one of ${JSON.stringify(e1)} but got "${e.name}"`)}}Z.defaultProps={size:24};const N=s.memo(Z);function t1(e){return s.createElement("svg",Object.assign({width:"1em",height:"1em",viewBox:"0 0 48 48",xmlns:"http://www.w3.org/2000/svg",xmlnsXlink:"http://www.w3.org/1999/xlink"},e,{style:Object.assign({verticalAlign:"-0.125em"},e.style),className:["antd-mobile-icon",e.className].filter(Boolean).join(" ")}),s.createElement("g",{id:"LeftOutline-LeftOutline",stroke:"none",strokeWidth:1,fill:"none",fillRule:"evenodd"},s.createElement("g",{id:"LeftOutline-编组"},s.createElement("rect",{id:"LeftOutline-矩形",fill:"#FFFFFF",opacity:0,x:0,y:0,width:48,height:48}),s.createElement("path",{d:"M31.7053818,5.11219264 L13.5234393,22.6612572 L13.5234393,22.6612572 C12.969699,23.2125856 12.9371261,24.0863155 13.4257204,24.6755735 L13.5234393,24.7825775 L31.7045714,42.8834676 C31.7795345,42.9580998 31.8810078,43 31.9867879,43 L35.1135102,43 C35.3344241,43 35.5135102,42.8209139 35.5135102,42.6 C35.5135102,42.4936115 35.4711279,42.391606 35.3957362,42.316542 L16.7799842,23.7816937 L16.7799842,23.7816937 L35.3764658,5.6866816 C35.5347957,5.53262122 35.5382568,5.27937888 35.3841964,5.121049 C35.3088921,5.04365775 35.205497,5 35.0975148,5 L31.9831711,5 C31.8795372,5 31.7799483,5.04022164 31.7053818,5.11219264 Z",id:"LeftOutline-路径",fill:"currentColor",fillRule:"nonzero"}))))}const y="adm-nav-bar",n1={backArrow:!0},s1=e=>{const n=f3(n1,e),{back:i,backArrow:t}=n;return m3(n,x.createElement("div",{className:L(y)},x.createElement("div",{className:`${y}-left`,role:"button"},i!==null&&x.createElement("div",{className:`${y}-back`,onClick:n.onBack},t&&x.createElement("span",{className:`${y}-back-arrow`},t===!0?x.createElement(t1,null):t),x.createElement("span",{"aria-hidden":"true"},i)),n.left),x.createElement("div",{className:`${y}-title`},n.children),x.createElement("div",{className:`${y}-right`},n.right)))};function a1(){const e=l3(),n=r3(),[i]=u3(),[t,h]=s.useState(null),m=k3(document),[o,u]=s.useState(""),[l,d]=s.useState(""),[z,g]=s.useState(!1),[_,E]=s.useState(!1),[v,M]=s.useState(i.get("index")?+i.get("index"):-1),H=s.useRef(null),[B,G]=s.useState(0),[J,K]=s.useState(""),q=s.useCallback(()=>{requestAnimationFrame(()=>{G(document.documentElement.scrollHeight)})},[]);s.useLayoutEffect(()=>{q()},[q,l]),L3(()=>{_&&E(!1)},[H.current],"click");const O=s.useMemo(()=>i.get("id"),[i]);s.useEffect(()=>{h3(O).then(a=>{K(a.info.name),h(D3(a.content))})},[O]);const Q=s.useMemo(()=>[{label:"目录",icon:c.jsx(N,{name:"mulu",color:"#fff"}),onClick:()=>{g(!1),E(r=>!r)}},{label:"亮度",icon:c.jsx(N,{name:"liangdu",color:"#fff"}),onClick:()=>{}},{label:"夜间模式",icon:c.jsx(N,{name:"yejianmoshi",color:"#fff"}),onClick:()=>{}},{label:"设置",icon:c.jsx(N,{name:"shezhi",color:"#fff"}),onClick:()=>{}}],[]),j=s.useMemo(()=>{const a=m?.top||0,r=B-window.innerHeight;if(r===0)return 100;const w=parseInt(`${a/r*100}`);return Number.isNaN(w)?0:w},[m?.top,B]);s.useEffect(()=>{if(t){if(v===-1){u("前沿"),d(t.description??"还没有简介");return}u(t.sections[v].title),d(t.sections[v].content),window.scrollTo(0,0)}},[v,t,t?.description,t?.sections]);const T=s.useMemo(()=>t?v<t.sections?.length-1:!1,[v,t]),p=s.useMemo(()=>l.split(`
`).map((a,r)=>c.jsx("p",{children:a.trim().replace(/\s+/g," ")},r)),[l]),e3=s.useCallback(()=>{g(!1);const a=Math.max(v-1,-1);M(a);const r=new URLSearchParams(e.search);r.set("index",a+"");const w=r.toString();n({pathname:e.pathname,search:w})},[v,e.pathname,e.search,n]),k=s.useCallback(()=>{if(!t)return;const a=Math.min(v+1,t.sections.length-1);M(a),g(!1);const r=new URLSearchParams(e.search);r.set("index",a+"");const w=r.toString();n({pathname:e.pathname,search:w})},[v,e.pathname,e.search,n,t]),t3=s.useCallback(a=>{const r=a.clientX,w=a.clientY,s3=window.innerWidth||document.documentElement.clientWidth,c3=window.innerHeight||document.documentElement.clientHeight,i3=s3/2,a3=c3/2,V=80;Math.abs(r-i3)<=V&&Math.abs(w-a3)<=V?g(o3=>!o3):g(!1)},[]),n3=s.useCallback(()=>{j<95||k()},[k,j]);return c.jsxs("div",{className:f.reader,children:[c.jsxs("div",{ref:H,className:L(f.sidebar,_?f.sidebarVisible:void 0),children:[c.jsx("h3",{children:J}),c.jsx("ul",{children:t&&t.sections.map((a,r)=>c.jsx("li",{className:L(r===v?f.activeSection:void 0),children:c.jsx("a",{href:"javascript: ",onClick:()=>{M(r),E(!1)},children:a.title.trim().replace(/\s+/," ")})},r))})]}),c.jsx(s1,{className:f.header,onBack:()=>n(-1),left:c.jsx("div",{className:f.rightIcon,children:c.jsx(N,{style:{marginRight:8},name:"home",color:"#fff",onClick:()=>n("/")})}),right:c.jsxs("div",{className:f.rightIcon,children:[c.jsx(N,{style:{marginRight:8},name:"mulu",color:"#fff",onClick:()=>E(a=>!a)}),c.jsx(N,{name:"gengduo",color:"#fff",onClick:()=>g(a=>!a)})]}),children:c.jsx("span",{children:o})}),c.jsx("div",{className:f.content,onClick:t3,children:p}),c.jsxs("div",{className:f.footer,style:{visibility:o?"visible":"hidden"},onClick:n3,children:[c.jsx("div",{className:f.inner,style:{width:j+"%"}}),c.jsxs("div",{className:f.text,children:[j,"%"]}),j>95?c.jsx("div",{className:f.nextPage,children:T?"点击加载下一章":"已没有更多"}):null,j>100&&T?c.jsx("div",{className:f.scrollNextPage,children:"松开加载下一章"}):null]}),c.jsxs("div",{className:L(f.toolbar,z?f.visible:f.invisible),children:[c.jsxs("div",{className:f.navigator,children:[c.jsx("div",{onClick:e3,children:"上一章"}),c.jsxs("div",{children:[j,"%"]}),c.jsx("div",{onClick:k,children:"下一章"})]}),c.jsx("ul",{children:Q.map(a=>c.jsxs("li",{onClick:a.onClick,children:[a.icon,c.jsx("span",{children:a.label})]},a.label))})]})]})}export{a1 as default};