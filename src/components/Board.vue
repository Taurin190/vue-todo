<template>
    <div>
        <h1>{{ title }}</h1>
        <div class="row">
            <div v-for="(column, index) in columns" :key="index" class="col-3 card">
                <h5 class="card-title">
                    {{ column }}
                </h5>
                <draggable v-model="task_list[index]" group="task" @start="drag=true" @end="drag=false" :options="options">
                    <div class="item card" v-bind:class="task.status" v-for="(task, task_index) in task_list[index]" :key="task_index">
                        {{task.name}}
                        <span 
                            class="col-12 text-right clickable" 
                            style="position: absolute; right: -5px"
                            v-on:click="changeTaskStatusDone(index, task_index)"
                        >
                            <font-awesome-icon icon="check" />
                        </span>
                    </div>
                </draggable>
                <input v-model="new_task[index]" type="text" v-on:keyup.enter="createTask(new_task[index], index)" />
            </div>
            <div class="card col-3">
                <input v-model="new_column" type="text" class="card-title" v-on:keyup.enter="createColmun(new_column)" />
            </div>
        </div>
    </div>
</template>
<script>
import {firebaseDB} from '../main'
import draggable from 'vuedraggable';
import { log } from 'util';

export default {
  name: 'Board',
  components: { draggable },
  props: {
    msg: String
  },
  data: function() {
      return {
          options: {
              group: 'task',
              animation: 200
          },
          title: 'TESTボード',
          columns: [],
          new_task: [''],
          new_column: '',
          task_list: [],
          taskListener: null,
          boardListener: null,
      }
  },
  mounted: function() {
      this.loadBoardDetail();
  },
  watch: {
      task_list: {
          handler: function(tasks){
            log("task_list was changed");
            this.updateTaskList(tasks);
          },
          deep: true
      },
  },
  methods: {
      createColmun: function(column) {
          this.columns.push(column);
          firebaseDB.collection('boards').doc(this.$route.params.id).set({
              columns: this.columns
          }, {merge: true});
          this.new_column = '';
          var new_col_num = Object.keys(this.task_list).length;
          this.task_list[new_col_num] = [];
          this.updateTaskList(this.task_list);
      },
      updateTaskList: function(tasks) {
          var col = firebaseDB.collection('tasks').doc(this.$route.params.id);
          log(tasks)
          col.set( tasks, {merge: true});
      },
      createTask: function(task, index) {
          this.task_list[index].push(
              {name: task, status: 'doing'},
          );
          log("CREATE NEW TASK: " + task);
          this.new_task[index] = '';
      },
      changeTaskStatusDone: function(column_index, task_index) {
          if (this.task_list[column_index][task_index].status == "doing") {
              this.task_list[column_index][task_index].status = "done"
          } else {
              this.task_list[column_index][task_index].status = "doing"
          }
      },
      loadBoardDetail: function() {
          this.startTaskListener();
          this.startBoardListener();  
      },
      startBoardListener: function() {
          if (this.boardListener) {
              this.boardListener = null;
          }
          var vm = this; 
          var col = firebaseDB.collection('boards').doc(this.$route.params.id);
          this.boardListener = col.onSnapshot((snap) => {
              var boardDetail = snap.data();
              vm.title = boardDetail.title;
              vm.columns = boardDetail.columns;
              let col_len = vm.columns.length;
              let list_len = vm.task_list.length;
              for (let i = list_len; i < col_len; i++) {
                  vm.task_list.push([]);
              }
          });
      },
      startTaskListener: function() {
          if (this.taskListener) {
              log("listener was already running");
              this.taskListener = null;
          }
          var vm = this; 
          var col = firebaseDB.collection('tasks').doc(this.$route.params.id);
          this.taskListener = col.onSnapshot((snap) => {
              vm.task_list = snap.data();
          });
      },
  }
}
</script>
<style>
div.item {
    padding: 10px;
    margin: 5px;
    color: black;
    font-size: 18px;
}

div.item.doing {
    filter: drop-shadow(0px 2px 3px rgba(0,0,0,0.4));
    background-color: rgb(3, 169, 244);
}
div.item.done {
    text-decoration: line-through;
    background-color:rgb(158, 158, 158);
}
</style>