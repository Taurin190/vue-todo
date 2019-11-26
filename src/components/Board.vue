<template>
    <div>
        <h1>{{ title }}</h1>
        <div class="row">
            <div v-for="(column, index) in columns" :key="index" class="col-3 card">
                <h5 class="card-title">
                    {{ column }}
                </h5>
                <div v-for="(task, i) in task_list[index]" :key="i" class="">
                    <p>
                        {{ task.name }}
                    </p>
                </div>
                <input v-model="new_task[index]" type="text" v-on:keyup.enter="createTask(new_task[index], index)" />
            </div>
            <div class="card col-3">
                <input v-model="new_column" type="text" class="card-title" v-on:keyup.enter="createColmun(new_column)" />
            </div>
        </div>
    </div>
</template>
<script>
export default {
  name: 'Board',
  props: {
    msg: String
  },
  data: function() {
      return {
          title: 'TESTボード',
          columns: ['aaa'],
          new_task: [''],
          new_column: '',
          task_list: [
            [
                {name: 'aaaa', status: 1},
                {name: 'bbbbbb', status: 1},
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