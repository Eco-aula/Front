import { mount } from '@vue/test-utils'

import ListadoFiltros from '@/components/listado/ListadoFiltros.vue'

function createProps() {
  return {
    filtroPorTipo: 'todos',
    filtroRangoFecha: '30dias',
    filtroEstado: 'todos',
    opcionesTipo: [
      { value: 'todos', label: 'Todos los tipos' },
      { value: 'papel', label: 'Papel y Carton' },
      { value: 'plastico', label: 'Plasticos (PET)' },
    ],
    opcionesRango: [
      { value: '7dias', label: 'Ultimos 7 dias' },
      { value: '30dias', label: 'Ultimos 30 dias' },
    ],
    opcionesEstado: [
      { value: 'todos', label: 'Todos los estados' },
      { value: 'pendiente', label: 'Pendiente' },
      { value: 'recogido', label: 'Recogido' },
    ],
  }
}

describe('ListadoFiltros', () => {
  it('emits updates for all filters and filtrar action', async () => {
    const wrapper = mount(ListadoFiltros, {
      props: createProps(),
    })

    const selects = wrapper.findAll('select')
    await selects[0]!.setValue('plastico')
    await selects[1]!.setValue('7dias')
    await selects[2]!.setValue('pendiente')
    await wrapper.get('button.filter-btn').trigger('click')

    expect(wrapper.emitted('update:filtroPorTipo')?.[0]).toEqual(['plastico'])
    expect(wrapper.emitted('update:filtroRangoFecha')?.[0]).toEqual(['7dias'])
    expect(wrapper.emitted('update:filtroEstado')?.[0]).toEqual(['pendiente'])
    expect(wrapper.emitted('filtrar')).toHaveLength(1)
  })
})
