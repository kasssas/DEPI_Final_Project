// ------Handle all possible errors in graphQL------------

// const detectErrors = (error) => {
//   if (error.clientErrors.length) {
//     return error.clientErrors.map((err) => err.message).join(",");
//   } else if (error.graphQLErrors.length) {
//     return error.graphQLErrors.map((err) => err.message).join(",");
//   } else if (error.networkError.result.errors.length) {
//     return error.networkError.result.errors.map((err) => err.message).join(",");
//   } else if (error.protocolErrors.length) {
//     return error.protocolErrors.map((err) => err.message).join(",");
//   } else if (error.message) {
//     return error.message;
//   } else {
//     return "Something Went Wrong, Please Try Again Later!";
//   }
// };

// const detectErrors = (error) => {
//   return error.clientErrors?.length
//     ? error.clientErrors
//         .map((err) => err.message))
//         .join(",")
//     : error.graphQLErrors?.length
//     ? error.graphQLErrors.map((err) => err.message).join(",")
//     : error.networkError?.result?.errors?.length
//     ? error.networkError.result.errors.map((err) => err.message).join(",")
//     : error.protocolErrors?.length
//     ? error.protocolErrors.map((err) => err.message).join(",")
//     : error?.message
//     ? error.message
//     : "Something Went Wrong, Please Try Again Later!";
// };

// export default detectErrors;

const detectErrors = (error) => {
  return error.clientErrors?.length
    ? error.clientErrors.map((err) => err.message).join(",")
    : error.graphQLErrors?.length
    ? error.graphQLErrors.map((err) => err.message).join(",")
    : error.networkError?.result?.errors?.length
    ? error.networkError.result.errors.map((err) => err.message).join(",")
    : error.protocolErrors?.length
    ? error.protocolErrors.map((err) => err.message).join(",")
    : error?.message
    ? error.message
    : "Something Went Wrong, Please Try Again Later!";
};

export default detectErrors;
