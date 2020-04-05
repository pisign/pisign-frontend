<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12" class="pa-0">
        <p id="cityDisplay">{{ city }}</p>
      </v-col>
    </v-row>
    <v-row v-if='timestamp != ""' class="text-center">
      <v-col cols="12" class="pa-0">
        <p id="timeDisplay" class="mb-0">{{ timestamp | moment('timezone', timeZone , "h:mm:ss a")}}</p>
      </v-col>
      <v-col cols="12" class="pa-0">
        <p id="dateDisplay" class="mb-0">{{ timestamp | moment('timezone', timeZone , "MMMM D YYYY") }}</p>
      </v-col>
    </v-row>
    <v-row v-else class="text-center">
      <v-col cols="12" class="pa-0">
        <p id="errorDisplay" class="mb-0">Failed to fetch time.</p>
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
      timestamp : "",
      timeZone: this.api.Location
    }
  }, props:{
    sentData:{
      required: true
    }, api : {
      required: true
    }
  }, created() {
    this.updateData();
  }, computed: {
    city : function(){
      try {
        return this.timeZone.split("/")[1].replace(/_/g, " ");
      } catch {
        return this.timeZone;
      }
    }
  }, methods : {
    updateData : function() {
      // If the API was successful
      if (this.sentData && this.sentData.Status == "success"){
        var data = this.sentData.Data;
        this.timestamp = data.Time > 0 ? data.Time : "";
      }
       // If the API sent failed in some way
      else {
        this.timestamp = "";
      }
    }
  },
  watch : {
    // Run function on change of the sent data API
    sentData : function(){
      this.updateData();
    }, api : function() {
      // If they change the clock Location
      this.timeZone = this.api.Location;
    }
  }
}
</script>
