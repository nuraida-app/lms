import{r as l,j as e,a9 as E,aa as A,y as C}from"./index-BbmGHnRR.js";import{L as $}from"./Layout-VSuejT0k.js";import{M as K,a as M}from"./index-BTG1MRsM.js";const V=({children:r,page:t,totalPages:i,setLimit:g,setPage:m,onValue:h})=>{const[p,c]=l.useState(""),[o,x]=l.useState(10),u=n=>{const s=n.target.value;console.log(s),c(s),h&&h(s)},d=n=>{m(n)},b=n=>{const s=Number(n.target.value);g(s),x(s),m(1)};return e.jsxs("div",{className:"container-fluid p-2 shadow rounded mt-2 bg-white",children:[e.jsxs("div",{className:"col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3 d-flex justify-content-between",role:"search",children:[e.jsx("div",{className:"d-flex align-items-center",children:e.jsx("input",{type:"text",className:"form-control",placeholder:"Cari ...",value:p,onChange:u})}),e.jsx("div",{className:"d-flex align-items-center",children:e.jsxs("select",{className:"form-select form-select-sm",value:o,onChange:b,children:[e.jsx("option",{value:"10",children:"10"}),e.jsx("option",{value:"20",children:"20"}),e.jsx("option",{value:"30",children:"30"}),e.jsx("option",{value:"50",children:"50"}),e.jsx("option",{value:"100",children:"100"})]})})]}),e.jsx("div",{className:"table-responsive my-2",children:r}),e.jsxs("nav",{className:"d-flex justify-content-between align-items-center flex-wrap",children:[e.jsxs("ul",{className:"pagination pagination-sm justify-content-center m-0 d-flex flex-wrap",children:[e.jsx("li",{className:`page-item ${t===1?"disabled":""}`,children:e.jsx("button",{className:"page-link",onClick:()=>d(t-1),disabled:t===1,children:e.jsx(K,{})})}),[...Array(i).keys()].map((n,s)=>e.jsx("li",{className:`page-item ${t===s+1?"active":""}`,children:e.jsx("button",{className:"page-link",onClick:()=>d(s+1),children:s+1})},s+1)),e.jsx("li",{className:`page-item ${t===i?"disabled":""}`,children:e.jsx("button",{className:"page-link",onClick:()=>d(t+1),disabled:t>=i,children:e.jsx(M,{})})})]}),e.jsxs("div",{children:["Halaman ",t," dari ",i]})]})]})},H=[{label:"No"},{label:"NIS"},{label:"Nama Lengkap"},{label:"Tingkat"},{label:"Kelas"},{label:"Status"},{label:"Kelengkapan"},{label:"Aksi"}],_=()=>{const[r,t]=l.useState(1),[i,g]=l.useState(10),[m,h]=l.useState(""),p="",[c,o]=l.useState({}),[x,u]=l.useState(""),[d,b]=l.useState(""),{data:n={},refetch:s}=E({page:r,limit:i,search:m,classCode:p}),{database:N=[],totalPages:S,totalData:I}=n,[L,{data:v,isSuccess:k,isLoading:y,error:f,reset:w}]=A(),D=()=>{const a={nis:x,name:d};L({id:c.id,body:a})};return l.useEffect(()=>{k&&(C.success(v.message),s(),o({}),w()),f&&(C.error(f.data.message),w())},[v,k,f]),l.useEffect(()=>{c&&(u(c.nis),b(c.nama_lengkap))},[c]),e.jsxs($,{title:"Database Pusat",children:[e.jsx(V,{page:r,setPage:a=>t(a),setLimit:a=>g(a),onValue:a=>h(a),totalPages:S,children:e.jsxs("table",{className:"table table-striped table-hover mt-2",children:[e.jsx("thead",{children:e.jsx("tr",{children:H.map((a,j)=>e.jsx("th",{scope:"col",className:"text-center",children:a.label},j))})}),e.jsx("tbody",{children:N==null?void 0:N.map((a,j)=>e.jsxs("tr",{children:[e.jsx("th",{scope:"row",className:"text-center align-middle",children:(r-1)*i+j+1}),e.jsx("td",{className:"text-center align-middle",children:a.nis}),e.jsx("td",{className:" align-middle",children:a.nama_lengkap}),e.jsx("td",{className:"text-center align-middle",children:a.tingkat}),e.jsx("td",{className:"text-center align-middle",children:a.kelas}),e.jsx("td",{className:"text-center align-middle",children:a.status?e.jsxs("div",{className:"d-flex gap-2 align-items-center justify-content-center",children:[e.jsx("div",{className:"rounded-circle bg-success",style:{height:10,width:10}}),e.jsx("p",{className:"m-0",children:"Aktif"})]}):e.jsxs("div",{className:"d-flex gap-2 align-items-center justify-content-center",children:[e.jsx("div",{className:"rounded-circle bg-danger",style:{height:10,width:10}}),e.jsx("p",{className:"m-0",children:"off"})]})}),e.jsx("td",{className:"text-center align-middle",children:e.jsx("div",{className:"progress",children:e.jsx("div",{className:"progress-bar",role:"progressbar",style:{width:`${a.kelengkapan}%`},"aria-valuenow":a.kelengkapan,"aria-valuemin":"0","aria-valuemax":100,children:`${a.kelengkapan}%`})})}),e.jsx("td",{className:"text-center align-middle",children:e.jsxs("div",{className:"d-flex justify-content-center gap-2",children:[e.jsx("button",{className:"btn btn-warning","data-bs-toggle":"modal","data-bs-target":"#edit",onClick:()=>o(a),children:"Edit"}),e.jsx("button",{className:"btn btn-danger",children:"Hapus"})]})})]},j))})]})}),e.jsx("div",{className:"modal fade",id:"edit","data-bs-backdrop":"static","data-bs-keyboard":"false",tabIndex:"-1","aria-labelledby":"staticBackdropLabel","aria-hidden":"true",children:e.jsx("div",{className:"modal-dialog modal-dialog-centered",children:e.jsxs("div",{className:"modal-content",children:[e.jsxs("div",{className:"modal-header",children:[e.jsx("h1",{className:"modal-title fs-5",children:"Edit Data Siswa"}),e.jsx("button",{type:"button",className:"btn-close","data-bs-dismiss":"modal","aria-label":"Close"})]}),e.jsx("div",{className:"modal-body",children:e.jsxs("form",{action:"",className:"d-flex flex-column gap-2",children:[e.jsx("input",{type:"text",className:"form-control",placeholder:"NIS",name:"nis",value:x||"",onChange:a=>u(a.target.value)}),e.jsx("input",{type:"text",className:"form-control",placeholder:"Nama Lengkap",name:"name",value:d||"",onChange:a=>b(a.target.value)})]})}),e.jsxs("div",{className:"modal-footer",children:[e.jsx("button",{type:"button",className:"btn btn-secondary","data-bs-dismiss":"modal",onClick:()=>o({}),children:"Tutup"}),e.jsx("button",{type:"buttin",className:"btn btn-success",onClick:D,disabled:!!y,children:y?"Loading...":"Simpan"})]})]})})})]})};export{_ as default};
