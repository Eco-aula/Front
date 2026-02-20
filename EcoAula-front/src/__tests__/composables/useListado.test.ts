import { createPinia, setActivePinia } from 'pinia'
import { defineComponent } from 'vue'
import { mount } from '@vue/test-utils'

import { DEFAULT_RESIDUOS } from '@/data/defaultResiduos'
import { useListado } from '@/composables/useListado'
import { useResiduosStore } from '@/stores/residuos'
import { toResiduoItem } from '@/utils/residuos'

const Harness = defineComponent({
  name: 'UseListadoHarness',
  setup() {
    return useListado()
  },
  template: '<div />',
})

describe('useListado', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('handles pagination guards, watcher adjustment, and filter reset', async () => {
    const store = useResiduosStore()
    store.items = DEFAULT_RESIDUOS.map(toResiduoItem)
    store.hasLoaded = true

    const fetchSpy = vi.spyOn(store, 'fetchResiduos')

    const wrapper = mount(Harness)

    wrapper.vm.goToPage(2)
    expect(wrapper.vm.currentPage).toBe(2)

    wrapper.vm.goToPage(999)
    expect(wrapper.vm.currentPage).toBe(2)

    wrapper.vm.filtroPorTipo = 'metal'
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.currentPage).toBe(1)

    wrapper.vm.goToPage(2)
    expect(wrapper.vm.currentPage).toBe(1)

    wrapper.vm.aplicarFiltros()
    expect(wrapper.vm.currentPage).toBe(1)

    await wrapper.vm.recargar()
    expect(fetchSpy).toHaveBeenCalledWith(true)
  })
})
