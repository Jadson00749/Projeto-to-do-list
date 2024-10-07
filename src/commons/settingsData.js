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
  biggestId() {
    let maxId = 0
    const items = [];

    for(let i = 0; i < this.getStorage('allAccounts').length; i++) {
      const key = String(this.getStorage('allAccounts')[i].id)
      const value = this.getStorage('allAccounts')[i]
      const numericKey = Number(key)

      if(!isNaN(numericKey) && numericKey > maxId) {
        maxId = numericKey
      }    
      items.push({ key, value: value })     
    }
    return {
      storages: items,
      maxId: maxId
    };
  }
}