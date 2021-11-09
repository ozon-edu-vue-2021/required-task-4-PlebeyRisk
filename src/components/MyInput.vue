<template>
  <input v-model="inputValue" :class="mainClass" @input="inputHandler" />
</template>

<script>
export default {
  name: "MyInput",
  props: {
    value: [String, Number],
    fullWidth: {
      type: Boolean,
      default: false,
    },
    error: {
      type: Boolean,
      default: false,
    },
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
