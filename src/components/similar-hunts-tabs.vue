<template>
  <div>
    <div class="sm:hidden">
      <label for="tabs" class="sr-only">Select a tab</label>
      <select id="tabs" name="tabs" class="capitalize block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
        <option v-for="result in results" :key="result.species" :selected="result.current">{{ result.species }} ({{ result.count }})</option>
      </select>
    </div>
    <div class="hidden sm:block">
      <div class="border-b border-gray-200">
        <div class="-mb-px flex space-x-8 capitalize" aria-label="Tabs">
          <a v-for="result in results" :key="result.species" href="#" :class="[result.current ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-200', 'whitespace-nowrap flex py-4 px-1 border-b-2 font-medium text-sm']" :aria-current="result.current ? 'page' : undefined">
            {{ result.species }}
            <span v-if="result.count" :class="[result.current ? 'bg-indigo-100 text-indigo-600' : 'bg-gray-100 text-gray-900', 'hidden ml-3 py-0.5 px-2.5 rounded-full text-xs font-medium md:inline-block']">{{ result.count }}</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['hunt'],
  data () {
    return {
      results: null
    }
  },
  created () {
    this.setHunts()
  },
  methods: {
    setHunts () {
      const hunts = this.hunt.similar_hunts
      console.log(hunts)
      const data = {}

      for (const { species } of hunts) {
        data[species] = {
          species,
          count: data[species] ? data[species].count + 1 : 1
        }
      }

      const result = Object.values(data)
      console.log(result)
      this.results = result
    }
  }
}
</script>
