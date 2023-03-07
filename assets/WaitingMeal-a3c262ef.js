import{d as k,a as i,p as S,_ as I,m as g,b as u,r as T,o as d,c as l,h as D,e as n,F as m,f as _,t as f,l as w,i as L,j as y}from"./index-6377646c.js";import{l as b}from"./loadingStore-cc077820.js";const v=k("kitchenStore",{state:()=>({newOrderLists:[],noKitchenDeleteTemp:!0}),actions:{getKitchenOrders(){i.get("https://diriccardo-server.onrender.com/kitchenOrders").then(e=>{this.orderLists=e.data.sort((t,s)=>t.id>s.id),this.newOrderLists=this.changeOrder(this.orderLists)})},changeOrder(e){const{allProducts:t}=S();let s=[];return e.forEach(a=>{let r=[];a.orders.forEach(c=>{t.forEach(h=>{h.id===c&&r.push(h)}),a.newOrders=r}),s.push(a)}),s},lineOrder(e,t){document.getElementById(e+"_order_"+t).classList.toggle("delLine")},haveDeleteTemp(){localStorage.getItem("kitchenDeleteTemp")?this.noKitchenDeleteTemp=!1:this.noKitchenDeleteTemp=!0},deleteFromKitchen(e){let t=[];localStorage.getItem("kitchenDeleteTemp")&&(t=JSON.parse(localStorage.getItem("kitchenDeleteTemp"))),t.length>=10&&t.splice(0,1),t.push(e),localStorage.setItem("kitchenDeleteTemp",JSON.stringify(t)),i.delete("https://diriccardo-server.onrender.com/kitchenOrders/"+e.id).catch(s=>console.log(s.response.data.message))},async undo(){const e=JSON.parse(localStorage.getItem("kitchenDeleteTemp")),t={id:e[e.length-1].id,orders:e[e.length-1].orders,tableId:e[e.length-1].tableId};await i.get("https://diriccardo-server.onrender.com/kitchenOrders").then(s=>{let a=!1;return s.data.forEach(r=>{r.id==t.id&&(a=!0,r.orders.forEach(c=>{t.orders.push(c)}))}),a?i.patch("https://diriccardo-server.onrender.com/kitchenOrders/"+t.id,t).catch(r=>console.log(r.response.data.message)):i.post("https://diriccardo-server.onrender.com/kitchenOrders",t).catch(r=>console.log(r.response.data.message))}).catch(s=>console.log(s.response.data.message)),e.splice(e.length-1,1),localStorage.setItem("kitchenDeleteTemp",JSON.stringify(e)),e.length==0&&localStorage.removeItem("kitchenDeleteTemp")}}});const K={computed:{...g(v,["newOrderLists","noKitchenDeleteTemp"]),...g(b,["isLoading"])},methods:{...u(v,["getKitchenOrders","haveDeleteTemp","lineOrder","deleteFromKitchen","undo"]),...u(b,["loading"])},mounted(){this.loading(),setInterval(()=>{this.getKitchenOrders()},1e3),setInterval(()=>{this.haveDeleteTemp()},500)}},E=e=>(L("data-v-dbe74620"),e=e(),y(),e),N={class:"WaitingMeal mt-5"},C={class:"row wait-meal-scroll px-10"},B={class:"d-flex align-items-end mt-2 mb-4"},F=E(()=>n("h2",{class:"mb-0 me-6"},"廚房進度",-1)),J=["disabled"],M={class:"card rounded-0 bxShadow border-dark"},V={class:"card-header bg-white"},$={class:"card-body position-relative pb-10"},x=["onClick","id"],W=["onClick"];function j(e,t,s,a,r,c){const h=T("VueLoading");return d(),l(m,null,[D(h,{active:e.isLoading,"onUpdate:active":t[0]||(t[0]=o=>e.isLoading=o)},null,8,["active"]),n("div",N,[n("div",C,[n("div",B,[F,n("button",{type:"button",onClick:t[1]||(t[1]=(...o)=>e.undo&&e.undo(...o)),disabled:e.noKitchenDeleteTemp,class:"btn btn-sm btn-outline-danger mb-1 d-flex align-items-center",style:{"font-size":"11px"}}," 復原銷單 ",8,J)]),(d(!0),l(m,null,_(e.newOrderLists,o=>(d(),l("div",{class:"col-3 mb-5",key:o.tableId},[n("div",M,[n("div",V,f(o.tableId),1),n("div",$,[(d(!0),l(m,null,_(o.newOrders,(O,p)=>(d(),l("p",{class:"card-text mb-2 h6",key:p,onClick:()=>e.lineOrder(o.tableId,p),id:o.tableId+"_order_"+p},f(O.name),9,x))),128)),n("a",{href:"#",class:"btn btn-danger addToHistoryBTN",onClick:w(()=>e.deleteFromKitchen(o),["prevent"])},"銷單",8,W)])])]))),128))])])],64)}const H=I(K,[["render",j],["__scopeId","data-v-dbe74620"]]);export{H as default};
