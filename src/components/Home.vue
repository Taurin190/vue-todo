<template>
    <div>
        <h1>TODO List</h1>
        <div style="margin: 30px;">
            <div class="row">
                <div v-for="(thread, index) in threads" :key="index" class="col-3 card" style="margin-bottom: 10px; position: relative;">
                    <span v-on:click="deleteCard(index)" class="col-12 text-right" style="position: absolute; right: -5px">
                        <font-awesome-icon icon="times-circle" />
                    </span>
                    <router-link :to="{ name: 'board', params: { id: index }}" >
                        <div class="card-body">
                            <h5 class="card-title">{{ thread.title }}</h5>
                            <p class="card-text">
                                 {{ thread.description }}
                            </p>
                        </div>
                    </router-link >
                </div>
                <div v-if="createFlag" class="col-3 card">
                    <label>Title</label>
                    <input v-model="new_title" type="textbox" />
                    <label>text</label>
                    <input v-model="new_description" type="textarea" />
                    <button v-on:click="createBoard(new_title, new_description)" class="btn btn-primary" href="#">
                        Create
                    </button>
                </div>
                <button  v-else v-on:click="openCreateForm" class="col-3 btn btn-primary" href="#">
                    <font-awesome-icon style="height: 100px;" class="align-middle" icon="plus" />
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'Home',
  data: function() {
      return {
          threads: [
              {title: 'TESTボード', description: 'これはTESTボードで試しに作ってみました。'},
              {title: 'TESTボード2', description: 'これはTESTボードで試しに作ってみました。'},
              {title: 'TESTボード3', description: 'これはTESTボードで試しに作ってみました。'}
          ],
          createFlag: false,
          new_title: '',
          new_description:'',
          count: 0,
      }
  },
  methods: {
      createBoard: function(title, text) {
          this.$data.threads.push( 
              {title: title, description: text}
          );
          this.$data.new_title = '';
          this.$data.new_description = '';
          this.$data.createFlag = false;
      },
      openCreateForm: function() {
          this.$data.createFlag = true;
      },
      deleteCard: function(index) {
          this.$delete(this.$data.threads, index);
      }
  }
}
</script>