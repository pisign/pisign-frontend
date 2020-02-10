<template>
  <v-container class="ma-1">
    <GridLayout
        :layout.sync="layout"
        :col-num="12"
        :row-height="30"
        :is-draggable="is_draggable"
        :is-resizable="is_resizable"
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
                     class = "v-card v-sheet theme--light blue lighten-4"
                     >
        <CloseButton v-if="is_draggable" :index="index" :layout="layout"></CloseButton>

        <v-card-text class="pa-0">
          <div v-if="item.type === 'time'">
            <TimeWidget></TimeWidget>
          </div>
          <div v-if="item.type === 'weather'">
            <WeatherWidget :widgetID="item.i"></WeatherWidget>
          </div>
          <div v-else-if="item.type === 'default'">
            <v-row class="text-center">
              <v-col cols="12">
                {{ item.i }}
              </v-col>
            </v-row>
          </div>
        </v-card-text>
      </GridItem>
    </GridLayout>
  </v-container>
</template>

<script>
import VueGridLayout from 'vue-grid-layout';
import CloseButton from './CloseButton.vue';
import TimeWidget from './TimeWidget.vue';
import WeatherWidget from './WeatherWidget.vue';
export default {
  name: 'Grid',
  props: {
    layout : {
      required: true
    }, is_draggable:{
      required: true
    }, is_resizable: {
      required: true
    }
  },
  components: {
      GridLayout: VueGridLayout.GridLayout,
      GridItem: VueGridLayout.GridItem,
      CloseButton: CloseButton,
      TimeWidget: TimeWidget,
      WeatherWidget: WeatherWidget
  }
}
</script>
