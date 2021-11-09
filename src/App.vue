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
    async onFormSubmitHandler(data) {
      this.isPending = true;
      try {
        await api.sendData(data);
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
