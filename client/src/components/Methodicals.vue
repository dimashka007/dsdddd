<template>
  <div>
    <div>
    <label for="name">Ф.І.О. викладача:</label><input v-model="name" id="name" type="text">
    <label for="course">Курс:</label><input v-model="course" id="course" type="number">
    <label for="semester">Семестр:</label><input v-model="semester" id="semester" type="number">
    <label for="discipline">Назва дисципліни:</label><input v-model="discipline" id="discipline" type="text">
    <button @click.prevent="createMeth">Додати</button>
    </div>
    <table class="table">
      <tr>
        <th>Ф.І.О. викладача</th>
        <th>Курс</th>
        <th>Семестр</th>
        <th>Назва дисципліни</th>
      </tr>
    <tr
        @dblclick="deleteMeth(meth._id)"
        v-for="(meth, index) in list"
        :item="meth"
        :index="index"
        :key="meth._id"
      >
        <td>{{meth.name}}</td>
        <td>{{meth.course}}</td>
        <td>{{meth.semester}}</td>
        <td>{{meth.discipline}}</td>
      </tr>
      </table>
  </div>
  
</template>

<script>
import methodicals from "../methodicalsService";
export default {
  name: 'Methodicals',
  data() {
    return {
      name: '',
      course: '',
      semester: '',
      discipline: '',
      list: []
    }
  },
  async created() {
    try {
      this.list = await methodicals.getMeth();
    } catch (err) {
      console.log(err)
    }
  },
  methods: {
    async createMeth() {
      await methodicals.insertMeth(this.name, this.course, this.semester, this.discipline);
      this.list = await methodicals.getMeth();
    },
    async deleteMeth(id) {
      await methodicals.deleteMeth(id);
      this.list = await methodicals.getMeth();
    }
  }
}
</script>
