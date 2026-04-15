type TelemetryLevel = 'info' | 'error'

interface TelemetryPayload {
  [key: string]: unknown
}

function log(level: TelemetryLevel, eventName: string, payload?: TelemetryPayload) {
  const timestamp = new Date().toISOString()
  const data = payload ?? {}

  if (level === 'error') {
    console.error('[telemetry]', timestamp, eventName, data)
    return
  }

  console.log('[telemetry]', timestamp, eventName, data)
}

export function trackEvent(eventName: string, payload?: TelemetryPayload) {
  log('info', eventName, payload)
}

export function trackError(eventName: string, payload?: TelemetryPayload) {
  log('error', eventName, payload)
}
