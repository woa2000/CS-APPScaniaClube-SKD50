import React from 'react'
import { render } from '@testing-library/react-native'
import { Routes } from './index'

jest.mock('../contexts/auth', () => ({
  useAuth: jest.fn()
}))

jest.mock('./auth.routes', () => ({
  AuthRoutes: () => null
}))

jest.mock('./app.routes', () => ({
  AppRoutes: () => null
}))

jest.mock('./privacy.routes', () => ({
  PrivacyRoutes: () => null
}))

describe('Routes', () => {
  it('shows loading indicator while auth is loading', () => {
    const { useAuth } = require('../contexts/auth')
    useAuth.mockReturnValue({
      signed: false,
      loading: true,
      user: null
    })

    const { getByTestId } = render(<Routes />)

    expect(getByTestId('routes-loading')).toBeTruthy()
  })
})
