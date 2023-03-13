async function handleFormSubmitEvent(ev: React.FormEvent<HTMLFormElement>): Promise<void> {
    ev.preventDefault();

    let formData: FormData = new FormData(ev.target as HTMLFormElement);

    let body = {
        email: formData.get("email"),
        password: formData.get("password"),
    };

    let request: RequestInit = {
        method: "POST",
        body: JSON.stringify(body),
    };

    await fetch("/auth/login", request);
}

export let LoginForm: React.FunctionComponent = () => {
    return (
        <div className="bg-white text-neutral-800 rounded border border-neutral-200 max-w-2xl">
            <form id="login-form" onSubmit={handleFormSubmitEvent} className="grid gap-5">
                <fieldset className="grid gap-2 pt-5 px-5">
                    <label id="login-form-field-email-label" htmlFor="login-form-field-email-input" className="font-semibold text-sm">
                        Email
                    </label>

                    <input
                        id="login-form-field-email-input"
                        type="email"
                        placeholder="Email"
                        name="email"
                        className="rounded border-neutral-300"
                    />
                </fieldset>

                <fieldset className="grid gap-2 px-5">
                    <label id="login-form-field-password-label" htmlFor="login-form-field-password-input" className="font-semibold text-sm">
                        Password
                    </label>

                    <input
                        id="login-form-field-password-input"
                        type="password"
                        placeholder="Password"
                        name="password"
                        className="rounded border-neutral-300"
                    />
                </fieldset>

                <footer className="p-3 bg-neutral-100 flex gap-3 items-center justify-end">
                    <button
                        id="login-form-action-reset"
                        type="reset"
                        className="bg-neutral-800 text-white rounded px-2 py-1 hover:bg-neutral-700 active:bg-neutral-800 w-32"
                    >
                        Reset
                    </button>

                    <button
                        id="login-form-action-submit"
                        type="submit"
                        className="bg-blue-600 text-white rounded px-2 py-1 hover:bg-blue-500 active:bg-blue-700 w-32"
                    >
                        Submit
                    </button>
                </footer>
            </form>
        </div>
    );
};
