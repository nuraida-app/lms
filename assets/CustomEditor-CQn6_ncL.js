var v=Object.defineProperty;var x=(i,t,e)=>t in i?v(i,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):i[t]=e;var m=(i,t,e)=>x(i,typeof t!="symbol"?t+"":t,e);import{a6 as a,r as f,j as s,c as g}from"./index-CYXdUE1E.js";import{R as k}from"./quill.snow-Afa9WVRZ.js";import{E as y}from"./Editor-pyoA29U9.js";class o extends f.Component{constructor(e){super(e);m(this,"handleChange",e=>{this.setState({editorHtml:e}),this.props.onChange(e)});this.state={editorHtml:e.value||""},this.reactQuillRef=null}componentDidUpdate(e){e.value!==this.props.value&&this.setState({editorHtml:this.props.value})}render(){const{placeholder:e}=this.props;return s.jsx(g,{sx:{height:290,bgcolor:"white"},children:s.jsx(k,{ref:d=>{this.reactQuillRef=d},theme:"snow",value:this.state.editorHtml,onChange:this.handleChange,modules:o.modules(),formats:o.formats,placeholder:e,style:{height:"250px"}})})}}o.modules=()=>({toolbar:{container:[[{header:"1"},{header:"2"},{font:[]}],[{size:[]}],["bold","italic","underline","strike","blockquote"],[{list:"ordered"},{list:"bullet"},{indent:"-1"},{indent:"+1"}],["link","image","video"],["clean"]]},clipboard:{matchVisual:!1}});o.formats=["header","font","size","bold","italic","underline","strike","blockquote","list","bullet","indent","link","image","video"];o.propTypes={placeholder:a.string,value:a.string,onChange:a.func.isRequired};const C=({placeholder:i,value:t,onChange:e})=>{const d=f.useRef(null),b=l=>{e(l)};return s.jsx(g,{sx:{height:450,bgcolor:"white"},children:s.jsx(y,{apiKey:"z7vwrbf4j0m50fzfvcefz3e7beevo26e4egpqf02zvfng8yd",onInit:(l,u)=>d.current=u,value:t,init:{height:450,placeholder:i,menubar:!0,plugins:["advlist","autolink","lists","link","image","charmap","preview","anchor","searchreplace","visualblocks","code","fullscreen","insertdatetime","media","table","code","help","wordcount"],toolbar:"undo redo | blocks | image | media bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help",content_style:"body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",images_upload_url:"https://api.nibs.sch.id/upload/images",file_picker_callback:function(l,u,R){var n=document.createElement("input");n.setAttribute("type","file"),n.setAttribute("accept","audio/*"),n.onchange=function(){var c=this.files[0],h=new FileReader;h.readAsDataURL(c),h.onload=function(){var p=new FormData;p.append("file",c),fetch("https://api.nibs.sch.id/upload/audios",{method:"POST",body:p}).then(r=>r.json()).then(r=>{l(r.url,{title:c.name})}).catch(r=>{console.error("Error uploading image:",r),alert("Error uploading image")})}},n.click()}},onEditorChange:b})})};C.propTypes={placeholder:a.string,value:a.string,onChange:a.func.isRequired};export{C};
