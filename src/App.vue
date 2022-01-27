<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" app :right="$vuetify.rtl">
      <div class="text-center">
        <v-avatar tile size="180" height="100">
          <v-img contain :src="require('@/assets/images/logo.jpg')"></v-img>
        </v-avatar>
      </div>
      <v-list>
        <template v-for="(item, i) in items">
          <v-list-group :key="i">
            <template v-slot:activator>
              <v-list-item-title>
                {{ item.name }}
              </v-list-item-title>
            </template>
            <template v-for="(child, ci) in item.childs">
              <v-list-item :key="ci" link>
                <v-list-item-content>
                  <v-list-item-title>
                    {{ child.name }}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </template>
          </v-list-group>
        </template>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-app-bar-title v-if="!$vuetify.breakpoint.xs" class="mr-12">
        Medical Devices
      </v-app-bar-title>
      <v-toolbar-items
        class="pt-1 flex-grow-1"
        :class="{ 'pt-2': $vuetify.breakpoint.smAndDown }"
      >
        <v-autocomplete
          v-model="searchQuery"
          filled
          rounded
          class="rounded-sm"
          label="Search..."
          single-line
          full-width
          prepend-inner-icon="mdi-magnify"
          :dense="$vuetify.breakpoint.smAndDown"
          :items="searchValues"
        ></v-autocomplete>
      </v-toolbar-items>
    </v-app-bar>
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import items from "@/assets/js/items.js";
export default {
  name: "App",
  data: () => ({
    drawer: null,
    searchQuery: "",
    items,
  }),
  computed: {
    searchValues() {
      const items = this.items;
      const values = [];
      const pushItem = (arr) => {
        arr.forEach((item) => {
          values.push(item.name);
          if (item.childs?.length > 0) {
            pushItem(item.childs);
          }
        });
      };
      pushItem(items);
      return values;
    },
  },
};
</script>
