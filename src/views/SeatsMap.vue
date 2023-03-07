<template>
    <VueLoading v-model:active="isLoading"></VueLoading>
    <div class="seats mt-5 py40 pe-12">
        <div class="container w-50">
            <div class="row">
                <div class="col-2 px-1 mb-2" v-for="item in seatsMap" :key="item.id">
                    <div v-if="item.tableId == 'path'" style="height:20px;"></div>
                    <div class="rounded-3 tablesize" :class="{
                        'bg-primary-1': item.customerNum > 0 && item.colorCode == 1,
                        'bg-primary-2': item.customerNum > 0 && item.colorCode == 2,
                        'bg-primary-3': item.customerNum > 0 && item.colorCode == 3,
                        'bg-primary-4': item.customerNum > 0 && item.colorCode == 4,
                    }" v-else>
                        <span class="material-icons-outlined h2  exclamationMark" v-if="item.state > 0">
                            priority_high
                        </span>
                        <p class="text-white mt-1 mx-2 mb-0">{{ item.tableId }}</p>
                        <span class="material-icons-outlined text-white w-100 text-center py-3" role="button"
                            v-if="item.customerNum == 0" data-bs-toggle="modal" data-bs-target="#tableAddModal"
                            @click="() => getTableInfo(item)">
                            add
                        </span>
                        <p class="text-white m-0 w-100 text-center pt-1" v-else data-bs-toggle="modal" role="button"
                            data-bs-target="#tableInfoModal" @click="() => getTableInfo(item)">
                            <span class="h1 fw-bold">{{ item.customerNum }}</span>
                            位
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <AddModal></AddModal>
    <InfoModal></InfoModal>
</template>

<script>
import { mapState, mapActions } from "pinia";
import seatsMapStore from '../stores/seatsMapStore.js';
import orderStore from "../stores/orderStore";
import loadingStore from "../stores/loadingStore";
import AddModal from '../components/seatMap/AddModal.vue';
import InfoModal from "../components/seatMap/InfoModal.vue";

export default {
    data() {
        return {
            tableInfoTemp: {     // 暫存桌位資訊
                "id": 0,
                "tableId": "",
                "customerNum": 0,
            },
        }
    },
    computed: {
        ...mapState(seatsMapStore, ['seatsMap']),
        ...mapState(loadingStore, ['isLoading'])
    },
    methods: {
        ...mapActions(seatsMapStore, ['getSeatMap', 'getTableInfo']),
        ...mapActions(orderStore, ['getAllOrders']),
        ...mapActions(loadingStore, ['loading'])
    },
    mounted() {
        this.loading();
        setInterval(() => {
            this.getSeatMap();
            this.getAllOrders();
        }, 1000);
    },
    components: {
        AddModal,
        InfoModal,
    }
}
</script>

<style lang="scss" scoped>
.tablesize {
    height: 90px;
    position: relative;
    box-shadow: 2px -3px 2px 1px rgba(0, 0, 0, 0.2);
    background: #4b4b4b;
}

.exclamationMark {
    position: absolute;
    right: 0;
    top: -16px;
    color: rgb(255, 214, 191);
}
</style>