import{b0 as c,b1 as _,ap as S,aq as j,aL as x,aj as M,at as o,b2 as f,r as O,ar as E,as as U,j as y,au as A,av as I,i as q}from"./index-DIsnH_Xf.js";import{r as L}from"./createSvgIcon-Wm_MOYli.js";function X(t,e=0,r=1){return _(t,e,r)}function D(t){t=t.slice(1);const e=new RegExp(`.{1,${t.length>=6?2:1}}`,"g");let r=t.match(e);return r&&r[0].length===1&&(r=r.map(a=>a+a)),r?`rgb${r.length===4?"a":""}(${r.map((a,i)=>i<3?parseInt(a,16):Math.round(parseInt(a,16)/255*1e3)/1e3).join(", ")})`:""}function C(t){if(t.type)return t;if(t.charAt(0)==="#")return C(D(t));const e=t.indexOf("("),r=t.substring(0,e);if(["rgb","rgba","hsl","hsla","color"].indexOf(r)===-1)throw new Error(c(9,t));let a=t.substring(e+1,t.length-1),i;if(r==="color"){if(a=a.split(" "),i=a.shift(),a.length===4&&a[3].charAt(0)==="/"&&(a[3]=a[3].slice(1)),["srgb","display-p3","a98-rgb","prophoto-rgb","rec-2020"].indexOf(i)===-1)throw new Error(c(10,i))}else a=a.split(",");return a=a.map(n=>parseFloat(n)),{type:r,values:a,colorSpace:i}}function F(t){const{type:e,colorSpace:r}=t;let{values:a}=t;return e.indexOf("rgb")!==-1?a=a.map((i,n)=>n<3?parseInt(i,10):i):e.indexOf("hsl")!==-1&&(a[1]=`${a[1]}%`,a[2]=`${a[2]}%`),e.indexOf("color")!==-1?a=`${r} ${a.join(" ")}`:a=`${a.join(", ")}`,`${e}(${a})`}function N(t,e){return t=C(t),e=X(e),(t.type==="rgb"||t.type==="hsl")&&(t.type+="a"),t.type==="color"?t.values[3]=`/${e}`:t.values[3]=e,F(t)}function P(t){return String(t).match(/[\d.\-+]*\s*(.*)/)[1]||""}function W(t){return parseFloat(t)}function B(t){return S("MuiSkeleton",t)}j("MuiSkeleton",["root","text","rectangular","rounded","circular","pulse","wave","withChildren","fitContent","heightAuto"]);const K=["animation","className","component","height","style","variant","width"];let l=t=>t,g,m,b,v;const T=t=>{const{classes:e,variant:r,animation:a,hasChildren:i,width:n,height:s}=t;return I({root:["root",r,a,i&&"withChildren",i&&!n&&"fitContent",i&&!s&&"heightAuto"]},B,e)},z=x(g||(g=l`
  0% {
    opacity: 1;
  }

  50% {
    opacity: 0.4;
  }

  100% {
    opacity: 1;
  }
`)),V=x(m||(m=l`
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
`)),G=M("span",{name:"MuiSkeleton",slot:"Root",overridesResolver:(t,e)=>{const{ownerState:r}=t;return[e.root,e[r.variant],r.animation!==!1&&e[r.animation],r.hasChildren&&e.withChildren,r.hasChildren&&!r.width&&e.fitContent,r.hasChildren&&!r.height&&e.heightAuto]}})(({theme:t,ownerState:e})=>{const r=P(t.shape.borderRadius)||"px",a=W(t.shape.borderRadius);return o({display:"block",backgroundColor:t.vars?t.vars.palette.Skeleton.bg:N(t.palette.text.primary,t.palette.mode==="light"?.11:.13),height:"1.2em"},e.variant==="text"&&{marginTop:0,marginBottom:0,height:"auto",transformOrigin:"0 55%",transform:"scale(1, 0.60)",borderRadius:`${a}${r}/${Math.round(a/.6*10)/10}${r}`,"&:empty:before":{content:'"\\00a0"'}},e.variant==="circular"&&{borderRadius:"50%"},e.variant==="rounded"&&{borderRadius:(t.vars||t).shape.borderRadius},e.hasChildren&&{"& > *":{visibility:"hidden"}},e.hasChildren&&!e.width&&{maxWidth:"fit-content"},e.hasChildren&&!e.height&&{height:"auto"})},({ownerState:t})=>t.animation==="pulse"&&f(b||(b=l`
      animation: ${0} 2s ease-in-out 0.5s infinite;
    `),z),({ownerState:t,theme:e})=>t.animation==="wave"&&f(v||(v=l`
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
    `),V,(e.vars||e).palette.action.hover)),et=O.forwardRef(function(e,r){const a=E({props:e,name:"MuiSkeleton"}),{animation:i="pulse",className:n,component:s="span",height:h,style:k,variant:w="text",width:$}=a,d=U(a,K),p=o({},a,{animation:i,component:s,variant:w,hasChildren:!!d.children}),R=T(p);return y.jsx(G,o({as:s,ref:r,className:A(R.root,n),ownerState:p},d,{style:o({width:$,height:h},k)}))});var u={},H=q;Object.defineProperty(u,"__esModule",{value:!0});var J=u.default=void 0,Q=H(L()),Y=y;J=u.default=(0,Q.default)((0,Y.jsx)("path",{d:"m2.53 19.65 1.34.56v-9.03l-2.43 5.86c-.41 1.02.08 2.19 1.09 2.61m19.5-3.7L17.07 3.98c-.31-.75-1.04-1.21-1.81-1.23-.26 0-.53.04-.79.15L7.1 5.95c-.75.31-1.21 1.03-1.23 1.8-.01.27.04.54.15.8l4.96 11.97c.31.76 1.05 1.22 1.83 1.23.26 0 .52-.05.77-.15l7.36-3.05c1.02-.42 1.51-1.59 1.09-2.6M7.88 8.75c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1m-2 11c0 1.1.9 2 2 2h1.45l-3.45-8.34z"}),"Style");export{et as S,N as a,J as d};
