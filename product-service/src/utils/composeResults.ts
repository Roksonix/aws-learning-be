export const composeResult = (value = null, error = null) => {
    const result = {
        data: value || null,
        success: !!value,
        message: value ? 'Success' : 'An internal server error occurred'
    };

    if (!error) {
        return result;
    }

    return {
        ...result,
        error
    };
};
