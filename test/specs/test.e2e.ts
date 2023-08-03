import { expect, browser, $ } from '@wdio/globals'

describe('Decentral Spark Sign Up Form', () => {
	it("should show an error message if you don't fill it out", async () => {
		await browser.url(`/register`)

		await $('aria/Sign Up').click()

		await expect($('aria/Please fill in all fields')).toBePresent()
	})

	it('should show an error message if password is too short', async () => {
		await browser.url(`/register`)

		await $('[data-test-id=email]').setValue('joezim007@gmail.com')
		await $('[data-test-id=password]').setValue('abc')
		await $('[data-test-id=confirm-password]').setValue('abc')
		await $('aria/Sign Up').click()

		await expect($('aria/Password should be at least 6 characters')).toBePresent()
	})
})
