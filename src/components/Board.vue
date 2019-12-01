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
          columns: ['aaa'],
          new_task: [''],
          new_column: '',
          task_list: [
            [
                {name: 'aaaa', status: 'doing'},
                {name: 'bbbbbb', status: 'doing'},
            ],
          ],
      }
  },
  mounted: function() {
      this.loadBoardDetail();
  },
  methods: {
      createColmun: function(column) {
          this.columns.push(column);
          this.new_column = '';
          this.new_task.push('');
          this.task_list.push([]);

      },
      createTask: function(task, index) {
          this.task_list[index].push(
              {name: task, status: 'doing'},
          );
          this.new_task[index] = '';
      },
      changeTaskStatusDone: function(column_index, task_index) {
          if (this.task_list[column_index][task_index].status == "doing") {
              this.task_list[column_index][task_index].status = "done"
          } else {
              this.task_list[column_index][task_index].status = "doing"
          }
      },
      loadBoardDetail: function(id) {
          var vm = this;
          const boardDetail = firebaseDB.collection('boards').doc(id);
          vm.title = boardDetail.title;
         
          boardDetail.columns.get().then( (snap) => {
              vm.columns = [];
              if (snap.size == 0) {
                  return 0;
              }
              snap.docs.forEach(function(doc) {
                  vm.columns.push(doc.data());
              });
          });
          boardDetail.task_list.get().then( (snap) => {
              vm.task_list = [[]];
              if (snap.size == 0) {
                  return 0;
              }
              snap.docs.forEach(function(doc) {
                  vm.task_list.push(doc.data());
              });
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