import{r as l,as as j,j as H,at as S,ap as Pe,aq as ge,S as U,ar as ve,au as ee,av as ye,aJ as De}from"./index-DLCRynLT.js";import{u as Ie}from"./listItemIconClasses-Dr45LKzl.js";import{c as ke,M as Oe,u as B}from"./Modal-D_AunpFB.js";import{P as Fe}from"./Paper-CHu71e6T.js";import{b as ze,a as be}from"./Typography-DZcqQ05_.js";import{e as J,o as pe,i as _e,d as Ne}from"./createSvgIcon-D59g-G7-.js";import{G as $e}from"./Grow-zjrQf6xw.js";import{L as je}from"./ExitToApp-BftrtyMZ.js";const He=["actions","autoFocus","autoFocusItem","children","className","disabledItemsFocusable","disableListWrap","onKeyDown","variant"];function Q(t,e,o){return t===e?t.firstChild:e&&e.nextElementSibling?e.nextElementSibling:o?null:t.firstChild}function fe(t,e,o){return t===e?o?t.firstChild:t.lastChild:e&&e.previousElementSibling?e.previousElementSibling:o?null:t.lastChild}function xe(t,e){if(e===void 0)return!0;let o=t.innerText;return o===void 0&&(o=t.textContent),o=o.trim().toLowerCase(),o.length===0?!1:e.repeating?o[0]===e.keys[0]:o.indexOf(e.keys.join(""))===0}function W(t,e,o,E,b,w){let f=!1,d=b(t,e,e?o:!1);for(;d;){if(d===t.firstChild){if(f)return!1;f=!0}const u=E?!1:d.disabled||d.getAttribute("aria-disabled")==="true";if(!d.hasAttribute("tabindex")||!xe(d,w)||u)d=b(t,d,o);else return d.focus(),!0}return!1}const Ke=l.forwardRef(function(e,o){const{actions:E,autoFocus:b=!1,autoFocusItem:w=!1,children:f,className:d,disabledItemsFocusable:u=!1,disableListWrap:P=!1,onKeyDown:R,variant:x="selectedMenu"}=e,_=j(e,He),g=l.useRef(null),K=l.useRef({keys:[],repeating:!0,previousKeyMatched:!0,lastTime:null});ze(()=>{b&&g.current.focus()},[b]),l.useImperativeHandle(E,()=>({adjustStyleForScrollbar:(r,{direction:i})=>{const c=!g.current.style.width;if(r.clientHeight<g.current.clientHeight&&c){const h=`${ke(J(r))}px`;g.current.style[i==="rtl"?"paddingLeft":"paddingRight"]=h,g.current.style.width=`calc(100% + ${h})`}return g.current}}),[]);const O=r=>{const i=g.current,c=r.key,h=J(i).activeElement;if(c==="ArrowDown")r.preventDefault(),W(i,h,P,u,Q);else if(c==="ArrowUp")r.preventDefault(),W(i,h,P,u,fe);else if(c==="Home")r.preventDefault(),W(i,null,P,u,Q);else if(c==="End")r.preventDefault(),W(i,null,P,u,fe);else if(c.length===1){const n=K.current,C=c.toLowerCase(),D=performance.now();n.keys.length>0&&(D-n.lastTime>500?(n.keys=[],n.repeating=!0,n.previousKeyMatched=!0):n.repeating&&C!==n.keys[0]&&(n.repeating=!1)),n.lastTime=D,n.keys.push(C);const I=h&&!n.repeating&&xe(h,n);n.previousKeyMatched&&(I||W(i,h,!1,u,Q,n))?r.preventDefault():n.previousKeyMatched=!1}R&&R(r)},p=be(g,o);let s=-1;l.Children.forEach(f,(r,i)=>{if(!l.isValidElement(r)){s===i&&(s+=1,s>=f.length&&(s=-1));return}r.props.disabled||(x==="selectedMenu"&&r.props.selected||s===-1)&&(s=i),s===i&&(r.props.disabled||r.props.muiSkipListHighlight||r.type.muiSkipListHighlight)&&(s+=1,s>=f.length&&(s=-1))});const F=l.Children.map(f,(r,i)=>{if(i===s){const c={};return w&&(c.autoFocus=!0),r.props.tabIndex===void 0&&x==="selectedMenu"&&(c.tabIndex=0),l.cloneElement(r,c)}return r});return H.jsx(je,S({role:"menu",ref:p,className:d,onKeyDown:O,tabIndex:b?0:-1},_,{children:F}))});function Ae(t){return Pe("MuiPopover",t)}ge("MuiPopover",["root","paper"]);const We=["onEntering"],Ue=["action","anchorEl","anchorOrigin","anchorPosition","anchorReference","children","className","container","elevation","marginThreshold","open","PaperProps","slots","slotProps","transformOrigin","TransitionComponent","transitionDuration","TransitionProps","disableScrollLock"],Ge=["slotProps"];function de(t,e){let o=0;return typeof e=="number"?o=e:e==="center"?o=t.height/2:e==="bottom"&&(o=t.height),o}function he(t,e){let o=0;return typeof e=="number"?o=e:e==="center"?o=t.width/2:e==="right"&&(o=t.width),o}function me(t){return[t.horizontal,t.vertical].map(e=>typeof e=="number"?`${e}px`:e).join(" ")}function Z(t){return typeof t=="function"?t():t}const Ve=t=>{const{classes:e}=t;return ye({root:["root"],paper:["paper"]},Ae,e)},qe=U(Oe,{name:"MuiPopover",slot:"Root",overridesResolver:(t,e)=>e.root})({}),we=U(Fe,{name:"MuiPopover",slot:"Paper",overridesResolver:(t,e)=>e.paper})({position:"absolute",overflowY:"auto",overflowX:"hidden",minWidth:16,minHeight:16,maxWidth:"calc(100% - 32px)",maxHeight:"calc(100% - 32px)",outline:0}),Be=l.forwardRef(function(e,o){var E,b,w;const f=ve({props:e,name:"MuiPopover"}),{action:d,anchorEl:u,anchorOrigin:P={vertical:"top",horizontal:"left"},anchorPosition:R,anchorReference:x="anchorEl",children:_,className:g,container:K,elevation:O=8,marginThreshold:p=16,open:s,PaperProps:F={},slots:r,slotProps:i,transformOrigin:c={vertical:"top",horizontal:"left"},TransitionComponent:h=$e,transitionDuration:n="auto",TransitionProps:{onEntering:C}={},disableScrollLock:D=!1}=f,I=j(f.TransitionProps,We),X=j(f,Ue),T=(E=i==null?void 0:i.paper)!=null?E:F,k=l.useRef(),G=be(k,T.ref),A=S({},f,{anchorOrigin:P,anchorReference:x,elevation:O,marginThreshold:p,externalPaperSlotProps:T,transformOrigin:c,TransitionComponent:h,transitionDuration:n,TransitionProps:I}),V=Ve(A),q=l.useCallback(()=>{if(x==="anchorPosition")return R;const a=Z(u),y=(a&&a.nodeType===1?a:J(k.current).body).getBoundingClientRect();return{top:y.top+de(y,P.vertical),left:y.left+he(y,P.horizontal)}},[u,P.horizontal,P.vertical,R,x]),v=l.useCallback(a=>({vertical:de(a,c.vertical),horizontal:he(a,c.horizontal)}),[c.horizontal,c.vertical]),z=l.useCallback(a=>{const m={width:a.offsetWidth,height:a.offsetHeight},y=v(m);if(x==="none")return{top:null,left:null,transformOrigin:me(y)};const ne=q();let N=ne.top-y.vertical,$=ne.left-y.horizontal;const ie=N+m.height,le=$+m.width,ae=pe(Z(u)),ce=ae.innerHeight-p,ue=ae.innerWidth-p;if(p!==null&&N<p){const M=N-p;N-=M,y.vertical+=M}else if(p!==null&&ie>ce){const M=ie-ce;N-=M,y.vertical+=M}if(p!==null&&$<p){const M=$-p;$-=M,y.horizontal+=M}else if(le>ue){const M=le-ue;$-=M,y.horizontal+=M}return{top:`${Math.round(N)}px`,left:`${Math.round($)}px`,transformOrigin:me(y)}},[u,x,q,v,p]),[Me,te]=l.useState(s),L=l.useCallback(()=>{const a=k.current;if(!a)return;const m=z(a);m.top!==null&&(a.style.top=m.top),m.left!==null&&(a.style.left=m.left),a.style.transformOrigin=m.transformOrigin,te(!0)},[z]);l.useEffect(()=>(D&&window.addEventListener("scroll",L),()=>window.removeEventListener("scroll",L)),[u,D,L]);const Se=(a,m)=>{C&&C(a,m),L()},Ee=()=>{te(!1)};l.useEffect(()=>{s&&L()}),l.useImperativeHandle(d,()=>s?{updatePosition:()=>{L()}}:null,[s,L]),l.useEffect(()=>{if(!s)return;const a=Ne(()=>{L()}),m=pe(u);return m.addEventListener("resize",a),()=>{a.clear(),m.removeEventListener("resize",a)}},[u,s,L]);let oe=n;n==="auto"&&!h.muiSupportAuto&&(oe=void 0);const Re=K||(u?J(Z(u)).body:void 0),Y=(b=r==null?void 0:r.root)!=null?b:qe,re=(w=r==null?void 0:r.paper)!=null?w:we,Ce=B({elementType:re,externalSlotProps:S({},T,{style:Me?T.style:S({},T.style,{opacity:0})}),additionalProps:{elevation:O,ref:G},ownerState:A,className:ee(V.paper,T==null?void 0:T.className)}),se=B({elementType:Y,externalSlotProps:(i==null?void 0:i.root)||{},externalForwardedProps:X,additionalProps:{ref:o,slotProps:{backdrop:{invisible:!0}},container:Re,open:s},ownerState:A,className:ee(V.root,g)}),{slotProps:Te}=se,Le=j(se,Ge);return H.jsx(Y,S({},Le,!_e(Y)&&{slotProps:Te,disableScrollLock:D},{children:H.jsx(h,S({appear:!0,in:s,onEntering:Se,onExited:Ee,timeout:oe},I,{children:H.jsx(re,S({},Ce,{children:_}))}))}))});function Je(t){return Pe("MuiMenu",t)}ge("MuiMenu",["root","paper","list"]);const Xe=["onEntering"],Ye=["autoFocus","children","className","disableAutoFocusItem","MenuListProps","onClose","open","PaperProps","PopoverClasses","transitionDuration","TransitionProps","variant","slots","slotProps"],Qe={vertical:"top",horizontal:"right"},Ze={vertical:"top",horizontal:"left"},et=t=>{const{classes:e}=t;return ye({root:["root"],paper:["paper"],list:["list"]},Je,e)},tt=U(Be,{shouldForwardProp:t=>De(t)||t==="classes",name:"MuiMenu",slot:"Root",overridesResolver:(t,e)=>e.root})({}),ot=U(we,{name:"MuiMenu",slot:"Paper",overridesResolver:(t,e)=>e.paper})({maxHeight:"calc(100% - 96px)",WebkitOverflowScrolling:"touch"}),rt=U(Ke,{name:"MuiMenu",slot:"List",overridesResolver:(t,e)=>e.list})({outline:0}),ft=l.forwardRef(function(e,o){var E,b;const w=ve({props:e,name:"MuiMenu"}),{autoFocus:f=!0,children:d,className:u,disableAutoFocusItem:P=!1,MenuListProps:R={},onClose:x,open:_,PaperProps:g={},PopoverClasses:K,transitionDuration:O="auto",TransitionProps:{onEntering:p}={},variant:s="selectedMenu",slots:F={},slotProps:r={}}=w,i=j(w.TransitionProps,Xe),c=j(w,Ye),h=Ie(),n=S({},w,{autoFocus:f,disableAutoFocusItem:P,MenuListProps:R,onEntering:p,PaperProps:g,transitionDuration:O,TransitionProps:i,variant:s}),C=et(n),D=f&&!P&&_,I=l.useRef(null),X=(v,z)=>{I.current&&I.current.adjustStyleForScrollbar(v,{direction:h?"rtl":"ltr"}),p&&p(v,z)},T=v=>{v.key==="Tab"&&(v.preventDefault(),x&&x(v,"tabKeyDown"))};let k=-1;l.Children.map(d,(v,z)=>{l.isValidElement(v)&&(v.props.disabled||(s==="selectedMenu"&&v.props.selected||k===-1)&&(k=z))});const G=(E=F.paper)!=null?E:ot,A=(b=r.paper)!=null?b:g,V=B({elementType:F.root,externalSlotProps:r.root,ownerState:n,className:[C.root,u]}),q=B({elementType:G,externalSlotProps:A,ownerState:n,className:C.paper});return H.jsx(tt,S({onClose:x,anchorOrigin:{vertical:"bottom",horizontal:h?"right":"left"},transformOrigin:h?Qe:Ze,slots:{paper:G,root:F.root},slotProps:{root:V,paper:q},open:_,ref:o,transitionDuration:O,TransitionProps:S({onEntering:X},i),ownerState:n},c,{classes:K,children:H.jsx(rt,S({onKeyDown:T,actions:I,autoFocus:f&&(k===-1||P),autoFocusItem:D,variant:s},R,{className:ee(C.list,R.className),children:d}))}))});export{ft as M,Ke as a};