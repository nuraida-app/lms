import{M as C,N as P,r as n,B as w,j as e,c as b,C as y,O as D,P as L,Q as M}from"./index-BzybVbrz.js";import{P as R}from"./PageName-9XwMDVQ1.js";import{L as U}from"./Layout-B7oQszLo.js";import{d as E}from"./Remove-DRFt6Nyr.js";import{d as H,a as $}from"./FolderDelete-BVIxSUs1.js";import{d as z,a as G}from"./InsertDriveFileOutlined-Bo2mQY97.js";/* empty css               */import{M as I,B as q,F as A}from"./Modal-D5yutoIL.js";import{I as T}from"./Input-DoWOYfms.js";import{B as j}from"./Button-6o8cGekH.js";import{r as O,u as Q}from"./xlsx-DT8pmw08.js";import{P as W}from"./Paper-Dzbso0eQ.js";import{T as K}from"./TableContainer-CGA7DdEE.js";import{T as J,a as v,b as h,c as V}from"./TableRow-5Ecg2L20.js";import{T as X}from"./TableHead-CiqNORav.js";import{I as Y}from"./IconButton-BB4rgvuw.js";import{G as Z}from"./Grid-Bpe-Rk4C.js";import"./FolderCopy-CKLfXymE.js";import"./getThemeProps-Z5o_4JZP.js";import"./Typography-C-qplh4g.js";import"./createSvgIcon-CZqlXMQ-.js";import"./GlobalStyles-015m-8mF.js";import"./listItemIconClasses-DoJF8eQE.js";import"./useTheme-BALbJBkz.js";import"./ChevronRight-WhqIRLcc.js";import"./PeopleAlt-DuozmEm1.js";import"./CalendarMonth-CZNFJnn1.js";import"./Style-D9dG96sd.js";import"./colorManipulator-BLd52KTc.js";import"./ExitToApp-CbGQ45gm.js";import"./Toolbar-D4YRnJLK.js";import"./utils-BZNFuFIh.js";const ee=({open:u,close:t})=>{const a=C(),[l,{data:i,isSuccess:r,isLoading:d,error:o,reset:m}]=P(),[p,x]=n.useState(""),g=a.gradeId,f=a.code,S=s=>{s.preventDefault(),l({nis:p,gradeId:g,code:f})};return n.useEffect(()=>{r&&(w.success(i.message),x(""),t(),m()),o&&w.error(o.data.message)},[r,i,o]),e.jsx(I,{open:u,onClose:t,closeAfterTransition:!0,slots:{backdrop:q},slotProps:{backdrop:{timeout:500}},children:e.jsx(A,{in:u,children:e.jsx(b,{sx:{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)",width:400,bgcolor:"#ffff",boxShadow:24,p:2,borderRadius:"5px"},children:e.jsxs("form",{className:"form-class",onSubmit:S,children:[e.jsx(T,{placeholder:"Masukan NIS",value:p,onChange:s=>x(s.target.value),required:!0}),e.jsx(j,{variant:"contained",color:"primary",type:"submit",children:d?e.jsx(y,{size:20,color:"inherit"}):"Tambah"})]})})})})},se=({open:u,close:t})=>{const a=C(),l=a.gradeId,i=a.code,[r,{data:d,isSuccess:o,error:m,isLoading:p}]=D(),[x,g]=n.useState(null),f=s=>{g(s.target.files[0])},S=()=>{if(x){const s=new FileReader;s.onload=c=>{const B=new Uint8Array(c.target.result),k=O(B,{type:"array"}),F=k.SheetNames[0],N=k.Sheets[F],_={data:Q.sheet_to_json(N,{header:1,range:1})};r({gradeId:l,code:i,body:_})},s.readAsArrayBuffer(x)}};return n.useEffect(()=>{o&&(w.success(d.message),g(null),t()),m&&w.error(m.data.message)},[o,d,m]),e.jsx(I,{open:u,onClose:t,closeAfterTransition:!0,children:e.jsx(A,{in:u,children:e.jsx(b,{sx:{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)",width:{xs:350,md:400},bgcolor:"#ffff",boxShadow:24,p:2,borderRadius:"5px"},children:e.jsxs(b,{sx:{width:"100%",display:"flex",flexDirection:"column"},children:[e.jsx(T,{required:!0,fullWidth:!0,type:"file",placeholder:"Upload file here",onChange:f}),e.jsxs(b,{sx:{display:"flex",gap:2,justifyContent:"flex-end",mt:1},children:[e.jsx(j,{variant:"outlined",color:"error",onClick:t,children:"cancel"}),e.jsx(j,{variant:"contained",color:"success",onClick:S,children:p?e.jsx(y,{size:20,color:"inherit"}):"upload"})]})]})})})})},te=()=>{const[u,t]=n.useState(!1),[a,l]=n.useState(!1),[i,r]=n.useState(!1),d=()=>{open("/siswa_kelas_templete.xlsx","_blank")};return e.jsxs(b,{sx:{display:"flex",justifyContent:{xs:"start",md:"end"},gap:1,flexWrap:"wrap"},children:[e.jsx(j,{variant:"contained",color:"success",startIcon:e.jsx(H,{}),onClick:()=>l(!0),sx:{width:120},children:"Tambah"}),e.jsx(j,{startIcon:e.jsx(z,{}),variant:"contained",color:"secondary",onClick:()=>r(!0),sx:{width:120},children:"Unggah"}),e.jsx(j,{startIcon:e.jsx(G,{}),variant:"contained",color:"warning",sx:{width:120},onClick:d,children:"Template"}),e.jsx(j,{startIcon:e.jsx($,{}),variant:"contained",color:"error",onClick:()=>t(!0),sx:{width:120},children:"Hapus"}),e.jsx(ee,{open:a,close:()=>l(!1)}),e.jsx(se,{open:i,close:()=>r(!1)})]})},ae=[{label:"No",width:40},{label:"NIS",width:100},{label:"Nama",width:170},{label:"Tingkat",width:40},{label:"Kelas",width:40},{label:"Aksi",width:100}],re=()=>{const t=C().code,{data:a}=L(t,{skip:!t}),[l,{data:i,isSuccess:r,isLoading:d,error:o}]=M(),m=s=>{l({id:s,body:{code:t}})};n.useEffect(()=>{r&&w.success(i.message),o&&w.error(o.data.message)},[i,r,o]);const[p,x]=n.useState(""),g=s=>s.name.toLowerCase().includes(p.toLowerCase()),f=a==null?void 0:a.filter(g),S=s=>{x(s.target.value)};return e.jsxs(n.Fragment,{children:[e.jsxs(b,{sx:{p:1,boxShadow:2,bgcolor:"white",borderRadius:1,display:"flex",justifyContent:"space-between",flexDirection:{xs:"column-reverse",md:"row"},gap:2},children:[e.jsx(T,{placeholder:"Cari Siswa",value:p,onChange:S}),e.jsx(te,{})]}),e.jsx(W,{children:e.jsx(K,{sx:{height:{xs:500,md:530,xl:630},overflow:"auto"},children:e.jsxs(J,{stickyHeader:!0,"aria-label":"sticky table",children:[e.jsx(X,{children:e.jsx(v,{children:ae.map((s,c)=>e.jsx(h,{align:"center",sx:{width:s.width},children:s.label},c))})}),e.jsx(V,{children:f==null?void 0:f.map((s,c)=>e.jsxs(v,{children:[e.jsx(h,{align:"center",children:c+1}),e.jsx(h,{align:"center",children:s.nis}),e.jsx(h,{align:"left",children:s.name}),e.jsx(h,{align:"center",children:s.grade}),e.jsx(h,{align:"center",children:s.class}),e.jsx(h,{align:"center",children:e.jsx(Y,{color:"error",onClick:()=>m(s.id),children:d?e.jsx(y,{size:20,color:"inherit"}):e.jsx(E,{})})})]},c))})]})})})]})},Ue=()=>e.jsxs(U,{children:[e.jsx(R,{title:"Add Students"}),e.jsx(Z,{container:!0,sx:{minHeight:"85vh",display:"flex",flexDirection:"column",gap:2},children:e.jsx(re,{})})]});export{Ue as default};
