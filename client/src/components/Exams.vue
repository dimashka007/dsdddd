<template>
  <div style="max-width: 80%" class="container">
    <div class="row">
      <div class="col-4"><h3>Лекцiї</h3>
        <file-upload v-if="$root.user == 'admin'" :folder="'/exams/ms/'"/>
      </div>
      <div class="col-4"><h3>практичнi/лабораторнi/семiнари</h3>
        <file-upload v-if="$root.user == 'admin'" :folder="'/exams/mag/'"/>
      </div>
      <div class="col-4"><h3>Білети</h3>
        <file-upload v-if="$root.user == 'admin'" :folder="'/exams/dac/'"/>
      </div>
    </div>
    <div class="row">
      <ul class="col-4 px-3 list-group">
        <div :id="splitName('ms/' + ticket)" class="list-group-item" v-for="(ticket, index) in ms.data" :item="ticket" :key="index">
          <a :href="'docs/exams/ms/'+ticket">{{ticket}}</a> <img v-if="$root.user=='admin'" @click="deleteFile('ms/' + ticket, 'ms/')" src="img/delete.svg" width="15px"  alt="">
        </div>
      </ul>
      <ul class="col-4 px-3 list-group">
        <div :id="splitName('mag/' + ticket)"
          class="list-group-item"
          v-for="(ticket, index) in mag.data"
          :item="ticket"
          :key="index"
        >
          <a :href="'docs/exams/mag/'+ticket">{{ticket}}</a><img v-if="$root.user=='admin'" @click="deleteFile('mag/' + ticket, 'mag/')" src="img/delete.svg" width="15px"  alt="">
        </div>
      </ul>
      <ul class="col-4 px-3 list-group">
        <div
          :id="splitName('dac/' + ticket)"
          class="list-group-item"
          v-for="(ticket, index) in dac.data"
          :item="ticket"
          :key="index"
        >
          <a :href="'docs/exams/dac/'+ticket">{{ticket}}</a><img v-if="$root.user=='admin'" @click="deleteFile('dac/' + ticket, 'dac/')" src="img/delete.svg" width="15px"  alt="">
        </div>
      </ul>
    </div>
  </div>
</template>

<script>
import FileUpload from './upload.vue';
import exams from "../examService";
export default {
  name: "exams",
  components: {
    FileUpload
  },
  data() {
    return {
      ms: [],
      mag: [],
      dac: []
    };
  },
  async created() {
    try {
      this.ms = await exams.getExams("ms");
      this.dac = await exams.getExams("dac");
      this.mag = await exams.getExams("mag");
    } catch (err) {
      this.error = err.message;
    }
  },
  methods: {
     deleteFile: async function(name, folder){
      if(confirm('Ви впевненi?')){
        var splitted = this.splitName(name);
        document.querySelector(`#${splitted}`).style.display="none";
        return await exams.DeleteFile(name, folder)
      }
      
    },
    splitName(name) {
      return name.split('.').join('').split('/').join('').split(' ').join('').split('—').join('').split('-').join('').split('(').join('').split(')').join('')
    }
  }
};
</script>
<style scoped>
  .list-group-item{
    max-height: 50px;
    display: flex;
    justify-content: space-between;
  }
</style>
