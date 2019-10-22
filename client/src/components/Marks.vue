<template>
  <div class="container" style="max-width: 80%">
    <div class="mb-5 col-11 form-group d-flex justify-content-between align-items-center">
      <label class="my-auto" for="nameDisc">Назва дiсциплiни:</label>
      <input class="form-control col-3 mr-3" v-model="nameDisc" id="nameDisc" type="text">
      <label class="my-auto" for="hoursDisc">Кiлькiсть занять:</label>
      <input class="form-control col-1 mr-5" v-model="hoursDisc" id="hoursDisc" type="number">
      <multiselect
        v-model="currentGroup"
        :options="$root.groups"
        track-by="groupName"
        label="groupName"
        placeholder="Виберіть групу"
        :searchable="true"
        :close-on-select="true"
      ></multiselect>
      <button class="btn btn-primary ml-3" @click.prevent="createDisc()">Додати</button>
    </div>
    <div class="mb-5 col-6 form-group d-flex justify-content-between align-items-center">
      <multiselect
      
        v-model="currentDisc"
        :options="listDisc"
        track-by="name"
        label="name"
        placeholder="Виберіть групу/дісципліну"
        :searchable="false"
        :close-on-select="true"
      ></multiselect>
      <button class="btn btn-primary ml-4" @click.prevent="showCurrent()">Відобразити</button>
    </div>
    
    <div id="table-scroll" class="table-scroll">
      <table style="border: none" id="main-table" class="main-table table-bordered" v-if="currentList" >
        <thead>
        <tr>
          <th style="border: none"></th>
          <th
            v-for="(item, index) in CurrentListDate"
            :item="item"
            :index="index"
            :key="item._id"
          >{{item.date}}</th>
        </tr>
        </thead> 
        <tbody>
        <tr v-for="(item, index) in currentList" :item="item" :index="index" :key="item._id">
          <template v-if="item.type=='Student'">
            <th class="py-auto">{{item.student}}</th>
            <td :class="item.marks[index].attendance=='visited'? 'visited': item.marks[index].attendance=='unvisited'? 'unvisited': ''" @focusout="updateMarks(item._id, item.marks)" class="marksinput" v-for="(items, index) in item.marks" :index="index" :key="items">
              <input  type="number" v-model="item.marks[index].mark">
              <img @click='item.marks[index].attendance = "unvisited"; updateMarks(item._id, item.marks)' v-if="item.marks[index].attendance == ''" src="img/error.png" alt="">
              <img @click='item.marks[index].attendance = "visited"; updateMarks(item._id, item.marks)' v-if="item.marks[index].attendance == ''" src="img/success.png" alt="">
            </td>
            <td>
              {{item.marks.reduce((sum, current)=>{
                
                if(Number(current.mark) != 'NaN'){
                  return sum + Number(current.mark);
                }
                else{
                  return sum
                }
                
              }, 0)}}
            </td>
          </template>
        </tr>
        </tbody>
      </table>
    </div>
    <!-- <div class="mb-5 mt-3 px-0 col-6 form-group d-flex justify-content-between align-items-center" v-if="currentList">
      <label class="my-auto" for="student">П.І.Б. студента</label>
      <input class="form-control col-6" v-model="student" id="student" type="text">
      <button class="btn btn-primary" @click.prevent="createStudent()">Додати студента</button>
    </div> -->
    <div v-if="currentList">
      <h4 class="mt-5">Теми занять</h4>
      <div class="my-3 px-0 col form-group d-flex justify-content-between align-items-center">
        <label class="my-auto" for="date">Дата</label>
        <input class="form-control col-1" v-model="date" id="date" type="text">
        <label class="my-auto" for="theme">Тема заняття</label>
        <input class="form-control col-3"  v-model="theme" id="theme" type="text">
        <label class="my-auto" for="task">Завдання</label>
        <input class="form-control col-3"  v-model="task" id="task" type="text">
        <button class="btn btn-primary" @click.prevent="createTask()">Додати заняття</button>
      </div>
      <table class="table table-bordered mb-5">
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
      hoursDisc: "",
      listDisc: "",

      currentDisc: "",
      currentGroup: "",
      currentList: "",
      CurrentListDate: "",

      date: "",
      theme: "",
      task: "",

      // student: ""
    };
  },
  watch: {
    currentList: function(val) {
      this.CurrentListDate = val.filter(item => {
        return item.type == "date";
      });
    }
  },
  async created() {
    this.listDisc = await marks.getDisc(this.$root.user);
  },
  methods: {
    async createDisc() {
      await marks.insertDisc(this.$root.user + "Disc", `${this.nameDisc} ${this.currentGroup.groupName}`, this.hoursDisc);
      this.createStudent();
      this.listDisc = await marks.getDisc(this.$root.user);
      this.nameDisc=''
      this.hoursDisc=''
    },
    async showCurrent() {
      this.currentList = await marks.getDisc(this.currentDisc.name.split(' ').join(''));

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
       this.date =''
        this.theme =''
        this.task=''
    },
    async createStudent() {
      await marks.insertStudent(
        "Student",
        this.currentGroup.students,
        this.hoursDisc,
        `${this.nameDisc} ${this.currentGroup.groupName}`,
        "Disc"
      );
      this.currentGroup= ''
    },
    async updateMarks(id, marks) {
      await axios.put("/api/marks/", {
        id: id,
        marks: marks,
        name: this.currentDisc.name,
        way: "Disc"
      });
    }
  }
};
</script>
<style scoped>
  th{
    vertical-align: middle;
  }
  td{
    vertical-align: middle
  }
  .marksinput{
    min-width: 100px;
    text-align: center
  }
  td input{
    width: 100%
  }
  .visited{
    background-color: green
  }
  .unvisited{
    background-color: red
  }
.intro {
  max-width: 1280px;
  margin: 1em auto;
}
.table-scroll {
  position: relative;
  width:100%;
  z-index: 1;
  margin: auto;
  overflow: auto;
}
.table-scroll table {
  width: 100%;
  min-width: 1280px;
  margin: auto;
  border-collapse: separate;
  border-spacing: 0;
}
.table-wrap {
  position: relative;
}
.table-scroll th,
.table-scroll td {
  padding: 5px 10px;
  background: #fff;
  vertical-align: top;
}
.table-scroll thead th {
  background: #fff;
  position: -webkit-sticky;
  position: sticky;
  top: 0;
}
/* safari and ios need the tfoot itself to be position:sticky also */
.table-scroll tfoot,
.table-scroll tfoot th,
.table-scroll tfoot td {
  position: -webkit-sticky;
  position: sticky;
  bottom: 0;
  background: #fff;
  color: #fff;
  z-index:4;
}

a:focus {
  background: red;
} /* testing links*/

th:first-child {
  position: -webkit-sticky;
  position: sticky;
  left: 0;
  z-index: 2;
  background: #fff;
}
thead th:first-child,
tfoot th:first-child {
  z-index: 5;
}


</style>
