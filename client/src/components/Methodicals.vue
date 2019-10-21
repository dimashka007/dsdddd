<template>
  <div style="max-width: 80%" class="container w-100">
    <div v-if="$root.user=='admin'" class="mb-5 form-group d-flex justify-content-between align-items-center">
      <label class="my-auto" for="name">П.I.Б. викладача:</label><input class="form-control" v-model="name" id="name" type="text">
      <label class="my-auto" for="course">Курс:</label><input class="form-control" v-model="course" id="course" type="number">
      <label class="my-auto" for="semester">Семестр:</label><input class="form-control" v-model="semester" id="semester" type="number">
      <label class="my-auto" for="discipline">Назва дисципліни:</label><input class="form-control" v-model="discipline" id="discipline" type="text">
      <button class="btn btn-primary" @click.prevent="createMeth">Додати</button>
    </div>
    <table class="table table-bordered">
      <tr>
        <th>П.I.Б. викладача</th>
        <th>Курс</th>
        <th>Семестр</th>
        <th>Назва дисципліни</th>
      </tr>
    <tr
        
        v-for="(meth, index) in list"
        :item="meth"
        :index="index"
        :key="meth._id"
      >
        <td>{{meth.name}}</td>
        <td>{{meth.course}}</td>
        <td>{{meth.semester}}</td>
        <td>{{meth.discipline}}</td>
        <td v-if="$root.user=='admin'" style="cursor: pointer; text-align: center" @click.prevent="deleteMeth(meth._id)"><img   src="img/delete.svg" width="15px"  alt=""></td>
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
      this.name =''
      this.course=''
      this.semester=''
      this.discipline=''
    },
    async deleteMeth(id) {
      if(confirm('Ви впевненi?')){
        await methodicals.deleteMeth(id);
        this.list = await methodicals.getMeth();
      }
      
    }
  }
}
</script>
<style scoped>
  .form-control{
    width: 15%
  }
</style>
