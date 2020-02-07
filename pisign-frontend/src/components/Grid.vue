<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <h1>Grid</h1>
      </v-col>
    </v-row>
    <GridLayout
        :layout.sync="layout"
        :col-num="12"
        :row-height="30"
        :is-draggable="true"
        :is-resizable="true"
        :is-mirrored="false"
        :vertical-compact="true"
        :margin="[10, 10]"
        :use-css-transforms="true"
        >
      <GridItem v-for="(item, index) in layout"
                     :x="item.x"
                     :y="item.y"
                     :w="item.w"
                     :h="item.h"
                     :i="item.i"
                     :key="item.i"
                     style="background: lightblue;"
                     >
              <div v-if="item.type === 'time'">
                <TimeWidget></TimeWidget>
              </div>
              <div v-else-if="item.type === 'default'">
                <v-row class="text-center">
                  <v-col cols="12">
                    {{ item.i }}
                  </v-col>
                </v-row>
              </div>
              <CloseButton :index="index" :layout="layout"></CloseButton>
      </GridItem>
    </GridLayout>
  </v-container>
</template>

<script>
import VueGridLayout from 'vue-grid-layout';
import CloseButton from './CloseButton.vue';
import TimeWidget from './TimeWidget.vue';
export default {
  name: 'Grid',
  props: [ 'layout' ],
  components: {
      GridLayout: VueGridLayout.GridLayout,
      GridItem: VueGridLayout.GridItem,
      CloseButton: CloseButton,
      TimeWidget: TimeWidget
  }
}
</script>
