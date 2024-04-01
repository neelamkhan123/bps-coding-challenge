<template>
  <div class="overflow-hidden flex justify-center items-center w-full">
    <img
      :src="imgPath"
      class="transition-transform duration-500 ease-in-out"
      :class="imgClasses"
      alt="View"
      :style="{
        transform: dblZoomState
          ? `scale(1.5) translate(${translateX}px, ${translateY}px)`
          : 'scale(1) translate(0px, 0px)',
      }"
      @dblclick="zoomOnRegion"
      ref="image"
    />
  </div>
</template>

<script>
export default {
  props: ["imgPath"],
  inject: ["product"],
  data() {
    return {
      dblZoomState: false,
      translateX: 0,
      translateY: 0,
      touchStartX: 0,
      touchEndX: 0,
    };
  },
  computed: {
    imgClasses() {
      if (this.imgPath === this.product.assets.regular.back) {
        return "w-40";
      }
    },
  },
  methods: {
    zoomOnRegion(event) {
      this.dblZoomState = !this.dblZoomState;

      const image = this.$refs.image;

      const imageRect = image.getBoundingClientRect();

      const mouseX = event.clientX - imageRect.left;
      const mouseY = event.clientY - imageRect.top;

      if (this.dblZoomState === true) {
        // Top left
        if (mouseX > 0 && mouseX < 100 && mouseY < 150 && mouseY > 0) {
          this.translateX = 100;
          this.translateY = 70;
          // Top Center
        } else if (mouseX > 100 && mouseX < 190 && mouseY < 150 && mouseY > 0) {
          this.translateX = 0;
          this.translateY = 70;
          // Top Right
        } else if (mouseX > 190 && mouseX < 300 && mouseY < 150 && mouseY > 0) {
          this.translateX = -100;
          this.translateY = 70;
          // Right Center
        } else if (
          mouseX > 190 &&
          mouseX < 300 &&
          mouseY > 130 &&
          mouseY < 200
        ) {
          this.translateX = -100;
          this.translateY = -20;
          // Bottom Right
        } else if (
          mouseX > 190 &&
          mouseX < 300 &&
          mouseY > 200 &&
          mouseY < 380
        ) {
          this.translateX = -100;
          this.translateY = -70;
          // Bottom Center
        } else if (
          mouseX > 100 &&
          mouseX < 190 &&
          mouseY > 200 &&
          mouseY < 380
        ) {
          this.translateX = 0;
          this.translateY = -70;
          // Bottom left
        } else if (mouseX > 0 && mouseX < 100 && mouseY > 180 && mouseY < 380) {
          this.translateX = 100;
          this.translateY = -70;
        }
        // Left Center
        else if (mouseX > 0 && mouseX < 100 && mouseY > 130 && mouseY < 200) {
          this.translateX = 100;
          this.translateY = 0;
        }
      } else {
        this.translateX = 0;
        this.translateY = 0;
      }
    },
  },
};
</script>
