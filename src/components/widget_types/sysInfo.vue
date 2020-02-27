<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12" class="pa-0">
        <p>System Information</p>
      </v-col>
    </v-row>
    <v-row class="text-center">
      <v-col cols="12" class="pa-0">
        <p class="mb-0">Memory Available: blah</p>
      </v-col>
      <v-col cols="12" class="pa-0">
        <p class="mb-0">Memory Used: blah</p>
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

<style>
  .display-datetime {
    overflow-wrap: break-word;
  }
</style>
<script>
export default {
  name: 'SystemInfoWidget',
	props: {
		sentData: {
			required: true
		}
	}
}
</script>
