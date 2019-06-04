<template>
  <div class="container" style="max-width: 80%">
    <h1>Список викладачiв</h1>
      <div class="mb-5 form-group d-flex justify-content-between align-items-center">
      <label class="my-auto" for="name">Ф.І.О. викладача:</label><input class="form-control" v-model="name" id="name" type="text">
      <label class="my-auto" for="login">Логiн:</label><input class="form-control" v-model="login" id="login" type="text">
      <label class="my-auto" for="password">Пароль:</label><input class="form-control" v-model="password" id="password" type="text">
      <button class="btn btn-primary" @click.prevent="createTeach">Додати</button>
    </div>
    <table class="table table-bordered">
      <tr>
        <th>Ф.І.О. викладача</th>
        <th>Логiн</th>
        <th>Пароль</th>
      </tr>
    <tr
        @dblclick.prevent="deleteTeach(teach._id, teach.name)"
        v-for="(teach, index) in $root.users"
        :item="teach"
        :index="index"
        :key="teach._id"
      >
        <td>{{teach.name}}</td>
        <td>{{teach.login}}</td>
        <td>{{teach.password}}</td>
        <td v-if="$root.user=='admin'" style="cursor: pointer; text-align: center" @click.prevent="deleteTeach(teach._id, teach.name)"><img   src="img/delete.svg" width="15px"  alt=""></td>
      </tr>
      </table>
  </div>
  
</template>

<script>
import teachers from "../TeachersService";
export default {
  name: 'Methodicals',
  data() {
    return {
      name: '',
      login: '',
      password: '',
      list: ''
    }
  },
  async created() {
    
  },
  methods: {
    async createTeach() {
      await teachers.insertTeach(this.name, this.login, this.password);
      this.$root.users = await teachers.getTeach();
    },
    async deleteTeach(id, dir) {
      if(confirm('Ви впевненнi?')){
        await teachers.deleteTeach(id, dir);
        this.$root.users = await teachers.getTeach();
      }
      
    }
  }
}
</script>
<style scoped>
    .form-control{
      width: 25%
    }
  </style>