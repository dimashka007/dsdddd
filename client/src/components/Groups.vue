<template>
  <div class="container" style="max-width: 80%">
      <div class="row mb-5">
        <div :key='id' v-for="(item, id) in $root.groups" class="col-3 pl-0 pr-4 mb-3">
        <button @click.prevent="select(item)" class="btn btn-block btn-primary">{{item.groupName}}</button></div>
      </div>
      <div class="row mb-5">
        <label class="my-auto" for="groupName">Назва групи:</label>
        <input class="form-control col-4 ml-3" v-model="groupName" id="groupName" type="text">
        <button class="btn btn-primary ml-3" @click.prevent="createGroup()">Додати групу</button>
      </div>
      <div v-if="currentGroupSelected" class="row mb-5">
        <ul class="col-6 pl-0 list-group">
        <div
          class="list-group-item d-flex justify-content-between" 
          v-for="(student, index) in currentGroupSelected.students"
          :item="student"
          :key="index"
        >
        <span>{{student}}</span><img v-if="$root.user=='admin'" @click="deletestudent(index)" src="img/delete.svg" width="15px"  alt="">
        </div>
      </ul>
      </div>
      <div v-if="currentGroupSelected" class="row mb-5">
        <label class="my-auto" for="studentName">П.I.Б. студента:</label>
        <input class="form-control col-4 ml-3" v-model="studentName" id="studentName" type="text">
        <button class="btn btn-primary ml-3" @click.prevent="addStudent()">Додати студента</button>
      </div>
    </div>
</template>

<script>
import groups from "../groupsService";
export default {
  name: 'Groups',
  data() {
    return {
      groupName: '',
      currentGroupSelected: '',
      studentsName: [],
      studentName: ''
    }
  },
  async created() {
    this.$root.groups = await groups.getGroups();
  },
  methods: {
    async deletestudent(index){
      this.currentGroupSelected.students.splice(index, 1);
      await groups.insertStudents(this.currentGroupSelected.students, this.currentGroupSelected._id);
      this.$root.groups = await groups.getGroups();
    },
    select(group){
      this.currentGroupSelected = group
    },
    async createGroup(){
      await groups.insertGroup(this.groupName);
      this.$root.groups = await groups.getGroups();
      this.groupName=''
    },
    async addStudent(){
      this.currentGroupSelected.students.push(this.studentName)
      await groups.insertStudents(this.currentGroupSelected.students, this.currentGroupSelected._id);
      this.$root.groups = await groups.getGroups();
      this.studentName=''
    }
  }
}
</script>