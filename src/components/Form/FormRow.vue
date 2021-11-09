<template>
  <div :class="$style.row">
    <div :class="$style.content">
      <slot></slot>
    </div>
    <div v-if="$scopedSlots.description" :class="$style.description">
      <slot name="description"></slot>
    </div>
  </div>
</template>

<style module>
.row {
}
.content {
  display: flex;
}
.description {
  margin-top: 10px;
  font-size: 14px;
  line-height: 18px;
  color: var(--gray-400-color);
}
</style>
