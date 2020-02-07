<template>
    <button class="close-button" aria-label="Close" v-on:click="close">
      <span class="material-icons close-icon">close</span>
    </button>
</template>
<style>
.close-button{
  position:absolute;
  top: 0;
  right: 0;
  width: 16px;
  height: 16px;
  background-color: transparent;
  border-color: transparent;
  text-align:center;
}
.close-icon{
  font-size: 16px;
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
