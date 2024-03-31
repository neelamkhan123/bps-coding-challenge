<template>
  <inner-image-zoom
    :src="imgPath"
    :zoomSrc="imgPathLarge"
    zoomType="click"
    :class="imgClasses"
  />
</template>

<script>
// Vue Image Zoom -->
import "vue-inner-image-zoom/lib/vue-inner-image-zoom.css";
import InnerImageZoom from "vue-inner-image-zoom";

export default {
  components: {
    "inner-image-zoom": InnerImageZoom,
  },
  props: ["imgPath", "imgPathLarge"],
  inject: ["product"],
  computed: {
    imgClasses() {
      if (this.imgPath === this.product.assets.regular.frontBack) {
        return "w-[33rem]";
      } else if (this.imgPath === this.product.assets.regular.front) {
        return "w-[31rem]";
      } else if (this.imgPath === this.product.assets.regular.back) {
        return "w-96";
      }
    },
  },
};
</script>
