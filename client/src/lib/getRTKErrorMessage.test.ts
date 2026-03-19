import { describe, expect, it } from 'vitest'

import { getRTKErrorMessage } from './getRTKErrorMessage'

describe('getRTKErrorMessage', () => {
    it('should extract error message if available', () => {
        const error = { message: 'Network Error' }
        expect(getRTKErrorMessage(error)).toBe('Network Error')
    })

    it('should return default fallback if message is missing but error exists', () => {
        const error = { somethingElse: true }
        expect(getRTKErrorMessage(error)).toBe('Something went wrong on the server')
    })

    it('should return null if error is falsy', () => {
        expect(getRTKErrorMessage(undefined)).toBeNull()
        expect(getRTKErrorMessage(null)).toBeNull()
    })
})
