<template>
  <v-container class="pa-0">
    <CloseButton v-if="edit" :index="index" :layout="layout"></CloseButton>
    <v-card-text class="pa-0">
      <component :sentData="sendData" :is="type+'_widget'"></component>
    </v-card-text>
    <WidgetSettings v-if="edit" @saveForm="saveConfig" :type="type" :api="api"></WidgetSettings>
  </v-container>
</template>

<script>
import WeatherWidget from './widget_types/weather.vue';
import ClockWidget from './widget_types/clock.vue';
import default_widget from './widget_types/default.vue';
import WidgetSettings from './WidgetSettings.vue';
import CloseButton from './CloseButton.vue';
export default {
  name: 'Widget',
  components: {
    WidgetSettings: WidgetSettings,
    CloseButton: CloseButton,
    weather_widget: WeatherWidget,
    clock_widget: ClockWidget,
    default_widget: default_widget
  }, props: {
    type: {
      required: true
    }, index: {
      required: true
    }, layout: {
      required: true
    }, edit: {
      required: true
    }, api: {
      required: true
    }
  }, data : function() {
    return {
      sendData: null,
      api_cur: JSON.stringify(this.api)
    }
  },
  created() {
    this.createSocket();
  },
  watch : {
    type: function() {
      this.ws.close();
      this.createSocket();
    }, api_cur: function() {
      this.ws.close();
      this.createSocket();
    }
  },
  methods:{
    saveConfig : function(data) {
      this.api_cur = data.api;
      this.$emit('changeConfig',{'api': data.api, 'index': this.index});
    },
    createSocket : function(){
      // Create a websocket
      this.ws = new WebSocket("ws://localhost:9000/ws?api=" + this.type);
      // Need to grab the Vue instance
      var vue_data = this.$data;
      var apiParsed = {"api": JSON.parse(JSON.stringify(this.api))};

      // Only start a socket, if we need to
      if (Object.entries(JSON.parse(JSON.stringify(this.api))).length > 1){
        // Upon the socket being connected, we create a message receiver from the socket
        this.ws.onopen = function() {
          this.send(JSON.stringify(apiParsed));

          this.onmessage = function(evt) {
            var data = JSON.parse(evt.data);
            data.status = "success";
            vue_data.sendData = data;
          }
        }
        this.ws.onclose = function() {
          this.ws = null;
        }
        this.ws.onerror = function() {
          vue_data.sendData = {"status":"failure", "msg": "Couldn't connect"}
        }
      }
    }
  }
}
</script>
