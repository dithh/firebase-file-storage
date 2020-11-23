import Vue from 'vue';

import { storage } from '@/firebase/firebase';
import MUTATIONS from '@/consts/mutations';

export default {
  async getUserFiles({ commit, rootState }) {
    try {
      const userUid = rootState.auth.user.uid;
      const response = await storage.ref().child(`files/${userUid}`)
        .listAll();
      const { items } = response;
      const promises = items.map((item) => item.getMetadata());
      const metaData = await Promise.all(promises);
      metaData.forEach((data, index) => {
        items[index].size = data.size;
      });
      commit(MUTATIONS.SAVE_USER_FILES, items);
    } catch ({ message }) {
      Vue.prototype.$toast.error(message || 'Unkown error occured');
    }
  },
  async deleteUserFile({ commit }, { index, file }) {
    try {
      await file.delete();
      Vue.prototype.$toast.success('File deleted');
      commit(MUTATIONS.DELETE_USER_FILE, index);
    } catch ({ message }) {
      Vue.prototype.$toast.error(message || 'Unkown error occured');
    }
  },
  uploadUserFile({ commit, rootState }, { fileList, fileName }) {
    const userUid = rootState.auth.user.uid;
    console.log(fileList[0].type);
    const fileRef = storage.ref().child(`files/${userUid}/${fileName}`);
    const parsedFile = new File(fileList, fileName, { type: fileList[0].type });
    const upload = fileRef.put(parsedFile);
    upload.on('state_changed', () => {
    }, ({ message }) => {
      Vue.prototype.$toast.error(message || 'Unknown error occured');
    }, async () => {
      Vue.prototype.$toast.success('File upload successfull');
      const uploadedFileRef = upload.snapshot.ref;
      const metaData = await uploadedFileRef.getMetadata();
      uploadedFileRef.size = metaData.size;
      commit(MUTATIONS.SAVE_USER_SINGLE_FILE, uploadedFileRef);
    });
  },
};
