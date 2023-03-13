import { test, expect } from "@playwright/experimental-ct-react";

import { storyFrom } from "../../test/story.js";

import { LoginForm } from "./LoginForm";

let config = {
    routes: {
        onSubmit: "**/auth/login",
    },
    selectors: {
        form: "#login-form",
        fieldEmailLabel: "#login-form-field-email-label",
        fieldEmailInput: "#login-form-field-email-input",
        fieldPasswordLabel: "#login-form-field-password-label",
        fieldPasswordInput: "#login-form-field-password-input",
        actionSubmit: "#login-form-action-submit",
        actionReset: "#login-form-action-reset",
    },
};

test(
    storyFrom({
        as: "regular user",
        want: "to see the form on the screen",
    }),
    async ({ mount }) => {
        let component = await mount(<LoginForm />);

        let form = component.locator(config.selectors.form);

        await Promise.all([
            expect(form).toBeVisible(),

            expect(form.locator(config.selectors.fieldEmailLabel)).toBeVisible(),
            expect(form.locator(config.selectors.fieldEmailInput)).toBeVisible(),

            expect(form.locator(config.selectors.fieldPasswordLabel)).toBeVisible(),
            expect(form.locator(config.selectors.fieldPasswordInput)).toBeVisible(),

            expect(form.locator(config.selectors.actionReset)).toBeVisible(),
            expect(form.locator(config.selectors.actionSubmit)).toBeVisible(),
        ]);
    }
);

test(
    storyFrom({
        as: "regular user",
        want: "to send the correct payload when submit",
    }),
    async ({ mount, page }) => {
        await page.route(config.routes.onSubmit, async (route): Promise<void> => {
            let request = route.request();
            let requestBody = request.postData();
            let requestBodyParsed = JSON.parse(requestBody as string);

            expect(Object.keys(requestBodyParsed)).toStrictEqual(["email", "password"]);
            expect(requestBodyParsed.email).toBe("cristian.enguidanos@plainconcepts.com");
            expect(requestBodyParsed.password).toBe("1234");

            await route.fulfill({ body: "Accepted", status: 202 });
        });

        let component = await mount(<LoginForm />);

        let form = component.locator(config.selectors.form);

        let formFieldEmailInput = form.locator(config.selectors.fieldEmailInput);
        await formFieldEmailInput.type("cristian.enguidanos@plainconcepts.com", { delay: 20 });

        let formFieldPasswordInput = form.locator(config.selectors.fieldPasswordInput);
        await formFieldPasswordInput.type("1234", { delay: 50 });

        let formActionSubmit = form.locator(config.selectors.actionSubmit);
        await Promise.all([page.waitForResponse(config.routes.onSubmit), formActionSubmit.click()]);
    }
);
