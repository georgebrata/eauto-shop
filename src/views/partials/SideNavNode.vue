<template>
      <el-menu-item
        :class="model.fullpath === $route.path ? 'is-active pb-4 pt-4': 'pt-4 pb-4'"
        :index="model.path"
        @click="onMenuItemClick(model.path)">
        <h6 class="text-left">
        {{ model.meta.title }}
        </h6>
      </el-menu-item>
</template>

<script>
export default {
  name: 'side-nav-node',

  props: {
    model: {
      type: Object,
      required: true,
      default: () => {}
    }
  },

  methods: {
    isContainMore (model) {
      console.log(model)
      return false
    },

    onMenuItemClick (item) {
      this.$router.push(item)
    }
  }
}
</script>
