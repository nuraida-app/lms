import{e as h,H as p,u,I as v,j as a,r as j,P as f,M as N,J as L}from"./index-DnLSs86n.js";import{A as T}from"./Menus-C_0QUNbK.js";import{T as y}from"./Menus-CeiNyHsH.js";const A=({children:o,title:l})=>{const s=h(),r=p(),{user:n}=u(e=>e.auth),[i,{isloading:c,error:k}]=v(),t=n==null?void 0:n.role,d=n==null?void 0:n.name,g=e=>{s(e)},m=()=>{s("/guru-database")},b=async()=>{try{await i().unwrap(),r(L()),s("/")}catch(e){console.log(e.data.message)}};return a.jsxs(j.Fragment,{children:[a.jsx(f,{roles:["admin","teacher"]}),a.jsx(N,{title:l}),a.jsx("div",{className:"container-fluid fixed-top bg-info",children:a.jsx("nav",{className:"navbar navbar-expand-lg","aria-label":"Thirteenth navbar example",children:a.jsxs("div",{className:"container-fluid",children:[a.jsx("a",{className:"navbar-brand col-lg-2 me-0 text-white",href:t==="admin"?"/admin-dashboard":"/guru-profil",children:t==="admin"?"Admin Satuan":d}),a.jsx("button",{className:"navbar-toggler",type:"button","data-bs-toggle":"collapse","data-bs-target":"#navbarsExample11","aria-controls":"navbarsExample11","aria-expanded":"false","aria-label":"Toggle navigation",children:a.jsx("span",{className:"navbar-toggler-icon"})}),a.jsx("div",{className:"collapse navbar-collapse d-lg-flex",id:"navbarsExample11",children:a.jsxs("div",{className:"navbar-nav col-12 justify-content-lg-end d-flex gap-2",children:[(t==="admin"?T:y).map((e,x)=>a.jsx("button",{className:"btn btn-light",onClick:()=>g(e.link),children:e.label},x)),n&&(n==null?void 0:n.homeroom)===1&&a.jsx("button",{className:"btn btn-warning",onClick:m,children:"Database"}),c?a.jsx(BtnLoader,{}):a.jsx("button",{className:"btn btn-danger",onClick:b,children:"Logout"})]})})]})})}),a.jsx("div",{className:"container-fluid bg-light",style:{marginTop:"65px",height:"calc(100vh - 65px)"},children:o})]})};export{A as L};
