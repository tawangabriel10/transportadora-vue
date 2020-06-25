<template>
  <v-dialog transition="fade-transition" :value="loading" fullscreen>
    <v-container fluid fill-height style="background-color: rgba(255, 255, 255, 0.5);z-index: 1000000000">
      <v-layout justify-center align-center>
        <v-progress-circular
          indeterminate
          color="primary">
        </v-progress-circular>
      </v-layout>
    </v-container>
  </v-dialog>
</template>

<script>
export default {
  props: {
    loading: {
      type: Boolean,
      default: () => false
    }
  }
}
</script>
