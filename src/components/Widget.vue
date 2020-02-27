<template>
  <v-container class="pa-0">
    <!-- Close Button Component -->
    <CloseButton v-if="edit" :index="index" :layout="layout" :websocket="ws"></CloseButton>
    <!-- Widget rendering -->
    <v-card-text class="pa-0">
      <component :api="Config" :sentData="sendData" :is="Name+'Widget'"></component>
    </v-card-text>
    <!-- Widget Settings Button Component -->
    <WidgetSettings v-if="edit" @saveForm="saveConfig" :type="Name" :api="Config"></WidgetSettings>
  </v-container>
</template>

<script>
import WidgetSettings from './WidgetSettings.vue';
import CloseButton from './CloseButton.vue';
import { serverIP } from './constants/server_settings.js'
import ClockWidget from './widget_types/clock.vue';
import WeatherWidget from './widget_types/weather.vue';
import SystemInfoWidget from './widget_types/sysInfo.vue';
export default {
  name: 'Widget',
  components: {
    WidgetSettings: WidgetSettings,
    CloseButton: CloseButton,
    clockWidget: ClockWidget,
    weatherWidget: WeatherWidget,
		systemWidget: SystemInfoWidget
  }, props: {
    index: {
      required: true
    }, layout: {
      required: true
    }, edit: {
      required: true
    }, item: {
      required: true
    }, positionUpdate : {
      required: true
    }, uuid : {
      required: true
    }
  }, data : function() {
    return {
      sendData: null,
      Name: this.item.Name,
      Config: this.item.Config,
      ws : null
    }
  },
  created() {
    this.createSocket();
  },
  watch : {
    // Called when any widget is moved
    positionUpdate : function(){
      // We need to make sure that this widget is the one being moved
      if (this.positionUpdate == this.index){
        // Send to the socket a new position
        this.ws.send(JSON.stringify({"action": "ConfigurePosition", "position":{"x": this.item.x, "y": this.item.y, "h": this.item.h, "w": this.item.w, "i": this.item.i}}));
      }
    }
  },
  methods:{
    // Called when Widget Settings sends new data
    saveConfig : function(data) {
      // Whenever we are updating the API Name
      if (this.Name != data.Name){
        this.Name = data.Name;
        this.ws.send(JSON.stringify({"Action": "ChangeAPI", "Name": this.Name}));
      }
      // Whenever we are updating the API Configuration
      if (this.Config != data.Config){
        this.Config = data.Config;
        this.ws.send(JSON.stringify({"Action": "ConfigureAPI", "Config": this.Config}));
      }
      // Passes to App.vue that we are changing the configuration so that we can change layout array
      this.$emit('changeConfig',{'Name': this.Name, 'Config': this.Config, 'index': this.index});
    },
    createSocket : function(){
      // Create a websocket
      this.ws = new WebSocket("ws://" + serverIP + "/ws?api=" + this.Name + "&uuid=" + this.uuid);
      // Need to grab the Vue instance
      var vue_data = this.$data;
      var apiParsed = {"action": "Init", "position":{"x": this.item.x, "y": this.item.y, "h": this.item.h, "w": this.item.w, "i": this.item.i}, "config": JSON.parse(JSON.stringify(this.Config))};
      // Upon the socket being connected, we create a message receiver from the socket
      this.ws.onopen = function() {
        this.send(JSON.stringify(apiParsed));

        this.onmessage = function(evt) {
          try {
            var data = JSON.parse(evt.data);
            vue_data.sendData = data;
          } catch {
            vue_data.sendData = {"Status": "failure", "msg": evt.data}
          }
        }
      }
      this.ws.onerror = function() {
        vue_data.sendData = {"Status":"failure", "msg": "Couldn't connect"}
      }
    }
  }
}
</script>
