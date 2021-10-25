import { faas, useFaas } from '@faasjs/react'

declare global {
  interface Window {
    faas: faas
    useFaas: useFaas
  }
}
