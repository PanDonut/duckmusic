export async function AddToHistory(index, type) {
    var his = JSON.parse(localStorage.getItem("duckmusic.search_history"));
    var item = {
        "index": index,
        "type": type
    }
    his.push(item);
    localStorage.setItem("duckmusic.search_history", JSON.stringify(his))
}