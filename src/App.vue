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
        <Grid @changeConfig="changeConfig" :layout="layout" :edit="edit"></Grid>
        <v-btn v-if="edit" color="pink" dark fixed bottom right fab @click="addWidget">
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </v-sheet>
    </v-content>

  </v-app>
</template>

<script>
import Grid from './components/Grid.vue'
import { serverIP } from './components/constants/server_settings.js'
import axios from 'axios';
export default {
  name: 'app',
  components: {
    Grid
  },
  data: function() {
    return {
      layout: [
        {"x":0,"y":0,"w":2,"h":5,"i":"0", "Name": "clock", "Config": {"Location":"Local"}},
        {"x":2,"y":0,"w":2,"h":4,"i":"1", "Name": "weather", "Config": {"apiKey":"123", "zip":46530}},
        {"x":4,"y":0,"w":2,"h":5,"i":"2", "Name": "weather", "Config": {"apiKey":"123", "zip":46530}},
        {"x":6,"y":0,"w":2,"h":5,"i":"3", "Name": "clock", "Config": {"Location":"Local"}}
        ],
      edit: true
    }
  }, created() {
    axios.get("http://" + serverIP + "/layouts?name=main").then(response => console.log(response.data));
  },
  methods: {
    addWidget : function() {
      const key = this.layout.length.toString();
      this.layout.push({"x":0,"y":0,"w":2,"h":5,"i":key, "Name": "clock", "Config":{"Location":"Local"}})
    },
    editMode : function() {
      this.edit = !this.edit
    },
    changeConfig : function(data) {
      this.layout[data.index].Name = data.Name;
      this.layout[data.index].Config = JSON.parse(JSON.stringify(data.Config));
    }
  }
}
</script>
