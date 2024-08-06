export const asyncWrapper = async <T>(
  asyncFn: () => Promise<T>,
  thunkAPI: any
): Promise<T> => {
  try {
    return await asyncFn();
  } catch (error: any) {
    const { response } = error;
    const errorMessage =
      response?.data?.message || "An unexpected error occurred";
    console.log("errorMessage", errorMessage);
    return thunkAPI.rejectWithValue(errorMessage);
  }
};
