<template>
    <div class="WaitingMeal mt-5">
        <div class="row wait-meal-scroll px-10">
            <div class="d-flex align-items-end mt-2 mb-4">
                <h2 class="mb-0 me-6">廚房進度</h2>
                <button type="button" @click="undo" :disabled="noKitchenDeleteTemp"
                    class="btn btn-sm btn-outline-danger mb-1 d-flex align-items-center" style="font-size: 11px;">
                    復原銷單
                </button>
            </div>

            <div class="col-3 mb-5" v-for="order in newOrderLists" :key="order.tableId">
                <div class="card rounded-0 bxShadow border-dark">
                    <div class="card-header bg-white">{{ order.tableId }}</div>
                    <div class="card-body position-relative pb-10">
                        <p class="card-text mb-2 h6" v-for="(o, i) in order.newOrders" :key="i"
                            @click="() => lineOrder(order.tableId, i)" :id="order.tableId + '_order_' + i">
                            {{ o.name }}
                        </p>
                        <a href="#" class="btn btn-danger addToHistoryBTN"
                            @click.prevent="() => deleteFromKitchen(order)">銷單</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'pinia';
import kitchenStore from '../stores/kitchenStore.js';

export default {
    computed: {
        ...mapState(kitchenStore, ['newOrderLists', 'noKitchenDeleteTemp'])
    },
    methods: {
        ...mapActions(kitchenStore, ['getKitchenOrders', 'haveDeleteTemp', 'lineOrder', 'deleteFromKitchen', 'undo']),
    },
    mounted() {
        setInterval(() => {
            this.getKitchenOrders();
        }, 3000);
        setInterval(() => {
            this.haveDeleteTemp();
        }, 500);
    },
}
</script>

<style lang="scss" scoped>
.bxShadow {
    box-shadow: 2px 2px 6px 1px rgba(0, 0, 0, 0.1);
}

.addToHistoryBTN {
    position: absolute;
    bottom: -5px;
    left: -5px;
    border-radius: 0 8px 0 0;
    width: 100px;
}

.wait-meal-scroll {
    overflow-y: scroll;
    // max-height: 636px;
    max-height: 88vh;
    scrollbar-color: rgb(223, 223, 223) rgb(255, 255, 255);
    scrollbar-width: thin;
}

.delLine {
    text-decoration-line: line-through;
    text-decoration-color: #F54244;
    text-decoration-thickness: 5px;
}
</style>