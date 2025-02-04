import{r as t,ak as w,y as c,j as e,al as S,ac as I,am as L,an as A,ah as E}from"./index-BbmGHnRR.js";const D=({category:n,clear:N})=>{const[d,x]=t.useState(""),[a,l]=t.useState(""),[r,{data:o,isSuccess:u,isLoading:m,error:i,reset:j}]=w(),g=f=>{if(f.preventDefault(),!a)return c.warning("Data harus diisi");r({id:d,name:a})},h=()=>{x(""),l(""),N()};return t.useEffect(()=>{u&&(c.success(o.message),x(""),l(""),j()),i&&(console.log(i),c.error(i.data.message),j())},[o,u,i]),t.useEffect(()=>{n&&(x(n.id),l(n.category))},[n]),console.log(n),e.jsxs("form",{className:"p-2 rounded border border-2 d-flex flex-column gap-2 bg-white",onSubmit:g,children:[e.jsx("p",{className:"m-0 h6",children:"Tambah Kategori"}),e.jsx("input",{type:"text",name:"category",id:"i",className:"form-control",required:!0,value:a||"",onChange:f=>l(f.target.value),placeholder:"Kategori Penilaian"}),e.jsxs("div",{className:"text-end",children:[e.jsx("button",{type:"button",className:"btn btn-warning me-2",onClick:h,children:"Batal"}),e.jsx("button",{type:"submit",className:"btn btn-success",children:m?"Loading...":"+ Tambahkan"})]})]})},M=({categories:n,clear:N,indicator:d})=>{const[x,a]=t.useState(""),[l,r]=t.useState(""),[o,u]=t.useState(""),[m,{data:i,isSuccess:j,isLoading:g,error:h,reset:f}]=S(),b=s=>{s.preventDefault(),(!l||!o)&&c.warning("Data harus diisi!"),m({id:x,categoryId:l,name:o})},v=()=>{a(""),u(""),r(""),N()};return t.useEffect(()=>{j&&(c.success(i.message),a(""),r(""),u(""),f()),h&&(console.log(h),c.error(h.data.message),f())},[i,j,h]),t.useEffect(()=>{d&&(a(d.id),u(d.name),r(d.category_id))},[d]),e.jsxs("form",{className:"mt-2 rounded border border-2 bg-white shadow d-flex flex-column gap-2 p-2",onSubmit:b,children:[e.jsx("p",{className:"m-0 h6",children:"Tambah Indikator"}),e.jsxs("select",{name:"cetegory",id:"1",className:"form-select",required:!0,value:l||"",onChange:s=>r(s.target.value),children:[e.jsx("option",{value:"",hidden:!0,children:"Pilih Kategori"}),n==null?void 0:n.map(s=>e.jsx("option",{value:s.id,children:s.category},s.id))]}),e.jsx("input",{type:"text",className:"form-control",placeholder:"Nama Indikator",required:!0,value:o||"",onChange:s=>u(s.target.value)}),e.jsxs("div",{className:"text-end",children:[e.jsx("button",{type:"button",className:"btn btn-warning me-2",onClick:v,children:"Batal"}),e.jsx("button",{type:"submit",className:"btn btn-success",children:g?"Loading...":"+ Tambahkan"})]})]})},k=[{label:"No"},{label:"Kategori Penilaian"},{label:"Indikator"},{label:"Aksi"}],q=()=>{const[n,N]=t.useState({}),[d,x]=t.useState({}),{data:a}=I(),[l,{data:r,isSuccess:o,isLoading:u,error:m,reset:i}]=L(),[j,{data:g,isSuccess:h,isLoading:f,error:b,reset:v}]=A();return t.useEffect(()=>{var s,y;o&&(c.success(r==null?void 0:r.message),i()),h&&(c.success(g==null?void 0:g.message),v()),m&&(c.error((s=m==null?void 0:m.data)==null?void 0:s.message),i()),b&&(c.error((y=b==null?void 0:b.data)==null?void 0:y.message),v())},[o,h,m,b,r,g,i,v]),e.jsx(E,{title:"Metriks",children:e.jsxs("div",{className:"row",children:[e.jsxs("div",{className:"col-md-3 col-12",children:[e.jsx(D,{category:n,clear:()=>N({})}),e.jsx(M,{categories:a,indicator:d,clear:()=>x({})})]}),e.jsx("div",{className:"col-md-9 col-12",children:e.jsx("div",{className:"table-responsive rounded p-2 border border-2 shadow bg-white",children:e.jsxs("table",{className:"table table-striped table-hover",children:[e.jsx("thead",{children:e.jsx("tr",{children:k==null?void 0:k.map(s=>e.jsx("th",{scope:"col",className:"text-center",children:s.label},s.label))})}),e.jsx("tbody",{children:a==null?void 0:a.map((s,y)=>e.jsxs("tr",{children:[e.jsx("th",{scope:"col",className:"text-center align-middle",children:y+1}),e.jsx("td",{className:"align-middle",children:s.category}),e.jsx("td",{className:"align-middle",children:e.jsx("div",{className:"d-flex flex-column gap-2",children:Array.isArray(s.indicators)&&s.indicators.filter(p=>p!==null).length>0?s.indicators.filter(p=>p!==null).map((p,C)=>e.jsxs("div",{className:"d-flex align-items-center justify-content-between p-2 rounded border border-2 pointer",children:[e.jsx("p",{className:"m-0",children:p.name}),e.jsxs("div",{className:"d-flex align-items-center gap-2",children:[e.jsx("div",{className:"rounded-circle d-flex align-items-center justify-content-center bg-warning pointer",style:{height:30,width:30},onClick:()=>x(p),children:e.jsx("i",{className:"bi bi-pencil-square"})}),e.jsx("div",{className:"rounded-circle d-flex align-items-center justify-content-center bg-danger pointer",style:{height:30,width:30},onClick:()=>j(p.id),children:e.jsx("i",{className:"bi bi-x text-white"})})]})]},C)):e.jsx("p",{className:"m-0 text-muted",children:"Belum ada indikator untuk kategori ini"})})}),e.jsx("td",{className:"align-middle",children:e.jsxs("div",{className:"d-flex justify-content-center gap-2",children:[e.jsx("button",{className:"btn btn-warning",onClick:()=>N(s),children:"Edit"}),e.jsx("button",{className:"btn btn-danger",onClick:()=>l(s.id),children:u?"Loading...":"Hapus"})]})})]},y))})]})})})]})})};export{q as default};
