var n=Object.defineProperty;var d=(i,t,e)=>t in i?n(i,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):i[t]=e;var o=(i,t,e)=>d(i,typeof t!="symbol"?t+"":t,e);import{aC as l,r as h,j as a,c as u}from"./index-B4oIbNwU.js";import{R as p}from"./quill.snow-DT1eIzPv.js";class s extends h.Component{constructor(e){super(e);o(this,"handleChange",e=>{this.setState({editorHtml:e}),this.props.onChange(e)});this.state={editorHtml:e.value||""},this.reactQuillRef=null}componentDidUpdate(e){e.value!==this.props.value&&this.setState({editorHtml:this.props.value})}render(){const{placeholder:e}=this.props;return a.jsx(u,{sx:{height:290,bgcolor:"white"},children:a.jsx(p,{ref:r=>{this.reactQuillRef=r},theme:"snow",value:this.state.editorHtml,onChange:this.handleChange,modules:s.modules(),formats:s.formats,placeholder:e,style:{height:"250px"}})})}}s.modules=()=>({toolbar:{container:[[{header:"1"},{header:"2"},{font:[]}],[{size:[]}],["bold","italic","underline","strike","blockquote"],[{list:"ordered"},{list:"bullet"},{indent:"-1"},{indent:"+1"}],["link","image","video"],["clean"]]},clipboard:{matchVisual:!1}});s.formats=["header","font","size","bold","italic","underline","strike","blockquote","list","bullet","indent","link","image","video"];s.propTypes={placeholder:l.string,value:l.string,onChange:l.func.isRequired};export{s as E};
