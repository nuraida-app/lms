const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/Preview-CB92xU3a.js","assets/index-BzybVbrz.js","assets/index-B8y-bJV1.css"])))=>i.map(i=>d[i]);
import{ap as de,aq as fe,S as U,at as m,r as _,ar as ye,ay as Kt,as as he,j as i,au as re,av as me,i as qt,az as Xt,aA as Qt,aB as Jt,aC as Te,aD as Zt,aE as er,c as Je,aF as tr,a as rr,aG as or}from"./index-BzybVbrz.js";import{L as nr}from"./Layout-CetHk5Pu.js";import{r as Ze,P as ar}from"./PageName-9XwMDVQ1.js";import{u as sr,r as ir}from"./createSvgIcon-CZqlXMQ-.js";import{d as lr,a as cr,b as ur}from"./YouTube-CTPwz6bA.js";import{f as pr}from"./FolderCopy-CKLfXymE.js";import{P as dr}from"./Paper-Dzbso0eQ.js";import{T as fr,g as ze,M as yr,F as hr}from"./Modal-D5yutoIL.js";import{u as mr}from"./useTheme-BALbJBkz.js";import{u as gr,a as _r,B as br}from"./Typography-C-qplh4g.js";import{c as et}from"./ExitToApp-CbGQ45gm.js";import{B as Pr}from"./Button-6o8cGekH.js";import"./ChevronRight-WhqIRLcc.js";import"./Storage-Djwg4jZV.js";import"./Toolbar-D4YRnJLK.js";import"./listItemIconClasses-DoJF8eQE.js";import"./IconButton-BB4rgvuw.js";import"./getThemeProps-Z5o_4JZP.js";import"./GlobalStyles-015m-8mF.js";function vr(e){return de("MuiCollapse",e)}fe("MuiCollapse",["root","horizontal","vertical","entered","hidden","wrapper","wrapperInner"]);const wr=["addEndListener","children","className","collapsedSize","component","easing","in","onEnter","onEntered","onEntering","onExit","onExited","onExiting","orientation","style","timeout","TransitionComponent"],Or=e=>{const{orientation:t,classes:r}=e,o={root:["root",`${t}`],entered:["entered"],hidden:["hidden"],wrapper:["wrapper",`${t}`],wrapperInner:["wrapperInner",`${t}`]};return me(o,vr,r)},Tr=U("div",{name:"MuiCollapse",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:r}=e;return[t.root,t[r.orientation],r.state==="entered"&&t.entered,r.state==="exited"&&!r.in&&r.collapsedSize==="0px"&&t.hidden]}})(({theme:e,ownerState:t})=>m({height:0,overflow:"hidden",transition:e.transitions.create("height")},t.orientation==="horizontal"&&{height:"auto",width:0,transition:e.transitions.create("width")},t.state==="entered"&&m({height:"auto",overflow:"visible"},t.orientation==="horizontal"&&{width:"auto"}),t.state==="exited"&&!t.in&&t.collapsedSize==="0px"&&{visibility:"hidden"})),Cr=U("div",{name:"MuiCollapse",slot:"Wrapper",overridesResolver:(e,t)=>t.wrapper})(({ownerState:e})=>m({display:"flex",width:"100%"},e.orientation==="horizontal"&&{width:"auto",height:"100%"})),xr=U("div",{name:"MuiCollapse",slot:"WrapperInner",overridesResolver:(e,t)=>t.wrapperInner})(({ownerState:e})=>m({width:"100%"},e.orientation==="horizontal"&&{width:"auto",height:"100%"})),tt=_.forwardRef(function(t,r){const o=ye({props:t,name:"MuiCollapse"}),{addEndListener:n,children:a,className:u,collapsedSize:l="0px",component:s,easing:d,in:p,onEnter:g,onEntered:S,onEntering:C,onExit:T,onExited:R,onExiting:A,orientation:w="vertical",style:D,timeout:M=Kt.standard,TransitionComponent:K=fr}=o,ve=he(o,wr),k=m({},o,{orientation:w,collapsedSize:l}),$=Or(k),q=mr(),we=gr(),I=_.useRef(null),X=_.useRef(),H=typeof l=="number"?`${l}px`:l,N=w==="horizontal",Q=N?"width":"height",le=_.useRef(null),Ht=_r(r,le),V=c=>E=>{if(c){const j=le.current;E===void 0?c(j):c(j,E)}},Oe=()=>I.current?I.current[N?"clientWidth":"clientHeight"]:0,Vt=V((c,E)=>{I.current&&N&&(I.current.style.position="absolute"),c.style[Q]=H,g&&g(c,E)}),zt=V((c,E)=>{const j=Oe();I.current&&N&&(I.current.style.position="");const{duration:J,easing:ce}=ze({style:D,timeout:M,easing:d},{mode:"enter"});if(M==="auto"){const Ve=q.transitions.getAutoHeightDuration(j);c.style.transitionDuration=`${Ve}ms`,X.current=Ve}else c.style.transitionDuration=typeof J=="string"?J:`${J}ms`;c.style[Q]=`${j}px`,c.style.transitionTimingFunction=ce,C&&C(c,E)}),Bt=V((c,E)=>{c.style[Q]="auto",S&&S(c,E)}),Ft=V(c=>{c.style[Q]=`${Oe()}px`,T&&T(c)}),Wt=V(R),Gt=V(c=>{const E=Oe(),{duration:j,easing:J}=ze({style:D,timeout:M,easing:d},{mode:"exit"});if(M==="auto"){const ce=q.transitions.getAutoHeightDuration(E);c.style.transitionDuration=`${ce}ms`,X.current=ce}else c.style.transitionDuration=typeof j=="string"?j:`${j}ms`;c.style[Q]=H,c.style.transitionTimingFunction=J,A&&A(c)}),Yt=c=>{M==="auto"&&we.start(X.current||0,c),n&&n(le.current,c)};return i.jsx(K,m({in:p,onEnter:Vt,onEntered:Bt,onEntering:zt,onExit:Ft,onExited:Wt,onExiting:Gt,addEndListener:Yt,nodeRef:le,timeout:M==="auto"?null:M},ve,{children:(c,E)=>i.jsx(Tr,m({as:s,className:re($.root,u,{entered:$.entered,exited:!p&&H==="0px"&&$.hidden}[c]),style:m({[N?"minWidth":"minHeight"]:H},D),ref:Ht},E,{ownerState:m({},k,{state:c}),children:i.jsx(Cr,{ownerState:m({},k,{state:c}),className:$.wrapper,ref:I,children:i.jsx(xr,{ownerState:m({},k,{state:c}),className:$.wrapperInner,children:a})})}))}))});tt.muiSupportAuto=!0;const rt=_.createContext({});function Sr(e){return de("MuiAccordion",e)}const ue=fe("MuiAccordion",["root","rounded","expanded","disabled","gutters","region"]),Er=["children","className","defaultExpanded","disabled","disableGutters","expanded","onChange","square","slots","slotProps","TransitionComponent","TransitionProps"],Ar=e=>{const{classes:t,square:r,expanded:o,disabled:n,disableGutters:a}=e;return me({root:["root",!r&&"rounded",o&&"expanded",n&&"disabled",!a&&"gutters"],region:["region"]},Sr,t)},Rr=U(dr,{name:"MuiAccordion",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:r}=e;return[{[`& .${ue.region}`]:t.region},t.root,!r.square&&t.rounded,!r.disableGutters&&t.gutters]}})(({theme:e})=>{const t={duration:e.transitions.duration.shortest};return{position:"relative",transition:e.transitions.create(["margin"],t),overflowAnchor:"none","&::before":{position:"absolute",left:0,top:-1,right:0,height:1,content:'""',opacity:1,backgroundColor:(e.vars||e).palette.divider,transition:e.transitions.create(["opacity","background-color"],t)},"&:first-of-type":{"&::before":{display:"none"}},[`&.${ue.expanded}`]:{"&::before":{opacity:0},"&:first-of-type":{marginTop:0},"&:last-of-type":{marginBottom:0},"& + &":{"&::before":{display:"none"}}},[`&.${ue.disabled}`]:{backgroundColor:(e.vars||e).palette.action.disabledBackground}}},({theme:e})=>({variants:[{props:t=>!t.square,style:{borderRadius:0,"&:first-of-type":{borderTopLeftRadius:(e.vars||e).shape.borderRadius,borderTopRightRadius:(e.vars||e).shape.borderRadius},"&:last-of-type":{borderBottomLeftRadius:(e.vars||e).shape.borderRadius,borderBottomRightRadius:(e.vars||e).shape.borderRadius,"@supports (-ms-ime-align: auto)":{borderBottomLeftRadius:0,borderBottomRightRadius:0}}}},{props:t=>!t.disableGutters,style:{[`&.${ue.expanded}`]:{margin:"16px 0"}}}]})),ot=_.forwardRef(function(t,r){const o=ye({props:t,name:"MuiAccordion"}),{children:n,className:a,defaultExpanded:u=!1,disabled:l=!1,disableGutters:s=!1,expanded:d,onChange:p,square:g=!1,slots:S={},slotProps:C={},TransitionComponent:T,TransitionProps:R}=o,A=he(o,Er),[w,D]=sr({controlled:d,default:u,name:"Accordion",state:"expanded"}),M=_.useCallback(N=>{D(!w),p&&p(N,!w)},[w,p,D]),[K,...ve]=_.Children.toArray(n),k=_.useMemo(()=>({expanded:w,disabled:l,disableGutters:s,toggle:M}),[w,l,s,M]),$=m({},o,{square:g,disabled:l,disableGutters:s,expanded:w}),q=Ar($),we=m({transition:T},S),I=m({transition:R},C),[X,H]=pr("transition",{elementType:tt,externalForwardedProps:{slots:we,slotProps:I},ownerState:$});return i.jsxs(Rr,m({className:re(q.root,a),ref:r,ownerState:$,square:g},A,{children:[i.jsx(rt.Provider,{value:k,children:K}),i.jsx(X,m({in:w,timeout:"auto"},H,{children:i.jsx("div",{"aria-labelledby":K.props.id,id:K.props["aria-controls"],role:"region",className:q.region,children:ve})}))]}))});function Mr(e){return de("MuiAccordionDetails",e)}fe("MuiAccordionDetails",["root"]);const $r=["className"],Ir=e=>{const{classes:t}=e;return me({root:["root"]},Mr,t)},jr=U("div",{name:"MuiAccordionDetails",slot:"Root",overridesResolver:(e,t)=>t.root})(({theme:e})=>({padding:e.spacing(1,2,2)})),nt=_.forwardRef(function(t,r){const o=ye({props:t,name:"MuiAccordionDetails"}),{className:n}=o,a=he(o,$r),u=o,l=Ir(u);return i.jsx(jr,m({className:re(l.root,n),ref:r,ownerState:u},a))});function Dr(e){return de("MuiAccordionSummary",e)}const G=fe("MuiAccordionSummary",["root","expanded","focusVisible","disabled","gutters","contentGutters","content","expandIconWrapper"]),Lr=["children","className","expandIcon","focusVisibleClassName","onClick"],Ur=e=>{const{classes:t,expanded:r,disabled:o,disableGutters:n}=e;return me({root:["root",r&&"expanded",o&&"disabled",!n&&"gutters"],focusVisible:["focusVisible"],content:["content",r&&"expanded",!n&&"contentGutters"],expandIconWrapper:["expandIconWrapper",r&&"expanded"]},Dr,t)},Nr=U(br,{name:"MuiAccordionSummary",slot:"Root",overridesResolver:(e,t)=>t.root})(({theme:e})=>{const t={duration:e.transitions.duration.shortest};return{display:"flex",minHeight:48,padding:e.spacing(0,2),transition:e.transitions.create(["min-height","background-color"],t),[`&.${G.focusVisible}`]:{backgroundColor:(e.vars||e).palette.action.focus},[`&.${G.disabled}`]:{opacity:(e.vars||e).palette.action.disabledOpacity},[`&:hover:not(.${G.disabled})`]:{cursor:"pointer"},variants:[{props:r=>!r.disableGutters,style:{[`&.${G.expanded}`]:{minHeight:64}}}]}}),kr=U("div",{name:"MuiAccordionSummary",slot:"Content",overridesResolver:(e,t)=>t.content})(({theme:e})=>({display:"flex",flexGrow:1,margin:"12px 0",variants:[{props:t=>!t.disableGutters,style:{transition:e.transitions.create(["margin"],{duration:e.transitions.duration.shortest}),[`&.${G.expanded}`]:{margin:"20px 0"}}}]})),Hr=U("div",{name:"MuiAccordionSummary",slot:"ExpandIconWrapper",overridesResolver:(e,t)=>t.expandIconWrapper})(({theme:e})=>({display:"flex",color:(e.vars||e).palette.action.active,transform:"rotate(0deg)",transition:e.transitions.create("transform",{duration:e.transitions.duration.shortest}),[`&.${G.expanded}`]:{transform:"rotate(180deg)"}})),at=_.forwardRef(function(t,r){const o=ye({props:t,name:"MuiAccordionSummary"}),{children:n,className:a,expandIcon:u,focusVisibleClassName:l,onClick:s}=o,d=he(o,Lr),{disabled:p=!1,disableGutters:g,expanded:S,toggle:C}=_.useContext(rt),T=w=>{C&&C(w),s&&s(w)},R=m({},o,{expanded:S,disabled:p,disableGutters:g}),A=Ur(R);return i.jsxs(Nr,m({focusRipple:!1,disableRipple:!0,disabled:p,component:"div","aria-expanded":S,className:re(A.root,a),focusVisibleClassName:re(A.focusVisible,l),onClick:T,ref:r,ownerState:R},d,{children:[i.jsx(kr,{className:A.content,ownerState:R,children:n}),u&&i.jsx(Hr,{className:A.expandIconWrapper,ownerState:R,children:u})]}))});var Ie={},Vr=qt;Object.defineProperty(Ie,"__esModule",{value:!0});var je=Ie.default=void 0,zr=Vr(ir()),Br=i;je=Ie.default=(0,zr.default)((0,Br.jsx)("path",{d:"M16.59 8.59 12 13.17 7.41 8.59 6 10l6 6 6-6z"}),"ExpandMore");var Fr=function(t){return Wr(t)&&!Gr(t)};function Wr(e){return!!e&&typeof e=="object"}function Gr(e){var t=Object.prototype.toString.call(e);return t==="[object RegExp]"||t==="[object Date]"||qr(e)}var Yr=typeof Symbol=="function"&&Symbol.for,Kr=Yr?Symbol.for("react.element"):60103;function qr(e){return e.$$typeof===Kr}function Xr(e){return Array.isArray(e)?[]:{}}function oe(e,t){return t.clone!==!1&&t.isMergeableObject(e)?Y(Xr(e),e,t):e}function Qr(e,t,r){return e.concat(t).map(function(o){return oe(o,r)})}function Jr(e,t){if(!t.customMerge)return Y;var r=t.customMerge(e);return typeof r=="function"?r:Y}function Zr(e){return Object.getOwnPropertySymbols?Object.getOwnPropertySymbols(e).filter(function(t){return Object.propertyIsEnumerable.call(e,t)}):[]}function Be(e){return Object.keys(e).concat(Zr(e))}function st(e,t){try{return t in e}catch{return!1}}function eo(e,t){return st(e,t)&&!(Object.hasOwnProperty.call(e,t)&&Object.propertyIsEnumerable.call(e,t))}function to(e,t,r){var o={};return r.isMergeableObject(e)&&Be(e).forEach(function(n){o[n]=oe(e[n],r)}),Be(t).forEach(function(n){eo(e,n)||(st(e,n)&&r.isMergeableObject(t[n])?o[n]=Jr(n,r)(e[n],t[n],r):o[n]=oe(t[n],r))}),o}function Y(e,t,r){r=r||{},r.arrayMerge=r.arrayMerge||Qr,r.isMergeableObject=r.isMergeableObject||Fr,r.cloneUnlessOtherwiseSpecified=oe;var o=Array.isArray(t),n=Array.isArray(e),a=o===n;return a?o?r.arrayMerge(e,t,r):to(e,t,r):oe(t,r)}Y.all=function(t,r){if(!Array.isArray(t))throw new Error("first argument should be an array");return t.reduce(function(o,n){return Y(o,n,r)},{})};var ro=Y,it=ro,Fe=Number.isNaN||function(t){return typeof t=="number"&&t!==t};function oo(e,t){return!!(e===t||Fe(e)&&Fe(t))}function no(e,t){if(e.length!==t.length)return!1;for(var r=0;r<e.length;r++)if(!oo(e[r],t[r]))return!1;return!0}function ao(e,t){t===void 0&&(t=no);var r,o=[],n,a=!1;function u(){for(var l=[],s=0;s<arguments.length;s++)l[s]=arguments[s];return a&&r===this&&t(l,o)||(n=e.apply(this,l),a=!0,r=this,o=l),n}return u}const so=Object.freeze(Object.defineProperty({__proto__:null,default:ao},Symbol.toStringTag,{value:"Module"})),io=Xt(so);var lo=Object.create,ge=Object.defineProperty,co=Object.getOwnPropertyDescriptor,uo=Object.getOwnPropertyNames,po=Object.getPrototypeOf,fo=Object.prototype.hasOwnProperty,yo=(e,t)=>{for(var r in t)ge(e,r,{get:t[r],enumerable:!0})},lt=(e,t,r,o)=>{if(t&&typeof t=="object"||typeof t=="function")for(let n of uo(t))!fo.call(e,n)&&n!==r&&ge(e,n,{get:()=>t[n],enumerable:!(o=co(t,n))||o.enumerable});return e},ho=(e,t,r)=>(r=e!=null?lo(po(e)):{},lt(!e||!e.__esModule?ge(r,"default",{value:e,enumerable:!0}):r,e)),mo=e=>lt(ge({},"__esModule",{value:!0}),e),ct={};yo(ct,{defaultProps:()=>bo,propTypes:()=>_o});var ut=mo(ct),go=ho(Qt());const{string:b,bool:O,number:z,array:Ce,oneOfType:Z,shape:x,object:v,func:h,node:We}=go.default,_o={url:Z([b,Ce,v]),playing:O,loop:O,controls:O,volume:z,muted:O,playbackRate:z,width:Z([b,z]),height:Z([b,z]),style:v,progressInterval:z,playsinline:O,pip:O,stopOnUnmount:O,light:Z([O,b,v]),playIcon:We,previewTabIndex:z,previewAriaLabel:b,fallback:We,oEmbedUrl:b,wrapper:Z([b,h,x({render:h.isRequired})]),config:x({soundcloud:x({options:v}),youtube:x({playerVars:v,embedOptions:v,onUnstarted:h}),facebook:x({appId:b,version:b,playerId:b,attributes:v}),dailymotion:x({params:v}),vimeo:x({playerOptions:v,title:b}),mux:x({attributes:v,version:b}),file:x({attributes:v,tracks:Ce,forceVideo:O,forceAudio:O,forceHLS:O,forceSafariHLS:O,forceDisableHls:O,forceDASH:O,forceFLV:O,hlsOptions:v,hlsVersion:b,dashVersion:b,flvVersion:b}),wistia:x({options:v,playerId:b,customControls:Ce}),mixcloud:x({options:v}),twitch:x({options:v,playerId:b}),vidyard:x({options:v})}),onReady:h,onStart:h,onPlay:h,onPause:h,onBuffer:h,onBufferEnd:h,onEnded:h,onError:h,onDuration:h,onSeek:h,onPlaybackRateChange:h,onPlaybackQualityChange:h,onProgress:h,onClickPreview:h,onEnablePIP:h,onDisablePIP:h},P=()=>{},bo={playing:!1,loop:!1,controls:!1,volume:null,muted:!1,playbackRate:1,width:"640px",height:"360px",style:{},progressInterval:1e3,playsinline:!1,pip:!1,stopOnUnmount:!0,light:!1,fallback:null,wrapper:"div",previewTabIndex:0,previewAriaLabel:"",oEmbedUrl:"https://noembed.com/embed?url={url}",config:{soundcloud:{options:{visual:!0,buying:!1,liking:!1,download:!1,sharing:!1,show_comments:!1,show_playcount:!1}},youtube:{playerVars:{playsinline:1,showinfo:0,rel:0,iv_load_policy:3,modestbranding:1},embedOptions:{},onUnstarted:P},facebook:{appId:"1309697205772819",version:"v3.3",playerId:null,attributes:{}},dailymotion:{params:{api:1,"endscreen-enable":!1}},vimeo:{playerOptions:{autopause:!1,byline:!1,portrait:!1,title:!1},title:null},mux:{attributes:{},version:"2"},file:{attributes:{},tracks:[],forceVideo:!1,forceAudio:!1,forceHLS:!1,forceDASH:!1,forceFLV:!1,hlsOptions:{},hlsVersion:"1.1.4",dashVersion:"3.1.3",flvVersion:"1.5.0",forceDisableHls:!1},wistia:{options:{},playerId:null,customControls:null},mixcloud:{options:{hide_cover:1}},twitch:{options:{},playerId:null},vidyard:{options:{}}},onReady:P,onStart:P,onPlay:P,onPause:P,onBuffer:P,onBufferEnd:P,onEnded:P,onError:P,onDuration:P,onSeek:P,onPlaybackRateChange:P,onPlaybackQualityChange:P,onProgress:P,onClickPreview:P,onEnablePIP:P,onDisablePIP:P};var Po=function(t,r,o){var n=document.head||document.getElementsByTagName("head")[0],a=document.createElement("script");typeof r=="function"&&(o=r,r={}),r=r||{},o=o||function(){},a.type=r.type||"text/javascript",a.charset=r.charset||"utf8",a.async="async"in r?!!r.async:!0,a.src=t,r.attrs&&vo(a,r.attrs),r.text&&(a.text=""+r.text);var u="onload"in a?Ge:wo;u(a,o),a.onload||Ge(a,o),n.appendChild(a)};function vo(e,t){for(var r in t)e.setAttribute(r,t[r])}function Ge(e,t){e.onload=function(){this.onerror=this.onload=null,t(null,e)},e.onerror=function(){this.onerror=this.onload=null,t(new Error("Failed to load "+this.src),e)}}function wo(e,t){e.onreadystatechange=function(){this.readyState!="complete"&&this.readyState!="loaded"||(this.onreadystatechange=null,t(null,e))}}var Oo=Object.create,_e=Object.defineProperty,To=Object.getOwnPropertyDescriptor,Co=Object.getOwnPropertyNames,xo=Object.getPrototypeOf,So=Object.prototype.hasOwnProperty,Eo=(e,t)=>{for(var r in t)_e(e,r,{get:t[r],enumerable:!0})},pt=(e,t,r,o)=>{if(t&&typeof t=="object"||typeof t=="function")for(let n of Co(t))!So.call(e,n)&&n!==r&&_e(e,n,{get:()=>t[n],enumerable:!(o=To(t,n))||o.enumerable});return e},De=(e,t,r)=>(r=e!=null?Oo(xo(e)):{},pt(!e||!e.__esModule?_e(r,"default",{value:e,enumerable:!0}):r,e)),Ao=e=>pt(_e({},"__esModule",{value:!0}),e),dt={};Eo(dt,{callPlayer:()=>Wo,getConfig:()=>Bo,getSDK:()=>zo,isBlobUrl:()=>Yo,isMediaStream:()=>Go,lazy:()=>Io,omit:()=>Fo,parseEndTime:()=>ko,parseStartTime:()=>No,queryString:()=>Vo,randomString:()=>Ho,supportsWebKitPresentationMode:()=>Ko});var be=Ao(dt),Ro=De(_),Mo=De(Po),$o=De(it);const Io=e=>Ro.default.lazy(async()=>{const t=await e();return typeof t.default=="function"?t:t.default}),jo=/[?&#](?:start|t)=([0-9hms]+)/,Do=/[?&#]end=([0-9hms]+)/,Re=/(\d+)(h|m|s)/g,Lo=/^\d+$/;function ft(e,t){if(e instanceof Array)return;const r=e.match(t);if(r){const o=r[1];if(o.match(Re))return Uo(o);if(Lo.test(o))return parseInt(o)}}function Uo(e){let t=0,r=Re.exec(e);for(;r!==null;){const[,o,n]=r;n==="h"&&(t+=parseInt(o,10)*60*60),n==="m"&&(t+=parseInt(o,10)*60),n==="s"&&(t+=parseInt(o,10)),r=Re.exec(e)}return t}function No(e){return ft(e,jo)}function ko(e){return ft(e,Do)}function Ho(){return Math.random().toString(36).substr(2,5)}function Vo(e){return Object.keys(e).map(t=>`${t}=${e[t]}`).join("&")}function xe(e){return window[e]?window[e]:window.exports&&window.exports[e]?window.exports[e]:window.module&&window.module.exports&&window.module.exports[e]?window.module.exports[e]:null}const B={},zo=function(t,r,o=null,n=()=>!0,a=Mo.default){const u=xe(r);return u&&n(u)?Promise.resolve(u):new Promise((l,s)=>{if(B[t]){B[t].push({resolve:l,reject:s});return}B[t]=[{resolve:l,reject:s}];const d=p=>{B[t].forEach(g=>g.resolve(p))};if(o){const p=window[o];window[o]=function(){p&&p(),d(xe(r))}}a(t,p=>{p?(B[t].forEach(g=>g.reject(p)),B[t]=null):o||d(xe(r))})})};function Bo(e,t){return(0,$o.default)(t.config,e.config)}function Fo(e,...t){const r=[].concat(...t),o={},n=Object.keys(e);for(const a of n)r.indexOf(a)===-1&&(o[a]=e[a]);return o}function Wo(e,...t){if(!this.player||!this.player[e]){let r=`ReactPlayer: ${this.constructor.displayName} player could not call %c${e}%c – `;return this.player?this.player[e]||(r+="The method was not available"):r+="The player was not available",console.warn(r,"font-weight: bold",""),null}return this.player[e](...t)}function Go(e){return typeof window<"u"&&typeof window.MediaStream<"u"&&e instanceof window.MediaStream}function Yo(e){return/^blob:/.test(e)}function Ko(e=document.createElement("video")){const t=/iPhone|iPod/.test(navigator.userAgent)===!1;return e.webkitSupportsPresentationMode&&typeof e.webkitSetPresentationMode=="function"&&t}var qo=Object.create,ne=Object.defineProperty,Xo=Object.getOwnPropertyDescriptor,Qo=Object.getOwnPropertyNames,Jo=Object.getPrototypeOf,Zo=Object.prototype.hasOwnProperty,en=(e,t,r)=>t in e?ne(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,tn=(e,t)=>{for(var r in t)ne(e,r,{get:t[r],enumerable:!0})},yt=(e,t,r,o)=>{if(t&&typeof t=="object"||typeof t=="function")for(let n of Qo(t))!Zo.call(e,n)&&n!==r&&ne(e,n,{get:()=>t[n],enumerable:!(o=Xo(t,n))||o.enumerable});return e},ht=(e,t,r)=>(r=e!=null?qo(Jo(e)):{},yt(!e||!e.__esModule?ne(r,"default",{value:e,enumerable:!0}):r,e)),rn=e=>yt(ne({},"__esModule",{value:!0}),e),y=(e,t,r)=>(en(e,typeof t!="symbol"?t+"":t,r),r),mt={};tn(mt,{default:()=>Pe});var on=rn(mt),Ye=ht(_),nn=ht(Ze),gt=ut,an=be;const sn=5e3;let Pe=class extends Ye.Component{constructor(){super(...arguments),y(this,"mounted",!1),y(this,"isReady",!1),y(this,"isPlaying",!1),y(this,"isLoading",!0),y(this,"loadOnReady",null),y(this,"startOnPlay",!0),y(this,"seekOnPlay",null),y(this,"onDurationCalled",!1),y(this,"handlePlayerMount",t=>{if(this.player){this.progress();return}this.player=t,this.player.load(this.props.url),this.progress()}),y(this,"getInternalPlayer",t=>this.player?this.player[t]:null),y(this,"progress",()=>{if(this.props.url&&this.player&&this.isReady){const t=this.getCurrentTime()||0,r=this.getSecondsLoaded(),o=this.getDuration();if(o){const n={playedSeconds:t,played:t/o};r!==null&&(n.loadedSeconds=r,n.loaded=r/o),(n.playedSeconds!==this.prevPlayed||n.loadedSeconds!==this.prevLoaded)&&this.props.onProgress(n),this.prevPlayed=n.playedSeconds,this.prevLoaded=n.loadedSeconds}}this.progressTimeout=setTimeout(this.progress,this.props.progressFrequency||this.props.progressInterval)}),y(this,"handleReady",()=>{if(!this.mounted)return;this.isReady=!0,this.isLoading=!1;const{onReady:t,playing:r,volume:o,muted:n}=this.props;t(),!n&&o!==null&&this.player.setVolume(o),this.loadOnReady?(this.player.load(this.loadOnReady,!0),this.loadOnReady=null):r&&this.player.play(),this.handleDurationCheck()}),y(this,"handlePlay",()=>{this.isPlaying=!0,this.isLoading=!1;const{onStart:t,onPlay:r,playbackRate:o}=this.props;this.startOnPlay&&(this.player.setPlaybackRate&&o!==1&&this.player.setPlaybackRate(o),t(),this.startOnPlay=!1),r(),this.seekOnPlay&&(this.seekTo(this.seekOnPlay),this.seekOnPlay=null),this.handleDurationCheck()}),y(this,"handlePause",t=>{this.isPlaying=!1,this.isLoading||this.props.onPause(t)}),y(this,"handleEnded",()=>{const{activePlayer:t,loop:r,onEnded:o}=this.props;t.loopOnEnded&&r&&this.seekTo(0),r||(this.isPlaying=!1,o())}),y(this,"handleError",(...t)=>{this.isLoading=!1,this.props.onError(...t)}),y(this,"handleDurationCheck",()=>{clearTimeout(this.durationCheckTimeout);const t=this.getDuration();t?this.onDurationCalled||(this.props.onDuration(t),this.onDurationCalled=!0):this.durationCheckTimeout=setTimeout(this.handleDurationCheck,100)}),y(this,"handleLoaded",()=>{this.isLoading=!1})}componentDidMount(){this.mounted=!0}componentWillUnmount(){clearTimeout(this.progressTimeout),clearTimeout(this.durationCheckTimeout),this.isReady&&this.props.stopOnUnmount&&(this.player.stop(),this.player.disablePIP&&this.player.disablePIP()),this.mounted=!1}componentDidUpdate(t){if(!this.player)return;const{url:r,playing:o,volume:n,muted:a,playbackRate:u,pip:l,loop:s,activePlayer:d,disableDeferredLoading:p}=this.props;if(!(0,nn.default)(t.url,r)){if(this.isLoading&&!d.forceLoad&&!p&&!(0,an.isMediaStream)(r)){console.warn(`ReactPlayer: the attempt to load ${r} is being deferred until the player has loaded`),this.loadOnReady=r;return}this.isLoading=!0,this.startOnPlay=!0,this.onDurationCalled=!1,this.player.load(r,this.isReady)}!t.playing&&o&&!this.isPlaying&&this.player.play(),t.playing&&!o&&this.isPlaying&&this.player.pause(),!t.pip&&l&&this.player.enablePIP&&this.player.enablePIP(),t.pip&&!l&&this.player.disablePIP&&this.player.disablePIP(),t.volume!==n&&n!==null&&this.player.setVolume(n),t.muted!==a&&(a?this.player.mute():(this.player.unmute(),n!==null&&setTimeout(()=>this.player.setVolume(n)))),t.playbackRate!==u&&this.player.setPlaybackRate&&this.player.setPlaybackRate(u),t.loop!==s&&this.player.setLoop&&this.player.setLoop(s)}getDuration(){return this.isReady?this.player.getDuration():null}getCurrentTime(){return this.isReady?this.player.getCurrentTime():null}getSecondsLoaded(){return this.isReady?this.player.getSecondsLoaded():null}seekTo(t,r,o){if(!this.isReady){t!==0&&(this.seekOnPlay=t,setTimeout(()=>{this.seekOnPlay=null},sn));return}if(r?r==="fraction":t>0&&t<1){const a=this.player.getDuration();if(!a){console.warn("ReactPlayer: could not seek using fraction – duration not yet available");return}this.player.seekTo(a*t,o);return}this.player.seekTo(t,o)}render(){const t=this.props.activePlayer;return t?Ye.default.createElement(t,{...this.props,onMount:this.handlePlayerMount,onReady:this.handleReady,onPlay:this.handlePlay,onPause:this.handlePause,onEnded:this.handleEnded,onLoaded:this.handleLoaded,onError:this.handleError}):null}};y(Pe,"displayName","Player");y(Pe,"propTypes",gt.propTypes);y(Pe,"defaultProps",gt.defaultProps);var ln=Object.create,ae=Object.defineProperty,cn=Object.getOwnPropertyDescriptor,un=Object.getOwnPropertyNames,pn=Object.getPrototypeOf,dn=Object.prototype.hasOwnProperty,fn=(e,t,r)=>t in e?ae(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,yn=(e,t)=>{for(var r in t)ae(e,r,{get:t[r],enumerable:!0})},_t=(e,t,r,o)=>{if(t&&typeof t=="object"||typeof t=="function")for(let n of un(t))!dn.call(e,n)&&n!==r&&ae(e,n,{get:()=>t[n],enumerable:!(o=cn(t,n))||o.enumerable});return e},se=(e,t,r)=>(r=e!=null?ln(pn(e)):{},_t(!e||!e.__esModule?ae(r,"default",{value:e,enumerable:!0}):r,e)),hn=e=>_t(ae({},"__esModule",{value:!0}),e),f=(e,t,r)=>(fn(e,typeof t!="symbol"?t+"":t,r),r),bt={};yn(bt,{createReactPlayer:()=>Tn});var mn=hn(bt),W=se(_),gn=se(it),Se=se(io),Ke=se(Ze),te=ut,Pt=be,_n=se(on);const bn=(0,Pt.lazy)(()=>Jt(()=>import("./Preview-CB92xU3a.js").then(e=>e.P),__vite__mapDeps([0,1,2]))),Pn=typeof window<"u"&&window.document&&typeof document<"u",vn=typeof Te<"u"&&Te.window&&Te.window.document,wn=Object.keys(te.propTypes),On=Pn||vn?W.Suspense:()=>null,ee=[],Tn=(e,t)=>{var r;return r=class extends W.Component{constructor(){super(...arguments),f(this,"state",{showPreview:!!this.props.light}),f(this,"references",{wrapper:o=>{this.wrapper=o},player:o=>{this.player=o}}),f(this,"handleClickPreview",o=>{this.setState({showPreview:!1}),this.props.onClickPreview(o)}),f(this,"showPreview",()=>{this.setState({showPreview:!0})}),f(this,"getDuration",()=>this.player?this.player.getDuration():null),f(this,"getCurrentTime",()=>this.player?this.player.getCurrentTime():null),f(this,"getSecondsLoaded",()=>this.player?this.player.getSecondsLoaded():null),f(this,"getInternalPlayer",(o="player")=>this.player?this.player.getInternalPlayer(o):null),f(this,"seekTo",(o,n,a)=>{if(!this.player)return null;this.player.seekTo(o,n,a)}),f(this,"handleReady",()=>{this.props.onReady(this)}),f(this,"getActivePlayer",(0,Se.default)(o=>{for(const n of[...ee,...e])if(n.canPlay(o))return n;return t||null})),f(this,"getConfig",(0,Se.default)((o,n)=>{const{config:a}=this.props;return gn.default.all([te.defaultProps.config,te.defaultProps.config[n]||{},a,a[n]||{}])})),f(this,"getAttributes",(0,Se.default)(o=>(0,Pt.omit)(this.props,wn))),f(this,"renderActivePlayer",o=>{if(!o)return null;const n=this.getActivePlayer(o);if(!n)return null;const a=this.getConfig(o,n.key);return W.default.createElement(_n.default,{...this.props,key:n.key,ref:this.references.player,config:a,activePlayer:n.lazyPlayer||n,onReady:this.handleReady})})}shouldComponentUpdate(o,n){return!(0,Ke.default)(this.props,o)||!(0,Ke.default)(this.state,n)}componentDidUpdate(o){const{light:n}=this.props;!o.light&&n&&this.setState({showPreview:!0}),o.light&&!n&&this.setState({showPreview:!1})}renderPreview(o){if(!o)return null;const{light:n,playIcon:a,previewTabIndex:u,oEmbedUrl:l,previewAriaLabel:s}=this.props;return W.default.createElement(bn,{url:o,light:n,playIcon:a,previewTabIndex:u,previewAriaLabel:s,oEmbedUrl:l,onClick:this.handleClickPreview})}render(){const{url:o,style:n,width:a,height:u,fallback:l,wrapper:s}=this.props,{showPreview:d}=this.state,p=this.getAttributes(o),g=typeof s=="string"?this.references.wrapper:void 0;return W.default.createElement(s,{ref:g,style:{...n,width:a,height:u},...p},W.default.createElement(On,{fallback:l},d?this.renderPreview(o):this.renderActivePlayer(o)))}},f(r,"displayName","ReactPlayer"),f(r,"propTypes",te.propTypes),f(r,"defaultProps",te.defaultProps),f(r,"addCustomPlayer",o=>{ee.push(o)}),f(r,"removeCustomPlayers",()=>{ee.length=0}),f(r,"canPlay",o=>{for(const n of[...ee,...e])if(n.canPlay(o))return!0;return!1}),f(r,"canEnablePIP",o=>{for(const n of[...ee,...e])if(n.canEnablePIP&&n.canEnablePIP(o))return!0;return!1}),r};var Le=Object.defineProperty,Cn=Object.getOwnPropertyDescriptor,xn=Object.getOwnPropertyNames,Sn=Object.prototype.hasOwnProperty,En=(e,t)=>{for(var r in t)Le(e,r,{get:t[r],enumerable:!0})},An=(e,t,r,o)=>{if(t&&typeof t=="object"||typeof t=="function")for(let n of xn(t))!Sn.call(e,n)&&n!==r&&Le(e,n,{get:()=>t[n],enumerable:!(o=Cn(t,n))||o.enumerable});return e},Rn=e=>An(Le({},"__esModule",{value:!0}),e),vt={};En(vt,{AUDIO_EXTENSIONS:()=>Ue,DASH_EXTENSIONS:()=>Dt,FLV_EXTENSIONS:()=>Lt,HLS_EXTENSIONS:()=>ke,MATCH_URL_DAILYMOTION:()=>Mt,MATCH_URL_FACEBOOK:()=>Ct,MATCH_URL_FACEBOOK_WATCH:()=>xt,MATCH_URL_KALTURA:()=>jt,MATCH_URL_MIXCLOUD:()=>$t,MATCH_URL_MUX:()=>Tt,MATCH_URL_SOUNDCLOUD:()=>wt,MATCH_URL_STREAMABLE:()=>St,MATCH_URL_TWITCH_CHANNEL:()=>Rt,MATCH_URL_TWITCH_VIDEO:()=>At,MATCH_URL_VIDYARD:()=>It,MATCH_URL_VIMEO:()=>Ot,MATCH_URL_WISTIA:()=>Et,MATCH_URL_YOUTUBE:()=>Me,VIDEO_EXTENSIONS:()=>Ne,canPlay:()=>$n});var Mn=Rn(vt),qe=be;const Me=/(?:youtu\.be\/|youtube(?:-nocookie|education)?\.com\/(?:embed\/|v\/|watch\/|watch\?v=|watch\?.+&v=|shorts\/|live\/))((\w|-){11})|youtube\.com\/playlist\?list=|youtube\.com\/user\//,wt=/(?:soundcloud\.com|snd\.sc)\/[^.]+$/,Ot=/vimeo\.com\/(?!progressive_redirect).+/,Tt=/stream\.mux\.com\/(?!\w+\.m3u8)(\w+)/,Ct=/^https?:\/\/(www\.)?facebook\.com.*\/(video(s)?|watch|story)(\.php?|\/).+$/,xt=/^https?:\/\/fb\.watch\/.+$/,St=/streamable\.com\/([a-z0-9]+)$/,Et=/(?:wistia\.(?:com|net)|wi\.st)\/(?:medias|embed)\/(?:iframe\/)?([^?]+)/,At=/(?:www\.|go\.)?twitch\.tv\/videos\/(\d+)($|\?)/,Rt=/(?:www\.|go\.)?twitch\.tv\/([a-zA-Z0-9_]+)($|\?)/,Mt=/^(?:(?:https?):)?(?:\/\/)?(?:www\.)?(?:(?:dailymotion\.com(?:\/embed)?\/video)|dai\.ly)\/([a-zA-Z0-9]+)(?:_[\w_-]+)?(?:[\w.#_-]+)?/,$t=/mixcloud\.com\/([^/]+\/[^/]+)/,It=/vidyard.com\/(?:watch\/)?([a-zA-Z0-9-_]+)/,jt=/^https?:\/\/[a-zA-Z]+\.kaltura.(com|org)\/p\/([0-9]+)\/sp\/([0-9]+)00\/embedIframeJs\/uiconf_id\/([0-9]+)\/partner_id\/([0-9]+)(.*)entry_id.([a-zA-Z0-9-_].*)$/,Ue=/\.(m4a|m4b|mp4a|mpga|mp2|mp2a|mp3|m2a|m3a|wav|weba|aac|oga|spx)($|\?)/i,Ne=/\.(mp4|og[gv]|webm|mov|m4v)(#t=[,\d+]+)?($|\?)/i,ke=/\.(m3u8)($|\?)/i,Dt=/\.(mpd)($|\?)/i,Lt=/\.(flv)($|\?)/i,$e=e=>{if(e instanceof Array){for(const t of e)if(typeof t=="string"&&$e(t)||$e(t.src))return!0;return!1}return(0,qe.isMediaStream)(e)||(0,qe.isBlobUrl)(e)?!0:Ue.test(e)||Ne.test(e)||ke.test(e)||Dt.test(e)||Lt.test(e)},$n={youtube:e=>e instanceof Array?e.every(t=>Me.test(t)):Me.test(e),soundcloud:e=>wt.test(e)&&!Ue.test(e),vimeo:e=>Ot.test(e)&&!Ne.test(e)&&!ke.test(e),mux:e=>Tt.test(e),facebook:e=>Ct.test(e)||xt.test(e),streamable:e=>St.test(e),wistia:e=>Et.test(e),twitch:e=>At.test(e)||Rt.test(e),dailymotion:e=>Mt.test(e),mixcloud:e=>$t.test(e),vidyard:e=>It.test(e),kaltura:e=>jt.test(e),file:$e};var In=Object.create,ie=Object.defineProperty,jn=Object.getOwnPropertyDescriptor,Dn=Object.getOwnPropertyNames,Ln=Object.getPrototypeOf,Un=Object.prototype.hasOwnProperty,Nn=(e,t,r)=>t in e?ie(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,kn=(e,t)=>{for(var r in t)ie(e,r,{get:t[r],enumerable:!0})},Ut=(e,t,r,o)=>{if(t&&typeof t=="object"||typeof t=="function")for(let n of Dn(t))!Un.call(e,n)&&n!==r&&ie(e,n,{get:()=>t[n],enumerable:!(o=jn(t,n))||o.enumerable});return e},Hn=(e,t,r)=>(r=e!=null?In(Ln(e)):{},Ut(!e||!e.__esModule?ie(r,"default",{value:e,enumerable:!0}):r,e)),Vn=e=>Ut(ie({},"__esModule",{value:!0}),e),L=(e,t,r)=>(Nn(e,typeof t!="symbol"?t+"":t,r),r),Nt={};kn(Nt,{default:()=>He});var zn=Vn(Nt),Ee=Hn(_),F=be,kt=Mn;const Bn="https://www.youtube.com/iframe_api",Xe="YT",Fn="onYouTubeIframeAPIReady",pe=/[?&](?:list|channel)=([a-zA-Z0-9_-]+)/,Ae=/user\/([a-zA-Z0-9_-]+)\/?/,Wn=/youtube-nocookie\.com/,Gn="https://www.youtube-nocookie.com";class He extends Ee.Component{constructor(){super(...arguments),L(this,"callPlayer",F.callPlayer),L(this,"parsePlaylist",t=>{if(t instanceof Array)return{listType:"playlist",playlist:t.map(this.getID).join(",")};if(pe.test(t)){const[,r]=t.match(pe);return{listType:"playlist",list:r.replace(/^UC/,"UU")}}if(Ae.test(t)){const[,r]=t.match(Ae);return{listType:"user_uploads",list:r}}return{}}),L(this,"onStateChange",t=>{const{data:r}=t,{onPlay:o,onPause:n,onBuffer:a,onBufferEnd:u,onEnded:l,onReady:s,loop:d,config:{playerVars:p,onUnstarted:g}}=this.props,{UNSTARTED:S,PLAYING:C,PAUSED:T,BUFFERING:R,ENDED:A,CUED:w}=window[Xe].PlayerState;if(r===S&&g(),r===C&&(o(),u()),r===T&&n(),r===R&&a(),r===A){const D=!!this.callPlayer("getPlaylist");d&&!D&&(p.start?this.seekTo(p.start):this.play()),l()}r===w&&s()}),L(this,"mute",()=>{this.callPlayer("mute")}),L(this,"unmute",()=>{this.callPlayer("unMute")}),L(this,"ref",t=>{this.container=t})}componentDidMount(){this.props.onMount&&this.props.onMount(this)}getID(t){return!t||t instanceof Array||pe.test(t)?null:t.match(kt.MATCH_URL_YOUTUBE)[1]}load(t,r){const{playing:o,muted:n,playsinline:a,controls:u,loop:l,config:s,onError:d}=this.props,{playerVars:p,embedOptions:g}=s,S=this.getID(t);if(r){if(pe.test(t)||Ae.test(t)||t instanceof Array){this.player.loadPlaylist(this.parsePlaylist(t));return}this.player.cueVideoById({videoId:S,startSeconds:(0,F.parseStartTime)(t)||p.start,endSeconds:(0,F.parseEndTime)(t)||p.end});return}(0,F.getSDK)(Bn,Xe,Fn,C=>C.loaded).then(C=>{this.container&&(this.player=new C.Player(this.container,{width:"100%",height:"100%",videoId:S,playerVars:{autoplay:o?1:0,mute:n?1:0,controls:u?1:0,start:(0,F.parseStartTime)(t),end:(0,F.parseEndTime)(t),origin:window.location.origin,playsinline:a?1:0,...this.parsePlaylist(t),...p},events:{onReady:()=>{l&&this.player.setLoop(!0),this.props.onReady()},onPlaybackRateChange:T=>this.props.onPlaybackRateChange(T.data),onPlaybackQualityChange:T=>this.props.onPlaybackQualityChange(T),onStateChange:this.onStateChange,onError:T=>d(T.data)},host:Wn.test(t)?Gn:void 0,...g}))},d),g.events&&console.warn("Using `embedOptions.events` will likely break things. Use ReactPlayer’s callback props instead, eg onReady, onPlay, onPause")}play(){this.callPlayer("playVideo")}pause(){this.callPlayer("pauseVideo")}stop(){document.body.contains(this.callPlayer("getIframe"))&&this.callPlayer("stopVideo")}seekTo(t,r=!1){this.callPlayer("seekTo",t),!r&&!this.props.playing&&this.pause()}setVolume(t){this.callPlayer("setVolume",t*100)}setPlaybackRate(t){this.callPlayer("setPlaybackRate",t)}setLoop(t){this.callPlayer("setLoop",t)}getDuration(){return this.callPlayer("getDuration")}getCurrentTime(){return this.callPlayer("getCurrentTime")}getSecondsLoaded(){return this.callPlayer("getVideoLoadedFraction")*this.getDuration()}render(){const{display:t}=this.props,r={width:"100%",height:"100%",display:t};return Ee.default.createElement("div",{style:r},Ee.default.createElement("div",{ref:this.ref}))}}L(He,"displayName","YouTube");L(He,"canPlay",kt.canPlay.youtube);var Yn=mn.createReactPlayer,Qe=zn.default,Kn=Yn([{key:"youtube",canPlay:Qe.canPlay,lazyPlayer:Qe}]);const qn=Zt(Kn),Xn=({data:e,number:t})=>{const{data:r}=er(e.id,{skip:!e.id}),[o,n]=_.useState(!1),[a,u]=_.useState(""),l=(s,d)=>{d!=="youtube"?window.open(s,"_blank"):(n(!0),u(s))};return i.jsxs(i.Fragment,{children:[i.jsxs(ot,{sx:{ml:8},children:[i.jsx(at,{expandIcon:i.jsx(je,{}),"aria-controls":"panel1-content",id:"panel1-header",children:i.jsx(et,{primary:`Topic ${t}: ${e.title}`,secondary:e.goal})}),r==null?void 0:r.map((s,d)=>i.jsx(nt,{children:i.jsx(Pr,{size:"small",startIcon:s.type_file==="pdf"?i.jsx(lr,{}):s.type_file==="doc"?i.jsx(cr,{}):i.jsx(ur,{}),variant:"contained",color:s.type_file==="pdf"?"warning":s.type_file==="doc"?"primary":"error",onClick:()=>l(s.link_file,s.type_file),children:s.title})},d))]}),i.jsx(yr,{open:o,onClose:()=>n(!1),closeAfterTransition:!0,children:i.jsx(hr,{in:o,children:i.jsx(Je,{sx:{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)"},children:i.jsx(qn,{width:"740px",height:"460px",url:a,controls:!0})})})})]})},Qn=({data:e,number:t})=>{const{data:r}=tr(e.id,{skip:!e.id});return i.jsx("div",{children:i.jsxs(ot,{children:[i.jsx(at,{expandIcon:i.jsx(je,{}),"aria-controls":"panel1-content",id:"panel1-header",children:i.jsx(et,{primary:`Chapter ${t}: ${e.title}`,secondary:e.goal})}),r==null?void 0:r.map((o,n)=>i.jsx(nt,{children:i.jsx(Xn,{data:o,number:n+1})},n))]})})},_a=()=>{rr();const{data:e}=or();return i.jsxs(nr,{children:[i.jsx(ar,{title:"Subject"}),i.jsx(Je,{container:!0,sx:{height:"85vh",overflow:"auto",display:"flex",flexDirection:"column",gap:1},children:e==null?void 0:e.map((t,r)=>i.jsx(Qn,{data:t,number:r+1},r))})]})};export{_a as default};
