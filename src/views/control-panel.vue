<template>
  <v-container class="pt-8">
    <v-layout justify-center>
      <v-flex xs11 sm10 md8 lg7 xl6>
        <div class="text-h6 grey--text text--darken-1">Bulk actions</div>
        <v-divider></v-divider>
        <div class="pt-3 mb-4 d-flex flex-wrap" style="gap: 12px">
          <v-btn
            text
            class="text-none px-0"
            small
            color="primary"
            @click="saveAll"
          >
            <v-icon class="me-1">mdi-content-save-outline</v-icon>
            Save all
          </v-btn>
          <v-btn
            text
            class="text-none px-0"
            small
            :color="allItemsOpened ? 'primary' : ''"
            @click="toggleOpenItems"
          >
            <v-icon class="me-1"
              >mdi-eye{{ allItemsOpened ? "-off" : "" }}-outline</v-icon
            >
            Toggle all
          </v-btn>
          <v-btn
            :disabled="!selectedItems.length"
            text
            class="text-none px-0"
            small
            color="error"
          >
            <v-icon class="me-1">mdi-trash-can-outline</v-icon>
            Delete selected
          </v-btn>
        </div>
        <div>
          <v-text-field
            v-model="searchQuery"
            full-width
            prepend-inner-icon="mdi-magnify"
            label="Filter"
            filled
            rounded
            class="rounded-sm"
            clearable
            single-line
          ></v-text-field>
        </div>
        <v-treeview
          v-model="selectedItems"
          ref="itemsTreeview"
          :items="items"
          color="primary"
          hoverable
          selectable
          selected-color="primary"
          :search="searchQuery"
          class="order-select-box-last"
          transition
          expand-icon="mdi-keyboard-backspace mdi-rotate-270"
          :open.sync="openedItems"
        >
          <template #label="{ item }">
            <v-text-field
              v-model="item.name"
              :id="`item-${item.id}`"
              rounded
              dense
              class="rounded-sm"
              hide-details
              outlined
              single-line
              label="Write name..."
              @keypress.enter="createChild(item)"
              @keydown.up="navigateTreeItem($event, 'up')"
              @keydown.down="navigateTreeItem($event, 'down')"
            ></v-text-field>
          </template>
        </v-treeview>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import items from "@/assets/js/items.js";
export default {
  data: () => ({
    searchQuery: "",
    items,
    selectedItems: [],
    allItemsOpened: false,
    openedItems: [],
  }),
  computed: {},
  watch: {
    items: {
      handler() {
        this.checkEmptyEnd();
      },
      deep: true,
    },
  },
  mounted() {
    this.checkEmptyEnd();
  },
  methods: {
    emptyItem() {
      const randomId = () => {
        const x = Math.ceil(Math.random() * 99999999999);
        return x;
      };
      const newItem = {
        id: randomId(),
        name: "",
        children: [],
      };
      return newItem;
    },
    checkEmptyEnd() {
      const items = this.items;
      const checkItems = (childs) => {
        if (Array.isArray(childs)) {
          childs.forEach((item, i) => {
            if (i === childs.length - 1 && item.name?.trim().length > 0) {
              const newItem = this.emptyItem();
              childs.push({ ...newItem });
            }
            if (item.children?.length > 0) {
              checkItems(item.children);
            }
          });
        }
      };
      checkItems(items);
    },
    toggleOpenItems() {
      this.$set(this, "allItemsOpened", !this.allItemsOpened);
      this.$refs.itemsTreeview.updateAll(this.allItemsOpened);
    },
    saveAll() {},
    // eslint-disable-next-line
    navigateTreeItem(e, direction) {
      const parent = e.target.closest(".v-treeview-node");
      let siblingParent = null;
      if (direction === "up") {
        siblingParent = parent.previousSibling;
      } else {
        siblingParent = parent.nextSibling;
      }
      if (siblingParent) {
        const input = siblingParent.querySelector("input");
        if (input) {
          input.focus();
          setTimeout(function () {
            input.selectionStart = input.selectionEnd = input.value.length;
          }, 0);
        }
      }
    },
    createChild(item) {
      const newItem = this.emptyItem();
      if (!item.children) {
        item.children = [];
      }
      item.children.push({ ...newItem });
      const createdItem = item.children[item.children.length - 1];
      if (!this.openedItems.includes(item.id)) {
        this.openedItems.push(item.id);
      }
      setTimeout(() => {
        const createdItemEl = document.getElementById(`item-${createdItem.id}`);
        if (createdItemEl) {
          createdItemEl.focus();
        }
      }, 100);
    },
  },
};
</script>
