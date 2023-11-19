import Swal from "sweetalert2";

export default function handleValidateForm(
    arr: string[] | number[] | (string | number)[]
): boolean {
    let isValid = true;

    for (let i = 0; i < arr.length; i++) {
        if (!arr[i]) {
            Swal.fire("Ohh", "Bạn Hãy Nhập Đủ Các Trường!", "info");
            isValid = false;
            break;
        }
    }

    return isValid;
}
