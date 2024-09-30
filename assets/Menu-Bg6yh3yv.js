import{r as l,ao as j,j as H,ap as E,al as Pe,am as ge,af as U,an as ve,aq as ee,ar as ye,au as De}from"./index-CFLTN1m7.js";import{u as Ie}from"./listItemIconClasses-Pf23efNw.js";import{d as ke,M as Oe,u as B}from"./Modal-B5cU9yt9.js";import{P as Fe}from"./Paper-BXkIlh-U.js";import{a as ze,u as be}from"./Typography-CHJpYQNO.js";import{e as X,o as pe,i as _e,d as Ne}from"./createSvgIcon-T2x4Gml6.js";import{G as $e}from"./Grow-CNYCkFhM.js";import{L as je}from"./ExitToApp-B-9Gtlvi.js";const He=["actions","autoFocus","autoFocusItem","children","className","disabledItemsFocusable","disableListWrap","onKeyDown","variant"];function Q(t,e,o){return t===e?t.firstChild:e&&e.nextElementSibling?e.nextElementSibling:o?null:t.firstChild}function fe(t,e,o){return t===e?o?t.firstChild:t.lastChild:e&&e.previousElementSibling?e.previousElementSibling:o?null:t.lastChild}function xe(t,e){if(e===void 0)return!0;let o=t.innerText;return o===void 0&&(o=t.textContent),o=o.trim().toLowerCase(),o.length===0?!1:e.repeating?o[0]===e.keys[0]:o.indexOf(e.keys.join(""))===0}function W(t,e,o,R,b,w){let f=!1,d=b(t,e,e?o:!1);for(;d;){if(d===t.firstChild){if(f)return!1;f=!0}const u=R?!1:d.disabled||d.getAttribute("aria-disabled")==="true";if(!d.hasAttribute("tabindex")||!xe(d,w)||u)d=b(t,d,o);else return d.focus(),!0}return!1}const Ke=l.forwardRef(function(e,o){const{actions:R,autoFocus:b=!1,autoFocusItem:w=!1,children:f,className:d,disabledItemsFocusable:u=!1,disableListWrap:P=!1,onKeyDown:S,variant:x="selectedMenu"}=e,_=j(e,He),g=l.useRef(null),K=l.useRef({keys:[],repeating:!0,previousKeyMatched:!0,lastTime:null});ze(()=>{b&&g.current.focus()},[b]),l.useImperativeHandle(R,()=>({adjustStyleForScrollbar:(r,{direction:i})=>{const c=!g.current.style.width;if(r.clientHeight<g.current.clientHeight&&c){const h=`${ke(X(r))}px`;g.current.style[i==="rtl"?"paddingLeft":"paddingRight"]=h,g.current.style.width=`calc(100% + ${h})`}return g.current}}),[]);const O=r=>{const i=g.current,c=r.key,h=X(i).activeElement;if(c==="ArrowDown")r.preventDefault(),W(i,h,P,u,Q);else if(c==="ArrowUp")r.preventDefault(),W(i,h,P,u,fe);else if(c==="Home")r.preventDefault(),W(i,null,P,u,Q);else if(c==="End")r.preventDefault(),W(i,null,P,u,fe);else if(c.length===1){const s=K.current,C=c.toLowerCase(),D=performance.now();s.keys.length>0&&(D-s.lastTime>500?(s.keys=[],s.repeating=!0,s.previousKeyMatched=!0):s.repeating&&C!==s.keys[0]&&(s.repeating=!1)),s.lastTime=D,s.keys.push(C);const I=h&&!s.repeating&&xe(h,s);s.previousKeyMatched&&(I||W(i,h,!1,u,Q,s))?r.preventDefault():s.previousKeyMatched=!1}S&&S(r)},p=be(g,o);let n=-1;l.Children.forEach(f,(r,i)=>{if(!l.isValidElement(r)){n===i&&(n+=1,n>=f.length&&(n=-1));return}r.props.disabled||(x==="selectedMenu"&&r.props.selected||n===-1)&&(n=i),n===i&&(r.props.disabled||r.props.muiSkipListHighlight||r.type.muiSkipListHighlight)&&(n+=1,n>=f.length&&(n=-1))});const F=l.Children.map(f,(r,i)=>{if(i===n){const c={};return w&&(c.autoFocus=!0),r.props.tabIndex===void 0&&x==="selectedMenu"&&(c.tabIndex=0),l.cloneElement(r,c)}return r});return H.jsx(je,E({role:"menu",ref:p,className:d,onKeyDown:O,tabIndex:b?0:-1},_,{children:F}))});function Ae(t){return Pe("MuiPopover",t)}ge("MuiPopover",["root","paper"]);const We=["onEntering"],Ue=["action","anchorEl","anchorOrigin","anchorPosition","anchorReference","children","className","container","elevation","marginThreshold","open","PaperProps","slots","slotProps","transformOrigin","TransitionComponent","transitionDuration","TransitionProps","disableScrollLock"],Ge=["slotProps"];function de(t,e){let o=0;return typeof e=="number"?o=e:e==="center"?o=t.height/2:e==="bottom"&&(o=t.height),o}function he(t,e){let o=0;return typeof e=="number"?o=e:e==="center"?o=t.width/2:e==="right"&&(o=t.width),o}function me(t){return[t.horizontal,t.vertical].map(e=>typeof e=="number"?`${e}px`:e).join(" ")}function Z(t){return typeof t=="function"?t():t}const Ve=t=>{const{classes:e}=t;return ye({root:["root"],paper:["paper"]},Ae,e)},qe=U(Oe,{name:"MuiPopover",slot:"Root",overridesResolver:(t,e)=>e.root})({}),we=U(Fe,{name:"MuiPopover",slot:"Paper",overridesResolver:(t,e)=>e.paper})({position:"absolute",overflowY:"auto",overflowX:"hidden",minWidth:16,minHeight:16,maxWidth:"calc(100% - 32px)",maxHeight:"calc(100% - 32px)",outline:0}),Be=l.forwardRef(function(e,o){var R,b,w;const f=ve({props:e,name:"MuiPopover"}),{action:d,anchorEl:u,anchorOrigin:P={vertical:"top",horizontal:"left"},anchorPosition:S,anchorReference:x="anchorEl",children:_,className:g,container:K,elevation:O=8,marginThreshold:p=16,open:n,PaperProps:F={},slots:r,slotProps:i,transformOrigin:c={vertical:"top",horizontal:"left"},TransitionComponent:h=$e,transitionDuration:s="auto",TransitionProps:{onEntering:C}={},disableScrollLock:D=!1}=f,I=j(f.TransitionProps,We),Y=j(f,Ue),T=(R=i==null?void 0:i.paper)!=null?R:F,k=l.useRef(),G=be(k,T.ref),A=E({},f,{anchorOrigin:P,anchorReference:x,elevation:O,marginThreshold:p,externalPaperSlotProps:T,transformOrigin:c,TransitionComponent:h,transitionDuration:s,TransitionProps:I}),V=Ve(A),q=l.useCallback(()=>{if(x==="anchorPosition")return S;const a=Z(u),y=(a&&a.nodeType===1?a:X(k.current).body).getBoundingClientRect();return{top:y.top+de(y,P.vertical),left:y.left+he(y,P.horizontal)}},[u,P.horizontal,P.vertical,S,x]),v=l.useCallback(a=>({vertical:de(a,c.vertical),horizontal:he(a,c.horizontal)}),[c.horizontal,c.vertical]),z=l.useCallback(a=>{const m={width:a.offsetWidth,height:a.offsetHeight},y=v(m);if(x==="none")return{top:null,left:null,transformOrigin:me(y)};const se=q();let N=se.top-y.vertical,$=se.left-y.horizontal;const ie=N+m.height,le=$+m.width,ae=pe(Z(u)),ce=ae.innerHeight-p,ue=ae.innerWidth-p;if(p!==null&&N<p){const M=N-p;N-=M,y.vertical+=M}else if(p!==null&&ie>ce){const M=ie-ce;N-=M,y.vertical+=M}if(p!==null&&$<p){const M=$-p;$-=M,y.horizontal+=M}else if(le>ue){const M=le-ue;$-=M,y.horizontal+=M}return{top:`${Math.round(N)}px`,left:`${Math.round($)}px`,transformOrigin:me(y)}},[u,x,q,v,p]),[Me,te]=l.useState(n),L=l.useCallback(()=>{const a=k.current;if(!a)return;const m=z(a);m.top!==null&&(a.style.top=m.top),m.left!==null&&(a.style.left=m.left),a.style.transformOrigin=m.transformOrigin,te(!0)},[z]);l.useEffect(()=>(D&&window.addEventListener("scroll",L),()=>window.removeEventListener("scroll",L)),[u,D,L]);const Ee=(a,m)=>{C&&C(a,m),L()},Re=()=>{te(!1)};l.useEffect(()=>{n&&L()}),l.useImperativeHandle(d,()=>n?{updatePosition:()=>{L()}}:null,[n,L]),l.useEffect(()=>{if(!n)return;const a=Ne(()=>{L()}),m=pe(u);return m.addEventListener("resize",a),()=>{a.clear(),m.removeEventListener("resize",a)}},[u,n,L]);let oe=s;s==="auto"&&!h.muiSupportAuto&&(oe=void 0);const Se=K||(u?X(Z(u)).body:void 0),J=(b=r==null?void 0:r.root)!=null?b:qe,re=(w=r==null?void 0:r.paper)!=null?w:we,Ce=B({elementType:re,externalSlotProps:E({},T,{style:Me?T.style:E({},T.style,{opacity:0})}),additionalProps:{elevation:O,ref:G},ownerState:A,className:ee(V.paper,T==null?void 0:T.className)}),ne=B({elementType:J,externalSlotProps:(i==null?void 0:i.root)||{},externalForwardedProps:Y,additionalProps:{ref:o,slotProps:{backdrop:{invisible:!0}},container:Se,open:n},ownerState:A,className:ee(V.root,g)}),{slotProps:Te}=ne,Le=j(ne,Ge);return H.jsx(J,E({},Le,!_e(J)&&{slotProps:Te,disableScrollLock:D},{children:H.jsx(h,E({appear:!0,in:n,onEntering:Ee,onExited:Re,timeout:oe},I,{children:H.jsx(re,E({},Ce,{children:_}))}))}))});function Xe(t){return Pe("MuiMenu",t)}ge("MuiMenu",["root","paper","list"]);const Ye=["onEntering"],Je=["autoFocus","children","className","disableAutoFocusItem","MenuListProps","onClose","open","PaperProps","PopoverClasses","transitionDuration","TransitionProps","variant","slots","slotProps"],Qe={vertical:"top",horizontal:"right"},Ze={vertical:"top",horizontal:"left"},et=t=>{const{classes:e}=t;return ye({root:["root"],paper:["paper"],list:["list"]},Xe,e)},tt=U(Be,{shouldForwardProp:t=>De(t)||t==="classes",name:"MuiMenu",slot:"Root",overridesResolver:(t,e)=>e.root})({}),ot=U(we,{name:"MuiMenu",slot:"Paper",overridesResolver:(t,e)=>e.paper})({maxHeight:"calc(100% - 96px)",WebkitOverflowScrolling:"touch"}),rt=U(Ke,{name:"MuiMenu",slot:"List",overridesResolver:(t,e)=>e.list})({outline:0}),ft=l.forwardRef(function(e,o){var R,b;const w=ve({props:e,name:"MuiMenu"}),{autoFocus:f=!0,children:d,className:u,disableAutoFocusItem:P=!1,MenuListProps:S={},onClose:x,open:_,PaperProps:g={},PopoverClasses:K,transitionDuration:O="auto",TransitionProps:{onEntering:p}={},variant:n="selectedMenu",slots:F={},slotProps:r={}}=w,i=j(w.TransitionProps,Ye),c=j(w,Je),h=Ie(),s=E({},w,{autoFocus:f,disableAutoFocusItem:P,MenuListProps:S,onEntering:p,PaperProps:g,transitionDuration:O,TransitionProps:i,variant:n}),C=et(s),D=f&&!P&&_,I=l.useRef(null),Y=(v,z)=>{I.current&&I.current.adjustStyleForScrollbar(v,{direction:h?"rtl":"ltr"}),p&&p(v,z)},T=v=>{v.key==="Tab"&&(v.preventDefault(),x&&x(v,"tabKeyDown"))};let k=-1;l.Children.map(d,(v,z)=>{l.isValidElement(v)&&(v.props.disabled||(n==="selectedMenu"&&v.props.selected||k===-1)&&(k=z))});const G=(R=F.paper)!=null?R:ot,A=(b=r.paper)!=null?b:g,V=B({elementType:F.root,externalSlotProps:r.root,ownerState:s,className:[C.root,u]}),q=B({elementType:G,externalSlotProps:A,ownerState:s,className:C.paper});return H.jsx(tt,E({onClose:x,anchorOrigin:{vertical:"bottom",horizontal:h?"right":"left"},transformOrigin:h?Qe:Ze,slots:{paper:G,root:F.root},slotProps:{root:V,paper:q},open:_,ref:o,transitionDuration:O,TransitionProps:E({onEntering:Y},i),ownerState:s},c,{classes:K,children:H.jsx(rt,E({onKeyDown:T,actions:I,autoFocus:f&&(k===-1||P),autoFocusItem:D,variant:n},S,{className:ee(C.list,S.className),children:d}))}))});export{ft as M,Ke as a};
