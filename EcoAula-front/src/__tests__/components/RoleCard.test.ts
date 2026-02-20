import { render, screen } from '@testing-library/vue'
import userEvent from '@testing-library/user-event'

import RoleCard from '@/components/login/RoleCard.vue'

describe('RoleCard', () => {
  it('emits selected role when clicked', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()

    render(RoleCard, {
      props: {
        value: 'admin',
        icon: 'shield',
        title: 'Administrador',
        description: 'Acceso completo',
        checked: false,
        onChange,
      },
    })

    await user.click(screen.getByText('Administrador'))

    expect(onChange).toHaveBeenCalledWith('admin')
  })
})
