<template>
  <div>
    <label for="nameDisc">Назва дiсциплiни та курс:</label>
    <input v-model="nameDisc" id="nameDisc" type="text">
    <button @click.prevent="createDisc()">Додати</button>
    <multiselect
      class="col-6"
      v-model="currentDisc"
      :options="listDisc"
      track-by="name"
      label="name"
      placeholder="Виберіть групу/дісципліну"
      :searchable="false"
      :close-on-select="true"
    ></multiselect>
    <button @click.prevent="showCurrent()">Відобразити</button>
<div class="table-responsive">
    <table v-if="currentList" class="table table-bordered">
      <tr>
        <th></th>
        <th
          v-for="(item, index) in CurrentListDate"
          :item="item"
          :index="index"
          :key="item._id"
        >{{item.date}}</th>
      </tr>
      <tr v-for="(item, index) in currentList" :item="item" :index="index" :key="item._id">
        <template v-if="item.type=='Student'">
          <td>{{item.student}}</td>
          <td v-for="(items, index) in item.marks" :index="index" :key="items">
            <input type="text" v-model="item.marks[index]">
          </td>
          <td>
            <input type="text" v-model="item.marks[item.marks.length]">
          </td>
          <td>
            <button @click.prevent="updateMarks(item._id, item.marks)">Оновити</button>
          </td>
        </template>
      </tr>
    </table>
    </div>
    <div v-if="currentList">
    <label for="student">ПІБ студента</label>
    <input v-model="student" id="student" type="text">
    <button @click.prevent="createStudent()">Додати студента</button>
    </div>
    <div v-if="currentList">
      <h4 class="mt-5">Теми занять</h4>
      <label for="date">Дата</label>
      <input v-model="date" id="date" type="text">
      <label for="theme">Тема заняття</label>
      <input v-model="theme" id="theme" type="text">
      <label for="task">Завдання</label>
      <input v-model="task" id="task" type="text">
      <button @click.prevent="createTask()">Додати</button>
      <table class="table table-bordered">
        <tr>
          <th>Дата</th>
          <th>Тема заняття</th>
          <th>Завдання</th>
        </tr>
        <tr
          @dblclick="deletes(item._id)"
          v-for="(item, index) in currentList"
          :item="item"
          :index="index"
          :key="item._id"
        >
          <template v-if="item.type=='date'">
            <td>{{item.date}}</td>
            <td>{{item.theme}}</td>
            <td>{{item.task}}</td>
          </template>
        </tr>
      </table>
    </div>
  </div>
</template>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<script>
import marks from "../marksService";
import Multiselect from "vue-multiselect";
import axios from "axios";
export default {
  components: { Multiselect },

  name: "Marks",
  data() {
    return {
      nameDisc: "",
      listDisc: "",

      currentDisc: "",

      currentList: "",
      CurrentListDate: "",

      date: "",
      theme: "",
      task: "",

      student: ""
    };
  },
  watch: {
    currentList: function(val) {
      this.CurrentListDate = val.filter(item => {
        return item.type=='date'
      });
    }
  },
  async created() {
    this.listDisc = await marks.getDisc(this.$root.user);
  },
  methods: {
    async createDisc() {
      await marks.insertDisc(this.$root.user + "Disc", this.nameDisc);
      this.listDisc = await marks.getDisc(this.$root.user);
    },
    async showCurrent() {
      this.currentList = await marks.getDisc(this.currentDisc.name);
    },
    async createTask() {
      await marks.insertTask(
        "date",
        this.date,
        this.theme,
        this.task,
        this.currentDisc.name,
        "Disc"
      );
      this.currentList = await marks.getDisc(this.currentDisc.name);
    },
    async createStudent() {
      await marks.insertStudent(
        "Student",
        this.student,
        [],
        this.currentDisc.name,
        "Disc"
      );
      this.currentList = await marks.getDisc(this.currentDisc.name);
    },
    async updateMarks(id, marks) {
      await axios.put("http://localhost:5000/api/marks/", {
        id: id,
        marks: marks,
        name: this.currentDisc.name,
        way: "Disc"
      });
    }
  }
};
</script>
