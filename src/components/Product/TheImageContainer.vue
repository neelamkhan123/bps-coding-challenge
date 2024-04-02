<template>
  <div class="w-full relative">
    <div class="bg-white w-full h-full shadow-md rounded-md mb-4 smdt:py-5">
      <!-- Image Carousel -->
      <ImageCarousel
        :setThumbnail="thumbnail"
        :showArrows="true"
        :desktopModal="false"
        :mobileModal="false"
        :videoTabIsTrue="thumbnail === 4"
        :photoTabIsTrue="thumbnail === 1 || thumbnail === 2 || thumbnail === 3"
        @handleArrowMovement="setActiveThumbnail"
        @openModalOnMedia="openModal"
      />

      <!-- Thumbnails -->
      <ThumbnailGrid
        @openOnThumbnailModal="openModal"
        @setThumbnail="setActiveThumbnail"
        :arrowListener="thumbnail"
        :showVideoThumbnail="true"
        :verticalIsTrue="false"
      />
    </div>

    <!-- Thumbnail Pagination -->
    <div class="flex justify-center items-center space-x-4">
      <div
        class="h-2.5 w-2.5 bg-transparent border border-gray-500 rounded-full"
        :class="{
          activePaginationClass: thumbnail === 1,
        }"
      ></div>
      <div
        class="h-2.5 w-2.5 bg-transparent border border-gray-500 rounded-full"
        :class="{
          activePaginationClass: thumbnail === 2,
        }"
      ></div>
      <div
        class="h-2.5 w-2.5 bg-transparent border border-gray-500 rounded-full"
        :class="{
          activePaginationClass: thumbnail === 3,
        }"
      ></div>
      <div
        v-if="!mobileWidth"
        class="flex justify-center items-center text-xs text-slate-400"
        :class="{
          activeVideoPaginationClass: thumbnail === 4,
        }"
      >
        <i class="fa-solid fa-play"></i>
      </div>
    </div>
  </div>
</template>

<script>
import ThumbnailGrid from "../Layouts/ThumbnailGrid.vue";
import ImageCarousel from "../Layouts/ImageCarousel.vue";

export default {
  components: {
    ThumbnailGrid,
    ImageCarousel,
  },
  emits: ["openModal"],
  inject: ["product"],
  data() {
    return {
      thumbnail: 1,
      windowWidth: window.innerWidth,
    };
  },
  computed: {
    mobileWidth() {
      return this.windowWidth < 700;
    },
  },
  methods: {
    openModal(selectedMedia) {
      this.$emit("openModal", selectedMedia);
      this.thumbnail = selectedMedia;
    },

    setActiveThumbnail(activeThumbnail) {
      this.thumbnail = activeThumbnail;
    },

    onResize() {
      this.windowWidth = window.innerWidth;
    },
  },
  mounted() {
    window.addEventListener("resize", this.onResize);
  },
  watch: {
    windowWidth(width) {
      if (width < 700) {
        this.thumbnail = 1;
      }
    },
  },
};
</script>
