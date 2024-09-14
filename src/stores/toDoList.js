import { defineStore } from "pinia";
import { tabs } from "@/@model/menuToDoList.ts";

export const toDoListStore = defineStore("toDoListStores",{
  
  state: ()=> ({
    loading:false,
    displayMyDays: false,
    displayImportant: false,
    displayPlanned: false,
    displayAssignedToMe: false,
    displayFlaggedEmail: false,
    displayTasks: false,
    displayFirstSteps: false,
    displayShopping: false,
    displayUntitled: false,
    displayMenuLeft: false,
    displayDefault: false,
    displayLoader: false,
    tabs: tabs,
    myDaysCreated: [],
    newListTaskCreated: [],
    inputDisplay: true,
    createListTaskDisplay:false,
    keyName: ''
  }),

  actions:{
    setLoading(playload){this.loading = playload},
    setDisplayMyDays(playload){this.displayMyDays = playload},
    setdisplayImportant(playload){this.displayImportant = playload},
    setdisplayPlanned(playload){this.displayPlanned = playload},
    setdisplayAssignedToMe(playload){this.displayAssignedToMe = playload},
    setdisplayFlaggedEmail(playload){this.displayFlaggedEmail = playload},
    setdisplayTasks(playload){this.displayTasks = playload},
    setdisplayFirstSteps(playload){this.displayFirstSteps = playload},
    setdisplayShopping(playload){this.displayShopping = playload},
    setdisplayUntitled(playload){this.displayUntitled = playload},
    setdisplayMenuLeft(playload){this.displayMenuLeft = playload},
    setdisplayDefault(playload){this.displayDefault = playload},
    setmyDaysCreated(playload){this.myDaysCreated = playload},
    setInputDisplay(playload){this.inputDisplay = playload},
    setListTaskDisplay(playload){this.createListTaskDisplay = playload},
    setNewListTaskCreated(playload){this.newListTaskCreated = playload},
    setDisplayLoader(playload){this.displayLoader = playload},
    setKeyName(playload){this.keyName = playload},
    setTabs(playload){
      let result = this.tabs.filter(val => val.id === playload)
      return result
    },
  },

  getters:{
    getLoading:(state)=> state.loading,
    getDisplayMyDays:(state)=> state.displayMyDays,
    getdisplayImportant:(state)=> state.displayImportant,
    getdisplayPlanned:(state)=> state.displayPlanned,
    getdisplayAssignedToMe:(state)=> state.displayAssignedToMe,
    getdisplayFlaggedEmail:(state)=> state.displayFlaggedEmail,
    getdisplayTasks:(state)=> state.displayTasks,
    getdisplayFirstSteps:(state)=> state.displayFirstSteps,
    getdisplayShopping:(state)=> state.displayShopping,
    getdisplayUntitled:(state)=> state.displayUntitled,
    getdisplayMenuLeft:(state)=> state.displayMenuLeft,
    getdisplayDefault:(state)=> state.displayDefault,
    getmyDaysCreated:(state)=> state.myDaysCreated,
    getInputDisplay:(state)=> state.inputDisplay,
    getListTaskDisplay:(state)=> state.createListTaskDisplay,
    getNewListTaskCreated:(state)=> state.newListTaskCreated,
    getTabs:(state)=> state.tabs,
    getDisplayLoader:(state) => state.displayLoader,
    getKeyName:(state) => state.keyName
  }
  
})