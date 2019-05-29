<template>
  <div class="container">
    <div class="row">
      <div class="col-4">Методичні вказівки з виконання бакалаврської роботи
        <file-upload :folder="'/courseworks/bak/'"/>
      </div>
      <div class="col-4">Методичні вказівки з виконання курсової роботи
        <file-upload :folder="'/courseworks/course/'"/>
      </div>
      <div class="col-4">Методичні вказівки з виконання магістрської роботи
        <file-upload :folder="'/courseworks/mag/'"/>
      </div>
    </div>
    <div class="row">
      <ul class="col-4 list-group">
        <div
          
          class="list-group-item"
          v-for="(coursework, index) in bak.data"
          :item="coursework"
          :key="index"
        >
          <a :href="'docs/courseworks/bak/'+coursework">{{coursework}}</a>
          <img v-if="$root.user=='admin'" @click="deleteCourseworks('bak/' + coursework, 'bak/')" src="img/delete.svg" width="15px" alt>
        </div>
      </ul>
      <ul class="col-4 list-group">
        <div
          
          class="list-group-item"
          v-for="(coursework, index) in course.data"
          :item="coursework"
          :key="index"
        >
          <a :href="'docs/courseworks/course/'+coursework">{{coursework}}</a>
          <img v-if="$root.user=='admin'" @click="deleteCourseworks('course/' + coursework, 'course/')" src="img/delete.svg" width="15px" alt>
        </div>
      </ul>
      <ul class="col-4 list-group">
        <div
          
          class="list-group-item"
          v-for="(coursework, index) in mag.data"
          :item="coursework"
          :key="index"
        >
          <a :href="'docs/courseworks/mag/'+coursework">{{coursework}}</a>
          <img v-if="$root.user=='admin'" @click="deleteCourseworks('mag/' + coursework, 'mag/')" src="img/delete.svg" width="15px" alt>
        </div>
      </ul>
    </div>
  </div>
</template>

<script>
import courseworks from "../courseworksService";
import FileUpload from './upload.vue'
export default {
  name: "courseworks",
  components: {
    FileUpload
  },
  data() {
    return {
      bak: [],
      mag: [],
      course: []
    };
  },
  async created() {
    try {
      this.bak = await courseworks.getCourseworks("bak");
      this.course = await courseworks.getCourseworks("course");
      this.mag = await courseworks.getCourseworks("mag");
    } catch (err) {
      console.log(err)
    }
  },
  methods: {
    deleteCourseworks: async function(name, folder) {
      switch (folder) {
        case "bak/":
          this.ms = await courseworks.DeleteCourseworks(name, folder);
          break;
        case "mag/":
          this.mag = await courseworks.DeleteCourseworks(name, folder);
          break;
        case "course/":
          this.dac = await courseworks.DeleteCourseworks(name, folder);
          break;
      }
      var splitted = this.splitName(name);
      document.querySelector(`#${splitted}`).style.display = "none";
    },
    // splitName(name) {
    //   return name
    //     .split(".")[0]
    //     .split("/")
    //     .join("");
    // }
  }
};
</script>
