<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12" class="pa-0">
        <p>System Information</p>
      </v-col>
    </v-row>
    <v-row class="text-center">
      <v-col cols="12" class="pa-0">
        <p class="mb-0">Memory Available: {{ mem_left }}</p>
      </v-col>
      <v-col cols="12" class="pa-0">
        <p class="mb-0">Memory Used: {{ mem_per }}%</p>
      </v-col>
      <v-col cols="12" class="pa-0">
        <p class="mb-0">Disk Space Available: blah</p>
      </v-col>
      <v-col cols="12" class="pa-0">
        <p class="mb-0">CPU Usage: blah %</p>
      </v-col>
      <v-col cols="12" class="pa-0">
        <p class="mb-0">CPU Temp: blah </p>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  name: 'SystemInfoWidget',
	props: {
		sentData: {
			required: true
		}
	}, data : function(){
    return {
      mem_left: 0,
      mem_per: 0,
    }
  },
  watch : {
    // Run function on change of the sent data API
    sentData : function(){
      // If the API was successful
      if (this.sentData.Status == "success"){
        var data = this.sentData.Data;
        this.mem_left = data.Total - data.Used;
        this.mem_per = Math.round(data.UsedPercent*100)/100;
      }
       // If the API sent failed in some way
      else if (this.sentData.Status == "failure") {
        this.mem_used = 0;
        this.mem_per = 0;
      }
    }
  }
}
</script>
