<template>
  <div :class="$style['field-errors']">
    {{ error }}
  </div>
</template>

<script>
import DEFAULT_TYPE_VALUES from "../../constants";

export default {
  name: "FieldError",
  props: {
    errors: DEFAULT_TYPE_VALUES.ARRAY(),
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
