import{ap as w,aq as R,b9 as b,S,at as o,bi as p,r as j,ar as M,as as U,j as C,au as $,av as q,i as A}from"./index-DGvpjgWm.js";import{a as X}from"./colorManipulator-BuMbTll3.js";import{r as D}from"./createSvgIcon-DOM3wMaB.js";function E(t){return String(t).match(/[\d.\-+]*\s*(.*)/)[1]||""}function L(t){return parseFloat(t)}function N(t){return w("MuiSkeleton",t)}R("MuiSkeleton",["root","text","rectangular","rounded","circular","pulse","wave","withChildren","fitContent","heightAuto"]);const P=["animation","className","component","height","style","variant","width"];let s=t=>t,m,f,g,v;const B=t=>{const{classes:a,variant:e,animation:i,hasChildren:r,width:l,height:n}=t;return q({root:["root",e,i,r&&"withChildren",r&&!l&&"fitContent",r&&!n&&"heightAuto"]},N,a)},F=b(m||(m=s`
  0% {
    opacity: 1;
  }

  50% {
    opacity: 0.4;
  }

  100% {
    opacity: 1;
  }
`)),I=b(f||(f=s`
  0% {
    transform: translateX(-100%);
  }

  50% {
    /* +0.5s of delay between each loop */
    transform: translateX(100%);
  }

  100% {
    transform: translateX(100%);
  }
`)),K=S("span",{name:"MuiSkeleton",slot:"Root",overridesResolver:(t,a)=>{const{ownerState:e}=t;return[a.root,a[e.variant],e.animation!==!1&&a[e.animation],e.hasChildren&&a.withChildren,e.hasChildren&&!e.width&&a.fitContent,e.hasChildren&&!e.height&&a.heightAuto]}})(({theme:t,ownerState:a})=>{const e=E(t.shape.borderRadius)||"px",i=L(t.shape.borderRadius);return o({display:"block",backgroundColor:t.vars?t.vars.palette.Skeleton.bg:X(t.palette.text.primary,t.palette.mode==="light"?.11:.13),height:"1.2em"},a.variant==="text"&&{marginTop:0,marginBottom:0,height:"auto",transformOrigin:"0 55%",transform:"scale(1, 0.60)",borderRadius:`${i}${e}/${Math.round(i/.6*10)/10}${e}`,"&:empty:before":{content:'"\\00a0"'}},a.variant==="circular"&&{borderRadius:"50%"},a.variant==="rounded"&&{borderRadius:(t.vars||t).shape.borderRadius},a.hasChildren&&{"& > *":{visibility:"hidden"}},a.hasChildren&&!a.width&&{maxWidth:"fit-content"},a.hasChildren&&!a.height&&{height:"auto"})},({ownerState:t})=>t.animation==="pulse"&&p(g||(g=s`
      animation: ${0} 2s ease-in-out 0.5s infinite;
    `),F),({ownerState:t,theme:a})=>t.animation==="wave"&&p(v||(v=s`
      position: relative;
      overflow: hidden;

      /* Fix bug in Safari https://bugs.webkit.org/show_bug.cgi?id=68196 */
      -webkit-mask-image: -webkit-radial-gradient(white, black);

      &::after {
        animation: ${0} 2s linear 0.5s infinite;
        background: linear-gradient(
          90deg,
          transparent,
          ${0},
          transparent
        );
        content: '';
        position: absolute;
        transform: translateX(-100%); /* Avoid flash during server-side hydration */
        bottom: 0;
        left: 0;
        right: 0;
        top: 0;
      }
    `),I,(a.vars||a).palette.action.hover)),J=j.forwardRef(function(a,e){const i=M({props:a,name:"MuiSkeleton"}),{animation:r="pulse",className:l,component:n="span",height:u,style:k,variant:x="text",width:y}=i,c=U(i,P),h=o({},i,{animation:r,component:n,variant:x,hasChildren:!!c.children}),_=B(h);return C.jsx(K,o({as:n,ref:e,className:$(_.root,l),ownerState:h},c,{style:o({width:y,height:u},k)}))});var d={},O=A;Object.defineProperty(d,"__esModule",{value:!0});var W=d.default=void 0,z=O(D()),T=C;W=d.default=(0,z.default)((0,T.jsx)("path",{d:"m2.53 19.65 1.34.56v-9.03l-2.43 5.86c-.41 1.02.08 2.19 1.09 2.61m19.5-3.7L17.07 3.98c-.31-.75-1.04-1.21-1.81-1.23-.26 0-.53.04-.79.15L7.1 5.95c-.75.31-1.21 1.03-1.23 1.8-.01.27.04.54.15.8l4.96 11.97c.31.76 1.05 1.22 1.83 1.23.26 0 .52-.05.77-.15l7.36-3.05c1.02-.42 1.51-1.59 1.09-2.6M7.88 8.75c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1m-2 11c0 1.1.9 2 2 2h1.45l-3.45-8.34z"}),"Style");export{J as S,W as d};
