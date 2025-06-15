import { render, screen } from "@testing-library/react";
import Card from "../../pages/components/Card";
import '@testing-library/jest-dom'; // Ensure this is included if not already globally configured
import { useRouter } from "next/router";
import Link from "next/link";

// Optional: Mock Next.js router if needed
jest.mock("next/link", () => {
  return ({ children, href }: any) => <a href={href}>{children}</a>;
});

describe("Card component", () => {
  const props = {
    title: "Test Title",
    description: "This is a test description.",
    href: "/test-page"
  };

  it("renders the title and description", () => {
    render(<Card {...props} />);
    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("This is a test description.")).toBeInTheDocument();
  });

  it("renders a link with the correct href", () => {
    render(<Card {...props} />);
    const link = screen.getByRole("link", { name: /read more/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/test-page");
  });
});