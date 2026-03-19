export const getRTKErrorMessage = (error: unknown) => {
    if (!error) return null
    const errData = error as Error
    return errData.message || 'Something went wrong on the server'
}
