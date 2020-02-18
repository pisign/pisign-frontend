<template>
  <v-container class="pa-0">
    <CloseButton v-if="edit" :index="index" :layout="layout" :websocket="ws"></CloseButton>
    <v-card-text class="pa-0">
      <component :api="Config" :sentData="sendData" :is="Name+'Widget'"></component>
    </v-card-text>
    <WidgetSettings v-if="edit" @saveForm="saveConfig" :type="Name" :api="Config"></WidgetSettings>
  </v-container>
</template>

<script>
import WidgetSettings from './WidgetSettings.vue';
import CloseButton from './CloseButton.vue';
import { serverIP } from './constants/server_settings.js'
import ClockWidget from './widget_types/clock.vue';
import WeatherWidget from './widget_types/weather.vue';
export default {
  name: 'Widget',
  components: {
    WidgetSettings: WidgetSettings,
    CloseButton: CloseButton,
    clockWidget: ClockWidget,
    weatherWidget: WeatherWidget
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
    positionUpdate : function(){
      if (this.positionUpdate == this.index){
        this.ws.send(JSON.stringify({"action": "ConfigurePosition", "position":{"x": this.item.x, "y": this.item.y, "h": this.item.h, "w": this.item.w, "i": this.item.i}}));
      }
    }
  },
  methods:{
    saveConfig : function(data) {
      if (this.Name != data.Name){
        this.Name = data.Name;
        this.ws.send(JSON.stringify({"Action": "ChangeAPI", "Name": this.Name}));
      }
      if (this.Config != data.Config){
        this.Config = data.Config;
        this.ws.send(JSON.stringify({"Action": "ConfigureAPI", "Config": this.Config}));
      }
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
      this.ws.onclose = function() {
        this.ws = null;
      }
      this.ws.onerror = function() {
        vue_data.sendData = {"Status":"failure", "msg": "Couldn't connect"}
      }
    }
  }
}
</script>
