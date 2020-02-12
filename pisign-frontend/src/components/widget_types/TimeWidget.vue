<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12" class="pa-0">
        <p class="mb-0">{{ time }}</p>
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
  name: 'TimeWidget',
  data: function(){
    return {
      time: ""
    }
  }, props:{
    sentData:{
      required: false
    }
  },
  watch : {
    sentData : function(){
      if (this.sentData.status == "success"){
        this.time = this.sentData.Time;
      } else {
        this.time = "N/A";
      }

    }
  }
}
</script>
