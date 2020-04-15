<template>
  <v-container class="pa-0">
    <v-row v-if="image" class="pa-0" align="center" justify="center">
      <v-img :src="image" :max-height='dataHeight' :max-width='dataWidth'></v-img>
    </v-row>
    <v-row v-else class="pa-0" align="center" justify="center">
      <p id="errorDisplay">No photos uploaded</p>
    </v-row>
  </v-container>
</template>
<script>
import {serverIP } from '../constants/server_settings.js';
export default {
  name: 'SlideshowWidget',
  data: function(){
    return {
      image : "",
      dataHeight: (!this.height || this.height<100) ? "90%" : (this.edit ? this.height - 80 : this.height),
      dataWidth: (!this.width || this.width<100) ? "90%" : (this.edit ? this.width * 0.8 : this.width),
      photoNum: 0,
      interval : null,
      photos: []
    }
  }, props:{
    sentData:{
      required: true
    }, api : {
      required: true
    }, height : {
      required: true
    }, width : {
      required : true
    }, edit : {
      required : true
    }
  }, created(){
    // This is here to test the slideshow capabilities
    this.updateData();
    this.startInterval();
  }, methods : {
    updateData : function() {
      // If the API was successful
      if (!this.sentData || !this.sentData.Status){
        this.photos = [];
        this.image = "";
        return;
      }
      if (this.sentData.Status == "success"){
        var data = this.sentData.Data;
        this.photos = JSON.parse(JSON.stringify(data.FileImages));
      }
       // If the API sent failed in some way
      else if (this.sentData.Status == "failure") {
        this.photos = []
        this.image = "";
      }
    },
    stopInterval : function() {
      if (this.interval){
        clearInterval(this.interval);
      }
      this.interval = null;
    },
    changePhoto : function (){
      if (this.photos.length <= 0){
        this.image = "";
        return;
      }
       if (this.photoNum >= this.photos.length - 1){
        this.photoNum = 0;
      } else {
        this.photoNum += 1;
      }
      // Probably a better way to display images in the future
      this.image = "http://" + serverIP  + this.photos[this.photoNum];
    },
    startInterval : function() {
      if (!this.api.Speed) {
        this.stopInterval();
        return;
      }
      this.interval = setInterval(
                        function() { this.changePhoto(); }.bind(this),
                        this.api.Speed*1000
                      );
    }
  },
  watch : {
    // Run function on change of the sent data API
    sentData : function(){
      this.updateData();
    }, "api.Speed" : function() {
      // If they change the api configuration for speed of slideshow
      this.stopInterval();
      this.startInterval();
    }, edit : function() {
      this.dataHeight = (!this.height || this.height<100) ? "90%" : (this.edit ? this.height - 80 : this.height);
    }, height : function() {
      this.dataHeight = (!this.height || this.height<100) ? "90%" : (this.edit ? this.height - 80 : this.height);
    }, width : function() {
      this.dataWidth = (!this.width || this.width<100) ? "90%" : (this.edit ? this.width * 0.8 : this.width);
    }
  }
}
</script>
