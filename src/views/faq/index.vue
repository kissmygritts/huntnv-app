<script setup>
import NdowMobileNavbar from '../../components/ndow-mobile-navbar.vue'
</script>

<template>
  <div class="flex flex-col flex-1 overflow-y-auto bg-gray-200">
    <ndow-mobile-navbar class="sticky top-0 z-30" />

    <div class="max-w-4xl mx-auto mt-8 w-full text-gray-700">
      <h1 class="text-gray-800 font-bold text-2xl">FAQs</h1>
      <p>
        A collection of frequently asked questions and information to help you
        navigate HuntNV.
      </p>

      <div class="mt-4 space-y-4">
        <div
          class="space-y-2.5 bg-gray-50 rounded-lg p-4 border-2 border-gray-300/60"
        >
          <h2 class="text-xl font-semibold leading-relaxed">Definitions</h2>
          <ul class="list-disc list-inside">
            <li>
              <strong class="font-medium">Harvest:</strong> The harvest success
              rate reported from hunter feedback surveys.
            </li>
            <li>
              <strong class="font-medium">Maturity:</strong> The percentage of
              males taken that meet the following maturity guidelines:
              <ul class="list-disc list-inside ml-6">
                <li>
                  <span class="font-medium">Antelope:</span> 15" or greater horn
                  length.
                </li>
                <li>
                  <span class="font-medium">Bighorn Sheep:</span>
                  7 years or older.
                </li>
                <li>
                  <span class="font-medium">Elk:</span> 50" or greater main beam
                  length.
                </li>
                <li>
                  <span class="font-medium">Mule Deer:</span> 4 points or
                  greater.
                </li>
              </ul>
            </li>
            <li>
              <strong class="font-medium">Median BP:</strong>
              The median number of bonus points of successful applicants. Median
              is the middle number in a sorted list of numbers.
            </li>
            <li>
              <strong class="font-medium">Draw Difficulty:</strong>
              This groups hunts into 5 categories based on the draw rate. VH:
              very hard, H: harder, M: moderately difficult, E: easier, VE:
              easiest.
            </li>
            <li>
              <strong class="font-medium">Draw Rank:</strong>
              The ranking of how difficult a hunt is to draw. 1 is the most
              difficult. The higher the number the easier to draw.
            </li>
          </ul>
        </div>

        <div
          class="space-y-2.5 bg-gray-50 rounded-lg p-4 p-4 border-2 border-gray-300/60"
        >
          <h2 class="text-xl font-semibold leading-relaxed">About the Data</h2>
          <p>
            The data for HuntNV is gathered and collected by the Nevada
            Department of Wildlife over the course a hunt year (the hunt year
            starts with the setting of the seasons).
          </p>
          <p>
            Hunt seasons are generally set at a commission meeting in January or
            February. Once the seasons are set and confirmed with Kalkomey the
            data will be available in HuntNV.
          </p>
          <p>
            Quotas are set in the May commission meeting. The quotas are
            available as a PDF prior to the application deadline in mid May. The
            quotas will not be available in HuntNV until after the draw results
            are released.
          </p>
          <p>
            Draw data is collected after the draw is run in mid May. This data
            will not be available in HuntNV until after the results are
            released. There are a few things to be aware of about the draw data.
            The data presented in HuntNV are summary statistics based on the
            results of the main draw. Second draw statistics will not be
            available in HuntNV. The draw stats presented in HuntNV are similar
            to the draw stats published by NDOW prior to the application period.
          </p>
          <p>
            Harvest data is compiled after the harvest return card deadline. The
            previous years harvest data will be available sometime between that
            deadline (typically Jan. 31st) and the opening of the application
            period (typically late March).
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
