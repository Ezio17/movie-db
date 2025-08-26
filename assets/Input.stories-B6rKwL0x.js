import{d as E,b as x,i as I}from"./iframe-DCQsDILa.js";const V=["type","value","placeholder"],w=E({__name:"Input",props:{modelValue:{},type:{default:"text"},placeholder:{}},emits:["update:modelValue","focus","blur"],setup(b,{emit:g}){const s=g;function f(r){const e=r.target;e&&s("update:modelValue",e.value)}return(r,e)=>(I(),x("input",{type:r.type,value:r.modelValue,placeholder:r.placeholder,class:"px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary",onInput:f,onFocus:e[0]||(e[0]=h=>s("focus")),onBlur:e[1]||(e[1]=h=>s("blur"))},null,40,V))}}),v={title:"Shared/UI/Input",component:w,tags:["autodocs"],argTypes:{type:{control:"select",options:["text","email","password"]},modelValue:{control:"text"},placeholder:{control:"text",description:"Текст-підказка, яка відображається всередині інпуту, коли він порожній.",table:{type:{summary:"string"},defaultValue:{summary:'""'}}}},args:{modelValue:"",type:"text",placeholder:"Type here..."}},a={name:"Text Input",args:{placeholder:"Enter text..."}},t={args:{type:"email",modelValue:"example@email.com",placeholder:"Enter your email"},name:"Email Input"},o={args:{type:"password",modelValue:"secret",placeholder:"Enter your password"},name:"Enter your password"};var n,l,p;a.parameters={...a.parameters,docs:{...(n=a.parameters)==null?void 0:n.docs,source:{originalSource:`{
  name: 'Text Input',
  args: {
    placeholder: 'Enter text...'
  }
}`,...(p=(l=a.parameters)==null?void 0:l.docs)==null?void 0:p.source}}};var u,d,m;t.parameters={...t.parameters,docs:{...(u=t.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {
    type: 'email',
    modelValue: 'example@email.com',
    placeholder: 'Enter your email'
  },
  name: 'Email Input'
}`,...(m=(d=t.parameters)==null?void 0:d.docs)==null?void 0:m.source}}};var c,i,y;o.parameters={...o.parameters,docs:{...(c=o.parameters)==null?void 0:c.docs,source:{originalSource:`{
  args: {
    type: 'password',
    modelValue: 'secret',
    placeholder: 'Enter your password'
  },
  name: 'Enter your password'
}`,...(y=(i=o.parameters)==null?void 0:i.docs)==null?void 0:y.source}}};const _=["Default","WithEmailType","PasswordInput"];export{a as Default,o as PasswordInput,t as WithEmailType,_ as __namedExportsOrder,v as default};
