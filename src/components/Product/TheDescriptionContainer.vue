<template>
  <!-- Description Container -->
  <div class="flex flex-col space-y-5 w-full">
    <!-- Container A: Product ID -->
    <div
      class="flex flex-col justify-center space-y-2 dt:space-y-4 pb-6 border-b-2 border-b-slate-200"
    >
      <div class="flex justify-between">
        <!-- Brand -->
        <h3
          class="text-sm dt:text-base uppercase text-slate-400 tracking-wider"
        >
          {{ product.brand }}
        </h3>
        <!-- Sale Alert -->
        <h3 class="text-sm dt:text-base text-green-600">Hurry Limited Stock</h3>
      </div>

      <!-- Product Title -->
      <h1 class="text-lg font-semibold mb-2 dt:pb-5 dt:text-3xl">
        {{ product.name }}
      </h1>

      <!-- Product Price -->
      <h2 class="text-lg dt:text-xl font-bold">£{{ product.price }}</h2>
    </div>

    <!-- Container B: Product Data -->
    <div
      class="flex flex-col justify-center space-y-4 dt:space-y-8 pb-5 dt:pb-7 border-b-2 border-b-slate-200"
    >
      <!-- Sim -->
      <h3 class="text-sm dt:text-base uppercase">
        <span class="font-bold capitalize">Sim:</span> {{ product.data.sim }}
      </h3>
      <!-- Product Condition -->
      <h3 class="text-sm dt:text-base uppercase">
        <span class="font-bold capitalize">Condition:</span>
        {{ product.data.condition }}
      </h3>
      <!-- Product Colour -->
      <h3 class="text-sm dt:text-base uppercase">
        <span class="font-bold capitalize">Colour:</span>
        {{ product.data.colour }}
      </h3>
      <!-- Network -->
      <h3 class="text-sm dt:text-base uppercase">
        <span class="font-bold capitalize">Network:</span>
        {{ product.data.network }}
      </h3>
      <!-- Storage -->
      <h3 class="text-sm dt:text-base uppercase">
        <span class="font-bold capitalize">Storage:</span>
        {{ product.data.storage }}
      </h3>
    </div>

    <!-- Container C: Customer Actions -->
    <div class="flex flex-col justify-center space-y-4">
      <!-- Quantity Container -->
      <div
        class="flex justify-center items-center smdt:justify-start space-x-5"
      >
        <!-- Minus -->
        <div
          class="text-slate-500 text-xs dt:text-base hover:text-blue-500 cursor-pointer"
          @click="decrementQty"
        >
          <i class="fa-solid fa-minus"></i>
        </div>
        <!-- Number Input -->
        <input
          type="number"
          class="w-10 dt:w-12 text-center p-2 outline-none bg-slate-200 rounded-sm"
          v-model="qty"
        />
        <!-- Plus -->
        <div
          class="text-slate-500 text-xs dt:text-base hover:text-blue-500 cursor-pointer remove-arrow"
          @click="incrementQty"
        >
          <i class="fa-solid fa-plus"></i>
        </div>
      </div>

      <!-- Add to Basket Button Container -->
      <div class="flex justify-center items-center">
        <button
          class="bg-yellow-400 w-full py-2 smdt:py-3 rounded-md font-semibold smdt:text-lg hover:bg-yellow-300 transition-colors duration-300"
        >
          Add to Basket
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  inject: ["product"],
  data() {
    return { qty: 1 };
  },
  methods: {
    incrementQty() {
      this.qty++;
    },

    decrementQty() {
      if (this.qty > 1) {
        this.qty--;
      } else {
        return;
      }
    },
  },
};
</script>
