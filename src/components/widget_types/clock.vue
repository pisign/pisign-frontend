<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12" class="pa-0">
        <p class="mb-0">{{ time }}</p>
      </v-col>
      <v-col cols="12" class="pa-0">
        <p class="mb-0">{{ date }}</p>
      </v-col>
    </v-row>
  </v-container>
</template>

<style>
  .display-datetime {
    overflow-wrap: break-word;
  }
</style>
<script>
export default {
  name: 'ClockWidget',
  data: function(){
    return {
      time: "",
      date: "",
      timeZone: this.api.Location
    }
  }, props:{
    sentData:{
      required: true
    }, api : {
      required: true
    }
  },
  watch : {
    sentData : function(){
      if (this.sentData.Status == "success"){
        var date_obj = new Date(Date.parse(this.sentData.Time));
        this.time = date_obj.toLocaleTimeString('en-US', {timeZone: this.timeZone});
        this.date = date_obj.toLocaleDateString('en-US', {timeZone: this.timeZone});
      } else if (this.sentData.Status == "failure") {
        this.time = "N/A";
        this.date = "N/A";
      }
    }, api : function() {
      this.timeZone = this.api.Location;
    }
  }
}
</script>
