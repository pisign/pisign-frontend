<template>
  <v-container @keyup="sendInfo">
    <v-row>
      <v-form>
        <v-text-field v-model="apiKey" label="API Key*" required></v-text-field>
        <v-text-field v-model="zipCode" label="ZIP Code"></v-text-field>
      </v-form>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'WeatherSettings',
  data : function() {
    return {
      apiKey: "",
      zipCode: ""
    }
  }, methods:{
    sendInfo(){
      this.$emit('FormFilling', JSON.parse(JSON.stringify(this.$data)))
    }
  }
}
</script>
