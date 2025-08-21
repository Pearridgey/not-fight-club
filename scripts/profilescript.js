 document.addEventListener('DOMContentLoaded', () => {
        
            const images = [
                { id: 'luka1', src: '../assets/img/profile1 (1).jpg', alt: 'luka1', transparent: true },
                { id: 'luka2', src: '../assets/img/profile2.jpg', alt: 'luka2', transparent: true },
                { id: 'luka3', src: '../assets/img/profile3.jpg', alt: 'luka3', transparent: true },
               
            ];

           
            const profilePic = document.getElementById('profile-pic');
            const profilePicContainer = document.getElementById('open-modal-btn'); 
            const gallery = document.querySelector('.image-gallery');
            const modal = document.getElementById('selection-modal');
            const overlay = document.getElementById('modal-overlay');
            const closeModalBtn = document.getElementById('close-modal-btn');



             function loadSavedChoice() {
      
        const savedImageId = localStorage.getItem('selectedProfilePicId');

       
        const savedImageData = images.find(img => img.id === savedImageId);

       
        const initialImageData = savedImageData || images[0];
        console.log(savedImageData)
        
        updateProfilePicture(initialImageData);
        setActiveGalleryItem(initialImageData.id);
    }

         
            function updateProfilePicture(imageData) {
        profilePic.src = imageData.src;
        profilePic.alt = imageData.alt;
       
    }
function setActiveGalleryItem(imageId) {

    const currentActive = gallery.querySelector('.gallery-item.active');


    if (currentActive) {
        currentActive.classList.remove('active');
    }

   
    const newActive = gallery.querySelector(`.gallery-item[data-id="${imageId}"]`);

    if (newActive) {
        newActive.classList.add('active');
    }
}

            function openModal() {
                modal.classList.add('show');
                overlay.classList.add('show');
            }

            function closeModal() {
                modal.classList.remove('show');
                overlay.classList.remove('show');
            }

          
            profilePicContainer.addEventListener('click', openModal);
            closeModalBtn.addEventListener('click', closeModal);
            overlay.addEventListener('click', closeModal); 

        
            images.forEach(imageData => {
                const item = document.createElement('div');
                item.className = 'gallery-item';
                item.dataset.id = imageData.id;

               

                const img = document.createElement('img');
                img.src = imageData.src;
                img.alt = imageData.alt;

                const overlayDiv = document.createElement('div');
                overlayDiv.className = 'checkmark-overlay';
                overlayDiv.innerHTML = '<div class="checkmark-icon">✓</div>';

                item.appendChild(img);
                item.appendChild(overlayDiv);
                gallery.appendChild(item);

           
                item.addEventListener('click', () => {
                    updateProfilePicture(imageData);
                    setActiveGalleryItem(imageData.id);
                       localStorage.setItem('selectedProfilePicId', imageData.id);
         
                    closeModal();
                   
                });
            });

           loadSavedChoice(); 
        });
     