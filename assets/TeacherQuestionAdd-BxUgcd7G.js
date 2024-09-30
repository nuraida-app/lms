import{$ as N,J as G,a as H,r as o,B as n,j as e,c as x,C as O}from"./index-CFLTN1m7.js";import{P as W}from"./PageName-C-CSELxM.js";import{L as J}from"./Layout-ctkSAbzZ.js";import{R as K}from"./bundle-BYW_951p.js";import{E}from"./Editor-ChpYl3rB.js";import{G as V}from"./Grid-StTGewUk.js";import{F as z}from"./FormControl-Dn5g6_yv.js";import{I as R,T as _}from"./TextField-CHf8lOau.js";import{S as B}from"./Select-BYpC5x63.js";import{M as a}from"./MenuItem-REwMq_5U.js";import{B as D}from"./Button-BCaBrN5N.js";import"./getThemeProps-DErmPepc.js";import"./Typography-CHJpYQNO.js";import"./Paper-BXkIlh-U.js";import"./createSvgIcon-T2x4Gml6.js";import"./Modal-B5cU9yt9.js";import"./useTheme-DnE98ifX.js";import"./GlobalStyles-DbM6d0GN.js";import"./listItemIconClasses-Pf23efNw.js";import"./ExitToApp-B-9Gtlvi.js";import"./ChevronRight-Bme9Hnvl.js";import"./CalendarMonth-CHVRLIhS.js";import"./Style-1QwCO5ov.js";import"./Toolbar-CMmVOmlh.js";import"./IconButton-ByLl6sVS.js";import"./quill.snow-D_wRdG5D.js";import"./utils-CCaaHW3E.js";import"./Input-CyZCGdTf.js";import"./Menu-Bg6yh3yv.js";import"./Grow-CNYCkFhM.js";const Ee=()=>{const[P,{data:f,isSuccess:j,isLoading:k,error:l,reset:u}]=N(),g=G(),y=H(),C=o.useRef(null),v=g.quizname,c=g.quizId,[r,b]=o.useState(1),[d,S]=o.useState(""),[i,A]=o.useState({choiceA:"",choiceB:"",choiceC:"",choiceD:"",choiceE:""}),[p,w]=o.useState(""),[h,I]=o.useState(""),[q,L]=o.useState(null),[m,Q]=o.useState(""),T=s=>t=>{A($=>({...$,[s]:t}))},F=()=>C.current.click(),M=s=>{const t=s.target.files[0];L(t),Q(URL.createObjectURL(t))},U=s=>{if(s.preventDefault(),!d){n.error("Please give question");return}if(r===1&&!h){n.error("Please give answer key");return}if(r===1&&!p){n.error("Please give score");return}const t=new FormData;t.append("type",r),t.append("quiz_id",c),t.append("question",d),t.append("a",i.choiceA||""),t.append("b",i.choiceB||""),t.append("c",i.choiceC||""),t.append("d",i.choiceD||""),t.append("e",i.choiceE||""),t.append("key",h||""),t.append("score",p||0),q&&t.append("audio",q),P({quizId:c,body:t})};return o.useEffect(()=>{j&&(n.success(f.message),b(1),S(""),A({choiceA:"",choiceB:"",choiceC:"",choiceD:"",choiceE:""}),w(""),u(),y(`/teacher/quizzes/${v}/${c}`)),l&&(n.error(l.data.message),u())},[f,j,l,u,y,c,v]),e.jsxs(J,{children:[e.jsx(W,{title:"Add Question"}),e.jsx(V,{container:!0,sx:{minHeight:"85vh",display:"flex",flexDirection:"column",gap:2},children:e.jsxs("form",{className:"form-question",onSubmit:U,children:[e.jsxs(z,{fullWidth:!0,sx:{bgcolor:"white",boxShadow:2,borderRadius:1},children:[e.jsx(R,{children:"--Quiz Type--"}),e.jsxs(B,{label:">--Quiz Type--",value:r,onChange:s=>b(s.target.value),children:[e.jsx(a,{value:1,children:"Multiple Choice"}),e.jsx(a,{value:2,children:"Essay"})]})]}),e.jsx(E,{placeholder:"Write your question here",value:d,onChange:s=>S(s)}),e.jsxs(x,{sx:{display:"flex",alignItems:"center",justifyContent:m?"space-between":"end"},children:[m&&e.jsx(K,{src:m,controls:!0}),e.jsx(D,{variant:"contained",color:"success",onClick:F,children:"audio"}),e.jsx("input",{ref:C,onChange:M,type:"file",accept:"audio/*",style:{display:"none"}})]}),r===1&&Object.keys(i).map((s,t)=>e.jsx(E,{placeholder:`Choice ${s.charAt(s.length-1)}`,value:i[s],onChange:T(s)},t)),e.jsxs(x,{sx:{display:"flex",alignItems:"center",p:1,bgcolor:"white",borderRadius:1,boxShadow:2,justifyContent:r===1?"space-between":"end"},children:[r===1&&e.jsxs(x,{sx:{display:"flex",gap:2},children:[e.jsxs(z,{sx:{bgcolor:"white",boxShadow:2,borderRadius:1,width:300},children:[e.jsx(R,{children:"--Correct Answer--"}),e.jsxs(B,{label:"--Correct Answer--",value:h,onChange:s=>I(s.target.value),children:[e.jsx(a,{value:"A",children:"A"}),e.jsx(a,{value:"B",children:"B"}),e.jsx(a,{value:"C",children:"C"}),e.jsx(a,{value:"D",children:"D"}),e.jsx(a,{value:"E",children:"E"})]})]}),e.jsx(_,{sx:{ml:2},required:!0,label:"Score",type:"number",value:p,onChange:s=>w(s.target.value)})]}),e.jsx(D,{variant:"contained",color:"success",type:"submit",children:k?e.jsx(O,{size:24,color:"inherit"}):"add"})]})]})})]})};export{Ee as default};
