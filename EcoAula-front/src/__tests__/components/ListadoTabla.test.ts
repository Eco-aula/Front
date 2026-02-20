import { mount } from '@vue/test-utils'

import ListadoTabla from '@/components/listado/ListadoTabla.vue'
import type { ResiduoItem } from '@/types/residuos'

function createResiduos(): ResiduoItem[] {
  return [
    {
      id: 1,
      tipo: 'Papel y Carton',
      icon: 'description',
      cantidad: '10,0 kg',
      fecha: '01 Jan, 2024',
      estado: 'pendiente',
    },
    {
      id: 2,
      tipo: 'Residuo Desconocido',
      icon: 'icono-inexistente',
      cantidad: '2,0 kg',
      fecha: '02 Jan, 2024',
      estado: 'recogido',
    },
  ]
}

describe('ListadoTabla', () => {
  it('renders empty state rows and pagination counters', () => {
    const wrapper = mount(ListadoTabla, {
      props: {
        residuos: [],
        currentPage: 1,
        totalPages: 1,
        totalFiltrados: 0,
        itemsPerPage: 4,
      },
    })

    expect(wrapper.findAll('tbody tr')).toHaveLength(0)
    expect(wrapper.text()).toContain('Mostrando 1 a 0 de 0 entradas')
  })

  it('renders data rows and uses fallback icon when icon key is unknown', () => {
    const wrapper = mount(ListadoTabla, {
      props: {
        residuos: createResiduos(),
        currentPage: 1,
        totalPages: 1,
        totalFiltrados: 2,
        itemsPerPage: 4,
      },
    })

    expect(wrapper.text()).toContain('Papel y Carton')
    expect(wrapper.text()).toContain('Residuo Desconocido')
    expect(wrapper.html()).toContain('polyline points="14 2 14 8 20 8"')
  })

  it('emits pagination events for previous, numbered, and next buttons', async () => {
    const wrapper = mount(ListadoTabla, {
      props: {
        residuos: createResiduos(),
        currentPage: 2,
        totalPages: 3,
        totalFiltrados: 10,
        itemsPerPage: 4,
      },
    })

    const buttons = wrapper.findAll('button.page-btn')
    await buttons[0]!.trigger('click') // Anterior
    await buttons[2]!.trigger('click') // Pagina 2
    await buttons[4]!.trigger('click') // Siguiente

    expect(wrapper.emitted('goToPage')).toEqual([[1], [2], [3]])
  })
})
