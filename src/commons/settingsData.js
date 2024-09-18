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

    for(let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      const value = localStorage.getItem(key)
      const numericKey = Number(key)

      if(!isNaN(numericKey) && numericKey > maxId) {
        maxId = numericKey
      }    
      items.push({ key, value: JSON.parse(value) })     
    }
    return {
      storages: items,
      maxId: maxId
    };
  }
}