import { storage } from '@/firebase/firebase';
import MUTATIONS from '@/consts/mutations';

export default {
  async getUserFiles({ commit }) {
    const response = await storage.ref().listAll();
    const { items } = response;
    const promises = items.map((item) => item.getMetadata());
    const metaData = await Promise.all(promises);
    metaData.forEach((data, index) => {
      items[index].size = data.size;
    });
    commit(MUTATIONS.SAVE_USER_FILES, items);
  },
  async deleteUserFile({ commit }, index) {
    commit(MUTATIONS.DELETE_USER_FILE, index);
  },
};
