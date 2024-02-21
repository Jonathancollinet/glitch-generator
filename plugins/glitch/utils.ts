export function logErrors(errors: GlitchError[]) {
    errors.forEach(error => {
        console.error(`Error: ${error.code} at ${error.property}: ${error.message}`);
    });
}