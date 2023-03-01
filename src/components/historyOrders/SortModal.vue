<template>
    <!-- 篩選 Modal -->
    <div class="modal fade" id="sortModal" tabindex="-1" aria-labelledby="sortModalLabel" aria-hidden="true"
        data-bs-backdrop="static" data-bs-keyboard="false">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header bg-primary-4 text-white">
                    <h5 class="modal-title " id="sortModalLabel">日期篩選</h5>
                </div>
                <div class="modal-body">
                    <div class="form-floating mb-3">
                        <input type="date" class="form-control" id="beginDate" placeholder="請輸入起始日期" v-model="beginDate">
                        <label for="beginDate">請輸入起始日期</label>
                    </div>
                    <div class="form-floating">
                        <input type="date" class="form-control" id="endDate" placeholder="請輸入結束日期" v-model="stopDate">
                        <label for="endDate">請輸入結束日期</label>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-outline-danger" data-bs-dismiss="modal"
                        ref="sortModalClose">取消</button>
                    <button type="button" class="btn btn-danger" @click="()=>sortOrder(beginDate, stopDate, this.$refs)">篩選</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from 'pinia';
import historyOrderStore from '../../stores/historyOrderStore';

export default {
    data() {
        return {
            beginDate: '',
            stopDate: '',
        }
    },
    computed: {
        ...mapState(historyOrderStore, [''])
    },
    methods: {
        ...mapActions(historyOrderStore, ['sortOrder'])
    },

}
</script>