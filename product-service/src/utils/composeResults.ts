type ReturnValue<T, E> = {
    data: T | null;
    success: boolean;
    message: string;
    error?: E;
};

type IComposeResult<T, E> = (value: T, error: E) => ReturnValue<T, E>;

export const composeResult: IComposeResult<Record<string, unknown>, unknown> = (value = null, error = null) => {
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
