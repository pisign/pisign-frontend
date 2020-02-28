<template>
  <v-container class="pa-0">
    <!-- Close Button Component -->
    <CloseButton v-if="edit" :index="index" :layout="layout" :websocket="ws"></CloseButton>
    <!-- Widget rendering -->
    <v-card-text class="pa-0">
      <component :photos="photos" :edit="edit" :height="height" :width="width" :api="Config" :sentData="sendData" :is="Name+'Widget'"></component>
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
import TextWidget from './widget_types/text.vue';
import SystemInfoWidget from './widget_types/sysInfo.vue';
import SlideshowWidget from './widget_types/slideshow.vue';
export default {
  name: 'Widget',
  components: {
    WidgetSettings: WidgetSettings,
    CloseButton: CloseButton,
    clockWidget: ClockWidget,
    weatherWidget: WeatherWidget,
    textWidget: TextWidget,
    sysinfoWidget: SystemInfoWidget,
    slideshowWidget: SlideshowWidget
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
    }, photos : {
      required: true
    }
  }, data : function() {
    return {
      sendData: null,
      Name: this.item.Name,
      Config: this.item.Config,
      ws : null,
      height : this.positionUpdate.height,
      width : this.positionUpdate.width
    }
  },
  created() {
    this.createSocket();
  },
  watch : {
    // Called when any widget is moved
    'positionUpdate.uuid' : function(){
      // We need to make sure that this widget is the one being moved
      if (this.positionUpdate.uuid == this.uuid){
        // Send to the socket a new position
        this.ws.send(JSON.stringify({"action": "ConfigurePosition", "position":{"x": this.item.x, "y": this.item.y, "h": this.item.h, "w": this.item.w, "i": this.item.i}}));
        this.height = this.positionUpdate.height;
        this.width = this.positionUpdate.width;
      }
    }
  },
  methods:{
    // Called when Widget Settings sends new data
    saveConfig : function(data) {
      // Whenever we are updating the API Name
      if (this.Name != data.Name){
        this.Name = data.Name;
        if (this.Config != data.Config){
          this.Config = data.Config;
        }
        this.ws.send(JSON.stringify({"Action": "ChangeAPI", "Name": this.Name, "Config": this.Config}));
      }
      // Whenever we are updating the API Configuration
      else if (this.Config != data.Config){
        this.Config = data.Config;
        this.ws.send(JSON.stringify({"Action": "ConfigureAPI", "Config": this.Config}));
      }
      // Passes to App.vue that we are changing the configuration so that we can change layout array
      var sendData = {'Name': this.Name, 'Config': this.Config, 'index': this.index}
      if (data.photos){
        sendData.photos = data.photos;
      }
      this.$emit('changeConfig',sendData);
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
