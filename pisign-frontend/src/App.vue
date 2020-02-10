<template>
  <v-app>
    <v-app-bar dense color="green" app>
      <v-toolbar-title>PiSign</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click="editMode">
        <v-icon>mdi-settings</v-icon>
      </v-btn>
    </v-app-bar>
    <v-content>
      <v-sheet>
        <Grid :layout="layout" :is_draggable="edit" :is_resizable="edit"></Grid>
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
      layout: testLayout,
      edit: true
    }
  },
  methods: {
    addWidget : function() {
      const key = this.layout.length.toString();
      this.layout.push({"x":0,"y":0,"w":2,"h":4,"i":key, "type": "default"})
    },
    editMode : function() {
      this.edit = !this.edit
    }
  },
  methods: {
    addWidget : function() {
      const key = this.layout.length.toString();
      this.layout.push({"x":0,"y":0,"w":2,"h":4,"i":key, "type": "default"})
    }
  }
}
</script>
