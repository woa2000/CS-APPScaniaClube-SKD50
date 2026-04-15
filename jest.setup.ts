import '@testing-library/jest-native/extend-expect'

jest.mock('expo-updates', () => ({
  reloadAsync: jest.fn()
}))
