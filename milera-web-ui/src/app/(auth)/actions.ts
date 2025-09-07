const BACKEND_URL =
    process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3000/api";

export async function loginAction(email: string, password: string) {
    try {
        const response = await fetch(`${BACKEND_URL}/auth/login/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            throw new Error("Login failed");
        }

        const data = await response.json();

        return data;
    } catch (error) {
        throw new Error("Failed to log in. Please try again.");
    }
}

export async function signUpAction(
    username: string,
    email: string,
    password: string
) {
    try {
        const response = await fetch(`${BACKEND_URL}/auth/sign-up`, {
            method: "POST",
            body: JSON.stringify({ username, email, password }),
        });

        if (!response.ok) {
            throw new Error("Sign Up failed");
        }

        const data = await response.json();

        return data;
    } catch (error) {
        throw new Error("Failed to sign up. Please try again.");
    }
}
