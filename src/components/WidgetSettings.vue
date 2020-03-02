<template>
  <!-- Adds a footer to the widget card -->
  <v-footer absolute color="transparent" class="pa-0" style="z-index:0">
    <!-- Generates a dialog when needed -->
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
        <v-form>
          <v-card-text>
            <v-container>
              <v-row class="pa-0">
                <v-select
                  v-model="formType"
                  :items="widgets"
                  :rules="[v => !!v || 'Item is required']"
                  label="Widget Type"
                  required
                ></v-select>
              </v-row>
                <!-- Auto generates all the form fields needed based on widget_settings.js -->
              <v-row v-for="info in compForm" class="pa-0" :key="info.label + '_row'">
                <v-autocomplete v-if="info.form_type=='autocomplete'"
                  v-model="info.data"
                  :key="info.label"
                  :items="info.items"
                  color="white"
                  :label="info.label"
                  :multiple="info.multiple"
                  placeholder="Start typing to Search"
                ></v-autocomplete>
                <v-text-field v-else v-bind:label="info.label" v-model="info.data" :key="info.label"></v-text-field>

              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <!-- Save or close buttons at the button of the dialog box -->
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="dialog=false">Close</v-btn>
            <v-btn type="submit" color="blue darken-1" text @click="saveForm">Save</v-btn>
          </v-card-actions>
        </v-form>
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
    }, tags : {
      required: true
    }
  },
  data : function() {
    // In the future, the form data will be retrieved from the server
    return {
      dialog: false,
      form: JSON.parse(JSON.stringify(WidgetSettingsForm)),
      formType : this.type
    }
  }, created () {
    // We want to initialize the widget settings
    var keys = Object.keys(this.api);
    this.form.slideshow[1].items = this.tags;
    for (var i in keys){
      var key = keys[i];
      for (var j in this.form[this.formType]){
        if (this.form[this.formType][j].apiLabel == key){
          this.form[this.formType][j].data = this.api[key];
        }
      }
    }
  }, computed : {
    // Returns the proper form
    compForm : function() {
      return this.form[this.formType];
    },
    widgets : function(){
      return Object.keys(this.form);
    }
  }, watch : {
    tags : function() {
      this.form.slideshow[1].items = this.tags;
    }
  },
  methods: {
    // When you save the form, we want to get all the form data and then emit it to parent to be saved and sent to socket
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
