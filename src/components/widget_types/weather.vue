<template>
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
  }, watch: {
    // If the sent API changed
    sentData: function(){
      // If the API sent was successful
      if (this.sentData.Status=="success"){
        // Sets all the temperature data
        this.temp = Math.round(this.sentData.Main.Temp) + "°F";
        this.temp_min = Math.round(this.sentData.Main.TempMin) + "°F";
        this.temp_max = Math.round(this.sentData.Main.TempMax) + "°F";
      } else {
        // Shows that we can't reach the API data
        this.temp = "N/A";
        this.temp_min = "N/A";
        this.temp_max = "";
      }
    }
  }
}
</script>
