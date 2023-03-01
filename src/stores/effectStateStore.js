import { defineStore } from "pinia";

export default defineStore('effectStateStore', {
    state: ()=>({
        orderInfoEffect: 0,  // 判斷已點餐點按鈕的點擊效果 (InfoModal.vue)
        billBtnEffect: 0,    // 判斷餐點明細結帳按鈕點擊效果 (OrderInfoModal.vue)
    }),
    actions: {
        // 已點餐點按鈕的點擊效果
        changeOrderInfoClickEffect() {
            this.orderInfoEffect == 0 ? this.orderInfoEffect = 1 : this.orderInfoEffect = 0;
        },
        // 餐點明細結帳按鈕點擊效果
        changeBillBtnEffect() {
            this.billBtnEffect == 0 ? this.billBtnEffect = 1 : this.billBtnEffect = 0;
        }
    }
})