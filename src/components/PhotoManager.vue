<template>
  <div class="text-center">
    <v-dialog v-model="photos_dialog" width="40%">
      <template v-slot:activator="{ on }">
        <v-btn v-on="on" color="blue" dark fixed bottom left fab>
          <v-icon>mdi-image-multiple</v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-card-title primary-title>Upload Photos</v-card-title>
        <v-card-text>
          <v-form ref="photos_form">
            <!-- <v-col cols="12" lg="6"> -->
              <v-file-input v-model="photos"
                            multiple
                            label="Add New Photos"
                            accept="image/*"
                            chips
                            show-size
                            counter>
              </v-file-input>
            <!-- </v-col> -->
            <!-- <v-col cols="12" lg="6"> -->
              <v-text-field v-model="tags"
                            label="Comma seperated tags for your photos"
                            required
                            :rules="[v => !!v || 'Tags are required']">
              </v-text-field>
            <!-- </v-col> -->
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="photos_dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" text @click="validate(); photos_dialog = false">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
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
        formData.append('length', this.photos.length)
        for (var i=0; i<this.photos.length; i++){
          let file = this.photos[i];
          formData.append('files_' + i, file);
        }
        axios.post("http://" + serverIP + '/uploads',
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