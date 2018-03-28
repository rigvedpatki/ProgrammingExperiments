$(document).ready(() => {
  $(".deleteUser").on("click", deleteUser);
});

function deleteUser() {
  const confirmation = confirm("Arue you sure ?");
  if (confirmation) {
      console.log($(this).data("id"));
    $.ajax({
      type: "DELETE",
      url: "/users/delete/" + $(this).data("id")
    }).done(res => {
      window.location.replace("/");
    });
     window.location.replace("/");
  } else {
    return false;
  }
}
