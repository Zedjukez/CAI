function compileCustomCSS(className) {
    // Split the class name into parts
    const parts = className.split(':');

    // Extract the style property and value
    const styleProperty = parts[0];
    const styleValue = parts[1];

    // Create the CSS rule
    const cssRule = `${styleProperty}: ${styleValue};`;

    // Return the compiled CSS rule
    return cssRule;
}

export function JavaScript_CSS_Color_Compiler() {
    const elements = document.querySelectorAll('[class*="color:"], [class*="background-color:"]');

    console.log(elements)

    elements.forEach(element => {
        const classList = element.classList;
        classList.forEach(className => {
            if (className.includes('color:') || className.includes('background-color:')) {
                const compiledCSS = compileCustomCSS(className);
                console.log(compiledCSS)
                element.style.cssText = compiledCSS;
            }
        });
    });
}