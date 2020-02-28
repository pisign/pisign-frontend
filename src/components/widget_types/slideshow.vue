<template>
  <v-container class="pa-0">
    <v-row v-if="image" class="pa-0" align="center" justify="center">
      <v-img :src="image" :max-height='dataHeight' :max-width='dataWidth'></v-img>
    </v-row>
    <v-row v-else class="pa-0" align="center" justify="center">
      <p>No photos uploaded</p>
    </v-row>
  </v-container>
</template>
<script>
export default {
  name: 'SlideshowWidget',
  data: function(){
    return {
      image : "",
      dataHeight: this.edit ? this.height - 80 : this.height,
      dataWidth: this.edit ? this.width * 0.8 : this.width,
      photoNum: 1,
      interval : null
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
    }, photos : {
      required : true
    }
  }, created(){
    // This is here to test the slideshow capabilities
    this.startInterval();
  }, methods :{
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
      this.image = this.photos[this.photoNum];
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
      // If the API was successful
      if (this.sentData.Status == "success"){
        // var data = this.sentData.Data;
      }
       // If the API sent failed in some way
      else if (this.sentData.Status == "failure") {
        this.image = "";
      }
    }, "api.Speed" : function() {
      // If they change the api configuration maybe like speed of slideshow or what category of photos to show
      this.stopInterval();
      this.startInterval();
    }, edit : function() {
      this.dataHeight = this.edit ? this.height - 80 : this.height;
    }, height : function() {
      this.dataHeight = this.edit ? this.height - 80 : this.height;
    }, width : function() {
      this.dataWidth = this.width;
    }
  }
}
</script>
