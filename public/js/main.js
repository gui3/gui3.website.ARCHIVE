
function toggleSidebar () {
  let sidebar = document.getElementById("sidebar");
  switch (sidebar.style.display) {
    case "none":
      sidebar.style.display = "flex";
      break;
    default:
      sidebar.style.display = "none";
  }
}
