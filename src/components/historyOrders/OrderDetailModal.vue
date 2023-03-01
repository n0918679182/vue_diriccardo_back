<template>
    <!-- 詳細訂單 Modal -->
    <div class="modal fade" id="orderDetailModal" tabindex="-1" aria-labelledby="orderDetailModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-scrollable modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header align-items-start">
                    <div class="d-flex flex-column">
                        <p class="mb-3 text-dark h5">單號：{{ tempOrder.serial }}</p>
                        <p class="mb-3 text-dark h5">桌號：{{ tempOrder.tableId }}</p>
                        <p class="m-0 h7">{{ timeInChinese(tempOrder.time) }}</p>
                    </div>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">品項</th>
                                <th scope="col">單價</th>
                                <th scope="col">數量</th>
                                <th scope="col">小計</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="o in tempOrderItem" :key="o.id">
                                <td>{{ o.name }}</td>
                                <td>{{ o.price }}</td>
                                <td>{{ o.count }}</td>
                                <td>{{ o.price * o.count }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="modal-footer pe-3 d-flex flex-column align-items-end">

                    <div class="d-flex justify-content-between me-5" style="width: 160px;">
                        <p class="mb-1">小計</p>
                        <p class="mb-1 h5">{{ tempOrder.subtotal }}</p>
                    </div>
                    <div class="d-flex justify-content-between me-5" style="width: 160px;">
                        <p class="mb-1">服務費</p>
                        <p class="mb-1">10%</p>
                    </div>
                    <div class="d-flex justify-content-between me-5" style="width: 160px;">
                        <p class="mb-1">總計</p>
                        <p class="mb-1 text-danger h5">$ {{ Number.parseInt(tempOrder.subtotal + (tempOrder.subtotal * 0.1)) }}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from 'pinia';
import historyOrderStore from '../../stores/historyOrderStore';

export default {
    computed: {
        ...mapState(historyOrderStore, ['tempOrder', 'tempOrderItem'])
    },
    methods: {
        ...mapActions(historyOrderStore, ['timeInChinese'])
    },
}
</script>