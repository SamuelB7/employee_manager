const PhotosUpload = {
    preview: document.querySelector('#photos-preview'),
    uploadLimit: 7,
    handleFileInput(event) {
        const {files: fileList } = event.target

        if(PhotosUpload.hasLimit(event)) return

        Array.from(fileList).forEach(file => {
            const reader = new FileReader()

            reader.onload = () => {
                const image = new Image()
                image.src = String(reader.result)

                const div = PhotosUpload.getContainer(image)
                PhotosUpload.preview.appendChild(div)
            }

            reader.readAsDataURL(file)
        })
    },

    getContainer(image) {
        const div = document.createElement('div')
        div.classList.add('photo')  

        div.onclick = () => alert('remover foto')

        div.appendChild(image)

        div.appendChild(PhotosUpload.getRemoveButton())

        return div
    },

    hasLimit(event) {
        const { uploadLimit } = PhotosUpload
        const { files: fileList } = event.target

        if(fileList.length > uploadLimit) {
            alert("Não ultrapasse o limite de fotos")
            event.preventDefault()
            return true
        }

        return false
    },

    getRemoveButton() {
        const button = document.createElement('i')
        button.classList.add('material-icons')
        button.innerHTML = "close"
        return button
    }
}


//Antes da refatoração
/* const PhotosUpload = {
    preview: document.querySelector('#photos-preview'),
    uploadLimit: 1,
    handleFileInput(event) {
        const {files: fileList } = event.target
        const { uploadLimit } = PhotosUpload

        if(fileList.length > uploadLimit) {
            alert("Envie apenas uma foto")
            event.preventDefault()
            return
        }

        Array.from(fileList).forEach(file => {
            const reader = new FileReader()

            reader.onload = () => {
                const image = new Image()
                image.src = String(reader.result)

                const div = document.createElement('div')
                div.classList.add('photo')  

                div.onclick = PhotosUpload.removePhoto

                div.appendChild(image)
                div.appendChild(PhotosUpload.getRemoveButton())

                document.querySelector('#photos-preview').appendChild(div)
            }

            reader.readAsDataURL(file)
        })
    },

    getRemoveButton() {
        const button = document.createElement('i')
        button.classList.add('material-icons')
        button.innerHTML = "close"
        return button
    },
    
    removePhoto(event) {
        const event = event.target
        const photoDiv = document.querySelector('#photo')
        photoDiv.remove()
    }
} */