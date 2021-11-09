<template>
  <DatePicker
    :class="mainClass"
    v-model="dateValue"
    valueType="YYYY-MM-DD"
    format="DD.MM.YYYY"
    @change="changeDateHandler"
  >
    <template #input="{ props, events }">
      <input
        v-bind="props"
        v-on="events"
        v-mask="'##.##.####'"
        :class="$style.input"
      />
    </template>
  </DatePicker>
</template>

<script>
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";
import "vue2-datepicker/locale/ru";
import DEFAULT_TYPE_VALUES from "../constants";

export default {
  name: "MyDatePicker",
  components: {
    DatePicker,
  },
  props: {
    value: [String, Date, Number],
    fullWidth: DEFAULT_TYPE_VALUES.BOOLEAN(),
    error: DEFAULT_TYPE_VALUES.BOOLEAN(),
  },
  model: {
    prop: "value",
    event: "change",
  },
  data() {
    return {
      inputValue: null,
      dateValue: null,
      isShowPanel: false,
    };
  },
  watch: {
    value: {
      immediate: true,
      handler(value) {
        this.inputValue = value || null;
      },
    },
  },
  computed: {
    mainClass() {
      return [
        this.$style["my-date-picker"],
        {
          "full-width": this.fullWidth,
          [this.$style.error]: this.error,
        },
      ];
    },
  },
  methods: {
    changeDateHandler(value) {
      this.$emit("change", value);
    },
  },
};
</script>

<style module>
.input {
  border: 2px solid var(--gray-300-color);
  border-radius: 5px;
  height: 45px;
  padding: 0 5px;
  font-size: 16px;
  line-height: 16px;
  width: 100%;
}
.input:hover {
  border-color: var(--gray-300-color);
}
.input:focus {
  border-color: var(--primary-color);
}
.my-date-picker.error .input,
.my-date-picker.error .input:hover,
.my-date-picker.error .input:focus {
  border-color: var(--error-color);
}
</style>
