import { defineStore } from 'pinia';
import axios from 'axios';
import productStore from './productStore';

export default defineStore('historyOrderStore', {
    state: () => ({
        allHistoryOrders: [],
        tempOrder: {},
        tempOrderItem: [],
    }),
    actions: {
        getHistoryOrders() {
            axios.get('https://diriccardo-server.onrender.com/historyOrders').then(resp => {
                this.allHistoryOrders = resp.data.sort((a, b) => a.time < b.time);
            }).catch(err => console.dir(err))
        },
        timeInChinese(time) {
            const t = new Date(time);
            return `${t.getFullYear()} 年 ${t.getMonth() + 1} 月 ${t.getDate()} 日 ${t.getHours()} 時 ${t.getMinutes()} 分`
        },
        getOrder(order) {
            const { allProducts } = productStore()
            this.tempOrder = order;
            const sortTempOrder = this.tempOrder.orders.reduce((prev, curr) => {
                if (curr in prev) {
                    prev[curr]++;
                }
                else {
                    prev[curr] = 1;
                }
                return prev;
            }, {});
            this.tempOrderItem = []
            allProducts.forEach(o => {
                Object.keys(sortTempOrder).forEach(k => {
                    if (k == o.id) {
                        this.tempOrderItem.push(o);
                    }
                })
            })
            for (let i = 0; i < this.tempOrderItem.length; i++) {
                this.tempOrderItem[i].count = Object.values(sortTempOrder)[i];
            }
        },
        sortOrder(beginDate, stopDate, refs) {
            if (beginDate != '' && stopDate != '') {
                let BD = new Date(beginDate.split('-').join('/')).getTime();
                let SD = new Date(stopDate.split('-').join('/')).getTime()+24*60*60*1000;
                if (BD > SD) {
                    alert('起始日期請勿超過結束日期')
                } else {
                    let tempList = []
                    this.allHistoryOrders.forEach(o => {
                        if (o.time >= BD && o.time <= SD) {
                            tempList.push(o)
                        }
                    })
                    this.allHistoryOrders = tempList.sort((a, b) => a.time < b.time);
                    refs.sortModalClose.click();
                }
            } else {
                beginDate == '' ? alert('請選擇起始日期') : alert('請選擇結束日期');
            }
        },
    }
})