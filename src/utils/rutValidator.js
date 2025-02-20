export const RUTValidator = {
    clean: (rut) => rut.replace(/[^0-9kK]/g, '').toUpperCase(),

    validate: (rut) => {
        const cleaned = RUTValidator.clean(rut);
        if (cleaned.length < 8) return false;

        const dv = cleaned.slice(-1);
        const body = cleaned.slice(0, -1).replace(/^0+/, '');

        if (!body || !dv) return false;

        let sum = 0;
        let multiplier = 2;

        for (let i = body.length - 1; i >= 0; i--) {
            sum += parseInt(body.charAt(i)) * multiplier;
            multiplier = multiplier === 7 ? 2 : multiplier + 1;
        }

        const calculatedDV = 11 - (sum % 11);
        const expectedDV = calculatedDV === 11 ? '0' : calculatedDV === 10 ? 'K' : calculatedDV.toString();

        return dv === expectedDV;
    },

    format: (rut) => {
        const cleaned = RUTValidator.clean(rut);
        if (cleaned.length < 2) return cleaned;

        const dv = cleaned.slice(-1);
        const body = cleaned.slice(0, -1).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
        return `${body}-${dv}`;
    }
};