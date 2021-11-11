<template>
  <input
    v-model="inputValue"
    :class="mainClass"
    @input="inputHandler"
    v-mask="mask"
  />
</template>

<script>
import DEFAULT_TYPE_VALUES from "../constants";

export default {
  name: "MyInput",
  props: {
    value: [String, Number],
    fullWidth: DEFAULT_TYPE_VALUES.BOOLEAN(),
    error: DEFAULT_TYPE_VALUES.BOOLEAN(),
    mask: String,
  },
  data() {
    return {
      inputValue: "",
    };
  },
  watch: {
    value: {
      immediate: true,
      handler(value) {
        this.inputValue = value || "";
      },
    },
  },
  computed: {
    mainClass() {
      return [
        {
          "full-width": this.fullWidth,
          error: this.error,
        },
      ];
    },
  },
  methods: {
    inputHandler() {
      this.$emit("input", this.inputValue);
    },
  },
};
</script>
