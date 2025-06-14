import { render, screen } from '@testing-library/react';
import Card from '../../../pages/components/Card';
import Link from 'next/link';

// Mock next/link për testim
jest.mock('next/link', () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => {
    return <a href={href}>{children}</a>;
  };
});

describe('Card Component', () => {
  const mockProps = {
    title: 'Test Title',
    description: 'Test Description',
    href: '/test-path'
  };

  it('shfaq titullin dhe përshkrimin saktë', () => {
    render(<Card {...mockProps} />);
    
    expect(screen.getByText(mockProps.title)).toBeInTheDocument();
    expect(screen.getByText(mockProps.description)).toBeInTheDocument();
  });

  it('shfaq linkun "Read More" me href të saktë', () => {
    render(<Card {...mockProps} />);
    
    const link = screen.getByText('Read More →');
    expect(link).toBeInTheDocument();
    expect(link.closest('a')).toHaveAttribute('href', mockProps.href);
  });

  it('aplikon klasat e sakta CSS', () => {
    const { container } = render(<Card {...mockProps} />);
    
    // Test për klasën e div-it kryesor
    expect(container.firstChild).toHaveClass(
      'bg-white',
      'rounded-xl',
      'shadow',
      'hover:shadow-xl',
      'p-6'
    );
    
    // Test për klasën e titullit
    expect(screen.getByText(mockProps.title)).toHaveClass(
      'text-xl',
      'font-semibold',
      'text-gray-900'
    );
  });

  it('renderon saktë me props të ndryshme', () => {
    const newProps = {
      title: 'New Title',
      description: 'New Description',
      href: '/new-path'
    };
    
    render(<Card {...newProps} />);
    
    expect(screen.getByText(newProps.title)).toBeInTheDocument();
    expect(screen.getByText(newProps.description)).toBeInTheDocument();
    expect(screen.getByText('Read More →').closest('a')).toHaveAttribute('href', newProps.href);
  });
});