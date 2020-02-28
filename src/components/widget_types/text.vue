<template>
  <v-container>
    <v-row class="text-center title">
      <v-col cols="12" class="pa-0">
        <p>{{ title }}</p>
      </v-col>
    </v-row>
    <v-row class="text-center">
      <v-col cols="12" class="pa-0">
        <p>{{ text }}</p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'TextWidget',
  data: function(){
    return {
      title: "",
      text: ""
    }
  }, props: {
    sentData: {
      required: true
    }
  },
  watch : {
    // Run function on change of the sent data API
    sentData : function(){
      // If the API was successful
      if (this.sentData.Status == "success"){
        var data = this.sentData.Data;
        this.title = data.Title;
        this.text = data.Text;
      }
       // If the API sent failed in some way
      else if (this.sentData.Status == "failure") {
        this.title = "";
        this.text = "ERROR: " + this.sentData.msg;
      }
    }
  }
}
</script>
