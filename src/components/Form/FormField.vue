<template>
  <div :class="$style['form-field']">
    <span v-if="haveTitle" :class="$style.title">{{ title }}</span>
    <ValidationProvider
      v-if="$scopedSlots.default"
      v-slot="veeContext"
      :class="$style.content"
      tag="div"
      :name="name"
      :rules="rules"
    >
      <slot v-bind="veeContext"></slot>
      <FieldError :errors="[...($attrs.errors || []), ...veeContext.errors]" />
    </ValidationProvider>
  </div>
</template>

<script>
import { ValidationProvider } from "vee-validate";
import FieldError from "./FieldError";

export default {
  name: "FormField",
  components: {
    FieldError,
    ValidationProvider,
  },
  props: {
    title: String,
    rules: [String, Object],
    name: String,
  },
  computed: {
    haveTitle() {
      return this.title?.length;
    },
  },
};
</script>

<style module>
.form-field {
  flex: 1 0 100px;
  display: inline-flex;
  flex-direction: column;
}
.title {
  font-size: 18px;
  line-height: 18px;
  color: var(--gray-500-color);
  white-space: nowrap;
  text-overflow: ellipsis;
}
.content {
  margin-top: 10px;
}
</style>
