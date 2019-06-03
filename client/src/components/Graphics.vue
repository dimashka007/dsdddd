<template>
  <div>
    <h4>
      Графiк вiдвiдувань
      <button v-if="$root.user=='admin' && visits.data[0]" @click="deleteGraphic('visits/', 'visits')" class="btn btn-primary">Видалити графiк вiдвiдувань</button>
      <file-upload v-if="$root.user=='admin' && !visits.data[0]" :folder="'/graphics/visits'"/>
    </h4>
    <div id="visits" v-html="visits.data[0]"></div>
    <h4>
      Графiк вiдкритих занять
      <button v-if="$root.user=='admin' && open.data[0]" @click="deleteGraphic('open/', 'open')" class="btn btn-primary">Видалити графiк вiдкритих занять</button>
      <file-upload v-if="$root.user=='admin' && !open.data[0]" :folder="'/graphics/open'"/>
    </h4>
    <div id="open" v-html="open.data[0]"></div>
    <h4>
      Графiк консультацiй
      <button v-if="$root.user=='admin' && consults.data[0]" @click="deleteGraphic('consults/', 'consults')" class="btn btn-primary">Видалити графiк консультацiй</button>
      <file-upload v-if="$root.user=='admin' && !consults.data[0]" :folder="'/graphics/consults'"/>
    </h4>
    <div id="consults" v-html="consults.data[0]"></div>
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
      return await graphics.DeleteGraphics(folder);
    },
  }
};
</script>
