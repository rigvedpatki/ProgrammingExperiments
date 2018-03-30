<template>
  <div id="app">
  <v-app>
    <teststore></teststore>
  </v-app>
  </div>
</template>

<script>
import TestStore from './components/TestStore';

export default {
  name: 'app',
  components: {
    'teststore':TestStore
  }
}
</script>

<style>

</style>
