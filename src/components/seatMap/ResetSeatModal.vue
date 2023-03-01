<template>
    <!-- 確認是否重置座位資訊 Modal -->
    <div class="modal fade" id="resetSeatModal" tabindex="-1" aria-labelledby="resetSeatModalLabel"
        data-bs-backdrop="static" data-bs-keyboard="false" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-body">
                    <p class="my-5 h4 text-center">即將重置座位資訊！</p>
                    <div class="d-flex justify-content-center">
                        <button type="button" class="btn btn-outline-danger me-3" data-bs-target="#orderInfoModal"
                            data-bs-toggle="modal">取消</button>
                        <button type="button" class="btn btn-danger text-white" @click="resetSeat"
                            data-bs-dismiss="modal">確定</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'pinia';
import orderStore from '../../stores/orderStore';
import seatsMapStore from '../../stores/seatsMapStore';

export default {
    methods: {
        ...mapActions(orderStore, ['orderListToHistory']),
        ...mapActions(seatsMapStore, ['cleanTable']),
        async resetSeat() {
            await this.orderListToHistory();
            await this.cleanTable();
        }
    },
}
</script>