<template>
  <v-dialog v-model="photos_dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
    <template v-slot:activator="{ on }">
      <v-btn v-on="on" v-if="edit" color="blue" dark fixed bottom left fab>
        <v-icon>mdi-image-multiple</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-toolbar dark color="primary">
        <v-btn icon dark @click="photos_dialog = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>Slideshow Photo Settings</v-toolbar-title>
      </v-toolbar>
      <v-list three-line subheader>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>Upload Files</v-list-item-title>
            <v-form ref="photos_form">
              <v-col cols="12" lg="6">
                <v-file-input v-model="photos"
                              multiple
                              label="Add New Photos"
                              accept="image/*"
                              chips
                              show-size
                              counter>
                </v-file-input>
              </v-col>
              <v-col cols="12" lg="6">
                <v-text-field v-model="tags"
                              label="Comma seperated tags for your photos"
                              required
                              :rules="[v => !!v || 'Tags are required']">
                </v-text-field>
              </v-col>
              <v-btn
                color="success"
                class="mr-4"
                @click="validate"
              >
                Save
              </v-btn>
            </v-form>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-divider></v-divider>
    </v-card>
  </v-dialog>
</template>

<script>
import { serverIP } from './constants/server_settings.js';
import axios from 'axios';
export default {
  name:'PhotoManager',
  props : {
    edit : {
      required: true
    }
  },
  data : function(){
    return {
      photos_dialog: false,
      tags : "",
      photos : [],
    }
  },
  methods : {
    validate () {
      if (this.$refs.photos_form.validate()) {
        if (this.photos.length < 1){
          return;
        }
        let formData = new FormData();
        formData.append('tag', this.tags);
        for (var i=0; i<this.photos.length; i++){
          let file = this.photos[i];
          formData.append('files[' + i + ']', file);
        }
        axios.post( serverIP + '/upload',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
        ).then(function(){
          console.log("Files saved on server");
        }).catch(function(){
          console.log("Error saving to server");
        })
        this.$refs.photos_form.reset();
        this.$refs.photos_form.resetValidation();
      }
    }
  }
}
</script>