import{ap as Pe,aq as Ce,aj as ie,at as v,r as g,as as q,j as a,au as Te,av as ke,a5 as e,bl as Fe,bm as Me,bn as we,bo as Se,B as z,c as te,C as B,bp as Oe,bq as ze,br as We,bs as Re,bt as Ie,M as Ae,bu as Ne,bv as $e}from"./index-pyvLgiPp.js";import{L as Ee}from"./Layout-jtSix6VS.js";import{P as Le}from"./PageName-2bCy7-MC.js";import{P as Be,h as Z,e as Y,k as re,G as se,f as de,o as He,p as Ve,g as Q,s as Ge,u as qe,a as ne,b as Ye,v as le,j as Qe,I as L,J as Ke,K as ce,N as Ue,O as ue,Q as Je,R as Xe,d as O,L as K,A as U}from"./useMobilePicker-o5dJJL_9.js";import{P as $}from"./Paper-B_TRKWqd.js";import{G as S}from"./Grid-85wHHUa8.js";import{T as x,I as H}from"./TextField-CSh37Rrc.js";import{u as Ze}from"./FolderCopy-C6F8xJMs.js";import{T as ea}from"./Typography-Bpm5f3Pe.js";import{u as aa,r as he}from"./Modal-Nb9NvaEt.js";import{F as V}from"./FormControl-6KOne5Os.js";import{S as G}from"./Select-BJ6OZ-yE.js";import{M as E}from"./MenuItem-DhfO4-U0.js";import{B as N}from"./Button-D-BpVUho.js";import{d as me}from"./Remove-CalzGs0p.js";import{T as pe}from"./TableContainer-Ksy3hKKT.js";import{T as fe,a as J,b as R,c as _e}from"./TableRow-C6EMtRGU.js";import{T as be}from"./TableHead-D7VdfpRE.js";import{I as xe}from"./IconButton-BnVk0IqP.js";import{B as ta}from"./ButtonGroup-CcNFIICQ.js";import"./ChevronRight-B_GEEoEo.js";import"./createSvgIcon-DpkDy88t.js";import"./CalendarMonth-CeOvAitL.js";import"./Style-Dk2sPY8w.js";import"./ExitToApp-M85dDCJw.js";import"./useTheme-CIzdVg6i.js";import"./Toolbar-DHSlOoIC.js";import"./listItemIconClasses-CmdOw58c.js";import"./InputAdornment-DNYUcsVI.js";import"./utils-DUk-rZz1.js";import"./Popper-zSMXNn3W.js";import"./Grow-DgfkljgA.js";import"./useThemeProps-Bi6Aj-vj.js";import"./getThemeProps-CzrcT8Xv.js";import"./Input-Bqt1Xge6.js";import"./GlobalStyles-DRYszFDj.js";import"./Menu-CKYGmSrP.js";function ra(t){return Pe("MuiDatePickerToolbar",t)}Ce("MuiDatePickerToolbar",["root","title"]);const sa=["value","isLandscape","onChange","toolbarFormat","toolbarPlaceholder","views","className"],na=t=>{const{classes:r}=t;return ke({root:["root"],title:["title"]},ra,r)},la=ie(Be,{name:"MuiDatePickerToolbar",slot:"Root",overridesResolver:(t,r)=>r.root})({}),oa=ie(ea,{name:"MuiDatePickerToolbar",slot:"Title",overridesResolver:(t,r)=>r.title})(({ownerState:t})=>v({},t.isLandscape&&{margin:"auto 16px auto auto"})),ia=g.forwardRef(function(r,u){const o=Z({props:r,name:"MuiDatePickerToolbar"}),{value:d,isLandscape:c,toolbarFormat:h,toolbarPlaceholder:n="––",views:s,className:i}=o,C=q(o,sa),f=Y(),j=re(),y=na(o),m=g.useMemo(()=>{if(!d)return n;const D=se(f,{format:h,views:s},!0);return f.formatByString(d,D)},[d,h,n,f,s]),_=o;return a.jsx(la,v({ref:u,toolbarTitle:j.datePickerToolbarTitle,isLandscape:c,className:Te(y.root,i)},C,{children:a.jsx(oa,{variant:"h4",align:c?"left":"center",ownerState:_,className:y.title,children:m})}))});function ge(t,r){var u,o,d,c;const h=Y(),n=de(),s=Z({props:t,name:r}),i=g.useMemo(()=>{var f;return((f=s.localeText)==null?void 0:f.toolbarTitle)==null?s.localeText:v({},s.localeText,{datePickerToolbarTitle:s.localeText.toolbarTitle})},[s.localeText]),C=(u=s.slots)!=null?u:He(s.components);return v({},s,{localeText:i},Ve({views:s.views,openTo:s.openTo,defaultViews:["year","day"],defaultOpenTo:"day"}),{disableFuture:(o=s.disableFuture)!=null?o:!1,disablePast:(d=s.disablePast)!=null?d:!1,minDate:Q(h,s.minDate,n.minDate),maxDate:Q(h,s.maxDate,n.maxDate),slots:v({toolbar:ia},C),slotProps:(c=s.slotProps)!=null?c:s.componentsProps})}const da=t=>{var r,u,o;const d=Y(),c=de();return v({},t,{disablePast:(r=t.disablePast)!=null?r:!1,disableFuture:(u=t.disableFuture)!=null?u:!1,format:(o=t.format)!=null?o:d.formats.keyboardDate,minDate:Q(d,t.minDate,c.minDate),maxDate:Q(d,t.maxDate,c.maxDate)})},ca=({props:t,inputRef:r})=>{const u=da(t),{forwardedProps:o,internalProps:d}=Ge(u,"date");return qe({inputRef:r,forwardedProps:o,internalProps:d,valueManager:ne,fieldValueManager:Ye,validator:le,valueType:"date"})},ua=["components","componentsProps","slots","slotProps","InputProps","inputProps"],ha=["inputRef"],ma=["ref","onPaste","onKeyDown","inputMode","readOnly","clearable","onClear"],ye=g.forwardRef(function(r,u){var o,d,c;const h=Z({props:r,name:"MuiDateField"}),{components:n,componentsProps:s,slots:i,slotProps:C,InputProps:f,inputProps:j}=h,y=q(h,ua),m=h,_=(o=(d=i==null?void 0:i.textField)!=null?d:n==null?void 0:n.TextField)!=null?o:x,D=aa({elementType:_,externalSlotProps:(c=C==null?void 0:C.textField)!=null?c:s==null?void 0:s.textField,externalForwardedProps:y,ownerState:m}),{inputRef:w}=D,k=q(D,ha);k.inputProps=v({},j,k.inputProps),k.InputProps=v({},f,k.InputProps);const p=ca({props:k,inputRef:w}),{ref:b,onPaste:l,onKeyDown:T,inputMode:I,readOnly:P,clearable:W,onClear:M}=p,F=q(p,ma),{InputProps:A,fieldProps:De}=Qe({onClear:M,clearable:W,fieldProps:F,InputProps:F.InputProps,slots:i,slotProps:C,components:n,componentsProps:s});return a.jsx(_,v({ref:u},De,{InputProps:v({},A,{readOnly:P}),inputProps:v({},F.inputProps,{inputMode:I,onPaste:l,onKeyDown:T,ref:b})}))}),ve=g.forwardRef(function(r,u){var o,d,c,h;const n=re(),s=Y(),i=ge(r,"MuiDesktopDatePicker"),C=v({day:L,month:L,year:L},i.viewRenderers),f=v({},i,{viewRenderers:C,format:se(s,i,!1),yearsPerRow:(o=i.yearsPerRow)!=null?o:4,slots:v({openPickerIcon:Ke,field:ye},i.slots),slotProps:v({},i.slotProps,{field:y=>{var m;return v({},he((m=i.slotProps)==null?void 0:m.field,y),ce(i),{ref:u})},toolbar:v({hidden:!0},(d=i.slotProps)==null?void 0:d.toolbar)})}),{renderPicker:j}=Ue({props:f,valueManager:ne,valueType:"date",getOpenDialogAriaText:(c=(h=f.localeText)==null?void 0:h.openDatePickerDialogue)!=null?c:n.openDatePickerDialogue,validator:le});return j()});ve.propTypes={autoFocus:e.bool,className:e.string,closeOnSelect:e.bool,components:e.object,componentsProps:e.object,dayOfWeekFormatter:e.func,defaultCalendarMonth:e.any,defaultValue:e.any,disabled:e.bool,disableFuture:e.bool,disableHighlightToday:e.bool,disableOpenPicker:e.bool,disablePast:e.bool,displayWeekNumber:e.bool,fixedWeekNumber:e.number,format:e.string,formatDensity:e.oneOf(["dense","spacious"]),inputRef:ue,label:e.node,loading:e.bool,localeText:e.object,maxDate:e.any,minDate:e.any,monthsPerRow:e.oneOf([3,4]),name:e.string,onAccept:e.func,onChange:e.func,onClose:e.func,onError:e.func,onMonthChange:e.func,onOpen:e.func,onSelectedSectionsChange:e.func,onViewChange:e.func,onYearChange:e.func,open:e.bool,openTo:e.oneOf(["day","month","year"]),orientation:e.oneOf(["landscape","portrait"]),readOnly:e.bool,reduceAnimations:e.bool,referenceDate:e.any,renderLoading:e.func,selectedSections:e.oneOfType([e.oneOf(["all","day","hours","meridiem","minutes","month","seconds","weekDay","year"]),e.number,e.shape({endIndex:e.number.isRequired,startIndex:e.number.isRequired})]),shouldDisableDate:e.func,shouldDisableMonth:e.func,shouldDisableYear:e.func,showDaysOutsideCurrentMonth:e.bool,slotProps:e.object,slots:e.object,sx:e.oneOfType([e.arrayOf(e.oneOfType([e.func,e.object,e.bool])),e.func,e.object]),timezone:e.string,value:e.any,view:e.oneOf(["day","month","year"]),viewRenderers:e.shape({day:e.func,month:e.func,year:e.func}),views:e.arrayOf(e.oneOf(["day","month","year"]).isRequired),yearsPerRow:e.oneOf([3,4])};const je=g.forwardRef(function(r,u){var o,d,c;const h=re(),n=Y(),s=ge(r,"MuiMobileDatePicker"),i=v({day:L,month:L,year:L},s.viewRenderers),C=v({},s,{viewRenderers:i,format:se(n,s,!1),slots:v({field:ye},s.slots),slotProps:v({},s.slotProps,{field:j=>{var y;return v({},he((y=s.slotProps)==null?void 0:y.field,j),ce(s),{ref:u})},toolbar:v({hidden:!1},(o=s.slotProps)==null?void 0:o.toolbar)})}),{renderPicker:f}=Je({props:C,valueManager:ne,valueType:"date",getOpenDialogAriaText:(d=(c=C.localeText)==null?void 0:c.openDatePickerDialogue)!=null?d:h.openDatePickerDialogue,validator:le});return f()});je.propTypes={autoFocus:e.bool,className:e.string,closeOnSelect:e.bool,components:e.object,componentsProps:e.object,dayOfWeekFormatter:e.func,defaultCalendarMonth:e.any,defaultValue:e.any,disabled:e.bool,disableFuture:e.bool,disableHighlightToday:e.bool,disableOpenPicker:e.bool,disablePast:e.bool,displayWeekNumber:e.bool,fixedWeekNumber:e.number,format:e.string,formatDensity:e.oneOf(["dense","spacious"]),inputRef:ue,label:e.node,loading:e.bool,localeText:e.object,maxDate:e.any,minDate:e.any,monthsPerRow:e.oneOf([3,4]),name:e.string,onAccept:e.func,onChange:e.func,onClose:e.func,onError:e.func,onMonthChange:e.func,onOpen:e.func,onSelectedSectionsChange:e.func,onViewChange:e.func,onYearChange:e.func,open:e.bool,openTo:e.oneOf(["day","month","year"]),orientation:e.oneOf(["landscape","portrait"]),readOnly:e.bool,reduceAnimations:e.bool,referenceDate:e.any,renderLoading:e.func,selectedSections:e.oneOfType([e.oneOf(["all","day","hours","meridiem","minutes","month","seconds","weekDay","year"]),e.number,e.shape({endIndex:e.number.isRequired,startIndex:e.number.isRequired})]),shouldDisableDate:e.func,shouldDisableMonth:e.func,shouldDisableYear:e.func,showDaysOutsideCurrentMonth:e.bool,slotProps:e.object,slots:e.object,sx:e.oneOfType([e.arrayOf(e.oneOfType([e.func,e.object,e.bool])),e.func,e.object]),timezone:e.string,value:e.any,view:e.oneOf(["day","month","year"]),viewRenderers:e.shape({day:e.func,month:e.func,year:e.func}),views:e.arrayOf(e.oneOf(["day","month","year"]).isRequired),yearsPerRow:e.oneOf([3,4])};const pa=["desktopModeMediaQuery"],X=g.forwardRef(function(r,u){const o=Z({props:r,name:"MuiDatePicker"}),{desktopModeMediaQuery:d=Xe}=o,c=q(o,pa);return Ze(d,{defaultMatches:!0})?a.jsx(ve,v({ref:u},c)):a.jsx(je,v({ref:u},c))}),fa=({provinces:t,info:r,name:u,nis:o})=>{const[d,c]=g.useState(""),[h,n]=g.useState(""),[s,i]=g.useState(""),[C,{data:f,isSuccess:j,error:y,isLoading:m,reset:_}]=Fe(),{data:D}=Me(d,{skip:!d}),{data:w}=we(h,{skip:!h}),{data:k}=Se(s,{skip:!s}),[p,b]=g.useState({name:u,nisn:"",nis:o,birth_place:"",birth_date:O(),height:"",weight:"",around_head:"",order_birth:"",siblings:"",province_id:"",province_name:"",regency_id:"",regency_name:"",district_id:"",district_name:"",village_id:"",village_name:"",district:"",address:"",postal_code:""}),l=P=>{const{name:W,value:M}=P.target;if(W==="province_id"){const F=t==null?void 0:t.find(A=>A.id===M);c(M),b({...p,province_id:M,province_name:F?F.name:""})}if(W==="regency_id"){const F=D==null?void 0:D.find(A=>A.id===M);n(M),b({...p,regency_id:M,regency_name:F?F.name:""})}if(W==="district_id"){const F=w==null?void 0:w.find(A=>A.id===M);i(M),b({...p,district_id:M,district_name:F?F.name:""})}if(W==="village_id"){const F=k==null?void 0:k.find(A=>A.id.trim()===M.trim());b({...p,village_id:M,village_name:F?F.name:""})}W!=="province_id"&&W!=="regency_id"&&W!=="district_id"&&W!=="village_id"&&b({...p,[W]:M})},T=P=>{b({...p,birth_date:P})},I=P=>{P.preventDefault(),C(p)};return g.useEffect(()=>{j&&(z.success(f.message),_()),y&&(z.error(y.data.message),_())},[j,y,f]),g.useEffect(()=>{r&&(b({name:r.name,nisn:r.nisn,nis:r.nis,birth_place:r.birth_place,birth_date:r.birth_date?O(r.birth_date):O(),height:r.height,weight:r.weight,around_head:r.around_head,order_birth:r.order_birth,siblings:r.siblings,province_id:r.province_id,province_name:r.province_name,regency_id:r.regency_id,regency_name:r.regency_name,district_id:r.district_id,district_name:r.district_name,village_id:r.village_id.trim(),village_name:r.village_name,address:r.address,postal_code:r.postal_code}),console.log(r.village_id),c(r.province_id),n(r.regency_id),i(r.district_id))},[r]),a.jsx($,{sx:{width:"100%",p:1},children:a.jsxs("form",{onSubmit:I,children:[a.jsxs(S,{container:!0,children:[a.jsxs(S,{item:!0,xs:12,md:6,sx:{p:1,display:"flex",flexDirection:"column",gap:2},children:[a.jsx(x,{fullWidth:!0,label:"Full Name",size:"small",variant:"standard",name:"name",value:p.name||"",onChange:l}),a.jsx(x,{fullWidth:!0,label:"NISN",size:"small",variant:"standard",name:"nisn",value:p.nisn||"",onChange:l}),a.jsx(x,{fullWidth:!0,label:"NIS",size:"small",variant:"standard",name:"nis",value:p.nis||"",onChange:l}),a.jsx(x,{fullWidth:!0,label:"Birth Place",size:"small",variant:"standard",name:"birth_place",value:p.birth_place||"",onChange:l}),a.jsx(K,{dateAdapter:U,children:a.jsx(X,{label:"Birth Date",value:p.birth_date||"",onChange:T,slotProps:{textField:{fullWidth:!0,variant:"standard"}}})}),a.jsx(x,{fullWidth:!0,type:"number",label:"Order Birth",size:"small",variant:"standard",name:"order_birth",value:p.order_birth,onChange:l}),a.jsx(x,{fullWidth:!0,type:"number",label:"Total Siblings",size:"small",variant:"standard",name:"siblings",value:p.siblings||"",onChange:l}),a.jsx(x,{fullWidth:!0,type:"number",label:"Height",size:"small",variant:"standard",name:"height",value:p.height||"",onChange:l}),a.jsx(x,{fullWidth:!0,type:"number",label:"Weight",size:"small",variant:"standard",name:"weight",value:p.weight||"",onChange:l})]}),a.jsxs(S,{item:!0,xs:12,md:6,sx:{p:1,display:"flex",flexDirection:"column",gap:2},children:[a.jsx(x,{fullWidth:!0,type:"number",label:"Around Head",size:"small",variant:"standard",name:"around_head",value:p.around_head||"",onChange:l}),a.jsxs(V,{fullWidth:!0,variant:"standard",children:[a.jsx(H,{children:"--Province--"}),a.jsx(G,{name:"province_id",value:p.province_id||"",onChange:l,children:t==null?void 0:t.map(P=>a.jsx(E,{value:P.id,children:P.name},P.id))})]}),d&&a.jsxs(V,{fullWidth:!0,variant:"standard",children:[a.jsx(H,{children:"--Regency--"}),a.jsx(G,{name:"regency_id",value:p.regency_id||"",onChange:l,children:D==null?void 0:D.map(P=>a.jsx(E,{value:P.id,children:P.name},P.id))})]}),h&&a.jsxs(V,{fullWidth:!0,variant:"standard",children:[a.jsx(H,{children:"--District--"}),a.jsx(G,{name:"district_id",value:p.district_id||"",onChange:l,children:w==null?void 0:w.map(P=>a.jsx(E,{value:P.id,children:P.name},P.id))})]}),s&&a.jsxs(V,{fullWidth:!0,variant:"standard",children:[a.jsx(H,{children:"--Village--"}),a.jsx(G,{name:"village_id",value:p.village_id||"",onChange:l,children:k==null?void 0:k.map(P=>a.jsx(E,{value:P.id.trim(),children:P.name},P.id.trim()))})]}),a.jsx(x,{fullWidth:!0,label:"Address",size:"small",variant:"standard",name:"address",value:p.address||"",onChange:l}),a.jsx(x,{fullWidth:!0,label:"Postal Code",size:"small",variant:"standard",name:"postal_code",value:p.postal_code||"",onChange:l})]})]}),a.jsx(te,{sx:{display:"flex",justifyContent:"end"},children:a.jsx(N,{variant:"contained",color:"success",type:"submit",children:m?a.jsx(B,{size:24,color:"inherit"}):"save"})})]})})};function _a(t){const r=new Date,u=new Date(t);let o=r.getFullYear()-u.getFullYear();const d=r.getMonth()-u.getMonth();return(d<0||d===0&&r.getDate()<u.getDate())&&o--,o}const ba=({info:t})=>{const[r,{isSuccess:u,data:o,isLoading:d,error:c,reset:h}]=Oe(),[n,{isSuccess:s,data:i,isLoading:C,error:f,reset:j}]=ze(),[y,m]=g.useState((t==null?void 0:t.family_info)||[]),[_,D]=g.useState({family_name:"",family_gender:"",family_birth_date:O()}),w=l=>{const{name:T,value:I}=l.target;D({..._,[T]:I})},k=l=>{D({..._,family_birth_date:l})},p=()=>{const l={family_name:_.family_name,family_gender:_.family_gender,family_birth_date:_.family_birth_date,id:Date.now()},T={nis:t.nis,familyData:[...y,l]};r(T).unwrap().then(()=>{m(I=>[...I,l]),D({family_name:"",family_gender:"",family_birth_date:O()})})},b=l=>{const T={nis:t.nis,familyId:l};n(T).unwrap().then(()=>{m(y.filter(I=>I.id!==l))})};return g.useEffect(()=>{u&&(z.success(o.message),h()),c&&(z.error(c.data.message),h())},[u,c,h,o]),g.useEffect(()=>{s&&(z.success(i.message),j()),f&&(z.error(f.data.message),j())},[s,f,i]),a.jsx($,{sx:{width:"100%",display:"flex",flexDirection:"column",gap:2,p:1},children:a.jsxs(S,{container:!0,children:[a.jsx(S,{item:!0,xs:12,md:8,sx:{p:1},children:a.jsx(pe,{component:$,sx:{maxHeight:{xs:500,md:450,lg:530},overflow:"auto"},children:a.jsxs(fe,{children:[a.jsx(be,{children:a.jsx(J,{children:["No","Name","Gender","Birth Date","Age","Action"].map(l=>a.jsx(R,{children:l},l))})}),a.jsx(_e,{children:y.map((l,T)=>a.jsxs(J,{children:[a.jsx(R,{children:T+1}),a.jsx(R,{children:l.family_name}),a.jsx(R,{children:l.family_gender}),a.jsx(R,{children:O(l.family_birth_date).format("DD/MM/YYYY")}),a.jsx(R,{children:_a(l.family_birth_date)}),a.jsx(R,{children:a.jsx(xe,{color:"error",onClick:()=>b(l.id),children:C?a.jsx(B,{size:20,color:"inherit"}):a.jsx(me,{})})})]},l.id))})]})})}),a.jsx(S,{item:!0,xs:12,md:4,sx:{p:1},children:a.jsxs("form",{style:{display:"flex",flexDirection:"column",gap:"1rem"},onSubmit:l=>{l.preventDefault(),p()},children:[a.jsx(x,{fullWidth:!0,size:"small",variant:"standard",label:"Name",name:"family_name",value:_.family_name,onChange:w,required:!0}),a.jsxs(V,{required:!0,children:[a.jsx(H,{children:"--Gender--"}),a.jsxs(G,{label:"--Gender--",name:"family_gender",value:_.family_gender,onChange:w,children:[a.jsx(E,{value:"Male",children:"Male"}),a.jsx(E,{value:"Female",children:"Female"})]})]}),a.jsx(K,{dateAdapter:U,children:a.jsx(X,{label:"Birth Date",name:"family_birth_date",value:_.family_birth_date,onChange:k,slotProps:{textField:{fullWidth:!0,variant:"standard"}}})}),a.jsx(N,{fullWidth:!0,variant:"contained",color:"success",type:"submit",children:d?a.jsx(B,{size:20,color:"inherit"}):"Add"})]})})]})})},ee=t=>t!=null&&t.startsWith("0")?`62${t.slice(1)}`:t,ae=t=>{const r=t.replace(/[^\d]/g,"");return`Rp ${parseInt(r,10).toLocaleString("id-ID")}`},oe=t=>t.replace(/[^\d]/g,""),xa=({info:t})=>{const[r,{data:u,isSuccess:o,isLoading:d,error:c,reset:h}]=We(),[n,s]=g.useState({father_nik:"",father_name:"",father_birth_place:"",father_birth_date:O(),father_job:"",father_position:"",father_earning:0,father_phone:"",mother_nik:"",mother_name:"",mother_birth_place:"",mother_birth_date:O(),mother_job:"",mother_position:"",mother_earning:0,mother_phone:"",nis:""}),i=m=>{const{name:_,value:D}=m.target;s({...n,[_]:_==="father_phone"||_==="mother_phone"?ee(D):D})},C=m=>{const{name:_,value:D}=m.target;s({...n,[_]:ae(D)})},f=m=>{s({...n,father_birth_date:m})},j=m=>{s({...n,mother_birth_date:m})},y=m=>{m.preventDefault();const _={...n,father_earning:oe(n.father_earning),mother_earning:oe(n.mother_earning)};r(_)};return g.useEffect(()=>{o&&(z.success(u.message),h()),c&&(z.error(c.data.message),h())},[o,c,u]),g.useEffect(()=>{t&&s({father_nik:t.father_nik,father_name:t.father_name,father_birth_place:t.father_birth_place,father_birth_date:t.father_birth_date?O(t.father_birth_date):O(),father_job:t.father_job,father_position:t.father_position,father_earning:t.father_earning?ae(t.father_earning):0,father_phone:ee(t.father_phone),mother_nik:t.mother_nik,mother_name:t.mother_name,mother_birth_place:t.mother_birth_place,mother_birth_date:t.mother_birth_date?O(t.mother_birth_date):O(),mother_job:t.mother_job,mother_position:t.mother_position,mother_earning:t.mother_earning?ae(t.mother_earning):0,mother_phone:ee(t.mother_phone),nis:t.nis})},[t]),a.jsx($,{sx:{width:"100%",p:1},children:a.jsxs("form",{onSubmit:y,children:[a.jsxs(S,{container:!0,children:[a.jsxs(S,{item:!0,xs:12,md:6,sx:{display:"flex",flexDirection:"column",gap:2,p:1},children:[a.jsx(x,{fullWidth:!0,type:"number",label:"Father NIK",size:"small",variant:"standard",name:"father_nik",value:n.father_nik||"",onChange:i}),a.jsx(x,{fullWidth:!0,label:"Father Name",size:"small",variant:"standard",name:"father_name",value:n.father_name||"",onChange:i}),a.jsx(x,{fullWidth:!0,label:"Father Birth Place",size:"small",variant:"standard",name:"father_birth_place",value:n.father_birth_place||"",onChange:i}),a.jsx(K,{dateAdapter:U,children:a.jsx(X,{label:"Father Birth Date",value:n.father_birth_date,onChange:f,slotProps:{textField:{fullWidth:!0,variant:"standard"}}})}),a.jsx(x,{fullWidth:!0,label:"Father Job",size:"small",variant:"standard",name:"father_job",value:n.father_job||"",onChange:i}),a.jsx(x,{fullWidth:!0,label:"Father Position",size:"small",variant:"standard",name:"father_position",value:n.father_position||"",onChange:i}),a.jsx(x,{fullWidth:!0,label:"Father Earning",size:"small",variant:"standard",name:"father_earning",onChange:C,value:n.father_earning||""}),a.jsx(x,{fullWidth:!0,type:"number",label:"Father Phone",size:"small",variant:"standard",name:"father_phone",onChange:i,value:n.father_phone||""})]}),a.jsxs(S,{item:!0,xs:12,md:6,sx:{display:"flex",flexDirection:"column",gap:2,p:1},children:[a.jsx(x,{fullWidth:!0,type:"number",label:"Mohter NIK",size:"small",variant:"standard",name:"mother_nik",value:n.mother_nik||"",onChange:i}),a.jsx(x,{fullWidth:!0,label:"Mother Name",size:"small",variant:"standard",name:"mother_name",value:n.mother_name||"",onChange:i}),a.jsx(x,{fullWidth:!0,label:"Mother Birth Place",size:"small",variant:"standard",name:"mother_birth_place",value:n.mother_birth_place||"",onChange:i}),a.jsx(K,{dateAdapter:U,children:a.jsx(X,{label:"Mother Birth Date",value:n.mother_birth_date,onChange:j,slotProps:{textField:{fullWidth:!0,variant:"standard"}}})}),a.jsx(x,{fullWidth:!0,label:"Mother Job",size:"small",variant:"standard",name:"mother_job",value:n.mother_job||"",onChange:i}),a.jsx(x,{fullWidth:!0,label:"Mother Position",size:"small",variant:"standard",name:"mother_position",value:n.mother_position||"",onChange:i}),a.jsx(x,{fullWidth:!0,label:"Mother Earning",size:"small",variant:"standard",name:"mother_earning",onChange:C,value:n.mother_earning||""}),a.jsx(x,{fullWidth:!0,type:"number",label:"Mother phone",size:"small",variant:"standard",name:"mother_phone",onChange:i,value:n.mother_phone||""})]})]}),a.jsx(te,{sx:{display:"flex",justifyContent:"end"},children:a.jsx(N,{variant:"contained",color:"success",type:"submit",children:d?a.jsx(B,{size:20,color:"inherit"}):"save"})})]})})},ga=({info:t})=>{const[r,{data:u,isLoading:o,isSuccess:d,error:c,reset:h}]=Re(),[n,{isSuccess:s,data:i,isLoading:C,error:f,reset:j}]=Ie(),[y,m]=g.useState((t==null?void 0:t.health_records)||[]),[_,D]=g.useState({health_notes:""}),w=b=>{const{name:l,value:T}=b.target;D({..._,[l]:T})},k=()=>{const b={..._,id:Date.now()};m(T=>[...T,b]);const l={nis:t==null?void 0:t.nis,healthData:[...y,b].map(T=>({...T,id:T.id}))};r(l),D({health_notes:""})},p=b=>{const l={nis:t==null?void 0:t.nis,healthId:b};n(l).unwrap().then(()=>{m(y.filter(T=>T.id!==b))})};return g.useEffect(()=>{d&&(z.success(u.message),h()),c&&(z.error(c.data.message),h())},[u,d,c,h]),g.useEffect(()=>{s&&(z.success(i.message),j()),f&&(z.error(f.data.message),j())},[s,f,i]),a.jsx($,{sx:{width:"100%",display:"flex",flexDirection:"column",gap:2,p:1},children:a.jsxs(S,{container:!0,children:[a.jsx(S,{item:!0,xs:12,md:8,sx:{p:1},children:a.jsx(pe,{component:$,sx:{maxHeight:{xs:500,md:450,lg:530},overflow:"auto"},children:a.jsxs(fe,{children:[a.jsx(be,{children:a.jsx(J,{children:["No","Note","Actions"].map(b=>a.jsx(R,{children:b},b))})}),a.jsx(_e,{children:y.map((b,l)=>a.jsxs(J,{children:[a.jsx(R,{children:l+1}),a.jsx(R,{children:b.health_notes}),a.jsx(R,{children:a.jsx(xe,{color:"error",onClick:()=>p(b.id),children:o?a.jsx(B,{size:20,color:"inherit"}):a.jsx(me,{})})})]},b.id))})]})})}),a.jsx(S,{item:!0,xs:12,md:4,sx:{p:1},children:a.jsxs("form",{style:{display:"flex",flexDirection:"column",gap:"1rem"},onSubmit:b=>{b.preventDefault(),k()},children:[a.jsx(x,{fullWidth:!0,required:!0,size:"small",variant:"standard",label:"Health Notes",name:"health_notes",value:_.health_notes,onChange:w}),a.jsx(N,{fullWidth:!0,variant:"contained",color:"success",type:"submit",children:o?a.jsx(B,{size:20,color:"inherit"}):"Add"})]})})]})})},rt=()=>{const[t,r]=g.useState(!0),[u,o]=g.useState(!1),[d,c]=g.useState(!1),[h,n]=g.useState(!1),s=()=>{r(!0),o(!1),c(!1),n(!1)},i=()=>{r(!1),o(!0),c(!1),n(!1)},C=()=>{r(!1),o(!1),c(!0),n(!1)},f=()=>{r(!1),o(!1),c(!1),n(!0)},j=Ae(),{data:y}=Ne(),{data:m}=$e(j.nis,{skip:!j.nis});return a.jsxs(Ee,{children:[a.jsx(Le,{title:"Database"}),a.jsx(S,{container:!0,sx:{minHeight:"85vh",display:"flex",flexDirection:"column"},children:a.jsxs(te,{sx:{display:"flex",flexDirection:"column",gap:2,justifyContent:"center",alignItems:"center"},children:[a.jsx($,{children:a.jsxs(ta,{children:[a.jsx(N,{onClick:s,variant:t?"contained":"outlined",color:"primary",children:"student"}),m&&a.jsx(N,{onClick:i,variant:u?"contained":"outlined",color:"primary",children:"parents"}),m&&a.jsx(N,{onClick:C,variant:d?"contained":"outlined",color:"primary",children:"family"}),m&&a.jsx(N,{onClick:f,variant:h?"contained":"outlined",color:"primary",children:"health"})]})}),t&&a.jsx(fa,{provinces:y,info:m,name:j.studentName.replace(/-/g," "),nis:j.nis}),u&&a.jsx(xa,{info:m}),d&&a.jsx(ba,{info:m}),h&&a.jsx(ga,{info:m})]})})]})};export{rt as default};
