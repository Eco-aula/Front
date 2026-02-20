import { render, screen } from '@testing-library/vue'
import userEvent from '@testing-library/user-event'
import { http, HttpResponse } from 'msw'

import LoginForm from '@/components/login/LoginForm.vue'
import RegisterForm from '@/components/login/RegisterForm.vue'
import { server } from '@/mocks/server'

const API_BASE = '*/api/v1'

describe('LoginForm', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('shows required field errors when inputs are empty', async () => {
    const user = userEvent.setup()

    render(LoginForm)
    await user.click(screen.getByRole('button', { name: /entrar/i }))

    expect(
      await screen.findByText('Ingrese un correo electronico valido.'),
    ).toBeInTheDocument()
    expect(
      screen.getByText('La contrasena debe tener al menos 6 caracteres.'),
    ).toBeInTheDocument()
  })

  it('shows email validation error for invalid email format', async () => {
    const user = userEvent.setup()

    render(LoginForm)
    await user.type(screen.getByLabelText(/correo electronico/i), 'correo-invalido')
    await user.type(screen.getByLabelText(/contrasena/i), 'secret123')
    await user.click(screen.getByRole('button', { name: /entrar/i }))

    expect(
      await screen.findByText('Ingrese un correo electronico valido.'),
    ).toBeInTheDocument()
  })

  it('submits successfully with valid credentials', async () => {
    const user = userEvent.setup()

    localStorage.setItem('ecoaula_current_user_id', '1')

    server.use(
      http.get(`${API_BASE}/users/1`, () => {
        return HttpResponse.json(
          {
            id: 1,
            name: 'Usuario QA',
            email: 'qa@example.com',
            password: 'secret123',
          },
          { status: 200 },
        )
      }),
    )

    render(LoginForm)
    await user.type(screen.getByLabelText(/correo electronico/i), 'qa@example.com')
    await user.type(screen.getByLabelText(/contrasena/i), 'secret123')
    await user.click(screen.getByRole('button', { name: /entrar/i }))

    expect(await screen.findByText('Inicio de sesion exitoso.')).toBeInTheDocument()
  })

  it('shows backend error on login failure', async () => {
    const user = userEvent.setup()

    localStorage.setItem('ecoaula_current_user_id', '999')

    server.use(
      http.get(`${API_BASE}/users/999`, () => {
        return HttpResponse.json({ message: 'Usuario no encontrado' }, { status: 404 })
      }),
    )

    render(LoginForm)
    await user.type(screen.getByLabelText(/correo electronico/i), 'qa@example.com')
    await user.type(screen.getByLabelText(/contrasena/i), 'secret123')
    await user.click(screen.getByRole('button', { name: /entrar/i }))

    expect(await screen.findByText('Usuario no encontrado')).toBeInTheDocument()
  })
})

describe('RegisterForm', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('shows required field errors when inputs are empty', async () => {
    const user = userEvent.setup()

    render(RegisterForm)
    await user.click(screen.getByRole('button', { name: /registrarse/i }))

    expect(
      await screen.findByText('Ingrese un nombre valido (minimo 3 caracteres).'),
    ).toBeInTheDocument()
    expect(screen.getByText('Ingrese un correo electronico valido.')).toBeInTheDocument()
    expect(
      screen.getByText('La contrasena debe tener al menos 6 caracteres.'),
    ).toBeInTheDocument()
  })

  it('shows email validation error for invalid register email', async () => {
    const user = userEvent.setup()

    render(RegisterForm)
    await user.type(screen.getByLabelText(/^nombre$/i), 'Usuario QA')
    await user.type(screen.getByLabelText(/correo electronico/i), 'correo-invalido')
    await user.type(screen.getByLabelText(/contrasena/i), 'secret123')
    await user.click(screen.getByRole('button', { name: /registrarse/i }))

    expect(
      await screen.findByText('Ingrese un correo electronico valido.'),
    ).toBeInTheDocument()
  })

  it('submits successfully with valid register payload', async () => {
    const user = userEvent.setup()

    render(RegisterForm)
    await user.type(screen.getByLabelText(/^nombre$/i), 'Usuario QA')
    await user.type(screen.getByLabelText(/correo electronico/i), 'new@example.com')
    await user.type(screen.getByLabelText(/contrasena/i), 'secret123')
    await user.click(screen.getByRole('button', { name: /registrarse/i }))

    expect(await screen.findByText('Registro exitoso.')).toBeInTheDocument()
  })

  it('shows backend error on register failure', async () => {
    const user = userEvent.setup()

    server.use(
      http.post(`${API_BASE}/users`, () => {
        return HttpResponse.json({ message: 'El correo ya existe' }, { status: 409 })
      }),
    )

    render(RegisterForm)
    await user.type(screen.getByLabelText(/^nombre$/i), 'Usuario QA')
    await user.type(screen.getByLabelText(/correo electronico/i), 'new@example.com')
    await user.type(screen.getByLabelText(/contrasena/i), 'secret123')
    await user.click(screen.getByRole('button', { name: /registrarse/i }))

    expect(await screen.findByText('El correo ya existe')).toBeInTheDocument()
  })
})
