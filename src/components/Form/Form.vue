<template>
  <ValidationObserver
    ref="form"
    v-slot="{ validate, failed }"
    :class="$style.form"
    tag="div"
  >
    <form @submit.prevent="onSubmit(validate)">
      <div :class="$style.content">
        <FormGroup title="Личные данные">
          <FormRow :class="$style.row">
            <FormField
              v-slot="{ errors }"
              :class="$style['form-field']"
              title="Фамилия"
              name="surname"
              :rules="fieldRules.surname"
            >
              <MyInput
                v-model="data.surname"
                fullWidth
                :error="!!errors.length"
              />
            </FormField>
            <FormField
              v-slot="{ errors }"
              :class="$style['form-field']"
              title="Имя"
              name="name"
              :rules="fieldRules.name"
            >
              <MyInput v-model="data.name" fullWidth :error="!!errors.length" />
            </FormField>
            <FormField
              v-slot="{ errors }"
              :class="$style['form-field']"
              title="Отчество"
              name="patronymic"
              :rules="fieldRules.patronymic"
            >
              <MyInput
                v-model="data.patronymic"
                fullWidth
                :error="!!errors.length"
              />
            </FormField>
          </FormRow>
          <FormRow :class="$style.row">
            <FormField
              v-slot="{ errors }"
              title="Дата рождения"
              name="birthdate"
              :rules="fieldRules.birthdate"
            >
              <MyDatePicker v-model="data.birthdate" :error="!!errors.length" />
            </FormField>
          </FormRow>
          <FormRow :class="$style.row">
            <FormField
              v-slot="{ errors }"
              title="E-mail"
              name="email"
              :rules="fieldRules.email"
            >
              <MyInput
                v-model="data.email"
                fullWidth
                :error="!!errors.length"
              />
            </FormField>
          </FormRow>
          <FormRow :class="$style.row">
            <FormField
              v-slot="{ errors }"
              title="Пол"
              name="gender"
              :rules="fieldRules.gender"
            >
              <RadioButtonGroup
                v-model="data.gender"
                :items="genderTypes"
                name="gender"
                :error="!!errors.length"
              />
            </FormField>
          </FormRow>
        </FormGroup>
        <FormGroup title="Паспортные данные">
          <FormRow :class="$style.row">
            <FormField
              v-slot="{ errors }"
              :class="$style['form-field']"
              title="Гражданство"
              name="nationality"
              :rules="fieldRules.nationality"
            >
              <RemoteSelect
                v-model="data.nationality"
                apiEntity="citizenships"
                textField="nationality"
                fullWidth
                :error="!!errors.length"
                @change="onNationalityChangeHandler"
              />
            </FormField>
            <div :class="[$style['empty-field'], $style['form-field']]"></div>
          </FormRow>
          <FormRow v-if="isRussian" :class="$style.row">
            <div :class="[$style['empty-field'], $style['form-field']]">
              <FormField
                v-slot="{ errors }"
                :class="$style['form-field']"
                title="Серия паспорта"
                name="passportSeries"
                :rules="fieldRules.passport.series"
              >
                <MyInput
                  v-model="data.passport.series"
                  fullWidth
                  :error="!!errors.length"
                  mask="####"
                />
              </FormField>
              <FormField
                v-slot="{ errors }"
                :class="$style['form-field']"
                title="Номер паспорта"
                name="passportNumber"
                :rules="fieldRules.passport.number"
              >
                <MyInput
                  v-model="data.passport.number"
                  fullWidth
                  :error="!!errors.length"
                  mask="######"
                />
              </FormField>
            </div>
            <FormField
              v-slot="{ errors }"
              :class="$style['form-field']"
              title="Дата выдачи"
              name="passportDateIssue"
              :rules="fieldRules.passport.dateIssue"
            >
              <MyDatePicker
                v-model="data.passport.dateIssue"
                fullWidth
                :error="!!errors.length"
              />
            </FormField>
          </FormRow>
          <template v-else-if="showForeignPassportBlock">
            <FormRow :class="$style.row">
              <FormField
                v-slot="{ errors }"
                :class="$style['form-field']"
                title="Фамилия на латинице"
                name="passportSurname"
                :rules="fieldRules.passport.surname"
              >
                <MyInput
                  v-model="data.passport.surname"
                  fullWidth
                  :error="!!errors.length"
                />
              </FormField>
              <FormField
                v-slot="{ errors }"
                :class="$style['form-field']"
                title="Имя на латинице"
                name="passportName"
                :rules="fieldRules.passport.name"
              >
                <MyInput
                  v-model="data.passport.name"
                  fullWidth
                  :error="!!errors.length"
                />
              </FormField>
              <template #description>
                Иностранцы заполняют латинскими буквами. Например, Ivanov Ivan
              </template>
            </FormRow>
            <FormRow :class="$style.row">
              <div :class="[$style['empty-field'], $style['form-field']]">
                <FormField
                  v-slot="{ errors }"
                  :class="$style['form-field']"
                  title="Номер паспорта"
                  name="passportNumber"
                  :rules="fieldRules.passport.number"
                >
                  <MyInput
                    v-model="data.passport.number"
                    fullWidth
                    :error="!!errors.length"
                  />
                </FormField>
                <FormField
                  v-slot="{ errors }"
                  :class="$style['form-field']"
                  title="Страна выдачи"
                  name="passportCountry"
                  :rules="fieldRules.passport.country"
                >
                  <RemoteSelect
                    v-model="data.passport.country"
                    apiEntity="countries"
                    textField="name"
                    fullWidth
                    :error="!!errors.length"
                  />
                </FormField>
              </div>
              <FormField
                v-slot="{ errors }"
                :class="$style['form-field']"
                title="Тип паспорта"
                name="passportType"
                :rules="fieldRules.passport.type"
              >
                <RemoteSelect
                  v-model="data.passport.type"
                  apiEntity="passportTypes"
                  textField="type"
                  fullWidth
                  :error="!!errors.length"
                />
              </FormField>
            </FormRow>
          </template>
          <FormRow :class="$style.row">
            <FormField title="Меняли ли фамилию или имя?">
              <RadioButtonGroup
                :value="Number(isChangeName)"
                name="changeName"
                @change="onChangeNameHandler"
              />
            </FormField>
          </FormRow>
          <FormRow
            v-if="isChangeName"
            :class="[$style.row, $style['change-name']]"
            :rules="fieldRules.previous.surname"
          >
            <FormField
              v-slot="{ errors }"
              :class="$style['form-field']"
              title="Фамилия"
              name="previousSurname"
              :rules="fieldRules.previous.surname"
            >
              <MyInput
                :class="$style.input"
                v-model="data.previous.surname"
                fullWidth
                :error="!!errors.length"
              />
            </FormField>
            <FormField
              v-slot="{ errors }"
              :class="$style['form-field']"
              title="Имя"
              name="previousName"
              :rules="fieldRules.previous.name"
            >
              <MyInput
                :class="$style.input"
                v-model="data.previous.name"
                fullWidth
                :error="!!errors.length"
              />
            </FormField>
          </FormRow>
        </FormGroup>
      </div>

      <FormRow :class="$style.row">
        <div :class="$style.actions">
          <MyButton :loading="isLoading" :error="failed">Отправить</MyButton>
        </div>
      </FormRow>
    </form>
  </ValidationObserver>
