<template>
  <v-container>
    <div>
      <v-btn
        v-if="activeItem.length > 1"
        text
        :to="`/${activeItem.substring(0, activeItem.length - 2)}`"
      >
        <v-icon class="me-2">mdi-keyboard-backspace</v-icon>
        Back
      </v-btn>
    </div>
    <div class="mt-16">
      <v-row>
        <template v-for="(item, i) in itemFiltered">
          <v-col :key="i" cols="6" sm="6" md="4" lg="3" xl="2">
            <v-slide-y-transition hide-on-leave>
              <v-card
                v-if="showCard"
                height="100%"
                width="100%"
                style="box-shadow: 2px 4px 10px #ddd"
                rounded="lg"
                class="pt-4"
                :to="
                  item.children && item.children.length > 0
                    ? `/${activeItem}${item.id}-`
                    : null
                "
              >
                <v-img
                  height="150"
                  width="100%"
                  contain
                  :src="
                    item.img ? require(`@/assets/images/${item.img}.jpg`) : ''
                  "
                >
                  <v-layout align-end fill-height> </v-layout>
                </v-img>
                <v-card-title
                  style="word-break: break-word"
                  class="d-block text-center"
                  :class="{ 'text-body-1': $vuetify.breakpoint.xs }"
                >
                  {{ item.name }}
                </v-card-title>
              </v-card>
            </v-slide-y-transition>
          </v-col>
        </template>
      </v-row>
    </div>
  </v-container>
</template>

<script>
import items from "@/assets/js/items.js";
export default {
  name: "Home",
  components: {},
  data: () => ({
    items,
    showCard: true,
  }),
  computed: {
    itemFiltered() {
      let filteredItems = [];
      const items = this.items;
      const activeItem = this.activeItem;
      if (!activeItem) {
        filteredItems = [...items];
      } else {
        const splitter = activeItem.split("-");
        splitter.forEach((index) => {
          if (index) {
            const i = parseInt(index);
            filteredItems = [...items.find((item) => item.id === i).children];
          }
        });
      }
      return filteredItems;
    },
    activeItem() {
      return this.$route.params.id || "";
    },
  },
  watch: {
    itemFiltered: {
      handler() {
        this.$set(this, "showCard", false);
        setTimeout(() => {
          this.$set(this, "showCard", true);
        }, 100);
      },
      deep: true,
    },
  },
};
</script>
