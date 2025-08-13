
document.addEventListener('DOMContentLoaded', () => {

   
    const winDisplay = document.getElementById('win');
    const lossDisplay = document.getElementById('loss');

  
    let winsCount = parseInt(localStorage.getItem('savedWins')) || 0;
    let lossCount = parseInt(localStorage.getItem('savedLosses')) || 0;

   
    function updateDisplay() {
       
        winDisplay.textContent = `Wins: ${winsCount}`;
        lossDisplay.textContent = `Losses: ${lossCount}`;
    }

   
  

   
    updateDisplay();
});