<template>
  <div id="app">
    <notifications group="main" />
    <Form ref="form" :loading="isPending" @submit="onFormSubmitHandler" />
  </div>
</template>

<script>
import Form from "./components/Form/Form.vue";
import api from "./utils/api";
import { errorHandler } from "./error";
import omitBy from "lodash/omitBy";
import isEmpty from "lodash/isEmpty";

export default {
  name: "App",
  components: {
    Form,
  },
  data() {
    return {
      isPending: false,
    };
  },
  methods: {
    resetForm() {
      const resetFormFunc = this.$refs.form?.reset;
      if (!resetFormFunc || typeof resetFormFunc !== "function") return;
      resetFormFunc();
    },
    prepareDataForSending(data) {
      let result = { ...data };
      if (result?.passport) {
        result.passport = omitBy(result.passport, isEmpty);
      }
      if (result?.previous) {
        result.previous = omitBy(result.previous, isEmpty);
      }
      return omitBy(result, isEmpty);
    },
    async onFormSubmitHandler(data) {
      this.isPending = true;
      try {
        await api.sendData(this.prepareDataForSending(data));
        this.resetForm();
        this.$notify({
          group: "main",
          type: "success",
          text: "Данные успешно отправлены",
        });
      } catch (error) {
        this.$notify({
          group: "main",
          type: "error",
          text: "Ошибка отправки данных",
        });
        this.$notifyError("Ошибка отправки данных: ", error);
        errorHandler(error);
      }
      this.isPending = false;
    },
  },
};
</script>

<style>
#app {
  color: #2c3e50;
  background-color: #fff;
  padding: 24px;
  box-sizing: border-box;
}

html,
body,
#app {
  font-family: Arial, Helvetica, sans-serif;
}

* {
  box-sizing: border-box;
}
</style>
