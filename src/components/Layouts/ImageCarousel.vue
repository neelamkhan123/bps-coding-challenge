<template>
  <div
    class="flex justify-center smdt:px-20 py-10"
    :class="{
      'mt-20': mobileModal && mobileDragCarousel,
      'w-full h-full': desktopModal && desktopThumbnailCarousel,
    }"
  >
    <!-- Image Container -->
    <div
      v-if="photoTabIsTrue"
      class="w-full h-full flex justify-center items-center"
    >
      <!-- Image 1 -->
      <div
        @click="openModalToMedia(1)"
        class="w-72 h-96 flex justify-center items-center"
        v-if="setThumbnail === 1 || (setThumbnail === 4 && desktopModal)"
      >
        <!-- Desktop Carousel -->
        <div v-if="desktopThumbnailCarousel">
          <ClickZoom
            v-if="desktopModal"
            :imgPath="product.assets.regular.frontBack"
            :imgPathLarge="product.assets.large.frontBackLarge"
          />
          <ImageMagnifier v-else :imgPath="product.assets.regular.frontBack" />
        </div>

        <!-- Mobile Carousel -->
        <RegionZoom v-else :imgPath="product.assets.regular.frontBack" />
      </div>

      <!-- Image 2 -->
      <div
        @click="openModalToMedia(2)"
        class="w-72 h-96 flex justify-center items-center"
        v-if="setThumbnail === 2"
      >
        <!-- Desktop Carousel -->
        <div v-if="desktopThumbnailCarousel">
          <ClickZoom
            v-if="desktopModal"
            :imgPath="product.assets.regular.front"
            :imgPathLarge="product.assets.large.frontLarge"
          />
          <ImageMagnifier v-else :imgPath="product.assets.regular.front" />
        </div>

        <!-- Mobile Carousel -->
        <RegionZoom v-else :imgPath="product.assets.regular.front" />
      </div>

      <!-- Image 3 -->
      <div
        @click="openModalToMedia(3)"
        class="w-72 h-96 flex justify-center items-center"
        v-if="setThumbnail === 3"
      >
        <!-- Desktop Carousel -->
        <div v-if="desktopThumbnailCarousel">
          <ClickZoom
            v-if="desktopModal"
            :imgPath="product.assets.regular.back"
            :imgPathLarge="product.assets.large.backLarge"
          />
          <ImageMagnifier v-else :imgPath="product.assets.regular.back" />
        </div>

        <!-- Mobile Carousel -->
        <RegionZoom v-else :imgPath="product.assets.regular.back" />
      </div>
    </div>

    <!-- Video Container -->
    <div
      v-if="videoTabIsTrue && desktopThumbnailCarousel"
      class="w-72 h-96"
      :class="{ 'w-full': desktopModal && desktopThumbnailCarousel }"
    >
      <div
        @click="openModalToMedia(4)"
        class="h-full flex justify-center items-center"
        v-if="
          setThumbnail === 4 ||
          ((setThumbnail === 1 || setThumbnail === 2 || setThumbnail === 3) &&
            desktopModal)
        "
      >
        <video
          controls
          autoplay
          :class="{ 'w-full': desktopModal && desktopThumbnailCarousel }"
        >
          <source :src="product.assets.regular.video" type="video/mp4" />
        </video>
      </div>
    </div>
  </div>

  <!-- Left Arrow -->
  <div
    v-if="showArrows"
    class="absolute left-3 top-60 smdt:top-64 text-gray-600 text-sm font-bold cursor-pointer hover:text-blue-500"
    @click="prev"
  >
    <i class="fa-solid fa-chevron-left"></i>
  </div>
  <!-- Right Arrow -->
  <div
    v-if="showArrows"
    class="absolute right-3 top-60 smdt:top-64 text-gray-600 text-sm font-bold cursor-pointer hover:text-blue-500"
    @click="next"
  >
    <i class="fa-solid fa-chevron-right"></i>
  </div>
</template>

<script>
import ImageMagnifier from "./ImageMagnifier.vue";
import RegionZoom from "./RegionZoom.vue";
import ClickZoom from "./ClickZoom.vue";

export default {
  components: {
    ImageMagnifier,
    RegionZoom,
    ClickZoom,
  },
  props: [
    "setThumbnail",
    "showArrows",
    "desktopModal",
    "mobileModal",
    "videoTabIsTrue",
    "photoTabIsTrue",
  ],
  emits: ["handleArrowMovement", "openModalOnMedia"],
  inject: ["product"],
  data() {
    return {
      thumbnail: 1,
      windowWidth: window.innerWidth,
    };
  },
  computed: {
    mobileDragCarousel() {
      return this.windowWidth < 700;
    },
    desktopThumbnailCarousel() {
      return this.windowWidth > 700;
    },
  },
  methods: {
    next() {
      if (this.thumbnail === 4) {
        this.thumbnail = 1;
      } else if (this.thumbnail === 3 && this.mobileDragCarousel === true) {
        this.thumbnail = 1;
      } else {
        this.thumbnail += 1;
      }
      this.$emit("handleArrowMovement", this.thumbnail);
    },

    prev() {
      if (this.thumbnail === 1 && this.mobileDragCarousel === true) {
        this.thumbnail = 3;
      } else if (this.thumbnail === 1) {
        this.thumbnail = 4;
      } else {
        this.thumbnail -= 1;
      }
      this.$emit("handleArrowMovement", this.thumbnail);
    },

    openModalToMedia(selectedMedia) {
      this.$emit("openModalOnMedia", selectedMedia);
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
