import{c as L,av as E,r as n,y as x,j as e,B as k,e as D,aw as G,ax as I,ay as P}from"./index-BbmGHnRR.js";import{L as M}from"./Layout-C2XmC0_F.js";import{T as $}from"./TabelContainer-DIYxBcPO.js";import"./Menus-C_0QUNbK.js";import"./index-BTG1MRsM.js";const A=({detail:a})=>{const{data:c}=L(),[v,{data:b,isSuccess:j,isLoading:C,error:l,reset:o}]=E(),[d,i]=n.useState("default"),[r,m]=n.useState(""),[g,u]=n.useState(""),[S,f]=n.useState(""),p=t=>{t.preventDefault(),d==="default"&&x.error("Tingkat harus dipilih"),v({body:{gradeId:d,name:r,code:g},id:S})};return n.useEffect(()=>{j&&(x.success(b.message),i(""),u(""),m(""),o(),close()),l&&x.error(l.data.message)},[b,j,l]),n.useEffect(()=>{a&&(i(a==null?void 0:a.grade_id),m(a==null?void 0:a.name),u(a==null?void 0:a.code),f(a==null?void 0:a.id))},[a]),e.jsxs("div",{className:"d-flex flex-column gap-2 rounded p-2 shadow mt-2 bg-white border border-2",children:[e.jsx("p",{className:"m-0 h5",children:"Tambahkan Data Kelas"}),e.jsxs("form",{action:"",className:"d-flex flex-column gap-2",onSubmit:p,children:[e.jsxs("select",{name:"grade",id:"",className:"form-control",value:d,onChange:t=>i(t.target.value),children:[e.jsx("option",{value:"default",children:"--Pilih Tingkat--"}),c==null?void 0:c.map(t=>e.jsx("option",{value:t.id,children:t.grade},t.id))]}),e.jsx("input",{type:"text",name:"name",id:"",placeholder:"Kelas",className:"form-control",value:r||"",onChange:t=>m(t.target.value)}),e.jsx("input",{type:"number",name:"code",id:"",placeholder:"Kode Kelas",className:"form-control",value:g||"",onChange:t=>u(t.target.value)}),C?e.jsx(k,{}):e.jsx("button",{type:"submit",className:"btn btn-success",children:"+ Tambahkan"})]})]})},B=[{label:"No"},{label:"Satuan"},{label:"Tingkat"},{label:"Kode Kelas"},{label:"Kelas"},{label:"Jumlah Siswa"},{label:"Aksi"}],R=()=>{const a=D(),[c,v]=n.useState(1),[b,j]=n.useState(10),[C,l]=n.useState(""),[o,d]=n.useState(""),{data:i={}}=G({page:c,limit:b,search:C}),{classes:r=[],totalPages:m}=i,[g,{data:u}]=I(),[S,{data:f,isSuccess:p,isLoading:t,error:N,reset:y}]=P(),w=(s,h,K)=>a(`/admin-kelas-daftar-siswa/${s}/${h}/${K}`),T=s=>S(s);return n.useEffect(()=>{o&&g(o)},[o]),n.useEffect(()=>{p&&(x.success(f.message),y()),N&&(x.error(N.data.message),y())},[f,p,N]),e.jsx(M,{title:"Daftar Kelas",children:e.jsxs("div",{className:"row",style:{height:"100%"},children:[e.jsx("div",{className:"col-lg-3 col-12",children:e.jsx(A,{detail:u})}),e.jsx("div",{className:"col-lg-9 col-12",children:e.jsx($,{page:c,setPage:s=>v(s),setLimit:s=>j(s),onValue:s=>l(s),totalPages:m,children:e.jsxs("table",{className:"table table-striped table-hover mt-2",children:[e.jsx("thead",{children:e.jsx("tr",{children:B.map((s,h)=>e.jsx("th",{scope:"col",className:"text-center",children:s.label},h))})}),e.jsx("tbody",{children:r==null?void 0:r.map((s,h)=>e.jsxs("tr",{children:[e.jsx("th",{scope:"row",className:"text-center",children:h+1}),e.jsx("td",{className:"text-center",children:s.homebase}),e.jsx("td",{className:"text-center",children:s.grade}),e.jsx("td",{className:"text-center",children:s.code}),e.jsx("td",{className:"text-center",children:s.name}),e.jsx("td",{className:"text-center",children:s.students}),e.jsx("td",{children:e.jsxs("div",{className:"d-flex justify-content-center gap-2",children:[e.jsx("button",{className:"btn btn-primary",onClick:()=>w(s.grade_id,s.name,s.code),children:"Tambah Siswa"}),e.jsx("button",{className:"btn btn-warning",onClick:()=>d(s.id),children:"Edit"}),t?e.jsx(k,{}):e.jsx("button",{className:"btn btn-danger",onClick:()=>T(s.id),children:"Hapus"})]})})]},s.id))})]})})})]})})};export{R as default};
