<template>
  <v-app>
    <v-layout row>
      <v-flex xs12 md10 offset-md1>
        <v-card>
          <v-toolbar color="cyan" dark>
            <v-toolbar-title >
              Vue.js 2 and Firebase Sample Application <span class="text-xs-right caption">By Rigved Patki</span>
            </v-toolbar-title>
          </v-toolbar>
            <v-card-text>
              <span class="title">Add New Books</span>
              <v-text-field label="Title" v-model="newBook.title"></v-text-field>
              <v-text-field label="Author" v-model="newBook.author"></v-text-field>
              <v-text-field label="URL" v-model="newBook.url" placeholder="http://"></v-text-field>
              <v-btn color="cyan" v-on:click="addBook()">Add Book</v-btn>
            </v-card-text>
        </v-card>
        <v-card>
          <v-card-text>
            <span class="title">Book List</span>
            <v-data-table :headers="headers" :items="books" hide-actions class="elevation-1">
              <template slot="items" slot-scope="props">
                <td><a v-bind:href="props.item.url">{{props.item.title}}</a></td>
                <td>{{props.item.author}}</td>
                <td><v-btn color="red" v-on:click="deleteBook(props.item)" @click.native = "snackbar = true">Delete</v-btn></td>
                <td><v-btn color="yellow" v-on:click="editBook(props.item)" @click.stop= "modifyTheBook = true" >Edit</v-btn></td>
              </template>
            </v-data-table>
          </v-card-text>
          <v-snackbar :timeout="timeout" :top="y === 'top'" :bottom="y === 'bottom'" :right="x === 'right'" :left="x === 'left'" :multi-line="mode === 'multi-line'" :vertical="mode === 'vertical'" v-model="snackbar">
            {{text}}
            <v-btn flat color="pink" @click.native="snackbar = false">Close</v-btn>
          </v-snackbar>
          <v-dialog v-model="modifyTheBook" max-width="600px">
            <v-card>
              <v-card-title>
                Modify Book
              </v-card-title>
              <v-card-text>
                <v-text-field label="Title" v-model="bookForEditing.title"></v-text-field>
                <v-text-field label="Author" v-model="bookForEditing.author"></v-text-field>
                <v-text-field label="URL" v-model="bookForEditing.url"></v-text-field>
                <v-btn color="cyan" flat v-on:click="modifyBook(bookForEditing)" @click.stop= "modifyTheBook = false" >Modify</v-btn>
              </v-card-text>
            </v-card>
          </v-dialog>
        </v-card>
      </v-flex>
    </v-layout>
  </v-app>
</template>

<script>
import Firebase from 'firebase'
let config = {
  apiKey: "AIzaSyCWb2zvB2kiym9dHZFvc6pcHQJP-LWF2jY",
  authDomain: "tallbird-experiment.firebaseapp.com",
  databaseURL: "https://tallbird-experiment.firebaseio.com",
  projectId: "tallbird-experiment",
  storageBucket: "tallbird-experiment.appspot.com",
  messagingSenderId: "810672391071"
};
let app = Firebase.initializeApp(config);
let db = app.database();
let booksRef = db.ref('books');
export default {
  name: 'App',
  firebase:{
    books: booksRef
  },
  data: function(){
    return{
      newBook: {
        title: '',
        author: '',
        url: ''
      },
      headers: [
        {text: "Title", value: "title"},
        {text: "Author", value: "author"},
        {text: " ", value: "delete"},
        {text: "  ", value: "modify"}
      ],
      snackbar: false,
      y: 'top',
      x: null,
      mode: '',
      timeout: 6000,
      text: 'Book Removed',
      modifyTheBook: false,
      bookForEditing: {},
    }
  },
  methods:{
    addBook: function(){
      console.log(this.newBook)
      booksRef.push(this.newBook);
      this.newBook.title = '';
      this.newBook.author= '';
      this.newBook.url= '';
    },
    deleteBook: function(book){
      booksRef.child(book['.key']).remove();
    },
    modifyBook: function(book){
      console.log("modify button hit");
      booksRef.child(book['.key']).update({title: book.title, author: book.author, url: book.url});
    },
    editBook: function(book){
      this.bookForEditing = book;
    }
  }

}
</script>

<style>
</style>
