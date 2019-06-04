<template>
  <div id="app">
    <b-navbar variant="primary">
      <b-navbar-nav>
        <b-nav-item>
          <router-link to="/courseworks">Методичнi вказiвки</router-link>
        </b-nav-item>
        <b-nav-item>
          <router-link to="/exams">Екзаменацiйнi бiлети</router-link>
        </b-nav-item>
        <b-nav-item v-if="$root.user !='' && $root.user != 'admin' && $root.user != undefined">
          <router-link  to="/eduprocess">Iндивiдуальний план</router-link>
        </b-nav-item>
        <b-nav-item>
          <router-link to="/graphics">Графiки</router-link>
        </b-nav-item>
        <b-nav-item  v-if="$root.user !='' && $root.user != 'admin' && $root.user != undefined">
          <router-link to="/marks">Вiдмiтки</router-link>
        </b-nav-item>
        <b-nav-item>
          <router-link to="/methodicals">Методична робота</router-link>
        </b-nav-item>
        <b-nav-item>
          <router-link to="/protocols">Протоколи</router-link>
        </b-nav-item>
        <b-nav-item v-if="$root.user !='' && $root.user != 'admin'&& $root.user != undefined" >
          <router-link to="/teachload">Навантаження</router-link>
        </b-nav-item>
        <b-nav-item v-if="$root.user == 'admin' && $root.user != undefined">
          <router-link to="/teachers">Викладачi</router-link>
        </b-nav-item>
      </b-navbar-nav>
      <b-navbar-nav class="ml-auto">
        <b-nav-form>
          <template v-if="$root.user == ''||$root.user == undefined">
            <b-form-input size="sm" class="mr-sm-2" v-model="login" placeholder="Логiн"></b-form-input>
            <b-form-input size="sm" class="mr-sm-2" v-model="password" placeholder="Пароль"></b-form-input>
            <button class="my-2 btn bg-dark text-white my-sm-0" @click.prevent="auth">Увiйти</button>
          </template>
          <template v-else>
            <span class="user mr-3">{{$root.user}}</span>
            <button class="my-2 btn bg-dark text-white my-sm-0" @click.prevent="logOut">Вийти</button>
          </template>
        </b-nav-form>
      </b-navbar-nav>
    </b-navbar>
    <router-view class="mt-5"></router-view>
  </div>
</template>

<script>
import teachers from "./TeachersService";
export default {
  name: "app",
  data() {
    return {
      login: "",
      password: "",
      error: false,
      user: ''
    };
  },
  async created() {
    
    try {
      this.$root.users = await teachers.getTeach();
    } catch (err) {
      console.log(err);
    }
  },
  methods: {
    auth: function(login, password) {
      for (var i = 0; i < this.$root.users.length; i++) {
        if (
          this.login == this.$root.users[i].login &&
          this.password == this.$root.users[i].password
        ) {
          this.$root.user = this.$root.users[i].name;
          var v = encodeURIComponent(document.lastModified);
          document.cookie = "user=" + this.$root.user;
          break;
        } else {
          this.error = true;
        }
      }
      if (this.$root.user == "" && this.error == true) {
        alert("направильний логiн або пароль");
      } else return true;
    },
    logOut() {
      this.$root.user = "";
      var v = encodeURIComponent(document.lastModified);
      document.cookie = "user=" + this.$root.user;
    }
  }
};
</script>

<style scoped>
  .nav-link{
    padding-right: 2rem!important
  }
  .nav-link a:hover{
    color: white;
    text-decoration: none;
    opacity: 0.6
  }
  a{
    color: white;
  }
  .user{ 
    color: white
  }
  .bg-dark{
    background-color: #0062cc!important
  }

</style>