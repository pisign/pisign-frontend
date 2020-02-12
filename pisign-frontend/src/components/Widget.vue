<template>
  <v-container class="pa-0">
    <CloseButton v-if="edit" :index="index" :layout="layout"></CloseButton>
    <v-card-text class="pa-0">
      <div v-if="type=='default'">
        <v-row class="text-center">
          <v-col cols="12">
            {{ type }}
          </v-col>
        </v-row>
      </div>
      <div v-else>
        <component :sentData="sendData" :is="type+'_widget'"></component>
      </div>
    </v-card-text>
    <WidgetSettings v-if="edit" @saveForm="saveConfig" :type="type" :config="config"></WidgetSettings>
  </v-container>
</template>

<script>
import TimeWidget from './widget_types/TimeWidget.vue';
import WeatherWidget from './widget_types/WeatherWidget.vue';
import WidgetSettings from './WidgetSettings.vue';
import CloseButton from './CloseButton.vue';
export default {
  name: 'Widget',
  components: {
    weather_widget: WeatherWidget,
    clock_widget: TimeWidget,
    WidgetSettings: WidgetSettings,
    CloseButton: CloseButton
  }, props: {
    type: {
      required: true
    }, index: {
      required: true
    }, layout: {
      required: true
    }, edit: {
      required: true
    }, config: {
      required: true
    }
  }, data : function() {
    return {
      sendData: null
    }
  },
  created() {
    this.createSocket();
  },
  watch : {
    type: function() {
      this.ws.close();
      this.createSocket();
    }
  },
  methods:{
    saveConfig : function(data) {
      this.$emit('changeConfig',{'type': data.type, 'api': data.config, 'index': this.index});
    },
    createSocket : function(){
      // Create a websocket
      this.ws = new WebSocket("ws://localhost:9000/ws?api=" + this.type);
      // Need to grab the Vue instance
      var vue_data = this.$data;
      var configParsed = JSON.parse(JSON.stringify(this.config));

      // Only start a socket, if we need to
      if (Object.entries(configParsed).length > 0){
        // Upon the socket being connected, we create a message receiver from the socket
        this.ws.onopen = function() {
          this.send(JSON.stringify(configParsed));

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
