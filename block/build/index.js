!function(){var e={184:function(e,t){var n;!function(){"use strict";var r={}.hasOwnProperty;function o(){for(var e=[],t=0;t<arguments.length;t++){var n=arguments[t];if(n){var l=typeof n;if("string"===l||"number"===l)e.push(n);else if(Array.isArray(n)){if(n.length){var i=o.apply(null,n);i&&e.push(i)}}else if("object"===l)if(n.toString===Object.prototype.toString)for(var a in n)r.call(n,a)&&n[a]&&e.push(a);else e.push(n.toString())}}return e.join(" ")}e.exports?(o.default=o,e.exports=o):void 0===(n=function(){return o}.apply(t,[]))||(e.exports=n)}()}},t={};function n(r){var o=t[r];if(void 0!==o)return o.exports;var l=t[r]={exports:{}};return e[r](l,l.exports,n),l.exports}!function(){"use strict";var e=window.wp.element,t=window.wp.blockEditor,r=window.wp.coreData;function o(){return o=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},o.apply(this,arguments)}function l(e){var t,n,r="";if("string"==typeof e||"number"==typeof e)r+=e;else if("object"==typeof e)if(Array.isArray(e)){var o=e.length;for(t=0;t<o;t++)e[t]&&(n=l(e[t]))&&(r&&(r+=" "),r+=n)}else for(n in e)e[n]&&(r&&(r+=" "),r+=n);return r}var i=function(){for(var e,t,n=0,r="",o=arguments.length;n<o;n++)(e=arguments[n])&&(t=l(e))&&(r&&(r+=" "),r+=t);return r},a=window.wp.components,s=window.wp.i18n;function c(n){let{attributes:{level:l,textAlign:c,isLink:p,rel:u,linkTarget:m},setAttributes:g,context:{postType:w,postId:f,queryId:h},insertBlocksAfter:d}=n;const b=0===l?"p":`h${l}`,[v="",y,E]=(0,r.useEntityProp)("postType",w,"title",f),{meta:_}=wp.data.select("core").getEntityRecord("postType",w,f);let k=_.short_title?_.short_title:null==E?void 0:E.rendered;const x=(0,t.useBlockProps)({className:i({[`has-text-align-${c}`]:c})}),T=(0,t.useBlockEditingMode)();let B=(0,e.createElement)(b,x,(0,s.__)("Title"));return w&&f&&(B=(0,e.createElement)(e.Fragment,null,(0,e.createElement)(b,o({},x,{dangerouslySetInnerHTML:{__html:k}})))),(0,e.createElement)(e.Fragment,null,"default"===T&&(0,e.createElement)(e.Fragment,null,(0,e.createElement)(t.BlockControls,{group:"block"},(0,e.createElement)(t.HeadingLevelDropdown,{value:l,onChange:e=>g({level:e})}),(0,e.createElement)(t.AlignmentControl,{value:c,onChange:e=>{g({textAlign:e})}})),(0,e.createElement)(t.InspectorControls,null,(0,e.createElement)(a.PanelBody,{title:(0,s.__)("Settings")},(0,e.createElement)(a.ToggleControl,{__nextHasNoMarginBottom:!0,label:(0,s.__)("Make title a link"),onChange:()=>g({isLink:!p}),checked:p}),p&&(0,e.createElement)(e.Fragment,null,(0,e.createElement)(a.ToggleControl,{__nextHasNoMarginBottom:!0,label:(0,s.__)("Open in new tab"),onChange:e=>g({linkTarget:e?"_blank":"_self"}),checked:"_blank"===m}),(0,e.createElement)(a.TextControl,{__nextHasNoMarginBottom:!0,label:(0,s.__)("Link rel"),value:u,onChange:e=>g({rel:e})}))))),B)}n(184);const{__:__}=wp.i18n,p=["core/post-title"],{createHigherOrderComponent:u}=wp.compose,{Fragment:m}=wp.element,{BlockControls:g}=wp.blockEditor,{ToolbarGroup:w,ToolbarButton:f}=wp.components;wp.hooks.addFilter("blocks.registerBlockType","i8-attributes/set-toolbar-button-attribute",((e,t)=>p.includes(t)?Object.assign({},e,{attributes:Object.assign({},e.attributes,{useShortTitle:{type:"string"}})}):e));const h=wp.element.createElement(wp.primitives.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 64 64"},wp.element.createElement(wp.primitives.Path,{d:"M55.8008 36.959H36.0254V94H28.1152V36.959H8.33984V30.0156H55.8008V36.959Z"})),d=wp.element.createElement(wp.primitives.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 64 64"},wp.element.createElement(wp.primitives.Path,{d:"M55.8008 6.95898H36.0254V64H28.1152V6.95898H8.33984V0.015625H55.8008V6.95898Z"})),b=u((t=>n=>{if(!p.includes(n.name))return(0,e.createElement)(t,n);const{attributes:r,setAttributes:o}=n,{useShortTitle:l}=r;return(0,e.createElement)(m,null,(0,e.createElement)(g,null,(0,e.createElement)(w,null,(0,e.createElement)(f,{icon:"yes"===l?h:d,label:__("Use short title","inn8ly"),isActive:"yes"===l,onClick:()=>{o("yes"===l?{useShortTitle:!1}:{useShortTitle:"yes"})}}))),"yes"===l?(0,e.createElement)(c,n):(0,e.createElement)(t,n))}),"withToolbarButton");wp.hooks.addFilter("editor.BlockEdit","i8-attributes/with-toolbar-button",b)}()}();