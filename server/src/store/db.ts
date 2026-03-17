import { randomUUID } from 'node:crypto'
import type { Form, Response } from '../generated/graphql.js'

interface Entity {
    id: string
}

class InMemoryStore<T extends Entity> {
    private items: Map<string, T> = new Map()

    getAll(): T[] {
        return Array.from(this.items.values())
    }

    getById(id: string): T | undefined {
        return this.items.get(id)
    }

    create(item: Omit<T, 'id'> & { id?: string }): T {
        const id = item.id ?? randomUUID()
        const newItem = { ...item, id } as unknown as T
        this.items.set(id, newItem)
        return newItem
    }

    update(id: string, item: Partial<Omit<T, 'id'>>): T | undefined {
        const existing = this.items.get(id)
        if (!existing) return undefined

        const updated = { ...existing, ...item } as T
        this.items.set(id, updated)
        return updated
    }

    delete(id: string): boolean {
        return this.items.delete(id)
    }
}

export const formStore = new InMemoryStore<Form>()
export const responseStore = new InMemoryStore<Response>()
