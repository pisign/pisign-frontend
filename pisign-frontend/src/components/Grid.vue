<template>
    <div>
    <h1>Grid</h1>
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
            {{item.i}}
            <CloseButton :index="index" :layout="layout"></CloseButton>

    </GridItem>
    </GridLayout>
    </div>
</template>

<script>
import VueGridLayout from 'vue-grid-layout';
import CloseButton from './CloseButton.vue'
export default {
  name: 'Grid',
  props: [ 'layout' ],
  components: {
      GridLayout: VueGridLayout.GridLayout,
      GridItem: VueGridLayout.GridItem,
      CloseButton: CloseButton
  }
}
</script>
