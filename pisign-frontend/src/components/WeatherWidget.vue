<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12" class="pa-0">
        <p class="mb-0">{{ temp }}</p>
      </v-col>
    </v-row>
    <br>
    <v-row class="text-center">
      <v-col cols="12" class="pa-0">
        <p class="mb-0">{{ temp_max }} {{ temp_min }}</p>
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
      temp: "",
      temp_min: "",
      temp_max: ""
    }
  },
  created() {
    // Create a websocket
    var ws = new WebSocket("ws://localhost:9000/ws?api=weather");
    // Need to grab the Vue instance
    var vue_data = this.$data;

    // Upon the socket being connected, we create a message receiver from the socket
    ws.onopen = function() {
      // TODO need to find a way to set apiKey without leaking to GitHub
      this.send('{"apiKey":"", "zip":46556}');
      this.onmessage = function(evt) {
        var data = JSON.parse(evt.data);
        var data_parse = JSON.parse(data);

        // Here is where we update the data
        vue_data.temp = data_parse.Main.Temp + "°F";
        vue_data.temp_min = data_parse.Main.temp_min + "°F";
        vue_data.temp_max = data_parse.Main.temp_max + "°F";
      }
    }
    ws.onclose = function() {
        ws = null;
    }
    ws.onerror = function() {
        vue_data.temp = "N/A";
        vue_data.temp_min = "N/A";
        vue_data.temp_max = "";
    }
  }
}
</script>
