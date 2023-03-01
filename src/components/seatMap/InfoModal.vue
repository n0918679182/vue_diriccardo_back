<template>
    <!-- 桌位資訊 Modal -->
    <div class="modal fade" id="tableInfoModal" tabindex="-1" aria-labelledby="tableInfoModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-lg">
            <div class="modal-content rounded-0" :class="{
                'bg-primary-1': tableInfoTemp.colorCode == 1,
                'bg-primary-2': tableInfoTemp.colorCode == 2,
                'bg-primary-3': tableInfoTemp.colorCode == 3,
                'bg-primary-4': tableInfoTemp.colorCode == 4,
            }">
                <div class="modal-body py-0 px-0">
                    <div class="d-flex flex-column w-100">
                        <div class="d-flex row border-bottom mx-0">
                            <div class="col-3 d-flex justify-content-center align-items-center">
                                <p class="h1 m-0 text-white">{{ tableInfoTemp.tableId }}</p>
                            </div>
                            <div class="col-6 border-start border-end py-5 px-5">
                                <p class="mb-3 text-white">進場時間：<span class="h4">{{ tableInfoTemp.sitTime }}</span>
                                </p>
                                <p class="mb-0 text-white">用餐人數：<span class="h4">{{ tableInfoTemp.customerNum }}
                                        位</span></p>
                            </div>
                            <div class="col-3 py-2">
                                <p class="text-white h7">狀態：</p>
                                <div class="d-flex justify-content-center align-items-center py-4"
                                    v-if="tableInfoTemp.state == 1">
                                    <span class="material-icons-outlined text-white me-3 h4">
                                        paid
                                    </span>
                                    <p class="text-white h4">
                                        結帳
                                    </p>
                                </div>
                                <div class="d-flex justify-content-center align-items-center py-4"
                                    v-else-if="tableInfoTemp.state == 2">
                                    <i class='bx bx-user-voice text-white me-3 h4'></i>
                                    <p class="text-white h4">
                                        服務鈴
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="d-flex w-100">
                            <a href="#"
                                class="py-4 w-100 text-center text-white h5 text-decoration-none m-0"
                                :class="{ 'clickEffect': orderInfoEffect }" data-bs-toggle="modal" data-bs-target="#orderInfoModal"
                                @click="()=>showOrderDetail(tableInfoTemp.tableId)"
                                @mousedown="changeOrderInfoClickEffect" @mouseup="changeOrderInfoClickEffect" >顯示點餐明細</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <OrderInfoModal></OrderInfoModal>
</template>
<script>
import { mapState, mapActions } from "pinia";
import seatsMapStore from "../../stores/seatsMapStore";
import effectStateStore from "../../stores/effectStateStore";
import orderStore from "../../stores/orderStore";
import OrderInfoModal from './OrderInfoModal.vue';

export default {
    computed: {
        ...mapState(seatsMapStore, ['tableInfoTemp']),
        ...mapState(effectStateStore, ['memberInfoEffect','orderInfoEffect'])
    },
    methods: {
        ...mapActions(effectStateStore, ['changeOrderInfoClickEffect']),
        ...mapActions(orderStore, ['showOrderDetail'])
    },
    components: {
        OrderInfoModal,
    }
}
</script>

<style lang="scss" scoped>
.clickEffect {
    background: #000;
    opacity: .1;
}
</style>