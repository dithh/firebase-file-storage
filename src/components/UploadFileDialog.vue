<template>
  <div class="md-layout md-alignment-center">
    <md-dialog :md-active.sync="showDialog">
      <md-dialog-title>Upload file</md-dialog-title>
      <md-dialog-content>
        <form class="md-layout md-alignment-top-center">
          <md-field>
            <label for="file-name">Name</label>
            <md-input
              id="file-name"
              v-model="fileName"
              type="text"
              name="file-name"
            />
          </md-field>
          <md-field>
            <label for="file">Select a file </label>
            <md-file
              id="file"
              v-model="file"
              type="text"
              name="file"
              @md-change="updateFile"
            />
          </md-field>
        </form>
      </md-dialog-content>
      <md-dialog-actions>
        <md-button
          class="md-primary"
          @click="closeDialog"
        >
          Close
        </md-button>
        <md-button
          class="md-primary"
          @click="validateForm"
        >
          Upload
        </md-button>
      </md-dialog-actions>
    </md-dialog>
    <md-button
      class="md-primary md-raised"
      @click="showDialog = true"
    >
      Upload file
    </md-button>
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
      const { fileList } = this;
      let { fileName } = this;
      if (fileName && fileList) {
        const fileExtension = this.file.split('.').pop();
        fileName = `${fileName}.${fileExtension}`;
        this.uploadUserFile({ fileName, fileList });
        this.closeDialog();
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
