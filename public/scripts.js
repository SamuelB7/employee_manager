const PhotosUpload = {
    input: "",
    preview: document.querySelector('#photos-preview'),
    uploadLimit: 1,
    files: [],
    handleFileInput(event) {
        const {files: fileList } = event.target
        PhotosUpload.input = event.target

        if(PhotosUpload.hasLimit(event)) return

        Array.from(fileList).forEach(file => {

            PhotosUpload.files.push(file)

            const reader = new FileReader()

            reader.onload = () => {
                const image = new Image()
                image.src = String(reader.result)

                const div = PhotosUpload.getContainer(image)
                document.querySelector('#photos-preview').appendChild(div)
            }

            reader.readAsDataURL(file)
        })

        PhotosUpload.input.files = PhotosUpload.getAllFiles()
    },

    getContainer(image) {
        const div = document.createElement('div')
        div.classList.add('photo')  

        div.onclick = PhotosUpload.removePhoto

        div.appendChild(image)

        div.appendChild(PhotosUpload.getRemoveButton())

        return div
    },

    hasLimit(event) {
        const { uploadLimit, input } = PhotosUpload
        const {files: fileList } = input

        const preview = document.querySelector('#photos-preview')

        if(fileList.length > uploadLimit) {
            alert("Envie apenas uma foto")
            event.preventDefault()
            return true
        }
        
        if(preview.childNodes.length > 1){
            alert("Envie apenas uma foto")
            event.preventDefault()
            return true
        }

        return false
    },

    getAllFiles() {
        const dataTransfer = new DataTransfer()

        PhotosUpload.files.forEach(file => dataTransfer.items.add(file))

        return dataTransfer.files
    },

    getRemoveButton() {
        const button = document.createElement('i')
        button.classList.add('material-icons')
        button.innerHTML = "close"
        return button
    },

    removePhoto(event) {
        const photoDiv = event.target.parentNode
        
        photoDiv.remove()
        
    }
}


















/* const PhotosUpload = {
    photoPreview () {
        let photo = document.querySelector('input[name=photos]').files[0];
        let preview = document.querySelector('#photos-preview img')
    
        let reader = new FileReader();
        
        reader.onloadend = function() {
            preview.src = reader.result

        }
    
        reader.readAsDataURL(photo)
    
    },

    removePhoto() {
        photo = document.querySelector('#photos-preview img')
        

        img = document.createElement('img')
        photo.replaceWith(img)
        
    },

    getRemoveButton() {
        const button = document.createElement('i')
        button.classList.add('material-icons')
        button.innerHTML = "close"
        return button
    },

}

 */