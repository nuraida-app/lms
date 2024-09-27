import{a9 as $,Q as G,a as H,r as o,B as n,j as e,c as x,C as O}from"./index-B4oIbNwU.js";import{P as W}from"./PageName-CEARqxte.js";import{L as K}from"./Layout-Ce3KKoj1.js";import{R as V}from"./bundle-Bzn1A5B5.js";import{E}from"./Editor-GjvI82XY.js";import{G as _}from"./Grid-DRYlEhgI.js";import{F as z}from"./FormControl-DhE90yLw.js";import{I as R,T as J}from"./TextField-dmVyW8fb.js";import{S as B}from"./Select-OZq0aL4k.js";import{M as a}from"./MenuItem-B9UCUkSn.js";import{B as D}from"./Button-CGa4e0l9.js";import"./ChevronRight-CvyNzzqS.js";import"./createSvgIcon-BZOpo86E.js";import"./Typography-DLQ9NUQX.js";import"./Paper-WBrkj_xq.js";import"./Modal-yF_fLTpP.js";import"./useTheme-C3ddHqAM.js";import"./GlobalStyles-Ddd3Vltf.js";import"./listItemIconClasses-DYp5XrKx.js";import"./ListItemText-snJx1fDo.js";import"./CalendarMonth-Cs-Lek6-.js";import"./Style-BHIr2vnK.js";import"./IconButton-DKYpUzhK.js";import"./quill.snow-DT1eIzPv.js";import"./utils-CoNKf_2-.js";import"./Input-Dj5u-xDW.js";import"./Grow-BiPl52xs.js";const Ae=()=>{const[P,{data:f,isSuccess:j,isLoading:k,error:l,reset:u}]=$(),g=G(),y=H(),C=o.useRef(null),v=g.quizname,c=g.quizId,[r,b]=o.useState(1),[d,S]=o.useState(""),[i,A]=o.useState({choiceA:"",choiceB:"",choiceC:"",choiceD:"",choiceE:""}),[p,w]=o.useState(""),[h,I]=o.useState(""),[q,Q]=o.useState(null),[m,L]=o.useState(""),T=t=>s=>{A(N=>({...N,[t]:s}))},F=()=>C.current.click(),M=t=>{const s=t.target.files[0];Q(s),L(URL.createObjectURL(s))},U=t=>{if(t.preventDefault(),!d){n.error("Please give question");return}if(r===1&&!h){n.error("Please give answer key");return}if(r===1&&!p){n.error("Please give score");return}const s=new FormData;s.append("type",r),s.append("quiz_id",c),s.append("question",d),s.append("a",i.choiceA||""),s.append("b",i.choiceB||""),s.append("c",i.choiceC||""),s.append("d",i.choiceD||""),s.append("e",i.choiceE||""),s.append("key",h||""),s.append("score",p||0),q&&s.append("audio",q),P({quizId:c,body:s})};return o.useEffect(()=>{j&&(n.success(f.message),b(1),S(""),A({choiceA:"",choiceB:"",choiceC:"",choiceD:"",choiceE:""}),w(""),u(),y(`/teacher/quizzes/${v}/${c}`)),l&&(n.error(l.data.message),u())},[f,j,l,u,y,c,v]),e.jsxs(K,{children:[e.jsx(W,{title:"Add Question"}),e.jsx(_,{container:!0,sx:{minHeight:"85vh",display:"flex",flexDirection:"column",gap:2},children:e.jsxs("form",{className:"form-question",onSubmit:U,children:[e.jsxs(z,{fullWidth:!0,sx:{bgcolor:"white",boxShadow:2,borderRadius:1},children:[e.jsx(R,{children:"--Quiz Type--"}),e.jsxs(B,{label:">--Quiz Type--",value:r,onChange:t=>b(t.target.value),children:[e.jsx(a,{value:1,children:"Multiple Choice"}),e.jsx(a,{value:2,children:"Essay"})]})]}),e.jsx(E,{placeholder:"Write your question here",value:d,onChange:t=>S(t)}),e.jsxs(x,{sx:{display:"flex",alignItems:"center",justifyContent:m?"space-between":"end"},children:[m&&e.jsx(V,{src:m,controls:!0}),e.jsx(D,{variant:"contained",color:"success",onClick:F,children:"audio"}),e.jsx("input",{ref:C,onChange:M,type:"file",accept:"audio/*",style:{display:"none"}})]}),r===1&&Object.keys(i).map((t,s)=>e.jsx(E,{placeholder:`Choice ${t.charAt(t.length-1)}`,value:i[t],onChange:T(t)},s)),e.jsxs(x,{sx:{display:"flex",alignItems:"center",p:1,bgcolor:"white",borderRadius:1,boxShadow:2,justifyContent:r===1?"space-between":"end"},children:[r===1&&e.jsxs(x,{sx:{display:"flex",gap:2},children:[e.jsxs(z,{sx:{bgcolor:"white",boxShadow:2,borderRadius:1,width:300},children:[e.jsx(R,{children:"--Correct Answer--"}),e.jsxs(B,{label:"--Correct Answer--",value:h,onChange:t=>I(t.target.value),children:[e.jsx(a,{value:"A",children:"A"}),e.jsx(a,{value:"B",children:"B"}),e.jsx(a,{value:"C",children:"C"}),e.jsx(a,{value:"D",children:"D"}),e.jsx(a,{value:"E",children:"E"})]})]}),e.jsx(J,{sx:{ml:2},required:!0,label:"Score",type:"number",value:p,onChange:t=>w(t.target.value)})]}),e.jsx(D,{variant:"contained",color:"success",type:"submit",children:k?e.jsx(O,{size:24,color:"inherit"}):"add"})]})]})})]})};export{Ae as default};
