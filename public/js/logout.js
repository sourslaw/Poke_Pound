const logout = async () => {
    // Make a POST request to destroy the session on the back end
    console.log('L O G OUT');
    const response = await fetch('/api/seller/logout', {
    	method: 'POST',
    	headers: { 'Content-Type': 'application/json' },
    });
  
    if (response.ok) {
    	document.location.replace('/login');
    } else {
    	alert(response.statusText);
    }
};
  
document.querySelector('#logout').addEventListener('click', logout);
