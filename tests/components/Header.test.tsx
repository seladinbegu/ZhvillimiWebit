import { render, screen, fireEvent } from "@testing-library/react";
import Header from "../../pages/components/Header";
import * as nextAuth from "next-auth/react";
import * as nextRouter from "next/router";

describe("Header component", () => {
  const signOutMock = jest.fn();
  const pushMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    // Mock next/router
    jest.spyOn(nextRouter, "useRouter").mockReturnValue({
      pathname: "/",
      push: pushMock,
      prefetch: jest.fn().mockResolvedValue(undefined),
      route: "/",
      query: {},
      asPath: "/",
      replace: jest.fn(),
      reload: jest.fn(),
      back: jest.fn(),
      forward: jest.fn(),
      beforePopState: jest.fn(),
      events: { on: jest.fn(), off: jest.fn(), emit: jest.fn() },
      isFallback: false,
      isReady: true,
      isPreview: false,
      basePath: "",
      locale: undefined,
      locales: undefined,
      defaultLocale: undefined,
      isLocaleDomain: false,
    });

    // Mock signOut
    jest.spyOn(nextAuth, "signOut").mockImplementation(signOutMock);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("renders navigation items for logged-out user", () => {
    jest.spyOn(nextAuth, "useSession").mockReturnValue({
      data: null,
      status: "unauthenticated",
      update: jest.fn().mockResolvedValue(undefined),
    });

    render(<Header />);

    expect(screen.getByText(/Home/i)).toBeInTheDocument();
    expect(screen.getByText(/About/i)).toBeInTheDocument();
    expect(screen.getByText(/Contact/i)).toBeInTheDocument();

    expect(screen.getByRole("button", { name: /Regjistrohu/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Kyçu/i })).toBeInTheDocument();
  });

  it("renders user email and logout button when logged in", () => {
    jest.spyOn(Storage.prototype, "getItem").mockImplementation((key) => {
      if (key === "email") return "user@example.com";
      if (key === "role") return "user";
      return null;
    });

    jest.spyOn(nextAuth, "useSession").mockReturnValue({
      data: {
        user: { name: "User", email: "user@example.com" },
        expires: new Date(Date.now() + 3600 * 1000).toISOString(),
      },
      status: "authenticated",
      update: jest.fn().mockResolvedValue(undefined),
    });

    render(<Header />);

    expect(screen.getByText("user@example.com")).toBeInTheDocument();

    const logoutButton = screen.getByRole("button", { name: /Dil/i });
    expect(logoutButton).toBeInTheDocument();

    fireEvent.click(logoutButton);
    expect(signOutMock).toHaveBeenCalledWith({ callbackUrl: "/sign-in" });
  });

  it("renders admin specific nav items when role is admin", () => {
    jest.spyOn(Storage.prototype, "getItem").mockImplementation((key) => {
      if (key === "email") return "admin@example.com";
      if (key === "role") return "admin";
      return null;
    });

    jest.spyOn(nextAuth, "useSession").mockReturnValue({
      data: {
        user: { name: "Admin", email: "admin@example.com" },
        expires: new Date(Date.now() + 3600 * 1000).toISOString(),
      },
      status: "authenticated",
      update: jest.fn().mockResolvedValue(undefined),
    });

    render(<Header />);

    expect(screen.getByText("News For Admin")).toBeInTheDocument();
    expect(screen.getByText("Blogs For Admin")).toBeInTheDocument();
    expect(screen.getByText("Admin Dashboard")).toBeInTheDocument();
  });

  it("navigates to sign-up page on Regjistrohu button click", () => {
    jest.spyOn(nextAuth, "useSession").mockReturnValue({
      data: null,
      status: "unauthenticated",
      update: jest.fn().mockResolvedValue(undefined),
    });

    render(<Header />);
    const signupBtn = screen.getByRole("button", { name: /Regjistrohu/i });
    fireEvent.click(signupBtn);

    expect(pushMock).toHaveBeenCalledWith("/sign-up");
  });

  it("navigates to sign-in page on Kyçu button click", () => {
    jest.spyOn(nextAuth, "useSession").mockReturnValue({
      data: null,
      status: "unauthenticated",
      update: jest.fn().mockResolvedValue(undefined),
    });

    render(<Header />);
    const signinBtn = screen.getByRole("button", { name: /Kyçu/i });
    fireEvent.click(signinBtn);

    expect(pushMock).toHaveBeenCalledWith("/sign-in");
  });
});