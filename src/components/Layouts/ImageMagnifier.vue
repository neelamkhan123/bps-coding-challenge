<template>
  <div class="relative">
    <div
      ref="picture"
      class="relative"
      :class="imgClasses"
      @mousemove="move($event)"
      @mouseleave="reset"
    >
      <div
        ref="rect"
        class="rect"
        :style="{
          visibility: magnifierActive ? 'visible' : 'hidden',
        }"
      ></div>
      <img
        :src="imgPath"
        alt="Front and Back"
        ref="image"
        class="w-full h-full"
      />
    </div>

    <div
      ref="zoom"
      class="zoom"
      :style="{
        backgroundImage: `url(${imgPath})`,
        visibility: magnifierActive ? 'visible' : 'hidden',
      }"
    ></div>
  </div>
  <!-- <div v-else class="relative w-80 h-96">
    <img
      :src="imgPath"
      alt="Front and Back"
      ref="image"
      class="w-full h-full"
    />
  </div> -->
</template>

<script>
export default {
  props: ["imgPath"],
  inject: ["product"],
  data() {
    return {
      magnifierActive: false,
      windowWidth: window.innerWidth,
    };
  },
  computed: {
    imgClasses() {
      if (this.imgPath === this.product.assets.regular.frontBack) {
        return "w-80 h-96";
      } else if (this.imgPath === this.product.assets.regular.front) {
        return "w-80 h-[25rem]";
      } else if (this.imgPath === this.product.assets.regular.back) {
        return "w-44 h-96";
      }
    },

    limitByScreen() {
      return this.windowWidth > 1230;
    },
  },
  methods: {
    move(event) {
      this.magnifierActive = true;

      const container = this.$refs.picture;
      const image = this.$refs.image;
      const rect = this.$refs.rect;
      const zoom = this.$refs.zoom;

      let w1 = container.offsetWidth;
      let h1 = container.offsetHeight;

      let ratio = 10;

      zoom.style.backgroundSize = w1 * ratio + "px " + h1 * ratio + "px";

      let w2 = rect.offsetWidth / 2;
      let h2 = rect.offsetHeight / 2;

      zoom.style.width = w2 * ratio + "px";
      zoom.style.height = h2 * ratio + "px";

      let x, y, xx, yy;

      x = event.offsetX;
      y = event.offsetY;

      xx = x - w2;
      yy = y - h2;

      if (x < w2) {
        x = w2;
        xx = 0;
      }

      if (x > w1 - w2) {
        x = w1 - w2;
      }

      if (y < h2) {
        y = h2;
        yy = 0;
      }

      if (y > h1 - h2) {
        y = h1 - h2;
      }

      xx = xx * ratio;
      yy = yy * ratio;

      rect.style.left = x + "px";
      rect.style.top = y + "px";

      zoom.style.backgroundPosition = "-" + xx + "px -" + yy + "px";
    },

    reset() {
      this.magnifierActive = false;
    },

    onResize() {
      this.windowWidth = window.innerWidth;
    },
  },
  mounted() {
    window.addEventListener("resize", this.onResize);
  },
};
</script>

<style scoped>
.rect {
  position: absolute;
  margin: 0;
  padding: 0;
  width: 100px;
  height: 100px;
  background-color: rgba(128, 128, 128, 0.534);
  border: 2px red solid;
  transform: translate(-50%, -50%);
  pointer-events: none;
  visibility: hidden;
}

.zoom {
  position: absolute;
  top: 0px;
  left: 350px;
  border: 2px solid red;
  visibility: hidden;
  z-index: 5;
}
</style>
