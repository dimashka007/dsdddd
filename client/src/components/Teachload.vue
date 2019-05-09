<template>
  <div>
    
    <div v-html="table.data"></div>
  </div>
</template>

<script>
import teachload from "../teachloadService";
import $ from "jquery"; // ... jquery
export default {
  name: "Teachload",
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
  }
};
</script>
