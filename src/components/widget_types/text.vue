<template>
  <v-container>
	<!-- Displays widget content -->
    <v-row class="text-center title">
      <v-col cols="12" class="pa-0">
        <p id="titleDisplay">{{ title }}</p>
      </v-col>
    </v-row>
    <v-row class="text-center">
      <v-col cols="12" class="pa-0">
        <p id="textDisplay">{{ text }}</p>
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
  created() {
    this.updateData();
  }, methods :{
    updateData : function(){
      // If the API was successful
      if (this.sentData && this.sentData.Status == "success"){
        var data = this.sentData.Data;
        this.title = data.Title;
        this.text = data.Text;
      }
       // If the API sent failed in some way
      else {
        this.title = "";
        this.text = "ERROR in parsing"
        if (this.sentData.msg){
          this.text = "ERROR: " + this.sentData.msg;
        }
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
