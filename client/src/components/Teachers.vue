<template>
  <div>
    <h1>Список викладачiв</h1>
    <div>
    <label for="name">Ф.І.О. викладача:</label><input v-model="name" id="name" type="text">
    <label for="login">Логiн:</label><input v-model="login" id="login" type="text">
    <label for="password">Пароль:</label><input v-model="password" id="password" type="text">
    <button @click.prevent="createTeach">Додати</button>
    </div>
    <table class="table">
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
      await teachers.deleteTeach(id, dir);
      this.$root.users = await teachers.getTeach();
    }
  }
}
</script>
