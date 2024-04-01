<template>
  <section
    class="flex flex-col dt:flex-row justify-center dt:items-start items-center space-y-3 dt:space-y-0 dt:space-x-32 base-container relative"
  >
    <!-- Image Container -->
    <TheImageContainer @openModal="openModal" />

    <!-- Description Container -->
    <TheDescriptionContainer />
  </section>
</template>

<script>
import TheImageContainer from "./TheImageContainer.vue";
import TheDescriptionContainer from "./TheDescriptionContainer.vue";

export default {
  components: {
    TheImageContainer,
    TheDescriptionContainer,
  },
  emits: ["openModal"],
  methods: {
    openModal(selectedMedia) {
      this.$emit("openModal", selectedMedia);
    },
  },
};
</script>
