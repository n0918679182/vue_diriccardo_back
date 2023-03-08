import { defineStore } from "pinia";
import axios from "axios";

export default defineStore('productStore', {
    state: () => ({
        allProducts: []
    }),
    actions: {
        getAllProducts() {
            axios.get('https://diriccardo-server.onrender.com/products/').then(resp => {
                this.allProducts = resp.data;
            }).catch(err => console.dir(err));
        }
    }
})