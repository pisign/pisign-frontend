<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12" class="pa-0">
        <p class="mb-0">{{ api }}</p>
      </v-col>
    </v-row>
    <v-row class="text-center">
      <v-col cols="12" class="pa-0">
        <p class="mb-0">{{ id }}</p>
      </v-col>
    </v-row>
  </v-container>
</template>

<style>
  .display-datetime {
    overflow-wrap: break-word;
  }
</style>
<script>
export default {
  name: 'WeatherWidget',
  props: {
    widgetID: {
      required: true
    }
  },
  data: function(){
    return {
      api: "",
      id: ""
    }
  },
  created() {
    // Create a websocket
    var ws = new WebSocket("ws://localhost:9000/ws?api=weather");
    // Need to grab the Vue instance
    var that = this;

    // Upon the socket being connected, we create a message receiver from the socket
    ws.onopen = function() {
      this.onmessage = function(evt) {
        var data = JSON.parse(evt.data);

        // Here is where we update the data
        that.api = data.api;
        that.id = data.id;
      }
      this.send("Creating widget " + this.widgetID);
    }
    ws.onclose = function() {
        ws = null;
    }
    ws.onerror = function() {
        this.api = "N/A";
        this.id = "N/A";
    }
  }
}
</script>
