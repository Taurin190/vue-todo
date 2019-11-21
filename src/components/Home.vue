<template>
    <div>
        <h1>TODO List</h1>
        <div>
            <div class="row">
                <div v-for="(thread, index) in threads" :key="index" class="col-3 card" style="position: relative;">
                    <span class="col-12 text-right" style="position: absolute; right: -15px">
                        <font-awesome-icon icon="times-circle" />
                    </span>
                    <div class="card-body">
                        <h5 class="card-title">{{ thread.title }}</h5>
                        <p class="card-text">
                             {{ thread.description }}
                        </p>
                    </div>
                </div>
                <button class="btn btn-primary col-3" href="#">
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
          ]
      }
  },
  methods: {
      createBoard: function() {

      }
  }
}
</script>