</template>

<script>
import { ValidationObserver } from "vee-validate";
import cloneDeep from "lodash/cloneDeep";
import MyDatePicker from "../MyDatePicker.vue";
import RemoteSelect from "../RemoteSelect.vue";
import FormField from "../Form/FormField.vue";
import FormGroup from "../Form/FormGroup.vue";
import FormRow from "../Form/FormRow.vue";
import MyInput from "../MyInput.vue";
import MyButton from "../MyButton.vue";
import RadioButtonGroup from "../RadioButtonGroup.vue";
import DEFAULT_TYPE_VALUES from "../../constants";

const DEFAULT_DATA = {
  name: "",
  surname: "",
  patronymic: "",
  birthdate: null,
  gender: "M",
  nationality: null,
  email: "",
  passport: {
    type: null,
    series: "",
    number: "",
    dateIssue: null,
    name: "",
    surname: "",
    country: null,
  },
  previous: {
    name: "",
    surname: "",
  },
};

export default {
  name: "Form",
  components: {
    RemoteSelect,
    FormField,
    FormGroup,
    FormRow,
    ValidationObserver,
    MyDatePicker,
    RadioButtonGroup,
    MyInput,
    MyButton,
  },
  props: {
    loading: DEFAULT_TYPE_VALUES.BOOLEAN(),
  },
  data() {
    return {
      isChangeName: false,
      data: this.getDefaultData(),
      genderTypes: [
        { value: "M", text: "Мужской" },
        { value: "F", text: "Женский" },
      ],
    };
  },
  computed: {
    isRussian() {
      return this.data?.nationality?.nationality === "Russia";
    },
    showForeignPassportBlock() {
      return !this.isRussian && !!this.data?.nationality;
    },
    isLoading() {
      return this.loading;
    },
    fieldRules() {
      return {
        name: "cyrillic|required",
        surname: "cyrillic|required",
        patronymic: "cyrillic",
        birthdate: "required|dateLess",
        email: "email",
        passport: {
          series: "digits:4",
          number: this.showForeignPassportBlock ? "" : "digits:6",
          name: "latin",
          surname: "latin",
        },
        previous: this.isChangeName
          ? {
              name: `required|${
                this.showForeignPassportBlock ? "latin" : "cyrillic"
              }`,
              surname: `required|${
                this.showForeignPassportBlock ? "latin" : "cyrillic"
              }`,
            }
          : {},
      };
    },
    defaultData() {
      let data = cloneDeep(DEFAULT_DATA);
      if (!this.data?.nationality) {
        delete data.passport;
      } else if (this.showForeignPassportBlock) {
        delete data.passport.series;
        delete data.passport.dateIssue;
      } else {
        delete data.passport.country;
        delete data.passport.type;
        delete data.passport.surname;
        delete data.passport.name;
      }
      return data;
    },
  },
  methods: {
    getDefaultData() {
      const cloneData = cloneDeep(this.defaultData || DEFAULT_DATA);
      if (!this.isChangeName) {
        delete cloneData.previous;
      }
      if (!this.data?.nationality) {
        delete cloneData.passport;
      }
      return cloneData;
    },
    reset() {
      this.isChangeName = false;
      this.data = this.getDefaultData();
      this.$refs.form?.reset?.();
    },
    async onSubmit(validate) {
      if (!validate) return;

      const isFormValid = await validate();

      if (!isFormValid) {
        this.$notify({
          group: "main",
          type: "error",
          text: "Необходимо заполнить все поля правильно",
        });
        return;
      }

      this.$emit("submit", this.data);
    },
    onChangeNameHandler(value) {
      if (value) {
        this.data = {
          ...this.data,
          previous: { ...this.defaultData.previous },
        };
      }
      this.isChangeName = !!value;
      if (!value) {
        delete this.data.previous;
      }
    },
    onNationalityChangeHandler(e) {
      let newData = {
        ...this.data,
        passport: { ...this.defaultData.passport },
        previous: { ...this.defaultData.previous },
      };
      if (!this.isChangeName) {
        delete newData.previous;
      }
      this.data = newData;
    },
  },
};
</script>

<style module>
.form {
}
.row {
  margin-bottom: 25px;
}
.row:last-child {
  margin-bottom: 0;
}
.row .form-field {
  margin-right: 25px;
}
.row .form-field:last-child {
  margin-right: 0;
}
.content {
  margin-bottom: 100px;
}
.actions {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.empty-field {
  flex: 1 0 100px;
  display: flex;
}
</style>
