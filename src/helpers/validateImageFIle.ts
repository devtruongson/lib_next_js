export default function validateImageFile(filename: string): boolean {
    return /\.(gif|jpe?g|tiff?|png|webp|bmp)$/i.test(filename);
}
