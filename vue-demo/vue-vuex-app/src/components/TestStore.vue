<template>
  <div class="teststore">
    <v-layout row>
      <v-flex xs12 md10 offset-md1>
        <v-card>
          <v-toolbar color="cyan" dark>
            <v-toolbar-title >
              Vue.js 2 and Vuex Sample Application <span class="text-xs-right caption">By Rigved Patki</span>
            </v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            Counter: {{$store.state.count}}, counter is {{evenOrOdd}}
          </v-card-text>
          <v-btn color="cyan" dark @click= "increment()"> Increament </v-btn>
          <v-btn color="cyan" dark @click= "decrement()"> Decrement </v-btn>
          <v-btn color="cyan" dark @click= "incrementIfOdd()"> Increment if odd </v-btn>
          <v-btn color="cyan" dark @click= "incrementAsync()"> Async Increament </v-btn>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'teststore',
  computed : mapGetters([
  'evenOrOdd'
  ]),
  methods : mapActions([
    'increment',
    'decrement',
    'incrementIfOdd',
    'incrementAsync'
  ])
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
