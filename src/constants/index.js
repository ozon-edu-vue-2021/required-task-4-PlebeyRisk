const DEFAULT_TYPE_VALUES = {
  ARRAY(defaultValue = () => []) {
    return {
      type: Array,
      default: defaultValue,
    };
  },
  OBJECT(defaultValue = () => ({})) {
    return {
      type: Object,
      default: defaultValue,
    };
  },
  BOOLEAN(defaultValue = false) {
    return {
      type: Boolean,
      default: defaultValue,
    };
  },
};

export default DEFAULT_TYPE_VALUES;
