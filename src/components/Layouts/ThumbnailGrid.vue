<template>
  <ul
    class="flex justify-center items-center space-x-1"
    :class="{
      hidden: mobileWidth && !showThumbnails,
      'flex-col': verticalIsTrue,
    }"
  >
    <li
      @click="setActiveThumbnail(1)"
      :class="{
        activeClass: arrowListener === 1,
      }"
      class="border-2 border-transparent p-2 h-20 w-20 flex justify-center items-center cursor-pointer rounded-sm hover:bg-slate-50"
    >
      <img :src="product.assets.thumbnail.frontBackThumbnail" alt="Thumbail" />
    </li>
    <li
      @click="setActiveThumbnail(2)"
      :class="{ activeClass: arrowListener === 2 }"
      class="border-2 border-transparent p-2 h-20 w-20 flex justify-center items-center cursor-pointer rounded-sm hover:bg-slate-50"
    >
      <img :src="product.assets.thumbnail.frontThumbnail" alt="Thumbail" />
    </li>
    <li
      @click="setActiveThumbnail(3)"
      :class="{ activeClass: arrowListener === 3 }"
      class="border-2 border-transparent p-2 h-20 w-20 flex justify-center items-center cursor-pointer rounded-sm hover:bg-slate-50"
    >
      <img :src="product.assets.thumbnail.backThumbnail" alt="Thumbail" />
    </li>
    <li
      v-if="showVideoThumbnail"
      @click="setActiveThumbnail(4)"
      :class="{ activeClass: arrowListener === 4 }"
      class="border-2 border-transparent p-2 h-20 w-20 flex justify-center items-center cursor-pointer rounded-sm hover:bg-slate-50"
    >
      <div
        class="bg-black/70 text-white h-10 w-10 flex justify-center items-center rounded-full"
      >
        <div class="play-button-icon"></div>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    arrowListener: {
      type: Number,
      required: false,
      default: 1,
    },
    showVideoThumbnail: {
      type: Boolean,
      required: false,
      default: true,
    },
    showThumbnails: {
      type: Boolean,
      required: false,
      default: false,
    },
    verticalIsTrue: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  emits: ["openOnThumbnailModal", "setThumbnail"],
  inject: ["product"],
  data() {
    return {
      activeThumbnail: null,
      windowWidth: window.innerWidth,
    };
  },
  computed: {
    mobileWidth() {
      return this.windowWidth < 700;
    },
  },
  methods: {
    setActiveThumbnail(thumbnail) {
      this.activeThumbnail = thumbnail;
      this.$emit("setThumbnail", this.activeThumbnail);
      this.$emit("openOnThumbnailModal", this.activeThumbnail);
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
