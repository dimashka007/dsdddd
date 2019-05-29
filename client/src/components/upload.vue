<template>
  <div class="file">
    <form @submit.prevent="sendFile(folder)" enctype="multipart/form-data">
      <div class="field">
        <label for="file" class="label">Додати файл</label>
        <input type="file" ref="file" @change="selectFile">
      </div>
      <div class="field">
        <button>Завантажити</button>
      </div>
      <p>{{message}}</p>
    </form>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "FileUpload",
  props: ["folder"],
  data() {
    return {
      file: "",
      message: ""
    };
  },
  methods: {
    selectFile() {
      this.file = this.$refs.file.files[0];
      this.message = "";
    },
    async sendFile(folder) {
      const formData = new FormData();
      formData.append("file", this.file);
      try {
        await axios.post(
          "http://localhost:5000/upload?folder=client/public/docs" +
            folder,
          formData
        );
        this.message = "Файл було завантажено!";
        this.file = "";
      } catch (err) {
        this.message = "Помилка запису, повторiть спробу";
      }
    }
  }
};
</script>