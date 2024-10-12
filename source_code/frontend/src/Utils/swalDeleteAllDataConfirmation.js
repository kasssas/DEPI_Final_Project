import Swal from "sweetalert2";


const swalDeleteAllDataConfirmation = (func) => {
  Swal.fire({
    title: "Are you sure?",
    text: "all data will be deleted!",
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
        text: "all data has been deleted.",
        icon: "success"
      });
    }
  });
}

export default swalDeleteAllDataConfirmation