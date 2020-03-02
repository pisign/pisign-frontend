<template>
  <v-container class="ma-1" fluid>
    <!-- Renders the grid layout information -->
    <GridLayout
        :layout.sync="layout"
        :col-num="12"
        :row-height="30"
        :is-draggable="edit"
        :is-resizable="edit"
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
                     :key="item.UUID"
                     @move="move"
                     @moved="moved"
                     @resize="resize"
                     @resized="resized"
                     class = "v-card v-sheet theme--light lighten-4"
                     :class = "widgetColors[index] ? widgetColors[index] : 'white'"
                     >
        <!-- Creates a new widget for each of the grid items and passes values -->
        <Widget @changeConfig="changeConfig"
                :layout="layout"
                :index="index"
                :edit="edit"
                :item="item"
                :uuid="item.UUID"
                :positionUpdate="positionUpdate"
        ></Widget>
      </GridItem>
    </GridLayout>
  </v-container>
</template>

<script>
import VueGridLayout from 'vue-grid-layout';
import Widget from './Widget.vue';
export default {
  name: 'Grid',
  props: {
    layout : {
      required: true
    }, edit:{
      required: true
    }
  }, data : function() {
    return {
      positionUpdate : {
        'uuid' : -1,
        'height' : 0,
        'width' : 0,
      },
      widgetColors : {

      }
    }
  },
  components: {
      GridLayout: VueGridLayout.GridLayout,
      GridItem: VueGridLayout.GridItem,
      Widget: Widget
  }, methods : {
    // Called when a widget changes the settings
    changeConfig : function(data) {
      this.widgetColors[data.index] = data.widgetColor
      this.$emit('changeConfig', data);
    },
    // Called when a widget moves or is resized
    move : function() {
      this.positionUpdate.uuid = -1;
    },
    moved : function(i) {
      this.positionUpdate.uuid = i;
    },
    resize : function(i, newH, newW, newHPx, newWPx){
      this.positionUpdate.uuid = -1;
      this.positionUpdate.height = newHPx;
      this.positionUpdate.width = newWPx;
    },
    resized : function(i, newH, newW, newHPx, newWPx){
      this.positionUpdate.uuid = i;
      this.positionUpdate.height = newHPx;
      this.positionUpdate.width = newWPx;
    },
  }
}
</script>
