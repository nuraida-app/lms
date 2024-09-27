import{W as L,r as a,B as T,j as e,c as C,C as I,X as P,m as F}from"./index-DjgEXlBM.js";import{L as H}from"./Layout-BRQ_XQ2b.js";import{P as G}from"./PageName-ZPCS438x.js";import{d as R}from"./MoreHoriz-B7rLeTAL.js";import{M as A,B as D,F as W}from"./Modal-DCAalMQR.js";import{T as y}from"./TextField-CYEQKP_m.js";import{B as v}from"./Button-FzYR9QjW.js";import{I as z}from"./Input-Djdk2BZh.js";import{P as Q}from"./Paper-0_Nxrl9K.js";import{T as U}from"./TableContainer-ywpNEKl8.js";import{a as X,b as _,c as B,T as l}from"./TableRow-9p40iQCm.js";import{T as q}from"./TableBody-Dl-9RlEw.js";import{I as J}from"./IconButton-DVAIich5.js";import{M as K}from"./Select-C4xHsIAt.js";import{M as O}from"./MenuItem-AkT7IuJC.js";import{G as V}from"./Grid-Cm2mtght.js";import"./ChevronRight-JRIqjZRu.js";import"./createSvgIcon-DbdgCAn1.js";import"./Typography-Ck8ZmvYm.js";import"./PeopleAlt-DJyQ-vYi.js";import"./CalendarMonth-ZeFlFCc4.js";import"./Style-COl1V7Ra.js";import"./useTheme-BUXj7LXp.js";import"./ListItemText-sHcdjvhz.js";import"./GlobalStyles-naRZnfmu.js";import"./listItemIconClasses-8sYbMhEm.js";import"./FormControl-TopU_Zco.js";import"./utils-CGVmn-r6.js";import"./Grow-C7cMHxnE.js";const Y=({open:s,close:i,student:o})=>{const[b,{data:h,isSuccess:c,isLoading:x,error:d}]=L(),[m,u]=a.useState(""),[f,n]=a.useState(""),j=r=>{r.preventDefault();const g={nis:m,name:f};b({id:o.id,body:g})};return a.useEffect(()=>{c&&(T.success(h.message),i()),d&&T.error(d.data.message)},[c,h,d]),a.useEffect(()=>{o&&(u(o.nis),n(o.name))},[o]),e.jsx(A,{open:s,onClose:i,closeAfterTransition:!0,slots:{backdrop:D},slotProps:{backdrop:{timeout:500}},children:e.jsx(W,{in:s,children:e.jsx(C,{sx:{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)",width:400,bgcolor:"#ffff",boxShadow:24,p:2,borderRadius:"5px"},children:e.jsxs("form",{className:"form-class",onSubmit:j,children:[e.jsx(y,{fullWidth:!0,label:"NIS",placeholder:"NIS",value:m||"",onChange:r=>u(r.target.value)}),e.jsx(y,{fullWidth:!0,label:"Full name",placeholder:"Full name",value:f||"",onChange:r=>n(r.target.value)}),e.jsxs(C,{sx:{display:"flex",gap:1,justifyContent:"flex-end"},children:[e.jsx(v,{variant:"outlined",color:"error",onClick:i,children:"batal"}),e.jsx(v,{variant:"contained",color:"success",type:"submit",children:x?e.jsx(I,{size:20,color:"inherit"}):"update"})]})]})})})})},Z=[{label:"No",width:40},{label:"NIS",width:100},{label:"Name",width:170},{label:"Homebase",width:80},{label:"Actions",width:100}],$=({students:s,loading:i})=>{const[o,{data:b,isLoading:h}]=P(),[c,x]=a.useState(null),[d,m]=a.useState(!1),[u,f]=a.useState(""),n=!!c,j=(t,p)=>{x(t.currentTarget),f(p)},r=()=>{x(null)},g=()=>{u&&(m(!0),o(u),r())},[w,k]=a.useState(""),E=t=>t.name.toLowerCase().includes(w.toLowerCase()),S=s==null?void 0:s.filter(E),M=t=>{k(t.target.value)};return e.jsxs(a.Fragment,{children:[e.jsx(C,{sx:{p:1,boxShadow:2,bgcolor:"white",borderRadius:1,display:"flex",justifyContent:"space-between",flexDirection:{xs:"column-reverse",md:"row"},gap:1},children:e.jsx(z,{placeholder:"Search student",value:w,onChange:M})}),e.jsx(Q,{children:e.jsx(U,{sx:{height:{xs:500,md:530,lg:630},overflow:"auto"},children:e.jsxs(X,{stickyHeader:!0,"aria-label":"sticky table",children:[e.jsx(_,{children:e.jsx(B,{children:Z.map((t,p)=>e.jsx(l,{align:"center",sx:{width:t.width},children:t.label},p))})}),e.jsx(q,{children:S==null?void 0:S.map((t,p)=>e.jsxs(B,{children:[e.jsx(l,{align:"center",children:p+1}),e.jsx(l,{align:"center",children:t.nis}),e.jsx(l,{align:"left",children:t.name}),e.jsx(l,{align:"center",children:t.homebase}),e.jsx(l,{align:"center",children:e.jsx(J,{color:"primary",id:"basic-button","aria-controls":n?"basic-menu":void 0,"aria-haspopup":"true","aria-expanded":n?"true":void 0,onClick:N=>j(N,t.id),children:h?e.jsx(I,{size:20,color:"inherit"}):e.jsx(R,{})})})]},t.id))})]})})}),e.jsx(K,{id:"basic-menu",anchorEl:c,open:n,onClose:r,MenuListProps:{"aria-labelledby":"basic-button"},children:e.jsx(O,{onClick:g,children:"Edit"})}),e.jsx(Y,{open:d,close:()=>m(!1),student:b})]})},Ee=()=>{const{data:s,isLoading:i}=F();return e.jsxs(H,{children:[e.jsx(G,{title:"Students"}),e.jsx(V,{container:!0,sx:{minHeight:"85vh",display:"flex",flexDirection:"column",gap:1},children:e.jsx($,{students:s,loading:i})})]})};export{Ee as default};
