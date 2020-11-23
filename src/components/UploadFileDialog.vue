<template>
  <div>
    <md-dialog :md-active.sync="showDialog">
      <md-dialog-title>Upload file</md-dialog-title>
      <md-dialog-content>
        <form class="md-layout md-alignment-top-center">
          <md-field>
            <label for="file-name">Name</label>
            <md-input type="text" v-model="fileName" id="file-name" name="file-name"/>
          </md-field>
          <md-field>
            <label for="file">Select a file </label>
            <md-file @md-change="updateFile"
                     v-model="file"
                     type="text"
                     id="file"
                     name="file"/>
          </md-field>
        </form>
      </md-dialog-content>
      <md-dialog-actions>
        <md-button @click="closeDialog" class="md-primary">Close</md-button>
        <md-button @click="validateForm" class="md-primary">Upload</md-button>
      </md-dialog-actions>
    </md-dialog>
    <md-button class="md-primary md-raised" @click="showDialog = true">Upload file</md-button>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'UploadFileDialog',
  data() {
    return {
      showDialog: false,
      fileName: '',
      fileList: '',
      file: '',
    };
  },
  methods: {
    ...mapActions(['uploadUserFile']),
    validateForm() {
      const { fileName, fileList } = this;
      if (fileName && fileList) {
        this.uploadUserFile({ fileName, fileList });
        this.showDialog = false;
        this.fileName = '';
        this.fileList = '';
        this.file = '';
      } else {
        this.$toast.error('Fill up the form');
      }
    },
    updateFile(fileList) {
      this.fileList = fileList;
    },
    closeDialog() {
      this.showDialog = false;
      this.fileName = '';
      this.fileList = '';
      this.file = '';
    },
  },
};
</script>

<style scoped>

</style>
