<template>
  <v-app>
    <v-app-bar dense color="green" app>
      <v-toolbar-title>PiSign</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click="editMode">
        <v-icon>mdi-pencil-outline</v-icon>
      </v-btn>
    </v-app-bar>
    <v-content>
      <v-sheet>
        <Grid :layout="layout" :edit="edit"></Grid>
        <v-btn v-if="edit" color="pink" dark fixed bottom right fab @click="addWidget">
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </v-sheet>
    </v-content>

  </v-app>
</template>

<script>
import Grid from './components/Grid.vue'


var testLayout = [
  {"x":0,"y":0,"w":2,"h":5,"i":"0", "type": "clock", "config":{"api":{"Location":"Local"}}},
  {"x":2,"y":0,"w":2,"h":4,"i":"1", "type": "weather", "config":{"api":{"apiKey":"", "zip":46530}}},
  {"x":4,"y":0,"w":2,"h":5,"i":"2", "type": "weather", "config":{"api":{"apiKey":"", "zip":46530}}},
  {"x":6,"y":0,"w":2,"h":3,"i":"3", "type": "default", "config":{}},
  {"x":8,"y":0,"w":2,"h":3,"i":"4", "type": "default", "config":{}}
	];

export default {
  name: 'app',
  components: {
    Grid
  },
  data: function() {
    return {
      layout: testLayout,
      edit: true
    }
  },
  methods: {
    addWidget : function() {
      const key = this.layout.length.toString();
      this.layout.push({"x":0,"y":0,"w":2,"h":5,"i":key, "type": "default", "config":{}})
    },
    editMode : function() {
      this.edit = !this.edit
    }
  }
}
</script>
