<template>
  <v-container>
	<!-- Displays widget content -->
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
        <p class="mb-0">Memory Used: {{ mem_used }}</p>
      </v-col>
      <v-col cols="12" class="pa-0">
        <p class="mb-0">Memory Usage: {{ mem_per }}</p>
      </v-col>
      <v-col cols="12" class="pa-0">
        <p class="mb-0">Disk Space Available: {{ disk_free }}</p>
      </v-col>
      <v-col cols="12" class="pa-0">
        <p class="mb-0">Disk Space Used: {{ disk_used }}</p>
      </v-col>
      <v-col cols="12" class="pa-0">
        <p class="mb-0">Disk Usage: {{ disk_per }}</p>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import bytes from 'bytes'
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
      mem_used: 0,
      disk_used: 0,
      disk_free: 0,
      disk_total: 0,
      disk_per: 0
    }
  }, created() {
    this.updateData();
  }, methods : {
    updateData : function(){
      // If the API was successful
      if (this.sentData && this.sentData.Status == "success"){
        var data = this.sentData.Data;
        this.mem_left = bytes(data.MemTotal - data.MemUsed);
        this.mem_used = bytes(data.MemUsed);
        this.mem_per = Math.round(data.MemUsedPercent*100)/100 + "%";
        this.disk_used = bytes(data.DiskUsed);
        this.disk_total = bytes(data.DiskTotal);
        this.disk_free = bytes(data.DiskFree);
        this.disk_per = Math.round(data.DiskUsedPercent*100)/100 +"%";
      }
       // If the API sent failed in some way
      else {
        this.mem_left = "N/A";
        this.mem_used = "N/A";
        this.mem_per = "N/A";
        this.disk_used = "N/A";
        this.disk_total = "N/A";
        this.disk_free = "N/A";
        this.disk_per = "N/A";
      }
    }
  },
  watch : {
    // Run function on change of the sent data API
    sentData : function(){
      this.updateData();
    }
  }
}
</script>
