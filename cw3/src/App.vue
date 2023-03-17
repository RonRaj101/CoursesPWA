
<script setup>
import ProductList from './components/ProductList.vue';
import CartItems from './components/CartItems.vue';
</script>


<template>
  <header>

  </header>
  <main>
    <component :is="activeComponent" 
    :Courses="products" 
    :Cart="cart"
    @add_to_cart="addToCart" 
    @modify_cart="modifyCart"
    @go_to_cart="switch_to_cart"
    @go_to_products="switch_to_products"
    />
  </main>
</template>

<script>
import Courses from './assets/json/courses.json';

export default {
  
  components: {
    ProductList,
    CartItems
  },
  mounted() {
    this.cart = [...this.products];
    this.cart.forEach(element => {
      element['quantity'] = null;
    });
  },
  data() {
    return {
      products: Courses,
      cart: [],
      activeComponent: ProductList,
      cartitems:0,
    }
  },
  methods: {
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
    switch_to_cart(){
      this.activeComponent = CartItems;
    },
    switch_to_products(){
      this.activeComponent = ProductList;
    }
  },
  }
</script>

<style scoped></style>
