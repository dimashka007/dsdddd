<template>
  <div>
    <h4>
      <button v-if="this.$root.user=='admin'" @click="deleteGraphic('1/', 1)" class="btn btn-primary">Видалити файл</button>
    </h4>
    <div id="1" v-html="visits.data[0]"></div>
    <h4>
      <button v-if="this.$root.user=='admin'" @click="deleteGraphic('2/', 2)" class="btn btn-primary">Видалити файл</button>
    </h4>
    <div id="2" v-html="open.data[0]"></div>
    <h4>

      <button v-if="this.$root.user=='admin'" @click="deleteGraphic('3/', 3)" class="btn btn-primary">Видалити файл</button>
    </h4>
    <div id="3" v-html="consults.data[0]"></div>
  </div>
</template>

<script>
import graphics from "../graphicsService";
import $ from 'jquery'; // ... jquery
export default {
  name: "Graphics",
  data() {
    return {
      visits: "",
      open: "",
      consults: ""
    };
  },
  async created() {
    this.visits = await graphics.getGraphics("1");
    this.open = await graphics.getGraphics("2");
    this.consults = await graphics.getGraphics("3");
  },
  updated() {
    $('table').addClass('table-bordered table-hover table-condensed table-responsive table-striped');
        $('form').addClass('form-inline');
        $('input').addClass('form-control');
        $('select').addClass('form-control');
  },
  methods: {
    deleteGraphic: async function(folder, id){
      $('#'+id).hide();
      switch (folder) {
        case '1/' :
          this.visits = await graphics.DeleteGraphics(folder);
          break;
        case '2/' :
          this.open = await graphics.DeleteGraphics(folder);
          break;
        case '3/' :
          this.consults = await graphics.DeleteGraphics(folder);
          
          break;
      } 
    },
  }
};
</script>
