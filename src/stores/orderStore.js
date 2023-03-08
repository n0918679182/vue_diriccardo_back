import {defineStore} from 'pinia';
import axios from 'axios';
import productStore from './productStore';

export default defineStore('orderStore', {
    state: ()=>({
        allOrders: [],       // 所有訂單
        orderDetailTemp: {}, // 暫存訂單資訊
    }),
    actions:{
        getAllOrders() {            
            axios.get('https://diriccardo-server.onrender.com/orderList/').then(resp => {
                this.allOrders = resp.data;
            }).catch(err => alert(err.response.data.message));
        },
        // 顯示顧客已點餐點
        showOrderDetail(tableId) {
            let productsInOrder = [];
            try {
                this.orderDetailTemp = this.allOrders.filter(o => o.tableId === tableId)[0];
                const { allProducts } = productStore();
                // 將訂單中的餐點編號轉成對應的餐點detail
                allProducts.forEach(p => {
                    this.orderDetailTemp.orders.forEach(pid => {
                        if (p.id == pid) {
                            productsInOrder.push(p);
                        }
                    })
                })
                this.orderDetailTemp.newOrders = productsInOrder;
            } catch (error) {
                console.log("error: can't find this.orderDetailTemp", error)
            }

        },
        timeInChinese(time) {
            const t = new Date(time);
            return `${t.getFullYear()} 年 ${t.getMonth() + 1} 月 ${t.getDate()} 日 ${t.getHours()} 時 ${t.getMinutes()} 分`
        },
        async orderListToHistory() {
            await axios.delete('https://diriccardo-server.onrender.com/orderList/' + this.orderDetailTemp.id);
            
            // 重置id 避免新增到歷史訂單時id撞到
            this.orderDetailTemp.id = '';

            await axios.post('https://diriccardo-server.onrender.com/historyOrders', {
                newOrders: this.orderDetailTemp.newOrders,
                orders: this.orderDetailTemp.orders,
                serial: this.orderDetailTemp.serial,
                staffId: this.orderDetailTemp.staffId,
                subtotal: this.orderDetailTemp.subtotal,
                tableId: this.orderDetailTemp.tableId,
                time: this.orderDetailTemp.time,
                user: this.orderDetailTemp.user
            }).catch(err => alert(err.response.data.message));

            this.orderDetailTemp = {};
        }
    }
})