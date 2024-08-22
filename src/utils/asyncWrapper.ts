import { standALoneToast } from "./toast";
export const asyncWrapper = async <T>(
  asyncFn: () => Promise<T>,
  thunkAPI: any
): Promise<T> => {
  try {
    return await asyncFn();
  } catch (error: any) {
    const { response } = error;

    let errorMessage: string = "An unexpected error occurred."; // Default message

    if (response) {
      switch (response.status) {
        case 400:
          errorMessage = response.data.message || "Bad Request.";
          standALoneToast({
            status: "error",
            title: "",
            description: errorMessage,
          });
          break;

        case 422:
          response.data.errors.forEach((element: { message: string }) => {
            standALoneToast({
              status: "error",
              title: "",
              description: element.message,
            });
          });
          errorMessage = "Validation errors occurred.";
          break;

        case 500:
          errorMessage = "Internal Server Error. Please try again later.";
          standALoneToast({
            status: "error",
            title: "",
            description: errorMessage,
          });
          break;
        case 404:
          errorMessage = response.data.message;
          break;
        default:
          errorMessage =
            response.data.message || "An unexpected error occurred.";
          standALoneToast({
            status: "error",
            title: "",
            description: errorMessage,
          });
          break;
      }
    } else {
      standALoneToast({
        status: "error",
        title: "Error",
        description: errorMessage,
      });
    }

    return thunkAPI.rejectWithValue(errorMessage);
  }
};
