 export const santitize = (str: string): string => {
	return str
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric characters with hyphens
		.replace(/^-+|-+$/g, ''); // Remove leading and trailing hyphens
}