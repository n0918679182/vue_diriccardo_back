<template>
    <VueLoading v-model:active="isLoading"></VueLoading>
    <div class="historyOrders mt-5">
        <div class="d-flex justify-content-between align-items-center mt-2 mb-4 px-10">
            <h2 class="mb-0 me-4 mt-2">歷史訂單紀錄</h2>
            <div class="d-flex">
                <button type="button" class="btn btn-outline-secondary mb-0 me-2 d-flex align-items-center"
                    @click="getHistoryOrders">
                    <i class='bx bx-revision'></i>
                </button>
                <button type="button" class="btn btn-outline-danger mb-0" data-bs-toggle="modal"
                    data-bs-target="#sortModal">篩選</button>
            </div>
        </div>
        <div class="history-orders-scroll thinScrollbar px-10">
            <table class="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">單號</th>
                        <th scope="col">日期</th>
                        <th scope="col">金額</th>
                    </tr>
                </thead>
                <tbody>
                    <tr data-bs-toggle="modal" @click="() => getOrder(o)" data-bs-target="#orderDetailModal"
                        v-for="o in allHistoryOrders" :key="o.serial">
                        <td>{{ o.serial }}</td>
                        <td>{{ timeInChinese(o.time) }}</td>
                        <td>$ {{ o.subtotal }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    <OrderDetailModal></OrderDetailModal>
    <SortModal></SortModal>
</template>

<script>
import { mapActions, mapState } from 'pinia';
import historyOrderStore from '../stores/historyOrderStore';
import loadingStore from "../stores/loadingStore";
import OrderDetailModal from '../components/historyOrders/OrderDetailModal.vue';
import SortModal from '../components/historyOrders/SortModal.vue';

export default {
    computed: {
        ...mapState(historyOrderStore, ['allHistoryOrders']),
        ...mapState(loadingStore, ['isLoading'])
    },
    methods: {
        ...mapActions(historyOrderStore, ['getHistoryOrders', 'timeInChinese', 'getOrder']),
        ...mapActions(loadingStore, ['loading'])
    },
    mounted() {
        this.getHistoryOrders();
        this.loading();
    },
    components: {
        OrderDetailModal,
        SortModal
    }
}
</script>

<style lang="scss" scoped>
.history-orders-scroll {
    overflow-y: scroll;
    max-height: 79vh;
}
</style>