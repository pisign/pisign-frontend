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
  name: 'TimeWidget',
  data: function(){
    return {
      time: "",
      date: ""
    }
  }, props:{
    sentData:{
      required: true
    }
  },
  watch : {
    sentData : function(){
      if (this.sentData.Status == "success"){
        var date_obj = new Date(Date.parse(this.sentData.Time));
        this.time = date_obj.toLocaleTimeString('en-US');
        this.date = date_obj.toLocaleDateString('en-US');
      } else if (this.sentData.Status == "failure") {
        console.log(this.sentData.ErrorMessage);
        this.time = "N/A";
        this.time = "N/A"
      }

    }
  }
}
</script>
