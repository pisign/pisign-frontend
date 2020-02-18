<template>
  <v-container class="ma-1" fluid>
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
                     @move="sendNewPosition(-1)"
                     @moved="sendNewPosition(index)"
                     @resize="sendNewPosition(-1)"
                     @resized="sendNewPosition(index)"
                     class = "v-card v-sheet theme--light blue lighten-4"
                     >
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
      positionUpdate : 0
    }
  },
  components: {
      GridLayout: VueGridLayout.GridLayout,
      GridItem: VueGridLayout.GridItem,
      Widget: Widget
  }, methods : {
    changeConfig : function(data) {
      this.$emit('changeConfig', data);
    },
    sendNewPosition : function(data) {
      this.positionUpdate = data;
    }
  }
}
</script>
