let baseURL = process.env.VITE_BASE_API as string
const TIME_OUT = 10000

const mode = import.meta.env.MODE
if (mode === 'development') {
  baseURL = '/api'
}

export { baseURL, TIME_OUT }
