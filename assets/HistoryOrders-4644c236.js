import{d as I,a as M,p as x,m as u,b as f,_ as g,o as n,c,e as t,t as r,F as b,f as D,w as y,q as O,r as $,h as v,i as k,j as w}from"./index-51c34748.js";const m=I("historyOrderStore",{state:()=>({allHistoryOrders:[],tempOrder:{},tempOrderItem:[]}),actions:{getHistoryOrders(){M.get("https://diriccardo-server.onrender.com/historyOrders").then(e=>{this.allHistoryOrders=e.data.sort((s,a)=>s.time<a.time)}).catch(e=>console.log(e.response.data.message))},timeInChinese(e){const s=new Date(e);return`${s.getFullYear()} 年 ${s.getMonth()+1} 月 ${s.getDate()} 日 ${s.getHours()} 時 ${s.getMinutes()} 分`},getOrder(e){const{allProducts:s}=x();this.tempOrder=e;const a=this.tempOrder.orders.reduce((o,l)=>(l in o?o[l]++:o[l]=1,o),{});this.tempOrderItem=[],s.forEach(o=>{Object.keys(a).forEach(l=>{l==o.id&&this.tempOrderItem.push(o)})});for(let o=0;o<this.tempOrderItem.length;o++)this.tempOrderItem[o].count=Object.values(a)[o]},sortOrder(e,s,a){if(e!=""&&s!=""){let o=new Date(e.split("-").join("/")).getTime(),l=new Date(s.split("-").join("/")).getTime();if(o>l)alert("起始日期請勿超過結束日期");else{let h=[];this.allHistoryOrders.forEach(d=>{d.time>=o&&d.time<=l&&h.push(d)}),this.allHistoryOrders=h.sort((d,_)=>d.time<_.time),a.sortModalClose.click()}}else e==""?alert("請選擇起始日期"):alert("請選擇結束日期")}}}),H={computed:{...u(m,["tempOrder","tempOrderItem"])},methods:{...f(m,["timeInChinese"])}},C={class:"modal fade",id:"orderDetailModal",tabindex:"-1","aria-labelledby":"orderDetailModalLabel","aria-hidden":"true"},S={class:"modal-dialog modal-lg modal-dialog-scrollable modal-dialog-centered"},j={class:"modal-content"},L={class:"modal-header align-items-start"},B={class:"d-flex flex-column"},E={class:"mb-3 text-dark h5"},T={class:"mb-3 text-dark h5"},V={class:"m-0 h7"},F=t("button",{type:"button",class:"btn-close","data-bs-dismiss":"modal","aria-label":"Close"},null,-1),N={class:"modal-body"},U={class:"table"},q=t("thead",null,[t("tr",null,[t("th",{scope:"col"},"品項"),t("th",{scope:"col"},"單價"),t("th",{scope:"col"},"數量"),t("th",{scope:"col"},"小計")])],-1),A={class:"modal-footer pe-3 d-flex flex-column align-items-end"},P={class:"d-flex justify-content-between me-5",style:{width:"160px"}},Y=t("p",{class:"mb-1"},"小計",-1),z={class:"mb-1 h5"},G=t("div",{class:"d-flex justify-content-between me-5",style:{width:"160px"}},[t("p",{class:"mb-1"},"服務費"),t("p",{class:"mb-1"},"10%")],-1),J={class:"d-flex justify-content-between me-5",style:{width:"160px"}},K=t("p",{class:"mb-1"},"總計",-1),Q={class:"mb-1 text-danger h5"};function R(e,s,a,o,l,h){return n(),c("div",C,[t("div",S,[t("div",j,[t("div",L,[t("div",B,[t("p",E,"單號："+r(e.tempOrder.serial),1),t("p",T,"桌號："+r(e.tempOrder.tableId),1),t("p",V,r(e.timeInChinese(e.tempOrder.time)),1)]),F]),t("div",N,[t("table",U,[q,t("tbody",null,[(n(!0),c(b,null,D(e.tempOrderItem,d=>(n(),c("tr",{key:d.id},[t("td",null,r(d.name),1),t("td",null,r(d.price),1),t("td",null,r(d.count),1),t("td",null,r(d.price*d.count),1)]))),128))])])]),t("div",A,[t("div",P,[Y,t("p",z,r(e.tempOrder.subtotal),1)]),G,t("div",J,[K,t("p",Q,"$ "+r(Number.parseInt(e.tempOrder.subtotal+e.tempOrder.subtotal*.1)),1)])])])])])}const W=g(H,[["render",R]]),X={data(){return{beginDate:"",stopDate:""}},computed:{...u(m,[""])},methods:{...f(m,["sortOrder"])}},Z={class:"modal fade",id:"sortModal",tabindex:"-1","aria-labelledby":"sortModalLabel","aria-hidden":"true","data-bs-backdrop":"static","data-bs-keyboard":"false"},tt={class:"modal-dialog modal-dialog-centered"},et={class:"modal-content"},st=t("div",{class:"modal-header bg-primary-4 text-white"},[t("h5",{class:"modal-title",id:"sortModalLabel"},"日期篩選")],-1),ot={class:"modal-body"},dt={class:"form-floating mb-3"},lt=t("label",{for:"beginDate"},"請輸入起始日期",-1),rt={class:"form-floating"},at=t("label",{for:"endDate"},"請輸入結束日期",-1),it={class:"modal-footer"},nt={type:"button",class:"btn btn-outline-danger","data-bs-dismiss":"modal",ref:"sortModalClose"};function ct(e,s,a,o,l,h){return n(),c("div",Z,[t("div",tt,[t("div",et,[st,t("div",ot,[t("div",dt,[y(t("input",{type:"date",class:"form-control",id:"beginDate",placeholder:"請輸入起始日期","onUpdate:modelValue":s[0]||(s[0]=d=>l.beginDate=d)},null,512),[[O,l.beginDate]]),lt]),t("div",rt,[y(t("input",{type:"date",class:"form-control",id:"endDate",placeholder:"請輸入結束日期","onUpdate:modelValue":s[1]||(s[1]=d=>l.stopDate=d)},null,512),[[O,l.stopDate]]),at])]),t("div",it,[t("button",nt,"取消",512),t("button",{type:"button",class:"btn btn-danger",onClick:s[2]||(s[2]=()=>e.sortOrder(l.beginDate,l.stopDate,this.$refs))},"篩選")])])])])}const mt=g(X,[["render",ct]]);const ht={computed:{...u(m,["allHistoryOrders"])},methods:{...f(m,["getHistoryOrders","timeInChinese","getOrder"])},mounted(){this.getHistoryOrders()},components:{OrderDetailModal:W,SortModal:mt}},p=e=>(k("data-v-33790c91"),e=e(),w(),e),pt={class:"historyOrders mt-5"},_t={class:"d-flex justify-content-between align-items-center mt-2 mb-4 px-10"},bt=p(()=>t("h2",{class:"mb-0 me-4 mt-2"},"歷史訂單紀錄",-1)),ut={class:"d-flex"},ft=p(()=>t("i",{class:"bx bx-revision"},null,-1)),gt=[ft],yt=p(()=>t("button",{type:"button",class:"btn btn-outline-danger mb-0","data-bs-toggle":"modal","data-bs-target":"#sortModal"},"篩選",-1)),Ot={class:"history-orders-scroll px-10"},$t={class:"table table-hover"},vt=p(()=>t("thead",null,[t("tr",null,[t("th",{scope:"col"},"單號"),t("th",{scope:"col"},"日期"),t("th",{scope:"col"},"金額")])],-1)),Dt=["onClick"];function It(e,s,a,o,l,h){const d=$("OrderDetailModal"),_=$("SortModal");return n(),c(b,null,[t("div",pt,[t("div",_t,[bt,t("div",ut,[t("button",{type:"button",class:"btn btn-outline-secondary mb-0 me-2 d-flex align-items-center",onClick:s[0]||(s[0]=(...i)=>e.getHistoryOrders&&e.getHistoryOrders(...i))},gt),yt])]),t("div",Ot,[t("table",$t,[vt,t("tbody",null,[(n(!0),c(b,null,D(e.allHistoryOrders,i=>(n(),c("tr",{"data-bs-toggle":"modal",onClick:()=>e.getOrder(i),"data-bs-target":"#orderDetailModal",key:i.serial},[t("td",null,r(i.serial),1),t("td",null,r(e.timeInChinese(i.time)),1),t("td",null,"$ "+r(i.subtotal),1)],8,Dt))),128))])])])]),v(d),v(_)],64)}const xt=g(ht,[["render",It],["__scopeId","data-v-33790c91"]]);export{xt as default};
