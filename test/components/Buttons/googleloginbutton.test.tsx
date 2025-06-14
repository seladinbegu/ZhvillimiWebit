import { render, screen, fireEvent } from '@testing-library/react';
import GoogleLoginButton from '../../../pages/components/Buttons/googleloginbutton';
import { signIn } from 'next-auth/react';

// Mock next-auth/react
jest.mock('next-auth/react', () => ({
  signIn: jest.fn(),
}));

describe('GoogleLoginButton', () => {
  it('renderon butonin me tekstin e saktë', () => {
    render(<GoogleLoginButton />);
    
    const button = screen.getByRole('button', { name: /sign in with google/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('bg-red-600');
    expect(button).toHaveClass('hover:bg-red-700');
  });

  it('thërret signIn me "google" kur klikohet', () => {
    render(<GoogleLoginButton />);
    
    const button = screen.getByRole('button', { name: /sign in with google/i });
    fireEvent.click(button);
    
    expect(signIn).toHaveBeenCalledTimes(1);
    expect(signIn).toHaveBeenCalledWith('google');
  });

  it('ka stilizimin e saktë', () => {
    const { container } = render(<GoogleLoginButton />);
    
    const button = container.firstChild;
    expect(button).toHaveClass(
      'bg-red-600',
      'text-white',
      'px-4',
      'py-2',
      'rounded',
      'hover:bg-red-700'
    );
  });
});