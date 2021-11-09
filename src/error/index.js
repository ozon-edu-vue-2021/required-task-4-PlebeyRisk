export const notifyError = (message) => {
  console.error(message);
};

export const errorHandler = (error) => {
  // что-то обрабатывает
  return error;
};

export default {
  notifyError,
  errorHandler,
};
