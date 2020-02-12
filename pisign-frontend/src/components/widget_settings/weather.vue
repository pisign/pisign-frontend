<template>
  <v-container @keyup="sendInfo">
    <v-row>
      <v-form>
        <v-text-field v-model="apiKey" label="API Key*" required></v-text-field>
        <v-text-field v-model="zip" label="ZIP Code" required></v-text-field>
      </v-form>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'WeatherSettings',
  data : function() {
    return {
      apiKey: this.config.api.apiKey,
      zip: this.config.api.zip
    }
  },
  props : {
    config : {
      required: true
    }
  },methods:{
    sendInfo(){
      this.zip = parseInt(this.zip);
      this.$emit('FormFilling', JSON.parse(JSON.stringify(this.$data)))
    }
  }
}
</script>
