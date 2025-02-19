import { render, screen, fireEvent } from '@testing-library/react';
import EmailForm from '@/components/forms/EmailForm';

describe('EmailForm', () => {
  it('renders the form correctly', () => {
    render(<EmailForm />);
    expect(screen.getByPlaceholderText(/paste your text here/i)).toBeInTheDocument();
  });

  it('extracts emails when clicking extract button', async () => {
    render(<EmailForm />);
    const input = screen.getByPlaceholderText(/paste your text here/i);
    fireEvent.change(input, { target: { value: 'test@example.com' } });
    
    const extractButton = screen.getByText(/extract email addresses/i);
    fireEvent.click(extractButton);

    const output = await screen.findByText('test@example.com');
    expect(output).toBeInTheDocument();
  });
});