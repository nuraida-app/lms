var qe=Object.defineProperty;var Ke=(e,t,r)=>t in e?qe(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r;var M=(e,t,r)=>Ke(e,typeof t!="symbol"?t+"":t,r);import{b6 as Ye,r as g,ao as D,ap as p,al as ue,am as pe,af as $,at as L,an as V,j as v,aq as _,ar as K,av as Qe,au as Xe,i as de,aD as fe,aW as j}from"./index-CFLTN1m7.js";import{g as Ge}from"./getThemeProps-DErmPepc.js";import{a as Ze,u as Oe}from"./Typography-CHJpYQNO.js";import{P as Ie}from"./Paper-BXkIlh-U.js";import{c as Je,d as et,o as De,r as me}from"./createSvgIcon-T2x4Gml6.js";import{r as tt,m as rt,b as ot,T as nt,c as at,g as Te,M as st}from"./Modal-B5cU9yt9.js";import{G as it}from"./GlobalStyles-DbM6d0GN.js";import{g as lt,u as ct,a as ut}from"./listItemIconClasses-Pf23efNw.js";import{u as $e}from"./useTheme-DnE98ifX.js";import{e as pt}from"./ExitToApp-B-9Gtlvi.js";function dt(e,t,r,o,n){const[a,c]=g.useState(()=>n&&r?r(e).matches:o?o(e).matches:t);return Ze(()=>{let s=!0;if(!r)return;const i=r(e),l=()=>{s&&c(i.matches)};return l(),i.addListener(l),()=>{s=!1,i.removeListener(l)}},[e,r]),a}const Re=g.useSyncExternalStore;function ft(e,t,r,o,n){const a=g.useCallback(()=>t,[t]),c=g.useMemo(()=>{if(n&&r)return()=>r(e).matches;if(o!==null){const{matches:u}=o(e);return()=>u}return a},[a,e,o,n,r]),[s,i]=g.useMemo(()=>{if(r===null)return[a,()=>()=>{}];const u=r(e);return[()=>u.matches,d=>(u.addListener(d),()=>{u.removeListener(d)})]},[a,r,e]);return Re(i,s,c)}function Xr(e,t={}){const r=Ye(),o=typeof window<"u"&&typeof window.matchMedia<"u",{defaultMatches:n=!1,matchMedia:a=o?window.matchMedia:null,ssrMatchMedia:c=null,noSsr:s=!1}=Ge({name:"MuiUseMediaQuery",props:t,theme:r});let i=typeof e=="function"?e(r):e;return i=i.replace(/^@media( ?)/m,""),(Re!==void 0?ft:dt)(i,n,a,c,s)}const mt=["className","elementType","ownerState","externalForwardedProps","getSlotOwnerState","internalForwardedProps"],ht=["component","slots","slotProps"],gt=["component"];function vt(e,t){const{className:r,elementType:o,ownerState:n,externalForwardedProps:a,getSlotOwnerState:c,internalForwardedProps:s}=t,i=D(t,mt),{component:l,slots:u={[e]:void 0},slotProps:d={[e]:void 0}}=a;D(a,ht);const m=u[e]||o,h=tt(d[e],n),x=rt(p({className:r},i,{externalForwardedProps:void 0,externalSlotProps:h})),{props:{component:b},internalRef:y}=x,k=D(x.props,gt),O=Oe(y,h==null?void 0:h.ref,t.ref),E=c?c(k):{},A=p({},n,E),I=b,w=ot(m,p({},e==="root",!u[e]&&s,k,I&&{as:I},{ref:O}),A);return Object.keys(E).forEach(T=>{delete w[T]}),[m,w]}function yt(e){return ue("MuiAppBar",e)}pe("MuiAppBar",["root","positionFixed","positionAbsolute","positionSticky","positionStatic","positionRelative","colorDefault","colorPrimary","colorSecondary","colorInherit","colorTransparent","colorError","colorInfo","colorSuccess","colorWarning"]);const xt=["className","color","enableColorOnDark","position"],bt=e=>{const{color:t,position:r,classes:o}=e,n={root:["root",`color${L(t)}`,`position${L(r)}`]};return K(n,yt,o)},X=(e,t)=>e?`${e==null?void 0:e.replace(")","")}, ${t})`:t,Tt=$(Ie,{name:"MuiAppBar",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:r}=e;return[t.root,t[`position${L(r.position)}`],t[`color${L(r.color)}`]]}})(({theme:e,ownerState:t})=>{const r=e.palette.mode==="light"?e.palette.grey[100]:e.palette.grey[900];return p({display:"flex",flexDirection:"column",width:"100%",boxSizing:"border-box",flexShrink:0},t.position==="fixed"&&{position:"fixed",zIndex:(e.vars||e).zIndex.appBar,top:0,left:"auto",right:0,"@media print":{position:"absolute"}},t.position==="absolute"&&{position:"absolute",zIndex:(e.vars||e).zIndex.appBar,top:0,left:"auto",right:0},t.position==="sticky"&&{position:"sticky",zIndex:(e.vars||e).zIndex.appBar,top:0,left:"auto",right:0},t.position==="static"&&{position:"static"},t.position==="relative"&&{position:"relative"},!e.vars&&p({},t.color==="default"&&{backgroundColor:r,color:e.palette.getContrastText(r)},t.color&&t.color!=="default"&&t.color!=="inherit"&&t.color!=="transparent"&&{backgroundColor:e.palette[t.color].main,color:e.palette[t.color].contrastText},t.color==="inherit"&&{color:"inherit"},e.palette.mode==="dark"&&!t.enableColorOnDark&&{backgroundColor:null,color:null},t.color==="transparent"&&p({backgroundColor:"transparent",color:"inherit"},e.palette.mode==="dark"&&{backgroundImage:"none"})),e.vars&&p({},t.color==="default"&&{"--AppBar-background":t.enableColorOnDark?e.vars.palette.AppBar.defaultBg:X(e.vars.palette.AppBar.darkBg,e.vars.palette.AppBar.defaultBg),"--AppBar-color":t.enableColorOnDark?e.vars.palette.text.primary:X(e.vars.palette.AppBar.darkColor,e.vars.palette.text.primary)},t.color&&!t.color.match(/^(default|inherit|transparent)$/)&&{"--AppBar-background":t.enableColorOnDark?e.vars.palette[t.color].main:X(e.vars.palette.AppBar.darkBg,e.vars.palette[t.color].main),"--AppBar-color":t.enableColorOnDark?e.vars.palette[t.color].contrastText:X(e.vars.palette.AppBar.darkColor,e.vars.palette[t.color].contrastText)},!["inherit","transparent"].includes(t.color)&&{backgroundColor:"var(--AppBar-background)"},{color:t.color==="inherit"?"inherit":"var(--AppBar-color)"},t.color==="transparent"&&{backgroundImage:"none",backgroundColor:"transparent",color:"inherit"}))}),Gr=g.forwardRef(function(t,r){const o=V({props:t,name:"MuiAppBar"}),{className:n,color:a="primary",enableColorOnDark:c=!1,position:s="fixed"}=o,i=D(o,xt),l=p({},o,{color:a,position:s,enableColorOnDark:c}),u=bt(l);return v.jsx(Tt,p({square:!0,component:"header",ownerState:l,elevation:4,className:_(u.root,n,s==="fixed"&&"mui-fixed"),ref:r},i))}),At=Je(v.jsx("path",{d:"M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"}),"Person");function Ct(e){return ue("MuiAvatar",e)}pe("MuiAvatar",["root","colorDefault","circular","rounded","square","img","fallback"]);const kt=["alt","children","className","component","slots","slotProps","imgProps","sizes","src","srcSet","variant"],Et=e=>{const{classes:t,variant:r,colorDefault:o}=e;return K({root:["root",r,o&&"colorDefault"],img:["img"],fallback:["fallback"]},Ct,t)},Pt=$("div",{name:"MuiAvatar",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:r}=e;return[t.root,t[r.variant],r.colorDefault&&t.colorDefault]}})(({theme:e})=>({position:"relative",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,width:40,height:40,fontFamily:e.typography.fontFamily,fontSize:e.typography.pxToRem(20),lineHeight:1,borderRadius:"50%",overflow:"hidden",userSelect:"none",variants:[{props:{variant:"rounded"},style:{borderRadius:(e.vars||e).shape.borderRadius}},{props:{variant:"square"},style:{borderRadius:0}},{props:{colorDefault:!0},style:p({color:(e.vars||e).palette.background.default},e.vars?{backgroundColor:e.vars.palette.Avatar.defaultBg}:p({backgroundColor:e.palette.grey[400]},e.applyStyles("dark",{backgroundColor:e.palette.grey[600]})))}]})),wt=$("img",{name:"MuiAvatar",slot:"Img",overridesResolver:(e,t)=>t.img})({width:"100%",height:"100%",textAlign:"center",objectFit:"cover",color:"transparent",textIndent:1e4}),St=$(At,{name:"MuiAvatar",slot:"Fallback",overridesResolver:(e,t)=>t.fallback})({width:"75%",height:"75%"});function Ot({crossOrigin:e,referrerPolicy:t,src:r,srcSet:o}){const[n,a]=g.useState(!1);return g.useEffect(()=>{if(!r&&!o)return;a(!1);let c=!0;const s=new Image;return s.onload=()=>{c&&a("loaded")},s.onerror=()=>{c&&a("error")},s.crossOrigin=e,s.referrerPolicy=t,s.src=r,o&&(s.srcset=o),()=>{c=!1}},[e,t,r,o]),n}const Zr=g.forwardRef(function(t,r){const o=V({props:t,name:"MuiAvatar"}),{alt:n,children:a,className:c,component:s="div",slots:i={},slotProps:l={},imgProps:u,sizes:d,src:m,srcSet:h,variant:x="circular"}=o,b=D(o,kt);let y=null;const k=Ot(p({},u,{src:m,srcSet:h})),O=m||h,E=O&&k!=="error",A=p({},o,{colorDefault:!E,component:s,variant:x}),I=Et(A),[w,T]=vt("img",{className:I.img,elementType:wt,externalForwardedProps:{slots:i,slotProps:{img:p({},u,l.img)}},additionalProps:{alt:n,src:m,srcSet:h,sizes:d},ownerState:A});return E?y=v.jsx(w,p({},T)):a||a===0?y=a:O&&n?y=n[0]:y=v.jsx(St,{ownerState:A,className:I.fallback}),v.jsx(Pt,p({as:s,ownerState:A,className:_(I.root,c),ref:r},b,{children:y}))}),It=(e,t)=>p({WebkitFontSmoothing:"antialiased",MozOsxFontSmoothing:"grayscale",boxSizing:"border-box",WebkitTextSizeAdjust:"100%"},t&&!e.vars&&{colorScheme:e.palette.mode}),Dt=e=>p({color:(e.vars||e).palette.text.primary},e.typography.body1,{backgroundColor:(e.vars||e).palette.background.default,"@media print":{backgroundColor:(e.vars||e).palette.common.white}}),$t=(e,t=!1)=>{var r;const o={};t&&e.colorSchemes&&Object.entries(e.colorSchemes).forEach(([c,s])=>{var i;o[e.getColorSchemeSelector(c).replace(/\s*&/,"")]={colorScheme:(i=s.palette)==null?void 0:i.mode}});let n=p({html:It(e,t),"*, *::before, *::after":{boxSizing:"inherit"},"strong, b":{fontWeight:e.typography.fontWeightBold},body:p({margin:0},Dt(e),{"&::backdrop":{backgroundColor:(e.vars||e).palette.background.default}})},o);const a=(r=e.components)==null||(r=r.MuiCssBaseline)==null?void 0:r.styleOverrides;return a&&(n=[n,a]),n};function Jr(e){const t=V({props:e,name:"MuiCssBaseline"}),{children:r,enableColorScheme:o=!1}=t;return v.jsxs(g.Fragment,{children:[v.jsx(it,{styles:n=>$t(n,o)}),r]})}const Rt=["absolute","children","className","component","flexItem","light","orientation","role","textAlign","variant"],Mt=e=>{const{absolute:t,children:r,classes:o,flexItem:n,light:a,orientation:c,textAlign:s,variant:i}=e;return K({root:["root",t&&"absolute",i,a&&"light",c==="vertical"&&"vertical",n&&"flexItem",r&&"withChildren",r&&c==="vertical"&&"withChildrenVertical",s==="right"&&c!=="vertical"&&"textAlignRight",s==="left"&&c!=="vertical"&&"textAlignLeft"],wrapper:["wrapper",c==="vertical"&&"wrapperVertical"]},lt,o)},_t=$("div",{name:"MuiDivider",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:r}=e;return[t.root,r.absolute&&t.absolute,t[r.variant],r.light&&t.light,r.orientation==="vertical"&&t.vertical,r.flexItem&&t.flexItem,r.children&&t.withChildren,r.children&&r.orientation==="vertical"&&t.withChildrenVertical,r.textAlign==="right"&&r.orientation!=="vertical"&&t.textAlignRight,r.textAlign==="left"&&r.orientation!=="vertical"&&t.textAlignLeft]}})(({theme:e,ownerState:t})=>p({margin:0,flexShrink:0,borderWidth:0,borderStyle:"solid",borderColor:(e.vars||e).palette.divider,borderBottomWidth:"thin"},t.absolute&&{position:"absolute",bottom:0,left:0,width:"100%"},t.light&&{borderColor:e.vars?`rgba(${e.vars.palette.dividerChannel} / 0.08)`:Qe(e.palette.divider,.08)},t.variant==="inset"&&{marginLeft:72},t.variant==="middle"&&t.orientation==="horizontal"&&{marginLeft:e.spacing(2),marginRight:e.spacing(2)},t.variant==="middle"&&t.orientation==="vertical"&&{marginTop:e.spacing(1),marginBottom:e.spacing(1)},t.orientation==="vertical"&&{height:"100%",borderBottomWidth:0,borderRightWidth:"thin"},t.flexItem&&{alignSelf:"stretch",height:"auto"}),({ownerState:e})=>p({},e.children&&{display:"flex",whiteSpace:"nowrap",textAlign:"center",border:0,"&::before, &::after":{content:'""',alignSelf:"center"}}),({theme:e,ownerState:t})=>p({},t.children&&t.orientation!=="vertical"&&{"&::before, &::after":{width:"100%",borderTop:`thin solid ${(e.vars||e).palette.divider}`}}),({theme:e,ownerState:t})=>p({},t.children&&t.orientation==="vertical"&&{flexDirection:"column","&::before, &::after":{height:"100%",borderLeft:`thin solid ${(e.vars||e).palette.divider}`}}),({ownerState:e})=>p({},e.textAlign==="right"&&e.orientation!=="vertical"&&{"&::before":{width:"90%"},"&::after":{width:"10%"}},e.textAlign==="left"&&e.orientation!=="vertical"&&{"&::before":{width:"10%"},"&::after":{width:"90%"}})),jt=$("span",{name:"MuiDivider",slot:"Wrapper",overridesResolver:(e,t)=>{const{ownerState:r}=e;return[t.wrapper,r.orientation==="vertical"&&t.wrapperVertical]}})(({theme:e,ownerState:t})=>p({display:"inline-block",paddingLeft:`calc(${e.spacing(1)} * 1.2)`,paddingRight:`calc(${e.spacing(1)} * 1.2)`},t.orientation==="vertical"&&{paddingTop:`calc(${e.spacing(1)} * 1.2)`,paddingBottom:`calc(${e.spacing(1)} * 1.2)`})),Lt=g.forwardRef(function(t,r){const o=V({props:t,name:"MuiDivider"}),{absolute:n=!1,children:a,className:c,component:s=a?"div":"hr",flexItem:i=!1,light:l=!1,orientation:u="horizontal",role:d=s!=="hr"?"separator":void 0,textAlign:m="center",variant:h="fullWidth"}=o,x=D(o,Rt),b=p({},o,{absolute:n,component:s,flexItem:i,light:l,orientation:u,role:d,textAlign:m,variant:h}),y=Mt(b);return v.jsx(_t,p({as:s,className:_(y.root,c),role:d,ref:r,ownerState:b},x,{children:a?v.jsx(jt,{className:y.wrapper,ownerState:b,children:a}):null}))});Lt.muiSkipListHighlight=!0;const Bt=["addEndListener","appear","children","container","direction","easing","in","onEnter","onEntered","onEntering","onExit","onExited","onExiting","style","timeout","TransitionComponent"];function Ht(e,t,r){const o=t.getBoundingClientRect(),n=r&&r.getBoundingClientRect(),a=De(t);let c;if(t.fakeTransform)c=t.fakeTransform;else{const l=a.getComputedStyle(t);c=l.getPropertyValue("-webkit-transform")||l.getPropertyValue("transform")}let s=0,i=0;if(c&&c!=="none"&&typeof c=="string"){const l=c.split("(")[1].split(")")[0].split(",");s=parseInt(l[4],10),i=parseInt(l[5],10)}return e==="left"?n?`translateX(${n.right+s-o.left}px)`:`translateX(${a.innerWidth+s-o.left}px)`:e==="right"?n?`translateX(-${o.right-n.left-s}px)`:`translateX(-${o.left+o.width-s}px)`:e==="up"?n?`translateY(${n.bottom+i-o.top}px)`:`translateY(${a.innerHeight+i-o.top}px)`:n?`translateY(-${o.top-n.top+o.height-i}px)`:`translateY(-${o.top+o.height-i}px)`}function zt(e){return typeof e=="function"?e():e}function G(e,t,r){const o=zt(r),n=Ht(e,t,o);n&&(t.style.webkitTransform=n,t.style.transform=n)}const Ft=g.forwardRef(function(t,r){const o=$e(),n={enter:o.transitions.easing.easeOut,exit:o.transitions.easing.sharp},a={enter:o.transitions.duration.enteringScreen,exit:o.transitions.duration.leavingScreen},{addEndListener:c,appear:s=!0,children:i,container:l,direction:u="down",easing:d=n,in:m,onEnter:h,onEntered:x,onEntering:b,onExit:y,onExited:k,onExiting:O,style:E,timeout:A=a,TransitionComponent:I=nt}=t,w=D(t,Bt),T=g.useRef(null),te=Oe(i.ref,T,r),B=f=>C=>{f&&(C===void 0?f(T.current):f(T.current,C))},H=B((f,C)=>{G(u,f,l),at(f),h&&h(f,C)}),R=B((f,C)=>{const be=Te({timeout:A,style:E,easing:d},{mode:"enter"});f.style.webkitTransition=o.transitions.create("-webkit-transform",p({},be)),f.style.transition=o.transitions.create("transform",p({},be)),f.style.webkitTransform="none",f.style.transform="none",b&&b(f,C)}),Y=B(x),Q=B(O),Ue=B(f=>{const C=Te({timeout:A,style:E,easing:d},{mode:"exit"});f.style.webkitTransition=o.transitions.create("-webkit-transform",C),f.style.transition=o.transitions.create("transform",C),G(u,f,l),y&&y(f)}),Ve=B(f=>{f.style.webkitTransition="",f.style.transition="",k&&k(f)}),We=f=>{c&&c(T.current,f)},xe=g.useCallback(()=>{T.current&&G(u,T.current,l)},[u,l]);return g.useEffect(()=>{if(m||u==="down"||u==="right")return;const f=et(()=>{T.current&&G(u,T.current,l)}),C=De(T.current);return C.addEventListener("resize",f),()=>{f.clear(),C.removeEventListener("resize",f)}},[u,m,l]),g.useEffect(()=>{m||xe()},[m,xe]),v.jsx(I,p({nodeRef:T,onEnter:H,onEntered:Y,onEntering:R,onExit:Ue,onExited:Ve,onExiting:Q,addEndListener:We,appear:s,in:m,timeout:A},w,{children:(f,C)=>g.cloneElement(i,p({ref:te,style:p({visibility:f==="exited"&&!m?"hidden":void 0},E,i.props.style)},C))}))});function Nt(e){return ue("MuiDrawer",e)}pe("MuiDrawer",["root","docked","paper","paperAnchorLeft","paperAnchorRight","paperAnchorTop","paperAnchorBottom","paperAnchorDockedLeft","paperAnchorDockedRight","paperAnchorDockedTop","paperAnchorDockedBottom","modal"]);const Ut=["BackdropProps"],Vt=["anchor","BackdropProps","children","className","elevation","hideBackdrop","ModalProps","onClose","open","PaperProps","SlideProps","TransitionComponent","transitionDuration","variant"],Me=(e,t)=>{const{ownerState:r}=e;return[t.root,(r.variant==="permanent"||r.variant==="persistent")&&t.docked,t.modal]},Wt=e=>{const{classes:t,anchor:r,variant:o}=e,n={root:["root"],docked:[(o==="permanent"||o==="persistent")&&"docked"],modal:["modal"],paper:["paper",`paperAnchor${L(r)}`,o!=="temporary"&&`paperAnchorDocked${L(r)}`]};return K(n,Nt,t)},qt=$(st,{name:"MuiDrawer",slot:"Root",overridesResolver:Me})(({theme:e})=>({zIndex:(e.vars||e).zIndex.drawer})),Ae=$("div",{shouldForwardProp:Xe,name:"MuiDrawer",slot:"Docked",skipVariantsResolver:!1,overridesResolver:Me})({flex:"0 0 auto"}),Kt=$(Ie,{name:"MuiDrawer",slot:"Paper",overridesResolver:(e,t)=>{const{ownerState:r}=e;return[t.paper,t[`paperAnchor${L(r.anchor)}`],r.variant!=="temporary"&&t[`paperAnchorDocked${L(r.anchor)}`]]}})(({theme:e,ownerState:t})=>p({overflowY:"auto",display:"flex",flexDirection:"column",height:"100%",flex:"1 0 auto",zIndex:(e.vars||e).zIndex.drawer,WebkitOverflowScrolling:"touch",position:"fixed",top:0,outline:0},t.anchor==="left"&&{left:0},t.anchor==="top"&&{top:0,left:0,right:0,height:"auto",maxHeight:"100%"},t.anchor==="right"&&{right:0},t.anchor==="bottom"&&{top:"auto",left:0,bottom:0,right:0,height:"auto",maxHeight:"100%"},t.anchor==="left"&&t.variant!=="temporary"&&{borderRight:`1px solid ${(e.vars||e).palette.divider}`},t.anchor==="top"&&t.variant!=="temporary"&&{borderBottom:`1px solid ${(e.vars||e).palette.divider}`},t.anchor==="right"&&t.variant!=="temporary"&&{borderLeft:`1px solid ${(e.vars||e).palette.divider}`},t.anchor==="bottom"&&t.variant!=="temporary"&&{borderTop:`1px solid ${(e.vars||e).palette.divider}`})),_e={left:"right",right:"left",top:"down",bottom:"up"};function Yt(e){return["left","right"].indexOf(e)!==-1}function Qt({direction:e},t){return e==="rtl"&&Yt(t)?_e[t]:t}const eo=g.forwardRef(function(t,r){const o=V({props:t,name:"MuiDrawer"}),n=$e(),a=ct(),c={enter:n.transitions.duration.enteringScreen,exit:n.transitions.duration.leavingScreen},{anchor:s="left",BackdropProps:i,children:l,className:u,elevation:d=16,hideBackdrop:m=!1,ModalProps:{BackdropProps:h}={},onClose:x,open:b=!1,PaperProps:y={},SlideProps:k,TransitionComponent:O=Ft,transitionDuration:E=c,variant:A="temporary"}=o,I=D(o.ModalProps,Ut),w=D(o,Vt),T=g.useRef(!1);g.useEffect(()=>{T.current=!0},[]);const te=Qt({direction:a?"rtl":"ltr"},s),H=p({},o,{anchor:s,elevation:d,open:b,variant:A},w),R=Wt(H),Y=v.jsx(Kt,p({elevation:A==="temporary"?d:0,square:!0},y,{className:_(R.paper,y.className),ownerState:H,children:l}));if(A==="permanent")return v.jsx(Ae,p({className:_(R.root,R.docked,u),ownerState:H,ref:r},w,{children:Y}));const Q=v.jsx(O,p({in:b,direction:_e[te],timeout:E,appear:T.current},k,{children:Y}));return A==="persistent"?v.jsx(Ae,p({className:_(R.root,R.docked,u),ownerState:H,ref:r},w,{children:Q})):v.jsx(qt,p({BackdropProps:p({},i,h,{transitionDuration:E}),className:_(R.root,R.modal,u),open:b,ownerState:H,onClose:x,hideBackdrop:m,ref:r},w,I,{children:Q}))}),Xt=["className"],Gt=e=>{const{alignItems:t,classes:r}=e;return K({root:["root",t==="flex-start"&&"alignItemsFlexStart"]},ut,r)},Zt=$("div",{name:"MuiListItemIcon",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:r}=e;return[t.root,r.alignItems==="flex-start"&&t.alignItemsFlexStart]}})(({theme:e,ownerState:t})=>p({minWidth:56,color:(e.vars||e).palette.action.active,flexShrink:0,display:"inline-flex"},t.alignItems==="flex-start"&&{marginTop:8})),to=g.forwardRef(function(t,r){const o=V({props:t,name:"MuiListItemIcon"}),{className:n}=o,a=D(o,Xt),c=g.useContext(pt),s=p({},o,{alignItems:c.alignItems}),i=Gt(s);return v.jsx(Zt,p({className:_(i.root,n),ownerState:s,ref:r},a))});var he={},Jt=de;Object.defineProperty(he,"__esModule",{value:!0});var er=he.default=void 0,tr=Jt(me()),rr=v;er=he.default=(0,tr.default)((0,rr.jsx)("path",{d:"M3 18h18v-2H3zm0-5h18v-2H3zm0-7v2h18V6z"}),"Menu");var ge={},or=de;Object.defineProperty(ge,"__esModule",{value:!0});var nr=ge.default=void 0,ar=or(me()),sr=v;nr=ge.default=(0,ar.default)((0,sr.jsx)("path",{d:"M11 21H5c-1.1 0-2-.9-2-2V5c0-1.1.9-2 2-2h6zm2 0h6c1.1 0 2-.9 2-2v-7h-8zm8-11V5c0-1.1-.9-2-2-2h-6v7z"}),"SpaceDashboard");var ve={},ir=de;Object.defineProperty(ve,"__esModule",{value:!0});var lr=ve.default=void 0,cr=ir(me()),Ce=v;lr=ve.default=(0,cr.default)([(0,Ce.jsx)("path",{d:"M3 6H1v13c0 1.1.9 2 2 2h17v-2H3z"},"0"),(0,Ce.jsx)("path",{d:"M21 4h-7l-2-2H7c-1.1 0-1.99.9-1.99 2L5 15c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2"},"1")],"FolderCopy");var ur=typeof Element<"u",pr=typeof Map=="function",dr=typeof Set=="function",fr=typeof ArrayBuffer=="function"&&!!ArrayBuffer.isView;function J(e,t){if(e===t)return!0;if(e&&t&&typeof e=="object"&&typeof t=="object"){if(e.constructor!==t.constructor)return!1;var r,o,n;if(Array.isArray(e)){if(r=e.length,r!=t.length)return!1;for(o=r;o--!==0;)if(!J(e[o],t[o]))return!1;return!0}var a;if(pr&&e instanceof Map&&t instanceof Map){if(e.size!==t.size)return!1;for(a=e.entries();!(o=a.next()).done;)if(!t.has(o.value[0]))return!1;for(a=e.entries();!(o=a.next()).done;)if(!J(o.value[1],t.get(o.value[0])))return!1;return!0}if(dr&&e instanceof Set&&t instanceof Set){if(e.size!==t.size)return!1;for(a=e.entries();!(o=a.next()).done;)if(!t.has(o.value[0]))return!1;return!0}if(fr&&ArrayBuffer.isView(e)&&ArrayBuffer.isView(t)){if(r=e.length,r!=t.length)return!1;for(o=r;o--!==0;)if(e[o]!==t[o])return!1;return!0}if(e.constructor===RegExp)return e.source===t.source&&e.flags===t.flags;if(e.valueOf!==Object.prototype.valueOf&&typeof e.valueOf=="function"&&typeof t.valueOf=="function")return e.valueOf()===t.valueOf();if(e.toString!==Object.prototype.toString&&typeof e.toString=="function"&&typeof t.toString=="function")return e.toString()===t.toString();if(n=Object.keys(e),r=n.length,r!==Object.keys(t).length)return!1;for(o=r;o--!==0;)if(!Object.prototype.hasOwnProperty.call(t,n[o]))return!1;if(ur&&e instanceof Element)return!1;for(o=r;o--!==0;)if(!((n[o]==="_owner"||n[o]==="__v"||n[o]==="__o")&&e.$$typeof)&&!J(e[n[o]],t[n[o]]))return!1;return!0}return e!==e&&t!==t}var mr=function(t,r){try{return J(t,r)}catch(o){if((o.message||"").match(/stack|recursion/i))return console.warn("react-fast-compare cannot handle circular refs"),!1;throw o}};const hr=fe(mr);var gr=function(e,t,r,o,n,a,c,s){if(!e){var i;if(t===void 0)i=new Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");else{var l=[r,o,n,a,c,s],u=0;i=new Error(t.replace(/%s/g,function(){return l[u++]})),i.name="Invariant Violation"}throw i.framesToPop=1,i}},vr=gr;const ke=fe(vr);var yr=function(t,r,o,n){var a=o?o.call(n,t,r):void 0;if(a!==void 0)return!!a;if(t===r)return!0;if(typeof t!="object"||!t||typeof r!="object"||!r)return!1;var c=Object.keys(t),s=Object.keys(r);if(c.length!==s.length)return!1;for(var i=Object.prototype.hasOwnProperty.bind(r),l=0;l<c.length;l++){var u=c[l];if(!i(u))return!1;var d=t[u],m=r[u];if(a=o?o.call(n,d,m,u):void 0,a===!1||a===void 0&&d!==m)return!1}return!0};const xr=fe(yr);var je=(e=>(e.BASE="base",e.BODY="body",e.HEAD="head",e.HTML="html",e.LINK="link",e.META="meta",e.NOSCRIPT="noscript",e.SCRIPT="script",e.STYLE="style",e.TITLE="title",e.FRAGMENT="Symbol(react.fragment)",e))(je||{}),re={link:{rel:["amphtml","canonical","alternate"]},script:{type:["application/ld+json"]},meta:{charset:"",name:["generator","robots","description"],property:["og:type","og:title","og:url","og:image","og:image:alt","og:description","twitter:url","twitter:title","twitter:description","twitter:image","twitter:image:alt","twitter:card","twitter:site"]}},Ee=Object.values(je),ye={accesskey:"accessKey",charset:"charSet",class:"className",contenteditable:"contentEditable",contextmenu:"contextMenu","http-equiv":"httpEquiv",itemprop:"itemProp",tabindex:"tabIndex"},br=Object.entries(ye).reduce((e,[t,r])=>(e[r]=t,e),{}),S="data-rh",N={DEFAULT_TITLE:"defaultTitle",DEFER:"defer",ENCODE_SPECIAL_CHARACTERS:"encodeSpecialCharacters",ON_CHANGE_CLIENT_STATE:"onChangeClientState",TITLE_TEMPLATE:"titleTemplate",PRIORITIZE_SEO_TAGS:"prioritizeSeoTags"},U=(e,t)=>{for(let r=e.length-1;r>=0;r-=1){const o=e[r];if(Object.prototype.hasOwnProperty.call(o,t))return o[t]}return null},Tr=e=>{let t=U(e,"title");const r=U(e,N.TITLE_TEMPLATE);if(Array.isArray(t)&&(t=t.join("")),r&&t)return r.replace(/%s/g,()=>t);const o=U(e,N.DEFAULT_TITLE);return t||o||void 0},Ar=e=>U(e,N.ON_CHANGE_CLIENT_STATE)||(()=>{}),oe=(e,t)=>t.filter(r=>typeof r[e]<"u").map(r=>r[e]).reduce((r,o)=>({...r,...o}),{}),Cr=(e,t)=>t.filter(r=>typeof r.base<"u").map(r=>r.base).reverse().reduce((r,o)=>{if(!r.length){const n=Object.keys(o);for(let a=0;a<n.length;a+=1){const s=n[a].toLowerCase();if(e.indexOf(s)!==-1&&o[s])return r.concat(o)}}return r},[]),kr=e=>console&&typeof console.warn=="function"&&console.warn(e),W=(e,t,r)=>{const o={};return r.filter(n=>Array.isArray(n[e])?!0:(typeof n[e]<"u"&&kr(`Helmet: ${e} should be of type "Array". Instead found type "${typeof n[e]}"`),!1)).map(n=>n[e]).reverse().reduce((n,a)=>{const c={};a.filter(i=>{let l;const u=Object.keys(i);for(let m=0;m<u.length;m+=1){const h=u[m],x=h.toLowerCase();t.indexOf(x)!==-1&&!(l==="rel"&&i[l].toLowerCase()==="canonical")&&!(x==="rel"&&i[x].toLowerCase()==="stylesheet")&&(l=x),t.indexOf(h)!==-1&&(h==="innerHTML"||h==="cssText"||h==="itemprop")&&(l=h)}if(!l||!i[l])return!1;const d=i[l].toLowerCase();return o[l]||(o[l]={}),c[l]||(c[l]={}),o[l][d]?!1:(c[l][d]=!0,!0)}).reverse().forEach(i=>n.push(i));const s=Object.keys(c);for(let i=0;i<s.length;i+=1){const l=s[i],u={...o[l],...c[l]};o[l]=u}return n},[]).reverse()},Er=(e,t)=>{if(Array.isArray(e)&&e.length){for(let r=0;r<e.length;r+=1)if(e[r][t])return!0}return!1},Pr=e=>({baseTag:Cr(["href"],e),bodyAttributes:oe("bodyAttributes",e),defer:U(e,N.DEFER),encode:U(e,N.ENCODE_SPECIAL_CHARACTERS),htmlAttributes:oe("htmlAttributes",e),linkTags:W("link",["rel","href"],e),metaTags:W("meta",["name","charset","http-equiv","property","itemprop"],e),noscriptTags:W("noscript",["innerHTML"],e),onChangeClientState:Ar(e),scriptTags:W("script",["src","innerHTML"],e),styleTags:W("style",["cssText"],e),title:Tr(e),titleAttributes:oe("titleAttributes",e),prioritizeSeoTags:Er(e,N.PRIORITIZE_SEO_TAGS)}),Le=e=>Array.isArray(e)?e.join(""):e,wr=(e,t)=>{const r=Object.keys(e);for(let o=0;o<r.length;o+=1)if(t[r[o]]&&t[r[o]].includes(e[r[o]]))return!0;return!1},ne=(e,t)=>Array.isArray(e)?e.reduce((r,o)=>(wr(o,t)?r.priority.push(o):r.default.push(o),r),{priority:[],default:[]}):{default:e,priority:[]},Pe=(e,t)=>({...e,[t]:void 0}),Sr=["noscript","script","style"],se=(e,t=!0)=>t===!1?String(e):String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;"),Be=e=>Object.keys(e).reduce((t,r)=>{const o=typeof e[r]<"u"?`${r}="${e[r]}"`:`${r}`;return t?`${t} ${o}`:o},""),Or=(e,t,r,o)=>{const n=Be(r),a=Le(t);return n?`<${e} ${S}="true" ${n}>${se(a,o)}</${e}>`:`<${e} ${S}="true">${se(a,o)}</${e}>`},Ir=(e,t,r=!0)=>t.reduce((o,n)=>{const a=n,c=Object.keys(a).filter(l=>!(l==="innerHTML"||l==="cssText")).reduce((l,u)=>{const d=typeof a[u]>"u"?u:`${u}="${se(a[u],r)}"`;return l?`${l} ${d}`:d},""),s=a.innerHTML||a.cssText||"",i=Sr.indexOf(e)===-1;return`${o}<${e} ${S}="true" ${c}${i?"/>":`>${s}</${e}>`}`},""),He=(e,t={})=>Object.keys(e).reduce((r,o)=>{const n=ye[o];return r[n||o]=e[o],r},t),Dr=(e,t,r)=>{const o={key:t,[S]:!0},n=He(r,o);return[j.createElement("title",n,t)]},ee=(e,t)=>t.map((r,o)=>{const n={key:o,[S]:!0};return Object.keys(r).forEach(a=>{const s=ye[a]||a;if(s==="innerHTML"||s==="cssText"){const i=r.innerHTML||r.cssText;n.dangerouslySetInnerHTML={__html:i}}else n[s]=r[a]}),j.createElement(e,n)}),P=(e,t,r=!0)=>{switch(e){case"title":return{toComponent:()=>Dr(e,t.title,t.titleAttributes),toString:()=>Or(e,t.title,t.titleAttributes,r)};case"bodyAttributes":case"htmlAttributes":return{toComponent:()=>He(t),toString:()=>Be(t)};default:return{toComponent:()=>ee(e,t),toString:()=>Ir(e,t,r)}}},$r=({metaTags:e,linkTags:t,scriptTags:r,encode:o})=>{const n=ne(e,re.meta),a=ne(t,re.link),c=ne(r,re.script);return{priorityMethods:{toComponent:()=>[...ee("meta",n.priority),...ee("link",a.priority),...ee("script",c.priority)],toString:()=>`${P("meta",n.priority,o)} ${P("link",a.priority,o)} ${P("script",c.priority,o)}`},metaTags:n.default,linkTags:a.default,scriptTags:c.default}},Rr=e=>{const{baseTag:t,bodyAttributes:r,encode:o=!0,htmlAttributes:n,noscriptTags:a,styleTags:c,title:s="",titleAttributes:i,prioritizeSeoTags:l}=e;let{linkTags:u,metaTags:d,scriptTags:m}=e,h={toComponent:()=>{},toString:()=>""};return l&&({priorityMethods:h,linkTags:u,metaTags:d,scriptTags:m}=$r(e)),{priority:h,base:P("base",t,o),bodyAttributes:P("bodyAttributes",r,o),htmlAttributes:P("htmlAttributes",n,o),link:P("link",u,o),meta:P("meta",d,o),noscript:P("noscript",a,o),script:P("script",m,o),style:P("style",c,o),title:P("title",{title:s,titleAttributes:i},o)}},ie=Rr,Z=[],ze=!!(typeof window<"u"&&window.document&&window.document.createElement),le=class{constructor(e,t){M(this,"instances",[]);M(this,"canUseDOM",ze);M(this,"context");M(this,"value",{setHelmet:e=>{this.context.helmet=e},helmetInstances:{get:()=>this.canUseDOM?Z:this.instances,add:e=>{(this.canUseDOM?Z:this.instances).push(e)},remove:e=>{const t=(this.canUseDOM?Z:this.instances).indexOf(e);(this.canUseDOM?Z:this.instances).splice(t,1)}}});this.context=e,this.canUseDOM=t||!1,t||(e.helmet=ie({baseTag:[],bodyAttributes:{},encodeSpecialCharacters:!0,htmlAttributes:{},linkTags:[],metaTags:[],noscriptTags:[],scriptTags:[],styleTags:[],title:"",titleAttributes:{}}))}},Mr={},Fe=j.createContext(Mr),z,Ne=(z=class extends g.Component{constructor(r){super(r);M(this,"helmetData");this.helmetData=new le(this.props.context||{},z.canUseDOM)}render(){return j.createElement(Fe.Provider,{value:this.helmetData.value},this.props.children)}},M(z,"canUseDOM",ze),z),F=(e,t)=>{const r=document.head||document.querySelector("head"),o=r.querySelectorAll(`${e}[${S}]`),n=[].slice.call(o),a=[];let c;return t&&t.length&&t.forEach(s=>{const i=document.createElement(e);for(const l in s)if(Object.prototype.hasOwnProperty.call(s,l))if(l==="innerHTML")i.innerHTML=s.innerHTML;else if(l==="cssText")i.styleSheet?i.styleSheet.cssText=s.cssText:i.appendChild(document.createTextNode(s.cssText));else{const u=l,d=typeof s[u]>"u"?"":s[u];i.setAttribute(l,d)}i.setAttribute(S,"true"),n.some((l,u)=>(c=u,i.isEqualNode(l)))?n.splice(c,1):a.push(i)}),n.forEach(s=>{var i;return(i=s.parentNode)==null?void 0:i.removeChild(s)}),a.forEach(s=>r.appendChild(s)),{oldTags:n,newTags:a}},ce=(e,t)=>{const r=document.getElementsByTagName(e)[0];if(!r)return;const o=r.getAttribute(S),n=o?o.split(","):[],a=[...n],c=Object.keys(t);for(const s of c){const i=t[s]||"";r.getAttribute(s)!==i&&r.setAttribute(s,i),n.indexOf(s)===-1&&n.push(s);const l=a.indexOf(s);l!==-1&&a.splice(l,1)}for(let s=a.length-1;s>=0;s-=1)r.removeAttribute(a[s]);n.length===a.length?r.removeAttribute(S):r.getAttribute(S)!==c.join(",")&&r.setAttribute(S,c.join(","))},_r=(e,t)=>{typeof e<"u"&&document.title!==e&&(document.title=Le(e)),ce("title",t)},we=(e,t)=>{const{baseTag:r,bodyAttributes:o,htmlAttributes:n,linkTags:a,metaTags:c,noscriptTags:s,onChangeClientState:i,scriptTags:l,styleTags:u,title:d,titleAttributes:m}=e;ce("body",o),ce("html",n),_r(d,m);const h={baseTag:F("base",r),linkTags:F("link",a),metaTags:F("meta",c),noscriptTags:F("noscript",s),scriptTags:F("script",l),styleTags:F("style",u)},x={},b={};Object.keys(h).forEach(y=>{const{newTags:k,oldTags:O}=h[y];k.length&&(x[y]=k),O.length&&(b[y]=h[y].oldTags)}),t&&t(),i(e,x,b)},q=null,jr=e=>{q&&cancelAnimationFrame(q),e.defer?q=requestAnimationFrame(()=>{we(e,()=>{q=null})}):(we(e),q=null)},Lr=jr,Se=class extends g.Component{constructor(){super(...arguments);M(this,"rendered",!1)}shouldComponentUpdate(t){return!xr(t,this.props)}componentDidUpdate(){this.emitChange()}componentWillUnmount(){const{helmetInstances:t}=this.props.context;t.remove(this),this.emitChange()}emitChange(){const{helmetInstances:t,setHelmet:r}=this.props.context;let o=null;const n=Pr(t.get().map(a=>{const c={...a.props};return delete c.context,c}));Ne.canUseDOM?Lr(n):ie&&(o=ie(n)),r(o)}init(){if(this.rendered)return;this.rendered=!0;const{helmetInstances:t}=this.props.context;t.add(this),this.emitChange()}render(){return this.init(),null}},ae,Br=(ae=class extends g.Component{shouldComponentUpdate(e){return!hr(Pe(this.props,"helmetData"),Pe(e,"helmetData"))}mapNestedChildrenToProps(e,t){if(!t)return null;switch(e.type){case"script":case"noscript":return{innerHTML:t};case"style":return{cssText:t};default:throw new Error(`<${e.type} /> elements are self-closing and can not contain children. Refer to our API for more information.`)}}flattenArrayTypeChildren(e,t,r,o){return{...t,[e.type]:[...t[e.type]||[],{...r,...this.mapNestedChildrenToProps(e,o)}]}}mapObjectTypeChildren(e,t,r,o){switch(e.type){case"title":return{...t,[e.type]:o,titleAttributes:{...r}};case"body":return{...t,bodyAttributes:{...r}};case"html":return{...t,htmlAttributes:{...r}};default:return{...t,[e.type]:{...r}}}}mapArrayTypeChildrenToProps(e,t){let r={...t};return Object.keys(e).forEach(o=>{r={...r,[o]:e[o]}}),r}warnOnInvalidChildren(e,t){return ke(Ee.some(r=>e.type===r),typeof e.type=="function"?"You may be attempting to nest <Helmet> components within each other, which is not allowed. Refer to our API for more information.":`Only elements types ${Ee.join(", ")} are allowed. Helmet does not support rendering <${e.type}> elements. Refer to our API for more information.`),ke(!t||typeof t=="string"||Array.isArray(t)&&!t.some(r=>typeof r!="string"),`Helmet expects a string as a child of <${e.type}>. Did you forget to wrap your children in braces? ( <${e.type}>{\`\`}</${e.type}> ) Refer to our API for more information.`),!0}mapChildrenToProps(e,t){let r={};return j.Children.forEach(e,o=>{if(!o||!o.props)return;const{children:n,...a}=o.props,c=Object.keys(a).reduce((i,l)=>(i[br[l]||l]=a[l],i),{});let{type:s}=o;switch(typeof s=="symbol"?s=s.toString():this.warnOnInvalidChildren(o,n),s){case"Symbol(react.fragment)":t=this.mapChildrenToProps(n,t);break;case"link":case"meta":case"noscript":case"script":case"style":r=this.flattenArrayTypeChildren(o,r,c,n);break;default:t=this.mapObjectTypeChildren(o,t,c,n);break}}),this.mapArrayTypeChildrenToProps(r,t)}render(){const{children:e,...t}=this.props;let r={...t},{helmetData:o}=t;if(e&&(r=this.mapChildrenToProps(e,r)),o&&!(o instanceof le)){const n=o;o=new le(n.context,!0),delete r.helmetData}return o?j.createElement(Se,{...r,context:o.value}):j.createElement(Fe.Consumer,null,n=>j.createElement(Se,{...r,context:n}))}},M(ae,"defaultProps",{defer:!0,encodeSpecialCharacters:!0,prioritizeSeoTags:!1}),ae);const ro=({title:e})=>v.jsx(Ne,{children:v.jsx(Br,{children:v.jsx("title",{children:`Nuraida LMS | ${e}`})})});export{Gr as A,Jr as C,Lt as D,to as L,ro as P,lr as a,eo as b,er as c,nr as d,Zr as e,Xr as u};
