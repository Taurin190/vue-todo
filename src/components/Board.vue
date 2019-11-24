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
                <input v-model="new_column" type="text" @keyup.enter="createTask(new_column)" />
            </div>
            <div class="card col-3">
                <input v-model="new_task" type="text" class="card-title" @keyup.enter="createColmun(new_task, index)" />
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
          new_task: '',
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
          this.task_list.add(column);
          this.new_column = '';
      },
      createTask: function(task, index) {
          this.task_list[index].add(task);
          this.new_task = '';
      }
  }
}
</script>