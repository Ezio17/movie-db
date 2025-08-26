import{_ as r}from"./index.vue_vue_type_script_setup_true_lang-vcXyjJBu.js";import"./iframe-DCQsDILa.js";const B={title:"Pagination/UI/PaginationButton",component:r,tags:["autodocs"],argTypes:{disabled:{control:{type:"boolean"},description:"Неактивна кнопка."},default:{control:"text",description:"Текст кнопки."}},args:{disabled:!1,default:"Test"}},a={args:{default:"Prev"},render:t=>({components:{PaginationButton:r},setup(){return{args:t}},template:'<PaginationButton v-bind="args">{{ args.default }}</PaginationButton>'})},e={args:{default:"Next"},render:t=>({components:{PaginationButton:r},setup(){return{args:t}},template:'<PaginationButton v-bind="args">{{ args.default }}</PaginationButton>'})},n={args:{default:"Disabled",disabled:!0},render:t=>({components:{PaginationButton:r},setup(){return{args:t}},template:'<PaginationButton :disabled="args.disabled">{{ args.default }}</PaginationButton>'})};var o,s,i;a.parameters={...a.parameters,docs:{...(o=a.parameters)==null?void 0:o.docs,source:{originalSource:`{
  args: {
    default: 'Prev'
  },
  render: args => ({
    components: {
      PaginationButton
    },
    setup() {
      return {
        args
      };
    },
    template: '<PaginationButton v-bind="args">{{ args.default }}</PaginationButton>'
  })
}`,...(i=(s=a.parameters)==null?void 0:s.docs)==null?void 0:i.source}}};var d,u,g;e.parameters={...e.parameters,docs:{...(d=e.parameters)==null?void 0:d.docs,source:{originalSource:`{
  args: {
    default: 'Next'
  },
  render: args => ({
    components: {
      PaginationButton
    },
    setup() {
      return {
        args
      };
    },
    template: '<PaginationButton v-bind="args">{{ args.default }}</PaginationButton>'
  })
}`,...(g=(u=e.parameters)==null?void 0:u.docs)==null?void 0:g.source}}};var l,p,c;n.parameters={...n.parameters,docs:{...(l=n.parameters)==null?void 0:l.docs,source:{originalSource:`{
  args: {
    default: 'Disabled',
    disabled: true
  },
  render: args => ({
    components: {
      PaginationButton
    },
    setup() {
      return {
        args
      };
    },
    template: '<PaginationButton :disabled="args.disabled">{{ args.default }}</PaginationButton>'
  })
}`,...(c=(p=n.parameters)==null?void 0:p.docs)==null?void 0:c.source}}};const f=["Prev","Next","Disabled"];export{n as Disabled,e as Next,a as Prev,f as __namedExportsOrder,B as default};
