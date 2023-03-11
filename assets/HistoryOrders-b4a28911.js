import{d as S,a as x,p as k,m as h,b as _,_ as O,o as n,c,e as t,t as a,F as y,f as I,w as $,q as v,r as f,h as g,i as w,j as H}from"./index-7f7f8b79.js";import{l as D}from"./loadingStore-098cc55d.js";const m=S("historyOrderStore",{state:()=>({allHistoryOrders:[],tempOrder:{},tempOrderItem:[]}),actions:{getHistoryOrders(){x.get("https://diriccardo-server.onrender.com/historyOrders").then(e=>{this.allHistoryOrders=e.data.sort((s,r)=>s.time<r.time)}).catch(e=>console.dir(e))},timeInChinese(e){const s=new Date(e);return`${s.getFullYear()} 年 ${s.getMonth()+1} 月 ${s.getDate()} 日 ${s.getHours()} 時 ${s.getMinutes()} 分`},getOrder(e){const{allProducts:s}=k();this.tempOrder=e;const r=this.tempOrder.orders.reduce((o,l)=>(l in o?o[l]++:o[l]=1,o),{});this.tempOrderItem=[],s.forEach(o=>{Object.keys(r).forEach(l=>{l==o.id&&this.tempOrderItem.push(o)})});for(let o=0;o<this.tempOrderItem.length;o++)this.tempOrderItem[o].count=Object.values(r)[o]},sortOrder(e,s,r){if(e!=""&&s!=""){let o=new Date(e.split("-").join("/")).getTime(),l=new Date(s.split("-").join("/")).getTime();if(o>l)alert("起始日期請勿超過結束日期");else{let p=[];this.allHistoryOrders.forEach(d=>{d.time>=o&&d.time<=l&&p.push(d)}),this.allHistoryOrders=p.sort((d,b)=>d.time<b.time),r.sortModalClose.click()}}else e==""?alert("請選擇起始日期"):alert("請選擇結束日期")}}}),C={computed:{...h(m,["tempOrder","tempOrderItem"])},methods:{..._(m,["timeInChinese"])}},L={class:"modal fade",id:"orderDetailModal",tabindex:"-1","aria-labelledby":"orderDetailModalLabel","aria-hidden":"true"},j={class:"modal-dialog modal-lg modal-dialog-scrollable modal-dialog-centered"},V={class:"modal-content"},B={class:"modal-header align-items-start"},E={class:"d-flex flex-column"},T={class:"mb-3 text-dark h5"},F={class:"mb-3 text-dark h5"},N={class:"m-0 h7"},U=t("button",{type:"button",class:"btn-close","data-bs-dismiss":"modal","aria-label":"Close"},null,-1),q={class:"modal-body thinScrollbar"},A={class:"table"},P=t("thead",null,[t("tr",null,[t("th",{scope:"col"},"品項"),t("th",{scope:"col"},"單價"),t("th",{scope:"col"},"數量"),t("th",{scope:"col"},"小計")])],-1),Y={class:"modal-footer pe-3 d-flex flex-column align-items-end"},z={class:"d-flex justify-content-between me-5",style:{width:"160px"}},G=t("p",{class:"mb-1"},"小計",-1),J={class:"mb-1 h5"},K=t("div",{class:"d-flex justify-content-between me-5",style:{width:"160px"}},[t("p",{class:"mb-1"},"服務費"),t("p",{class:"mb-1"},"10%")],-1),Q={class:"d-flex justify-content-between me-5",style:{width:"160px"}},R=t("p",{class:"mb-1"},"總計",-1),W={class:"mb-1 text-danger h5"};function X(e,s,r,o,l,p){return n(),c("div",L,[t("div",j,[t("div",V,[t("div",B,[t("div",E,[t("p",T,"單號："+a(e.tempOrder.serial),1),t("p",F,"桌號："+a(e.tempOrder.tableId),1),t("p",N,a(e.timeInChinese(e.tempOrder.time)),1)]),U]),t("div",q,[t("table",A,[P,t("tbody",null,[(n(!0),c(y,null,I(e.tempOrderItem,d=>(n(),c("tr",{key:d.id},[t("td",null,a(d.name),1),t("td",null,a(d.price),1),t("td",null,a(d.count),1),t("td",null,a(d.price*d.count),1)]))),128))])])]),t("div",Y,[t("div",z,[G,t("p",J,a(e.tempOrder.subtotal),1)]),K,t("div",Q,[R,t("p",W,"$ "+a(Number.parseInt(e.tempOrder.subtotal+e.tempOrder.subtotal*.1)),1)])])])])])}const Z=O(C,[["render",X]]),tt={data(){return{beginDate:"",stopDate:""}},computed:{...h(m,[""])},methods:{..._(m,["sortOrder"])}},et={class:"modal fade",id:"sortModal",tabindex:"-1","aria-labelledby":"sortModalLabel","aria-hidden":"true","data-bs-backdrop":"static","data-bs-keyboard":"false"},st={class:"modal-dialog modal-dialog-centered"},ot={class:"modal-content"},dt=t("div",{class:"modal-header bg-primary-4 text-white"},[t("h5",{class:"modal-title",id:"sortModalLabel"},"日期篩選")],-1),lt={class:"modal-body"},at={class:"form-floating mb-3"},rt=t("label",{for:"beginDate"},"請輸入起始日期",-1),it={class:"form-floating"},nt=t("label",{for:"endDate"},"請輸入結束日期",-1),ct={class:"modal-footer"},mt={type:"button",class:"btn btn-outline-danger","data-bs-dismiss":"modal",ref:"sortModalClose"};function pt(e,s,r,o,l,p){return n(),c("div",et,[t("div",st,[t("div",ot,[dt,t("div",lt,[t("div",at,[$(t("input",{type:"date",class:"form-control",id:"beginDate",placeholder:"請輸入起始日期","onUpdate:modelValue":s[0]||(s[0]=d=>l.beginDate=d)},null,512),[[v,l.beginDate]]),rt]),t("div",it,[$(t("input",{type:"date",class:"form-control",id:"endDate",placeholder:"請輸入結束日期","onUpdate:modelValue":s[1]||(s[1]=d=>l.stopDate=d)},null,512),[[v,l.stopDate]]),nt])]),t("div",ct,[t("button",mt,"取消",512),t("button",{type:"button",class:"btn btn-danger",onClick:s[2]||(s[2]=()=>e.sortOrder(l.beginDate,l.stopDate,this.$refs))},"篩選")])])])])}const ht=O(tt,[["render",pt]]);const _t={computed:{...h(m,["allHistoryOrders"]),...h(D,["isLoading"])},methods:{..._(m,["getHistoryOrders","timeInChinese","getOrder"]),..._(D,["loading"])},mounted(){this.getHistoryOrders(),this.loading()},components:{OrderDetailModal:Z,SortModal:ht}},u=e=>(w("data-v-7ea9c8f0"),e=e(),H(),e),ut={class:"historyOrders mt-5"},bt={class:"d-flex justify-content-between align-items-center mt-2 mb-4 px-10"},ft=u(()=>t("h2",{class:"mb-0 me-4 mt-2"},"歷史訂單紀錄",-1)),gt={class:"d-flex"},yt=u(()=>t("i",{class:"bx bx-revision"},null,-1)),Ot=[yt],$t=u(()=>t("button",{type:"button",class:"btn btn-outline-danger mb-0","data-bs-toggle":"modal","data-bs-target":"#sortModal"},"篩選",-1)),vt={class:"history-orders-scroll thinScrollbar px-10"},Dt={class:"table table-hover"},It=u(()=>t("thead",null,[t("tr",null,[t("th",{scope:"col"},"單號"),t("th",{scope:"col"},"日期"),t("th",{scope:"col"},"金額")])],-1)),Mt=["onClick"];function St(e,s,r,o,l,p){const d=f("VueLoading"),b=f("OrderDetailModal"),M=f("SortModal");return n(),c(y,null,[g(d,{active:e.isLoading,"onUpdate:active":s[0]||(s[0]=i=>e.isLoading=i)},null,8,["active"]),t("div",ut,[t("div",bt,[ft,t("div",gt,[t("button",{type:"button",class:"btn btn-outline-secondary mb-0 me-2 d-flex align-items-center",onClick:s[1]||(s[1]=(...i)=>e.getHistoryOrders&&e.getHistoryOrders(...i))},Ot),$t])]),t("div",vt,[t("table",Dt,[It,t("tbody",null,[(n(!0),c(y,null,I(e.allHistoryOrders,i=>(n(),c("tr",{"data-bs-toggle":"modal",onClick:()=>e.getOrder(i),"data-bs-target":"#orderDetailModal",key:i.serial},[t("td",null,a(i.serial),1),t("td",null,a(e.timeInChinese(i.time)),1),t("td",null,"$ "+a(i.subtotal),1)],8,Mt))),128))])])])]),g(b),g(M)],64)}const wt=O(_t,[["render",St],["__scopeId","data-v-7ea9c8f0"]]);export{wt as default};
