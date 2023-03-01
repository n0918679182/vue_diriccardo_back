
<template>
  <!-- side bar -->
  <div class="vh-100 list-unstyled position-absolute top-0 end-0 border-start border-gray bg-primary-1"
    style="width: 60px;">
    <div class="d-flex flex-column justify-content-between h-100 px-1">
      <ul class="d-flex flex-column list-unstyled align-items-center justify-content-center h-100">
        <RouterLink to="/" class="mb-15" role="button">
          <span class="material-icons-outlined text-white">
            deck
          </span>
        </RouterLink>
        <RouterLink to="/WaitingMeal" class="mb-15" role="button">
          <i class='bx bx-dish h3 text-white'></i>
        </RouterLink>
        <RouterLink to="/HistoryOrders" class="" role="button">
          <i class='bx bx-book-bookmark h3 text-white'></i>
        </RouterLink>
      </ul>
    </div>
  </div>

  <div class="contaienr mx-20 mt-10">
    <Timebar />
    <RouterView />
  </div>
</template>

<script>
import { RouterLink, RouterView } from 'vue-router'
import Timebar from './components/Timebar.vue';
import { mapActions } from 'pinia';
import productStore from './stores/productStore';

export default {
  methods: {
    ...mapActions(productStore, ['getAllProducts']),
  },
  mounted() {
    this.getAllProducts();
  },
  components: {
    Timebar,
  }
}

</script>