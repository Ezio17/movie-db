import{r as h,o as ae,a as te,c as A,w as ne,d as re,t as se,b as M,e as N,u as l,f as E,F as ce,g as oe,h as y,i as C,j as F,n as le,k as ie}from"./iframe-DCQsDILa.js";import{_ as G}from"./index.vue_vue_type_script_setup_true_lang-vcXyjJBu.js";function Z(){const e=h(0),a=h(0),c=h(!1),n=h(!1),u=h(!1),r=()=>{e.value=window.innerWidth,a.value=window.innerHeight,c.value=e.value<=768,n.value=e.value>768&&e.value<=1024,u.value=e.value>1024};return ae(()=>{r(),window.addEventListener("resize",r)}),te(()=>{window.removeEventListener("resize",r)}),{width:e,height:a,isMobile:c,isTablet:n,isDesktop:u}}function ue(e,a){const{isMobile:c}=Z(),n=h([]),u=A(()=>a.value===1),r=A(()=>a.value===e.value),g=A(()=>(u.value||r.value)&&!c.value?5:3),k=(t,s=1)=>{const P=[];for(let i=s;i<=t;i+=1)P.push(i);return P},f=()=>{if(c.value)return[];const t=[];let s=a.value+g.value;if(s>e.value)return[];const P=3,i=e.value-s,p=Math.round(i/P);let m=2;for(;m>0&&p>1;){const o=Math.ceil(s+p);if(o>=e.value)break;t.push(o),s=o,m-=1}return t},v=()=>{if(c.value)return[];const t=[];let s=a.value-1;if(r.value&&(s-=g.value),s<=1)return[];const i=Math.round(s/3);let p=1,m=2;for(;m>0&&i>1;){const o=Math.ceil(p+i);if(o>=a.value)break;t.push(o),p=o,m-=1}return t},d=()=>{let t=[];if(g.value>=e.value){t=t.concat(k(e.value)),n.value=t;return}if(u.value){t=t.concat(k(g.value+a.value),f(),e.value),n.value=t;return}if(r.value){const m=e.value-g.value;for(let o=e.value;o>=m;o-=1)t.unshift(o);t.unshift(1,...v()),n.value=t;return}const s=1,P=a.value+g.value,i=e.value-1,p=Math.min(P,i);t=t.concat(s,v(),k(p,a.value),f(),e.value),n.value=t};return ne([a,e,c],()=>{d()},{immediate:!0}),{pagesList:n,isFirstPage:u,isLastPage:r}}const $="data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='utf-8'?%3e%3c!--%20Uploaded%20to:%20SVG%20Repo,%20www.svgrepo.com,%20Generator:%20SVG%20Repo%20Mixer%20Tools%20--%3e%3csvg%20fill='%23000000'%20width='800px'%20height='800px'%20viewBox='0%200%2024%2024'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='m11.293%2017.293%201.414%201.414L19.414%2012l-6.707-6.707-1.414%201.414L15.586%2011H6v2h9.586z'/%3e%3c/svg%3e",ge={key:0,class:"flex gap-2"},de=["src"],ve=["onClick"],Pe=["src"],ee=re({__name:"index",props:{totalPages:{},currentPage:{}},emits:["clickPrev","clickNext","clickPage"],setup(e){const a=e,{totalPages:c,currentPage:n}=se(a),{pagesList:u,isFirstPage:r,isLastPage:g}=ue(c,n),{isMobile:k}=Z();return(f,v)=>l(c)>1?(C(),M("ul",ge,[l(k)?N("",!0):(C(),E(l(G),{key:0,"data-testid":"prev-btn",disabled:l(r),onClick:v[0]||(v[0]=d=>f.$emit("clickPrev"))},{default:y(()=>[F("img",{class:"h-14 rotate-[180deg]",height:"12px",src:l($),alt:"Prev"},null,8,de)]),_:1},8,["disabled"])),(C(!0),M(ce,null,oe(l(u),d=>(C(),M("li",{key:d,class:le(["h-10 md:h-14 w-10 md:w-14 px-[4px] md:px-2 bg-neutral-900 text-neutral-200 rounded-sm font-bold text-xl flex justify-center items-center cursor-pointer",{"text-primary":d===l(n)}]),"data-testid":"middle-btn",onClick:t=>f.$emit("clickPage",d)},ie(d),11,ve))),128)),l(k)?N("",!0):(C(),E(l(G),{key:1,"data-testid":"next-btn",disabled:l(g),onClick:v[1]||(v[1]=d=>f.$emit("clickNext"))},{default:y(()=>[F("img",{class:"h-14",src:l($),alt:"Next"},null,8,Pe)]),_:1},8,["disabled"]))])):N("",!0)}}),he={title:"Pagination/Components/Pagination",component:ee,tags:["autodocs"],argTypes:{totalPages:{control:"number",description:"Кількість сторінок"},currentPage:{control:"number",description:"Номер поточного сторінки"},onClickPrev:{action:"clickPrev"},onClickNext:{action:"clickNext"},onClickPage:{action:"clickPage"}},args:{totalPages:10,currentPage:1}},x={args:{totalPages:20,currentPage:1},render:e=>({components:{Pagination:ee},setup(){const a=h(e.currentPage);return{args:e,currentPage:a,handleClickPrev:()=>{a.value>1&&(a.value-=1)},handleClickNext:()=>{a.value<e.totalPages&&(a.value+=1)},handleClickPage:r=>{a.value=r}}},template:`
      <Pagination 
        :totalPages="args.totalPages" 
        :currentPage="currentPage"
        @clickPrev="handleClickPrev"
        @clickNext="handleClickNext"
        @clickPage="handleClickPage"
      />
    `})},w={args:{totalPages:10,currentPage:1}},S={args:{totalPages:25,currentPage:2}},b={args:{totalPages:100,currentPage:100}},L={args:{totalPages:100,currentPage:99}},_={args:{totalPages:500,currentPage:232}};var B,I,T;x.parameters={...x.parameters,docs:{...(B=x.parameters)==null?void 0:B.docs,source:{originalSource:`{
  args: {
    totalPages: 20,
    currentPage: 1
  },
  render: args => ({
    components: {
      Pagination
    },
    setup() {
      const currentPage = ref(args.currentPage);
      const handleClickPrev = () => {
        if (currentPage.value > 1) {
          currentPage.value -= 1;
        }
      };
      const handleClickNext = () => {
        if (currentPage.value < args.totalPages) {
          currentPage.value += 1;
        }
      };
      const handleClickPage = (page: number) => {
        currentPage.value = page;
      };
      return {
        args,
        currentPage,
        handleClickPrev,
        handleClickNext,
        handleClickPage
      };
    },
    template: \`
      <Pagination 
        :totalPages="args.totalPages" 
        :currentPage="currentPage"
        @clickPrev="handleClickPrev"
        @clickNext="handleClickNext"
        @clickPage="handleClickPage"
      />
    \`
  })
}`,...(T=(I=x.parameters)==null?void 0:I.docs)==null?void 0:T.source}}};var z,R,V;w.parameters={...w.parameters,docs:{...(z=w.parameters)==null?void 0:z.docs,source:{originalSource:`{
  args: {
    totalPages: 10,
    currentPage: 1
  }
}`,...(V=(R=w.parameters)==null?void 0:R.docs)==null?void 0:V.source}}};var j,D,H;S.parameters={...S.parameters,docs:{...(j=S.parameters)==null?void 0:j.docs,source:{originalSource:`{
  args: {
    totalPages: 25,
    currentPage: 2
  }
}`,...(H=(D=S.parameters)==null?void 0:D.docs)==null?void 0:H.source}}};var U,O,W;b.parameters={...b.parameters,docs:{...(U=b.parameters)==null?void 0:U.docs,source:{originalSource:`{
  args: {
    totalPages: 100,
    currentPage: 100
  }
}`,...(W=(O=b.parameters)==null?void 0:O.docs)==null?void 0:W.source}}};var q,J,K;L.parameters={...L.parameters,docs:{...(q=L.parameters)==null?void 0:q.docs,source:{originalSource:`{
  args: {
    totalPages: 100,
    currentPage: 99
  }
}`,...(K=(J=L.parameters)==null?void 0:J.docs)==null?void 0:K.source}}};var Q,X,Y;_.parameters={..._.parameters,docs:{...(Q=_.parameters)==null?void 0:Q.docs,source:{originalSource:`{
  args: {
    totalPages: 500,
    currentPage: 232
  }
}`,...(Y=(X=_.parameters)==null?void 0:X.docs)==null?void 0:Y.source}}};const ke=["Interactive","ActiveFirstPage","ActiveSecondPage","ActiveLastPage","ActiveSecondToLastPage","ActiveMiddlePage"];export{w as ActiveFirstPage,b as ActiveLastPage,_ as ActiveMiddlePage,S as ActiveSecondPage,L as ActiveSecondToLastPage,x as Interactive,ke as __namedExportsOrder,he as default};
