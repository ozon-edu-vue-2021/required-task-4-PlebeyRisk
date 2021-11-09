<template>
  <DatePicker
    :class="mainClass"
    v-model="inputValue"
    format="DD.MM.YYYY"
    valueType="YYYY-MM-DD"
    placeholder="дд.мм.гггг"
    @change="changeDateHandler"
  />
</template>

<script>
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";
import "vue2-datepicker/locale/ru";
import "../assets/css/datepicker.css";

export default {
  name: "MyDatePicker",
  components: {
    DatePicker,
  },
  props: {
    value: [String, Date, Number],
    fullWidth: {
      type: Boolean,
      default: false,
    },
    error: {
      type: Boolean,
      default: false,
    },
  },
  model: {
    prop: "value",
    event: "change",
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
        this.inputValue = value || null;
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
    changeDateHandler() {
      this.$emit("change", this.inputValue);
    },
  },
};
</script>
