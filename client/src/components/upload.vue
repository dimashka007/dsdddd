<template>
<div class="file">
    <form @submit.prevent="onSubmit" enctype="multipart/form-data">
        <div class="fields">
            <label>Вибрати файл</label>
            <input 
                type="file"
                ref="file"
                @change="onSelect"
            />
            <div class="fields">
                <button>Завантажити</button>
            </div>
            <div class="message">
                <h3>{{message}}</h3>
            </div>
        </div>
    </form>
</div>
</template>
<script>
import axios from 'axios';
export default {
  name: 'FileUpload',
  data() {
      return {
          file: '',
          message:''
      }
  },
  methods: {
      onSelect(){
          const file = this.$refs.file.files[0];
          this.file = file;
      },
      async onSubmit(){
          const formData = new FormData();
          formData.append('file', this.file);
          try{
              await axios.post('http://localhost:5000/upload', FormData);
              this.message = 'Завантажено, перезагрузiть сторiнку!!'
          }
          catch(err){
              console.log(err);
              this.message = 'Помилка вiдправлення. Повторiть спробу'
          }
      }
  }
}
</script>