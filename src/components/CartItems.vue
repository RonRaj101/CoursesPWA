

<template>

  <div class="container my-5">

    <div class="row">
      <span class="col-10 display-4" style="">CART ({{ cartCount }})</span>
      
      <a @click="switchComponent" class="col display-6" style="text-align: center; align-self: flex-end; cursor: pointer;"><i class="bi bi-view-list"></i></a>
        <h2 v-show="cartCount == 0" class="text-muted">No Items in Cart! <a @click="switchComponent" class="col" style="text-align: center; align-self: center; cursor: pointer;">Add</a></h2>
    </div>
  
  
 
  <div class="row mt-5">

    <div class="col-lg-4 col-md-6 col-sm-12 mt-3" v-for="item in sortedCart" :key="item.id">

      <div v-show="item.quantity > 0">

        <div class="card mb-3 bg-dark text-light position-relative">

          <div class="row">
            <img :src="item.image_url" class="img-responsive img-rounded p-3 mt-3 card-img-top mx-auto" alt="...">
          </div>
          <div class="row">
            <div class="card-body">
              <h5 class="card-title" style="font-weight: bolder;">{{ item.subject }}</h5>
              <p class="">{{ item.description }}</p>
              <p><span style="font-size:large ;"></span>
              <nav aria-label="...">
                <ul class="pagination pagination-sm">
                  <li class="page-item" aria-current="page">
                    <button @click="modifyCart(item.subject, '-')" :disabled="item.quantity == 0"
                      class="btn btn-light btn-sm">-</button>
                  </li>
                  <li class="page-item active px-2 mt-1">
                    {{ item.quantity }}
                  </li>
                  <li class="page-item">
                    <button @click="modifyCart(item.subject, '+')" :disabled="item.quantity >= item.total_stock"
                      class="btn btn-light btn-sm">+</button>
                  </li>
                </ul>
              </nav>

              <span class=""></span>
              </p>


              <hr>
              <div class="row">
                <div class="col">
                  <p class="card-text text-success" style="font-weight: bold; font-size: large;">
                    &pound;{{
                      item.price }}</p>
                </div>
                <div class="col">
                  <p class="card-text" style="font-weight:bold; float:right ;"><i class="bi bi-geo-alt"></i> <em
                      class="">{{ item.location }}</em> </p>
                </div>
              </div>


            </div>
          </div>

        </div>
     
      </div>

    </div>

  </div>

  <div>

    <!-- Button trigger modal -->


<!-- Modal -->
<div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content text-dark">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="staticBackdropLabel">Order Confirmed <i class="bi bi-check-circle"></i></h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        Thank you for your order! We will be in touch shortly.
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <a src="javascript:location.reload()" type="button" class="btn btn-primary">Understood</a>
      </div>
    </div>
  </div>
</div>
    
    <form @submit.prevent=""  v-show="cartCount > 0">
      <hr>
      <h1 class="display-4">Check Out</h1>
      <br>
      <div class="mb-3 row">
        <label for="inputText" class="col-sm-2 col-form-label">Full Name</label>
        <div class="col-sm-10">
          <input @change="cartEligible" v-model="username_checkout" type="text" class="form-control" id="inputText" required>
        </div>
      </div>
      <div class="mb-3 row">
        <label for="inputPhone" class="col-sm-2 col-form-label">Phone Number</label>
        <div class="col-sm-10">
          <input @change="cartEligible" v-model="phone_checkout" type="number" class="form-control" id="inputPhone" required>
        </div>
      </div>
      <div class="mb-3 px-2 row">
          <button :disabled="buyDisabled" type="submit" class="btn btn-secondary col" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Submit Order</button>
      </div>
    </form>
  </div>  

</div>
</template>
<script setup>
defineProps({
  Cart: {
    type: Array,
    required: true
  }
})
</script>
<script>
export default {
  emits: ['modify_cart'],
  data() {
    return {
      username_checkout: '',
      phone_checkout: '',
      buyDisabled: true,
    }
  },
  methods: {
    //method for changing items in cart (+ or - quantity)
    modifyCart(subject, operation) {
        this.$emit('modify_cart', subject, operation);
    },
    switchComponent() {
      this.$emit('go_to_products');
    },
    cartEligible(){
      //regex check name and phone number
      let nameRegex = /^[a-zA-Z ]{2,30}$/;
      let phoneRegex = /^[0-9]/;
      if (nameRegex.test(this.username_checkout) && phoneRegex.test(this.phone_checkout)){
        this.buyDisabled = false;
      } else {
        this.buyDisabled = true;  
      }
    }
  },
  computed: {
    cartCount() {
      //count number of items in cart where quantity > 0
      let count = 0;
      this.Cart.forEach(element => {
        if (element.quantity > 0) {
          count++;
        }
      });
      return count;
    },
    sortedCart(){
      // sort cart by quantity descending
      return this.Cart.sort((a, b) => (a.quantity < b.quantity) ? 1 : -1)
    },
    
  }
}
</script>
