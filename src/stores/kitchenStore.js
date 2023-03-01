import { defineStore } from 'pinia';
import axios from 'axios';
import productStore from './productStore.js';

export default defineStore('kitchenStore', {
    state: () => ({
        newOrderLists: [],
        noKitchenDeleteTemp: true
    }),
    actions: {
        getKitchenOrders() {
            axios.get('http://localhost:3000/kitchenOrders').then(resp => {
                this.orderLists = resp.data.sort((a, b) => {
                    return a.id > b.id;
                });
                this.newOrderLists = this.changeOrder(this.orderLists);
            });
        },
        // 將訂單的明細陣列轉換為有詳細資料的明細陣列
        changeOrder(array) {
            const { allProducts } = productStore();
            let newOrderLists = [];     // 暫存所有訂單
            array.forEach(o => {        // o 為單一一張訂單
                let newOrders = [];     // 暫存轉換的明細
                o.orders.forEach(oid => {
                    allProducts.forEach(p => {
                        if (p.id === oid) {
                            newOrders.push(p)
                        }
                    })
                    o.newOrders = newOrders;
                })
                newOrderLists.push(o);
            })
            return newOrderLists;
        },
        // 點擊 新增/移除 紅線槓掉的效果
        lineOrder(tid, index) {
            const p = document.getElementById(tid + '_order_' + index);
            p.classList.toggle('delLine')
        },
        haveDeleteTemp() {
            if (localStorage.getItem('kitchenDeleteTemp')) {
                this.noKitchenDeleteTemp = false;
            } else {
                this.noKitchenDeleteTemp = true;
            }
        },
        // 刪除廚房的訂單
        deleteFromKitchen(order) {
            let deleteTemp = [];
            // 判斷是否已經有 刪除的暫存
            if (localStorage.getItem('kitchenDeleteTemp')) {
                // 有的話就先取得暫存再加入新的
                deleteTemp = JSON.parse(localStorage.getItem('kitchenDeleteTemp'));
            }
            // 判斷暫存是否大於 10 筆資料
            if (deleteTemp.length >= 10) {
                // 是的話 就移除第一筆 (最舊的那一筆)
                deleteTemp.splice(0, 1);
            }
            // 把即將刪除的 order 加入暫存並上傳到 localStorage
            deleteTemp.push(order);
            localStorage.setItem('kitchenDeleteTemp', JSON.stringify(deleteTemp));

            // 正式從DB刪除
            axios.delete('http://localhost:3000/kitchenOrders/' + order.id).catch(err => console.log(err.response.data.message));
        },
        // 回復上一筆刪除的資料
        async undo() {
            // 取得 localStorage 的暫存資料
            const tempOrders = JSON.parse(localStorage.getItem('kitchenDeleteTemp'));
            // 撈出暫存的最後一筆資料
            const lastestOrder = {
                id: tempOrders[tempOrders.length - 1].id,
                orders: tempOrders[tempOrders.length - 1].orders,
                tableId: tempOrders[tempOrders.length - 1].tableId
            };
            // 先判斷 DB 是否已經有相同ID (可能顧客又有加點)
            await axios.get('http://localhost:3000/kitchenOrders').then(resp => {
                let haveId = false;
                resp.data.forEach(o => {
                    // 若已有ID 則將該ID的餐點加入至 lastestOrder
                    if (o.id == lastestOrder.id) {
                        haveId = true
                        o.orders.forEach(oid => {
                            lastestOrder.orders.push(oid);
                        })
                    }
                })
                // 將最後一筆資料 加回 DB / 修改 DB 中相同 ID 的資料
                if (haveId) {
                    return axios.patch('http://localhost:3000/kitchenOrders/' + lastestOrder.id, lastestOrder).catch(err => console.log(err.response.data.message));
                } else {
                    return axios.post('http://localhost:3000/kitchenOrders', lastestOrder).catch(err => console.log(err.response.data.message));
                }
            }).catch(err => console.log(err.response.data.message));
            // 刪除陣列中最後一筆資料 (被加回去的資料) 並重新暫存到 localStorage
            tempOrders.splice(tempOrders.length - 1, 1);
            localStorage.setItem('kitchenDeleteTemp', JSON.stringify(tempOrders));
            // 如果陣列長度為 0 則刪除 localStorage 使按鈕變成 disabled
            if (tempOrders.length == 0) {
                localStorage.removeItem('kitchenDeleteTemp');
            }
        }
    }
})