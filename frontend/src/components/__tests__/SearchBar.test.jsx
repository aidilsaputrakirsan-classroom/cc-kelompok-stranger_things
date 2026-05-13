import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import SearchBar from '../SearchBar'

describe('SearchBar Component', () => {

  it('menampilkan input search', () => {
    render(<SearchBar onSearch={() => {}} />)

    expect(
      screen.getByPlaceholderText(/cari item/i)
    ).toBeInTheDocument()
  })

  it("memanggil onSearch saat submit", () => {
  const handleSearch = vi.fn()

  render(<SearchBar onSearch={handleSearch} />)

  const input = screen.getByPlaceholderText(/cari item/i)

  fireEvent.change(input, {
    target: { value: "Laptop" },
  })

  fireEvent.click(screen.getByText(/cari/i))

  expect(handleSearch).toHaveBeenCalled()
  expect(handleSearch).toHaveBeenCalledWith("Laptop")
})

  it('bisa clear input', () => {
    render(<SearchBar onSearch={() => {}} />)

    const input = screen.getByPlaceholderText(/cari item/i)

    fireEvent.change(input, {
      target: { value: 'Mouse' }
    })

    expect(input.value).toBe('Mouse')

    fireEvent.change(input, {
      target: { value: '' }
    })

    expect(input.value).toBe('')
  })

})