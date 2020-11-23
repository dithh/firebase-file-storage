import Vue from 'vue';

import { storage } from '@/firebase/firebase';
import MUTATIONS from '@/consts/mutations';
import { createFileReferencePath, createUserFilesReferencePath } from '@/utils/utils';

export default {
  async getUserFiles({ commit, rootState }) {
    try {
      const userUid = rootState.auth.user.uid;
      const userFilesReferencePath = createUserFilesReferencePath(userUid);
      const response = await storage.ref().child(userFilesReferencePath)
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
    const fileReferencePath = createFileReferencePath(userUid, fileName);
    const fileRef = storage.ref().child(fileReferencePath);
    const parsedFile = new File(fileList, fileName, { type: fileList[0].type });
    const upload = fileRef.put(parsedFile);
    upload.on('state_changed', () => {
    }, ({ message }) => {
      Vue.prototype.$toast.error(message || 'Unknown error occured');
    }, async () => {
      const uploadedFileRef = upload.snapshot.ref;
      const metaData = await uploadedFileRef.getMetadata();
      Vue.prototype.$toast.success('File upload successfull');
      uploadedFileRef.size = metaData.size;
      commit(MUTATIONS.SAVE_USER_SINGLE_FILE, uploadedFileRef);
    });
  },
};
