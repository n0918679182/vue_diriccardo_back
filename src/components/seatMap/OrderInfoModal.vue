<template>
    <!-- 點餐明細 Modal -->
    <div class="modal fade" id="orderInfoModal" tabindex="-1" aria-labelledby="orderInfoModalLabel"
        data-bs-backdrop="static" data-bs-keyboard="false" aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
            <div class="modal-content overflow-visible" v-if="orderDetailTemp">
                <div class="modal-header align-items-start">
                    <div class="d-flex flex-column">
                        <p class="mb-3 text-dark h5">單號：{{ orderDetailTemp.serial }}</p>
                        <p class="mb-3 text-dark h5">桌號：{{ orderDetailTemp.tableId }}</p>
                        <p class="m-0 h7">{{ timeInChinese(orderDetailTemp.time) }}</p>
                    </div>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"
                        @click="()=>orderDetailTemp.subtotal = 0"></button>
                </div>
                <div class="modal-body">
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">餐點名稱</th>
                                <th class="text-end" scope="col">價格</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(product, index) in orderDetailTemp.newOrders" :key="index">
                                <th class="fw-normal">{{ product.name }}</th>
                                <td class="text-end">{{ product.price }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="modal-footer position-relative">
                    <div class="d-flex flex-column align-items-end" style="width: 150px;">
                        <div class="d-flex justify-content-between align-items-end w-100 mb-2">
                            <p class="mb-0 h7">小計：</p>
                            <p class="mb-0 h5">{{ orderDetailTemp.subtotal }}</p>
                        </div>
                        <div class="d-flex justify-content-between align-items-end w-100 mb-2">
                            <p class="mb-0 h7">服務費：</p>
                            <p class="mb-0 h7 me-1">10 % </p>
                        </div>
                        <div class="d-flex justify-content-between align-items-end w-100 mb-1">
                            <p class="mb-0 h7">總計：</p>
                            <p class="mb-0 h5 text-danger">{{
                                orderDetailTemp.subtotal +
                                (orderDetailTemp.subtotal * 0.1)
                            }}</p>
                        </div>
                    </div>
                    <div class="bg-primary-2 py-4 px-5 completeBill text-white" role="button"
                        data-bs-toggle="modal" data-bs-target="#resetSeatModal" :class="{ 'click': billBtnEffect }"
                        @mousedown="()=>changeBillBtnEffect()" @mouseup="()=>changeBillBtnEffect()">
                        完成結帳</div>
                </div>
            </div>
            <div class="modal-content" v-else-if="!orderDetailTemp">
                <div class="modal-header">
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <p class="py-6 h4 text-center">顧客尚未送出點餐</p>
                </div>
            </div>
        </div>
    </div>
    <ResetSeatModal></ResetSeatModal>
</template>

<script>
import { mapState, mapActions } from 'pinia';
import orderStore from '../../stores/orderStore';
import effectStateStore from '../../stores/effectStateStore';
import ResetSeatModal from './ResetSeatModal.vue';

export default {
    computed: {
        ...mapState(orderStore, ['orderDetailTemp']),
        ...mapState(effectStateStore, ['billBtnEffect']),
    },
    methods: {
        ...mapActions(orderStore, ['timeInChinese']),
        ...mapActions(effectStateStore, ['changeBillBtnEffect'])
    },
    components: {
        ResetSeatModal,
    }
}
</script>

<style lang="scss" scoped>
.completeBill {
    position: absolute;
    bottom: -10px;
    left: -10px;
    border-radius: 0 4px 0 0;
    box-shadow: 4px -4px 10px 1px rgba(0, 0, 0, 0.2);
    &.click {
        box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0);
        background: #e3452a !important;
    }
}
</style>