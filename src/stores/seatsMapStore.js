import { defineStore } from "pinia";
import axios from "axios";

export default defineStore('seatsMapStore', {
    state: ()=>({
        seatsMap: [],
        tableInfoTemp: {     // 暫存桌位資訊
            "id": 0,
            "tableId": "",
            "customerNum": 0,
        },

    }),
    actions: {
        getSeatMap() {
            axios.get('https://diriccardo-server.onrender.com/tableState').then(resp => {
                this.seatsMap = resp.data;
            }).catch(err => alert(err.response.data.message));
        },
        getTableInfo(table) {
            this.tableInfoTemp = table;
        },
        takeSeat(id, selectPeople) {
            const data = {
                "customerNum": selectPeople,
                "sitTime": new Date().toTimeString().substring(0, 5).split(':').join(' : '),
                "using": 1
            };
            axios.patch('https://diriccardo-server.onrender.com/tableState/' + id, data).then(() => {
                document.getElementById('addCloseBtn').click();
            }).catch(err=>alert(err.response.data.message));
        },
        async cleanTable() {
            // 重置DB tableState 的資訊
            await axios.patch('https://diriccardo-server.onrender.com/tableState/' + this.tableInfoTemp.id, {
                "customerNum": 0,
                "sitTime": "",
                "userNum": 0,
                "state": 0,
                "orderSerial": "",
                "staffId": "",
                "using": 0
            }).catch(err => alert(err.response.data.message));
            this.tableInfoTemp = {};
        }
    }
})