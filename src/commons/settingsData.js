import { computed } from "vue";

export function formatFileSize(sizeInBytes) {
  if (sizeInBytes < 1024) {
    return `${sizeInBytes}B`;
  } else if (sizeInBytes < 1024 * 1024) {
    return `${(sizeInBytes / 1024).toFixed(1)}KB`;
  } else if (sizeInBytes < 1024 * 1024 * 1024) {
    return `${(sizeInBytes / (1024 * 1024)).toFixed(1)}MB`;
  } else {
    return `${(sizeInBytes / (1024 * 1024 * 1024)).toFixed(1)}GB`;
  }
};

export const dataStorage = {
  getStorage(key) {
    return JSON.parse(localStorage.getItem(key))
  },
  setStorage(key,data) {
    localStorage.setItem(key,JSON.stringify(data))
  },
  // removeArquiveStorage(array,objectEntries,index) {
  //   let storage = this.getStorage('taskList')

  //   storage = array.filter(item => item?.name !== objectEntries?.name)
    
  //   console.log(result)
  //   console.log(storage)
  //   // localStorage.setItem('taskList',JSON.stringify(result))
  // }
}