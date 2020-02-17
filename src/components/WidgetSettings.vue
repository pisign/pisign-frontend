<template>
  <v-footer absolute color="transparent" class="pa-0" style="z-index:0">
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
          <v-row>
            <v-form>
              <v-select
                v-model="formType"
                :items="widgets"
                :rules="[v => !!v || 'Item is required']"
                label="Widget Type"
                required
              ></v-select>
              <v-text-field v-for="info in compForm" v-bind:label="info.label" v-model="info.data" :key="info.label"></v-text-field>
            </v-form>
          </v-row>
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
import { WidgetSettingsForm } from './constants/widget_settings.js'
export default {
  name: 'WidgetSettings',
  props: {
    type: {
      required: true
    }, api :{
      required: true
    }
  },
  data : function() {
    // In the future, the form data will be retrieved from the server
    return {
      dialog: false,
      widgets: ['weather', 'clock'],
      form: JSON.parse(JSON.stringify(WidgetSettingsForm)),
      formType : this.type
    }
  }, created () {
    var keys = Object.keys(this.api);
    for (var i in keys){
      var key = keys[i];
      for (var j in this.form[this.formType]){
        if (this.form[this.formType][j].apiLabel == key){
          this.form[this.formType][j].data = this.api[key];
        }
      }
    }
  }, computed : {
    compForm : function() {
      return this.form[this.formType];
    }
  },
  methods: {
    saveForm: function() {
      this.dialog = false;
      var formData = {"Name": this.formType, "Config":{}};
      for (var i=0; i<this.form[this.formType].length; i++){
        var dataManipulation;
        switch (this.form[this.formType][i].dataType){
          case "integer":
            dataManipulation = parseInt;
            break;
          case "string":
            dataManipulation = function(data){return data;}
            break;
          default:
            dataManipulation = function(data){return data;}
            break;
        }
        formData.Config[this.form[this.formType][i].apiLabel] = dataManipulation(this.form[this.formType][i].data);

      }
      this.$emit('saveForm', formData);
    }
  }
}
</script>
