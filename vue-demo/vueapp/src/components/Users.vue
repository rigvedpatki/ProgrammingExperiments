<template>
  <div class="users">
      <h1>Users</h1>
      <form v-on:submit="addUser">
        <label> Customer Name: </label><input type="text" v-model="newUser.name" placeholder="Enter Name">
        <br/>
        <label> Customer Email ID: </label><input type="text" v-model="newUser.email" placeholder="Enter Email">
        <br/>
        <button type="submit">Submit customer details</button>
      </form>
      <ul>
        <li v-for="user in users" :key="user.email">
          <input type="checkbox" class='toggle' v-model="user.contacted">
          <span :class="{contacted: user.contacted}">
            {{user.name}} : {{user.email}} <button v-on:click="deleteUser(user)">x</button>
          </span>
        </li>
      </ul>
  </div>
</template>
<script>
export default {
  name: 'users',
  data(){
      return{
        newUser:{},
        users:[]
      }
  },
  methods:{
      addUser: function(event){
        console.log('customer added');
        this.users.push({
          name: this.newUser.name,
          email: this.newUser.email,
          contacted: false
        });
        event.preventDefault();
      },
      deleteUser: function(user){
        console.log('customer deleted');
        this.users.splice(this.users.indexOf(user),1);

      }
  },
  created: function(){
    console.log('customer created')
    this.$http.get('https://jsonplaceholder.typicode.com/users')
    .then(function(response){
      //console.log(response.data);
      this.users = response.data;
    });
  }
}
</script>

<style scoped>
.contacted{
  text-decoration: line-through;
}
</style>
