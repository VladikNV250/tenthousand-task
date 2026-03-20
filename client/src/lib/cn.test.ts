import { describe, expect, it } from 'vitest'

import { cn } from './cn'

describe('cn utility', () => {
    it('should merge tailwind classes properly', () => {
        expect(cn('text-black', 'text-white')).toBe('text-white')
        expect(cn('p-4', undefined, null, false, 'm-4')).toBe('p-4 m-4')
    })
})
