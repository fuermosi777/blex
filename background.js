chrome.app.runtime.onLaunched.addListener(function() {
    chrome.app.window.create('build/index.html', {
        id: 'main',
        bounds: {
            width: 800,
            height: 568
        }
    });
});