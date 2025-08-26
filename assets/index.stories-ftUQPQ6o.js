import{d as y,b as n,i as a,e as b,k as l,F as v,g as k}from"./iframe-DCQsDILa.js";import{_ as x}from"./_plugin-vue_export-helper-DlAUqK2U.js";const C=["value"],D={key:0,value:""},N=["value","selected"],w=y({__name:"index",props:{options:{},modelValue:{},placeholder:{}},emits:["update:modelValue"],setup(E,{emit:V}){const _=V;function f(e){const{value:s}=e.target;_("update:modelValue",s)}return(e,s)=>(a(),n("select",{value:e.modelValue,class:"block pl-4 pr-10 py-2 border border-gray-200 rounded-xl shadow focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-white text-gray-900 transition duration-150 ease-in-out hover:border-primary",onChange:f},[e.placeholder?(a(),n("option",D,l(e.placeholder),1)):b("",!0),(a(!0),n(v,null,k(e.options,o=>(a(),n("option",{key:o.id,value:String(o.id),selected:String(o.id)===e.modelValue},l(o.name),9,N))),128))],40,C))}}),B=x(w,[["__scopeId","data-v-a7377811"]]),P={title:"Shared/UI/Select",component:B,tags:["autodocs"],argTypes:{options:{control:"object",description:"Список опцій для вибору."},modelValue:{control:"text",description:"Поточне значення селекту."},placeholder:{control:"text",description:"Текст-підказка, яка відображається, коли нічого не вибрано."}},args:{options:[{id:"1",name:"Option 1"},{id:"2",name:"Option 2"},{id:"3",name:"Option 3"}],modelValue:"",placeholder:"Select an option"}},t={args:{options:[{id:"1",name:"Option 1"},{id:"2",name:"Option 2"},{id:"3",name:"Option 3"}],modelValue:"",placeholder:"Select an option"}},r={args:{options:[{id:"1",name:"Option 1"},{id:"2",name:"Option 2"},{id:"3",name:"Option 3"}],modelValue:"2",placeholder:"Select an option"}},i={args:{options:[{id:"1",name:"Option 1"},{id:"2",name:"Option 2"},{id:"3",name:"Option 3"}],modelValue:"",placeholder:""}};var d,p,c;t.parameters={...t.parameters,docs:{...(d=t.parameters)==null?void 0:d.docs,source:{originalSource:`{
  args: {
    options: [{
      id: '1',
      name: 'Option 1'
    }, {
      id: '2',
      name: 'Option 2'
    }, {
      id: '3',
      name: 'Option 3'
    }],
    modelValue: '',
    placeholder: 'Select an option'
  }
}`,...(c=(p=t.parameters)==null?void 0:p.docs)==null?void 0:c.source}}};var m,u,g;r.parameters={...r.parameters,docs:{...(m=r.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {
    options: [{
      id: '1',
      name: 'Option 1'
    }, {
      id: '2',
      name: 'Option 2'
    }, {
      id: '3',
      name: 'Option 3'
    }],
    modelValue: '2',
    placeholder: 'Select an option'
  }
}`,...(g=(u=r.parameters)==null?void 0:u.docs)==null?void 0:g.source}}};var h,O,S;i.parameters={...i.parameters,docs:{...(h=i.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {
    options: [{
      id: '1',
      name: 'Option 1'
    }, {
      id: '2',
      name: 'Option 2'
    }, {
      id: '3',
      name: 'Option 3'
    }],
    modelValue: '',
    placeholder: ''
  }
}`,...(S=(O=i.parameters)==null?void 0:O.docs)==null?void 0:S.source}}};const W=["Default","WithSelectedValue","NoPlaceholder"];export{t as Default,i as NoPlaceholder,r as WithSelectedValue,W as __namedExportsOrder,P as default};
