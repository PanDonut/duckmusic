import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

export function Store(path, file) {
    const storage = getStorage();
    const storageRef = ref(storage, 'users/' + path + '/profile.png');
    uploadBytes(storageRef, file).then((snapshot) => {
        GetImg(path);
    });

}

export function GetImg(aut, path) {
    const storage = getStorage(aut);
    getDownloadURL(ref(storage, 'users/' + path + '/profile.png'))
        .then((url) => {
            localStorage.setItem('image', url);
        })
}

