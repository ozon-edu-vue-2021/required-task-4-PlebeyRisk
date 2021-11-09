<template>
  <div :class="$style['radio-button-group']">
    <template v-for="item in items">
      <span :class="itemClass(item)" :key="item[keyField]">
        <input
          :class="$style.input"
          type="radio"
          :name="name"
          :value="item[keyField]"
          :id="item[keyField]"
          v-model="inputValue"
          @change="onChangeHandler"
        />

        <label :class="$style.label" :for="item[keyField]">
          <span :class="$style.icon"></span>
          {{ item[textField] }}
        </label>
      </span>
    </template>
  </div>
</template>

<script>
export default {
  name: "RadioButtonGroup",
  model: {
    prop: "value",
    event: "change",
  },
  props: {
    value: {
      type: [Boolean, String, Number],
      default: "false",
    },
    name: {
      type: String,
      default: "group",
    },
    items: {
      type: Array,
      default: () => [
        { text: "Нет", value: 0 },
        { text: "Да", value: 1 },
      ],
    },
    textField: {
      type: String,
      default: "text",
    },
    keyField: {
      type: String,
      default: "value",
    },
  },
  data() {
    return {
      inputValue: null,
    };
  },
  watch: {
    value: {
      immediate: true,
      handler(value) {
        this.initValue(value);
      },
    },
  },
  methods: {
    initValue(value) {
      this.inputValue = value;
    },
    itemClass(item) {
      return [
        this.$style.item,
        {
          [this.$style.active]: this.isActive(item),
        },
      ];
    },
    isActive(item) {
      return item[this.keyField] === this.inputValue;
    },
    onChangeHandler() {
      this.$emit("change", this.inputValue);
    },
  },
};
</script>

<style module>
.radio-button-group {
  display: flex;
  align-items: center;
}
.input {
  display: none;
}
.label {
  display: flex;
  align-items: center;
  font-size: 18px;
  line-height: 18px;
  cursor: pointer;
  padding: 5px 0;
}
.item {
  display: flex;
  margin-right: 30px;
}
.item:last-child {
  margin-right: 0;
}
.icon {
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 2px solid var(--gray-300-color);
  border-radius: 50%;
  background-color: var(--white-color);
  margin-right: 10px;
}
.item.active .icon {
  border: 4px solid var(--primary-color);
}
</style>
