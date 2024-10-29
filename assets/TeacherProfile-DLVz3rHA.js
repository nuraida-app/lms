import{h as T,f as W,b as y,r as o,aP as A,B as S,j as e,c as P,C as F}from"./index-pyvLgiPp.js";import{L as w}from"./Layout-jtSix6VS.js";import{P as b}from"./Paper-B_TRKWqd.js";import{T as L}from"./Typography-Bpm5f3Pe.js";import{c as G}from"./ExitToApp-M85dDCJw.js";import{F as B}from"./FormControl-6KOne5Os.js";import{F as N,a as I}from"./FormGroup-D4ctpOf9.js";import{C as Q}from"./Checkbox-Dq6BKGiP.js";import{G as C}from"./Grid-85wHHUa8.js";import{T as u}from"./TextField-CSh37Rrc.js";import{B as D}from"./Button-D-BpVUho.js";import"./FolderCopy-C6F8xJMs.js";import"./getThemeProps-CzrcT8Xv.js";import"./createSvgIcon-DpkDy88t.js";import"./Modal-Nb9NvaEt.js";import"./useTheme-CIzdVg6i.js";import"./GlobalStyles-DRYszFDj.js";import"./listItemIconClasses-CmdOw58c.js";import"./ChevronRight-B_GEEoEo.js";import"./CalendarMonth-CeOvAitL.js";import"./Style-Dk2sPY8w.js";import"./Toolbar-DHSlOoIC.js";import"./IconButton-BnVk0IqP.js";import"./utils-DUk-rZz1.js";import"./Stack-DBuZbgq9.js";import"./useThemeProps-Bi6Aj-vj.js";import"./SwitchBase-CAl1NH9x.js";import"./Select-BJ6OZ-yE.js";import"./Menu-CKYGmSrP.js";import"./Grow-DgfkljgA.js";import"./Input-Bqt1Xge6.js";const H=()=>{const{data:t}=T(),{data:l}=W(),{user:i}=y(r=>r.authentication),f=(i==null?void 0:i.subject_classes)||{},[m,g]=o.useState(f),[h,{data:x,isSuccess:p,isLoading:j,error:c,reset:s}]=A(),k=(r,d)=>{const a={...m},n=a[r]||[],v=n.includes(d)?n.filter(E=>E!==d):[...n,d];a[r]=v,g(a),h({subjectId:r,classes:v})};return o.useEffect(()=>{p&&(S.success(x.message),s()),c&&(S.error(c.data.message),s())},[p,x,c]),e.jsxs(P,{sx:{p:1},children:[e.jsx(b,{sx:{p:1,mb:2},children:e.jsx(L,{fontWeight:"bold",children:"Choose Teaching Class"})}),j?e.jsx(P,{align:"center",children:e.jsx(F,{})}):t==null?void 0:t.map((r,d)=>e.jsxs(b,{sx:{p:1,my:1},children:[e.jsx(G,{primary:r.name}),e.jsx(B,{component:"fieldset",children:e.jsx(N,{row:!0,children:l==null?void 0:l.map(a=>{var n;return e.jsx(I,{control:e.jsx(Q,{checked:((n=m[r.code])==null?void 0:n.includes(a.code))||!1,onChange:()=>k(r.code,a.code)}),label:a.name},a.id)})})})]},d))]})},ge=()=>{const{user:t}=y(s=>s.authentication),[l,i]=o.useState(""),[f,m]=o.useState(""),[g,h]=o.useState(""),[x,p]=o.useState(""),[j,c]=o.useState("");return o.useEffect(()=>{t&&(i(t.nip),m(t.name),h(t.email),p(t.phone))},[t]),e.jsx(w,{children:e.jsxs(C,{container:!0,children:[e.jsx(C,{item:!0,xs:12,md:6,sx:{px:1},children:e.jsxs(b,{sx:{p:1},children:[e.jsx(L,{fontWeight:"bold",sx:{mb:2},children:"Profile"}),e.jsxs("form",{style:{display:"flex",flexDirection:"column",gap:"1rem"},children:[e.jsx(u,{fullWidth:!0,label:"NIP",InputLabelProps:{shrink:!0},value:l||"",onChange:s=>i(s.target.value)}),e.jsx(u,{fullWidth:!0,label:"Name",InputLabelProps:{shrink:!0},value:f||"",onChange:s=>m(s.target.value)}),e.jsx(u,{type:"email",fullWidth:!0,label:"Email",placeholder:"Add Email",InputLabelProps:{shrink:!0},value:g||"",onChange:s=>h(s.target.value)}),e.jsx(u,{fullWidth:!0,label:"Phone",placeholder:"Add Phone",InputLabelProps:{shrink:!0},value:x||"",onChange:s=>p(s.target.value)}),e.jsx(u,{fullWidth:!0,label:"Password",placeholder:"Change password if it's needed",InputLabelProps:{shrink:!0},value:j||"",onChange:s=>c(s.target.value)}),e.jsx(P,{align:"end",children:e.jsx(D,{variant:"contained",color:"success",children:"Save"})})]})]})}),e.jsx(C,{item:!0,xs:12,md:6,sx:{px:1},children:e.jsx(H,{})})]})})};export{ge as default};