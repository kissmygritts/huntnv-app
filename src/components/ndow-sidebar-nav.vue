<template>
  <div class="relative z-50 hidden lg:flex lg:flex-shrink-0">
    <div class="flex flex-col w-16">
      <div class="flex flex-col h-0 flex-1 overflow-y-auto bg-oxford-700">
        <div class="flex-1 flex flex-col">
          <router-link
            to="/"
            class="flex-shrink-0 bg-oxford-700 py-2 flex items-center justify-center"
          >
            <img
              class="h-16 w-auto ml-1 img-fix"
              src="../assets/images/huntnv-logo_200x160.png"
              alt="HuntNV Logo"
            />
          </router-link>
          <nav
            aria-label="Sidebar"
            class="py-3 px-2 flex flex-col items-center space-y-3"
          >
            <router-link
              v-for="item in navigation"
              :key="item.name"
              :to="item.href"
              class="group w-full p-1.5 rounded-lg flex flex-col items-center text-xs text-gray-200/95 hover:bg-oxford-600 group"
              :class="[item.href === '#' ? 'cursor-not-allowed' : '']"
            >
              <component
                :is="item.icon"
                class="h-7 w-7 group-hover:text-saffron-500"
                aria-hidden="true"
              />
              <p class="mt-1">{{ item.name }}</p>
            </router-link>
          </nav>
        </div>
        <div class="flex-shrink-0 flex pb-5" title="ndow.org">
          <a
            href="http://ndow.org"
            class="flex-shrink-0 w-full"
            target="_blank"
            rel="noreferrer noopener"
          >
            <img
              class="block mx-auto h-auto w-16 img-fix"
              src="https://ndow-cdn.s3.us-west-2.amazonaws.com/ndow-logo.png"
              alt="to ndow.org website"
            />
            <div class="sr-only">
              <p>To ndow.org website</p>
            </div>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ndow-sidebar-nav',
  props: {
    navigation: Array
  }
}
</script>

<style scoped>
@media screen and (-webkit-min-device-pixel-ratio: 0) and (min-resolution: 0.001dpcm) {
  .img-fix {
    image-rendering: -webkit-optimize-contrast !important;
  }
}

@media not all and (min-resolution: 0.001dpcm) {
  @supports (-webkit-apperance: none) and (stroke-color: transparent) {
    .img-fix {
      image-rendering: unset !important;
    }
  }
}
</style>
