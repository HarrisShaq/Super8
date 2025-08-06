document.addEventListener('DOMContentLoaded', function() {
    // Select the form and its input elements
    const bookingForm = document.getElementById('booking-form');
    const checkinInput = document.getElementById('checkin');
    const checkoutInput = document.getElementById('checkout');
    const guestsInput = document.getElementById('guests');

    // Set the minimum check-in date to today
    const today = new Date().toISOString().split('T')[0];
    checkinInput.setAttribute('min', today);

    // Add an event listener for the form submission
    bookingForm.addEventListener('submit', function(event) {
        // Prevent the default form submission (page reload)
        event.preventDefault();

        // Get the values from the form
        const checkinDate = new Date(checkinInput.value);
        const checkoutDate = new Date(checkoutInput.value);
        const guests = guestsInput.value;

        // --- Validation ---
        // 1. Check if dates are selected
        if (!checkinInput.value || !checkoutInput.value) {
            alert('Please select both a check-in and check-out date.');
            return; // Stop the function
        }
        
        // 2. Check if check-out is after check-in
        if (checkoutDate <= checkinDate) {
            alert('Check-out date must be after the check-in date.');
            return; // Stop the function
        }

        // --- Simulation of Successful Booking ---
        // Format dates for display
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const formattedCheckin = checkinDate.toLocaleDateString('en-US', options);
        const formattedCheckout = checkoutDate.toLocaleDateString('en-US', options);

        // Display a confirmation message
        const confirmationMessage = `
            Thank you for your reservation!
            ------------------------------------
            Check-in: ${formattedCheckin}
            Check-out: ${formattedCheckout}
            Guests: ${guests}
            ------------------------------------
            
            Note: This is a demonstration. No real booking has been made.
        `;

        alert(confirmationMessage);

        // Optionally, reset the form after successful "submission"
        bookingForm.reset();
    });

    // Add logic to ensure check-out date is always after check-in
    checkinInput.addEventListener('change', function() {
        if (checkinInput.value) {
            let nextDay = new Date(checkinInput.value);
            nextDay.setDate(nextDay.getDate() + 2); // setDate handles month/year changes
            checkoutInput.min = nextDay.toISOString().split('T')[0];
        }
    });
});