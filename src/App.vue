<template>
  <div class="min-h-screen relative bg-grey">
    <TheHeader />
    <main class="pt-28 pb-10 smdt:pt-40">
      <TheProduct @openModal="openModal" />
    </main>
    <TheModal
      v-if="modalIsOpen"
      @closeModal="closeModal"
      :selectedMedia="openModalMedia"
    />
  </div>
</template>

<script>
import TheHeader from "./components/UI/TheHeader.vue";
import TheProduct from "./components/Product/TheProduct.vue";
import TheModal from "./components/Modal/TheModal.vue";

// Image Imports
import frontBackImg from "./assets/images/product-image.jpg";
import frontImg from "./assets/images/product-image-front.jpg";
import backImg from "./assets/images/product-image-back.jpg";
import frontBackImgLarge from "./assets/images/product-image-large.jpeg";
import frontImgLarge from "./assets/images/product-image-front-large.jpeg";
import backImgLarge from "./assets/images/product-image-back-large.jpeg";
import frontBackImgThumbnail from "./assets/images/product-image-thumbnail.jpeg";
import frontImgThumbnail from "./assets/images/product-image-front-thumbnail.jpeg";
import backImgThumbnail from "./assets/images/product-image-back-thumbnail.jpeg";

// Video Import
import productVid from "./assets/videos/single-click-zoom-desktop.mp4";

export default {
  components: {
    TheHeader,
    TheProduct,
    TheModal,
  },
  data() {
    return {
      product: {
        brand: "Samsung",
        name: "Samsung Galaxy S23 Plus 5G",
        price: "880.00",
        data: {
          sim: "Dual Sim",
          condition: "Like New",
          colour: "Lavender",
          network: "Unlocked",
          storage: "512GB",
        },
        fullDescription:
          "Like New Samsung Galaxy S23 Plus 5G 512GB Dual Sim (Lavender)",
        assets: {
          regular: {
            frontBack: frontBackImg,
            front: frontImg,
            back: backImg,
            video: productVid,
          },
          large: {
            frontBackLarge: frontBackImgLarge,
            frontLarge: frontImgLarge,
            backLarge: backImgLarge,
          },
          thumbnail: {
            frontBackThumbnail: frontBackImgThumbnail,
            frontThumbnail: frontImgThumbnail,
            backThumbnail: backImgThumbnail,
          },
        },
      },
      modalIsOpen: false,
      openModalMedia: "",
    };
  },
  provide() {
    return {
      product: this.product,
    };
  },
  methods: {
    openModal(selectedThumbnail) {
      this.modalIsOpen = true;
      this.openModalMedia = selectedThumbnail;
    },

    closeModal() {
      this.modalIsOpen = false;
    },
  },
};
</script>
