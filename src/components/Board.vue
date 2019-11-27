<template>
    <div>
        <h1>{{ title }}</h1>
        <div class="row">
            <div v-for="(column, index) in columns" :key="index" class="col-3 card">
                <h5 class="card-title">
                    {{ column }}
                </h5>
                <draggable v-model="task_list[index]" group="task" @start="drag=true" @end="drag=false" :options="options">
                    <div class="item" v-for="task in task_list[index]" :key="task.id">{{task.name}}</div>
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
                {id: 1, name: 'aaaa', status: 1},
                {id: 2, name: 'bbbbbb', status: 1},
            ],
          ],
      }
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
              {name: task, status: 1},
          );
          this.new_task[index] = '';
      }
  }
}
</script>