import { defineStore } from "pinia";
import axios from "axios";

export default defineStore('productStore', {
    state: ()=>({
        allProducts: []
    }),
    actions: {
        getAllProducts() {
            axios.get('http://localhost:3000/products/').then(resp => {
                this.allProducts = resp.data;
            }).catch(err =>alert(err.response.data.message));
        }
    }
})