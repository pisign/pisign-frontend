<template>
  <v-container class="pa-0">
    <CloseButton v-if="edit" :index="index" :layout="layout"></CloseButton>
    <v-card-text class="pa-0">
      <component :sentData="sendData" :is="loadComponent"></component>
    </v-card-text>
    <WidgetSettings v-if="edit" @saveForm="saveConfig" :type="type" :api="api"></WidgetSettings>
  </v-container>
</template>

<script>
import WidgetSettings from './WidgetSettings.vue';
import CloseButton from './CloseButton.vue';
import { serverIP } from '../plugins/server_settings.js'
export default {
  name: 'Widget',
  components: {
    WidgetSettings: WidgetSettings,
    CloseButton: CloseButton
  }, props: {
    index: {
      required: true
    }, layout: {
      required: true
    }, edit: {
      required: true
    }, item: {
      required: true
    }
  }, data : function() {
    return {
      sendData: null,
      type: this.item.Name,
      api: this.item.Config
    }
  }, computed:{
    loadComponent(){
      return () => import(`./widget_types/${this.type}.vue`)
    }
  },
  created() {
    this.createSocket();
  },
  watch : {
    type: function() {
      this.ws.close();
      this.createSocket();
    }, api: function() {
      this.ws.close();
      this.createSocket();
    }
  },
  methods:{
    saveConfig : function(data) {
      this.api = data.Config;
      this.type = data.Name;
      this.$emit('changeConfig',{'Name': data.Name, 'Config': data.Config, 'index': this.index});
    },
    createSocket : function(){
      // Create a websocket
      this.ws = new WebSocket("ws://" + serverIP + "/ws?api=" + this.type);
      // Need to grab the Vue instance
      var vue_data = this.$data;
      var apiParsed = {"x": this.item.x, "y": this.item.y, "h": this.item.h, "w": this.item.w, "i": this.item.i, "api": JSON.parse(JSON.stringify(this.api))};

      // Upon the socket being connected, we create a message receiver from the socket
      this.ws.onopen = function() {
        this.send(JSON.stringify(apiParsed));

        this.onmessage = function(evt) {
          try {
            var data = JSON.parse(evt.data);
            data.status = "success";
            vue_data.sendData = data;
          } catch {
            vue_data.sendData = {"status": "failure", "msg": evt.data}
          }
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
</script>
