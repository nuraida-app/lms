import{R as M,r as a,B as w,j as e,c as y,C as B,S as F,T as H,e as R}from"./index-CUBHetVN.js";import{L as G}from"./Layout-BlU0EauW.js";import{P as D}from"./PageName--QctS_Jv.js";import{d as A}from"./MoreHoriz-D5K_5dy1.js";import{M as $,B as z,F as W}from"./Modal-DHX36T4n.js";import{T}from"./TextField-Br9tBp4K.js";import{B as k}from"./Button-CDl_mD0Q.js";import{L as Q,l as v}from"./LinearProgress-_FO-sqVy.js";import{I as U}from"./Input-DEJs1UBe.js";import{P as _}from"./Paper-CvDSqGgi.js";import{T as q}from"./TableContainer-DLFF8P0I.js";import{T as J,a as P,b as i,c as K}from"./TableRow-B5b_EBZi.js";import{T as O}from"./TableHead-xaIaZKhs.js";import{T as V}from"./Tooltip-BLr5hFg4.js";import{S as X}from"./Stack-qcdLjNrC.js";import{I as Y}from"./IconButton-xtUAGam4.js";import{M as Z}from"./Menu-Tx7ft6l0.js";import{M as ee}from"./MenuItem--ErA4Q-7.js";import{G as re}from"./Grid-BBbyxA-5.js";import"./FolderCopy-DBXADfz0.js";import"./getThemeProps-DZHS2swm.js";import"./Typography-Bk7xBqzM.js";import"./createSvgIcon-BNiQ1uMK.js";import"./GlobalStyles-DnPqwiRl.js";import"./listItemIconClasses-EVjYjc_D.js";import"./useTheme-C8jBbgHn.js";import"./ChevronRight-DOUVWpEN.js";import"./PeopleAlt-DnbX-vPg.js";import"./CalendarMonth-CAXonYvH.js";import"./Style-CREQcY6J.js";import"./ExitToApp-NQb6q9Sm.js";import"./Toolbar-DwhPy3O0.js";import"./FormControl-C5SBuuzI.js";import"./utils-C7ZUp4cy.js";import"./Select-BaIo7R3g.js";import"./Popper-BW0lhIMP.js";import"./Grow-DFz5RKAv.js";import"./useThemeProps-CxYhRxk7.js";const te=({open:t,close:l,student:s})=>{const[b,{data:x,isSuccess:c,isLoading:h,error:d}]=M(),[m,p]=a.useState(""),[f,n]=a.useState(""),g=o=>{o.preventDefault();const j={nis:m,name:f};b({id:s.id,body:j})};return a.useEffect(()=>{c&&(w.success(x.message),l()),d&&w.error(d.data.message)},[c,x,d]),a.useEffect(()=>{s&&(p(s.nis),n(s.name))},[s]),e.jsx($,{open:t,onClose:l,closeAfterTransition:!0,slots:{backdrop:z},slotProps:{backdrop:{timeout:500}},children:e.jsx(W,{in:t,children:e.jsx(y,{sx:{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)",width:400,bgcolor:"#ffff",boxShadow:24,p:2,borderRadius:"5px"},children:e.jsxs("form",{className:"form-class",onSubmit:g,children:[e.jsx(T,{fullWidth:!0,label:"NIS",placeholder:"NIS",value:m||"",onChange:o=>p(o.target.value)}),e.jsx(T,{fullWidth:!0,label:"Full name",placeholder:"Full name",value:f||"",onChange:o=>n(o.target.value)}),e.jsxs(y,{sx:{display:"flex",gap:1,justifyContent:"flex-end"},children:[e.jsx(k,{variant:"outlined",color:"error",onClick:l,children:"batal"}),e.jsx(k,{variant:"contained",color:"success",type:"submit",children:h?e.jsx(B,{size:20,color:"inherit"}):"update"})]})]})})})})},ae=F(Q)(({theme:t})=>({height:10,borderRadius:5,[`&.${v.colorPrimary}`]:{backgroundColor:t.palette.grey[200],...t.applyStyles("dark",{backgroundColor:t.palette.grey[800]})},[`& .${v.bar}`]:{borderRadius:5,backgroundColor:"#1a90ff",...t.applyStyles("dark",{backgroundColor:"#308fe8"})}})),oe=[{label:"No",width:40},{label:"NIS",width:100},{label:"Name",width:170},{label:"Homebase",width:80},{label:"Database",width:80},{label:"Actions",width:100}],se=({students:t,loading:l})=>{const[s,{data:b,isLoading:x}]=H(),[c,h]=a.useState(null),[d,m]=a.useState(!1),[p,f]=a.useState(""),n=!!c,g=(r,u)=>{h(r.currentTarget),f(u)},o=()=>{h(null)},j=()=>{p&&(m(!0),s(p),o())},[C,L]=a.useState(""),I=r=>r.name.toLowerCase().includes(C.toLowerCase()),S=t==null?void 0:t.filter(I),N=r=>{L(r.target.value)};return e.jsxs(a.Fragment,{children:[e.jsx(y,{sx:{p:1,boxShadow:2,bgcolor:"white",borderRadius:1,display:"flex",justifyContent:"space-between",flexDirection:{xs:"column-reverse",md:"row"},gap:1},children:e.jsx(U,{placeholder:"Search student",value:C,onChange:N})}),e.jsx(_,{children:e.jsx(q,{sx:{height:{xs:500,md:530,lg:700},overflow:"auto"},children:e.jsxs(J,{stickyHeader:!0,"aria-label":"sticky table",children:[e.jsx(O,{children:e.jsx(P,{children:oe.map((r,u)=>e.jsx(i,{align:"center",sx:{width:r.width},children:r.label},u))})}),e.jsx(K,{children:S==null?void 0:S.map((r,u)=>e.jsxs(P,{children:[e.jsx(i,{align:"center",children:u+1}),e.jsx(i,{align:"center",children:r.nis}),e.jsx(i,{align:"left",children:r.name}),e.jsx(i,{align:"center",children:r.homebase}),e.jsx(i,{align:"center",children:e.jsx(V,{title:`${r.percentage}%`,placement:"top-end",children:e.jsx(X,{sx:{flexGrow:1},children:e.jsx(ae,{variant:"determinate",value:Number(r.percentage)})})})}),e.jsx(i,{align:"center",children:e.jsx(Y,{color:"primary",id:"basic-button","aria-controls":n?"basic-menu":void 0,"aria-haspopup":"true","aria-expanded":n?"true":void 0,onClick:E=>g(E,r.id),children:x?e.jsx(B,{size:20,color:"inherit"}):e.jsx(A,{})})})]},r.id))})]})})}),e.jsx(Z,{id:"basic-menu",anchorEl:c,open:n,onClose:o,MenuListProps:{"aria-labelledby":"basic-button"},children:e.jsx(ee,{onClick:j,children:"Edit"})}),e.jsx(te,{open:d,close:()=>m(!1),student:b})]})},Ue=()=>{const{data:t,isLoading:l}=R();return e.jsxs(G,{children:[e.jsx(D,{title:"Students"}),e.jsx(re,{container:!0,sx:{minHeight:"85vh",display:"flex",flexDirection:"column",gap:1},children:e.jsx(se,{students:t,loading:l})})]})};export{Ue as default};
