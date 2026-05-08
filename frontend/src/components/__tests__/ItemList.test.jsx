import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import ItemList from '../ItemList'

const mockItems = [
  {
    id: 1,
    name: 'Laptop',
    price: 15000000
  },
  {
    id: 2,
    name: 'Mouse',
    price: 250000
  }
]

describe('ItemList Component', () => {

  it('menampilkan empty state', () => {
    render(<ItemList items={[]} />)

    expect(
  screen.getByText(/belum ada item/i)
).toBeInTheDocument()
  })

  it('menampilkan daftar item', () => {
    render(<ItemList items={mockItems} />)

    expect(screen.getByText('Laptop')).toBeInTheDocument()
    expect(screen.getByText('Mouse')).toBeInTheDocument()
  })

  it('menampilkan jumlah item', () => {
    render(<ItemList items={mockItems} />)

    expect(screen.getAllByRole('listitem').length).toBe(2)
  })

})