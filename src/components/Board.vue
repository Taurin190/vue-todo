<template>
    <div>
        <h1>{{ title }}</h1>
        <div class="row">
            <div v-for="(column, index) in columns" :key="index" class="col-3 card">
                <h5 class="card-title">
                    {{ column }}
                </h5>
                <draggable v-model="tmp_task_list[index]" group="task" @start="drag=true" @end="drag=false" :options="options">
                    <div class="item card" v-bind:class="task.status" v-for="(task, task_index) in tmp_task_list[index]" :key="task_index">
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
          task_list: [
            [
                {name: 'aaaa', status: 'doing'},
                {name: 'bbbbbb', status: 'doing'},
            ],
          ],
          tmp_task_list: [
              []
          ],
      }
  },
  mounted: function() {
      this.loadBoardDetail(this.$route.params.id);
  },
  watch: {
      task_list(tasks) {
          this.loadTaskList(tasks);
        //   firebaseDB.collection('boards').doc(this.$route.params.id).set({
        //       task_list: [{name: 'aaaa', status: 'doing'},tasks]
        //   }, {merge: true});
      },
      tmp_task_list(tasks) {
          this.task_list = this.getStorableObject(tasks);
      }
  },
  methods: {
      createColmun: function(column) {
          this.columns.push(column);
          firebaseDB.collection('boards').doc(this.$route.params.id).set({
              columns: this.columns
          }, {merge: true});
          this.new_column = '';
          this.tmp_task_list.push([]);
          this.task_list = this.getStorableObject(this.tmp_task_list);
        //   this.task_list.push({});

      },
      getStorableObject: function(arr) {
          let obj = {};
        //   log(arr);
          for(let i = 0; i < arr.length; i++) {
              obj[i] = arr[i];
          }
          return obj;
      },
      loadTaskList: function(tasks) {
          var col = firebaseDB.collection('boards').doc(this.$route.params.id);
        //   var new_task_array = {};
        //   tasks.forEach(function(task, i) {
        //       var new_task = [];
        //       task.forEach(function(t) {
        //           new_task.push({name: t.name, status: t.status});
        //         //   new_task_array[i].push({name: t.name, status: t.status});
        //       });
        //   });
          log(this.getStorableObject(tasks));
          col.set( {task_list: this.task_list}, {merge: true});
      },
      createTask: function(task, index) {
          this.tmp_task_list[index].push(
              {name: task, status: 'doing'},
          );
        //   this.task_list = this.getStorableObject(this.tmp_task_list);
          this.new_task[index] = '';
      },
      changeTaskStatusDone: function(column_index, task_index) {
          if (this.tmp_task_list[column_index][task_index].status == "doing") {
              this.tmp_task_list[column_index][task_index].status = "done"
          } else {
              this.tmp_task_list[column_index][task_index].status = "doing"
          }
      },
      loadBoardDetail: function(id) {
          var vm = this;
          const boardDetail = firebaseDB.collection('boards').doc(id);

          boardDetail.get().then( (snap) => {
              if (!snap.exists) {
                  return 0;
              }
              var boardData = snap.data();
              vm.title = boardData.title;
              vm.columns = boardData.columns;
              vm.tmp_task_list = boardData.task_list;
            //   vm.task_list.push([]);
              
          });
            
      }
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