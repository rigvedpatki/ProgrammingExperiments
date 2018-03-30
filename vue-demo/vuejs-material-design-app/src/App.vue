<template>
  <div id="app">
    <md-card>
      <md-card-header>
        <div class="md-title">
          Material design with Vue.js 2 Demo
        </div>
        <div class="md-subhead">
          By Rigved Patki
        </div>
      </md-card-header>
      <md-card-content>
        <md-button class='md-raised md-primary' v-on:click="fillTable()">Fill Table</md-button>
        <md-button class='md-raised md-accent' v-on:click="clearTable()">Clear Table</md-button>
      </md-card-content>
    </md-card>

    <md-table md-card>
      <md-table-row>
          <md-table-head>Name</md-table-head>
          <md-table-head>Username</md-table-head>
          <md-table-head>Email</md-table-head>
          <md-table-head>Phone</md-table-head>
          <md-table-head>Website</md-table-head>
      </md-table-row>      

      <md-table-row v-for="contact in contacts" :key="contact.name">
          <md-table-cell>{{contact.name}}</md-table-cell>
          <md-table-cell>{{contact.username}}</md-table-cell>
          <md-table-cell>{{contact.email}}</md-table-cell>
          <md-table-cell>{{contact.phone}}</md-table-cell>
          <md-table-cell>{{contact.website}}</md-table-cell>
      </md-table-row>
    </md-table>
    
  </div>
</template>
<script>

export default {
  name: 'App',
  data:function(){
    return {
      contacts: []
    }
  },
  methods:{
    fillTable: function(){
      this.$http.get('https://jsonplaceholder.typicode.com/users')
      .then(function(response){
        this.contacts = response.data;
      });

    },
    clearTable: function(){
      this.contacts.splice(0,this.contacts.length);
    }
  },
  components: {
  }
}
</script>

<style>
#app {
  margin-top: 60px;
  margin-left: 30px;
  margin-right: 30px;
}
</style>
