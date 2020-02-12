<template>
  <v-container @keyup="sendInfo">
    <v-row>
      <v-col cols="12" sm="6" md="4">
        <v-text-field v-model="Location" label="Location"></v-text-field>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'TimeSettings',
  props : {
    config: {
      required: true
    }
  },
  data : function() {
    return {
      Location : this.config.api.Location
    }
  },
  methods : {
    sendInfo(){
      this.$emit('FormFilling', JSON.parse(JSON.stringify(this.$data)))
    }
  }
}
</script>
