import{r as n,a as ae,aw as te,K as ne,aI as ce,aJ as le,y as d,j as e,B as _,aK as oe,b as re,aL as de}from"./index-BbmGHnRR.js";import{L as ie}from"./Layout-C2XmC0_F.js";import{r as me,u as he}from"./xlsx-R0LD_mVJ.js";import{T as ue}from"./TabelContainer-DIYxBcPO.js";import"./Menus-C_0QUNbK.js";import"./index-BTG1MRsM.js";const be=({detail:a,id:j})=>{const i="",f="",g="",[N,o]=n.useState(null),{data:m}=ae(),{data:T={}}=te({page:i,limit:f,search:g}),{classes:h=[]}=T,{data:L={}}=ne({page:i,limit:f,search:g}),{subjects:u=[]}=L,[D,{data:k,isSuccess:b,isLoading:y,error:x,reset:r}]=ce(),[v,{data:C,isSuccess:t,isLoading:P,error:l,reset:S}]=le(),[M,B]=n.useState(""),[Q,E]=n.useState(""),[A,G]=n.useState([]),[U,H]=n.useState([]),[I,F]=n.useState(""),[$,w]=n.useState(""),R=s=>{G(c=>c.includes(s)?c.filter(p=>p!==s):[...c,s])},J=s=>{H(c=>c.includes(s)?c.filter(p=>p!==s):[...c,s])},W=s=>{const c=parseInt(s);F(c),s==="2"&&w("")},O=s=>{s.preventDefault(),D({id:j,nip:M,name:Q,subjectCodes:A,homeIds:U,homeroom:I,classCode:$})},V=()=>{window.open("/temp/guru_template.xlsx","_blank")},Y=s=>{o(s.target.files[0])},z=()=>{if(N){const s=new FileReader;s.onload=c=>{const p=new Uint8Array(c.target.result),q=me(p,{type:"array"}),X=q.SheetNames[0],Z=q.Sheets[X],ee={data:he.sheet_to_json(Z,{header:1,range:1}).filter(se=>se.length>0)};v(ee)},s.readAsArrayBuffer(N)}};return n.useEffect(()=>{b&&(d.success(k.message),r(),B(""),E(""),F(""),w(""),G([]),H([]),window.location.reload()),x&&(d.error(x.data.message),r())},[k,b,x]),n.useEffect(()=>{t&&(d.success(C.message),S(),o(null)),l&&(d.error(l.data.message),S())},[C,t,l]),n.useEffect(()=>{a&&(B((a==null?void 0:a.nip)||""),E((a==null?void 0:a.name)||""),F((a==null?void 0:a.homeroom)||""),w((a==null?void 0:a.class_code)||""),G((a==null?void 0:a.subject_code.map(String))||[]),H((a==null?void 0:a.homebase_id)||[]))},[a,j]),e.jsxs("div",{className:"mt-2 p-2 shadow rounded d-flex flex-column gap-2 bg-white border border-2",children:[e.jsx("p",{className:"h5",children:"Tambahkan Guru"}),e.jsxs("form",{className:"d-flex flex-column gap-2",onSubmit:O,children:[e.jsx("input",{type:"text",name:"nip",className:"form-control",placeholder:"NIP",value:M,onChange:s=>B(s.target.value),required:!0}),e.jsx("input",{type:"text",name:"nama",className:"form-control",placeholder:"Nama Lengkap",value:Q,onChange:s=>E(s.target.value),required:!0}),e.jsxs("select",{name:"",id:"",className:"form-control",value:I,onChange:s=>W(s.target.value),required:!0,children:[e.jsx("option",{value:"",disabled:!0,hidden:!0,children:"Pilih Wali Kelas"}),e.jsx("option",{value:"1",children:"Ya"}),e.jsx("option",{value:"2",children:"Tidak"})]}),I===1&&e.jsxs("div",{style:{height:200},className:"p-2 rounded border border-sm overflow-auto",children:[e.jsx("p",{className:"m-0",children:"Pilih Kelas"}),h==null?void 0:h.map(s=>e.jsxs("div",{className:"form-check",children:[e.jsx("input",{className:"form-check-input",type:"checkbox",value:"",id:`class-${s.id}`,checked:$===s.code,onChange:()=>w(s.code)}),e.jsx("label",{className:"form-check-label",htmlFor:"flexCheckChecked",children:s.name})]},s.id))]}),e.jsxs("div",{style:{height:200},className:"p-2 rounded border border-sm overflow-auto",children:[e.jsx("p",{className:"m-0",children:"Pilih Mata Pelajaran"}),u==null?void 0:u.map((s,c)=>e.jsxs("div",{className:"form-check",children:[e.jsx("input",{className:"form-check-input",type:"checkbox",value:"",checked:A.includes(s.code),onChange:()=>R(s.code)}),e.jsx("label",{className:"form-check-label",htmlFor:"flexCheckChecked",children:s.name})]},c))]}),e.jsxs("div",{style:{height:100},className:"p-2 rounded border border-sm",children:[e.jsx("p",{className:"m-0",children:"Pilih tempat satuan ajar"}),m==null?void 0:m.map(s=>e.jsxs("div",{className:"form-check",children:[e.jsx("input",{className:"form-check-input",type:"checkbox",value:"",id:`home-${s.id}`,checked:U.includes(s.id),onChange:()=>J(s.id)}),e.jsx("label",{className:"form-check-label",htmlFor:"flexCheckChecked",children:s.name})]},s.id))]}),y?e.jsx(_,{}):e.jsx("button",{type:"submit",className:"btn btn-success",children:"+ Tambahkan"})]}),e.jsx("button",{type:"button",className:"btn btn-info","data-bs-toggle":"modal","data-bs-target":"#staticBackdrop",children:"Unggah Berkas"}),e.jsx("div",{className:"modal fade",id:"staticBackdrop","data-bs-backdrop":"static","data-bs-keyboard":"false",tabIndex:"-1","aria-labelledby":"staticBackdropLabel","aria-hidden":"true",children:e.jsx("div",{className:"modal-dialog modal-dialog-centered",children:e.jsxs("div",{className:"modal-content",children:[e.jsxs("div",{className:"modal-header",children:[e.jsx("h5",{className:"modal-title",id:"staticBackdropLabel",children:"Pilih Berkas"}),e.jsx("button",{type:"button",className:"btn-close","data-bs-dismiss":"modal","aria-label":"Close"})]}),e.jsx("div",{className:"modal-body d-flex flex-column align-items-end gap-2",children:e.jsx("input",{type:"file",name:"file",className:"form-control",onChange:Y})}),e.jsxs("div",{className:"modal-footer",children:[e.jsx("button",{type:"button",className:"btn btn-warning",onClick:V,children:"Template"}),e.jsx("button",{type:"button",className:"btn btn-danger","data-bs-dismiss":"modal",children:"Tutup"}),P?e.jsx(_,{}):e.jsx("button",{type:"button",className:"btn btn-primary",onClick:z,children:"Unggah"})]})]})})})]})},K=[{label:"No"},{label:"NIP"},{label:"Nama"},{label:"Mapel"},{label:"Wali Kelas"},{label:"Kelas"},{label:"Aksi"}],ve=()=>{const[a,j]=n.useState(1),[i,f]=n.useState(10),[g,N]=n.useState(""),[o,m]=n.useState(""),{data:T}=oe(o,{skip:!o}),{data:h={}}=re({page:a,limit:i,search:g}),{teachers:L=[],totalPages:u,total:D}=h,[k,{data:b,isSuccess:y,isLoading:x,error:r,reset:v}]=de(),C=t=>k(t);return n.useEffect(()=>{y&&(d.success(b.message),v()),r&&(d.error(r.data.message),v())},[b,y,r]),e.jsx(ie,{title:"Daftar Guru",children:e.jsxs("div",{className:"row",style:{height:"100%"},children:[e.jsx("div",{className:"col-lg-3 col-12",children:e.jsx(be,{detail:T,id:o})}),e.jsx("div",{className:"col-lg-9 col-12",children:e.jsxs(ue,{page:a,setPage:t=>j(t),setLimit:t=>f(t),onValue:t=>N(t),totalPages:u,children:[e.jsxs("div",{className:"d-flex align-items-center justify-content-between",children:[e.jsxs("p",{className:"h6",children:["Jumlah Guru: ",e.jsx("span",{children:D})]}),e.jsx("button",{className:"btn btn-danger",children:"Kosongkan Data"})]}),e.jsxs("table",{className:"table table-striped table-hover mt-2",children:[e.jsx("thead",{children:e.jsx("tr",{children:K==null?void 0:K.map(t=>e.jsx("th",{scope:"col",className:"text-center",children:t.label},t.label))})}),e.jsx("tbody",{children:L.map((t,P)=>e.jsxs("tr",{children:[e.jsx("th",{scope:"row",className:"align-middle text-center",children:(a-1)*i+P+1}),e.jsx("td",{className:"align-middle text-center",children:t.nip}),e.jsx("td",{className:"align-middle",children:t.name}),e.jsx("td",{className:"align-middle",children:[...new Set(t.subjects.map(l=>l.subject))].map((l,S)=>e.jsx("p",{className:"m-0",children:l},`${t.id}-${S}`))}),e.jsx("td",{className:"align-middle text-center",children:e.jsx("input",{type:"checkbox",name:"",id:"",checked:t.homeroom===1?"checked":null,readOnly:!0})}),e.jsx("td",{className:"align-middle text-center",children:t.class}),e.jsx("td",{className:"align-middle",children:e.jsxs("div",{className:"d-flex align-items-center justify-content-center gap-2",children:[e.jsx("button",{className:"btn btn-warning",onClick:()=>m(t.id),children:"Edit"}),x?e.jsx(_,{}):e.jsx("button",{className:"btn btn-danger",onClick:()=>C(t.id),children:"Hapus"})]})})]},t.id))})]})]})})]})})};export{ve as default};
