"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[1588],{1042:(e,t,n)=>{n.d(t,{Zo:()=>p,kt:()=>h});var a=n(3249);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},l=Object.keys(e);for(a=0;a<l.length;a++)n=l[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(a=0;a<l.length;a++)n=l[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var u=a.createContext({}),s=function(e){var t=a.useContext(u),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},p=function(e){var t=s(e.components);return a.createElement(u.Provider,{value:t},e.children)},d="mdxType",c={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},m=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,l=e.originalType,u=e.parentName,p=i(e,["components","mdxType","originalType","parentName"]),d=s(n),m=r,h=d["".concat(u,".").concat(m)]||d[m]||c[m]||l;return n?a.createElement(h,o(o({ref:t},p),{},{components:n})):a.createElement(h,o({ref:t},p))}));function h(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var l=n.length,o=new Array(l);o[0]=m;var i={};for(var u in t)hasOwnProperty.call(t,u)&&(i[u]=t[u]);i.originalType=e,i[d]="string"==typeof e?e:r,o[1]=i;for(var s=2;s<l;s++)o[s]=n[s];return a.createElement.apply(null,o)}return a.createElement.apply(null,n)}m.displayName="MDXCreateElement"},5089:(e,t,n)=>{n.d(t,{Z:()=>o});var a=n(3249),r=n(2689);const l={tabItem:"tabItem_o9Hs"};function o(e){let{children:t,hidden:n,className:o}=e;return a.createElement("div",{role:"tabpanel",className:(0,r.Z)(l.tabItem,o),hidden:n},t)}},2327:(e,t,n)=>{n.d(t,{Z:()=>y});var a=n(7396),r=n(3249),l=n(2689),o=n(5986),i=n(6659),u=n(4532),s=n(5821),p=n(3312);function d(e){return function(e){return r.Children.map(e,(e=>{if(!e||(0,r.isValidElement)(e)&&function(e){const{props:t}=e;return!!t&&"object"==typeof t&&"value"in t}(e))return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)}))?.filter(Boolean)??[]}(e).map((e=>{let{props:{value:t,label:n,attributes:a,default:r}}=e;return{value:t,label:n,attributes:a,default:r}}))}function c(e){const{values:t,children:n}=e;return(0,r.useMemo)((()=>{const e=t??d(n);return function(e){const t=(0,s.l)(e,((e,t)=>e.value===t.value));if(t.length>0)throw new Error(`Docusaurus error: Duplicate values "${t.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`)}(e),e}),[t,n])}function m(e){let{value:t,tabValues:n}=e;return n.some((e=>e.value===t))}function h(e){let{queryString:t=!1,groupId:n}=e;const a=(0,i.k6)(),l=function(e){let{queryString:t=!1,groupId:n}=e;if("string"==typeof t)return t;if(!1===t)return null;if(!0===t&&!n)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return n??null}({queryString:t,groupId:n});return[(0,u._X)(l),(0,r.useCallback)((e=>{if(!l)return;const t=new URLSearchParams(a.location.search);t.set(l,e),a.replace({...a.location,search:t.toString()})}),[l,a])]}function f(e){const{defaultValue:t,queryString:n=!1,groupId:a}=e,l=c(e),[o,i]=(0,r.useState)((()=>function(e){let{defaultValue:t,tabValues:n}=e;if(0===n.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(t){if(!m({value:t,tabValues:n}))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${t}" but none of its children has the corresponding value. Available values are: ${n.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);return t}const a=n.find((e=>e.default))??n[0];if(!a)throw new Error("Unexpected error: 0 tabValues");return a.value}({defaultValue:t,tabValues:l}))),[u,s]=h({queryString:n,groupId:a}),[d,f]=function(e){let{groupId:t}=e;const n=function(e){return e?`docusaurus.tab.${e}`:null}(t),[a,l]=(0,p.Nk)(n);return[a,(0,r.useCallback)((e=>{n&&l.set(e)}),[n,l])]}({groupId:a}),g=(()=>{const e=u??d;return m({value:e,tabValues:l})?e:null})();(0,r.useLayoutEffect)((()=>{g&&i(g)}),[g]);return{selectedValue:o,selectValue:(0,r.useCallback)((e=>{if(!m({value:e,tabValues:l}))throw new Error(`Can't select invalid tab value=${e}`);i(e),s(e),f(e)}),[s,f,l]),tabValues:l}}var g=n(3072);const k={tabList:"tabList_Dwv5",tabItem:"tabItem_KiUr"};function N(e){let{className:t,block:n,selectedValue:i,selectValue:u,tabValues:s}=e;const p=[],{blockElementScrollPositionUntilNextRender:d}=(0,o.o5)(),c=e=>{const t=e.currentTarget,n=p.indexOf(t),a=s[n].value;a!==i&&(d(t),u(a))},m=e=>{let t=null;switch(e.key){case"Enter":c(e);break;case"ArrowRight":{const n=p.indexOf(e.currentTarget)+1;t=p[n]??p[0];break}case"ArrowLeft":{const n=p.indexOf(e.currentTarget)-1;t=p[n]??p[p.length-1];break}}t?.focus()};return r.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,l.Z)("tabs",{"tabs--block":n},t)},s.map((e=>{let{value:t,label:n,attributes:o}=e;return r.createElement("li",(0,a.Z)({role:"tab",tabIndex:i===t?0:-1,"aria-selected":i===t,key:t,ref:e=>p.push(e),onKeyDown:m,onClick:c},o,{className:(0,l.Z)("tabs__item",k.tabItem,o?.className,{"tabs__item--active":i===t})}),n??t)})))}function b(e){let{lazy:t,children:n,selectedValue:a}=e;const l=(Array.isArray(n)?n:[n]).filter(Boolean);if(t){const e=l.find((e=>e.props.value===a));return e?(0,r.cloneElement)(e,{className:"margin-top--md"}):null}return r.createElement("div",{className:"margin-top--md"},l.map(((e,t)=>(0,r.cloneElement)(e,{key:t,hidden:e.props.value!==a}))))}function v(e){const t=f(e);return r.createElement("div",{className:(0,l.Z)("tabs-container",k.tabList)},r.createElement(N,(0,a.Z)({},e,t)),r.createElement(b,(0,a.Z)({},e,t)))}function y(e){const t=(0,g.Z)();return r.createElement(v,(0,a.Z)({key:String(t)},e))}},34:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>p,contentTitle:()=>u,default:()=>h,frontMatter:()=>i,metadata:()=>s,toc:()=>d});var a=n(7396),r=(n(3249),n(1042)),l=n(2327),o=n(5089);const i={id:"match",title:"Match Node",sidebar_label:"Match"},u=void 0,s={unversionedId:"node-reference/match",id:"node-reference/match",title:"Match Node",description:"Match Node Screenshot",source:"@site/docs/node-reference/match.mdx",sourceDirName:"node-reference",slug:"/node-reference/match",permalink:"/docs/node-reference/match",draft:!1,editUrl:"https://github.com/ironclad/rivet/tree/main/packages/docs/docs/node-reference/match.mdx",tags:[],version:"current",frontMatter:{id:"match",title:"Match Node",sidebar_label:"Match"},sidebar:"nodeReference",previous:{title:"Loop Controller",permalink:"/docs/node-reference/loop-controller"},next:{title:"Passthrough",permalink:"/docs/node-reference/passthrough"}},p={},d=[{value:"Overview",id:"overview",level:2},{value:"Inputs",id:"inputs",level:2},{value:"Outputs",id:"outputs",level:2},{value:"Editor Settings",id:"editor-settings",level:2},{value:"Example 1: Route control flow based on AI input",id:"example-1-route-control-flow-based-on-ai-input",level:2},{value:"Error Handling",id:"error-handling",level:2},{value:"FAQ",id:"faq",level:2},{value:"See Also",id:"see-also",level:2}],c={toc:d},m="wrapper";function h(e){let{components:t,...i}=e;return(0,r.kt)(m,(0,a.Z)({},c,i,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("p",null,(0,r.kt)("img",{alt:"Match Node Screenshot",src:n(8555).Z,width:"306",height:"218"})),(0,r.kt)("h2",{id:"overview"},"Overview"),(0,r.kt)("p",null,"The Match Node is used to match a string input against a series of regular expressions. Each regular expression corresponds to an output of the node."),(0,r.kt)("p",null,"The node can be configured to either run the ",(0,r.kt)("em",{parentName:"p"},"first")," matching output port, or to run ",(0,r.kt)("em",{parentName:"p"},"all")," matching output ports. If no match is found, the ",(0,r.kt)("inlineCode",{parentName:"p"},"Unmatched")," output port will be executed."),(0,r.kt)("p",null,"This node is useful for routing control flow based on the content of a string. For example, you can use the Match Node to check if a user's message contains certain keywords and route the conversation accordingly."),(0,r.kt)("p",null,"If the ",(0,r.kt)("inlineCode",{parentName:"p"},"Value")," input is provided, it will be passed through the corresponding output port if a match is found. If the ",(0,r.kt)("inlineCode",{parentName:"p"},"Value")," input is not provided, the ",(0,r.kt)("inlineCode",{parentName:"p"},"Test")," input will be passed through the corresponding output port if a match is found."),(0,r.kt)(l.Z,{defaultValue:"inputs",values:[{label:"Inputs",value:"inputs"},{label:"Outputs",value:"outputs"},{label:"Editor Settings",value:"settings"}],mdxType:"Tabs"},(0,r.kt)(o.Z,{value:"inputs",mdxType:"TabItem"},(0,r.kt)("h2",{id:"inputs"},"Inputs"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"Title"),(0,r.kt)("th",{parentName:"tr",align:null},"Data Type"),(0,r.kt)("th",{parentName:"tr",align:null},"Description"),(0,r.kt)("th",{parentName:"tr",align:null},"Default Value"),(0,r.kt)("th",{parentName:"tr",align:null},"Notes"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"Test"),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"string")),(0,r.kt)("td",{parentName:"tr",align:null},"The string to be tested against the regular expressions."),(0,r.kt)("td",{parentName:"tr",align:null},"(required)"),(0,r.kt)("td",{parentName:"tr",align:null},"The input will be coerced into a string if it is not a string.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"Value"),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"any")),(0,r.kt)("td",{parentName:"tr",align:null},"The value to be passed to the output port if a match is found."),(0,r.kt)("td",{parentName:"tr",align:null},"(optional)"),(0,r.kt)("td",{parentName:"tr",align:null},"If not provided, the ",(0,r.kt)("inlineCode",{parentName:"td"},"Test")," input will be used as the value."))))),(0,r.kt)(o.Z,{value:"outputs",mdxType:"TabItem"},(0,r.kt)("h2",{id:"outputs"},"Outputs"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"Title"),(0,r.kt)("th",{parentName:"tr",align:null},"Data Type"),(0,r.kt)("th",{parentName:"tr",align:null},"Description"),(0,r.kt)("th",{parentName:"tr",align:null},"Notes"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"Case ","[i]"),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"any")),(0,r.kt)("td",{parentName:"tr",align:null},"The output port corresponding to the ith regular expression."),(0,r.kt)("td",{parentName:"tr",align:null},"Dynamic number of outputs based on the number of regular expressions configured in the node.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"Unmatched"),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"any")),(0,r.kt)("td",{parentName:"tr",align:null},"The output port that is executed if no match is found for the input string."),(0,r.kt)("td",{parentName:"tr",align:null},"If a match is found for the input string, this output port will not be executed."))))),(0,r.kt)(o.Z,{value:"settings",mdxType:"TabItem"},(0,r.kt)("h2",{id:"editor-settings"},"Editor Settings"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"Setting"),(0,r.kt)("th",{parentName:"tr",align:null},"Description"),(0,r.kt)("th",{parentName:"tr",align:null},"Default Value"),(0,r.kt)("th",{parentName:"tr",align:null},"Use Input Toggle"),(0,r.kt)("th",{parentName:"tr",align:null},"Input Data Type"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"Exclusive"),(0,r.kt)("td",{parentName:"tr",align:null},"If enabled, then the ",(0,r.kt)("em",{parentName:"td"},"first")," matched case will be ran, and all other cases will not be ran. If disabled, then ",(0,r.kt)("em",{parentName:"td"},"all")," matching cases will be ran."),(0,r.kt)("td",{parentName:"tr",align:null},"Off"),(0,r.kt)("td",{parentName:"tr",align:null},"No"),(0,r.kt)("td",{parentName:"tr",align:null},"N/A")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"Cases"),(0,r.kt)("td",{parentName:"tr",align:null},"The list of regular expression cases to match against."),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"YES"),", ",(0,r.kt)("inlineCode",{parentName:"td"},"NO")),(0,r.kt)("td",{parentName:"tr",align:null},"No"),(0,r.kt)("td",{parentName:"tr",align:null},"N/A")))))),(0,r.kt)("h2",{id:"example-1-route-control-flow-based-on-ai-input"},"Example 1: Route control flow based on AI input"),(0,r.kt)("ol",null,(0,r.kt)("li",{parentName:"ol"},"Create a ",(0,r.kt)("a",{parentName:"li",href:"/docs/node-reference/chat"},"Chat Node")," and set the ",(0,r.kt)("inlineCode",{parentName:"li"},"Prompt")," to a question, such as:",(0,r.kt)("blockquote",{parentName:"li"},(0,r.kt)("p",{parentName:"blockquote"},"Would you like to hear about information about cats or dogs first? Please only pick one! I will give you information on both, I just want to know what you'd like to hear first."))),(0,r.kt)("li",{parentName:"ol"},"Create a Match Node and connect the ",(0,r.kt)("inlineCode",{parentName:"li"},"Message")," output of the Chat Node to the ",(0,r.kt)("inlineCode",{parentName:"li"},"Test")," input of the Match Node."),(0,r.kt)("li",{parentName:"ol"},"In the body of the Match Node, set the regular expressions to ",(0,r.kt)("inlineCode",{parentName:"li"},"cats")," and ",(0,r.kt)("inlineCode",{parentName:"li"},"dogs"),"."),(0,r.kt)("li",{parentName:"ol"},"Add three pairs of ",(0,r.kt)("a",{parentName:"li",href:"/docs/node-reference/if"},"If Nodes")," and ",(0,r.kt)("a",{parentName:"li",href:"/docs/node-reference/text"},"Text Nodes"),". Connect the ",(0,r.kt)("inlineCode",{parentName:"li"},"Case 1")," output of the Match Node to the first If Node's ",(0,r.kt)("inlineCode",{parentName:"li"},"If")," input, the ",(0,r.kt)("inlineCode",{parentName:"li"},"Case 2")," output of the Match Node to the second If Node's ",(0,r.kt)("inlineCode",{parentName:"li"},"If")," input, and the ",(0,r.kt)("inlineCode",{parentName:"li"},"Unmatched")," output of the Match Node to the third If Node's ",(0,r.kt)("inlineCode",{parentName:"li"},"If")," input. Connect the text nodes to the If Nodes' ",(0,r.kt)("inlineCode",{parentName:"li"},"Value")," inputs."),(0,r.kt)("li",{parentName:"ol"},'The text of the three Text Nodes should be "You chose cats!", "You chose dogs!", and "Sorry, I didn\'t understand that. Please try again.", respectively.'),(0,r.kt)("li",{parentName:"ol"},"Run the graph. Depending on the AI's response, the corresponding If Node will be executed, with the text the AI selected")),(0,r.kt)("p",null,(0,r.kt)("img",{alt:"Match Node Example 1",src:n(7180).Z,width:"1548",height:"783"})),(0,r.kt)("h2",{id:"error-handling"},"Error Handling"),(0,r.kt)("p",null,"The Match Node will error if the ",(0,r.kt)("inlineCode",{parentName:"p"},"Test")," input is not provided. If no match is found for the input string, the ",(0,r.kt)("inlineCode",{parentName:"p"},"Unmatched")," output port will be executed."),(0,r.kt)("h2",{id:"faq"},"FAQ"),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"Q: Can multiple cases match at once?")),(0,r.kt)("p",null,"A: Yes, multiple cases can match at once. If multiple cases match, all of the corresponding output ports will be executed. This may become a toggleable option in the future, so that only the first matching case will be executed."),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"Q: Can I use the Match Node to match against numbers?")),(0,r.kt)("p",null,"A: Yes, you can use the Match Node to match against numbers. However, the ",(0,r.kt)("inlineCode",{parentName:"p"},"Test")," input will be coerced into a string for the matching."),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"Q: Can I use the Match Node to match against a list of strings?")),(0,r.kt)("p",null,"A: Yes, you can use the Match Node to match against a list of strings. However, the ",(0,r.kt)("inlineCode",{parentName:"p"},"Test")," input will be coerced into a string for the matching. The default coercion will put each string on its own line for testing against."),(0,r.kt)("h2",{id:"see-also"},"See Also"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"/docs/node-reference/if"},"If Node")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"/docs/node-reference/if-else"},"If/Else Node")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"/docs/node-reference/loop-controller"},"Loop Controller Node")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"/docs/node-reference/coalesce"},"Coalesce Node")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"/docs/user-guide/control-flow"},"Control Flow"))))}h.isMDXComponent=!0},7180:(e,t,n)=>{n.d(t,{Z:()=>a});const a=n.p+"assets/images/match-node-example-01-65b1ef87f8b37390bcf30b3337bddd83.png"},8555:(e,t,n)=>{n.d(t,{Z:()=>a});const a=n.p+"assets/images/match-node-2b9288e4879c291b6a328b9a96934801.png"}}]);