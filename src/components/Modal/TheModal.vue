<template>
  <!-- Backdrop -->
  <div
    class="absolute top-0 left-0 right-0 h-full bg-black/70 z-20"
    @click="closeModal"
  ></div>

  <!-- Pop Up Modal -->
  <div
    class="fixed top-1 right-1 left-1 bottom-1 dt:top-10 dt:left-10 dt:right-10 dt:bottom-10 bg-white rounded-md shadow-md flex flex-col justify-between z-30"
  >
    <!-- Modal Navigation -->
    <div>
      <div class="hidden dt:block">
        <nav class="px-6 py-4 flex justify-between items-center">
          <!-- Modal Tabs -->
          <ul class="flex justify-center items-center space-x-5">
            <li
              @click="setActiveTab('photos')"
              :class="{ activeTabClass: photosTabClass }"
              class="px-4 py-1 font-bold cursor-pointer"
            >
              Photos
            </li>
            <li
              @click="setActiveTab('videos')"
              :class="{ activeTabClass: videosTabClass }"
              class="px-4 py-1 font-bold cursor-pointer"
            >
              Videos
            </li>
          </ul>

          <!-- Close Modal Button on Desktop-->
          <button
            @click="closeModal"
            type="button"
            class="text-gray-500 hidden dt:block"
          >
            <i class="fa-solid fa-xmark"></i>
          </button>
        </nav>
      </div>
      <!-- "Back" Modal Button on Mobile-->
      <div>
        <button
          @click="closeModal"
          type="button"
          class="text-gray-500 m-5 px-4 py-2 font-semibold rounded-lg shadow-lg hover:shadow-md transition duration-500 dt:hidden"
        >
          Back
        </button>
      </div>
    </div>

    <!-- Main Content Container -->
    <div
      class="flex flex-col dt:flex-row items-center dt:items-start justify-between h-full dt:pt-10 dt:px-16"
    >
      <ImageCarousel
        :setThumbnail="activeThumbnail"
        :desktopModal="true"
        :mobileModal="true"
        :showArrows="false"
        :videoTabIsTrue="videosTabClass"
        :photoTabIsTrue="photosTabClass"
      />

      <!-- Photos Tab -->
      <section
        v-if="photosTabClass"
        class="flex flex-col dt:flex-row justify-center items-center w-96"
      >
        <div
          class="flex justify-center dt:flex-col items-center dt:items-start w-full ml-5"
        >
          <!-- The Description -->
          <div class="block dt:hidden smdt:block">
            <div class="w-60 hidden smdt:block">
              <h1 class="mb-5 text-xl font-semibold">
                {{ product.fullDescription }}
              </h1>
            </div>
            <!-- Photo Thumbnails -->
            <ThumbnailGrid
              @setThumbnail="setActiveThumbnail"
              :showVideoThumbnail="false"
              :showThumbnails="true"
              :arrowListener="activeThumbnail"
            />
          </div>
        </div>
      </section>

      <!-- Videos Tab -->
      <section v-if="videosTabClass">
        <div class="hidden dt:block ml-5">
          <div class="w-60">
            <h1 class="mb-5 text-xl font-semibold">
              {{ product.fullDescription }}
            </h1>
          </div>
          <div class="activeClass cursor-pointer">
            <div
              class="bg-black/70 text-white h-10 w-10 flex justify-center items-center rounded-full"
            >
              <div class="play-button-icon"></div>
            </div>
          </div>
        </div>
      </section>
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
  inject: ["product"],
  emits: ["closeModal"],
  props: ["selectedMedia"],
  data() {
    return {
      activeTab:
        this.selectedMedia >= 1 && this.selectedMedia < 4 ? "photos" : "videos",
      activeThumbnail: this.selectedMedia,
      windowWidth: window.innerWidth,
    };
  },
  computed: {
    photosTabClass() {
      return this.activeTab === "photos";
    },

    videosTabClass() {
      return this.activeTab === "videos";
    },

    mobileDragCarousel() {
      return this.windowWidth < 700;
    },

    desktopThumbnailCarousel() {
      return this.windowWidth > 700;
    },
  },
  methods: {
    setActiveTab(tab) {
      this.activeTab = tab;
    },

    closeModal() {
      this.$emit("closeModal");
    },

    setActiveThumbnail(selectedThumbnail) {
      this.activeThumbnail = selectedThumbnail;
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
        this.activeTab = "photos";
        this.activeThumbnail = 1;
      }
    },
  },
};
</script>
