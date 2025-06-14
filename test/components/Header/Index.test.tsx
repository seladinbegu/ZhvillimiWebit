import { render, screen } from '@testing-library/react';
import Header from '../../../pages/components/Header';

jest.mock('next-auth/react');
jest.mock('next/router', () => ({
  useRouter: () => ({
    pathname: '/',
    push: jest.fn(),
  }),
}));

describe('Header Component', () => {
  it('shfaq logo dhe linket kryesore', () => {
    render(<Header />);
    
    expect(screen.getByText('BlogIn 🚀')).toBeInTheDocument();
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
  });

  it('shfaq butonin e regjistrimit kur nuk është loguar', () => {
    render(<Header />);
    expect(screen.getByText('Regjistrohu')).toBeInTheDocument();
  });
});