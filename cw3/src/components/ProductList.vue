<!-- eslint-disable vue/return-in-computed-property -->
<!-- eslint-disable vue/return-in-computed-property -->
<style scoped>

</style>


<template>
  <div class="container">
    <form style="position: sticky; border:2px dotted white;" class="d-inline-flex container bg-dark text-light p-3 mb-5">
      <select v-model="filterValue" class="form-select" aria-label="Filter By">
        <option disabled selected>Filter By</option>
        <option value="subject" selected>Subject</option>
        <option value="location">Location</option>
        <option value="price">Price</option>
        <option value="stock">Spaces Available</option>
      </select>

      <div class="form-check">
        <div class="form-check form-check-inline">
          <input class="form-check-input" v-model="checkBox" type="radio" name="inlineRadioOptions" id="asc-radio"
            value="asc" checked>
          <label class="form-check-label" for="inlineRadio1">Ascending</label>
        </div>
        <div class="form-check form-check-inline">
          <input class="form-check-input" v-model="checkBox" type="radio" name="inlineRadioOptions" id="desc-radio"
            value="desc">
          <label class="form-check-label" for="inlineRadio2">Descending</label>
        </div>
      </div>
      <input class="form-control me-2" v-model="searchQuery" type="search" placeholder="Search..." aria-label="Search">
    </form>

    <div class="row">
      <span class="col-10 display-3">Available Courses</span>
      <a @click="switchComponent" class="col-2 display-6" style="align-self: center; cursor: pointer;"><i class="bi bi-cart2"></i>{{ cartCount }}</a>
    </div>
    <!-- Courses Section -->
    <div class="row mt-5 card-group" style="display:-webkit-box;">
      <div class="col-lg-3 col-md-6 col-sm-12" v-for="course in filteredProducts" :key="course.id">
        <div class="card mb-3 bg-dark text-light">
          <div class="row">
            <img :src="course.image_url" class="img-responsive img-rounded p-3 mt-3 card-img-top mx-auto" alt="...">
          </div>
          <div class="row">
            <div class="card-body">
              <h5 class="card-title" style="font-weight: bolder;">{{ course.subject }}</h5>
              <p class="">{{ course.description }}</p>
              <p><span style="font-size:large ;" :class="course.stock > 5 ? 'text-success' : 'text-danger'">{{
                course.stock
              }}</span>
                spaces left!</p>

              <button @click="addToCart(course.subject)" :disabled="course.stock <= 0" class="btn btn-outline-light">Add
                To Cart
              </button>
              <hr>
              <div class="row">
                <div class="col-6">
                  <p class="card-text text-success" style="font-weight: bold; font-size: large;">
                    &pound;{{
                      course.price }}</p>
                </div>
                <div class="col-6">
                  <p class="card-text" style="font-weight:bold; float:right ;"><i class="bi bi-geo-alt"></i> <em
                      class="">{{
                        course.location }}</em> </p>
                </div>
              </div>


            </div>
          </div>

        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
defineProps({
  Courses: {
    type: Array,
    required: true
  },
  Cart:{
    type: Array,
    required: true
  }
});
</script>

<script>
export default {
  emits: ['add_to_cart', 'go_to_cart'],
  data() {
    return {
      searchQuery: '',
      items: this.Courses,
      filterValue: null,
      checkBox: 'asc',
      cart: this.Cart,
    }
  },

  methods: {
    addToCart(subject) {
      this.$emit('add_to_cart', subject);
    },
    switchComponent() {
      this.$emit('go_to_cart');
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
     // eslint-disable-next-line vue/return-in-computed-property
    filteredProducts() {
      if (this.searchQuery == "" && this.filterValue == null) {
        return this.items;
      }
      else {
        if (this.filterValue == 'subject' || this.filterValue == 'location') {
          if (this.checkBox == "asc") {
            return (this.items.filter((obj) => obj.subject.toLowerCase().includes(this.searchQuery.toLowerCase())
              || obj.description.toLowerCase().includes(this.searchQuery.toLowerCase())).sort((a, b) => a[this.filterValue].toLowerCase() < b[this.filterValue].toLowerCase() ? -1 : 0));
          }
          else if (this.checkBox == "desc") {
            return (this.items.filter((obj) => obj.subject.toLowerCase().includes(this.searchQuery.toLowerCase())
              || obj.description.toLowerCase().includes(this.searchQuery.toLowerCase())).sort((a, b) => b[this.filterValue].toLowerCase() < a[this.filterValue].toLowerCase() ? -1 : 0));
          }
        }
        else {
          if (this.checkBox == "asc") {
            return this.items.filter((obj) => obj.subject.toLowerCase().includes(this.searchQuery.toLowerCase())
              || obj.description.toLowerCase().includes(this.searchQuery.toLowerCase())).sort((a, b) => a[this.filterValue] - b[this.filterValue]);
          }
          else if (this.checkBox == "desc") {
            return this.items.filter((obj) => obj.subject.toLowerCase().includes(this.searchQuery.toLowerCase())
              || obj.description.toLowerCase().includes(this.searchQuery.toLowerCase())).sort((a, b) => b[this.filterValue] - a[this.filterValue]);
          }
        }
      }
    }
  }
}

</script>
