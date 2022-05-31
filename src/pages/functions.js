export function GetUID() {
  return localStorage.getItem("duckmusic.userid");
}
export function SetUID(string) {
  return localStorage.setItem("duckmusic.userid", string);
}