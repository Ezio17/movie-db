import{d as N,b as a,j as g,u,k as p,e as h,i as t}from"./iframe-DCQsDILa.js";const V=(m,c)=>`https://image.tmdb.org/t/p/${m}${c}`,$=""+new URL("not-found-CIGpklIR.webp",import.meta.url).href,E=["src"],F=["src"],z={class:"text-md leading-snug text-secondary font-bold group-hover:text-primary"},K={class:"flex justify-between text-slate-100 mt-auto"},O={key:0},Q={key:1},B=N({__name:"MediaCard",props:{mediaData:{}},emits:["click"],setup(m,{emit:c}){const G=c;return(e,l)=>(t(),a("div",{class:"w-[185px] flex flex-col gap-3 cursor-pointer group",onClick:l[0]||(l[0]=A=>G("click"))},[e.mediaData.poster_path?(t(),a("img",{key:0,src:u(V)("w185",e.mediaData.poster_path),alt:"poster",class:"h-[278px]",loading:"lazy"},null,8,E)):(t(),a("img",{key:1,src:u($),alt:"No image",class:"h-[278px]"},null,8,F)),g("h3",z,p(e.mediaData.name),1),g("div",K,[e.mediaData.vote_average?(t(),a("p",O,p(e.mediaData.vote_average)+" rate",1)):h("",!0),e.mediaData.release_date?(t(),a("p",Q,p(e.mediaData.release_date),1)):h("",!0)])]))}}),H={id:1,name:"The Dark Knight",type:"movie",poster_path:"/qJ2tW6WMUDux911r6m7haRef0WH.jpg",vote_average:9,release_date:"2008-07-18"},R={id:2,name:"Breaking Bad",type:"tv",poster_path:null,vote_average:7.5,release_date:"2008-01-20"},J={id:3,name:"Leonardo DiCaprio",type:"person",poster_path:"/wo2hJpn04vbtmh0B9utCFdsQhxM.jpg",vote_average:8.7,release_date:"1974-11-11"},U={id:4,name:"Minimal Details",type:"movie",poster_path:"/qJ2tW6WMUDux911r6m7haRef0WH.jpg"},q={id:5,name:"This is a Very Long Movie Title That Should Test How the Component Handles Long Text Content",type:"movie",poster_path:"/qJ2tW6WMUDux911r6m7haRef0WH.jpg",vote_average:8.3,release_date:"2024-01-20"},Y={title:"Shared/Components/MediaCard",tags:["autodocs"],component:B,parameters:{layout:"centered",docs:{description:{component:"Компонент медіа-картки, що відображає інформацію про фільми/серіали/персони, включаючи постер, назву, рейтинг та дату виходу."}}},argTypes:{mediaData:{description:"Об'єкт медіа-даних, що містить всю інформацію для відображення",control:{type:"object"}},onClick:{description:"Подія, що випромінюється при натисканні на картку",action:"clicked"}},decorators:[()=>({template:'<div style="padding: 20px; background: #1a1a1a;"><story /></div>'})]},o={args:{mediaData:H},parameters:{docs:{description:{story:"Стандартна картка фільму з усіма заповненими полями даних, включаючи зображення постера, рейтинг та дату виходу."}}}},r={args:{mediaData:R},parameters:{docs:{description:{story:'Картка серіалу, коли зображення постера недоступне - показує резервне зображення "не знайдено".'}}}},s={args:{mediaData:J},parameters:{docs:{description:{story:"Картка персони, що показує інформацію про актора/режисера з їх фото, рейтингом та датою народження."}}}},i={args:{mediaData:U},parameters:{docs:{description:{story:"Медіа-картка з мінімальними даними - показано тільки назву та постер, рейтинг і дата приховані, коли недоступні."}}}},n={args:{mediaData:q},parameters:{docs:{description:{story:"Медіа-картка з дуже довгою назвою для демонстрації поведінки перенесення тексту."}}}},d={render:()=>({components:{MediaCard:B},setup(){return{mediaItems:[H,R,J,U,q]}},template:`
      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(185px, 1fr)); gap: 20px; padding: 20px; background: #1a1a1a; width: 100%">
        <MediaCard
          v-for="item in mediaItems"
          :key="item.id"
          :media-data="item"
          @click="() => console.log('Clicked:', item.name, 'Type:', item.type)"
        />
      </div>
    `}),parameters:{docs:{description:{story:"Кілька медіа-карток різних типів (фільм, серіал, персона), відображених у адаптивному сітковому макеті."}}}};var y,k,v;o.parameters={...o.parameters,docs:{...(y=o.parameters)==null?void 0:y.docs,source:{originalSource:`{
  args: {
    mediaData: mockMovieWithPoster
  },
  parameters: {
    docs: {
      description: {
        story: 'Стандартна картка фільму з усіма заповненими полями даних, включаючи зображення постера, рейтинг та дату виходу.'
      }
    }
  }
}`,...(v=(k=o.parameters)==null?void 0:k.docs)==null?void 0:v.source}}};var D,_,f;r.parameters={...r.parameters,docs:{...(D=r.parameters)==null?void 0:D.docs,source:{originalSource:`{
  args: {
    mediaData: mockTvShowWithoutPoster
  },
  parameters: {
    docs: {
      description: {
        story: 'Картка серіалу, коли зображення постера недоступне - показує резервне зображення "не знайдено".'
      }
    }
  }
}`,...(f=(_=r.parameters)==null?void 0:_.docs)==null?void 0:f.source}}};var x,C,M;s.parameters={...s.parameters,docs:{...(x=s.parameters)==null?void 0:x.docs,source:{originalSource:`{
  args: {
    mediaData: mockPersonWithPoster
  },
  parameters: {
    docs: {
      description: {
        story: 'Картка персони, що показує інформацію про актора/режисера з їх фото, рейтингом та датою народження.'
      }
    }
  }
}`,...(M=(C=s.parameters)==null?void 0:C.docs)==null?void 0:M.source}}};var W,T,P;i.parameters={...i.parameters,docs:{...(W=i.parameters)==null?void 0:W.docs,source:{originalSource:`{
  args: {
    mediaData: mockMinimalDetails
  },
  parameters: {
    docs: {
      description: {
        story: 'Медіа-картка з мінімальними даними - показано тільки назву та постер, рейтинг і дата приховані, коли недоступні.'
      }
    }
  }
}`,...(P=(T=i.parameters)==null?void 0:T.docs)==null?void 0:P.source}}};var w,S,L;n.parameters={...n.parameters,docs:{...(w=n.parameters)==null?void 0:w.docs,source:{originalSource:`{
  args: {
    mediaData: mockLongTitle
  },
  parameters: {
    docs: {
      description: {
        story: 'Медіа-картка з дуже довгою назвою для демонстрації поведінки перенесення тексту.'
      }
    }
  }
}`,...(L=(S=n.parameters)==null?void 0:S.docs)==null?void 0:L.source}}};var b,I,j;d.parameters={...d.parameters,docs:{...(b=d.parameters)==null?void 0:b.docs,source:{originalSource:`{
  render: () => ({
    components: {
      MediaCard
    },
    setup() {
      const mediaItems = [mockMovieWithPoster, mockTvShowWithoutPoster, mockPersonWithPoster, mockMinimalDetails, mockLongTitle];
      return {
        mediaItems
      };
    },
    template: \`
      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(185px, 1fr)); gap: 20px; padding: 20px; background: #1a1a1a; width: 100%">
        <MediaCard
          v-for="item in mediaItems"
          :key="item.id"
          :media-data="item"
          @click="() => console.log('Clicked:', item.name, 'Type:', item.type)"
        />
      </div>
    \`
  }),
  parameters: {
    docs: {
      description: {
        story: 'Кілька медіа-карток різних типів (фільм, серіал, персона), відображених у адаптивному сітковому макеті.'
      }
    }
  }
}`,...(j=(I=d.parameters)==null?void 0:I.docs)==null?void 0:j.source}}};const Z=["Default","TvShowWithoutPoster","PersonCard","MinimalData","LongTitle","GridLayout"];export{o as Default,d as GridLayout,n as LongTitle,i as MinimalData,s as PersonCard,r as TvShowWithoutPoster,Z as __namedExportsOrder,Y as default};
