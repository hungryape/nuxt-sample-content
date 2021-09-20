<template>
  <div class="grid grid-cols-10 divide-x divide-gray-200">
    <div
      v-for="(menuDocument, index) in menuDocuments"
      :key="index"
      class="col-span-1 pt-3 pl-4"
    >
      <ul class="space-y-2">
        <li v-for="(item, itemIndex) in menuDocument" :key="itemIndex">
          <nuxt-link :to="item.dir">{{
            (item.menu && item.menu.title) || item.title
          }}</nuxt-link>
        </li>
      </ul>
    </div>
    <div :class="classObject">
      <nuxt-content :document="document" class="prose" />
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({ $content, params, error }) {
    const documents = await $content({
      deep: true,
    }).fetch()

    // menu
    const menuDocuments = []
    if (params.pathMatch.includes('collections')) {
      const group = params.pathMatch || 'collections'
      const mappedDocuments = documents.map((x) => {
        const outline = x.path
          .split('/')
          .filter((f) => f !== '' && f !== 'index')
        return {
          ...x,
          level: outline.length,
          outline,
          group: outline.slice(0, -1).join('/'),
        }
      })

      const groupOutline = group.split('/')
      for (const [index] of groupOutline.entries()) {
        const groupItem = mappedDocuments.filter(
          (x) =>
            x.group === groupOutline.slice(0, index + 1).join('/') &&
            !x.group.includes('open')
        )
        if (groupItem.length > 0) {
          menuDocuments.push(groupItem)
        }
      }
    }

    const classObject = {
      'pt-3 pl-4 transition-all duration-500 ease-in-out': true,
    }

    const columnCount = 10 - menuDocuments.length
    classObject['col-span-' + columnCount] = true

    // content
    let path = `/${params.pathMatch}`
    if (!params.pathMatch.includes('open')) {
      // find index document
      path = `/${params.pathMatch || 'index'}/index`
      if (params.pathMatch.includes('index')) {
        path = `/${params.pathMatch || 'index'}`
      }

      const [document] = await $content({ deep: true }).where({ path }).fetch()
      if (!document) {
        return error({ statusCode: 404, message: 'Page not found' })
      }

      return {
        document,
        menuDocuments,
        classObject,
      }
    } else {
      const [document] = await $content({ deep: true }).where({ path }).fetch()
      if (!document) {
        return error({ statusCode: 404, message: 'Page not found' })
      }
      return {
        document,
        menuDocuments,
        classObject,
      }
    }
  },
  head() {
    return {
      title:
        (this.document.head &&
          this.document.head.meta &&
          this.document.head.meta.title) ||
        this.document.title + ' - Awesome Nuxt.js',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            (this.document.head &&
              this.document.head.meta &&
              this.document.head.meta.description) ||
            this.document.description,
        },
        {
          name: 'keywords',
          content:
            (this.document.head &&
              this.document.head.meta &&
              this.document.head.meta.keywords) ||
            'Awesome',
        },
      ],
    }
  },
}
</script>
