import { isAfter, parseISO } from "date-fns";

export const cyrillic = {
  validate: (value) => {
    return /^[а-яА-яё]+$/i.test(value) || "Поле должно содержать только русские буквы";
  },
};

export const latin = {
  validate: (value) => {
    return /^[a-zA-Z]+$/i.test(value) || "Поле должно содержать только английские буквы";
  },
};

export const dateLess = {
  validate: (value) => {
    return (
      !isAfter(parseISO(value), Date.now()) ||
      "Дата не может быть позже текущей"
    );
  },
};
