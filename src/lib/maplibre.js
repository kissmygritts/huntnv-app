import maplibregl from 'maplibre-gl'

const MAPTILER_KEY = import.meta.env.VITE_MAPTILER_KEY

export const renderMaplibre = (options, layers) => {
  const map = new maplibregl.Map(
    Object.assign(
      {
        container: 'maplibre-map',
        style: `https://api.maptiler.com/maps/voyager/style.json?key=${MAPTILER_KEY}`,
        center: [-116.6554, 38.55],
        zoom: 6
      },
      options
    )
  )

  map.on('style.load', () => {
    layers.forEach((def) => {
      const sources = Object.keys(def.source)
      sources.forEach((source) => {
        map.addSource(source, def.source[source])
      })
      def.layers.forEach((layer) => {
        map.addLayer(layer, layer.id === 'unit-labels' ? '' : 'unit-labels')
      })
    })
  })

  map.on('click', 'hunt-geometry-fill', (e) => {
    console.log(e.features[0])
  })

  return map
}
