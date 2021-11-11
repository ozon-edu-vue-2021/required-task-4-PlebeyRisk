<template>
  <div :class="$style['form-group']">
    <span v-if="haveTitle" :class="$style.title">{{ title }}</span>
    <div :class="$style.content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "FormGroup",
  props: {
    title: String,
  },
  computed: {
    haveTitle() {
      return this.title?.length;
    },
  },
};
</script>

<style module>
.form-group {
}
.title {
  color: var(--black-700-color);
  font-size: 22px;
  line-height: 28px;
}
.content {
  padding: 20px 0;
}
</style>
