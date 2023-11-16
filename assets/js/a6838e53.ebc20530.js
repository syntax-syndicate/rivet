"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[3887],{1042:(e,t,n)=>{n.d(t,{Zo:()=>p,kt:()=>h});var r=n(3249);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},l=Object.keys(e);for(r=0;r<l.length;r++)n=l[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(r=0;r<l.length;r++)n=l[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var u=r.createContext({}),s=function(e){var t=r.useContext(u),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},p=function(e){var t=s(e.components);return r.createElement(u.Provider,{value:t},e.children)},d="mdxType",c={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},m=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,l=e.originalType,u=e.parentName,p=i(e,["components","mdxType","originalType","parentName"]),d=s(n),m=a,h=d["".concat(u,".").concat(m)]||d[m]||c[m]||l;return n?r.createElement(h,o(o({ref:t},p),{},{components:n})):r.createElement(h,o({ref:t},p))}));function h(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var l=n.length,o=new Array(l);o[0]=m;var i={};for(var u in t)hasOwnProperty.call(t,u)&&(i[u]=t[u]);i.originalType=e,i[d]="string"==typeof e?e:a,o[1]=i;for(var s=2;s<l;s++)o[s]=n[s];return r.createElement.apply(null,o)}return r.createElement.apply(null,n)}m.displayName="MDXCreateElement"},5089:(e,t,n)=>{n.d(t,{Z:()=>o});var r=n(3249),a=n(2689);const l={tabItem:"tabItem_o9Hs"};function o(e){let{children:t,hidden:n,className:o}=e;return r.createElement("div",{role:"tabpanel",className:(0,a.Z)(l.tabItem,o),hidden:n},t)}},2327:(e,t,n)=>{n.d(t,{Z:()=>y});var r=n(7396),a=n(3249),l=n(2689),o=n(5986),i=n(6659),u=n(4532),s=n(5821),p=n(3312);function d(e){return function(e){return a.Children.map(e,(e=>{if(!e||(0,a.isValidElement)(e)&&function(e){const{props:t}=e;return!!t&&"object"==typeof t&&"value"in t}(e))return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)}))?.filter(Boolean)??[]}(e).map((e=>{let{props:{value:t,label:n,attributes:r,default:a}}=e;return{value:t,label:n,attributes:r,default:a}}))}function c(e){const{values:t,children:n}=e;return(0,a.useMemo)((()=>{const e=t??d(n);return function(e){const t=(0,s.l)(e,((e,t)=>e.value===t.value));if(t.length>0)throw new Error(`Docusaurus error: Duplicate values "${t.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`)}(e),e}),[t,n])}function m(e){let{value:t,tabValues:n}=e;return n.some((e=>e.value===t))}function h(e){let{queryString:t=!1,groupId:n}=e;const r=(0,i.k6)(),l=function(e){let{queryString:t=!1,groupId:n}=e;if("string"==typeof t)return t;if(!1===t)return null;if(!0===t&&!n)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return n??null}({queryString:t,groupId:n});return[(0,u._X)(l),(0,a.useCallback)((e=>{if(!l)return;const t=new URLSearchParams(r.location.search);t.set(l,e),r.replace({...r.location,search:t.toString()})}),[l,r])]}function f(e){const{defaultValue:t,queryString:n=!1,groupId:r}=e,l=c(e),[o,i]=(0,a.useState)((()=>function(e){let{defaultValue:t,tabValues:n}=e;if(0===n.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(t){if(!m({value:t,tabValues:n}))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${t}" but none of its children has the corresponding value. Available values are: ${n.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);return t}const r=n.find((e=>e.default))??n[0];if(!r)throw new Error("Unexpected error: 0 tabValues");return r.value}({defaultValue:t,tabValues:l}))),[u,s]=h({queryString:n,groupId:r}),[d,f]=function(e){let{groupId:t}=e;const n=function(e){return e?`docusaurus.tab.${e}`:null}(t),[r,l]=(0,p.Nk)(n);return[r,(0,a.useCallback)((e=>{n&&l.set(e)}),[n,l])]}({groupId:r}),g=(()=>{const e=u??d;return m({value:e,tabValues:l})?e:null})();(0,a.useLayoutEffect)((()=>{g&&i(g)}),[g]);return{selectedValue:o,selectValue:(0,a.useCallback)((e=>{if(!m({value:e,tabValues:l}))throw new Error(`Can't select invalid tab value=${e}`);i(e),s(e),f(e)}),[s,f,l]),tabValues:l}}var g=n(3072);const b={tabList:"tabList_Dwv5",tabItem:"tabItem_KiUr"};function k(e){let{className:t,block:n,selectedValue:i,selectValue:u,tabValues:s}=e;const p=[],{blockElementScrollPositionUntilNextRender:d}=(0,o.o5)(),c=e=>{const t=e.currentTarget,n=p.indexOf(t),r=s[n].value;r!==i&&(d(t),u(r))},m=e=>{let t=null;switch(e.key){case"Enter":c(e);break;case"ArrowRight":{const n=p.indexOf(e.currentTarget)+1;t=p[n]??p[0];break}case"ArrowLeft":{const n=p.indexOf(e.currentTarget)-1;t=p[n]??p[p.length-1];break}}t?.focus()};return a.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,l.Z)("tabs",{"tabs--block":n},t)},s.map((e=>{let{value:t,label:n,attributes:o}=e;return a.createElement("li",(0,r.Z)({role:"tab",tabIndex:i===t?0:-1,"aria-selected":i===t,key:t,ref:e=>p.push(e),onKeyDown:m,onClick:c},o,{className:(0,l.Z)("tabs__item",b.tabItem,o?.className,{"tabs__item--active":i===t})}),n??t)})))}function N(e){let{lazy:t,children:n,selectedValue:r}=e;const l=(Array.isArray(n)?n:[n]).filter(Boolean);if(t){const e=l.find((e=>e.props.value===r));return e?(0,a.cloneElement)(e,{className:"margin-top--md"}):null}return a.createElement("div",{className:"margin-top--md"},l.map(((e,t)=>(0,a.cloneElement)(e,{key:t,hidden:e.props.value!==r}))))}function v(e){const t=f(e);return a.createElement("div",{className:(0,l.Z)("tabs-container",b.tabList)},a.createElement(k,(0,r.Z)({},e,t)),a.createElement(N,(0,r.Z)({},e,t)))}function y(e){const t=(0,g.Z)();return a.createElement(v,(0,r.Z)({key:String(t)},e))}},4109:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>p,contentTitle:()=>u,default:()=>h,frontMatter:()=>i,metadata:()=>s,toc:()=>d});var r=n(7396),a=(n(3249),n(1042)),l=n(2327),o=n(5089);const i={id:"user-input",title:"User Input Node",sidebar_label:"User Input"},u=void 0,s={unversionedId:"node-reference/user-input",id:"node-reference/user-input",title:"User Input Node",description:"User Input Node Screenshot",source:"@site/docs/node-reference/user-input.mdx",sourceDirName:"node-reference",slug:"/node-reference/user-input",permalink:"/docs/node-reference/user-input",draft:!1,editUrl:"https://github.com/ironclad/rivet/tree/main/packages/docs/docs/node-reference/user-input.mdx",tags:[],version:"current",frontMatter:{id:"user-input",title:"User Input Node",sidebar_label:"User Input"},sidebar:"nodeReference",previous:{title:"Replace Dataset",permalink:"/docs/node-reference/replace-dataset"},next:{title:"Vector Store",permalink:"/docs/node-reference/vector-store"}},p={},d=[{value:"Overview",id:"overview",level:2},{value:"Inputs",id:"inputs",level:2},{value:"Outputs",id:"outputs",level:2},{value:"Editor Settings",id:"editor-settings",level:2},{value:"Example 1: Using a static prompt",id:"example-1-using-a-static-prompt",level:2},{value:"Example 2: Using dynamic prompts",id:"example-2-using-dynamic-prompts",level:2},{value:"Error Handling",id:"error-handling",level:2},{value:"FAQ",id:"faq",level:2},{value:"See Also",id:"see-also",level:2}],c={toc:d},m="wrapper";function h(e){let{components:t,...i}=e;return(0,a.kt)(m,(0,r.Z)({},c,i,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("p",null,(0,a.kt)("img",{alt:"User Input Node Screenshot",src:n(4195).Z,width:"786",height:"486"})),(0,a.kt)("h2",{id:"overview"},"Overview"),(0,a.kt)("p",null,"The User Input Node is designed to prompt the user for input during the execution of the graph. The user's response becomes the output of this node. This node is particularly useful in interactive scenarios where user input is required to proceed with the graph execution."),(0,a.kt)("p",null,"The User Input Node can either use a static prompt defined in the node settings or dynamic prompts provided via the node's input."),(0,a.kt)(l.Z,{defaultValue:"inputs",values:[{label:"Inputs",value:"inputs"},{label:"Outputs",value:"outputs"},{label:"Editor Settings",value:"settings"}],mdxType:"Tabs"},(0,a.kt)(o.Z,{value:"inputs",mdxType:"TabItem"},(0,a.kt)("h2",{id:"inputs"},"Inputs"),(0,a.kt)("table",null,(0,a.kt)("thead",{parentName:"table"},(0,a.kt)("tr",{parentName:"thead"},(0,a.kt)("th",{parentName:"tr",align:null},"Title"),(0,a.kt)("th",{parentName:"tr",align:null},"Data Type"),(0,a.kt)("th",{parentName:"tr",align:null},"Description"),(0,a.kt)("th",{parentName:"tr",align:null},"Default Value"),(0,a.kt)("th",{parentName:"tr",align:null},"Notes"))),(0,a.kt)("tbody",{parentName:"table"},(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"Questions"),(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("inlineCode",{parentName:"td"},"string[]")),(0,a.kt)("td",{parentName:"tr",align:null},"An array of questions to prompt the user."),(0,a.kt)("td",{parentName:"tr",align:null},"N/A"),(0,a.kt)("td",{parentName:"tr",align:null},'This input is only available when the "Use Input" toggle is enabled in the node settings.'))))),(0,a.kt)(o.Z,{value:"outputs",mdxType:"TabItem"},(0,a.kt)("h2",{id:"outputs"},"Outputs"),(0,a.kt)("table",null,(0,a.kt)("thead",{parentName:"table"},(0,a.kt)("tr",{parentName:"thead"},(0,a.kt)("th",{parentName:"tr",align:null},"Title"),(0,a.kt)("th",{parentName:"tr",align:null},"Data Type"),(0,a.kt)("th",{parentName:"tr",align:null},"Description"),(0,a.kt)("th",{parentName:"tr",align:null},"Notes"))),(0,a.kt)("tbody",{parentName:"table"},(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"Answers Only"),(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("inlineCode",{parentName:"td"},"string[]")),(0,a.kt)("td",{parentName:"tr",align:null},"An array containing the user's answers to the prompted questions."),(0,a.kt)("td",{parentName:"tr",align:null})),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"Q & A"),(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("inlineCode",{parentName:"td"},"string[]")),(0,a.kt)("td",{parentName:"tr",align:null},'An array containing the questions and answers formatted as "Question\\nAnswer".'),(0,a.kt)("td",{parentName:"tr",align:null}))))),(0,a.kt)(o.Z,{value:"settings",mdxType:"TabItem"},(0,a.kt)("h2",{id:"editor-settings"},"Editor Settings"),(0,a.kt)("table",null,(0,a.kt)("thead",{parentName:"table"},(0,a.kt)("tr",{parentName:"thead"},(0,a.kt)("th",{parentName:"tr",align:null},"Setting"),(0,a.kt)("th",{parentName:"tr",align:null},"Description"),(0,a.kt)("th",{parentName:"tr",align:null},"Default Value"),(0,a.kt)("th",{parentName:"tr",align:null},"Use Input Toggle"),(0,a.kt)("th",{parentName:"tr",align:null},"Input Data Type"))),(0,a.kt)("tbody",{parentName:"table"},(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"Prompt"),(0,a.kt)("td",{parentName:"tr",align:null},"The question to prompt the user."),(0,a.kt)("td",{parentName:"tr",align:null},"(required)"),(0,a.kt)("td",{parentName:"tr",align:null},"Yes"),(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("inlineCode",{parentName:"td"},"string"))))))),(0,a.kt)("h2",{id:"example-1-using-a-static-prompt"},"Example 1: Using a static prompt"),(0,a.kt)("ol",null,(0,a.kt)("li",{parentName:"ol"},"Create a User Input Node."),(0,a.kt)("li",{parentName:"ol"},'In the node settings, set the "Prompt" to "What is your name?".'),(0,a.kt)("li",{parentName:"ol"},"Run the graph. The graph execution will pause and prompt you for input."),(0,a.kt)("li",{parentName:"ol"},'Enter your name and press "Submit". The graph execution will resume and the output of the User Input Node will be the name you entered.')),(0,a.kt)("p",null,(0,a.kt)("img",{alt:"User Input Node Example 1",src:n(1438).Z,width:"1806",height:"904"})),(0,a.kt)("h2",{id:"example-2-using-dynamic-prompts"},"Example 2: Using dynamic prompts"),(0,a.kt)("ol",null,(0,a.kt)("li",{parentName:"ol"},"Create a User Input Node."),(0,a.kt)("li",{parentName:"ol"},'In the node settings, enable the "Use Input" toggle.'),(0,a.kt)("li",{parentName:"ol"},"Create an ",(0,a.kt)("a",{parentName:"li",href:"/docs/node-reference/array"},"Array Node")," and connect 2 ",(0,a.kt)("a",{parentName:"li",href:"/docs/node-reference/text"},"Text Nodes")," to it."),(0,a.kt)("li",{parentName:"ol"},'Add the text "What is your name?" to the first Text Node and "What is your favorite color?" to the second Text Node.'),(0,a.kt)("li",{parentName:"ol"},'Connect the Array Node to the "Questions" input of the User Input Node.'),(0,a.kt)("li",{parentName:"ol"},"Run the graph. The graph execution will pause and prompt you for input."),(0,a.kt)("li",{parentName:"ol"},'Enter your answers and press "Submit". The graph execution will resume and the output of the User Input Node will be an array containing your answers.')),(0,a.kt)("p",null,(0,a.kt)("img",{alt:"User Input Node Example 2",src:n(2444).Z,width:"2876",height:"900"})),(0,a.kt)("h2",{id:"error-handling"},"Error Handling"),(0,a.kt)("p",null,"The User Input Node does not have any error handling behavior. If the node is executed, it will always pause the graph execution and prompt the user for input."),(0,a.kt)("h2",{id:"faq"},"FAQ"),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"Q: Can I use the User Input Node to prompt the user for multiple inputs at once?")),(0,a.kt)("p",null,'A: Yes, you can do this by connecting an Array Node to the "Questions" input of the User Input Node. Each item in the array will be a separate question that the user is prompted for.'),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"Q: What happens if the user does not provide any input?")),(0,a.kt)("p",null,'A: If the user does not provide any input and presses "Submit", the output of the User Input Node will be an empty string.'),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"Q: Can I use the User Input Node to prompt the user for a password or other sensitive information?")),(0,a.kt)("p",null,"A: No, the User Input Node does not currently support masking the user's input. All input provided by the user will be visible in the graph execution log."),(0,a.kt)("h2",{id:"see-also"},"See Also"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"/docs/node-reference/array"},"Array Node")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"/docs/node-reference/text"},"Text Node")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"/docs/node-reference/split-text"},"Split Node")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"/docs/node-reference/join"},"Join Node"))))}h.isMDXComponent=!0},1438:(e,t,n)=>{n.d(t,{Z:()=>r});const r=n.p+"assets/images/user-input-node-example-01-a4a63ab63122b1a525185a29e1e24242.png"},2444:(e,t,n)=>{n.d(t,{Z:()=>r});const r=n.p+"assets/images/user-input-node-example-02-8639a0848492a3b087c9fe3bda5335ce.png"},4195:(e,t,n)=>{n.d(t,{Z:()=>r});const r=n.p+"assets/images/user-input-node-f903ec6717a07cb2ff412223d7a7086f.png"}}]);