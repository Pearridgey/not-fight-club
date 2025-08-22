console.log("--- counter.js file has loaded ---");
document.addEventListener('DOMContentLoaded', () => {
 
    const winDisplay = document.getElementById('win');
    const lossDisplay = document.getElementById('loss');

    const winsCount = localStorage.getItem('savedWins') || 0;
    const lossCount = localStorage.getItem('savedLosses') || 0;
    console.log("Read from localStorage -> Wins:", winsCount, "Losses:", lossCount);

    if (winDisplay && lossDisplay) {
        winDisplay.textContent = `Wins: ${winsCount}`;
        lossDisplay.textContent = `Losses: ${lossCount}`;
    } else {
        console.error("Could not find win/loss display elements on this page.");
    }
});