<template>
  <v-container @keyup="sendInfo">
    <v-row>
      <v-form>
        <v-text-field v-model="apiKey" label="API Key*" required></v-text-field>
        <v-text-field @keypress="isZip($event)" v-model="zip" label="ZIP Code*" required></v-text-field>
      </v-form>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'WeatherSettings',
  data : function() {
    return {
      apiKey: this.config.api ? this.config.api.apiKey : "",
      zip: this.config.api ? this.config.api.zip : ""
    }
  },
  props : {
    config : {
      required: true
    }
  },methods:{
    sendInfo(){
      var send_JSON = JSON.parse(JSON.stringify(this.$data));
      send_JSON.zip = parseInt(this.zip);
      this.$emit('FormFilling', send_JSON);
    }, isZip(evt){
      evt = (evt) ? evt : window.event;
      var charCode = (evt.which) ? evt.which : evt.keyCode;
      if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
        evt.preventDefault();
      } else if (this.zip > 9999){
        evt.preventDefault();
      } else {
        return true;
      }
    }

  }
}
</script>
