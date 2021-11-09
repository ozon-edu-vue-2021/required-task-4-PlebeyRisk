<template>
  <div :class="$style['field-errors']">
    {{ error }}
  </div>
</template>

<script>
export default {
  name: "FieldError",
  props: {
    errors: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    error() {
      return this.errors?.length ? this.errors[this.errors.length - 1] : "";
    },
  },
};
</script>

<style module>
.field-errors {
  margin-top: 5px;
  font-size: 12px;
  color: var(--error-color);
  min-height: 13px;
}
</style>
