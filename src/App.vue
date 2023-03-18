
<script setup>
import ProductList from './components/ProductList.vue';
import CartItems from './components/CartItems.vue';
</script>


<template>
  <header>

  </header>
  <main>
    <component v-if="!loading && products" :is="activeComponent" :Courses="products" :Cart="cart" @add_to_cart="addToCart" @modify_cart="modifyCart"
      @go_to_cart="switch_to_cart" @go_to_products="switch_to_products" />

    <div v-else>
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
      
  </main>
</template>

<script>
//import Courses from './assets/json/courses.json';

export default {

  components: {
    ProductList,
    CartItems
  },
  mounted() {
    
  },
  created() {
    this.getData();
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('../serviceWorker.js')
        .then((reg) => console.log('service worker registered', reg))
        .catch((err) => console.log('service worker not registered', err))
    }
  },
  data() {
    return {
      products: null,
      cart: [],
      activeComponent: ProductList,
      cartitems: 0,
      imgSrcPre: 'src/assets/',
      loading: true,

    }
  },
  methods: {
    //check if any data is recieved from api
    async getData() {
      await fetch("https://lessons-cw2.herokuapp.com/Lessons")
        .then(response => response.json())
        .then(data => {
          this.products = data;
          this.loading = false;
        });
      //add prefix to each data items image path
      this.products.forEach(element => {
        element['image_url'] = this.imgSrcPre + element['image_url'];
      });

      //copy products array to cart array
      this.cart = [...this.products];
      this.cart.forEach(element => {
        element['quantity'] = null;
      });

      console.log(this.products);
    },

    addToCart(subject) {
      //find entire object and push to cart array
      let result = this.products.findIndex((obj => obj.subject == subject));
      this.products[result].stock--;

      //increment the quantity
      let cartItem = this.cart.findIndex((obj => obj.subject == subject));
      this.cart[cartItem].quantity++;
      console.log(this.cart);
    },
    modifyCart(subject, operation) {

      let cartItem = this.cart.findIndex((obj => obj.subject == subject));
      let result = this.products.findIndex((obj => obj.subject == subject));

      if (operation == "+") {
        //increment the quantity
        this.cart[cartItem].quantity++;
        this.products[result].stock--;

      }
      else if (operation == "-") {
        //increment the quantity
        this.cart[cartItem].quantity--;
        this.products[result].stock++;
      }

    },
    switch_to_cart() {
      this.activeComponent = CartItems;
    },
    switch_to_products() {
      this.activeComponent = ProductList;
    }
  },
}
</script>

<style scoped></style>
