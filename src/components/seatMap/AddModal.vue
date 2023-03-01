<template>
    <!-- +號 Modal -->
    <div class="modal fade" id="tableAddModal" tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false"
        aria-labelledby="tableAddModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header" :class="{
                    'bg-primary-1': tableInfoTemp.colorCode == 1,
                    'bg-primary-2': tableInfoTemp.colorCode == 2,
                    'bg-primary-3': tableInfoTemp.colorCode == 3,
                    'bg-primary-4': tableInfoTemp.colorCode == 4,
                }">
                    <h5 class="modal-title text-white" id="tableAddModalLabel">{{ tableInfoTemp.tableId }}</h5>
                    <span class="material-icons-outlined text-white" role="button" data-bs-dismiss="modal"
                        aria-label="Close" id="addCloseBtn">
                        cancel
                    </span>
                </div>
                <div class="modal-body d-flex py-10 px-5 justify-content-center">
                    <i class='bx bx-user-circle h2 me-5 text-dark'></i>
                    <select class="form-select w-75" aria-label="Default select example" v-model="selectPeople">
                        <option value=1>1 位</option>
                        <option value=2>2 位</option>
                        <option value=3>3 位</option>
                        <option value=4>4 位</option>
                    </select>
                </div>
                <div class="modal-footer p-0">
                    <button type="button" class="btn w-100 m-0 rounded-0 py-3 text-secondary"
                        @click="()=>takeSeatAndInitSelectPeople(tableInfoTemp.id, selectPeople)">確定</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapState, mapActions } from "pinia";
import seatsMapStore from "../../stores/seatsMapStore";

export default {
    data() {
        return {
            selectPeople: 1,     // 暫存選取的入座人數
        }
    },
    computed: {
        ...mapState(seatsMapStore, ['tableInfoTemp'])
    },
    methods: {
        ...mapActions(seatsMapStore, ['takeSeat']),
        takeSeatAndInitSelectPeople(id, selectPeople) {
            this.selectPeople = 1;
            this.takeSeat(id, selectPeople);
        }
    },
}
</script>