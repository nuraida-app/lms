import{r as u,_ as oe,j as B,e as l,g as me,f as be,av as Y,s as D,h as he,k as ce,l as ge,ba as We,aw as He,aP as Le}from"./index-B4oIbNwU.js";import{u as Oe,f as Te,i as Ne,F as Ue}from"./utils-CoNKf_2-.js";import{u as ye,a as ee}from"./Typography-DLQ9NUQX.js";import{o as pe,d as je,i as fe}from"./createSvgIcon-BZOpo86E.js";import{G as _e}from"./GlobalStyles-Ddd3Vltf.js";const De=["onChange","maxRows","minRows","style","value"];function j(e){return parseInt(e,10)||0}const Ge={shadow:{visibility:"hidden",position:"absolute",overflow:"hidden",height:0,top:0,left:0,transform:"translateZ(0)"}};function Ke(e){return e==null||Object.keys(e).length===0||e.outerHeightStyle===0&&!e.overflowing}const Ve=u.forwardRef(function(o,t){const{onChange:r,maxRows:s,minRows:d=1,style:w,value:y}=o,F=oe(o,De),{current:x}=u.useRef(y!=null),f=u.useRef(null),P=ye(t,f),b=u.useRef(null),v=u.useCallback(()=>{const c=f.current,n=pe(c).getComputedStyle(c);if(n.width==="0px")return{outerHeightStyle:0,overflowing:!1};const m=b.current;m.style.width=n.width,m.value=c.value||o.placeholder||"x",m.value.slice(-1)===`
`&&(m.value+=" ");const R=n.boxSizing,C=j(n.paddingBottom)+j(n.paddingTop),A=j(n.borderBottomWidth)+j(n.borderTopWidth),$=m.scrollHeight;m.value="x";const I=m.scrollHeight;let g=$;d&&(g=Math.max(Number(d)*I,g)),s&&(g=Math.min(Number(s)*I,g)),g=Math.max(g,I);const L=g+(R==="border-box"?C+A:0),O=Math.abs(g-$)<=1;return{outerHeightStyle:L,overflowing:O}},[s,d,o.placeholder]),p=u.useCallback(()=>{const c=v();if(Ke(c))return;const S=f.current;S.style.height=`${c.outerHeightStyle}px`,S.style.overflow=c.overflowing?"hidden":""},[v]);ee(()=>{const c=()=>{p()};let S;const n=je(c),m=f.current,R=pe(m);R.addEventListener("resize",n);let C;return typeof ResizeObserver<"u"&&(C=new ResizeObserver(c),C.observe(m)),()=>{n.clear(),cancelAnimationFrame(S),R.removeEventListener("resize",n),C&&C.disconnect()}},[v,p]),ee(()=>{p()});const k=c=>{x||p(),r&&r(c)};return B.jsxs(u.Fragment,{children:[B.jsx("textarea",l({value:y,onChange:k,ref:P,rows:d,style:w},F)),B.jsx("textarea",{"aria-hidden":!0,className:o.className,readOnly:!0,ref:b,tabIndex:-1,style:l({},Ge.shadow,w,{paddingTop:0,paddingBottom:0})})]})});function qe(e){return be("MuiInputBase",e)}const _=me("MuiInputBase",["root","formControl","focused","disabled","adornedStart","adornedEnd","error","sizeSmall","multiline","colorSecondary","fullWidth","hiddenLabel","readOnly","input","inputSizeSmall","inputMultiline","inputTypeSearch","inputAdornedStart","inputAdornedEnd","inputHiddenLabel"]),Xe=["aria-describedby","autoComplete","autoFocus","className","color","components","componentsProps","defaultValue","disabled","disableInjectingGlobalStyles","endAdornment","error","fullWidth","id","inputComponent","inputProps","inputRef","margin","maxRows","minRows","multiline","name","onBlur","onChange","onClick","onFocus","onKeyDown","onKeyUp","placeholder","readOnly","renderSuffix","rows","size","slotProps","slots","startAdornment","type","value"],xe=(e,o)=>{const{ownerState:t}=e;return[o.root,t.formControl&&o.formControl,t.startAdornment&&o.adornedStart,t.endAdornment&&o.adornedEnd,t.error&&o.error,t.size==="small"&&o.sizeSmall,t.multiline&&o.multiline,t.color&&o[`color${Y(t.color)}`],t.fullWidth&&o.fullWidth,t.hiddenLabel&&o.hiddenLabel]},ve=(e,o)=>{const{ownerState:t}=e;return[o.input,t.size==="small"&&o.inputSizeSmall,t.multiline&&o.inputMultiline,t.type==="search"&&o.inputTypeSearch,t.startAdornment&&o.inputAdornedStart,t.endAdornment&&o.inputAdornedEnd,t.hiddenLabel&&o.inputHiddenLabel]},Ze=e=>{const{classes:o,color:t,disabled:r,error:s,endAdornment:d,focused:w,formControl:y,fullWidth:F,hiddenLabel:x,multiline:f,readOnly:P,size:b,startAdornment:v,type:p}=e,k={root:["root",`color${Y(t)}`,r&&"disabled",s&&"error",F&&"fullWidth",w&&"focused",y&&"formControl",b&&b!=="medium"&&`size${Y(b)}`,f&&"multiline",v&&"adornedStart",d&&"adornedEnd",x&&"hiddenLabel",P&&"readOnly"],input:["input",r&&"disabled",p==="search"&&"inputTypeSearch",f&&"inputMultiline",b==="small"&&"inputSizeSmall",x&&"inputHiddenLabel",v&&"inputAdornedStart",d&&"inputAdornedEnd",P&&"readOnly"]};return ge(k,qe,o)},Ce=D("div",{name:"MuiInputBase",slot:"Root",overridesResolver:xe})(({theme:e,ownerState:o})=>l({},e.typography.body1,{color:(e.vars||e).palette.text.primary,lineHeight:"1.4375em",boxSizing:"border-box",position:"relative",cursor:"text",display:"inline-flex",alignItems:"center",[`&.${_.disabled}`]:{color:(e.vars||e).palette.text.disabled,cursor:"default"}},o.multiline&&l({padding:"4px 0 5px"},o.size==="small"&&{paddingTop:1}),o.fullWidth&&{width:"100%"})),we=D("input",{name:"MuiInputBase",slot:"Input",overridesResolver:ve})(({theme:e,ownerState:o})=>{const t=e.palette.mode==="light",r=l({color:"currentColor"},e.vars?{opacity:e.vars.opacity.inputPlaceholder}:{opacity:t?.42:.5},{transition:e.transitions.create("opacity",{duration:e.transitions.duration.shorter})}),s={opacity:"0 !important"},d=e.vars?{opacity:e.vars.opacity.inputPlaceholder}:{opacity:t?.42:.5};return l({font:"inherit",letterSpacing:"inherit",color:"currentColor",padding:"4px 0 5px",border:0,boxSizing:"content-box",background:"none",height:"1.4375em",margin:0,WebkitTapHighlightColor:"transparent",display:"block",minWidth:0,width:"100%",animationName:"mui-auto-fill-cancel",animationDuration:"10ms","&::-webkit-input-placeholder":r,"&::-moz-placeholder":r,"&:-ms-input-placeholder":r,"&::-ms-input-placeholder":r,"&:focus":{outline:0},"&:invalid":{boxShadow:"none"},"&::-webkit-search-decoration":{WebkitAppearance:"none"},[`label[data-shrink=false] + .${_.formControl} &`]:{"&::-webkit-input-placeholder":s,"&::-moz-placeholder":s,"&:-ms-input-placeholder":s,"&::-ms-input-placeholder":s,"&:focus::-webkit-input-placeholder":d,"&:focus::-moz-placeholder":d,"&:focus:-ms-input-placeholder":d,"&:focus::-ms-input-placeholder":d},[`&.${_.disabled}`]:{opacity:1,WebkitTextFillColor:(e.vars||e).palette.text.disabled},"&:-webkit-autofill":{animationDuration:"5000s",animationName:"mui-auto-fill"}},o.size==="small"&&{paddingTop:1},o.multiline&&{height:"auto",resize:"none",padding:0,paddingTop:0},o.type==="search"&&{MozAppearance:"textfield"})}),Je=B.jsx(_e,{styles:{"@keyframes mui-auto-fill":{from:{display:"block"}},"@keyframes mui-auto-fill-cancel":{from:{display:"block"}}}}),Qe=u.forwardRef(function(o,t){var r;const s=he({props:o,name:"MuiInputBase"}),{"aria-describedby":d,autoComplete:w,autoFocus:y,className:F,components:x={},componentsProps:f={},defaultValue:P,disabled:b,disableInjectingGlobalStyles:v,endAdornment:p,fullWidth:k=!1,id:c,inputComponent:S="input",inputProps:n={},inputRef:m,maxRows:R,minRows:C,multiline:A=!1,name:$,onBlur:I,onChange:g,onClick:L,onFocus:O,onKeyDown:Se,onKeyUp:Re,placeholder:Ie,readOnly:G,renderSuffix:te,rows:T,slotProps:ne={},slots:re={},startAdornment:M,type:ie="text",value:ze}=s,Be=oe(s,Xe),N=n.value!=null?n.value:ze,{current:K}=u.useRef(N!=null),E=u.useRef(),Pe=u.useCallback(i=>{},[]),ke=ye(E,m,n.ref,Pe),[V,q]=u.useState(!1),a=Oe(),h=Te({props:s,muiFormControl:a,states:["color","disabled","error","hiddenLabel","size","required","filled"]});h.focused=a?a.focused:V,u.useEffect(()=>{!a&&b&&V&&(q(!1),I&&I())},[a,b,V,I]);const X=a&&a.onFilled,Z=a&&a.onEmpty,W=u.useCallback(i=>{Ne(i)?X&&X():Z&&Z()},[X,Z]);ee(()=>{K&&W({value:N})},[N,W,K]);const Fe=i=>{if(h.disabled){i.stopPropagation();return}O&&O(i),n.onFocus&&n.onFocus(i),a&&a.onFocus?a.onFocus(i):q(!0)},Ae=i=>{I&&I(i),n.onBlur&&n.onBlur(i),a&&a.onBlur?a.onBlur(i):q(!1)},$e=(i,...ue)=>{if(!K){const de=i.target||E.current;if(de==null)throw new Error(We(1));W({value:de.value})}n.onChange&&n.onChange(i,...ue),g&&g(i,...ue)};u.useEffect(()=>{W(E.current)},[]);const Ee=i=>{E.current&&i.currentTarget===i.target&&E.current.focus(),L&&L(i)};let J=S,z=n;A&&J==="input"&&(T?z=l({type:void 0,minRows:T,maxRows:T},z):z=l({type:void 0,maxRows:R,minRows:C},z),J=Ve);const Me=i=>{W(i.animationName==="mui-auto-fill-cancel"?E.current:{value:"x"})};u.useEffect(()=>{a&&a.setAdornedStart(!!M)},[a,M]);const U=l({},s,{color:h.color||"primary",disabled:h.disabled,endAdornment:p,error:h.error,focused:h.focused,formControl:a,fullWidth:k,hiddenLabel:h.hiddenLabel,multiline:A,size:h.size,startAdornment:M,type:ie}),se=Ze(U),ae=re.root||x.Root||Ce,Q=ne.root||f.root||{},le=re.input||x.Input||we;return z=l({},z,(r=ne.input)!=null?r:f.input),B.jsxs(u.Fragment,{children:[!v&&Je,B.jsxs(ae,l({},Q,!fe(ae)&&{ownerState:l({},U,Q.ownerState)},{ref:t,onClick:Ee},Be,{className:ce(se.root,Q.className,F,G&&"MuiInputBase-readOnly"),children:[M,B.jsx(Ue.Provider,{value:null,children:B.jsx(le,l({ownerState:U,"aria-invalid":h.error,"aria-describedby":d,autoComplete:w,autoFocus:y,defaultValue:P,disabled:h.disabled,id:c,onAnimationStart:Me,name:$,placeholder:Ie,readOnly:G,required:h.required,rows:T,value:N,onKeyDown:Se,onKeyUp:Re,type:ie},z,!fe(le)&&{as:J,ownerState:l({},U,z.ownerState)},{ref:ke,className:ce(se.input,z.className,G&&"MuiInputBase-readOnly"),onBlur:Ae,onChange:$e,onFocus:Fe}))}),p,te?te(l({},h,{startAdornment:M})):null]}))]})}),Ye=Qe;function eo(e){return be("MuiInput",e)}const H=l({},_,me("MuiInput",["root","underline","input"])),oo=["disableUnderline","components","componentsProps","fullWidth","inputComponent","multiline","slotProps","slots","type"],to=e=>{const{classes:o,disableUnderline:t}=e,s=ge({root:["root",!t&&"underline"],input:["input"]},eo,o);return l({},o,s)},no=D(Ce,{shouldForwardProp:e=>He(e)||e==="classes",name:"MuiInput",slot:"Root",overridesResolver:(e,o)=>{const{ownerState:t}=e;return[...xe(e,o),!t.disableUnderline&&o.underline]}})(({theme:e,ownerState:o})=>{let r=e.palette.mode==="light"?"rgba(0, 0, 0, 0.42)":"rgba(255, 255, 255, 0.7)";return e.vars&&(r=`rgba(${e.vars.palette.common.onBackgroundChannel} / ${e.vars.opacity.inputUnderline})`),l({position:"relative"},o.formControl&&{"label + &":{marginTop:16}},!o.disableUnderline&&{"&::after":{borderBottom:`2px solid ${(e.vars||e).palette[o.color].main}`,left:0,bottom:0,content:'""',position:"absolute",right:0,transform:"scaleX(0)",transition:e.transitions.create("transform",{duration:e.transitions.duration.shorter,easing:e.transitions.easing.easeOut}),pointerEvents:"none"},[`&.${H.focused}:after`]:{transform:"scaleX(1) translateX(0)"},[`&.${H.error}`]:{"&::before, &::after":{borderBottomColor:(e.vars||e).palette.error.main}},"&::before":{borderBottom:`1px solid ${r}`,left:0,bottom:0,content:'"\\00a0"',position:"absolute",right:0,transition:e.transitions.create("border-bottom-color",{duration:e.transitions.duration.shorter}),pointerEvents:"none"},[`&:hover:not(.${H.disabled}, .${H.error}):before`]:{borderBottom:`2px solid ${(e.vars||e).palette.text.primary}`,"@media (hover: none)":{borderBottom:`1px solid ${r}`}},[`&.${H.disabled}:before`]:{borderBottomStyle:"dotted"}})}),ro=D(we,{name:"MuiInput",slot:"Input",overridesResolver:ve})({}),io=u.forwardRef(function(o,t){var r,s,d,w;const y=he({props:o,name:"MuiInput"}),{disableUnderline:F,components:x={},componentsProps:f,fullWidth:P=!1,inputComponent:b="input",multiline:v=!1,slotProps:p,slots:k={},type:c="text"}=y,S=oe(y,oo),n=to(y),R={root:{ownerState:{disableUnderline:F}}},C=p??f?Le(p??f,R):R,A=(r=(s=k.root)!=null?s:x.Root)!=null?r:no,$=(d=(w=k.input)!=null?w:x.Input)!=null?d:ro;return B.jsx(Ye,l({slots:{root:A,input:$},slotProps:C,fullWidth:P,inputComponent:b,multiline:v,ref:t,type:c},S,{classes:n}))});io.muiName="Input";export{io as I,Ye as a,Ce as b,we as c,ve as d,_ as i,xe as r};
