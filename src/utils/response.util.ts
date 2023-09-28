export const apiResponse = (data: unknown) => {
    const {
        response,
        message,
        result = null,
        code = 200,
        errors = null,
        isSuccess = true,
    } = data as any;
    
    return response.status(code).json({
        code,
        errors,
        message,
        result,
        isSuccess,
    });
};
