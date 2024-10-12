import Swal from "sweetalert2";


const swalDeleteUserConfirmation = (func ) => {
  Swal.fire({
    title: "Are you sure?",
    text: "all projects related to that user will be deleted!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d63384",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
    showLoaderOnConfirm: true,
    preConfirm: () => {
      return func()
    },
    allowOutsideClick: () => !Swal.isLoading(),
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: "Deleted!",
        text: "user and its projects have been deleted.",
        icon: "success"
      });
    }
  });
}

export default swalDeleteUserConfirmation