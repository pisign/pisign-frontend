<template>
    <button class="close-button" aria-label="Close" v-on:click="close">×</button>
</template>
<style>
.close-button{
  position:absolute;
  top: 0;
  right: 0;
  width: 25px;
  height: 20px;
  background-color: transparent;
  border-color: transparent;
  font-size: 20px;
}
</style>
<script>
export default {
  name: 'CloseButton',
  props: {
    index: {
      required: true
    },
    layout: {
      required: true
    }
  },
  methods: {
    close : function() {
      this.$delete(this.layout, this.index);
    }
  }
}
</script>
