import{d as k,a as d,p as S,_ as I,m as g,b as u,r as T,o as a,c,h as D,e as o,F as m,f as _,t as f,l as w,i as L,j as y}from"./index-039d7c0c.js";import{l as b}from"./loadingStore-4de37305.js";const v=k("kitchenStore",{state:()=>({newOrderLists:[],noKitchenDeleteTemp:!0}),actions:{getKitchenOrders(){d.get("https://diriccardo-server.onrender.com/kitchenOrders").then(e=>{this.orderLists=e.data.sort((t,s)=>t.id>s.id),this.newOrderLists=this.changeOrder(this.orderLists)}).catch(e=>console.dir(e))},changeOrder(e){const{allProducts:t}=S();let s=[];return e.forEach(i=>{let r=[];i.orders.forEach(l=>{t.forEach(h=>{h.id===l&&r.push(h)}),i.newOrders=r}),s.push(i)}),s},lineOrder(e,t){document.getElementById(e+"_order_"+t).classList.toggle("delLine")},haveDeleteTemp(){localStorage.getItem("kitchenDeleteTemp")?this.noKitchenDeleteTemp=!1:this.noKitchenDeleteTemp=!0},deleteFromKitchen(e){let t=[];localStorage.getItem("kitchenDeleteTemp")&&(t=JSON.parse(localStorage.getItem("kitchenDeleteTemp"))),t.length>=10&&t.splice(0,1),t.push(e),localStorage.setItem("kitchenDeleteTemp",JSON.stringify(t)),d.delete("https://diriccardo-server.onrender.com/kitchenOrders/"+e.id).catch(s=>console.dir(s))},async undo(){const e=JSON.parse(localStorage.getItem("kitchenDeleteTemp")),t={id:e[e.length-1].id,orders:e[e.length-1].orders,tableId:e[e.length-1].tableId};await d.get("https://diriccardo-server.onrender.com/kitchenOrders").then(s=>{let i=!1;return s.data.forEach(r=>{r.id==t.id&&(i=!0,r.orders.forEach(l=>{t.orders.push(l)}))}),i?d.patch("https://diriccardo-server.onrender.com/kitchenOrders/"+t.id,t).catch(r=>console.dir(r)):d.post("https://diriccardo-server.onrender.com/kitchenOrders",t).catch(r=>console.dir(r))}).catch(s=>console.dir(s)),e.splice(e.length-1,1),localStorage.setItem("kitchenDeleteTemp",JSON.stringify(e)),e.length==0&&localStorage.removeItem("kitchenDeleteTemp")}}});const K={computed:{...g(v,["newOrderLists","noKitchenDeleteTemp"]),...g(b,["isLoading"])},methods:{...u(v,["getKitchenOrders","haveDeleteTemp","lineOrder","deleteFromKitchen","undo"]),...u(b,["loading"])},mounted(){this.loading(),setInterval(()=>{this.getKitchenOrders()},1e3),setInterval(()=>{this.haveDeleteTemp()},500)}},E=e=>(L("data-v-dbe74620"),e=e(),y(),e),N={class:"WaitingMeal mt-5"},C={class:"row wait-meal-scroll px-10"},B={class:"d-flex align-items-end mt-2 mb-4"},F=E(()=>o("h2",{class:"mb-0 me-6"},"廚房進度",-1)),J=["disabled"],M={class:"card rounded-0 bxShadow border-dark"},V={class:"card-header bg-white"},$={class:"card-body position-relative pb-10"},x=["onClick","id"],W=["onClick"];function j(e,t,s,i,r,l){const h=T("VueLoading");return a(),c(m,null,[D(h,{active:e.isLoading,"onUpdate:active":t[0]||(t[0]=n=>e.isLoading=n)},null,8,["active"]),o("div",N,[o("div",C,[o("div",B,[F,o("button",{type:"button",onClick:t[1]||(t[1]=(...n)=>e.undo&&e.undo(...n)),disabled:e.noKitchenDeleteTemp,class:"btn btn-sm btn-outline-danger mb-1 d-flex align-items-center",style:{"font-size":"11px"}}," 復原銷單 ",8,J)]),(a(!0),c(m,null,_(e.newOrderLists,n=>(a(),c("div",{class:"col-3 mb-5",key:n.tableId},[o("div",M,[o("div",V,f(n.tableId),1),o("div",$,[(a(!0),c(m,null,_(n.newOrders,(O,p)=>(a(),c("p",{class:"card-text mb-2 h6",key:p,onClick:()=>e.lineOrder(n.tableId,p),id:n.tableId+"_order_"+p},f(O.name),9,x))),128)),o("a",{href:"#",class:"btn btn-danger addToHistoryBTN",onClick:w(()=>e.deleteFromKitchen(n),["prevent"])},"銷單",8,W)])])]))),128))])])],64)}const H=I(K,[["render",j],["__scopeId","data-v-dbe74620"]]);export{H as default};
