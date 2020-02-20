<template>
  <v-app>
    <!-- Navbar at the top -->
    <v-app-bar dense color="green" app>
      <v-toolbar-title>PiSign</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click="editMode">
        <v-icon>mdi-pencil-outline</v-icon>
      </v-btn>
    </v-app-bar>
    <v-content>
      <v-sheet>
        <!-- Widget grid -->
        <Grid @changeConfig="changeConfig" :layout="layout" :edit="edit"></Grid>
        <!-- Floating button for adding a new widget -->
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
      layout : [],
      edit: true
    }
  }, beforeCreate() {
    // Gets the layouts before page is rendered
    axios.get("http://" + serverIP + "/layouts?name=main").then(response => {
      if (response.data.List){
        this.layout = response.data.List;
      } else {
        this.layout = []
      }
    });
  },
  methods: {
    // UUID generation function from https://stackoverflow.com/a/2117523
    uuidv4 : function() {
      return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
      );
    },
    // Adds a new widget to the layouts.
    addWidget : function() {
      const uuid = this.uuidv4();
      this.layout.push({"x":0,"y":0,"w":2,"h":5,"i":uuid, "UUID": uuid, "Name": "clock", "Config":{"Location":"America/New_York"}})
    },
    // Turns off/on edit mode
    editMode : function() {
      this.edit = !this.edit
    },
    // Called when widget settings changes the configuration or api name
    changeConfig : function(data) {
      this.layout[data.index].Name = data.Name;
      this.layout[data.index].Config = JSON.parse(JSON.stringify(data.Config));
    }
  }
}
</script>
