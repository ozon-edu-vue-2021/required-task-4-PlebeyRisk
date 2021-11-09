<template>
  <div :class="mainClass" v-click-outside="onClickOutsideHandler">
    <div :class="$style.icons">
      <Loader
        v-show="isLoading"
        :class="[$style.loader, $style.icon]"
        color="#969696"
      ></Loader>
      <Icon
        :class="[$style['dropdown-icon'], $style.icon]"
        name="arrow-dropdown"
        color="#969696"
      ></Icon>
    </div>
    <input
      v-model="searchValue"
      :class="inputClass"
      @input="inputHandler"
      @focus="onFocusHandler"
    />
    <div v-show="isDropdownOpen" :class="$style.dropdown">
      <ul v-if="haveFilteredItems" :class="$style.list">
        <li
          v-for="item in filteredItems"
          :key="item[keyField]"
          :class="$style.item"
          @click="onItemClickHandler(item)"
        >
          {{ item[textField] }}
        </li>
      </ul>

      <div v-else :class="$style['empty-list']">Ничего не найдено</div>
    </div>
  </div>
</template>

<script>
import ClickOutside from "vue-click-outside";
import debounce from "lodash/debounce";
import { errorHandler } from "../error";
import Icon from "./Icon.vue";
import Loader from "./Loader.vue";
import api from "../utils/api";
import DEFAULT_TYPE_VALUES from "../constants";

export default {
  name: "RemoteSelect",
  components: {
    Icon,
    Loader,
  },
  directives: {
    ClickOutside,
  },
  model: {
    prop: "value",
    event: "change",
  },
  props: {
    value: {
      type: [Array, Object],
      default: () => [],
    },
    fullWidth: DEFAULT_TYPE_VALUES.BOOLEAN(),
    textField: {
      type: String,
      default: "name",
    },
    keyField: {
      type: String,
      default: "id",
    },
    apiEntity: String,
    error: DEFAULT_TYPE_VALUES.BOOLEAN(),
  },
  data() {
    return {
      searchValue: "",
      selectedItems: [],
      isDropdownOpen: false,
      items: [],
      debouncedLoadItems: null,
      isLoading: false,
      lastSearch: null,
    };
  },
  watch: {
    value: {
      immediate: true,
      handler(value) {
        if (value && typeof value !== "object") return;
        this.setSelected(value);
      },
    },
  },
  computed: {
    mainClass() {
      return [
        this.$style.select,
        {
          [this.$style.show]: this.isDropdownOpen,
          "full-width": this.fullWidth,
        },
      ];
    },
    inputClass() {
      return [
        this.$style.input,
        {
          error: this.error,
        },
      ];
    },
    haveFilteredItems() {
      return this.filteredItems?.length;
    },
    filteredItems() {
      return this.items.filter((item) => !this.isItemSelected(item));
    },
    lastSelectedItem() {
      return this.selectedItems
        ? this.selectedItems[this.selectedItems.length - 1]
        : null;
    },
  },
  created() {
    this.debouncedLoadItems = debounce(this.loadItems, 500);
    this.debouncedLoadItems();
  },
  methods: {
    setSelected(item) {
      if (item && this.isItemSelected(item)) return;
      this.selectedItems = item ? [item] : [];
      this.searchValue = item ? item[this.textField] : "";
      if (!this.debouncedLoadItems) {
        this.loadItems?.();
      } else {
        this.debouncedLoadItems();
      }
      this.$emit("change", item);
    },
    showDropdown() {
      this.debouncedLoadItems();
      this.isDropdownOpen = true;
    },
    hideDropdown() {
      this.isDropdownOpen = false;
    },
    onFocusHandler() {
      this.showDropdown();
    },
    onClickOutsideHandler() {
      this.hideDropdown();
      if (this.selectedItems?.length) {
        this.searchValue = this.lastSelectedItem?.[this.textField];
      }
    },
    onItemClickHandler(clickedItem) {
      this.setSelected(clickedItem);
      this.hideDropdown();
    },
    isItemSelected(selectedItem) {
      const foundedItem = this.selectedItems.find(
        (item) =>
          item[this.keyField] === selectedItem[this.keyField] ||
          item[this.textField] === selectedItem[this.textField]
      );
      return !!foundedItem;
    },
    async loadItems() {
      if (!this.apiEntity?.length) {
        this.items = [];
      }

      const isEqualSelectedValue = this.selectedItems?.length
        ? this.lastSelectedItem?.[this.textField] === this.searchValue
        : false;

      const searchVal = isEqualSelectedValue ? "" : this.searchValue;

      if (this.lastSearch === searchVal) return;

      this.isLoading = true;

      try {
        this.items = (await api[this.apiEntity]?.(searchVal)) || [];
        this.lastSearch = searchVal;
      } catch (error) {
        this.$notifyError(`Ошибка загрузки данных ${this.apiEntity}`);
        errorHandler(error);
      }

      this.isLoading = false;
    },
    inputHandler() {
      this.debouncedLoadItems();
    },
  },
};
</script>

<style module>
.select {
  position: relative;
  display: inline-block;
}
.input {
  width: 100%;
  position: relative;
  padding-right: 55px;
}
.dropdown {
  width: 100%;
  position: absolute;
  top: 47px;
  left: 0;
  background-color: var(--white-color);
  box-shadow: 0 0 5px 5px rgba(0, 0, 0, 0.05);
  z-index: 100;
  border: 1px solid var(--gray-300-color);
  border-radius: 5px;
}
.list {
  padding: 0;
  margin: 0;
  list-style: none;
}
.item {
  padding: 10px 15px;
  user-select: none;
  cursor: pointer;
}
.item:hover {
  background-color: var(--primary-lighten-color);
}
.empty-list {
  padding: 15px 10px;
}
.icons {
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  align-items: center;
  z-index: 2;
  height: 100%;
}
.icon {
  margin-right: 5px;
}
.icon:last-child {
  margin-right: 0;
}
.dropdown-icon {
  transition: transform 200ms ease-in-out;
}
.select.show .dropdown-icon {
  transform: rotate(-180deg);
}
</style>
