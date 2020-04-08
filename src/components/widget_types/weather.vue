<template>
<!-- Displays widget content -->
  <v-container>
    <v-row class="text-center">
      <v-col cols="12" class="pa-0">
        <p class="mb-0">{{ temp }}</p>
      </v-col>
    </v-row>
    <br>
    <v-row class="text-center">
      <v-col cols="12" class="pa-0">
        <p class="mb-0">{{ temp_max }} {{ temp_min }}</p>
      </v-col>
    </v-row>
    <v-spacer></v-spacer>
  </v-container>

</template>

<style>
  .display-datetime {
    overflow-wrap: break-word;
  }
</style>
<script>
export default {
  name: 'WeatherWidget',
  props: {
    sentData: {
      required: true
    }
  },
  data: function(){
    return {
      temp: "",
      temp_min: "",
      temp_max: ""
    }
  }, created(){
    this.updateData();
  }, methods : {
    updateData : function(){
      // If the API sent was successful
      if (this.sentData.Status=="success"){
        // Sets all the temperature data
        var data = this.sentData.Data;
        this.temp = Math.round(data.Main.Temp) + "°F";
        this.temp_min = Math.round(data.Main.TempMin) + "°F";
        this.temp_max = Math.round(data.Main.TempMax) + "°F";
      } else {
        // Shows that we can't reach the API data
        this.temp = "N/A";
        this.temp_min = "N/A";
        this.temp_max = "";
      }
    }
  },watch: {
    // If the sent API changed
    sentData: function(){
      this.updateData();
    }
  }
}
</script>
