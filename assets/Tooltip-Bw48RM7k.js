import{aq as fe,ap as he,S as Y,at as r,aI as Wo,aK as jo,r as p,ar as ge,as as be,au as F,j as g,av as Te}from"./index-CYXdUE1E.js";import{u as ve}from"./listItemIconClasses-cx9A8stw.js";import{u as Pe}from"./useTheme-1MJ8xdPG.js";import{P as Uo}from"./Popper-DjzC07dN.js";import{u as N,c as Do,d as we,a as ye,f as xe}from"./Typography-BE36mMcC.js";import{u as Re,b as Ce}from"./createSvgIcon-CLSAu-P9.js";import{G as So}from"./Grow-Bq4CRTVA.js";import{a as k}from"./Modal-Crt72BC3.js";function Me(t){return he("MuiTooltip",t)}const u=fe("MuiTooltip",["popper","popperInteractive","popperArrow","popperClose","tooltip","tooltipArrow","touch","tooltipPlacementLeft","tooltipPlacementRight","tooltipPlacementTop","tooltipPlacementBottom","arrow"]),Oe=["arrow","children","classes","components","componentsProps","describeChild","disableFocusListener","disableHoverListener","disableInteractive","disableTouchListener","enterDelay","enterNextDelay","enterTouchDelay","followCursor","id","leaveDelay","leaveTouchDelay","onClose","onOpen","open","placement","PopperComponent","PopperProps","slotProps","slots","title","TransitionComponent","TransitionProps"];function _e(t){return Math.round(t*1e5)/1e5}const $e=t=>{const{classes:e,disableInteractive:s,arrow:a,touch:x,placement:R}=t,C={popper:["popper",!s&&"popperInteractive",a&&"popperArrow"],tooltip:["tooltip",a&&"tooltipArrow",x&&"touch",`tooltipPlacement${Wo(R.split("-")[0])}`],arrow:["arrow"]};return Te(C,Me,e)},Le=Y(Uo,{name:"MuiTooltip",slot:"Popper",overridesResolver:(t,e)=>{const{ownerState:s}=t;return[e.popper,!s.disableInteractive&&e.popperInteractive,s.arrow&&e.popperArrow,!s.open&&e.popperClose]}})(({theme:t,ownerState:e,open:s})=>r({zIndex:(t.vars||t).zIndex.tooltip,pointerEvents:"none"},!e.disableInteractive&&{pointerEvents:"auto"},!s&&{pointerEvents:"none"},e.arrow&&{[`&[data-popper-placement*="bottom"] .${u.arrow}`]:{top:0,marginTop:"-0.71em","&::before":{transformOrigin:"0 100%"}},[`&[data-popper-placement*="top"] .${u.arrow}`]:{bottom:0,marginBottom:"-0.71em","&::before":{transformOrigin:"100% 0"}},[`&[data-popper-placement*="right"] .${u.arrow}`]:r({},e.isRtl?{right:0,marginRight:"-0.71em"}:{left:0,marginLeft:"-0.71em"},{height:"1em",width:"0.71em","&::before":{transformOrigin:"100% 100%"}}),[`&[data-popper-placement*="left"] .${u.arrow}`]:r({},e.isRtl?{left:0,marginLeft:"-0.71em"}:{right:0,marginRight:"-0.71em"},{height:"1em",width:"0.71em","&::before":{transformOrigin:"0 0"}})})),Ee=Y("div",{name:"MuiTooltip",slot:"Tooltip",overridesResolver:(t,e)=>{const{ownerState:s}=t;return[e.tooltip,s.touch&&e.touch,s.arrow&&e.tooltipArrow,e[`tooltipPlacement${Wo(s.placement.split("-")[0])}`]]}})(({theme:t,ownerState:e})=>r({backgroundColor:t.vars?t.vars.palette.Tooltip.bg:jo(t.palette.grey[700],.92),borderRadius:(t.vars||t).shape.borderRadius,color:(t.vars||t).palette.common.white,fontFamily:t.typography.fontFamily,padding:"4px 8px",fontSize:t.typography.pxToRem(11),maxWidth:300,margin:2,wordWrap:"break-word",fontWeight:t.typography.fontWeightMedium},e.arrow&&{position:"relative",margin:0},e.touch&&{padding:"8px 16px",fontSize:t.typography.pxToRem(14),lineHeight:`${_e(16/14)}em`,fontWeight:t.typography.fontWeightRegular},{[`.${u.popper}[data-popper-placement*="left"] &`]:r({transformOrigin:"right center"},e.isRtl?r({marginLeft:"14px"},e.touch&&{marginLeft:"24px"}):r({marginRight:"14px"},e.touch&&{marginRight:"24px"})),[`.${u.popper}[data-popper-placement*="right"] &`]:r({transformOrigin:"left center"},e.isRtl?r({marginRight:"14px"},e.touch&&{marginRight:"24px"}):r({marginLeft:"14px"},e.touch&&{marginLeft:"24px"})),[`.${u.popper}[data-popper-placement*="top"] &`]:r({transformOrigin:"center bottom",marginBottom:"14px"},e.touch&&{marginBottom:"24px"}),[`.${u.popper}[data-popper-placement*="bottom"] &`]:r({transformOrigin:"center top",marginTop:"14px"},e.touch&&{marginTop:"24px"})})),Ie=Y("span",{name:"MuiTooltip",slot:"Arrow",overridesResolver:(t,e)=>e.arrow})(({theme:t})=>({overflow:"hidden",position:"absolute",width:"1em",height:"0.71em",boxSizing:"border-box",color:t.vars?t.vars.palette.Tooltip.bg:jo(t.palette.grey[700],.9),"&::before":{content:'""',margin:"auto",display:"block",width:"100%",height:"100%",backgroundColor:"currentColor",transform:"rotate(45deg)"}}));let A=!1;const Bo=new xe;let y={x:0,y:0};function D(t,e){return(s,...a)=>{e&&e(s,...a),t(s,...a)}}const je=p.forwardRef(function(e,s){var a,x,R,C,J,Q,Z,oo,eo,to,ro,so,no,po,io,lo,ao,co,uo;const S=ge({props:e,name:"MuiTooltip"}),{arrow:mo=!1,children:B,components:M={},componentsProps:d={},describeChild:Vo=!1,disableFocusListener:zo=!1,disableHoverListener:fo=!1,disableInteractive:Ho=!1,disableTouchListener:Go=!1,enterDelay:ho=100,enterNextDelay:go=0,enterTouchDelay:Ko=700,followCursor:W=!1,id:qo,leaveDelay:bo=0,leaveTouchDelay:Xo=1500,onClose:To,onOpen:vo,open:Yo,placement:Po="bottom",PopperComponent:j,PopperProps:m={},slotProps:f={},slots:O={},title:h,TransitionComponent:Jo=So,TransitionProps:Qo}=S,wo=be(S,Oe),c=p.isValidElement(B)?B:g.jsx("span",{children:B}),yo=Pe(),Zo=ve(),[b,xo]=p.useState(),[U,oe]=p.useState(null),_=p.useRef(!1),V=Ho||W,Ro=N(),z=N(),$=N(),Co=N(),[ee,Mo]=Re({controlled:Yo,default:!1,name:"Tooltip",state:"open"});let l=ee;const H=Ce(qo),T=p.useRef(),L=Do(()=>{T.current!==void 0&&(document.body.style.WebkitUserSelect=T.current,T.current=void 0),Co.clear()});p.useEffect(()=>L,[L]);const Oo=o=>{Bo.clear(),A=!0,Mo(!0),vo&&!l&&vo(o)},E=Do(o=>{Bo.start(800+bo,()=>{A=!1}),Mo(!1),To&&l&&To(o),Ro.start(yo.transitions.duration.shortest,()=>{_.current=!1})}),I=o=>{_.current&&o.type!=="touchstart"||(b&&b.removeAttribute("title"),z.clear(),$.clear(),ho||A&&go?z.start(A?go:ho,()=>{Oo(o)}):Oo(o))},G=o=>{z.clear(),$.start(bo,()=>{E(o)})},{isFocusVisibleRef:_o,onBlur:te,onFocus:re,ref:se}=we(),[,$o]=p.useState(!1),Lo=o=>{te(o),_o.current===!1&&($o(!1),G(o))},Eo=o=>{b||xo(o.currentTarget),re(o),_o.current===!0&&($o(!0),I(o))},Io=o=>{_.current=!0;const n=c.props;n.onTouchStart&&n.onTouchStart(o)},ne=o=>{Io(o),$.clear(),Ro.clear(),L(),T.current=document.body.style.WebkitUserSelect,document.body.style.WebkitUserSelect="none",Co.start(Ko,()=>{document.body.style.WebkitUserSelect=T.current,I(o)})},pe=o=>{c.props.onTouchEnd&&c.props.onTouchEnd(o),L(),$.start(Xo,()=>{E(o)})};p.useEffect(()=>{if(!l)return;function o(n){(n.key==="Escape"||n.key==="Esc")&&E(n)}return document.addEventListener("keydown",o),()=>{document.removeEventListener("keydown",o)}},[E,l]);const ie=ye(c.ref,se,xo,s);!h&&h!==0&&(l=!1);const K=p.useRef(),le=o=>{const n=c.props;n.onMouseMove&&n.onMouseMove(o),y={x:o.clientX,y:o.clientY},K.current&&K.current.update()},v={},q=typeof h=="string";Vo?(v.title=!l&&q&&!fo?h:null,v["aria-describedby"]=l?H:null):(v["aria-label"]=q?h:null,v["aria-labelledby"]=l&&!q?H:null);const i=r({},v,wo,c.props,{className:F(wo.className,c.props.className),onTouchStart:Io,ref:ie},W?{onMouseMove:le}:{}),P={};Go||(i.onTouchStart=ne,i.onTouchEnd=pe),fo||(i.onMouseOver=D(I,i.onMouseOver),i.onMouseLeave=D(G,i.onMouseLeave),V||(P.onMouseOver=I,P.onMouseLeave=G)),zo||(i.onFocus=D(Eo,i.onFocus),i.onBlur=D(Lo,i.onBlur),V||(P.onFocus=Eo,P.onBlur=Lo));const ae=p.useMemo(()=>{var o;let n=[{name:"arrow",enabled:!!U,options:{element:U,padding:4}}];return(o=m.popperOptions)!=null&&o.modifiers&&(n=n.concat(m.popperOptions.modifiers)),r({},m.popperOptions,{modifiers:n})},[U,m]),w=r({},S,{isRtl:Zo,arrow:mo,disableInteractive:V,placement:Po,PopperComponentProp:j,touch:_.current}),X=$e(w),Fo=(a=(x=O.popper)!=null?x:M.Popper)!=null?a:Le,No=(R=(C=(J=O.transition)!=null?J:M.Transition)!=null?C:Jo)!=null?R:So,ko=(Q=(Z=O.tooltip)!=null?Z:M.Tooltip)!=null?Q:Ee,Ao=(oo=(eo=O.arrow)!=null?eo:M.Arrow)!=null?oo:Ie,ce=k(Fo,r({},m,(to=f.popper)!=null?to:d.popper,{className:F(X.popper,m==null?void 0:m.className,(ro=(so=f.popper)!=null?so:d.popper)==null?void 0:ro.className)}),w),ue=k(No,r({},Qo,(no=f.transition)!=null?no:d.transition),w),de=k(ko,r({},(po=f.tooltip)!=null?po:d.tooltip,{className:F(X.tooltip,(io=(lo=f.tooltip)!=null?lo:d.tooltip)==null?void 0:io.className)}),w),me=k(Ao,r({},(ao=f.arrow)!=null?ao:d.arrow,{className:F(X.arrow,(co=(uo=f.arrow)!=null?uo:d.arrow)==null?void 0:co.className)}),w);return g.jsxs(p.Fragment,{children:[p.cloneElement(c,i),g.jsx(Fo,r({as:j??Uo,placement:Po,anchorEl:W?{getBoundingClientRect:()=>({top:y.y,left:y.x,right:y.x,bottom:y.y,width:0,height:0})}:b,popperRef:K,open:b?l:!1,id:H,transition:!0},P,ce,{popperOptions:ae,children:({TransitionProps:o})=>g.jsx(No,r({timeout:yo.transitions.duration.shorter},o,ue,{children:g.jsxs(ko,r({},de,{children:[h,mo?g.jsx(Ao,r({},me,{ref:oe})):null]}))}))}))]})});export{je as T};
