<template>
  <v-footer v-if="settings" absolute color="transparent" class="pa-0" style="z-index:0">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on }">
        <v-btn icon color="primary" dark v-on="on">
          <v-icon>mdi-settings</v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Widget Settings</span>
        </v-card-title>
        <v-card-text>
          <v-select
            v-model="formType"
            :items="widgets"
            :rules="[v => !!v || 'Item is required']"
            label="Widget Type"
            required
          ></v-select>
          <component @FormFilling="changeData" v-bind:is="formType+'_settings'" :config="config"></component>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog=false">Close</v-btn>
          <v-btn color="blue darken-1" text @click="saveForm">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-footer>
</template>

<script>
import WeatherSettings from './widget_settings/weather.vue';
import TimeSettings from './widget_settings/time.vue';
export default {
  name: 'WidgetSettings',
  props: {
    type: {
      required: true
    }, config :{
      required: true
    }
  },
  data : function() {
    return {
      dialog: false,
      settings: false,
      widgets: ['weather', 'clock'],
      formData : {},
      formType : this.type
    }
  },
  created() {
    for (var i=0; i<this.widgets.length; i++){
      if (this.type==this.widgets[i]){
        this.settings = true;
        break;
      }
    }
  },
  methods: {
    saveForm: function() {
      this.dialog = false;
      var return_data = {"type": this.formType, "config": JSON.parse(JSON.stringify(this.formData))}
      this.$emit('saveForm', return_data);
    },
    changeData: function(data) {
      this.formData.config = data;
    }
  },
  components: {
      weather_settings: WeatherSettings,
      clock_settings: TimeSettings
  }
}
</script>
