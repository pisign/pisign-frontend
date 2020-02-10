<template>
  <v-app>
    <v-content>
      <Grid :layout="layout"></Grid>
    </v-content>
  </v-app>
</template>

<script>
import Grid from './components/Grid.vue'


var testLayout = [
  {"x":0,"y":0,"w":2,"h":5,"i":"0", "type": "time"},
  {"x":2,"y":0,"w":2,"h":4,"i":"1", "type": "weather"},
  {"x":4,"y":0,"w":2,"h":5,"i":"2", "type": "weather"},
  {"x":6,"y":0,"w":2,"h":3,"i":"3", "type": "default"},
  {"x":8,"y":0,"w":2,"h":3,"i":"4", "type": "default"}
	];

export default {
  name: 'app',
  components: {
    Grid
  },
  data: function() {
    return {
      layout: testLayout
    }
  }
}
</script>
