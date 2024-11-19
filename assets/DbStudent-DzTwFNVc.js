import{r as c,aP as re,aQ as ne,aR as se,aS as ie,B as z,j as e,c as O,C as E,aT as le,aU as de,aV as he,aW as oe,aX as me,M as ce,aY as ue,aZ as _e}from"./index-BzybVbrz.js";import{L as pe}from"./Layout-DglePTSt.js";import{P as xe}from"./PageName-9XwMDVQ1.js";import{d as W,L as G,A as Y}from"./useMobilePicker-D1X84J1B.js";import{P as K}from"./Paper-Dzbso0eQ.js";import{G as C}from"./Grid-Bpe-Rk4C.js";import{T as i,I as H}from"./TextField-3RuiFxsl.js";import{D as Q}from"./DatePicker-BSoKon2-.js";import{F as B}from"./FormControl-VBJezpKl.js";import{S as R}from"./Select-CUeCHXcb.js";import{M as N}from"./MenuItem-CuG_vB0i.js";import{B as w}from"./Button-6o8cGekH.js";import{d as $}from"./Remove-DRFt6Nyr.js";import{T as X}from"./TableContainer-CGA7DdEE.js";import{T as Z,a as q,b as T,c as ee}from"./TableRow-5Ecg2L20.js";import{T as ae}from"./TableHead-CiqNORav.js";import{I as te}from"./IconButton-BB4rgvuw.js";import{B as ge}from"./ButtonGroup-BdxjTLvu.js";import"./FolderCopy-CKLfXymE.js";import"./getThemeProps-Z5o_4JZP.js";import"./Typography-C-qplh4g.js";import"./createSvgIcon-CZqlXMQ-.js";import"./Modal-D5yutoIL.js";import"./useTheme-BALbJBkz.js";import"./GlobalStyles-015m-8mF.js";import"./listItemIconClasses-DoJF8eQE.js";import"./ChevronRight-WhqIRLcc.js";import"./Storage-Djwg4jZV.js";import"./CalendarMonth-CZNFJnn1.js";import"./Style-D9dG96sd.js";import"./colorManipulator-BLd52KTc.js";import"./ExitToApp-CbGQ45gm.js";import"./Toolbar-D4YRnJLK.js";import"./InputAdornment-V9Xqb1EP.js";import"./utils-BZNFuFIh.js";import"./Popper-C2F_A1rQ.js";import"./Grow-CnOAYF8-.js";import"./useThemeProps-X4tW6Iis.js";import"./Input-DoWOYfms.js";import"./Menu-DBv6tm1r.js";const fe=({provinces:a,info:r,name:g,nis:_})=>{const[b,u]=c.useState(""),[f,n]=c.useState(""),[j,h]=c.useState(""),[L,{data:D,isSuccess:v,error:y,isLoading:d,reset:o}]=re(),{data:p}=ne(b,{skip:!b}),{data:P}=se(f,{skip:!f}),{data:F}=ie(j,{skip:!j}),[s,l]=c.useState({name:g,nisn:"",nis:_,birth_place:"",birth_date:W(),height:"",weight:"",around_head:"",order_birth:"",siblings:"",province_id:"",province_name:"",regency_id:"",regency_name:"",district_id:"",district_name:"",village_id:"",village_name:"",district:"",address:"",postal_code:""}),t=m=>{const{name:I,value:S}=m.target;if(I==="province_id"){const k=a==null?void 0:a.find(M=>M.id===S);u(S),l({...s,province_id:S,province_name:k?k.name:""})}if(I==="regency_id"){const k=p==null?void 0:p.find(M=>M.id===S);n(S),l({...s,regency_id:S,regency_name:k?k.name:""})}if(I==="district_id"){const k=P==null?void 0:P.find(M=>M.id===S);h(S),l({...s,district_id:S,district_name:k?k.name:""})}if(I==="village_id"){const k=F==null?void 0:F.find(M=>M.id.trim()===S.trim());l({...s,village_id:S,village_name:k?k.name:""})}I!=="province_id"&&I!=="regency_id"&&I!=="district_id"&&I!=="village_id"&&l({...s,[I]:S})},x=m=>{l({...s,birth_date:m})},A=m=>{m.preventDefault(),L(s)};return c.useEffect(()=>{v&&(z.success(D.message),o()),y&&(z.error(y.data.message),o())},[v,y,D]),c.useEffect(()=>{r&&(l({name:r.name,nisn:r.nisn,nis:r.nis,birth_place:r.birth_place,birth_date:r.birth_date?W(r.birth_date):W(),height:r.height,weight:r.weight,around_head:r.around_head,order_birth:r.order_birth,siblings:r.siblings,province_id:r.province_id,province_name:r.province_name,regency_id:r.regency_id,regency_name:r.regency_name,district_id:r.district_id,district_name:r.district_name,village_id:r.village_id.trim(),village_name:r.village_name,address:r.address,postal_code:r.postal_code}),u(r.province_id),n(r.regency_id),h(r.district_id))},[r]),e.jsx(K,{sx:{width:"100%",p:1},children:e.jsxs("form",{onSubmit:A,children:[e.jsxs(C,{container:!0,children:[e.jsxs(C,{item:!0,xs:12,md:6,sx:{p:1,display:"flex",flexDirection:"column",gap:2},children:[e.jsx(i,{fullWidth:!0,label:"Nama Lengkap",size:"small",variant:"standard",name:"name",value:s.name||"",onChange:t}),e.jsx(i,{fullWidth:!0,label:"NISN",size:"small",variant:"standard",name:"nisn",value:s.nisn||"",onChange:t}),e.jsx(i,{fullWidth:!0,label:"NIS",size:"small",variant:"standard",name:"nis",value:s.nis||"",onChange:t}),e.jsx(i,{fullWidth:!0,label:"Tempat Lahir",size:"small",variant:"standard",name:"birth_place",value:s.birth_place||"",onChange:t}),e.jsx(G,{dateAdapter:Y,children:e.jsx(Q,{label:"Tanggal Lahir",value:s.birth_date||"",onChange:x,slotProps:{textField:{fullWidth:!0,variant:"standard"}}})}),e.jsx(i,{fullWidth:!0,type:"number",label:"Anak Ke",size:"small",variant:"standard",name:"order_birth",value:s.order_birth,onChange:t}),e.jsx(i,{fullWidth:!0,type:"number",label:"Jml Saudara Kandung",size:"small",variant:"standard",name:"siblings",value:s.siblings||"",onChange:t}),e.jsx(i,{fullWidth:!0,type:"number",label:"Tinggi",size:"small",variant:"standard",name:"height",value:s.height||"",onChange:t}),e.jsx(i,{fullWidth:!0,type:"number",label:"Berat",size:"small",variant:"standard",name:"weight",value:s.weight||"",onChange:t})]}),e.jsxs(C,{item:!0,xs:12,md:6,sx:{p:1,display:"flex",flexDirection:"column",gap:2},children:[e.jsx(i,{fullWidth:!0,type:"number",label:"Lingkar Kepala",size:"small",variant:"standard",name:"around_head",value:s.around_head||"",onChange:t}),e.jsxs(B,{fullWidth:!0,variant:"standard",children:[e.jsx(H,{children:"--Provinsi--"}),e.jsx(R,{name:"province_id",value:s.province_id||"",onChange:t,children:a==null?void 0:a.map(m=>e.jsx(N,{value:m.id,children:m.name},m.id))})]}),b&&e.jsxs(B,{fullWidth:!0,variant:"standard",children:[e.jsx(H,{children:"--Kota / Kabupaten--"}),e.jsx(R,{name:"regency_id",value:s.regency_id||"",onChange:t,children:p==null?void 0:p.map(m=>e.jsx(N,{value:m.id,children:m.name},m.id))})]}),f&&e.jsxs(B,{fullWidth:!0,variant:"standard",children:[e.jsx(H,{children:"--Kecamatan--"}),e.jsx(R,{name:"district_id",value:s.district_id||"",onChange:t,children:P==null?void 0:P.map(m=>e.jsx(N,{value:m.id,children:m.name},m.id))})]}),j&&e.jsxs(B,{fullWidth:!0,variant:"standard",children:[e.jsx(H,{children:"--Desa--"}),e.jsx(R,{name:"village_id",value:s.village_id||"",onChange:t,children:F==null?void 0:F.map(m=>e.jsx(N,{value:m.id.trim(),children:m.name},m.id.trim()))})]}),e.jsx(i,{fullWidth:!0,label:"Alamat",size:"small",variant:"standard",name:"address",value:s.address||"",onChange:t}),e.jsx(i,{fullWidth:!0,label:"Kode Pos",size:"small",variant:"standard",name:"postal_code",value:s.postal_code||"",onChange:t})]})]}),e.jsx(O,{sx:{display:"flex",justifyContent:"end"},children:e.jsx(w,{variant:"contained",color:"success",type:"submit",children:d?e.jsx(E,{size:24,color:"inherit"}):"simpan"})})]})})};function je(a){const r=new Date,g=new Date(a);let _=r.getFullYear()-g.getFullYear();const b=r.getMonth()-g.getMonth();return(b<0||b===0&&r.getDate()<g.getDate())&&_--,_}const be=({info:a})=>{const[r,{isSuccess:g,data:_,isLoading:b,error:u,reset:f}]=le(),[n,{isSuccess:j,data:h,isLoading:L,error:D,reset:v}]=de(),[y,d]=c.useState((a==null?void 0:a.family_info)||[]),[o,p]=c.useState({family_name:"",family_gender:"",family_birth_date:W()}),P=t=>{const{name:x,value:A}=t.target;p({...o,[x]:A})},F=t=>{p({...o,family_birth_date:t})},s=()=>{const t={family_name:o.family_name,family_gender:o.family_gender,family_birth_date:o.family_birth_date,id:Date.now()},x={nis:a.nis,familyData:[...y,t]};r(x).unwrap().then(()=>{d(A=>[...A,t]),p({family_name:"",family_gender:"",family_birth_date:W()})})},l=t=>{const x={nis:a.nis,familyId:t};n(x).unwrap().then(()=>{d(y.filter(A=>A.id!==t))})};return c.useEffect(()=>{g&&(z.success(_.message),f()),u&&(z.error(u.data.message),f())},[g,u,f,_]),c.useEffect(()=>{j&&(z.success(h.message),v()),D&&(z.error(D.data.message),v())},[j,D,h]),e.jsx(K,{sx:{width:"100%",display:"flex",flexDirection:"column",gap:2,p:1},children:e.jsxs(C,{container:!0,children:[e.jsx(C,{item:!0,xs:12,md:8,sx:{p:1},children:e.jsx(X,{component:K,sx:{maxHeight:{xs:500,md:450,lg:530},overflow:"auto"},children:e.jsxs(Z,{children:[e.jsx(ae,{children:e.jsx(q,{children:["No","Nama","Kelamin","Tanggal Lahir","Usia","Aksi"].map(t=>e.jsx(T,{children:t},t))})}),e.jsx(ee,{children:y.map((t,x)=>e.jsxs(q,{children:[e.jsx(T,{children:x+1}),e.jsx(T,{children:t.family_name}),e.jsx(T,{children:t.family_gender}),e.jsx(T,{children:W(t.family_birth_date).format("DD/MM/YYYY")}),e.jsx(T,{children:je(t.family_birth_date)}),e.jsx(T,{children:e.jsx(te,{color:"error",onClick:()=>l(t.id),children:L?e.jsx(E,{size:20,color:"inherit"}):e.jsx($,{})})})]},t.id))})]})})}),e.jsx(C,{item:!0,xs:12,md:4,sx:{p:1},children:e.jsxs("form",{style:{display:"flex",flexDirection:"column",gap:"1rem"},onSubmit:t=>{t.preventDefault(),s()},children:[e.jsx(i,{fullWidth:!0,size:"small",variant:"standard",label:"Nama",name:"family_name",value:o.family_name,onChange:P,required:!0}),e.jsxs(B,{required:!0,children:[e.jsx(H,{children:"-Kelamin--"}),e.jsxs(R,{label:"--Kelamin--",name:"family_gender",value:o.family_gender,onChange:P,children:[e.jsx(N,{value:"Male",children:"Pria"}),e.jsx(N,{value:"Female",children:"Wanita"})]})]}),e.jsx(G,{dateAdapter:Y,children:e.jsx(Q,{label:"Tanggal Lahir",name:"family_birth_date",value:o.family_birth_date,onChange:F,slotProps:{textField:{fullWidth:!0,variant:"standard"}}})}),e.jsx(w,{fullWidth:!0,variant:"contained",color:"success",type:"submit",children:b?e.jsx(E,{size:20,color:"inherit"}):"simpan"})]})})]})})},J=a=>a!=null&&a.startsWith("0")?`62${a.slice(1)}`:a,V=a=>{const r=a.replace(/[^\d]/g,"");return`Rp ${parseInt(r,10).toLocaleString("id-ID")}`},U=a=>a.replace(/[^\d]/g,""),ve=({info:a})=>{const[r,{data:g,isSuccess:_,isLoading:b,error:u,reset:f}]=he(),[n,j]=c.useState({father_nik:"",father_name:"",father_birth_place:"",father_birth_date:W(),father_job:"",father_position:"",father_earning:0,father_phone:"",mother_nik:"",mother_name:"",mother_birth_place:"",mother_birth_date:W(),mother_job:"",mother_position:"",mother_earning:0,mother_phone:"",nis:""}),h=d=>{const{name:o,value:p}=d.target;j({...n,[o]:o==="father_phone"||o==="mother_phone"?J(p):p})},L=d=>{const{name:o,value:p}=d.target;j({...n,[o]:V(p)})},D=d=>{j({...n,father_birth_date:d})},v=d=>{j({...n,mother_birth_date:d})},y=d=>{d.preventDefault();const o={...n,father_earning:U(n.father_earning),mother_earning:U(n.mother_earning)};r(o)};return c.useEffect(()=>{_&&(z.success(g.message),f()),u&&(z.error(u.data.message),f())},[_,u,g]),c.useEffect(()=>{a&&j({father_nik:a.father_nik,father_name:a.father_name,father_birth_place:a.father_birth_place,father_birth_date:a.father_birth_date?W(a.father_birth_date):W(),father_job:a.father_job,father_position:a.father_position,father_earning:a.father_earning?V(a.father_earning):0,father_phone:J(a.father_phone),mother_nik:a.mother_nik,mother_name:a.mother_name,mother_birth_place:a.mother_birth_place,mother_birth_date:a.mother_birth_date?W(a.mother_birth_date):W(),mother_job:a.mother_job,mother_position:a.mother_position,mother_earning:a.mother_earning?V(a.mother_earning):0,mother_phone:J(a.mother_phone),nis:a.nis})},[a]),e.jsx(K,{sx:{width:"100%",p:1},children:e.jsxs("form",{onSubmit:y,children:[e.jsxs(C,{container:!0,children:[e.jsxs(C,{item:!0,xs:12,md:6,sx:{display:"flex",flexDirection:"column",gap:2,p:1},children:[e.jsx(i,{fullWidth:!0,type:"number",label:"NIK Ayah",size:"small",variant:"standard",name:"father_nik",value:n.father_nik||"",onChange:h}),e.jsx(i,{fullWidth:!0,label:"Nama Ayah",size:"small",variant:"standard",name:"father_name",value:n.father_name||"",onChange:h}),e.jsx(i,{fullWidth:!0,label:"Tempat Lahir",size:"small",variant:"standard",name:"father_birth_place",value:n.father_birth_place||"",onChange:h}),e.jsx(G,{dateAdapter:Y,children:e.jsx(Q,{label:"Tanggal Lahir",value:n.father_birth_date,onChange:D,slotProps:{textField:{fullWidth:!0,variant:"standard"}}})}),e.jsx(i,{fullWidth:!0,label:"Pekerjaan",size:"small",variant:"standard",name:"father_job",value:n.father_job||"",onChange:h}),e.jsx(i,{fullWidth:!0,label:"Jabatan",size:"small",variant:"standard",name:"father_position",value:n.father_position||"",onChange:h}),e.jsx(i,{fullWidth:!0,label:"Penghasilan",size:"small",variant:"standard",name:"father_earning",onChange:L,value:n.father_earning||""}),e.jsx(i,{fullWidth:!0,type:"number",label:"Tlp",size:"small",variant:"standard",name:"father_phone",onChange:h,value:n.father_phone||""})]}),e.jsxs(C,{item:!0,xs:12,md:6,sx:{display:"flex",flexDirection:"column",gap:2,p:1},children:[e.jsx(i,{fullWidth:!0,type:"number",label:"NIK Ibu",size:"small",variant:"standard",name:"mother_nik",value:n.mother_nik||"",onChange:h}),e.jsx(i,{fullWidth:!0,label:"Nama Ibu",size:"small",variant:"standard",name:"mother_name",value:n.mother_name||"",onChange:h}),e.jsx(i,{fullWidth:!0,label:"Tempat Lahir",size:"small",variant:"standard",name:"mother_birth_place",value:n.mother_birth_place||"",onChange:h}),e.jsx(G,{dateAdapter:Y,children:e.jsx(Q,{label:"Tanggal Lahir",value:n.mother_birth_date,onChange:v,slotProps:{textField:{fullWidth:!0,variant:"standard"}}})}),e.jsx(i,{fullWidth:!0,label:"Pekerjaan",size:"small",variant:"standard",name:"mother_job",value:n.mother_job||"",onChange:h}),e.jsx(i,{fullWidth:!0,label:"Jabatan",size:"small",variant:"standard",name:"mother_position",value:n.mother_position||"",onChange:h}),e.jsx(i,{fullWidth:!0,label:"Penghasilan",size:"small",variant:"standard",name:"mother_earning",onChange:L,value:n.mother_earning||""}),e.jsx(i,{fullWidth:!0,type:"number",label:"Tlp",size:"small",variant:"standard",name:"mother_phone",onChange:h,value:n.mother_phone||""})]})]}),e.jsx(O,{sx:{display:"flex",justifyContent:"end"},children:e.jsx(w,{variant:"contained",color:"success",type:"submit",children:b?e.jsx(E,{size:20,color:"inherit"}):"simpan"})})]})})},ye=({info:a})=>{const[r,{data:g,isLoading:_,isSuccess:b,error:u,reset:f}]=oe(),[n,{isSuccess:j,data:h,isLoading:L,error:D,reset:v}]=me(),[y,d]=c.useState((a==null?void 0:a.health_records)||[]),[o,p]=c.useState({health_notes:""}),P=l=>{const{name:t,value:x}=l.target;p({...o,[t]:x})},F=()=>{const l={...o,id:Date.now()};d(x=>[...x,l]);const t={nis:a==null?void 0:a.nis,healthData:[...y,l].map(x=>({...x,id:x.id}))};r(t),p({health_notes:""})},s=l=>{const t={nis:a==null?void 0:a.nis,healthId:l};n(t).unwrap().then(()=>{d(y.filter(x=>x.id!==l))})};return c.useEffect(()=>{b&&(z.success(g.message),f()),u&&(z.error(u.data.message),f())},[g,b,u,f]),c.useEffect(()=>{j&&(z.success(h.message),v()),D&&(z.error(D.data.message),v())},[j,D,h]),e.jsx(K,{sx:{width:"100%",display:"flex",flexDirection:"column",gap:2,p:1},children:e.jsxs(C,{container:!0,children:[e.jsx(C,{item:!0,xs:12,md:8,sx:{p:1},children:e.jsx(X,{component:K,sx:{maxHeight:{xs:500,md:450,lg:530},overflow:"auto"},children:e.jsxs(Z,{children:[e.jsx(ae,{children:e.jsx(q,{children:["No","Catatan","Aksi"].map(l=>e.jsx(T,{children:l},l))})}),e.jsx(ee,{children:y.map((l,t)=>e.jsxs(q,{children:[e.jsx(T,{children:t+1}),e.jsx(T,{children:l.health_notes}),e.jsx(T,{children:e.jsx(te,{color:"error",onClick:()=>s(l.id),children:_?e.jsx(E,{size:20,color:"inherit"}):e.jsx($,{})})})]},l.id))})]})})}),e.jsx(C,{item:!0,xs:12,md:4,sx:{p:1},children:e.jsxs("form",{style:{display:"flex",flexDirection:"column",gap:"1rem"},onSubmit:l=>{l.preventDefault(),F()},children:[e.jsx(i,{fullWidth:!0,required:!0,size:"small",variant:"standard",label:"Catatan Kesehatan",name:"health_notes",value:o.health_notes,onChange:P}),e.jsx(w,{fullWidth:!0,variant:"contained",color:"success",type:"submit",children:_?e.jsx(E,{size:20,color:"inherit"}):"simpan"})]})})]})})},ha=()=>{const[a,r]=c.useState(!0),[g,_]=c.useState(!1),[b,u]=c.useState(!1),[f,n]=c.useState(!1),j=()=>{r(!0),_(!1),u(!1),n(!1)},h=()=>{r(!1),_(!0),u(!1),n(!1)},L=()=>{r(!1),_(!1),u(!0),n(!1)},D=()=>{r(!1),_(!1),u(!1),n(!0)},v=ce(),{data:y}=ue(),{data:d}=_e(v.nis,{skip:!v.nis});return e.jsxs(pe,{children:[e.jsx(xe,{title:"Database"}),e.jsx(C,{container:!0,sx:{minHeight:"85vh",display:"flex",flexDirection:"column"},children:e.jsxs(O,{sx:{display:"flex",flexDirection:"column",gap:2,justifyContent:"center",alignItems:"center"},children:[e.jsx(K,{children:e.jsxs(ge,{children:[e.jsx(w,{onClick:j,variant:a?"contained":"outlined",color:"primary",children:"Data Diri"}),d&&e.jsx(w,{onClick:h,variant:g?"contained":"outlined",color:"primary",children:"Orang Tua"}),d&&e.jsx(w,{onClick:L,variant:b?"contained":"outlined",color:"primary",children:"Keluarga"}),d&&e.jsx(w,{onClick:D,variant:f?"contained":"outlined",color:"primary",children:"Kesehatan"})]})}),a&&e.jsx(fe,{provinces:y,info:d,name:v.studentName.replace(/-/g," "),nis:v.nis}),g&&e.jsx(ve,{info:d}),b&&e.jsx(be,{info:d}),f&&e.jsx(ye,{info:d})]})})]})};export{ha as default};
