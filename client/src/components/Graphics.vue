<template>
  <div>
    <h4>
      графiк вiдвiдувань
      <button v-if="this.$root.user=='admin'" @click="deleteGraphic('visits/', '/visits')" class="btn btn-primary">Видалити графiк вiдвiдувань</button>
      <file-upload :folder="'/graphics/visits'"/>
    </h4>
    <div id="1" v-html="visits.data[0]"></div>
    <h4>
      графiк вiдкритих занять
      <button v-if="this.$root.user=='admin'" @click="deleteGraphic('open/', 'open')" class="btn btn-primary">Видалити графiк вiдкритих занять</button>
      <file-upload :folder="'/graphics/open'"/>
    </h4>
    <div id="2" v-html="open.data[0]"></div>
    <h4>
      графiк консультацiй
      <button v-if="this.$root.user=='admin'" @click="deleteGraphic('consults/', 'consults')" class="btn btn-primary">Видалити графiк консультацiй</button>
      <file-upload :folder="'/graphics/consults'"/>
    </h4>
    <div id="3" v-html="consults.data[0]"></div>
  </div>
</template>

<script>
import FileUpload from './upload.vue';
import graphics from "../graphicsService";
import $ from 'jquery'; // ... jquery
export default {
  name: "Graphics",
  components: {
    FileUpload
  },
  data() {
    return {
      visits: "",
      open: "",
      consults: ""
    };
  },
  async created() {
    this.visits = await graphics.getGraphics("visits");
    this.open = await graphics.getGraphics("open");
    this.consults = await graphics.getGraphics("consults");
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
        case 'visits/' :
          this.visits = await graphics.DeleteGraphics(folder);
          break;
        case 'open/' :
          this.open = await graphics.DeleteGraphics(folder);
          break;
        case 'consults/' :
          this.consults = await graphics.DeleteGraphics(folder);
          
          break;
      } 
    },
  }
};
</script>
