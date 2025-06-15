import { render, screen, fireEvent } from "@testing-library/react";
import GoogleLoginButton from "../../pages/components/Buttons/googleloginbutton";
import * as nextAuth from "next-auth/react";

describe("GoogleLoginButton", () => {
  it("calls signIn with 'google' when clicked", () => {
    const signInMock = jest.spyOn(nextAuth, "signIn").mockResolvedValue(undefined);

    render(<GoogleLoginButton />);
    const button = screen.getByRole("button", { name: /sign in with google/i });

    fireEvent.click(button);

    expect(signInMock).toHaveBeenCalledWith("google");

    signInMock.mockRestore();
  });
});