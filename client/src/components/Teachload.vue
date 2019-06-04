<template>
  <div style="max-width: 80%" class="container">
    <button v-if="table" @click="deleteLoad($root.user.split('.').join(''))" class="btn btn-primary mb-4">Видалити навантаження</button>
    <file-upload  v-if="!table" :folder="'/teachload/'+$root.user.split('.').join('')"/>
    <div class="mb-5" v-html="table.data"></div>
  </div>
</template>

<script>
import FileUpload from './upload.vue'
import teachload from "../teachloadService";
import $ from "jquery"; // ... jquery
export default {
  name: "Teachload",
  components: {
    FileUpload
  },
  data() {
    return {
      table: ""
    };
  },
  async created() {
      this.table = await teachload.getTable(this.$root.user)
  },
  updated() {
    $("table").addClass(
      "table-bordered table-hover table-condensed table-responsive table-striped"
    );
    $("form").addClass("form-inline");
    $("input").addClass("form-control");
    $("select").addClass("form-control");
  },
  methods: {
    async deleteLoad(folder){
     this.table =  await teachload.deleteTable(folder);
     this.$router.go()
    }
  }
};
</script>
