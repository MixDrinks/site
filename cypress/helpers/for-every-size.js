const defaultSizes = ['iphone-6', 'ipad-2', 'macbook-13'];

function forEverySize(options) {
    let tests;
    let sizes;
    if (typeof options === 'function') {
        tests = options;
        sizes = defaultSizes;
    } else {
        ({ sizes = defaultSizes, tests } = options);
    }
    sizes.forEach((size) => {
        context(`for ${size} screen size`, () => {
            beforeEach(() => {
                cy.viewport(size);
            });
            tests({ viewport: size });
        });
    });
}

export default forEverySize;