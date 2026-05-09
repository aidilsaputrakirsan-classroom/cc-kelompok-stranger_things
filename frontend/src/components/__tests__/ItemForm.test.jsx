import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import { describe, it, expect, vi } from 'vitest'
import ItemForm from '../ItemForm'

describe('ItemForm Component', () => {

  it("submit form memanggil onSubmit", async () => {
  const mockSubmit = vi.fn().mockResolvedValue()

  render(<ItemForm onSubmit={mockSubmit} />)

  fireEvent.change(screen.getByPlaceholderText(/nama item/i), {
    target: { value: "Laptop" },
  })

  fireEvent.change(screen.getByPlaceholderText(/harga/i), {
    target: { value: "10000" },
  })

  fireEvent.submit(screen.getByRole("button", { name: /tambah item/i }))

  await waitFor(() => {
    expect(mockSubmit).toHaveBeenCalled()
  })
})

  it('validasi nama kosong', () => {
    render(<ItemForm onSubmit={() => {}} />)

    fireEvent.click(
  screen.getByRole("button", {
    name: /tambah item|save item/i,
  })
)

    expect(
      screen.getByText(/required|wajib/i)
    ).toBeInTheDocument()
  })

})