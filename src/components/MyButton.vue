<template>
  <button :class="mainClass">
    <Loader
      v-if="loading"
      :class="$style.loader"
      bgColor="#1F3DFF"
      color="#fff"
    />
    <span :class="$style.content">
      <slot></slot>
    </span>
  </button>
</template>

<script>
import Loader from "./Loader.vue";
import DEFAULT_TYPE_VALUES from "../constants";

export default {
  name: "MyButton",
  components: {
    Loader,
  },
  props: {
    loading: DEFAULT_TYPE_VALUES.BOOLEAN(),
    error: DEFAULT_TYPE_VALUES.BOOLEAN(),
  },
  computed: {
    mainClass() {
      return [
        this.$style["my-button"],
        {
          [this.$style.loading]: this.loading,
          [this.$style.error]: this.error,
        },
      ];
    },
  },
};
</script>

<style module>
.my-button {
  height: 55px;
  background-color: var(--primary-color);
  border: none;
  border-radius: 5px;
  color: var(--white-color);
  font-size: 18px;
  line-height: 18px;
  padding: 0 35px;
  cursor: pointer;
  position: relative;
}
.my-button.error {
  background-color: var(--error-color);
}
.loader {
  display: none;
  position: absolute;
  left: 50%;
  margin-left: -5px;
}
.my-button.loading {
  pointer-events: none;
}
.my-button.loading .content {
  visibility: hidden;
}
.my-button.loading .loader {
  display: block;
}
</style>
